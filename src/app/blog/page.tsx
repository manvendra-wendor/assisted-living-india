import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { Breadcrumbs, JsonLd, SectionHeading } from "@/components/ui";
import { CityLinks } from "@/components/city-links";
import { GuideLibrary } from "@/components/guide-library";
import { articles, editorialImages, guideTopics, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Senior Living Guides: Costs, Dementia Care & Rehabilitation",
  description: "Practical guides to assisted living in India. Compare costs, dementia care, senior rehabilitation and city options for your parents, at home or from abroad.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "The Careya Journal | Senior Living Guides", description: "Thoughtful guidance for your family’s next chapter.", url: "/blog", images: [editorialImages.familyGarden] },
};

export default function BlogPage() {
  const featured = articles.find((article) => article.slug === "how-to-choose-assisted-living")!;
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Senior Living Guides", url: `${siteConfig.url}/blog`, mainEntity: { "@type": "ItemList", itemListElement: articles.map((article, index) => ({ "@type": "ListItem", position: index + 1, name: article.title, url: `${siteConfig.url}/blog/${article.slug}` })) } }} />
    <header className="journal-hero"><div className="container">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "The journal" }]} />
      <div className="journal-intro"><div><span className="eyebrow">The Careya journal</span><h1>A little clarity.<br />A better next chapter.</h1><p>Senior living, dementia care and recovery, made easier to understand. Thoughtful guides for families choosing care in India.</p><a className="text-link" href="#guide-library">Find the guidance you need <ArrowRight size={17} /></a></div><div className="journal-intro-note"><BookOpen size={23} strokeWidth={1.4} /><p>For the decisions<br />that matter most.</p><Link href="/editorial-policy">Our editorial approach <ArrowUpRight size={14} /></Link></div></div>
      <Link className="journal-feature" href={`/blog/${featured.slug}`}><div className="journal-feature-copy"><span className="eyebrow">Start here · A family guide</span><h2>Choosing care.<br /><em>Keeping them at the heart of it.</em></h2><p>{featured.excerpt}</p><span className="button button-light">How to choose assisted living <ArrowUpRight size={17} /></span><small>Care needs · Family visits · The questions to ask</small></div><div className="journal-feature-photo"><Image src={editorialImages.familyGarden} alt="Grandparents spending time with their grandson outdoors" fill priority sizes="(max-width: 760px) 100vw, 55vw" /><span className="journal-photo-caption">A new chapter, with familiar connections.</span></div></Link>
    </div></header>
    <section className="journal-topics"><div className="container"><span className="eyebrow">Where would you like to begin?</span><div className="journal-topic-grid">{guideTopics.map((topic, index) => <Link href={topic.href} key={topic.id}><span className="journal-topic-number">0{index + 1}</span><div><strong>{topic.label}</strong><small>{topic.description}</small></div><ArrowUpRight size={19} /></Link>)}</div></div></section>
    <section className="section journal-library" id="guide-library"><div className="container"><SectionHeading eyebrow="The reading room" title="Good questions deserve clear answers." body="Explore practical advice for each stage of your family’s search." /><GuideLibrary guides={articles.map(({ slug, title, excerpt, category, image, readTime }) => ({ slug, title, excerpt, category, image, readTime }))} topics={guideTopics} /></div></section>
    <section className="journal-concierge"><div className="container"><div><span className="eyebrow">From reading to a shortlist</span><h2>You don’t have to work<br />through every choice alone.</h2><p>Tell us about your parent’s needs, preferred city and budget. We’ll help you organise the next steps.</p></div><Link href="/concierge" className="button button-gold">Help me find the right care <ArrowRight size={17} /></Link></div></section>
    <CityLinks title="Find senior living closer to family" />
  </>;
}
