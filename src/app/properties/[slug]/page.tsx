import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, BedDouble, CalendarCheck, Camera, CheckCircle2, Clock3, ExternalLink, HeartPulse, MapPin, MessageSquareText, ShieldCheck, Star, Video } from "lucide-react";
import { CompareToggle } from "@/components/compare-provider";
import { LeadForm } from "@/components/lead-form";
import { PricingTrigger } from "@/components/pricing-modal";
import { ReviewForm } from "@/components/review-form";
import { CityLinks } from "@/components/city-links";
import { Breadcrumbs, JsonLd } from "@/components/ui";
import { availabilityLabel, careTypes, facilities, formatPrice, getCity, getProperty, properties, siteConfig } from "@/lib/data";

export function generateStaticParams() { return properties.map((property) => ({ slug: property.slug })); }

const isOperatorMedia = (image: string) => !image.includes("images.unsplash.com") && !image.includes("images.pexels.com");

function getProfileNarrative(property: NonNullable<ReturnType<typeof getProperty>>, cityName: string, careNames: string[]) {
  const careLine = careNames.length ? careNames.join(", ").toLowerCase() : "senior care";
  const base = `${property.name} is a source-labelled directory profile for families comparing ${careLine} in ${cityName}. The page is written for Indian families and NRIs who need a clean first shortlist before speaking with the residence.`;

  if (property.officialWebsiteUrl?.includes("aurumliving")) {
    return "Aurum Living Gurgaon is positioned for premium senior care in Gurugram, with operator-published services around assisted living, dementia care, Parkinson’s support, post-operative care and rehabilitation. For NRI families, the page should be used to quickly check the care match, then confirm the monthly package, medical escalation process, family update rhythm and admission assessment directly with Aurum.";
  }

  if (property.officialWebsiteUrl?.includes("epocheldercare")) {
    return `${property.name} is an Epoch Elder Care home profile for families comparing supervised elder care, dementia support and daily assistance in ${cityName}. Use this page to prepare a focused conversation on resident assessment, staffing, memory-care routines, doctor coordination and family reporting if you are arranging care from outside India.`;
  }

  if (property.officialWebsiteUrl?.includes("antaraseniorcare")) {
    return `${property.name} is an Antara profile for families comparing premium senior residences and care-led living in ${cityName}. It is especially useful when the decision maker is overseas and needs to understand lifestyle, healthcare access, visit planning and service inclusions before arranging a site visit.`;
  }

  if (property.officialWebsiteUrl?.includes("athulya")) {
    return `${property.name} is an Athulya Senior Care profile for families comparing assisted living, transition care, rehabilitation and memory support in ${cityName}. The key NRI checks are clinical handover, nursing coverage, physiotherapy availability, medication management and how regularly the family receives health updates.`;
  }

  if (property.officialWebsiteUrl?.includes("kitesseniorcare")) {
    return `${property.name} is a KITES Senior Care profile for families comparing rehabilitation, post-hospitalisation support, dementia care and geriatric care in ${cityName}. It is best shortlisted when medical recovery, caregiver continuity and doctor-supervised routines matter more than a purely retirement-lifestyle community.`;
  }

  if (property.officialWebsiteUrl?.includes("vedaanta")) {
    return `${property.name} is a Vedaanta senior-living profile for families comparing independent or aided senior living in ${cityName}. Use it to separate lifestyle amenities from hands-on care, and to confirm what happens if your parent’s support needs increase after moving in.`;
  }

  if (property.officialWebsiteUrl?.includes("ashiana")) {
    return `${property.name} is an Ashiana senior-living profile for families comparing age-friendly residences, community amenities and assisted-care access in ${cityName}. For NRIs, the important questions are ownership or rental terms, monthly services, medical tie-ups, visitor policies and how care upgrades are handled.`;
  }

  return `${base} Confirm availability, current pricing, medical suitability, room inventory, care inclusions and family communication processes directly with the operator before making a decision.`;
}

