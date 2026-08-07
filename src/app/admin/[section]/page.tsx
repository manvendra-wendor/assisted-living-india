import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { moderateRecord } from "@/app/actions";
import { getAdminContext } from "@/lib/admin";
import { properties } from "@/lib/data";

const config = {
  properties: { table: "properties", title: "Properties", fields: ["name", "locality", "status", "verified"] },
  leads: { table: "leads", title: "Family leads", fields: ["name", "preferred_city", "care_needs", "status"] },
  reviews: { table: "reviews", title: "Review moderation", fields: ["title", "rating", "relationship", "status"] },
  listings: { table: "listing_submissions", title: "Listing submissions", fields: ["property_name", "operator_name", "city", "status"] },
  claims: { table: "ownership_claims", title: "Ownership claims", fields: ["property_id", "claimant_name", "job_title", "status"] },
} as const;

type Section = keyof typeof config;

export function generateStaticParams() { return Object.keys(config).map((section) => ({ section })); }

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section: rawSection } = await params;
  if (!(rawSection in config)) notFound();
  const section = rawSection as Section;
  const details = config[section];
  const { preview, admin } = await getAdminContext();
  let rows: Record<string, unknown>[] = [];
  if (preview) rows = previewRows(section);
  else if (admin) { const { data } = await admin.from(details.table).select("*").order("created_at", { ascending: false }).limit(50); rows = data || []; }
  return <><div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}><div><span className="eyebrow">Moderation & management</span><h1>{details.title}</h1></div>{section === "properties" && <Link className="button button-gold" href="/admin/properties/new"><Plus size={16} /> Add property</Link>}</div><p style={{ color: "var(--muted)" }}>{preview ? "Preview records illustrate the live admin workflow." : `${rows.length} most recent records.`}</p><div style={{ overflowX: "auto" }}><table className="data-table"><thead><tr>{details.fields.map((field) => <th key={field}>{field.replaceAll("_", " ")}</th>)}<th>Action</th></tr></thead><tbody>{rows.map((row, index) => <tr key={String(row.id || index)}>{details.fields.map((field) => <td key={field}>{field === "status" ? <span className="status-pill">{String(row[field] ?? "pending")}</span> : String(row[field] ?? "—")}</td>)}<td>{section === "properties" ? <Link className="text-link" href={`/admin/properties/${row.id}`}>Edit</Link> : <form action={moderateRecord} style={{ display: "flex", gap: 6 }}><input type="hidden" name="table" value={details.table} /><input type="hidden" name="id" value={String(row.id)} /><select name="status" defaultValue={String(row.status || "pending")}><option value="approved">Approve</option><option value="published">Publish</option><option value="rejected">Reject</option><option value="contacted">Contacted</option><option value="resolved">Resolve</option><option value="archived">Archive</option></select><button className="button button-small" type="submit">Save</button></form>}</td></tr>)}</tbody></table></div>{!rows.length && <div className="empty-state"><h3>Queue is clear</h3><p>New records will appear here.</p></div>}</>;
}

function previewRows(section: Section): Record<string, unknown>[] {
  if (section === "properties") return properties.slice(0, 5).map((item) => ({ id: item.id, name: item.name, locality: item.locality, status: "published", verified: item.verified }));
  if (section === "leads") return [{ id: "preview-lead", name: "Preview family", preferred_city: "Bengaluru", care_needs: "Assisted living", status: "new" }];
  if (section === "reviews") return [{ id: "preview-review", title: "A reassuring first visit", rating: 5, relationship: "Child of resident", status: "pending" }];
  if (section === "listings") return [{ id: "preview-listing", property_name: "Sample Residence", operator_name: "Preview operator", city: "Pune", status: "pending" }];
  return [{ id: "preview-claim", property_id: "property-01", claimant_name: "Preview claimant", job_title: "General manager", status: "pending" }];
}
