import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ClipboardList, HeartHandshake, IndianRupee, MapPin } from "lucide-react";
import { CityLinks } from "@/components/city-links";
import { PropertyCard } from "@/components/property-card";
import { SearchBox } from "@/components/search-box";
import { Breadcrumbs, JsonLd, SectionHeading } from "@/components/ui";
import { articles, careTypes, getLocationCitySlugs, localCarePages, locationPages, properties, siteConfig } from "@/lib/data";

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
    openGraph: { title: location.seoTitle, description: location.seoDescription, url: `/assisted-living/${location.slug}`, images: [location.image] },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const location = locationPages.find((item) => item.slug === city);
  if (!location) notFound();
  const locationCitySlugs = getLocationCitySlugs(location.slug);
  const listings = properties.filter((property) => locationCitySlugs.includes(property.citySlug));
  const article = articles.find((item) => item.citySlug === location.parentCitySlug);
  const faqs = [
    { question: `How much does assisted living in ${location.name} cost?`, answer: location.costContext },
    { question: "What should families verify before choosing?", answer: "Confirm night staffing, medical escalation, caregiver training, medication processes, meal flexibility, monthly inclusions and how changing care needs are handled." },
    { question: "Can I arrange a short or respite stay?", answer: "Some residences offer trial, respite or recovery stays subject to assessment and availability. Use the stay filter or ask our concierge to confirm current options." },
  ];
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "CollectionPage", name: `Assisted Living in ${location.name}`, url: `${siteConfig.url}/assisted-living/${location.slug}`, description: location.description, mainEntity: { "@type": "ItemList", itemListElement: listings.map((property, index) => ({ "@type": "ListItem", position: index + 1, name: property.name, url: `${siteConfig.url}/properties/${property.slug}` })) } },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Assisted living", item: `${siteConfig.url}/directory?care=assisted-living` },
          { "@type": "ListItem", position: 3, name: location.name, item: `${siteConfig.url}/assisted-living/${location.slug}` },
        ] },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      ]} />
      <header className="care-editorial-hero">
        <div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Assisted living", href: "/care/assisted-living" }, { label: location.name }]} /><div className="care-editorial-grid"><div><span className="eyebrow">Senior care in {location.region}</span><h1>{location.slug === "bengaluru" ? "Senior living & retirement homes in Bangalore" : `Assisted living in ${location.name}`}</h1><p>{location.description}</p><a href="#city-residences" className="button">Compare local residences <ArrowRight size={16} /></a></div><div className="care-editorial-photo"><Image src={location.image} alt={`${location.name}, India`} fill priority sizes="(max-width: 760px) 100vw, 45vw" /></div></div><div className="care-hero-search"><SearchBox compact defaultCity={location.slug} defaultCare="assisted-living" /></div></div>
      </header>
      <section className="location-overview">
        <div className="container location-overview-grid">
          <div>
            <span className="eyebrow">Local assisted-living guide</span>
            <h2>What families should know about senior living in {location.name}</h2>
            <p>{location.marketSummary}</p>
            <nav className="care-reading-links" aria-label={`Senior living choices in ${location.name}`}><Link href="/care/independent-living">Independent living & retirement homes</Link><Link href="/care/luxury-senior-living">Luxury senior living</Link>{localCarePages.filter((page) => page.citySlug === location.parentCitySlug).map((page) => <Link key={page.careSlug} href={`/care/${page.careSlug}/${page.citySlug}`}>Dementia care homes in {location.name}</Link>)}</nav>
          </div>
          <aside className="location-cost-card">
            <IndianRupee size={25} />
            <h3>Understanding monthly costs</h3>
            <p>{location.costContext}</p>
            <Link className="text-link" href="/blog/cost-of-assisted-living-in-india">Read the India cost guide <ArrowRight size={15} /></Link>
          </aside>
        </div>
      </section>
      <section className="section" id="city-residences">
        <div className="container"><SectionHeading eyebrow={`${listings.length} source-labelled profiles to explore`} title={`Compare care residences ${location.slug === "gurgaon" ? "in Gurgaon" : location.slug === "delhi-ncr" ? "across Delhi NCR" : `around ${location.name}`}`} body="Start with the services shown, then ask each operator to confirm availability and suitability following an individual assessment." action={{ label: "Open filtered directory", href: `/directory?city=${location.slug}&care=assisted-living` }} /><div className="property-grid">{listings.map((property) => <PropertyCard property={property} key={property.id} />)}</div></div>
        <div className="container"><div className="care-link-row"><span>Care types in {location.name}:</span>{careTypes.map((care) => <Link href={`/care/${care.slug}`} key={care.slug}>{care.name}</Link>)}</div></div>
      </section>
      <section className="section section-soft">
        <div className="container"><SectionHeading eyebrow="What to look for" title="The details behind a confident decision" /><div className="care-grid">{[
          { icon: HeartHandshake, title: "Care that feels personal", body: "Ask how routines, language, meals and personal preferences become part of the care plan." },
          { icon: ClipboardList, title: "A complete monthly estimate", body: "Compare accommodation, personal care, nursing, therapies, consumables and deposits together." },
          { icon: MapPin, title: "The right location", body: `Consider family travel, hospital access and familiar neighbourhoods such as ${location.neighbourhoods.slice(0, 3).join(", ")}.` },
        ].map(({ icon: Icon, title, body }, index) => <div className="care-card" key={title}><span className="care-number">0{index + 1}</span><h3>{title}</h3><p>{body}</p><Icon size={20} /></div>)}</div></div>
      </section>
      <section className="section">
        <div className="narrow"><span className="eyebrow">Frequently asked questions</span><h2 style={{ color: "var(--forest)" }}>Planning senior care in {location.name}</h2><div className="faq-list">{faqs.map((faq) => <details className="faq-item" key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div><div className="location-guide-links">{article && <Link className="text-link" href={`/blog/${article.slug}`}>Read: {article.title} <ArrowRight size={15} /></Link>}<Link className="text-link" href="/blog/how-to-choose-assisted-living">Use the family comparison checklist <ArrowRight size={15} /></Link></div></div>
      </section>
      <CityLinks currentSlug={location.slug} title={`Senior care beyond ${location.name}`} body="Families often compare two or three cities before deciding. Each guide covers local residences, typical monthly costs and what to verify on a visit." />
    </>
  );
}
