import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { SearchBox } from "@/components/search-box";
import { Breadcrumbs, JsonLd, SectionHeading } from "@/components/ui";
import { careTypes, facilities, getCareType, properties } from "@/lib/data";

export function generateStaticParams() { return careTypes.map((care) => ({ slug: care.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const care = getCareType(slug);
  if (!care) return {};
  const title = care.slug === "dementia-care" ? "Memory Care & Dementia Care in India" : `${care.name} in India – Compare Premium Residences`;
  return { title, description: `${care.description} Compare residences, care services and pricing across India.`, alternates: { canonical: `/care/${care.slug}` } };
}

export default async function CarePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const care = getCareType(slug);
  if (!care) notFound();
  const listings = properties.filter((property) => property.careTypes.includes(care.slug));
  const faqs = [
    { q: `Who is ${care.name.toLowerCase()} for?`, a: care.longDescription },
    { q: "How should a family compare options?", a: "Begin with a care assessment, then compare staffing, clinical escalation, daily routines, accommodation, fees and how needs can be reviewed over time." },
    { q: "Is a medical assessment required?", a: "Most supported-care providers assess health, mobility and daily-living needs before confirming suitability and pricing." },
  ];
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) }} />
      <header className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Types of care", href: "/directory" }, { label: care.name }]} /><span className="eyebrow">{care.eyebrow}</span><h1>{care.slug === "dementia-care" ? "Memory care and dementia care" : care.name} in India</h1><p>{care.longDescription}</p><div style={{ marginTop: 30 }}><SearchBox compact defaultCare={care.slug} /></div></div></header>
      <section className="section"><div className="container"><SectionHeading eyebrow="Residences to consider" title={`Explore ${care.name.toLowerCase()} profiles`} body="Information is organised for comparison; confirm all care capabilities directly with the provider." action={{ label: "View filtered directory", href: `/directory?care=${care.slug}` }} /><div className="property-grid">{listings.slice(0, 6).map((property) => <PropertyCard key={property.id} property={property} />)}</div></div></section>
      <section className="section section-soft"><div className="container"><SectionHeading eyebrow="Core capabilities" title="Ask what is available—and who provides it" body="Services may be included, assessment-based or delivered by visiting clinical partners." /><div className="care-grid">{facilities.slice(0, 6).map((facility, index) => <div className="care-card" key={facility.key}><span className="care-number">0{index + 1}</span><h3>{facility.label}</h3><p>{facility.description}</p><Check size={19} /></div>)}</div></div></section>
      <section className="section"><div className="narrow"><span className="eyebrow">Questions families ask</span><h2 style={{ color: "var(--forest)" }}>Understanding {care.name.toLowerCase()}</h2>{faqs.map((faq) => <details key={faq.q} style={{ padding: "20px 0", borderBottom: "1px solid var(--line)" }}><summary style={{ color: "var(--forest)", fontWeight: 750 }}>{faq.q}</summary><p style={{ color: "var(--muted)", margin: "14px 0 0" }}>{faq.a}</p></details>)}<div className="prose-note"><strong>Need help interpreting care options?</strong><p>Our concierge can help organise questions and build a shortlist. It does not replace medical advice or a provider assessment.</p><Link className="text-link" href="/concierge">Request guidance <ArrowRight size={15} /></Link></div></div></section>
    </>
  );
}
