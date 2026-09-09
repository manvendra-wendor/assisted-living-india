import type { Metadata } from "next";
import Link from "next/link";
import { DirectoryExplorer } from "@/components/directory-explorer";
import { CityLinks } from "@/components/city-links";
import { Breadcrumbs, JsonLd } from "@/components/ui";
import { getCareType, getCity, popularLocations, properties, siteConfig } from "@/lib/data";
import { filterProperties } from "@/lib/search";

export const metadata: Metadata = {
  title: "Assisted Living Directory India | Facilities, Costs & Reviews",
  description: "Search assisted living facilities, senior living communities, dementia care and luxury old age homes in India by city, care services, monthly pricing guidance, rooms and reviews.",
  keywords: ["assisted living facilities India", "senior living near me", "luxury old age homes India", "dementia care facilities India"],
  alternates: { canonical: "/browse" },
  openGraph: {
    title: "Assisted Living Directory India",
    description: "Find and compare premium senior care residences across India.",
    url: "/browse",
  },
};

export default async function DirectoryPage({ searchParams }: { searchParams: Promise<{ city?: string; care?: string }> }) {
  const params = await searchParams;
  const city = params.city ? getCity(params.city) : undefined;
  const care = params.care ? getCareType(params.care) : undefined;
  const pageTitle = `${care ? care.name : "Assisted living facilities"}${city ? ` in ${city.name}` : " in India"}`;
  const listedProperties = filterProperties(properties, { city: params.city, care: params.care });
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: pageTitle,
          url: `${siteConfig.url}/browse`,
          description: "Search assisted living facilities, senior living communities, dementia care and luxury old age homes in India.",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: listedProperties.map((property, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: property.name,
              url: `${siteConfig.url}/properties/${property.slug}`,
            })),
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Directory", item: `${siteConfig.url}/browse` },
          ],
        },
      ]} />
      <header className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Directory" }]} />
          <span className="eyebrow">Explore senior care</span>
          <h1>{pageTitle}</h1>
          <p>Search senior living by city, care need, stay type, room, rating and medical support. Every profile makes sourcing and verification status clear.</p>
          {!city && <div className="directory-location-links"><span>Popular locations:</span>{popularLocations.slice(0, 6).map((location) => <Link href={`/assisted-living/${location.slug}`} key={location.slug}>{location.name}</Link>)}</div>}
        </div>
      </header>
      <DirectoryExplorer initialCity={params.city} initialCare={params.care} />
      <CityLinks currentSlug={params.city} />
    </>
  );
}
