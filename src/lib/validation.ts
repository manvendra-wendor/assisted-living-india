import { z } from "zod";

const phone = z.string().trim().min(8, "Enter a valid phone number").max(20);

export const leadSchema = z.object({
  leadType: z.enum(["property", "concierge"]),
  propertyId: z.string().optional(),
  propertyName: z.string().optional(),
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.email("Enter a valid email address"),
  phone,
  relationship: z.string().trim().min(2, "Tell us who you are looking for"),
  urgency: z.string().trim().max(100).optional(),
  searchReason: z.string().trim().max(160).optional(),
  city: z.string().trim().min(2, "Choose a preferred location"),
  careNeeds: z.string().trim().min(2, "Choose the support needed"),
  budget: z.string().optional(),
  message: z.string().trim().max(1500).optional(),
  consent: z.literal("on", { error: "Consent is required" }),
  website: z.string().max(0).optional(),
  turnstileToken: z.string().optional(),
  sourceUrl: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export const listingSchema = z.object({
  operatorName: z.string().trim().min(2).max(150),
  propertyName: z.string().trim().min(2).max(150),
  email: z.email(),
  phone,
  city: z.string().trim().min(2),
  websiteUrl: z.url().optional().or(z.literal("")),
  careTypes: z.string().trim().min(2),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal("on"),
  website: z.string().max(0).optional(),
  turnstileToken: z.string().optional(),
});

export const reviewSchema = z.object({
  propertyId: z.string().min(1),
  propertyName: z.string().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().trim().min(4).max(120),
  body: z.string().trim().min(30, "Please share at least 30 characters").max(2000),
  relationship: z.string().trim().min(2).max(100),
  stayDate: z.string().optional(),
  visitConfirmed: z.literal("on"),
  website: z.string().max(0).optional(),
});

export type ActionState = { status: "idle" | "success" | "error"; message?: string; errors?: Record<string, string[]> };
export const initialActionState: ActionState = { status: "idle" };
