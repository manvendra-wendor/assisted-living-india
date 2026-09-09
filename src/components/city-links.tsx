import Link from "next/link";
import { SectionHeading } from "@/components/ui";
import { locationPages } from "@/lib/data";

export function CityLinks({
  currentSlug,
  eyebrow = "Explore by location",
  title = "Assisted living across India",
  body = "Every city page compares local residences, typical monthly costs and the questions worth asking before a visit.",
}: {
  currentSlug?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  const cities = locationPages.filter((location) => location.slug !== currentSlug);
  return (
    <section className="section section-soft">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} body={body} action={{ label: "Browse the full directory", href: "/directory" }} />
        <div className="city-link-grid">
          {cities.map((location) => (
            <Link className="city-link" href={`/assisted-living/${location.slug}`} key={location.slug} aria-label={`Explore assisted living in ${location.name}`}>
              <strong>{location.name}</strong>
              <small>{location.region}</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
