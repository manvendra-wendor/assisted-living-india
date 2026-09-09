"use client";

import { useActionState, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { submitListing } from "@/app/actions";
import { cities } from "@/lib/data";
import { initialActionState } from "@/lib/validation";

export function ListingForm() {
  const [state, action, pending] = useActionState(submitListing, initialActionState);
  const [step, setStep] = useState(1);
  const [propertyName, setPropertyName] = useState("");
  const [city, setCity] = useState("");
  const [careTypes, setCareTypes] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const canContinue = step === 1 ? Boolean(propertyName.trim() && city && careTypes.trim()) : step === 2 ? Boolean(operatorName.trim() && email.trim() && phone.trim()) : consent;

  return <form className="listing-form" action={action}>
    <div className="listing-progress" aria-label={`Step ${step} of 3`}><span style={{ width: `${(step / 3) * 100}%` }} /></div>
    <p className="listing-step-label">Step {step} of 3</p>
    {step === 1 && <fieldset className="listing-step"><legend>Tell us about the residence</legend><p>Start with the information families need to find the right profile.</p><div className="form-grid"><div className="form-field form-field-full"><label htmlFor="property-name">Property or community name</label><input id="property-name" value={propertyName} onChange={(event) => setPropertyName(event.target.value)} required autoComplete="organization" /></div><div className="form-field"><label htmlFor="listing-city">City</label><select id="listing-city" value={city} onChange={(event) => setCity(event.target.value)} required><option value="">Choose a city</option>{cities.map((item) => <option key={item.slug}>{item.name}</option>)}<option>Another location</option></select></div><div className="form-field"><label htmlFor="listing-care">Care offered</label><input id="listing-care" value={careTypes} onChange={(event) => setCareTypes(event.target.value)} required placeholder="e.g. assisted living" /></div></div></fieldset>}
    {step === 2 && <fieldset className="listing-step"><legend>Who can verify these details?</legend><p>We use your contact information only for editorial review and profile verification.</p><div className="form-grid"><div className="form-field"><label htmlFor="operator-name">Your name</label><input id="operator-name" value={operatorName} onChange={(event) => setOperatorName(event.target.value)} required autoComplete="name" /></div><div className="form-field"><label htmlFor="listing-email">Work email</label><input id="listing-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></div><div className="form-field"><label htmlFor="listing-phone">Phone number</label><input id="listing-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required autoComplete="tel" /></div><div className="form-field"><label htmlFor="listing-url">Property website</label><input id="listing-url" type="url" value={websiteUrl} onChange={(event) => setWebsiteUrl(event.target.value)} placeholder="https://" /></div></div></fieldset>}
    {step === 3 && <fieldset className="listing-step"><legend>Anything else families should know?</legend><p>Add the care context, rooms or facilities that make the residence distinctive. You can leave this blank.</p><div className="form-grid"><div className="form-field form-field-full"><label htmlFor="listing-note">Property notes</label><textarea id="listing-note" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Location, number of rooms, clinical support and distinguishing facilities." /></div></div><label className="check-list"><span><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /> I am authorised to submit this information and agree to verification before publication.</span></label></fieldset>}
    <input type="hidden" name="operatorName" value={operatorName} /><input type="hidden" name="propertyName" value={propertyName} /><input type="hidden" name="email" value={email} /><input type="hidden" name="phone" value={phone} /><input type="hidden" name="city" value={city} /><input type="hidden" name="websiteUrl" value={websiteUrl} /><input type="hidden" name="careTypes" value={careTypes} /><input type="hidden" name="message" value={message} /><input type="hidden" name="consent" value={consent ? "on" : ""} /><input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
    {state.status !== "idle" && <p className={`form-status ${state.status === "error" ? "error" : ""}`}>{state.message}</p>}
    <div className="listing-form-actions">{step > 1 && <button className="button button-ghost" type="button" onClick={() => setStep((current) => current - 1)} disabled={pending}><ArrowLeft size={16} /> Back</button>}{step < 3 ? <button className="button button-gold" type="button" disabled={!canContinue} onClick={() => setStep((current) => current + 1)}>Continue <ArrowRight size={16} /></button> : <button className="button button-gold" type="submit" disabled={pending || !canContinue}>{pending ? "Submitting…" : "Submit for editorial review"}<ArrowRight size={16} /></button>}</div>
  </form>;
}