function getShortlistReasons(property: NonNullable<ReturnType<typeof getProperty>>, cityName: string, primaryCare: string) {
  const reasons = [
    `${primaryCare} is listed as a relevant care category for this profile.`,
    `The residence is in ${property.locality}, useful if your family wants options around ${cityName}.`,
    "The page separates published information from items that still need operator confirmation.",
  ];

  if (property.facilities.medical === "available") reasons.push("Medical support is marked as available, but staffing hours and emergency escalation should still be confirmed.");
  if (property.facilities.dementia === "available") reasons.push("Dementia support is listed, so ask about secure movement, behaviour support and night supervision.");
  if (property.facilities.rehabilitation === "available") reasons.push("Rehabilitation is listed, so request details on physiotherapy frequency, equipment and doctor handover.");
  return reasons.slice(0, 5);
}

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
  const careNames = property.careTypes.map((careSlug) => careTypes.find((care) => care.slug === careSlug)?.name).filter((name): name is string => Boolean(name));
  const ratingValue = property.googleRating ?? property.rating;
  const ratingCount = property.googleReviewCount ?? property.reviewCount;
  const primaryCare = careNames[0] || "senior care";
  const cityName = city?.name || property.state;
  const profileNarrative = getProfileNarrative(property, cityName, careNames);
  const shortlistReasons = getShortlistReasons(property, cityName, primaryCare);
  const operatorPhotoCount = property.gallery.filter(isOperatorMedia).length;
  const pricingLabel = property.priceFrom ? `${formatPrice(property.priceFrom)} onwards` : "Pricing on request";
  const evidenceItems = [
    { label: "Photos", value: operatorPhotoCount ? `${operatorPhotoCount} operator-source image${operatorPhotoCount === 1 ? "" : "s"}` : "Editorial placeholder images" },
    { label: "Rating", value: ratingValue ? `${ratingValue.toFixed(1)}${ratingCount > 0 ? ` from ${ratingCount} Google reviews` : " Google rating snapshot"}` : "Google rating pending API import" },
    { label: "Source", value: property.source.label },
    { label: "Pricing", value: property.priceFrom ? `Starts around ${formatPrice(property.priceFrom)}` : "Ask provider for current monthly quote" },
  ];
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: property.summary,
    image: property.gallery,
    url: `${siteConfig.url}/properties/${property.slug}`,
    address: { "@type": "PostalAddress", addressLocality: property.locality, addressRegion: property.state, addressCountry: "IN" },
    amenityFeature: property.amenities.map((amenity) => ({ "@type": "LocationFeatureSpecification", name: amenity })),
    knowsAbout: careNames,
  };
  if (ratingValue && ratingCount > 0) schema.aggregateRating = { "@type": "AggregateRating", ratingValue, reviewCount: ratingCount };
  if (property.officialWebsiteUrl) schema.sameAs = [property.officialWebsiteUrl];
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Directory", item: `${siteConfig.url}/directory` },
      { "@type": "ListItem", position: 3, name: city?.name || property.state, item: `${siteConfig.url}/assisted-living/${property.citySlug}` },
      { "@type": "ListItem", position: 4, name: property.name, item: `${siteConfig.url}/properties/${property.slug}` },
    ],
  };
  return (
    <>
      <JsonLd data={[schema, breadcrumbs]} />
      <header className="property-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Directory", href: "/directory" }, { label: city?.name || property.state, href: `/assisted-living/${property.citySlug}` }, { label: property.name }]} />
          <div className="property-title-row"><div><span className={property.verified ? "status-badge verified" : "status-badge"}>{property.verified && <BadgeCheck size={14} />}{property.verified ? "Operator verified" : "Source-labelled profile"}</span><h1>{property.name}</h1><span className="property-location"><MapPin size={15} /> {property.address}</span></div><div className="property-hero-actions"><CompareToggle id={property.id} /><a className="button button-gold" href="#enquire">Check availability</a></div></div>
          <div className="property-gallery">{property.gallery.slice(0, 3).map((image, index) => <div className="gallery-image" key={image}><Image src={image} alt={`${property.name} listing gallery image ${index + 1}`} fill priority={index === 0} sizes={index === 0 ? "70vw" : "30vw"} /></div>)}</div>
        </div>
      </header>
      <div className="container property-layout">
        <div className="property-main">
          <section><div className="notice"><ShieldCheck size={19} /><span><strong>{property.verified ? "Operator-verified profile." : "Source-labelled, not operator verified."}</strong> Services, availability, imagery and final fees must be confirmed directly before making a care decision. <Link href="/editorial-policy">How verification works</Link>.</span></div></section>
          <section><span className="eyebrow">At a glance</span><h2>{property.name} in {cityName}</h2><p className="lead-copy">{profileNarrative}</p><div className="profile-proof-grid">{evidenceItems.map((item) => <div className="profile-proof-card" key={item.label}><small>{item.label}</small><strong>{item.value}</strong></div>)}</div><div className="care-tags">{property.careTypes.map((slug) => <Link key={slug} href={`/care/${slug}`}>{careTypes.find((care) => care.slug === slug)?.name}</Link>)}</div></section>
          <section><span className="eyebrow">Reviews & rating</span><h2>Google rating status</h2><div className="rating-panel"><div><Star size={20} fill={ratingValue ? "currentColor" : "none"} /><strong>{ratingValue ? `${ratingValue.toFixed(1)} / 5` : "Rating not connected"}</strong><span>{ratingValue ? ratingCount > 0 ? `${ratingCount} Google reviews` : "Google review count not available in snapshot" : "Google Places rating will appear here after API connection"}</span></div>{property.googleMapsUrl && <a className="text-link" href={property.googleMapsUrl} rel="nofollow noopener noreferrer" target="_blank">View on Google Maps <ExternalLink size={14} /></a>}</div><p>We show only the Google rating number and review count as a snapshot. Live refresh should be connected through the official Places API; we do not republish Google review text on this page.</p></section>
          <section><span className="eyebrow">Media & sourcing</span><h2>{operatorPhotoCount ? "Operator-source photos are attached" : "Photos need operator confirmation"}</h2><div className="media-source-card"><Camera size={20} /><div><strong>{operatorPhotoCount ? `${operatorPhotoCount} image${operatorPhotoCount === 1 ? "" : "s"} from operator or official source pages` : "Editorial imagery is being used until official images are connected"}</strong><p>{operatorPhotoCount ? `The gallery for ${property.name} uses non-stock images from the operator/source ecosystem where available. Families should still ask the provider to confirm that photos reflect the exact current residence or room category being offered.` : "This listing still needs verified property media. Ask the provider for current room, bathroom, dining, activity and nursing-station photos before comparing it seriously."}</p></div></div></section>
          <section><span className="eyebrow">For NRI families</span><h2>What to confirm before arranging a move</h2><div className="decision-list">{[
            `Whether ${property.name} can assess your parent by video call before a visit or admission.`,
            "Who will be the family contact for updates, escalation and billing questions.",
            "How medications, doctor appointments, emergency transport and hospital transfers are coordinated.",
            "What documentation is needed if the primary decision maker lives outside India.",
          ].map((item) => <div key={item}><CheckCircle2 size={16} /><span>{item}</span></div>)}</div></section>
          <section><span className="eyebrow">Care capabilities</span><h2>Support to confirm with the provider</h2><p>“Ask provider” means the service may depend on an assessment, visiting specialist or additional fee.</p><div className="facility-list">{facilities.map((facility) => <div className="facility-item" key={facility.key}><span><HeartPulse size={17} />{facility.label}</span><span className="availability">{availabilityLabel(property.facilities[facility.key])}</span></div>)}</div></section>
          <section><span className="eyebrow">Rooms & stays</span><h2>Accommodation options</h2><div className="facility-list"><div className="facility-item"><span><BedDouble size={17} /> Room types</span><span className="availability">{property.roomTypes.join(" · ")}</span></div><div className="facility-item"><span><CalendarCheck size={17} /> Stay options</span><span className="availability">{property.stayTypes.join(" · ")}</span></div></div></section>
          <section><span className="eyebrow">Shortlist fit</span><h2>When this profile may be relevant</h2><p>{property.name} is worth shortlisting if your family is comparing {primaryCare.toLowerCase()} options in or around {property.locality}, especially when you need a clear starting point before speaking with the provider.</p><div className="decision-list">{shortlistReasons.map((reason) => <div key={reason}><CheckCircle2 size={16} /><span>{reason}</span></div>)}</div></section>
          <section><span className="eyebrow">Everyday life</span><h2>Amenities listed for comparison</h2><ul className="amenity-list">{property.amenities.map((amenity) => <li key={amenity}><CheckCircle2 size={16} />{amenity}</li>)}</ul></section>
          <section><span className="eyebrow">Pricing questions</span><h2>Ask for the complete monthly estimate</h2><p>{property.priceNote}. Before you compare {property.name} with another residence, ask for a written estimate that separates accommodation, meals, personal care, nursing, therapies, medicines, consumables, transport and refundable deposits.</p><div className="decision-list">{[
            "What is included in the base monthly fee?",
            "Which services are billed separately after the care assessment?",
            "How do fees change if night support, dementia support or rehabilitation is added?",
            "What is the notice period, deposit policy and refund process?",
          ].map((item) => <div key={item}><CheckCircle2 size={16} /><span>{item}</span></div>)}</div></section>
          <section><span className="eyebrow">Visit plan</span><h2>Prepare a focused tour or video call</h2><p>If you are coordinating from outside India, request a live walkthrough of the room, bathrooms, dining area, activity spaces and nursing station. Ask to meet the person who will manage daily family communication, not only the admissions team.</p><div className="facility-list"><div className="facility-item"><span><Video size={17} /> Best first step</span><span className="availability">Video tour plus care assessment</span></div><div className="facility-item"><span><MapPin size={17} /> Local context</span><span className="availability">{property.locality}, {city?.region || property.state}</span></div></div></section>
          <section><span className="eyebrow">Family reviews</span><h2>No published reviews yet</h2><p>Be the first to share a genuine visit or resident experience. Reviews are checked against our community guidelines before publication.</p><details><summary className="button button-ghost" style={{ display: "inline-flex" }}>Write a review</summary><div className="form-card" style={{ marginTop: 20 }}><ReviewForm propertyId={property.id} propertyName={property.name} /></div></details></section>
          <section id="enquire"><div className="form-card"><span className="eyebrow">Direct enquiry</span><h2>Ask {property.name}</h2><p>Share a little context so the care team can respond meaningfully. This is an enquiry, not a booking.</p><LeadForm propertyId={property.id} propertyName={property.name} /></div></section>
          <section><span className="eyebrow">Profile transparency</span><h2>Source and verification</h2><p>This source-labelled record was last updated on {property.lastUpdated}. {property.claimed ? "The profile is claimed by the operator." : "It is unclaimed and has not been confirmed by the operator."} Google review text is not stored in this profile; numeric ratings are shown only when a source or API snapshot is available.</p><div className="source-link-row"><a className="text-link" href={property.source.url} rel={property.source.url.startsWith("http") ? "nofollow noopener noreferrer" : undefined} target={property.source.url.startsWith("http") ? "_blank" : undefined}>{property.source.label} <ExternalLink size={14} /></a>{property.officialWebsiteUrl && <a className="text-link" href={property.officialWebsiteUrl} rel="nofollow noopener noreferrer" target="_blank">Official website <ExternalLink size={14} /></a>}</div></section>
        </div>
        <aside className="property-sidebar">
          <div className="side-card"><PricingTrigger propertyId={property.id} propertyName={property.name} city={city?.name} className="side-card-price pricing-summary-trigger"><small>Personalised monthly fees</small><strong>{pricingLabel}</strong></PricingTrigger><p>Share a few details to receive relevant pricing for your care needs and preferred timeline.</p><PricingTrigger propertyId={property.id} propertyName={property.name} city={city?.name} className="button button-gold">Get pricing</PricingTrigger><a className="button button-ghost" href="#enquire">Enquire with residence</a>{property.officialWebsiteUrl && <a className="button button-ghost" href={property.officialWebsiteUrl} rel="nofollow noopener noreferrer" target="_blank">Visit official site</a>}<Link className="button button-ghost" href={`/concierge?property=${property.slug}`}>Ask our concierge</Link><div className="side-card-trust"><span><Clock3 size={14} /> Typical response target: one business day</span><span><ShieldCheck size={14} /> Your details are only used for this enquiry</span><span><MessageSquareText size={14} /> No booking fee from our directory</span></div></div>
        </aside>
      </div>
      <CityLinks currentSlug={property.citySlug} title="Explore senior care in other cities" body="Comparing across cities is common when family is spread out. Each guide covers local residences and typical monthly costs." />
    </>
  );
}
