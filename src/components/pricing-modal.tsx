"use client";

import { createContext, FormEvent, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, IndianRupee, ShieldCheck, X } from "lucide-react";
import { cities, careTypes, indianStates } from "@/lib/data";
import { initialClientFormState, submitClientForm, type ClientFormState } from "@/lib/client-forms";

type PricingContext = { propertyId?: string; propertyName?: string; city?: string };
type PricingModalContextValue = { openPricing: (context?: PricingContext) => void };
const PricingModalContext = createContext<PricingModalContextValue | null>(null);

const relationships = ["My mother", "My father", "My spouse", "Myself", "A relative or friend"];
const urgencyOptions = ["Immediately", "Within 2 weeks", "Within 1–2 months", "Just researching"];
const budgets = ["Under ₹75,000/month", "₹75,000–₹1.25 lakh/month", "₹1.25–₹2 lakh/month", "Above ₹2 lakh/month", "Not sure yet"];
const totalSteps = 6;

export function PricingModalProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<(PricingContext & { key: number }) | null>(null);
  const openPricing = useCallback((context: PricingContext = {}) => setRequest({ ...context, key: Date.now() }), []);
  const closePricing = useCallback(() => setRequest(null), []);
  return <PricingModalContext.Provider value={{ openPricing }}>{children}{request && <PricingLeadModal key={request.key} context={request} onClose={closePricing} />}</PricingModalContext.Provider>;
}

export function PricingTrigger({ propertyId, propertyName, city, className = "pricing-trigger", children = "Get pricing" }: PricingContext & { className?: string; children?: React.ReactNode }) {
  const modal = useContext(PricingModalContext);
  if (!modal) throw new Error("PricingTrigger must be used inside PricingModalProvider");
  return <button type="button" className={className} onClick={() => modal.openPricing({ propertyId, propertyName, city })}>{children}</button>;
}

