import { describe, expect, it } from "vitest";
import { articles, formatPrice, popularLocations, properties } from "@/lib/data";
import { filterProperties } from "@/lib/search";

describe("directory catalogue", () => {
  it("contains three preview profiles for each of nine launch markets", () => {
    expect(properties).toHaveLength(27);
    expect(new Set(properties.map((property) => property.citySlug)).size).toBe(9);
  });

  it("prioritises the leading India location journey", () => {
    expect(popularLocations.slice(0, 4).map((location) => location.slug)).toEqual(["gurgaon", "mumbai", "dehradun", "chennai"]);
    expect(articles.map((article) => article.slug)).toEqual(expect.arrayContaining(["what-is-assisted-living", "assisted-living-vs-nursing-home", "geriatric-diet-and-nutrition-in-assisted-living"]));
  });

  it("filters by city, care, budget, and required capability", () => {
    const results = filterProperties(properties, { city: "delhi-ncr", care: "assisted-living", budget: "under-100", facilities: ["dementia"] });
    expect(results).toHaveLength(1);
    expect(results[0].locality).toBe("Gurgaon");
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
