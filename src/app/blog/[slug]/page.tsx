import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, JsonLd } from "@/components/ui";
import { articles, getArticle, siteConfig } from "@/lib/data";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return article ? { title: article.title, description: article.excerpt, alternates: { canonical: `/blog/${article.slug}` }, openGraph: { type: "article", publishedTime: article.publishedAt, images: [article.image] } } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, image: article.image, datePublished: article.publishedAt, dateModified: article.publishedAt, author: { "@type": "Organization", name: "Assisted Living India Editorial Team" }, publisher: { "@type": "Organization", name: "Assisted Living India" }, mainEntityOfPage: `${siteConfig.url}/blog/${article.slug}` }} />
    <header className="article-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/blog" }, { label: article.title }]} /><h1>{article.title}</h1><p>{article.excerpt}</p><div className="article-meta"><span>{article.category}</span><span>{article.readTime}</span><span>Updated {new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span></div></div></header>
    <div className="article-cover"><Image src={article.image} alt="" fill priority sizes="100vw" /></div>
    <article className="narrow prose"><p className="prose-note"><strong>Editorial note</strong>This guide is general information, not medical, legal or financial advice. Individual suitability should be assessed by qualified professionals and the chosen provider.</p>{article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}<div className="prose-note"><strong>Ready to compare?</strong><p>Use the directory to organise residences by location, care type, rooms and facilities.</p><Link className="text-link" href="/directory">Explore the directory <ArrowRight size={15} /></Link></div></article>
  </>;
}
