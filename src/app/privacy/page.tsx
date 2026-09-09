import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" }, robots: { index: true, follow: true } };

export default function PrivacyPage() { return <ContentPage eyebrow="Your information" title="Privacy policy" intro="This policy explains what the directory collects and how family, reviewer and operator information is used." updated="8 August 2026" sections={[
  { title: "Information we collect", paragraphs: ["We collect information you submit through enquiry, concierge, review, account and listing forms. This may include contact details, relationship to the person seeking care, preferred location, broad care needs and property information. Do not submit detailed medical records."] },
  { title: "How information is used", paragraphs: ["We use information to respond to requests, provide agreed introductions, moderate submissions, secure accounts, improve the directory and comply with legal obligations. We do not sell personal data."], bullets: ["Deliver the service you request", "Send relevant operational communications", "Prevent spam and misuse", "Measure aggregate product performance"] },
  { title: "Sharing and retention", paragraphs: ["For a direct property enquiry, relevant details may be shared with that property. For concierge requests, we ask before making introductions. Service providers such as hosting, database, email and bot-protection vendors process data under their own contracts. Records are retained only as long as needed for these purposes."] },
  { title: "Your choices", paragraphs: ["You may request access, correction or deletion of your personal information using the contact page, subject to legal and fraud-prevention requirements."] },
]} />; }
