interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  NEXT_PUBLIC_SUPABASE_URL?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
  LEAD_NOTIFICATION_EMAIL?: string;
  EMAIL_FROM?: string;
  TURNSTILE_SECRET_KEY?: string;
}

type WorkerContext = { waitUntil(promise: Promise<unknown>): void };
type FormPayload = Record<string, unknown>;

const jsonHeaders = { "content-type": "application/json; charset=utf-8" };

const worker = {
  async fetch(request: Request, env: Env, ctx: WorkerContext) {
    const url = new URL(request.url);

    if (url.pathname === "/directory") {
      return Response.redirect(new URL("/browse", url.origin), 308);
    }

    if (url.pathname === "/api/leads") return handleLead(request, env, ctx);
    if (url.pathname === "/api/listing-submissions") return handleListingSubmission(request, env, ctx);
    if (url.pathname === "/api/reviews") return handleReview(request, env, ctx);

    return env.ASSETS.fetch(request);
  },
};

export default worker;

async function handleLead(request: Request, env: Env, ctx: WorkerContext) {
  if (request.method !== "POST") return json({ status: "error", message: "Method not allowed." }, 405);
  const payload = await readPayload(request);
  if (!payload || hasHoneypot(payload)) return json({ status: "success", message: "Thank you. We will reach out soon." });

  const errors = requireFields(payload, ["leadType", "name", "email", "phone", "relationship", "preferredState", "city", "careNeeds"]);
  if (!["property", "concierge"].includes(stringValue(payload.leadType))) errors.leadType = ["Choose an enquiry type."];
  if (!isEmail(stringValue(payload.email))) errors.email = ["Enter a valid email address."];
  if (Object.keys(errors).length) return json({ status: "error", message: "Please review the highlighted information.", errors }, 400);
  if (!await verifyTurnstile(payload, request, env)) return json({ status: "error", message: "Please complete the security check." }, 400);

  const propertyId = stringValue(payload.propertyId);
  const propertyName = stringValue(payload.propertyName);
  const message = [propertyName && `Property: ${propertyName}`, propertyId && `Property ID: ${propertyId}`, stringValue(payload.message)]
    .filter(Boolean)
    .join("\n");
  const record = {
    lead_type: stringValue(payload.leadType),
    property_id: null,
    name: stringValue(payload.name),
    email: stringValue(payload.email),
    phone: stringValue(payload.phone),
    relationship: stringValue(payload.relationship),
    urgency: stringValue(payload.urgency) || null,
    search_reason: stringValue(payload.searchReason) || null,
    preferred_state: stringValue(payload.preferredState),
    preferred_city: stringValue(payload.city),
    care_needs: stringValue(payload.careNeeds),
    budget: stringValue(payload.budget) || null,
    message: message || null,
    source_url: stringValue(payload.sourceUrl) || null,
    utm_source: stringValue(payload.utmSource) || null,
    utm_medium: stringValue(payload.utmMedium) || null,
    utm_campaign: stringValue(payload.utmCampaign) || null,
    status: "new",
  };

  const saved = await insertSupabase(env, "leads", record);
  if (!saved.ok) return json({ status: "error", message: "We could not save your request. Please try again." }, 502);
  ctx.waitUntil(notify(env, stringValue(payload.leadType) === "concierge" ? "New concierge request" : `New enquiry: ${propertyName || "property"}`, payload));
  return json({ status: "success", message: "Thank you. We will reach out to you soon." });
}

async function handleListingSubmission(request: Request, env: Env, ctx: WorkerContext) {
  if (request.method !== "POST") return json({ status: "error", message: "Method not allowed." }, 405);
  const payload = await readPayload(request);
  if (!payload || hasHoneypot(payload)) return json({ status: "success", message: "Thank you. We will review the submission soon." });

  const errors = requireFields(payload, ["operatorName", "propertyName", "email", "phone", "city", "careTypes"]);
  if (!isEmail(stringValue(payload.email))) errors.email = ["Enter a valid email address."];
  if (Object.keys(errors).length) return json({ status: "error", message: "Please complete the required fields.", errors }, 400);
  if (!await verifyTurnstile(payload, request, env)) return json({ status: "error", message: "Please complete the security check." }, 400);

  const record = {
    operator_name: stringValue(payload.operatorName),
    property_name: stringValue(payload.propertyName),
    email: stringValue(payload.email),
    phone: stringValue(payload.phone),
    city: stringValue(payload.city),
    website_url: stringValue(payload.websiteUrl) || null,
    care_types: stringValue(payload.careTypes),
    notes: stringValue(payload.message) || null,
    status: "pending",
  };

  const saved = await insertSupabase(env, "listing_submissions", record);
  if (!saved.ok) return json({ status: "error", message: "We could not save the submission. Please try again." }, 502);
  ctx.waitUntil(notify(env, `New property submission: ${record.property_name}`, payload));
  return json({ status: "success", message: "Your property is in our editorial review queue. We will contact you to verify the details." });
}

