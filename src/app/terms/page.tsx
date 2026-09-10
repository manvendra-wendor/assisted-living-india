import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function TermsPage() { return <ContentPage eyebrow="Using the directory" title="Terms of use" intro="Careya is an information and introduction service, not a medical provider, care provider or booking agent." updated="8 August 2026" sections={[
  { title: "Information, not advice", paragraphs: ["Directory information and guides are general information. They do not replace clinical, legal or financial advice, an individual care assessment or your own due diligence. Availability, suitability and final pricing must be confirmed with the provider."] },
  { title: "Listings and enquiries", paragraphs: ["Profiles may contain operator-supplied or publicly sourced information. Status labels explain verification level. Sending an enquiry does not create a booking or guarantee admission, price or service availability."] },
  { title: "User contributions", paragraphs: ["You must have the right to submit enquiry and listing information. Contributions must be accurate to the best of your knowledge, respectful and free of confidential information. We may review, reject or remove submissions that breach our guidelines."] },
  { title: "Liability", paragraphs: ["To the extent permitted by law, the directory is not responsible for care decisions, provider actions, interruptions, or losses arising from reliance on third-party information. Nothing in these terms excludes rights that cannot legally be excluded."] },
]} />; }
