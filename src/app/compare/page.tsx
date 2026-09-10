import type { Metadata } from "next";
import { ComparisonView } from "@/components/comparison-view";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = { title: "Compare Assisted Living Residences", description: "Compare two or three senior living residences across care, rooms, stays, amenities and verification.", alternates: { canonical: "/compare" }, robots: { index: false, follow: true } };

export default function ComparePage() {
  return <><header className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} /><span className="eyebrow">Side-by-side clarity</span><h1>Compare residences</h1><p>See care, accommodation and facilities together, then request personalised pricing for the options that fit.</p></div></header><section className="section compare-section"><div className="container"><ComparisonView /></div></section></>;
}