async function handleReview(request: Request, env: Env, ctx: WorkerContext) {
  if (request.method !== "POST") return json({ status: "error", message: "Method not allowed." }, 405);
  const payload = await readPayload(request);
  if (!payload || hasHoneypot(payload)) return json({ status: "success", message: "Thank you for sharing your experience." });

  const errors = requireFields(payload, ["propertyId", "propertyName", "rating", "title", "body", "relationship"]);
  const rating = Number(payload.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.rating = ["Choose a rating from 1 to 5."];
  if (stringValue(payload.body).length < 30) errors.body = ["Please share at least 30 characters."];
  if (stringValue(payload.visitConfirmed) !== "on") errors.visitConfirmed = ["Please confirm you have first-hand experience."];
  if (Object.keys(errors).length) return json({ status: "error", message: "Please review the highlighted information.", errors }, 400);
  if (!await verifyTurnstile(payload, request, env)) return json({ status: "error", message: "Please complete the security check." }, 400);

  const record = {
    property_id: stringValue(payload.propertyId),
    rating,
    title: stringValue(payload.title),
    body: stringValue(payload.body),
    relationship: stringValue(payload.relationship),
    stay_date: stringValue(payload.stayDate) || null,
    visit_confirmed: true,
    status: "pending",
  };

  const saved = await insertSupabase(env, "reviews", record);
  if (!saved.ok) return json({ status: "error", message: "We could not save your review. Please try again." }, 502);
  ctx.waitUntil(notify(env, `New review: ${stringValue(payload.propertyName) || record.property_id}`, payload));
  return json({ status: "success", message: "Thank you. Your review is pending an editorial check before publishing." });
}

async function readPayload(request: Request) {
  try {
    return await request.json() as FormPayload;
  } catch {
    return null;
  }
}

function hasHoneypot(payload: FormPayload) {
  return Boolean(stringValue(payload.website));
}

function requireFields(payload: FormPayload, fields: string[]) {
  const errors: Record<string, string[]> = {};
  for (const field of fields) {
    if (!stringValue(payload[field])) errors[field] = ["This field is required."];
  }
  return errors;
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value);
}

async function verifyTurnstile(payload: FormPayload, request: Request, env: Env) {
  const token = stringValue(payload.turnstileToken);
  if (!env.TURNSTILE_SECRET_KEY || !token) return true;
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: request.headers.get("cf-connecting-ip") || "",
    }),
  });
  const result = await response.json() as { success?: boolean };
  return Boolean(result.success);
}

async function insertSupabase(env: Env, table: string, record: Record<string, unknown>) {
  const supabaseUrl = (env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
  if (!supabaseUrl || !env.SUPABASE_SERVICE_ROLE_KEY) return { ok: false };
  const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "content-type": "application/json",
      prefer: "return=minimal",
    },
    body: JSON.stringify(record),
  });
  return { ok: response.ok, status: response.status };
}

async function notify(env: Env, subject: string, details: FormPayload) {
  if (!env.RESEND_API_KEY || !env.LEAD_NOTIFICATION_EMAIL) return;
  const rows = Object.entries(details)
    .filter(([key]) => !["website", "turnstileToken"].includes(key))
    .map(([key, value]) => `<tr><td style="padding:6px;font-weight:bold">${escapeHtml(key)}</td><td style="padding:6px">${escapeHtml(stringValue(value) || "-")}</td></tr>`)
    .join("");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: env.EMAIL_FROM || "Careya <onboarding@resend.dev>",
      to: [env.LEAD_NOTIFICATION_EMAIL],
      subject,
      html: `<h2>${escapeHtml(subject)}</h2><table>${rows}</table>`,
    }),
  });
}

function escapeHtml(value: string) {
  return value.replace(/[<>&"']/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;", "'": "&#39;" })[char] || char);
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}
