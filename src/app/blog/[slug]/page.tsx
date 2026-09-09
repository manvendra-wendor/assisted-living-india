import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { CityLinks } from "@/components/city-links";
import { Breadcrumbs, JsonLd } from "@/components/ui";
import { articles, getArticle, guideTopics, siteConfig } from "@/lib/data";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return article ? { title: article.title, description: article.excerpt, alternates: { canonical: `/blog/${article.slug}` }, openGraph: { title: article.title, description: article.excerpt, url: `/blog/${article.slug}`, type: "article", publishedTime: article.publishedAt, modifiedTime: article.updatedAt ?? article.publishedAt, images: [article.image] }, twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [article.image] } } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const topic = guideTopics.find((item) => item.categories.includes(article.category));
  const relatedLinks = article.relatedLinks ?? [
    ...(article.citySlug ? [{ label: "Compare residences in this city", href: `/assisted-living/${article.citySlug}` }] : []),
    { label: "Explore care options", href: topic?.href ?? "/care/assisted-living" },
    { label: "Compare monthly costs", href: "/blog/cost-of-assisted-living-in-india" },
    { label: "Assisted living and nursing homes compared", href: "/blog/assisted-living-vs-nursing-home" },
  ];
  const sectionId = (index: number) => `section-${index + 1}`;
  const articlePath = `/blog/${article.slug}`;
  const learnHref = topic?.href && topic.href !== articlePath ? topic.href : "/care/assisted-living";
  const compareHref = article.citySlug ? `/assisted-living/${article.citySlug}` : "/browse";
  return <>
    <JsonLd data={[{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, image: article.image, datePublished: article.publishedAt, dateModified: article.updatedAt ?? article.publishedAt, author: { "@type": "Organization", name: "Careya Editorial Team", url: `${siteConfig.url}/editorial-policy` }, publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url }, mainEntityOfPage: `${siteConfig.url}/blog/${article.slug}` }, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: "Guides", item: `${siteConfig.url}/blog` }, { "@type": "ListItem", position: 3, name: article.title, item: `${siteConfig.url}/blog/${article.slug}` }] }]} />
    <header className="article-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/blog" }, { label: article.title }]} /><span className="eyebrow">The Careya journal · {article.category}</span><h1>{article.title}</h1><p>{article.excerpt}</p><div className="article-meta"><Link href="/editorial-policy">Careya Editorial Team</Link><span>{article.readTime}</span><span>Updated {new Date(article.updatedAt ?? article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })}</span></div></div></header>
    <div className="article-cover"><Image src={article.image} alt="" fill priority sizes="100vw" /></div>
    <div className="container reading-layout"><aside className="reading-sidebar"><nav aria-label="In this guide"><span className="eyebrow">In this guide</span>{article.sections.map((section, index) => <a key={section.heading} href={`#${sectionId(index)}`}><small>{String(index + 1).padStart(2, "0")}</small>{section.heading}</a>)}</nav><div className="reading-help"><h3>Choosing from abroad?</h3><p>Build a shortlist around your parent’s needs.</p><Link className="text-link" href="/concierge">Ask for guidance <ArrowRight size={15} /></Link></div></aside>
    <article className="prose reading-body"><div className="reading-summary"><span className="eyebrow">At a glance</span><p>{article.summary ?? article.sections[0]?.paragraphs[0] ?? article.excerpt}</p></div>
    <nav className="reading-funnel" aria-label="Your next steps"><span className="eyebrow">From research to a shortlist</span><div><Link href={learnHref}><small>01</small><strong>Understand the care</strong><span>Review services and questions</span></Link><Link href={compareHref}><small>02</small><strong>Compare residences</strong><span>See sourced directory profiles</span></Link><Link href="/concierge"><small>03</small><strong>Request a shortlist</strong><span>Share your family’s requirements</span></Link></div></nav>
    {article.sections.map((section, index) => <Fragment key={`${section.heading}-${index}`}><section id={sectionId(index)}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>{index === 4 && <aside className="reading-inline-cta"><div><span className="eyebrow">Ready to compare?</span><strong>Turn these questions into a practical shortlist.</strong></div><Link className="button button-small" href={compareHref}>Compare residences <ArrowRight size={15} /></Link><Link className="text-link" href="/concierge">Ask Careya for guidance</Link></aside>}</Fragment>)}
    {article.sources && <section className="reading-sources"><h2>Sources and further reading</h2><ul>{article.sources.map((source) => <li key={source.href}><a href={source.href}>{source.label}</a></li>)}</ul></section>}
    <section className="reading-related"><h2>Continue your research</h2>{relatedLinks.filter((link) => link.href !== `/blog/${article.slug}`).map((link) => <Link href={link.href} key={link.href}>{link.label}<ArrowRight size={17} /></Link>)}</section>
    <p className="prose-note"><strong>About this guide</strong>General family guidance, not an individual clinical assessment. Confirm suitability with the treating professional and provider. <Link href="/editorial-policy">Read our editorial policy.</Link></p></article></div>
    <CityLinks currentSlug={article.citySlug} title="Compare residences by city" body="Every city guide lists local residences with sourcing and verification status shown on each profile." />
  </>;
}
