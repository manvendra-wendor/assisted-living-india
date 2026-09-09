import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Review Guidelines", description: "Standards for genuine, useful and respectful assisted-living reviews.", alternates: { canonical: "/review-guidelines" } };

export default function ReviewGuidelinesPage() { return <ContentPage eyebrow="Community standards" title="Review guidelines" intro="Reviews should help another family understand a real experience without exposing private medical information." sections={[
  { title: "Who may review", paragraphs: ["Residents, family members, close friends and genuine visitors may review a property they have direct experience with. Operators, employees and paid representatives must not pose as families."], bullets: ["Describe your relationship clearly", "Share when the experience occurred", "Focus on first-hand observations", "Disclose any material incentive"] },
  { title: "What we publish", paragraphs: ["Useful reviews are specific, balanced and respectful. We may lightly edit formatting but do not change meaning. Every review remains pending until an editorial check is complete."] },
  { title: "What we remove", paragraphs: ["We reject reviews containing private health details, hate speech, threats, unverifiable allegations, promotional copy, conflicts of interest or personal contact information. A negative opinion alone is not a reason for removal."] },
  { title: "Operator responses", paragraphs: ["Claimed properties may respond once. Responses must protect resident confidentiality and address the experience constructively."] },
]} />; }
