import { describe, expect, it } from "vitest";
import { leadSchema, listingSchema, reviewSchema } from "@/lib/validation";

describe("public form validation", () => {
  it("accepts a complete concierge request", () => {
    const result = leadSchema.safeParse({ leadType: "concierge", name: "Anita Rao", email: "anita@example.com", phone: "+91 9876543210", relationship: "My father", city: "Bengaluru", careNeeds: "Assisted living", consent: "on" });
    expect(result.success).toBe(true);
  });

  it("accepts the pricing questionnaire context", () => {
    const result = leadSchema.safeParse({ leadType: "property", propertyId: "property-01", name: "Rohan Mehta", email: "rohan@example.com", phone: "+91 9876543210", relationship: "My father", urgency: "Within 2 weeks", searchReason: "Hospital discharge or rehabilitation", city: "Gurgaon", careNeeds: "Hospital discharge or rehabilitation", budget: "₹1.25–₹2 lakh/month", consent: "on" });
    expect(result.success).toBe(true);
  });

  it("rejects honeypot content and incomplete reviews", () => {
    expect(leadSchema.safeParse({ leadType: "concierge", website: "spam", consent: "on" }).success).toBe(false);
    expect(reviewSchema.safeParse({ propertyId: "one", propertyName: "One", rating: 6, body: "Too short" }).success).toBe(false);
  });

  it("accepts a valid operator submission", () => {
    expect(listingSchema.safeParse({ operatorName: "Priya", propertyName: "Residence", email: "ops@example.com", phone: "9876543210", city: "Pune", websiteUrl: "", careTypes: "Assisted living", consent: "on" }).success).toBe(true);
  });
});