function PricingLeadModal({ context, onClose }: { context: PricingContext; onClose: () => void }) {
  const [state, setState] = useState<ClientFormState>(initialClientFormState);
  const [pending, setPending] = useState(false);
  const [step, setStep] = useState(1);
  const [relationship, setRelationship] = useState("");
  const [preferredState, setPreferredState] = useState("");
  const [city, setCity] = useState(context.city || "");
  const [careNeeds, setCareNeeds] = useState("");
  const [urgency, setUrgency] = useState("");
  const [budget, setBudget] = useState("");
  const titleId = useId();
  const closeButton = useRef<HTMLButtonElement>(null);
  const stateCities = cities.filter((item) => item.state === preferredState);
  const searchParams = typeof window === "undefined" ? null : new URLSearchParams(window.location.search);
  const source = { url: typeof window === "undefined" ? "" : window.location.href, utmSource: searchParams?.get("utm_source") || "", utmMedium: searchParams?.get("utm_medium") || "", utmCampaign: searchParams?.get("utm_campaign") || "" };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  const canContinue = [Boolean(relationship), Boolean(preferredState && city.trim()), Boolean(careNeeds), Boolean(urgency), Boolean(budget)][step - 1] ?? true;
  const stepTitle = context.propertyName ? `Get pricing for ${context.propertyName}` : "Find the right senior care";
  const message = `Pricing request. Timing: ${urgency}.`;
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const result = await submitClientForm("/api/leads", event.currentTarget);
    setState(result);
    setPending(false);
  };

  return <div className="pricing-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="pricing-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button ref={closeButton} className="pricing-modal-close" type="button" onClick={onClose} aria-label="Close enquiry form"><X size={20} /></button>
      {state.status === "success" ? <div className="pricing-success" aria-live="polite"><CheckCircle2 size={46} /><span className="eyebrow">Request received</span><h2 id={titleId}>Thank you — we’ll reach out soon.</h2><p>Our senior-care advisor will review the location and support you need, then help you understand suitable options.</p><button className="button button-gold" type="button" onClick={onClose}>Done</button></div> :
        <form onSubmit={handleSubmit}>
          <div className="pricing-modal-head"><div className="pricing-modal-icon"><IndianRupee size={22} /></div><div><span className="eyebrow">A considered shortlist</span><h2 id={titleId}>{stepTitle}</h2></div></div>
          <div className="pricing-progress" aria-label={`Question ${step} of ${totalSteps}`}><span style={{ width: `${(step / totalSteps) * 100}%` }} /></div>
          <p className="pricing-step-label">Question {step} of {totalSteps}</p>
          {step === 1 && <ChoiceStep legend="Who are you looking for?" options={relationships} value={relationship} onChange={setRelationship} onChoose={() => setStep(2)} name="relationship-choice" />}
          {step === 2 && <fieldset className="pricing-location-step"><legend>Where in India are you looking?</legend><p>Choose the state first, then add the city or area. This helps us introduce you to relevant residences.</p><label className="form-field" htmlFor="pricing-state"><span>State or union territory</span><select id="pricing-state" value={preferredState} onChange={(event) => { setPreferredState(event.target.value); setCity(""); }} required><option value="">Choose a state or region</option>{indianStates.map((item) => <option key={item}>{item}</option>)}</select></label><label className="form-field" htmlFor="pricing-city"><span>City or preferred area</span><input id="pricing-city" value={city} onChange={(event) => setCity(event.target.value)} required autoComplete="address-level2" placeholder="e.g. Gurgaon, Pune or nearby" list="pricing-city-options" /></label><datalist id="pricing-city-options">{stateCities.map((item) => <option key={item.slug} value={item.name} />)}</datalist></fieldset>}
          {step === 3 && <ChoiceStep legend="What kind of support would help most?" options={careTypes.map((care) => care.name)} value={careNeeds} onChange={setCareNeeds} onChoose={() => setStep(4)} name="care-choice" />}
          {step === 4 && <ChoiceStep legend="How soon are you hoping to find an option?" options={urgencyOptions} value={urgency} onChange={setUrgency} onChoose={() => setStep(5)} name="urgency-choice" />}
          {step === 5 && <ChoiceStep legend="What monthly budget feels right?" options={budgets} value={budget} onChange={setBudget} onChoose={() => setStep(6)} name="budget-choice" />}
          {step === 6 && <div className="pricing-contact-step"><fieldset><legend>Where can we reach you?</legend><p>We’ll only use these details to help with this care search.</p></fieldset><div className="form-field"><label htmlFor="pricing-name">Your name</label><input id="pricing-name" name="name" required autoComplete="name" /><FieldError errors={state.errors?.name} /></div><div className="form-field"><label htmlFor="pricing-phone">Phone number</label><input id="pricing-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91" /><FieldError errors={state.errors?.phone} /></div><div className="form-field"><label htmlFor="pricing-email">Email address</label><input id="pricing-email" name="email" type="email" required autoComplete="email" /><FieldError errors={state.errors?.email} /></div><label className="pricing-consent"><input type="checkbox" name="consent" required /> I agree to be contacted about this request and accept the privacy policy.</label></div>}
          <input type="hidden" name="leadType" value={context.propertyId ? "property" : "concierge"} /><input type="hidden" name="propertyId" value={context.propertyId || ""} /><input type="hidden" name="propertyName" value={context.propertyName || ""} /><input type="hidden" name="relationship" value={relationship} /><input type="hidden" name="preferredState" value={preferredState} /><input type="hidden" name="city" value={city} /><input type="hidden" name="careNeeds" value={careNeeds} /><input type="hidden" name="urgency" value={urgency} /><input type="hidden" name="searchReason" value="" /><input type="hidden" name="budget" value={budget} /><input type="hidden" name="message" value={message} /><input type="hidden" name="sourceUrl" value={source.url} /><input type="hidden" name="utmSource" value={source.utmSource} /><input type="hidden" name="utmMedium" value={source.utmMedium} /><input type="hidden" name="utmCampaign" value={source.utmCampaign} /><input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
          {state.status === "error" && <p className="form-status error" aria-live="polite">{state.message}</p>}
          <div className="pricing-modal-actions">{step > 1 && <button className="button button-ghost" type="button" onClick={() => setStep((current) => current - 1)} disabled={pending}><ArrowLeft size={16} /> Back</button>}{step === 2 && <button className="button button-gold" type="button" disabled={!canContinue} onClick={() => setStep(3)}>Continue <ArrowRight size={16} /></button>}{step === totalSteps && <button className="button button-gold" type="submit" disabled={pending}>{pending ? "Sending…" : "Request my shortlist"}<ArrowRight size={16} /></button>}</div>
          <p className="pricing-privacy"><ShieldCheck size={14} /> Your information stays private and is only used to help with your care search.</p>
        </form>}
    </section>
  </div>;
}

function ChoiceStep({ legend, options, value, onChange, onChoose, name }: { legend: string; options: string[]; value: string; onChange: (value: string) => void; onChoose: () => void; name: string }) {
  const selectOption = (option: string) => {
    onChange(option);
    onChoose();
  };

  return <fieldset className="pricing-choices"><legend>{legend}</legend><div>{options.map((option) => <label key={option} className={value === option ? "selected" : ""}><input type="radio" name={name} value={option} checked={value === option} onChange={() => selectOption(option)} /><span>{option}</span></label>)}</div></fieldset>;
}

function FieldError({ errors }: { errors?: string[] }) { return errors?.length ? <small className="field-error">{errors[0]}</small> : null; }
