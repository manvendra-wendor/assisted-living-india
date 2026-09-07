export type Availability = "available" | "on-request" | "not-listed";

export type FacilityKey =
  | "nutrition"
  | "medical"
  | "holistic"
  | "caregivers"
  | "rehabilitation"
  | "dementia"
  | "post-operative"
  | "parkinsons";

export type CareTypeSlug =
  | "assisted-living"
  | "independent-living"
  | "luxury-senior-living"
  | "dementia-care"
  | "post-operative-care"
  | "rehabilitation";

export interface City {
  slug: string;
  name: string;
  region: string;
  state: string;
  shortDescription: string;
  description: string;
  neighbourhoods: string[];
  image: string;
}

export interface CareType {
  slug: CareTypeSlug;
  name: string;
  eyebrow: string;
  description: string;
  longDescription: string;
}

export interface PropertySource {
  label: string;
  url: string;
  checkedAt: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  citySlug: string;
  locality: string;
  state: string;
  address: string;
  summary: string;
  description: string;
  careTypes: CareTypeSlug[];
  facilities: Record<FacilityKey, Availability>;
  amenities: string[];
  roomTypes: string[];
  stayTypes: string[];
  priceFrom: number | null;
  priceNote: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  claimed: boolean;
  featured: boolean;
  image: string;
  gallery: string[];
  source: PropertySource;
  lastUpdated: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  citySlug?: string;
  publishedAt: string;
  readTime: string;
  image: string;
  sections: ArticleSection[];
}

export interface ReviewPreview {
  id: string;
  author: string;
  relation: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
}

export interface JobRole {
  slug: string;
  title: string;
  team: string;
  location: string;
  commitment: string;
  summary: string;
  focus: string[];
}
