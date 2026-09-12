import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin, Star } from "lucide-react";
import { CompareToggle } from "@/components/compare-provider";
import { PricingTrigger } from "@/components/pricing-modal";
import { careTypes, formatPrice, getCity } from "@/lib/data";
import type { Property } from "@/lib/types";

export function PropertyCard({ property, priority = false }: { property: Property; priority?: boolean }) {
  const city = getCity(property.citySlug);
  const rating = property.googleRating ?? property.rating;
  const reviewCount = property.googleReviewCount ?? property.reviewCount;
  return (
    <article className="property-card">
      <div className="property-image">
        <Image src={property.image} alt={`Editorial Indian senior-living image for ${property.name}`} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={priority} />
        <div className="property-image-top">
          <span className={property.verified ? "status-badge verified" : "status-badge"}>{property.verified && <BadgeCheck size={13} />}{property.verified ? "Verified" : "Source-labelled"}</span>
          <CompareToggle id={property.id} compact />
        </div>
      </div>
      <div className="property-content">
        <div className="property-meta"><span><MapPin size={14} /> {property.locality}, {city?.name}</span>{rating && reviewCount > 0 && <span><Star size={13} fill="currentColor" /> {rating} ({reviewCount})</span>}</div>
        <h3><Link href={`/properties/${property.slug}`}>{property.name}</Link></h3>
        <p>{property.summary}</p>
        <div className="care-tags">
          {property.careTypes.slice(0, 2).map((slug) => <span key={slug}>{careTypes.find((care) => care.slug === slug)?.name}</span>)}
        </div>
        <div className="property-footer">
          <PricingTrigger propertyId={property.id} propertyName={property.name} city={city?.name} className="property-pricing">{property.priceFrom ? <><small>From</small><strong>{formatPrice(property.priceFrom)}</strong></> : <><small>Monthly fees</small><strong>Get pricing</strong></>}</PricingTrigger>
          <Link aria-label={`View ${property.name}`} href={`/properties/${property.slug}`}><ArrowRight size={19} /></Link>
        </div>
      </div>
    </article>
  );
}
