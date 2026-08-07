import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Editorial & Verification Policy", description: "How Assisted Living India researches, labels, verifies and updates property information." };

export default function EditorialPolicyPage() { return <ContentPage eyebrow="Trust & transparency" title="Editorial and verification policy" intro="We separate researched information, operator claims and verified facts so families can understand exactly what they are reading." updated="8 August 2026" sections={[
  { title: "Profile status", paragraphs: ["An editorial profile is assembled from public or supplied information but has not been confirmed by the operator. A claimed profile means an authorised representative controls or reviews it. Verified status is only added after identity and core property information have been checked."], bullets: ["Unclaimed editorial profile: not operator-confirmed", "Claimed: representative identity reviewed", "Verified: core property facts confirmed and dated"] },
  { title: "Sources and updates", paragraphs: ["Each production profile should record its source URL, source label and last-checked date. Material care claims require operator evidence or direct confirmation. We show unknown information as ‘ask provider’ rather than assuming availability."], bullets: ["Provider websites and published brochures", "Direct operator confirmation", "On-site or video verification where feasible", "Family reviews, clearly labelled as personal experience"] },
  { title: "Rankings and featured placement", paragraphs: ["Search relevance should consider the family’s filters, information completeness and editorial quality. Any future paid or featured placement must be visibly labelled and must not alter review scores or verification standards."] },
  { title: "Corrections", paragraphs: ["Operators and families can report inaccurate information through the contact page. Significant corrections are reviewed promptly, and disputed care claims may be hidden while evidence is assessed."] },
]} />; }
