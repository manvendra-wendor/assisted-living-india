import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText, LogOut, Star } from "lucide-react";
import { signOut } from "@/app/actions";
import { getCurrentProfile, isSupabaseConfigured } from "@/lib/supabase/server";

interface AccountReview {
  id: string;
  title: string;
  rating: number;
  status: string;
  created_at: string;
}

export const metadata: Metadata = { title: "My Account", alternates: { canonical: "/account" }, robots: { index: false, follow: false } };

export default async function AccountPage() {
  const account = await getCurrentProfile();
  if (isSupabaseConfigured() && !account) redirect("/login");
  const supabase = account ? (await import("@/lib/supabase/server")).createSupabaseServerClient() : null;
  const client = supabase ? await supabase : null;
  const { data: reviews = [] } = client && account ? await client.from("reviews").select("id, title, rating, status, created_at, properties(name, slug)").eq("user_id", account.user.id).order("created_at", { ascending: false }) : { data: [] };
  return <><header className="page-hero"><div className="container"><span className="eyebrow">Family account</span><h1>{account?.profile?.full_name ? `Welcome, ${account.profile.full_name}` : "Your reviews"}</h1><p>Track reviews you have submitted and see when they pass editorial moderation.</p></div></header><section className="section"><div className="container">{!isSupabaseConfigured() && <div className="notice" style={{ marginBottom: 25 }}><FileText size={18} /><span>Account preview mode. Configure Supabase Auth to enable private accounts and review tracking.</span></div>}{reviews?.length ? <table className="data-table"><thead><tr><th>Review</th><th>Rating</th><th>Status</th><th>Submitted</th></tr></thead><tbody>{(reviews as AccountReview[]).map((review) => <tr key={review.id}><td>{review.title}</td><td>{review.rating}/5</td><td><span className="status-pill">{review.status}</span></td><td>{new Date(review.created_at).toLocaleDateString("en-IN")}</td></tr>)}</tbody></table> : <div className="empty-state"><Star size={24} color="var(--gold-dark)" style={{ margin: "0 auto 15px" }} /><h3>No reviews submitted</h3><p>Browse a residence and choose “Write a review” to share a genuine experience.</p><Link className="button button-gold" href="/browse">Browse residences</Link></div>}<form action={signOut} style={{ marginTop: 30 }}><button className="button button-ghost" type="submit"><LogOut size={16} /> Sign out</button></form></div></section></>;
}
