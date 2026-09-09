"use server";

import { redirect } from "next/navigation";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { checkRateLimit, getRequestIp, verifyTurnstile } from "@/lib/security";
import { leadSchema, listingSchema, reviewSchema, type ActionState } from "@/lib/validation";
import { canModerateTransition } from "@/lib/moderation";

function formObject(formData: FormData) {
  return Object.fromEntries(formData.entries()) as Record<string, string>;
}

async function notifyLead(subject: string, details: Record<string, unknown>) {
  if (!process.env.RESEND_API_KEY || !process.env.LEAD_NOTIFICATION_EMAIL) return;
  const safeRows = Object.entries(details).filter(([key]) => !["website", "turnstileToken"].includes(key)).map(([key, value]) => `<tr><td style="padding:6px;font-weight:bold">${key}</td><td style="padding:6px">${String(value || "—").replace(/[<>&]/g, "")}</td></tr>`).join("");
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ from: process.env.EMAIL_FROM || "Careya <onboarding@resend.dev>", to: [process.env.LEAD_NOTIFICATION_EMAIL], subject, html: `<h2>${subject}</h2><table>${safeRows}</table>` }),
  });
}

export async function submitLead(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = leadSchema.safeParse(formObject(formData));
  if (!parsed.success) return { status: "error", message: "Please review the highlighted information.", errors: parsed.error.flatten().fieldErrors };
  const ip = await getRequestIp();
  if (!checkRateLimit(`lead:${ip}`)) return { status: "error", message: "Too many attempts. Please wait a few minutes and try again." };
  if (!await verifyTurnstile(parsed.data.turnstileToken)) return { status: "error", message: "Please complete the security check." };
  const admin = createSupabaseAdminClient();
  if (admin) {
    const leadRecord = {
      lead_type: parsed.data.leadType,
      property_id: parsed.data.propertyId || null,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      relationship: parsed.data.relationship,
      urgency: parsed.data.urgency || null,
      search_reason: parsed.data.searchReason || null,
      preferred_state: parsed.data.preferredState,
      preferred_city: parsed.data.city,
      care_needs: parsed.data.careNeeds,
      budget: parsed.data.budget || null,
      message: parsed.data.message || null,
      source_url: parsed.data.sourceUrl || null,
      utm_source: parsed.data.utmSource || null,
      utm_medium: parsed.data.utmMedium || null,
      utm_campaign: parsed.data.utmCampaign || null,
      status: "new",
    };
    let { error } = await admin.from("leads").insert(leadRecord);
    // Keep lead capture working during the short window before the database migration is applied.
    // The fallback preserves the state in the existing message field rather than losing the enquiry.
    if (error && ["42703", "PGRST204"].includes(error.code || "")) {
      const { preferred_state: ignoredPreferredState, ...legacyRecord } = leadRecord;
      void ignoredPreferredState;
      ({ error } = await admin.from("leads").insert({
        ...legacyRecord,
        message: `[Preferred state: ${parsed.data.preferredState}]${legacyRecord.message ? ` ${legacyRecord.message}` : ""}`,
      }));
    }
    if (error) return { status: "error", message: "We could not save your request. Please try again." };
  }
  await notifyLead(parsed.data.leadType === "concierge" ? "New concierge request" : `New enquiry: ${parsed.data.propertyName || "property"}`, parsed.data);
  return { status: "success", message: "Thank you — we’ll reach out to you soon." };
}

export async function submitListing(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = listingSchema.safeParse(formObject(formData));
  if (!parsed.success) return { status: "error", message: "Please complete the required fields.", errors: parsed.error.flatten().fieldErrors };
  const ip = await getRequestIp();
  if (!checkRateLimit(`listing:${ip}`, 3)) return { status: "error", message: "Too many attempts. Please try again later." };
  if (!await verifyTurnstile(parsed.data.turnstileToken)) return { status: "error", message: "Please complete the security check." };
  const admin = createSupabaseAdminClient();
  if (admin) {
    const { error } = await admin.from("listing_submissions").insert({
      operator_name: parsed.data.operatorName,
      property_name: parsed.data.propertyName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      city: parsed.data.city,
      website_url: parsed.data.websiteUrl || null,
      care_types: parsed.data.careTypes,
      notes: parsed.data.message || null,
      status: "pending",
    });
    if (error) return { status: "error", message: "We could not save the submission. Please try again." };
  }
  await notifyLead(`New property submission: ${parsed.data.propertyName}`, parsed.data);
  return { status: "success", message: admin ? "Your property is in our editorial review queue. We will contact you to verify the details." : "Preview complete. Connect Supabase to create the moderation record." };
}

export async function submitReview(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = reviewSchema.safeParse(formObject(formData));
  if (!parsed.success) return { status: "error", message: "Please complete the review.", errors: parsed.error.flatten().fieldErrors };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "success", message: "Review preview complete. Configure Supabase Auth to submit it for moderation." };
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "Please sign in before submitting a review." };
  const { error } = await supabase.from("reviews").insert({ property_id: parsed.data.propertyId, user_id: user.id, rating: parsed.data.rating, title: parsed.data.title, body: parsed.data.body, relationship: parsed.data.relationship, stay_date: parsed.data.stayDate || null, visit_confirmed: true, status: "pending" });
  if (error) return { status: "error", message: "We could not submit your review. Please try again." };
  return { status: "success", message: "Thank you. Your review will appear after an editorial check." };
}

export async function sendMagicLink(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") || "").trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) return { status: "error", message: "Enter a valid email address." };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "success", message: "Authentication preview complete. Configure Supabase to send magic links." };
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://careya.in").replace(/\/+$/, "");
  const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${siteUrl}/auth/callback` } });
  if (error) return { status: "error", message: "We could not send a sign-in link. Please try again." };
  return { status: "success", message: "Check your email for a secure sign-in link." };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}

export async function moderateRecord(formData: FormData) {
  const table = String(formData.get("table") || "");
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!new Set(["reviews", "listing_submissions", "ownership_claims", "properties", "leads"]).has(table)) return;
  if (!new Set(["published", "approved", "rejected", "pending", "resolved", "contacted", "archived"]).has(status)) return;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return;
  const { data: current } = await supabase.from(table).select("status").eq("id", id).maybeSingle();
  if (!current || !canModerateTransition(String(current.status), status)) return;
  await supabase.from(table).update({ status }).eq("id", id);
}

export async function saveProperty(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/properties?preview=1");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/");
  const id = String(formData.get("id") || crypto.randomUUID());
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const cityId = String(formData.get("cityId") || "").trim();
  if (!name || !slug || !cityId) redirect("/admin/properties/new?error=required");
  await supabase.from("properties").upsert({
    id,
    name,
    slug,
    city_id: cityId,
    locality: String(formData.get("locality") || ""),
    summary: String(formData.get("summary") || ""),
    description: String(formData.get("description") || ""),
    price_from: formData.get("priceFrom") ? Number(formData.get("priceFrom")) : null,
    price_note: String(formData.get("priceNote") || ""),
    status: String(formData.get("status") || "draft"),
    verified: formData.get("verified") === "on",
    claimed: formData.get("claimed") === "on",
    source_label: String(formData.get("sourceLabel") || "Admin-created profile"),
    source_url: String(formData.get("sourceUrl") || "") || null,
    source_checked_at: new Date().toISOString(),
  });
  redirect("/admin/properties");
}
