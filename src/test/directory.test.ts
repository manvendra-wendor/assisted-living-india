import { describe, expect, it } from "vitest";
import { articles, formatPrice, popularLocations, properties } from "@/lib/data";
import { filterProperties } from "@/lib/search";

describe("directory catalogue", () => {
  it("contains source-labelled profiles across the expanded India launch markets", () => {
    expect(properties).toHaveLength(40);
    expect(new Set(properties.map((property) => property.citySlug)).size).toBe(14);
    expect(properties.every((property) => property.officialWebsiteUrl?.startsWith("https://"))).toBe(true);
  });

  it("uses operator-sourced listing images instead of stock gallery fallbacks", () => {
    const stockHosts = ["images.pexels.com", "images.unsplash.com", "plus.unsplash.com"];
    expect(properties.every((property) => !stockHosts.some((host) => property.image.includes(host)))).toBe(true);
  });

  it("prioritises the leading India location journey", () => {
    expect(popularLocations.slice(0, 4).map((location) => location.slug)).toEqual(["gurgaon", "mumbai", "dehradun", "chennai"]);
    expect(articles.map((article) => article.slug)).toEqual(expect.arrayContaining(["what-is-assisted-living", "assisted-living-vs-nursing-home", "geriatric-diet-and-nutrition-in-assisted-living"]));
  });

  it("filters by city, care, budget, and required capability", () => {
    const results = filterProperties(properties, { city: "delhi-ncr", care: "assisted-living", facilities: ["dementia"] });
    expect(results.map((property) => property.slug)).toEqual(expect.arrayContaining(["epoch-vermeer-house", "aurum-living-gurgaon"]));
    expect(results.every((property) => ["gurgaon", "noida", "bhiwadi"].includes(property.citySlug))).toBe(true);
  });

  it("places price-on-request entries after priced entries when sorting low to high", () => {
    const results = filterProperties(properties, { city: "mumbai", sort: "price-low" });
    expect(results.at(-1)?.priceFrom).toBeNull();
  });

  it("formats INR prices and price-on-request values", () => {
    expect(formatPrice(125000)).toBe("₹1,25,000/month");
    expect(formatPrice(null)).toBe("Price on request");
  });
});
