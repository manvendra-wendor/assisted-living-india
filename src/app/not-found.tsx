import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() { return <section className="section" style={{ minHeight: 620, display: "grid", placeItems: "center" }}><div className="narrow" style={{ textAlign: "center" }}><span className="eyebrow">Page not found</span><h1 style={{ color: "var(--forest)" }}>This path doesn’t lead to a residence.</h1><p style={{ color: "var(--muted)" }}>The page may have moved, or the profile is no longer published.</p><Link className="button button-gold" href="/browse"><Search size={16} /> Explore the directory</Link></div></section>; }
