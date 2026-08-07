import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ClipboardList, HeartHandshake, IndianRupee, MapPin } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { SearchBox } from "@/components/search-box";
import { Breadcrumbs, JsonLd, SectionHeading } from "@/components/ui";
import { articles, locationPages, properties, siteConfig } from "@/lib/data";

export function generateStaticParams() {
  return locationPages.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const location = locationPages.find((item) => item.slug === city);
  if (!location) return {};
  return {
    title: location.seoTitle,
    description: location.seoDescription,
    alternates: { canonical: `/assisted-living/${location.slug}` },
    openGraph: { images: [location.image] },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const location = locationPages.find((item) => item.slug === city);
  if (!location) notFound();
  const listings = properties.filter((property) => property.citySlug === location.parentCitySlug);
  const article = articles.find((item) => item.citySlug === location.parentCitySlug);
  const faqs = [
    { question: `How much does assisted living in ${location.name} cost?`, answer: location.costContext },
    { question: "What should families verify before choosing?", answer: "Confirm night staffing, medical escalation, caregiver training, medication processes, meal flexibility, monthly inclusions and how changing care needs are handled." },
    { question: "Can I arrange a short or respite stay?", answer: "Some residences offer trial, respite or recovery stays subject to assessment and availability. Use the stay filter or ask our concierge to confirm current options." },
  ];
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "CollectionPage", name: `Assisted Living in ${location.name}`, url: `${siteConfig.url}/assisted-living/${location.slug}`, description: location.description },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Assisted living", item: `${siteConfig.url}/directory?care=assisted-living` },
          { "@type": "ListItem", position: 3, name: location.name, item: `${siteConfig.url}/assisted-living/${location.slug}` },
        ] },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      ]} />
      <header className="page-hero">
        <div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Assisted living", href: "/directory?care=assisted-living" }, { label: location.name }]} /><span className="eyebrow">Senior care in {location.region}</span><h1>Assisted living in {location.name}</h1><p>{location.description}</p><div style={{ marginTop: 30 }}><SearchBox compact defaultCity={location.parentCitySlug} defaultCare="assisted-living" /></div></div>
      </header>
      <section className="location-overview">
        <div className="container location-overview-grid">
          <div>
            <span className="eyebrow">Local assisted-living guide</span>
            <h2>What families should know about senior living in {location.name}</h2>
            <p>{location.marketSummary}</p>
            <div className="keyword-chips">{location.secondaryKeywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
          </div>
          <aside className="location-cost-card">
            <IndianRupee size={25} />
            <h3>Understanding monthly costs</h3>
            <p>{location.costContext}</p>
            <Link className="text-link" href="/blog/cost-of-assisted-living-in-india">Read the India cost guide <ArrowRight size={15} /></Link>
          </aside>
        </div>
      </section>
      <section className="section">
        <div className="container"><SectionHeading eyebrow={`${listings.length} editorial profiles to explore`} title={`Compare care residences ${location.slug === "gurgaon" ? "in Gurgaon and nearby Delhi NCR" : `around ${location.name}`}`} body="Start with the services shown, then ask each operator to confirm availability and suitability following an individual assessment." action={{ label: "Open filtered directory", href: `/directory?city=${location.parentCitySlug}&care=assisted-living` }} /><div className="property-grid">{listings.map((property) => <PropertyCard property={property} key={property.id} />)}</div></div>
      </section>
      <section className="section section-soft">
        <div className="container"><SectionHeading eyebrow="What to look for" title="The details behind a confident decision" /><div className="care-grid">{[
          { icon: HeartHandshake, title: "Care that feels personal", body: "Ask how routines, language, meals and personal preferences become part of the care plan." },
          { icon: ClipboardList, title: "A complete monthly estimate", body: "Compare accommodation, personal care, nursing, therapies, consumables and deposits together." },
          { icon: MapPin, title: "The right location", body: `Consider family travel, hospital access and familiar neighbourhoods such as ${location.neighbourhoods.slice(0, 3).join(", ")}.` },
        ].map(({ icon: Icon, title, body }, index) => <div className="care-card" key={title}><span className="care-number">0{index + 1}</span><h3>{title}</h3><p>{body}</p><Icon size={20} /></div>)}</div></div>
      </section>
      <section className="section">
        <div className="narrow"><span className="eyebrow">Frequently asked questions</span><h2 style={{ color: "var(--forest)" }}>Planning senior care in {location.name}</h2>{faqs.map((faq) => <details key={faq.question} style={{ padding: "20px 0", borderBottom: "1px solid var(--line)" }}><summary style={{ color: "var(--forest)", fontWeight: 750, cursor: "pointer" }}>{faq.question}</summary><p style={{ color: "var(--muted)", margin: "14px 0 0" }}>{faq.answer}</p></details>)}<div className="location-guide-links">{article && <Link className="text-link" href={`/blog/${article.slug}`}>Read: {article.title} <ArrowRight size={15} /></Link>}<Link className="text-link" href="/blog/how-to-choose-assisted-living">Use the family comparison checklist <ArrowRight size={15} /></Link></div></div>
      </section>
    </>
  );
}
