"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ListFilter, RotateCcw } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { careTypes, directoryLocations, facilities, properties } from "@/lib/data";
import { filterProperties } from "@/lib/search";
import type { FacilityKey } from "@/lib/types";

interface DirectoryExplorerProps {
  initialCity?: string;
  initialCare?: string;
}

export function DirectoryExplorer({ initialCity = "", initialCare = "" }: DirectoryExplorerProps) {
  const router = useRouter();
  const [city, setCity] = useState(initialCity);
  const [care, setCare] = useState(initialCare);
  const [stay, setStay] = useState("any");
  const [room, setRoom] = useState("any");
  const [rating, setRating] = useState("any");
  const [selectedFacilities, setSelectedFacilities] = useState<FacilityKey[]>([]);
  const [sort, setSort] = useState("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const updateLocation = (nextCity: string, nextCare: string) => {
    const params = new URLSearchParams();
    if (nextCity) params.set("city", nextCity);
    if (nextCare) params.set("care", nextCare);
    router.replace(`/browse${params.size ? `?${params.toString()}` : ""}`, { scroll: false });
  };

  const results = useMemo(() => filterProperties(properties, { city, care, stay, room, rating, facilities: selectedFacilities, sort }), [care, city, rating, room, selectedFacilities, sort, stay]);

  const reset = () => {
    setCity(""); setCare(""); setStay("any"); setRoom("any"); setRating("any"); setSelectedFacilities([]); setSort("recommended");
    router.replace("/browse", { scroll: false });
  };

  const filterPanel = (
    <aside className={`filter-panel ${filtersOpen ? "open" : ""}`} aria-label="Directory filters">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><h2>Refine your search</h2><button className="filter-reset" onClick={reset}><RotateCcw size={12} /> Reset</button></div>
      <div className="filter-group"><label htmlFor="city-filter">Location</label><select id="city-filter" value={city} onChange={(event) => { setCity(event.target.value); updateLocation(event.target.value, care); }}><option value="">All locations</option>{directoryLocations.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></div>
      <div className="filter-group"><label htmlFor="care-filter">Type of care</label><select id="care-filter" value={care} onChange={(event) => { setCare(event.target.value); updateLocation(city, event.target.value); }}><option value="">All types of care</option>{careTypes.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></div>
      <div className="filter-group"><label htmlFor="stay-filter">Length of stay</label><select id="stay-filter" value={stay} onChange={(event) => setStay(event.target.value)}><option value="any">Any stay</option><option value="Long-term">Long-term</option><option value="Short-stay">Short-stay</option><option value="Respite">Respite</option></select></div>
      <div className="filter-group"><label htmlFor="room-filter">Room type</label><select id="room-filter" value={room} onChange={(event) => setRoom(event.target.value)}><option value="any">Any room</option><option value="Private suite">Private suite</option><option value="Companion room">Companion room</option><option value="One-bedroom residence">One-bedroom residence</option><option value="Two-bedroom residence">Two-bedroom residence</option></select></div>
      <div className="filter-group"><label htmlFor="rating-filter">Minimum rating</label><select id="rating-filter" value={rating} onChange={(event) => setRating(event.target.value)}><option value="any">Any rating</option><option value="4">4.0+</option><option value="4.5">4.5+</option></select></div>
      <div className="filter-group"><span className="filter-label">Facilities confirmed available</span><div className="check-list">{facilities.map((facility) => <label key={facility.key}><input type="checkbox" checked={selectedFacilities.includes(facility.key)} onChange={() => setSelectedFacilities((current) => current.includes(facility.key) ? current.filter((key) => key !== facility.key) : [...current, facility.key])} />{facility.shortLabel}</label>)}</div></div>
    </aside>
  );

  return (
    <div className="container directory-shell">
      <div><button type="button" className="button button-ghost filter-toggle" onClick={() => setFiltersOpen((value) => !value)}><ListFilter size={17} /> Filters</button>{filterPanel}</div>
      <div>
        <div className="results-head"><div><h2>{results.length} residence{results.length === 1 ? "" : "s"}</h2><p>Compare up to three profiles side by side.</p></div><select aria-label="Sort results" value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="rating">Highest rated</option></select></div>
        {results.length ? <div className="results-grid">{results.map((property, index) => <PropertyCard key={property.id} property={property} priority={index < 2} />)}</div> : <div className="empty-state"><h3>No exact matches</h3><p>Try widening the budget or removing one of the care filters.</p><button className="button button-ghost" onClick={reset}>Clear all filters</button></div>}
      </div>
    </div>
  );
}
