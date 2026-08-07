import type { Metadata } from "next";
import Image from "next/image";
import { Check, HeartHandshake } from "lucide-react";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = { title: "Free Senior Care Concierge", description: "Tell us what your family needs and receive a considered shortlist of assisted living and senior care options." };

export default function ConciergePage() {
  return <div className="split-page">
    <aside className="split-page-aside"><Image src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1300&q=86" alt="A family having a thoughtful conversation" fill sizes="(max-width: 760px) 100vw, 40vw" /><div><span className="eyebrow">Free family guidance</span><h1>A calmer way to build your shortlist.</h1><p>We organise your priorities, help you ask better questions and connect you with suitable residences. There is no directory fee for families.</p><div className="story-points"><div className="story-point"><span><Check size={14} /></span><div><strong>Independent starting point</strong><small>Suitability and verification status are made clear.</small></div></div><div className="story-point"><span><Check size={14} /></span><div><strong>No-pressure introductions</strong><small>You choose which residences may contact you.</small></div></div></div></div></aside>
    <section className="split-page-main"><div className="form-card"><HeartHandshake size={28} color="var(--gold-dark)" /><span className="eyebrow" style={{ display: "block", marginTop: 15 }}>Tell us what matters</span><h2>Request a considered shortlist</h2><p>An advisor will use the details below to understand the setting, care and budget your family is exploring.</p><LeadForm type="concierge" /></div></section>
  </div>;
}
