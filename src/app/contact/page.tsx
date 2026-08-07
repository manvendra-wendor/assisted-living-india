import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessagesSquare } from "lucide-react";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = { title: "Contact Us", description: "Contact Assisted Living India about family guidance, a profile correction, partnership or listing verification." };

export default function ContactPage() { return <><header className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} /><span className="eyebrow">Get in touch</span><h1>How can we help?</h1><p>Choose the route that gets your request to the right team. Please do not send medical records or urgent health information.</p></div></header><section className="section"><div className="container"><div className="care-grid"><Link className="care-card" href="/concierge"><span className="care-number">01</span><h3>Family guidance</h3><p>Tell us about the location, care and budget you are exploring.</p><MessagesSquare size={20} /></Link><a className="care-card" href="mailto:editorial@assistedlivingindia.com"><span className="care-number">02</span><h3>Corrections & editorial</h3><p>Report an inaccurate profile or ask about our research methodology.</p><Mail size={20} /></a><Link className="care-card" href="/list-your-property"><span className="care-number">03</span><h3>Operators & listings</h3><p>Submit, claim or verify a senior-living property profile.</p><Mail size={20} /></Link></div></div></section></>; }
