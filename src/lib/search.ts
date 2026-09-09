import type { CareTypeSlug, FacilityKey, Property } from "@/lib/types";

export interface DirectoryFilters {
  city?: string;
  care?: string;
  budget?: string;
  stay?: string;
  room?: string;
  rating?: string;
  facilities?: FacilityKey[];
  sort?: string;
}

export function filterProperties(properties: Property[], filters: DirectoryFilters) {
  const citySlugs = filters.city === "delhi-ncr" ? ["delhi-ncr", "gurgaon", "noida", "bhiwadi"] : filters.city ? [filters.city] : [];
  const filtered = properties.filter((property) => {
    if (citySlugs.length && !citySlugs.includes(property.citySlug)) return false;
    if (filters.care && !property.careTypes.includes(filters.care as CareTypeSlug)) return false;
    if (filters.budget === "under-100" && (property.priceFrom === null || property.priceFrom >= 100000)) return false;
    if (filters.budget === "100-150" && (property.priceFrom === null || property.priceFrom < 100000 || property.priceFrom > 150000)) return false;
    if (filters.budget === "above-150" && (property.priceFrom === null || property.priceFrom <= 150000)) return false;
    if (filters.budget === "on-request" && property.priceFrom !== null) return false;
    if (filters.stay && filters.stay !== "any" && !property.stayTypes.includes(filters.stay)) return false;
    if (filters.room && filters.room !== "any" && !property.roomTypes.includes(filters.room)) return false;
    if (filters.rating && filters.rating !== "any" && ((property.rating ?? 0) < Number(filters.rating))) return false;
    if (filters.facilities?.some((key) => property.facilities[key] !== "available")) return false;
    return true;
  });
  return [...filtered].sort((a, b) => {
    if (filters.sort === "price-low") return (a.priceFrom ?? Number.MAX_SAFE_INTEGER) - (b.priceFrom ?? Number.MAX_SAFE_INTEGER);
    if (filters.sort === "price-high") return (b.priceFrom ?? 0) - (a.priceFrom ?? 0);
    if (filters.sort === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
    return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
  });
}
