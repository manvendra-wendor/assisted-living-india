"use client";

import { useActionState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { submitLead } from "@/app/actions";
import { careTypes, cities } from "@/lib/data";
import { initialActionState } from "@/lib/validation";

export function LeadForm({ type = "property", propertyId, propertyName }: { type?: "property" | "concierge"; propertyId?: string; propertyName?: string }) {
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
        <div className="form-field"><label htmlFor={`${type}-city`}>Preferred location</label><select id={`${type}-city`} name="city" required defaultValue=""><option value="" disabled>Choose a city</option>{cities.map((city) => <option key={city.slug}>{city.name}</option>)}</select></div>
        <div className="form-field"><label htmlFor={`${type}-care`}>Support needed</label><select id={`${type}-care`} name="careNeeds" required defaultValue=""><option value="" disabled>Choose care</option>{careTypes.map((care) => <option key={care.slug}>{care.name}</option>)}</select></div>
        <div className="form-field"><label htmlFor={`${type}-budget`}>Monthly budget</label><select id={`${type}-budget`} name="budget" defaultValue=""><option value="">Still exploring</option><option>Under ₹75,000</option><option>₹75,000–₹1.25 lakh</option><option>₹1.25–₹2 lakh</option><option>Above ₹2 lakh</option></select></div>
        <div className="form-field form-field-full"><label htmlFor={`${type}-message`}>Anything we should know?</label><textarea id={`${type}-message`} name="message" placeholder="Share care needs, timing or the questions on your mind." /></div>
      </div>
      <label className="check-list"><span><input type="checkbox" name="consent" required /> I agree to be contacted about this enquiry and accept the privacy policy.</span></label>
      {state.status !== "idle" && <p className={`form-status ${state.status === "error" ? "error" : ""}`}>{state.message}</p>}
      <p className="turnstile-note"><ShieldCheck size={13} style={{ verticalAlign: "middle" }} /> Forms support Cloudflare Turnstile when production keys are configured.</p>
      <button className="button button-gold" type="submit" disabled={pending}>{pending ? "Sending…" : type === "concierge" ? "Request my shortlist" : "Send enquiry"}<ArrowRight size={16} /></button>
    </form>
  );
}

function FieldError({ errors }: { errors?: string[] }) { return errors?.length ? <small style={{ color: "#8a302c" }}>{errors[0]}</small> : null; }
