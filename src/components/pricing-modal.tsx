"use client";

import { createContext, useActionState, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, IndianRupee, ShieldCheck, X } from "lucide-react";
import { submitLead } from "@/app/actions";
import { initialActionState } from "@/lib/validation";

type PricingContext = {
  propertyId?: string;
  propertyName?: string;
  city?: string;
};

type PricingModalContextValue = {
  openPricing: (context?: PricingContext) => void;
};

const PricingModalContext = createContext<PricingModalContextValue | null>(null);

export function PricingModalProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<(PricingContext & { key: number }) | null>(null);
  const openPricing = useCallback((context: PricingContext = {}) => setRequest({ ...context, key: Date.now() }), []);
  const closePricing = useCallback(() => setRequest(null), []);

  return (
    <PricingModalContext.Provider value={{ openPricing }}>
      {children}
      {request && <PricingLeadModal key={request.key} context={request} onClose={closePricing} />}
    </PricingModalContext.Provider>
  );
}

export function PricingTrigger({
  propertyId,
  propertyName,
  city,
  className = "pricing-trigger",
  children = "Get pricing",
}: PricingContext & { className?: string; children?: React.ReactNode }) {
  const modal = useContext(PricingModalContext);
  if (!modal) throw new Error("PricingTrigger must be used inside PricingModalProvider");
  return <button type="button" className={className} onClick={() => modal.openPricing({ propertyId, propertyName, city })}>{children}</button>;
}

const relationships = ["Myself", "My mother", "My father", "My spouse", "A relative or friend"];
const urgencyOptions = ["Immediately", "Within 2 weeks", "Within 1–2 months", "Just researching"];
const searchReasons = ["Dementia or Alzheimer’s care", "Hospital discharge or rehabilitation", "Both dementia and rehabilitation", "Neither — exploring general support"];
const budgets = ["Under ₹75,000/month", "₹75,000–₹1.25 lakh/month", "₹1.25–₹2 lakh/month", "Above ₹2 lakh/month", "Not sure yet"];

