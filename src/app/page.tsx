import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CalendarCheck2,
  Check,
  ChevronRight,
  GitCompareArrows,
  HeartHandshake,
  ListChecks,
  MessageCircleHeart,
  Plane,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { SearchBox } from "@/components/search-box";
import { JsonLd, SectionHeading } from "@/components/ui";
import { articles, careTypes, editorialImages, popularLocations, properties, siteConfig } from "@/lib/data";
import careyaHeroLandscape from "./careya-hero-landscape.jpg";

export const metadata: Metadata = {
  title: "Careya: Assisted Living in India | Premium Senior Living Directory",
  description: "Compare premium assisted living, luxury senior living, dementia care and old age homes in India by city, care services, pricing guidance, reviews and verification status.",
  keywords: ["assisted living in India", "senior living India", "luxury old age homes India", "dementia care India", "retirement homes India"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Careya: Assisted Living in India | Premium Senior Living Directory",
    description: "Compare premium assisted living, luxury senior living, dementia care and old age homes across India.",
    url: "/",
  },
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

const aiOverviewFaqs = [
  {
    question: "What is the best assisted living option in India?",
    answer: "The best assisted living option depends on the parent’s care needs, preferred city, monthly budget, medical support requirements, room preference and family travel access. Families should compare services, staffing, emergency response, fees, reviews and verification status before shortlisting.",
  },
  {
    question: "How much does premium assisted living cost in India?",
    answer: "Premium assisted living in India commonly depends on the city, room type, dependency level, nursing needs, therapies and meal or housekeeping inclusions. Families comparing options in the 1 lakh to 2 lakh rupees per month range should request an assessment-based written estimate.",
  },
  {
    question: "How can NRIs compare senior living for parents in India?",
    answer: "NRIs can shortlist by city, care type, hospital access, staffing, pricing inclusions and family reviews, then arrange calls, video tours and in-person visits. A concierge shortlist can help organise questions before contacting residences.",
  },
];

const conciergeStats = [
  { value: "9", label: "city guides connected through the directory" },
  { value: "24x7", label: "medical-support questions to verify before choosing" },
];

export default function Home() {
  const featured = properties.filter((property) => property.featured).slice(0, 6);
  const latestArticles = articles.slice(0, 3);
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Careya assisted living directory",
          url: siteConfig.url,
          description: "A directory for comparing premium assisted living, senior living, dementia care and old age homes in India.",
          about: careTypes.map((care) => care.name),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: popularLocations.slice(0, 8).map((location, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `Assisted living in ${location.name}`,
              url: `${siteConfig.url}/assisted-living/${location.slug}`,
            })),
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: aiOverviewFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
      ]} />
      <section className="hero">
        <Image className="hero-background-image" src={careyaHeroLandscape} alt="Illustration of a senior-living residence in the Himalayan foothills of India" fill priority loading="eager" fetchPriority="high" sizes="100vw" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="hero-message">
              <span className="eyebrow">Premium senior care directory for India</span>
              <h1>Find trusted assisted living in India, <em>chosen with care.</em></h1>
              <p className="hero-lede">Compare senior living, dementia care and recovery residences by location, support needs, reviews and sourcing status.</p>
            </div>
            <SearchBox />
            <div className="hero-meta">
              <div className="hero-quick-links" aria-label="Popular assisted-living locations">
                <span>Popular</span>
                {popularLocations.slice(0, 4).map((location) => <Link href={`/assisted-living/${location.slug}`} key={location.slug}>{location.name}</Link>)}
              </div>
              <div className="hero-proof-row" aria-label="Directory benefits">
                {trustItems.map(({ icon: Icon, title }) => <span key={title}><Icon size={16} strokeWidth={1.7} />{title}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nri-concierge-section">
        <div className="container nri-concierge-panel">
          <div className="nri-concierge-photo"><Image src={editorialImages.conversation} alt="A family sharing a caring conversation with an older parent" fill sizes="(max-width: 760px) 100vw, 18vw" /></div>
          <div className="nri-concierge-intro">
            <span className="eyebrow">For families living abroad</span>
            <h2>NRI families can shortlist with fewer unknowns.</h2>
            <p>Share your parent’s care needs, preferred city and timeline. We organise the search before you begin calling residences.</p>
          </div>
          <div className="nri-stats" aria-label="Premium assisted-living search signals">
            {conciergeStats.map((stat) => <span key={stat.value}><strong>{stat.value}</strong><small>{stat.label}</small></span>)}
          </div>
          <div className="nri-concierge-points">
            <span><Plane size={19} /> Long-distance family support</span>
            <span><CalendarCheck2 size={19} /> A simpler route to a shortlist</span>
          </div>
          <Link className="button button-light nri-concierge-button" href="/concierge"><span>Talk through your search</span><ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="section answer-section">
        <div className="container answer-layout">
          <div>
            <span className="eyebrow">Short answer for families</span>
            <h2>How to choose the best assisted living in India</h2>
            <p>Start with the parent’s daily support needs, then compare the residence by care capability, monthly inclusions, room type, emergency process, staff training, reviews and how clearly the provider documents what is included.</p>
            <div className="answer-actions">
              <Link className="button" href="/directory">Compare residences <ArrowRight size={17} /></Link>
              <Link className="text-link" href="/blog/how-to-choose-assisted-living">Read the comparison checklist <ChevronRight size={15} /></Link>
            </div>
          </div>
          <div className="answer-checklist" aria-label="Assisted living comparison checklist">
            <h3>Compare before you enquire</h3>
            {["Care plan and night staffing", "Monthly fees, deposits and add-ons", "Dementia, Parkinson’s or post-operative support", "Family reviews and profile sourcing", "Hospital access and emergency response"].map((item) => <span key={item}><Check size={16} /> {item}</span>)}
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

      <section className="section seo-link-section">
        <div className="container seo-link-layout">
          <div>
            <span className="eyebrow">Popular searches</span>
            <h2>Explore senior living by need and city.</h2>
            <p>These links help families and search engines understand the directory structure: care-led pages explain the need, city pages compare local options, and property pages carry profile-level details.</p>
          </div>
          <div className="seo-link-groups">
            <div>
              <h3>Care needs</h3>
              {careTypes.map((care) => <Link href={`/care/${care.slug}`} key={care.slug}>{care.name}<ArrowRight size={14} /></Link>)}
            </div>
            <div>
              <h3>High-intent cities</h3>
              {popularLocations.slice(0, 8).map((location) => <Link href={`/assisted-living/${location.slug}`} key={location.slug}>Assisted living in {location.name}<ArrowRight size={14} /></Link>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section featured-residences-section">
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

      <section className="section section-soft"><div className="narrow"><SectionHeading eyebrow="Questions families ask" title="Planning assisted living in India" /><div className="faq-list">{aiOverviewFaqs.map((faq) => <details className="faq-item" key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div><nav className="care-reading-links" aria-label="Planning guides"><Link href="/blog/cost-of-assisted-living-in-india">Compare monthly fees</Link><Link href="/blog">Explore the family care journal</Link></nav></div></section>

      <section className="section section-dark">
        <div className="container operator-cta">
          <Sparkles size={28} color="#e2b26e" />
          <span className="eyebrow">For senior-living operators</span>
          <h2>Help the right families understand what makes your care different.</h2>
          <p>Submit or claim a profile, document your facilities and respond to qualified family enquiries.</p>
          <Link className="button button-gold" href="/list-your-property">List your property <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}
