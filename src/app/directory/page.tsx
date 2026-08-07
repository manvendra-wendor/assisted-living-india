import type { Metadata } from "next";
import Link from "next/link";
import { DirectoryExplorer } from "@/components/directory-explorer";
import { Breadcrumbs } from "@/components/ui";
import { getCareType, getCity, popularLocations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Senior Living Near Me | Find Assisted Living Facilities",
  description: "Find assisted living facilities and senior living near you in India. Filter by city, care, stay, room, rating and medical support.",
  alternates: { canonical: "/directory" },
};

export default async function DirectoryPage({ searchParams }: { searchParams: Promise<{ city?: string; care?: string }> }) {
  const params = await searchParams;
  const city = params.city ? getCity(params.city) : undefined;
  const care = params.care ? getCareType(params.care) : undefined;
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Directory" }]} />
          <span className="eyebrow">Explore senior care</span>
          <h1>{care ? care.name : "Find assisted living facilities"}{city ? ` in ${city.name}` : " near you"}</h1>
          <p>Search senior living by support, setting and facilities. Every profile makes its sourcing and verification status clear.</p>
          {!city && <div className="directory-location-links"><span>Popular locations:</span>{popularLocations.slice(0, 6).map((location) => <Link href={`/assisted-living/${location.slug}`} key={location.slug}>{location.name}</Link>)}</div>}
        </div>
      </header>
      <DirectoryExplorer initialCity={params.city} initialCare={params.care} />
    </>
  );
}
