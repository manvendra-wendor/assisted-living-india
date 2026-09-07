import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, BedDouble, CalendarCheck, CheckCircle2, Clock3, ExternalLink, HeartPulse, MapPin, MessageSquareText, ShieldCheck } from "lucide-react";
import { CompareToggle } from "@/components/compare-provider";
import { LeadForm } from "@/components/lead-form";
import { PricingTrigger } from "@/components/pricing-modal";
import { ReviewForm } from "@/components/review-form";
import { CityLinks } from "@/components/city-links";
import { Breadcrumbs, JsonLd } from "@/components/ui";
import { availabilityLabel, careTypes, facilities, getCity, getProperty, properties, siteConfig } from "@/lib/data";

export function generateStaticParams() { return properties.map((property) => ({ slug: property.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};
  return {
    title: `${property.name}, ${property.locality} – Care & Availability`,
    description: `${property.summary} Compare care capabilities, rooms, amenities and availability.`,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: { images: [property.image] },
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();
  const city = getCity(property.citySlug);
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: property.summary,
    image: property.gallery,
    url: `${siteConfig.url}/properties/${property.slug}`,
    address: { "@type": "PostalAddress", addressLocality: property.locality, addressRegion: property.state, addressCountry: "IN" },
  };
  return (
    <>
      <JsonLd data={schema} />
      <header className="property-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Directory", href: "/directory" }, { label: city?.name || property.state, href: `/assisted-living/${property.citySlug}` }, { label: property.name }]} />
          <div className="property-title-row"><div><span className={property.verified ? "status-badge verified" : "status-badge"}>{property.verified && <BadgeCheck size={14} />}{property.verified ? "Operator verified" : "Unclaimed editorial profile"}</span><h1>{property.name}</h1><span className="property-location"><MapPin size={15} /> {property.address}</span></div><div className="property-hero-actions"><CompareToggle id={property.id} /><a className="button button-gold" href="#enquire">Check availability</a></div></div>
          <div className="property-gallery">{property.gallery.map((image, index) => <div className="gallery-image" key={image}><Image src={image} alt={`${property.name} editorial gallery image ${index + 1}`} fill priority={index === 0} sizes={index === 0 ? "70vw" : "30vw"} /></div>)}</div>
        </div>
      </header>
      <div className="container property-layout">
        <div className="property-main">
          <section><div className="notice"><ShieldCheck size={19} /><span><strong>Editorial preview—not operator verified.</strong> Services, availability, imagery and final fees must be confirmed directly before making a care decision. <Link href="/editorial-policy">How verification works</Link>.</span></div></section>
          <section><span className="eyebrow">At a glance</span><h2>A warm setting for supported living</h2><p>{property.description}</p><div className="care-tags">{property.careTypes.map((slug) => <Link key={slug} href={`/care/${slug}`}>{careTypes.find((care) => care.slug === slug)?.name}</Link>)}</div></section>
          <section><span className="eyebrow">Care capabilities</span><h2>Support to confirm with the provider</h2><p>“Ask provider” means the service may depend on an assessment, visiting specialist or additional fee.</p><div className="facility-list">{facilities.map((facility) => <div className="facility-item" key={facility.key}><span><HeartPulse size={17} />{facility.label}</span><span className="availability">{availabilityLabel(property.facilities[facility.key])}</span></div>)}</div></section>
          <section><span className="eyebrow">Rooms & stays</span><h2>Accommodation options</h2><div className="facility-list"><div className="facility-item"><span><BedDouble size={17} /> Room types</span><span className="availability">{property.roomTypes.join(" · ")}</span></div><div className="facility-item"><span><CalendarCheck size={17} /> Stay options</span><span className="availability">{property.stayTypes.join(" · ")}</span></div></div></section>
          <section><span className="eyebrow">Everyday life</span><h2>Amenities listed for comparison</h2><ul className="amenity-list">{property.amenities.map((amenity) => <li key={amenity}><CheckCircle2 size={16} />{amenity}</li>)}</ul></section>
          <section><span className="eyebrow">Family reviews</span><h2>No published reviews yet</h2><p>Be the first to share a genuine visit or resident experience. Reviews are checked against our community guidelines before publication.</p><details><summary className="button button-ghost" style={{ display: "inline-flex" }}>Write a review</summary><div className="form-card" style={{ marginTop: 20 }}><ReviewForm propertyId={property.id} propertyName={property.name} /></div></details></section>
          <section id="enquire"><div className="form-card"><span className="eyebrow">Direct enquiry</span><h2>Ask {property.name}</h2><p>Share a little context so the care team can respond meaningfully. This is an enquiry, not a booking.</p><LeadForm propertyId={property.id} propertyName={property.name} /></div></section>
          <section><span className="eyebrow">Profile transparency</span><h2>Source and verification</h2><p>This preview record was last updated on {property.lastUpdated}. It is unclaimed and has not been confirmed by the operator.</p><Link className="text-link" href={property.source.url}>{property.source.label} <ExternalLink size={14} /></Link></section>
        </div>
        <aside className="property-sidebar">
          <div className="side-card"><PricingTrigger propertyId={property.id} propertyName={property.name} city={city?.name} className="side-card-price pricing-summary-trigger"><small>Personalised monthly fees</small><strong>Pricing on request</strong></PricingTrigger><p>Share a few details to receive relevant pricing for your care needs and preferred timeline.</p><PricingTrigger propertyId={property.id} propertyName={property.name} city={city?.name} className="button button-gold">Get pricing</PricingTrigger><a className="button button-ghost" href="#enquire">Enquire with residence</a><Link className="button button-ghost" href={`/concierge?property=${property.slug}`}>Ask our concierge</Link><div className="side-card-trust"><span><Clock3 size={14} /> Typical response target: one business day</span><span><ShieldCheck size={14} /> Your details are only used for this enquiry</span><span><MessageSquareText size={14} /> No booking fee from our directory</span></div></div>
        </aside>
      </div>
      <CityLinks currentSlug={property.citySlug} title="Explore senior care in other cities" body="Comparing across cities is common when family is spread out. Each guide covers local residences and typical monthly costs." />
    </>
  );
}
