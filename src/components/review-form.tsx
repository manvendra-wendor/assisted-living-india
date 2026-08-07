"use client";

import { useActionState } from "react";
import { Star } from "lucide-react";
import { submitReview } from "@/app/actions";
import { initialActionState } from "@/lib/validation";

export function ReviewForm({ propertyId, propertyName }: { propertyId: string; propertyName: string }) {
  const [state, action, pending] = useActionState(submitReview, initialActionState);
  return <form action={action}>
    <input type="hidden" name="propertyId" value={propertyId} /><input type="hidden" name="propertyName" value={propertyName} /><input className="honeypot" name="website" tabIndex={-1} />
    <div className="form-grid">
      <div className="form-field"><label htmlFor="review-rating">Overall rating</label><select id="review-rating" name="rating" required defaultValue=""><option value="" disabled>Choose a rating</option>{[5,4,3,2,1].map((value) => <option key={value} value={value}>{value} star{value === 1 ? "" : "s"}</option>)}</select></div>
      <div className="form-field"><label htmlFor="review-relationship">Your relationship</label><select id="review-relationship" name="relationship" required defaultValue=""><option value="" disabled>Choose one</option><option>Resident</option><option>Child of a resident</option><option>Spouse of a resident</option><option>Relative or friend</option><option>Visitor</option></select></div>
      <div className="form-field"><label htmlFor="stay-date">Stay or visit date</label><input id="stay-date" name="stayDate" type="month" /></div>
      <div className="form-field form-field-full"><label htmlFor="review-title">Review title</label><input id="review-title" name="title" required /></div>
      <div className="form-field form-field-full"><label htmlFor="review-body">Your experience</label><textarea id="review-body" name="body" required minLength={30} placeholder="What went well? What should another family know? Please avoid sharing private medical information." /></div>
    </div>
    <label className="check-list"><span><input type="checkbox" name="visitConfirmed" required /> I confirm this review reflects a genuine visit or resident experience.</span></label>
    {state.status !== "idle" && <p className={`form-status ${state.status === "error" ? "error" : ""}`}>{state.message}</p>}
    <button className="button" type="submit" disabled={pending}><Star size={16} /> {pending ? "Submitting…" : "Submit for moderation"}</button>
  </form>;
}
