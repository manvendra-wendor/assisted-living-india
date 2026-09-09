import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CityLinks } from "@/components/city-links";
import { PropertyCard } from "@/components/property-card";
import { SearchBox } from "@/components/search-box";
import { Breadcrumbs, JsonLd, SectionHeading } from "@/components/ui";
import { careTypes, carePageDetails, getCareType, properties, siteConfig } from "@/lib/data";

export function generateStaticParams() { return careTypes.map((care) => ({ slug: care.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const care = getCareType(slug);
  if (!care) return {};
  const title = carePageDetails[care.slug].title;
  const description = `${care.description} Compare ${care.name.toLowerCase()} profiles in India, services, fees and questions to ask before choosing.`;
  return { title, description, alternates: { canonical: `/care/${care.slug}` }, openGraph: { title, description, url: `/care/${care.slug}`, images: [carePageDetails[care.slug].image] } };
}

export default async function CarePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const care = getCareType(slug);
  if (!care) notFound();
  const details = carePageDetails[care.slug];
  const listings = properties.filter((property) => property.careTypes.includes(care.slug));
  const faqs = [
    { q: `Who is ${care.name.toLowerCase()} for?`, a: care.longDescription },
    { q: "How should a family compare options?", a: "Begin with a care assessment, then compare staffing, clinical escalation, daily routines, accommodation, fees and how needs can be reviewed over time." },
    { q: "Is a medical assessment required?", a: "Most supported-care providers assess health, mobility and daily-living needs before confirming suitability and pricing." },
  ];
  return (
    <>
      <JsonLd data={[{ "@context": "https://schema.org", "@type": "CollectionPage", name: details.title, url: `${siteConfig.url}/care/${care.slug}`, description: care.longDescription, mainEntity: { "@type": "ItemList", itemListElement: listings.slice(0, 6).map((property, index) => ({ "@type": "ListItem", position: index + 1, name: property.name, url: `${siteConfig.url}/properties/${property.slug}` })) } }, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: "Directory", item: `${siteConfig.url}/directory` }, { "@type": "ListItem", position: 3, name: care.name, item: `${siteConfig.url}/care/${care.slug}` }] }, { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) }]} />
      <header className="care-editorial-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Types of care", href: "/directory" }, { label: care.name }]} /><div className="care-editorial-grid"><div><span className="eyebrow">{care.eyebrow}</span><h1>{details.title.split(/[:|]/)[0]}</h1><p>{care.longDescription}</p><a className="button" href="#care-residences">Explore residences <ArrowRight size={16} /></a></div><div className="care-editorial-photo"><Image src={details.image} alt="" fill priority sizes="(max-width: 760px) 100vw, 45vw" /></div></div><div className="care-hero-search"><SearchBox compact defaultCare={care.slug} /></div></div></header>
      <section className="section" id="care-residences"><div className="container"><SectionHeading eyebrow="Residences to consider" title={`Explore ${care.name.toLowerCase()} profiles`} body="Editorial preview profiles. Confirm care capabilities, current fees and availability directly with the provider." action={{ label: "View filtered directory", href: `/directory?care=${care.slug}` }} /><div className="property-grid">{listings.slice(0, 6).map((property) => <PropertyCard key={property.id} property={property} />)}</div></div></section>
      <section className="section section-soft"><div className="container"><SectionHeading eyebrow="Before you choose" title={`A closer look at ${care.name.toLowerCase()}`} /><div className="care-decision-grid"><div className="care-decision-card"><span className="eyebrow">01 · The care</span><h3>Ask about the everyday details</h3><ul>{details.questions.map((question) => <li key={question}>{question}</li>)}</ul></div><div className="care-decision-card"><span className="eyebrow">02 · The budget</span><h3>Understand the complete cost</h3><p>{details.budget}</p></div><div className="care-decision-card"><span className="eyebrow">03 · Your family</span><h3>Stay involved from anywhere</h3><p>Agree who receives updates, how visits work and who handles urgent questions. Ask for a video tour and written next steps if you are arranging care from abroad.</p><Link className="text-link" href="/concierge">Plan your shortlist <ArrowRight size={15} /></Link></div></div><nav className="care-reading-links" aria-label="Related care guides">{details.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav></div></section>
      <section className="section"><div className="narrow"><span className="eyebrow">Questions families ask</span><h2 style={{ color: "var(--forest)" }}>Understanding {care.name.toLowerCase()}</h2><div className="faq-list">{faqs.map((faq) => <details className="faq-item" key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div><div className="prose-note"><strong>Need help interpreting care options?</strong><p>Our concierge can help organise questions and build a shortlist. It does not replace medical advice or a provider assessment.</p><Link className="text-link" href="/concierge">Request guidance <ArrowRight size={15} /></Link></div></div></section>
      <CityLinks title={`Find ${care.name.toLowerCase()} near you`} body="Start from a city to see which residences list this type of support, and how local pricing compares." />
    </>
  );
}
