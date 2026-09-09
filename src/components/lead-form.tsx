"use client";

import { useActionState, useState } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { submitLead } from "@/app/actions";
import { careTypes, cities, indianStates } from "@/lib/data";
import { initialActionState } from "@/lib/validation";

export function LeadForm({ type = "property", propertyId, propertyName }: { type?: "property" | "concierge"; propertyId?: string; propertyName?: string }) {
  if (type === "concierge") return <ConciergeLeadForm />;
  return <StandardLeadForm type={type} propertyId={propertyId} propertyName={propertyName} />;
}

function StandardLeadForm({ type, propertyId, propertyName }: { type: "property"; propertyId?: string; propertyName?: string }) {
  const [state, action, pending] = useActionState(submitLead, initialActionState);
  return (
    <form action={action}>
      <input type="hidden" name="leadType" value={type} />
      <input type="hidden" name="propertyId" value={propertyId || ""} />
      <input type="hidden" name="propertyName" value={propertyName || ""} />
      <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" />
      <div className="form-grid">
        <div className="form-field"><label htmlFor={`${type}-name`}>Your name</label><input id={`${type}-name`} name="name" required autoComplete="name" /><FieldError errors={state.errors?.name} /></div>
        <div className="form-field"><label htmlFor={`${type}-phone`}>Phone number</label><input id={`${type}-phone`} name="phone" type="tel" required autoComplete="tel" placeholder="+91" /><FieldError errors={state.errors?.phone} /></div>
        <div className="form-field"><label htmlFor={`${type}-email`}>Email address</label><input id={`${type}-email`} name="email" type="email" required autoComplete="email" /><FieldError errors={state.errors?.email} /></div>
        <div className="form-field"><label htmlFor={`${type}-relationship`}>I’m looking for</label><select id={`${type}-relationship`} name="relationship" required defaultValue=""><option value="" disabled>Select one</option><option>My mother or father</option><option>My spouse</option><option>Myself</option><option>A relative or friend</option></select></div>
        <div className="form-field"><label htmlFor={`${type}-state`}>Preferred state or region</label><select id={`${type}-state`} name="preferredState" required defaultValue=""><option value="" disabled>Choose a state or region</option>{indianStates.map((state) => <option key={state}>{state}</option>)}</select></div>
        <div className="form-field"><label htmlFor={`${type}-city`}>Preferred city or area</label><input id={`${type}-city`} name="city" required autoComplete="address-level2" placeholder="e.g. Gurgaon, Pune or an area nearby" list={`${type}-city-options`} /><datalist id={`${type}-city-options`}>{cities.map((city) => <option key={city.slug} value={city.name} />)}</datalist></div>
        <div className="form-field"><label htmlFor={`${type}-care`}>Support needed</label><select id={`${type}-care`} name="careNeeds" required defaultValue=""><option value="" disabled>Choose care</option>{careTypes.map((care) => <option key={care.slug}>{care.name}</option>)}</select></div>
        <div className="form-field"><label htmlFor={`${type}-budget`}>Monthly budget</label><select id={`${type}-budget`} name="budget" defaultValue=""><option value="">Still exploring</option><option>Under ₹75,000</option><option>₹75,000–₹1.25 lakh</option><option>₹1.25–₹2 lakh</option><option>Above ₹2 lakh</option></select></div>
        <div className="form-field form-field-full"><label htmlFor={`${type}-message`}>Anything we should know?</label><textarea id={`${type}-message`} name="message" placeholder="Share care needs, timing or the questions on your mind." /></div>
      </div>
      <label className="check-list"><span><input type="checkbox" name="consent" required /> I agree to be contacted about this enquiry and accept the privacy policy.</span></label>
      {state.status !== "idle" && <p className={`form-status ${state.status === "error" ? "error" : ""}`}>{state.message}</p>}
      <p className="turnstile-note"><ShieldCheck size={13} style={{ verticalAlign: "middle" }} /> Forms support Cloudflare Turnstile when production keys are configured.</p>
      <button className="button button-gold" type="submit" disabled={pending}>{pending ? "Sending…" : "Send enquiry"}<ArrowRight size={16} /></button>
    </form>
  );
}

