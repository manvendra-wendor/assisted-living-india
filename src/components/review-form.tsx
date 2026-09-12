"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Star, X } from "lucide-react";
import { initialClientFormState, submitClientForm, type ClientFormState } from "@/lib/client-forms";

export function WriteReviewTrigger({ propertyId, propertyName, className = "button button-ghost", children = "Write a review" }: { propertyId: string; propertyName: string; className?: string; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>{children}</button>
      {open && <ReviewModal propertyId={propertyId} propertyName={propertyName} onClose={() => setOpen(false)} />}
    </>
  );
}

function ReviewModal({ propertyId, propertyName, onClose }: { propertyId: string; propertyName: string; onClose: () => void }) {
  const [state, setState] = useState<ClientFormState>(initialClientFormState);
  const [pending, setPending] = useState(false);
  const [rating, setRating] = useState(0);
  const titleId = useId();
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const result = await submitClientForm("/api/reviews", event.currentTarget);
    setState(result);
    setPending(false);
  };

  return (
    <div className="pricing-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="pricing-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button ref={closeButton} className="pricing-modal-close" type="button" onClick={onClose} aria-label="Close review form"><X size={20} /></button>
        {state.status === "success" ? (
          <div className="pricing-success" aria-live="polite">
            <CheckCircle2 size={46} />
            <span className="eyebrow">Review received</span>
            <h2 id={titleId}>Thank you for sharing your experience.</h2>
            <p>Every review is checked against our <a className="text-link" href="/review-guidelines">review guidelines</a> before it publishes.</p>
            <button className="button button-gold" type="button" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="pricing-modal-head"><div className="pricing-modal-icon"><Star size={22} /></div><div><span className="eyebrow">Help another family decide</span><h2 id={titleId}>Write a review for {propertyName}</h2></div></div>
            <input type="hidden" name="propertyId" value={propertyId} />
            <input type="hidden" name="propertyName" value={propertyName} />
            <input type="hidden" name="rating" value={rating} />
            <fieldset className="review-rating-field">
              <legend>Your rating</legend>
              <div className="review-star-picker" role="radiogroup" aria-label="Rating out of 5 stars">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button key={value} type="button" className={value <= rating ? "selected" : ""} aria-label={`${value} star${value === 1 ? "" : "s"}`} aria-pressed={value <= rating} onClick={() => setRating(value)}>
                    <Star size={26} fill={value <= rating ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              <FieldError errors={state.errors?.rating} />
            </fieldset>
            <div className="form-grid">
              <div className="form-field form-field-full"><label htmlFor="review-title">Review title</label><input id="review-title" name="title" required minLength={4} maxLength={120} placeholder="Sum up your experience in a few words" /><FieldError errors={state.errors?.title} /></div>
              <div className="form-field form-field-full"><label htmlFor="review-body">Your review</label><textarea id="review-body" name="body" required minLength={30} maxLength={2000} placeholder="What should another family know? Focus on first-hand experience, not private medical details." /><FieldError errors={state.errors?.body} /></div>
              <div className="form-field"><label htmlFor="review-relationship">Your relationship</label><select id="review-relationship" name="relationship" required defaultValue=""><option value="" disabled>Select one</option><option>Resident</option><option>Son or daughter</option><option>Spouse</option><option>Other family member</option><option>Friend or visitor</option></select></div>
              <div className="form-field"><label htmlFor="review-stay">When was this? (optional)</label><input id="review-stay" name="stayDate" type="month" /></div>
            </div>
            <label className="check-list"><span><input type="checkbox" name="visitConfirmed" required /> I confirm I have direct, first-hand experience of this residence.</span></label>
            <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" />
            {state.status === "error" && <p className="form-status error" aria-live="polite">{state.message}</p>}
            <div className="pricing-modal-actions"><button className="button button-gold" type="submit" disabled={pending || rating === 0}>{pending ? "Sending…" : "Submit review"}<ArrowRight size={16} /></button></div>
            <p className="pricing-privacy"><ShieldCheck size={14} /> Reviews are moderated before publishing — see our <a href="/review-guidelines">guidelines</a>.</p>
          </form>
        )}
      </section>
    </div>
  );
}

function FieldError({ errors }: { errors?: string[] }) { return errors?.length ? <small className="field-error">{errors[0]}</small> : null; }
