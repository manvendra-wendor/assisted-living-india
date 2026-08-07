import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  GitCompareArrows,
  HeartHandshake,
  ListChecks,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { SearchBox } from "@/components/search-box";
import { JsonLd, SectionHeading } from "@/components/ui";
import { articles, careTypes, editorialImages, popularLocations, properties, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Assisted Living in India | Compare Premium Senior Care",
  description: "Find and compare assisted living in India, including premium senior living, dementia care, rehabilitation and post-operative care across leading cities.",
  alternates: { canonical: "/" },
};

const trustItems = [
  { icon: ShieldCheck, title: "Independent profiles", detail: "Clear sourcing and verification status" },
  { icon: GitCompareArrows, title: "Compare side by side", detail: "Care, rooms, facilities and support" },
  { icon: HeartHandshake, title: "Human guidance", detail: "A free, no-pressure shortlist service" },
];

const searchPaths = [
  { icon: ListChecks, title: "Compare residences online", detail: "Filter by city, care, rooms and facilities.", href: "/directory", action: "Start comparing" },
  { icon: MessageCircleHeart, title: "Get a personal shortlist", detail: "Tell us your family’s needs and preferred location.", href: "/concierge", action: "Ask the concierge" },
  { icon: BookOpenText, title: "I’m just researching", detail: "Understand care types, costs and what to ask.", href: "/blog/what-is-assisted-living", action: "Read the essentials" },
];

export default function Home() {
  const featured = properties.filter((property) => property.featured).slice(0, 6);
  const latestArticles = articles.slice(0, 3);
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
      }} />
      <section className="hero">
        <Image className="hero-image hero-image-india" src={editorialImages.hero} alt="An Indian family discussing senior living together at home" fill priority loading="eager" fetchPriority="high" sizes="100vw" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">India’s assisted-living directory</span>
            <h1>Find assisted living in India. <em>Choose with clarity.</em></h1>
            <p className="hero-lede">Compare premium assisted living, independent communities, dementia care and recovery support across India’s leading eldercare destinations.</p>
            <SearchBox />
            <div className="hero-quick-links" aria-label="Popular assisted-living locations">
              <span>Popular:</span>
              {popularLocations.slice(0, 4).map((location) => <Link href={`/assisted-living/${location.slug}`} key={location.slug}>{location.name}</Link>)}
            </div>
            <p className="hero-note"><BadgeCheck size={16} /> Every profile shows whether details are editorial, claimed or operator-verified.</p>
          </div>
        </div>
        <div className="trust-row">
          <div className="container">
            {trustItems.map(({ icon: Icon, title, detail }) => <div className="trust-item" key={title}><Icon size={25} strokeWidth={1.5} /><div><strong>{title}</strong><small>{detail}</small></div></div>)}
          </div>
        </div>
      </section>

      <section className="section decision-section">
        <div className="container">
          <SectionHeading eyebrow="Your search, your way" title="Start where your family is today." body="Compare independently, ask for human help or learn the basics first. There is no pressure to enquire." />
          <div className="decision-grid">
            {searchPaths.map(({ icon: Icon, title, detail, href, action }) => (
              <Link className="decision-card" href={href} key={title}>
                <Icon size={24} strokeWidth={1.7} />
                <div><h3>{title}</h3><p>{detail}</p><span>{action} <ArrowRight size={14} /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="Find the right support" title="Care that changes with life—not the other way around." body="Start with what matters today. Compare how each residence could support changing needs tomorrow." action={{ label: "Explore every care type", href: "/care/assisted-living" }} />
          <div className="care-grid">
            {careTypes.map((care, index) => (
              <Link className="care-card" href={`/care/${care.slug}`} key={care.slug}>
                <span className="care-number">0{index + 1}</span>
                <h3>{care.name}</h3>
                <p>{care.description}</p>
                <ArrowRight size={19} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="A thoughtful first look" title="Residences families are exploring" body="Preview profiles demonstrate the details you’ll be able to compare. Operator verification is always shown clearly." action={{ label: "View all residences", href: "/directory" }} />
          <div className="property-grid">
            {featured.map((property, index) => <PropertyCard property={property} priority={index < 3} key={property.id} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Popular assisted-living locations" title="Begin with the cities families are comparing now." body="Explore Gurgaon, Mumbai, Dehradun and Chennai first, then compare established senior-living markets across India." />
          <div className="city-grid">
            {popularLocations.map((city) => (
              <Link className="city-card" href={`/assisted-living/${city.slug}`} key={city.slug}>
                <Image src={city.image} alt={`${city.name} city view`} fill sizes="(max-width: 760px) 100vw, 25vw" />
                <div className="city-card-content"><h3>{city.name}</h3><p>{city.region}</p><span>Explore residences <ArrowRight size={14} /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="story-split">
        <div className="story-image"><Image src={editorialImages.familyGarden} alt="Indian grandparents spending time with their grandchild in a garden" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <div className="story-copy">
          <span className="eyebrow">A clearer way to choose</span>
          <h2>Less searching. More certainty.</h2>
          <p>Choosing care can feel overwhelming, especially from another city or country. We organise the questions, facts and next steps around your family.</p>
          <div className="story-points">
            <div className="story-point"><span>1</span><div><strong>Tell us what matters</strong><small>Care needs, preferred location, budget and daily routines.</small></div></div>
            <div className="story-point"><span>2</span><div><strong>Compare with context</strong><small>See services, room options, facilities and verification status together.</small></div></div>
            <div className="story-point"><span>3</span><div><strong>Tour with better questions</strong><small>Use our visit checklist and speak directly with shortlisted residences.</small></div></div>
          </div>
          <Link className="button button-gold" href="/concierge">Ask for a free shortlist <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Guides for families" title="Make the decision at your own pace." body="Practical, plain-English guidance for comparing care, planning costs and starting sensitive conversations." action={{ label: "Browse all guides", href: "/blog" }} />
          <div className="article-grid">
            {latestArticles.map((article) => (
              <Link className="article-card" href={`/blog/${article.slug}`} key={article.slug}>
                <div className="article-card-image"><Image src={article.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <div className="article-card-content"><div className="article-card-meta"><span>{article.category}</span><span>{article.readTime}</span></div><h3>{article.title}</h3><p>{article.excerpt}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container" style={{ textAlign: "center" }}>
          <Sparkles size={28} color="#e2b26e" style={{ margin: "0 auto 18px" }} />
          <span className="eyebrow">For senior-living operators</span>
          <h2 style={{ maxWidth: 760, margin: "0 auto 20px" }}>Help the right families understand what makes your care different.</h2>
          <p style={{ maxWidth: 650, margin: "0 auto 30px", color: "#b8c7c0" }}>Submit or claim a profile, document your facilities and respond to qualified family enquiries.</p>
          <Link className="button button-gold" href="/list-your-property">List your property <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}
