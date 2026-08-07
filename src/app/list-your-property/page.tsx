import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, ClipboardCheck, Users } from "lucide-react";
import { ListingForm } from "@/components/listing-form";

export const metadata: Metadata = { title: "List Your Senior Living Property", description: "Submit an assisted living, independent living, dementia care or premium senior community for editorial review." };

export default function ListPropertyPage() {
  return <>
    <div className="split-page">
      <aside className="split-page-aside"><Image src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=86" alt="Premium senior living residence" fill sizes="(max-width: 760px) 100vw, 40vw" /><div><span className="eyebrow">For operators</span><h1>Help families understand your care.</h1><p>Build trust with a detailed profile that makes facilities, pricing context and verification status easy to understand.</p></div></aside>
      <section className="split-page-main"><div className="form-card"><span className="eyebrow">Submit or claim a profile</span><h2>Tell us about your residence</h2><p>Every submission is reviewed before publication. We will request evidence for important care and facility claims.</p><ListingForm /></div></section>
    </div>
    <section className="section"><div className="container"><div className="care-grid">{[
      { icon: ClipboardCheck, title: "Editorial review", text: "We check public facts, contact details and the identity of the submitting operator." },
      { icon: BadgeCheck, title: "Clear verification", text: "Claimed and verified statuses are shown separately so families understand the source." },
      { icon: Users, title: "Qualified enquiries", text: "Families share care context and preferred location before requesting contact." },
    ].map(({ icon: Icon, title, text }, index) => <div className="care-card" key={title}><span className="care-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p><Icon size={20} /></div>)}</div></div></section>
  </>;
}
