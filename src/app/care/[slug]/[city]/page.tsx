import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CityLinks } from "@/components/city-links";
import { PropertyCard } from "@/components/property-card";
import { Breadcrumbs, JsonLd, SectionHeading } from "@/components/ui";
import { carePageDetails, getCareType, localCarePages, properties, siteConfig } from "@/lib/data";

type Props = { params: Promise<{ slug: string; city: string }> };
export function generateStaticParams() { return localCarePages.map((page) => ({ slug: page.careSlug, city: page.citySlug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city } = await params;
  const page = localCarePages.find((item) => item.careSlug === slug && item.citySlug === city);
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/care/${slug}/${city}` }, openGraph: { title: page.title, description: page.description, url: `/care/${slug}/${city}`, images: [carePageDetails[page.careSlug].image] } };
}
export default async function LocalCarePage({ params }: Props) {
  const { slug, city } = await params;
  const page = localCarePages.find((item) => item.careSlug === slug && item.citySlug === city);
  const care = getCareType(slug);
  if (!page || !care) notFound();
  const listings = properties.filter((property) => property.citySlug === city && property.careTypes.includes(care.slug));
  const url = `${siteConfig.url}/care/${slug}/${city}`;
  return <>
    <JsonLd data={[{ "@context": "https://schema.org", "@type": "CollectionPage", name: page.title, description: page.description, url, mainEntity: { "@type": "ItemList", itemListElement: listings.map((property, index) => ({ "@type": "ListItem", position: index + 1, name: property.name, url: `${siteConfig.url}/properties/${property.slug}` })) } }, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: care.name, item: `${siteConfig.url}/care/${slug}` }, { "@type": "ListItem", position: 3, name: page.name, item: url }] }]} />
    <header className="care-editorial-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: care.name, href: `/care/${slug}` }, { label: page.name }]} /><div className="care-editorial-grid"><div><span className="eyebrow">Memory support · {page.name}</span><h1>Dementia care homes in {page.name}</h1><p>{page.introduction}</p><a href="#local-residences" className="button">Explore local profiles</a></div><div className="care-editorial-photo"><Image src={carePageDetails[care.slug].image} alt="" fill priority sizes="(max-width: 760px) 100vw, 45vw" /></div></div></div></header>
    <section className="section" id="local-residences"><div className="container"><SectionHeading eyebrow="Local options" title={`Explore ${page.name} memory care profiles`} body="Editorial previews, not operator-verified recommendations. Confirm specialist support and availability before arranging a stay." /><div className="property-grid">{listings.map((property) => <PropertyCard key={property.id} property={property} />)}</div>{listings.length === 0 && <p>We do not yet have matching profiles. <Link href="/concierge">Ask for help with your search.</Link></p>}</div></section>
    <section className="section section-soft"><div className="container"><SectionHeading eyebrow="Planning locally" title="A shortlist that works for your family" /><div className="care-decision-grid">{page.sections.map((section) => <div className="care-decision-card" key={section.heading}><h3>{section.heading}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>)}</div><nav className="care-reading-links" aria-label="Related local care guidance"><Link href={`/assisted-living/${city}`}>All assisted living in {page.name}</Link><Link href={`/care/${slug}`}>Dementia care across India</Link><Link href="/blog/dementia-care-at-home-vs-care-home">Home care or a care home?</Link><Link href="/concierge">Help with a shortlist</Link></nav></div></section>
    <CityLinks currentSlug={city} />
  </>;
}