function ConciergeLeadForm() {
  const [state, action, pending] = useActionState(submitLead, initialActionState);
  const [step, setStep] = useState(1);
  const [preferredState, setPreferredState] = useState("");
  const [city, setCity] = useState("");
  const [relationship, setRelationship] = useState("");
  const [careNeeds, setCareNeeds] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const canContinue = step === 1 ? Boolean(preferredState && city.trim()) : step === 2 ? Boolean(relationship && careNeeds) : Boolean(name.trim() && phone.trim() && email.trim() && consent);

  return (
    <form className="concierge-form" action={action}>
      <div className="concierge-progress" aria-label={`Step ${step} of 3`}><span style={{ width: `${(step / 3) * 100}%` }} /></div>
      <p className="concierge-step-label">Step {step} of 3</p>
      {step === 1 && <fieldset className="concierge-step"><legend>Where are you looking?</legend><p>Start with the state or union territory, then add the city or area.</p><div className="form-grid"><div className="form-field"><label htmlFor="concierge-state">State or union territory</label><select id="concierge-state" value={preferredState} onChange={(event) => { setPreferredState(event.target.value); setCity(""); }} required><option value="">Choose a state or region</option>{indianStates.map((item) => <option key={item}>{item}</option>)}</select></div><div className="form-field"><label htmlFor="concierge-city">City or preferred area</label><input id="concierge-city" value={city} onChange={(event) => setCity(event.target.value)} required autoComplete="address-level2" placeholder="e.g. Gurgaon or Pune" list="concierge-city-options" /><datalist id="concierge-city-options">{cities.filter((item) => !preferredState || item.state === preferredState).map((item) => <option key={item.slug} value={item.name} />)}</datalist></div></div></fieldset>}
      {step === 2 && <fieldset className="concierge-step"><legend>What kind of help would be useful?</legend><p>These details help us route your request to suitable residences.</p><div className="form-grid"><div className="form-field"><label htmlFor="concierge-relationship">I’m looking for</label><select id="concierge-relationship" value={relationship} onChange={(event) => setRelationship(event.target.value)} required><option value="">Select one</option><option>My mother or father</option><option>My spouse</option><option>Myself</option><option>A relative or friend</option></select></div><div className="form-field"><label htmlFor="concierge-care">Support needed</label><select id="concierge-care" value={careNeeds} onChange={(event) => setCareNeeds(event.target.value)} required><option value="">Choose care</option>{careTypes.map((care) => <option key={care.slug}>{care.name}</option>)}</select></div><div className="form-field form-field-full"><label htmlFor="concierge-budget">Monthly budget</label><select id="concierge-budget" value={budget} onChange={(event) => setBudget(event.target.value)}><option value="">Still exploring</option><option>Under ₹75,000</option><option>₹75,000–₹1.25 lakh</option><option>₹1.25–₹2 lakh</option><option>Above ₹2 lakh</option></select></div></div></fieldset>}
      {step === 3 && <fieldset className="concierge-step"><legend>Where should we send your shortlist?</legend><p>We only use these details to help with this care search.</p><div className="form-grid"><div className="form-field"><label htmlFor="concierge-name">Your name</label><input id="concierge-name" value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" /><FieldError errors={state.errors?.name} /></div><div className="form-field"><label htmlFor="concierge-phone">Phone number</label><input id="concierge-phone" value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" required autoComplete="tel" placeholder="+91" /><FieldError errors={state.errors?.phone} /></div><div className="form-field form-field-full"><label htmlFor="concierge-email">Email address</label><input id="concierge-email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" required autoComplete="email" /><FieldError errors={state.errors?.email} /></div></div><label className="check-list"><span><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /> I agree to be contacted about this enquiry and accept the privacy policy.</span></label></fieldset>}
      <input type="hidden" name="leadType" value="concierge" /><input type="hidden" name="propertyId" value="" /><input type="hidden" name="propertyName" value="" /><input type="hidden" name="name" value={name} /><input type="hidden" name="phone" value={phone} /><input type="hidden" name="email" value={email} /><input type="hidden" name="relationship" value={relationship} /><input type="hidden" name="preferredState" value={preferredState} /><input type="hidden" name="city" value={city} /><input type="hidden" name="careNeeds" value={careNeeds} /><input type="hidden" name="budget" value={budget} /><input type="hidden" name="consent" value={consent ? "on" : ""} /><input type="hidden" name="message" value="Concierge shortlist request." /><input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" />
      {state.status !== "idle" && <p className={`form-status ${state.status === "error" ? "error" : ""}`}>{state.message}</p>}
      <div className="concierge-form-actions">{step > 1 && <button className="button button-ghost" type="button" onClick={() => setStep((current) => current - 1)} disabled={pending}><ArrowLeft size={16} /> Back</button>}{step < 3 ? <button className="button button-gold" type="button" disabled={!canContinue} onClick={() => setStep((current) => current + 1)}>Continue <ArrowRight size={16} /></button> : <button className="button button-gold" type="submit" disabled={pending || !canContinue}>{pending ? "Sending…" : "Request my shortlist"}<ArrowRight size={16} /></button>}</div>
      <p className="turnstile-note"><ShieldCheck size={13} style={{ verticalAlign: "middle" }} /> Your information stays private and is only used to help with your care search.</p>
    </form>
  );
}

function FieldError({ errors }: { errors?: string[] }) { return errors?.length ? <small style={{ color: "#8a302c" }}>{errors[0]}</small> : null; }
