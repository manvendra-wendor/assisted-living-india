import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { getAdminContext } from "@/lib/admin";
import { properties } from "@/lib/data";

export default async function AdminPage() {
  const { preview, admin } = await getAdminContext();
  const tables = ["properties", "leads", "reviews", "listing_submissions"] as const;
  const counts: Record<string, number> = preview ? { properties: properties.length, leads: 7, reviews: 4, listing_submissions: 3 } : {};
  if (admin) await Promise.all(tables.map(async (table) => { const { count } = await admin.from(table).select("id", { count: "exact", head: true }); counts[table] = count || 0; }));
  return <><span className="eyebrow">Operations</span><h1>Directory overview</h1>{preview && <div className="notice"><Info size={18} /><span>Preview metrics are shown. Connect Supabase and sign in with an admin profile for live moderation.</span></div>}<div className="stat-grid"><Stat label="Properties" value={counts.properties} /><Stat label="Open leads" value={counts.leads} /><Stat label="Reviews in queue" value={counts.reviews} /><Stat label="Listing submissions" value={counts.listing_submissions} /></div><div className="form-card"><h2>Moderation workflow</h2><p>New reviews, listings and ownership claims remain private until an admin approves them. Property verification is a separate flag and should require documentary or operator confirmation.</p><Link className="text-link" href="/admin/reviews">Open review queue <ArrowRight size={15} /></Link></div></>;
}

function Stat({ label, value }: { label: string; value: number }) { return <div className="stat-card"><span>{label}</span><strong>{value}</strong></div>; }
