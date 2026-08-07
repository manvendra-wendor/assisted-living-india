"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { submitListing } from "@/app/actions";
import { cities } from "@/lib/data";
import { initialActionState } from "@/lib/validation";

export function ListingForm() {
  const [state, action, pending] = useActionState(submitListing, initialActionState);
  return <form action={action}>
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
    <div className="form-grid">
      <div className="form-field"><label htmlFor="operator-name">Your name</label><input id="operator-name" name="operatorName" required /></div>
      <div className="form-field"><label htmlFor="listing-email">Work email</label><input id="listing-email" type="email" name="email" required /></div>
      <div className="form-field"><label htmlFor="listing-phone">Phone number</label><input id="listing-phone" type="tel" name="phone" required /></div>
      <div className="form-field"><label htmlFor="property-name">Property or community name</label><input id="property-name" name="propertyName" required /></div>
      <div className="form-field"><label htmlFor="listing-city">City</label><select id="listing-city" name="city" required defaultValue=""><option value="" disabled>Choose a city</option>{cities.map((city) => <option key={city.slug}>{city.name}</option>)}<option>Another location</option></select></div>
      <div className="form-field"><label htmlFor="listing-url">Property website</label><input id="listing-url" type="url" name="websiteUrl" placeholder="https://" /></div>
      <div className="form-field form-field-full"><label htmlFor="listing-care">Care offered</label><input id="listing-care" name="careTypes" required placeholder="e.g. assisted living, dementia care, post-operative care" /></div>
      <div className="form-field form-field-full"><label htmlFor="listing-note">Tell us about the property</label><textarea id="listing-note" name="message" placeholder="Location, number of rooms, clinical support and anything that makes the residence distinctive." /></div>
    </div>
    <label className="check-list"><span><input type="checkbox" name="consent" required /> I am authorised to submit this information and agree to verification before publication.</span></label>
    {state.status !== "idle" && <p className={`form-status ${state.status === "error" ? "error" : ""}`}>{state.message}</p>}
    <button className="button button-gold" type="submit" disabled={pending}>{pending ? "Submitting…" : "Submit for editorial review"}<ArrowRight size={16} /></button>
  </form>;
}
