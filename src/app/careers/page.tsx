import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, HeartHandshake, ScrollText } from "lucide-react";
import { Breadcrumbs, JsonLd, SectionHeading } from "@/components/ui";
import { careersEmail, editorialImages, openRoles, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the team building India’s clearest, most transparent guide to premium senior care. Open roles across concierge, editorial, engineering and operations.",
  alternates: { canonical: "/careers" },
};

const values = [
  { icon: HeartHandshake, title: "Families first, always", text: "Every decision starts with the family in the middle of it. If a change helps our numbers but leaves a family less informed, it does not ship." },
  { icon: ScrollText, title: "Evidence over adjectives", text: "We publish what we can source and label what we cannot. Verification status, pricing context and the gaps in our knowledge all stay visible." },
  { icon: Compass, title: "Independence we can defend", text: "Commercial relationships never move a residence up a list or soften a review. That boundary is the product." },
];

const hiringSteps = [
  { title: "Intro conversation", detail: "Thirty minutes on your experience and what you want from the work. You will get honest answers about stage, scope and pay band before anything else." },
  { title: "Paid practical exercise", detail: "A short task drawn from real work — a care conversation, a sourcing audit or a small build. We pay for your time and never use it as spec work." },
  { title: "Team conversations and offer", detail: "Two conversations with people you would work beside, including someone outside your function. Then a written offer with the reasoning behind the band." },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={openRoles.map((role) => ({
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: role.title,
        description: role.summary,
        employmentType: "FULL_TIME",
        hiringOrganization: { "@type": "Organization", name: siteConfig.name, sameAs: siteConfig.url },
        jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: role.location, addressCountry: "IN" } },
        directApply: false,
        url: `${siteConfig.url}/careers`,
      }))} />

      <header className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />
          <span className="eyebrow">Join us</span>
          <h1>Help families choose care with clarity.</h1>
          <p>We are a small team building India’s most transparent guide to premium senior care. The work is unglamorous, deeply human, and it matters enormously to the families who find us.</p>
        </div>
      </header>

      <section className="story-split">
        <div className="story-image"><Image src={editorialImages.familyGarden} alt="" fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
        <div className="story-copy">
          <span className="eyebrow">Why this work matters</span>
          <h2>Most families do this once, with almost no information.</h2>
          <p>Choosing a residence for a parent is one of the hardest decisions an adult child makes — usually under time pressure, often across cities, frequently while disagreeing with a sibling. Today they piece it together from brochures and word of mouth.</p>
          <div className="story-points">
            <div className="story-point"><span>1</span><div><strong>Real consequences</strong><small>What we publish shapes where someone’s parent lives for years.</small></div></div>
            <div className="story-point"><span>2</span><div><strong>Small team, wide scope</strong><small>You will own a surface end to end and watch families use it within weeks.</small></div></div>
            <div className="story-point"><span>3</span><div><strong>Independence protected</strong><small>Nobody here is asked to soften a finding for a commercial relationship.</small></div></div>
          </div>
          <Link className="button button-gold" href="#open-roles">See open roles <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="How we work" title="Three commitments we hire against" body="These are the standards we hold each other to, and what we listen for in every conversation." />
          <div className="care-grid">
            {values.map(({ icon: Icon, title, text }, index) => (
              <div className="care-card" key={title}><span className="care-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p><Icon size={19} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="open-roles">
        <div className="container">
          <SectionHeading eyebrow="Open roles" title={`${openRoles.length} roles open right now`} body="Remote-friendly across India unless a role names a city. If none of these fit but the work does, write to us anyway." />
          <div className="role-list">
            {openRoles.map((role) => (
              <div className="role-item" key={role.slug}>
                <div>
                  <div className="role-meta"><span>{role.team}</span><span>{role.location}</span><span>{role.commitment}</span></div>
                  <h3>{role.title}</h3>
                  <p>{role.summary}</p>
                </div>
                <ul className="role-focus">{role.focus.map((item) => <li key={item}>{item}</li>)}</ul>
                <a className="button button-gold button-small" href={`mailto:${careersEmail}?subject=${encodeURIComponent(`Application: ${role.title}`)}`}>Apply <ArrowRight size={14} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="Our process" title="What hiring looks like here" body="Three steps, roughly two to three weeks, with a clear answer at every stage." />
          <div className="decision-grid">
            {hiringSteps.map(({ title, detail }, index) => (
              <div className="decision-card" key={title}>
                <div><h3>{title}</h3><p>{detail}</p><span>Step {index + 1}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="narrow" style={{ textAlign: "center" }}>
          <h2>Don’t see your role?</h2>
          <p style={{ color: "#b8c7c0" }}>Tell us what you would want to own and why this problem interests you. We read every note and reply to the ones we can act on.</p>
          <a className="button button-gold" href={`mailto:${careersEmail}?subject=${encodeURIComponent("Speculative application")}`}>Write to us <ArrowRight size={16} /></a>
        </div>
      </section>
    </>
  );
}
