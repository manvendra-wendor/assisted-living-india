import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "About Careya", description: "Why Careya is building a clearer, more transparent way to compare premium eldercare in India.", alternates: { canonical: "/about" } };

export default function AboutPage() { return <><ContentPage eyebrow="Our purpose" title="Better information for one of life’s biggest decisions" intro="Careya is being built to make premium eldercare easier to understand, compare and discuss as a family." sections={[
  { title: "Why this directory exists", paragraphs: ["India’s senior-care landscape is growing quickly, but families still piece together options from brochures, recommendations and search results. We believe core care capabilities, pricing context, verification and family experiences should be easier to compare."] },
  { title: "Designed around families", paragraphs: ["The directory is primarily designed for adult children—whether nearby, in another Indian city or overseas—who want to support an older parent without taking away their agency. The older adult’s preferences, dignity and informed consent remain central."] },
  { title: "Our boundaries", paragraphs: ["We organise information and make introductions. We do not diagnose, recommend a clinical plan, guarantee a provider or accept payment to alter reviews. Families should visit, assess and verify any shortlisted residence."] },
]} /><section className="section section-dark"><div className="narrow" style={{ textAlign: "center" }}><h2>Start with a clearer shortlist.</h2><p style={{ color: "#b8c7c0" }}>Compare profiles independently or ask our concierge to help organise the questions.</p><Link className="button button-gold" href="/directory">Explore residences <ArrowRight size={16} /></Link></div></section></>; }