function PricingLeadModal({ context, onClose }: { context: PricingContext; onClose: () => void }) {
  const [state, action, pending] = useActionState(submitLead, initialActionState);
  const [step, setStep] = useState(1);
  const [relationship, setRelationship] = useState("");
  const [urgency, setUrgency] = useState("");
  const [searchReason, setSearchReason] = useState("");
  const [budget, setBudget] = useState("");
  const titleId = useId();
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const canContinue = step === 1 ? Boolean(relationship) : Boolean(urgency && searchReason && budget);
  const careNeeds = searchReason || "General assisted-living guidance";
  const message = `Pricing request. Timing: ${urgency}. Search prompt: ${searchReason}.`;
  const searchParams = typeof window === "undefined" ? null : new URLSearchParams(window.location.search);
  const source = {
    url: typeof window === "undefined" ? "" : window.location.href,
    utmSource: searchParams?.get("utm_source") || "",
    utmMedium: searchParams?.get("utm_medium") || "",
    utmCampaign: searchParams?.get("utm_campaign") || "",
  };

  return (
    <div className="pricing-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="pricing-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button ref={closeButton} className="pricing-modal-close" type="button" onClick={onClose} aria-label="Close pricing form"><X size={20} /></button>
        {state.status === "success" ? (
          <div className="pricing-success" aria-live="polite">
            <CheckCircle2 size={46} />
            <span className="eyebrow">Request received</span>
            <h2 id={titleId}>Thank you — we’ll reach out to you soon.</h2>
            <p>Our senior-care advisor will review your needs and help you understand suitable options and pricing.</p>
            <button className="button button-gold" type="button" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form action={action}>
            <div className="pricing-modal-head">
              <div className="pricing-modal-icon"><IndianRupee size={22} /></div>
              <div><span className="eyebrow">Personalised pricing</span><h2 id={titleId}>{context.propertyName ? `Get pricing for ${context.propertyName}` : "Get senior-living pricing"}</h2></div>
            </div>
            <div className="pricing-progress" aria-label={`Step ${step} of 3`}><span style={{ width: `${step * 33.333}%` }} /></div>
            <p className="pricing-step-label">Step {step} of 3</p>

            {step === 1 && <ChoiceStep legend="Who are you looking for?" options={relationships} value={relationship} onChange={setRelationship} name="relationship-choice" />}
            {step === 2 && <div className="pricing-question-stack">
              <ChoiceStep legend="How quickly do you need to find an option?" options={urgencyOptions} value={urgency} onChange={setUrgency} name="urgency-choice" compact />
              <ChoiceStep legend="Is dementia or a hospital/rehab stay prompting your search?" options={searchReasons} value={searchReason} onChange={setSearchReason} name="reason-choice" compact />
              <ChoiceStep legend="What is your monthly budget?" options={budgets} value={budget} onChange={setBudget} name="budget-choice" compact />
            </div>}
            {step === 3 && <div className="pricing-contact-step">
              <fieldset><legend>Where can we reach you?</legend><p>We’ll use these details only to help with this request.</p></fieldset>
              <div className="form-field"><label htmlFor="pricing-name">Your name</label><input id="pricing-name" name="name" required autoComplete="name" /><FieldError errors={state.errors?.name} /></div>
              <div className="form-field"><label htmlFor="pricing-phone">Phone number</label><input id="pricing-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91" /><FieldError errors={state.errors?.phone} /></div>
              <div className="form-field"><label htmlFor="pricing-email">Email address</label><input id="pricing-email" name="email" type="email" required autoComplete="email" /><FieldError errors={state.errors?.email} /></div>
              <label className="pricing-consent"><input type="checkbox" name="consent" required /> I agree to be contacted about this request and accept the privacy policy.</label>
              <input type="hidden" name="leadType" value={context.propertyId ? "property" : "concierge"} />
              <input type="hidden" name="propertyId" value={context.propertyId || ""} />
              <input type="hidden" name="propertyName" value={context.propertyName || ""} />
              <input type="hidden" name="relationship" value={relationship} />
              <input type="hidden" name="urgency" value={urgency} />
              <input type="hidden" name="searchReason" value={searchReason} />
              <input type="hidden" name="city" value={context.city || "India"} />
              <input type="hidden" name="careNeeds" value={careNeeds} />
              <input type="hidden" name="budget" value={budget} />
              <input type="hidden" name="message" value={message} />
              <input type="hidden" name="sourceUrl" value={source.url} />
              <input type="hidden" name="utmSource" value={source.utmSource} />
              <input type="hidden" name="utmMedium" value={source.utmMedium} />
              <input type="hidden" name="utmCampaign" value={source.utmCampaign} />
              <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
            </div>}

            {state.status === "error" && <p className="form-status error" aria-live="polite">{state.message}</p>}
            <div className="pricing-modal-actions">
              {step > 1 && <button className="button button-ghost" type="button" onClick={() => setStep((current) => current - 1)} disabled={pending}><ArrowLeft size={16} /> Back</button>}
              {step < 3
                ? <button className="button button-gold" type="button" disabled={!canContinue} onClick={() => setStep((current) => current + 1)}>Continue <ArrowRight size={16} /></button>
                : <button className="button button-gold" type="submit" disabled={pending}>{pending ? "Sending…" : "Request pricing"}<ArrowRight size={16} /></button>}
            </div>
            <p className="pricing-privacy"><ShieldCheck size={14} /> Your information stays private and is only used to help with your care search.</p>
          </form>
        )}
      </section>
    </div>
  );
}

function ChoiceStep({ legend, options, value, onChange, name, compact = false }: { legend: string; options: string[]; value: string; onChange: (value: string) => void; name: string; compact?: boolean }) {
  return <fieldset className={compact ? "pricing-choices compact" : "pricing-choices"}><legend>{legend}</legend><div>{options.map((option) => <label key={option} className={value === option ? "selected" : ""}><input type="radio" name={name} value={option} checked={value === option} onChange={() => onChange(option)} /><span>{option}</span></label>)}</div></fieldset>;
}

function FieldError({ errors }: { errors?: string[] }) { return errors?.length ? <small className="field-error">{errors[0]}</small> : null; }
