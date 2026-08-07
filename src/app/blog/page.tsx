import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, SectionHeading } from "@/components/ui";
import { articles } from "@/lib/data";

export const metadata: Metadata = { title: "Senior Living & Eldercare Guides", description: "Practical guides for comparing assisted living, dementia care, costs and recovery support across India." };

export default function BlogPage() {
  const [featured, ...rest] = articles;
  return <>
    <header className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]} /><span className="eyebrow">The family care journal</span><h1>Clear answers for complex care decisions.</h1><p>Independent guidance, useful questions and practical frameworks—written for families choosing care in India.</p></div></header>
    <section className="section"><div className="container"><Link className="blog-feature" href={`/blog/${featured.slug}`}><div className="blog-feature-image"><Image src={featured.image} alt="" fill priority sizes="(max-width: 760px) 100vw, 60vw" /></div><div className="blog-feature-content"><span className="eyebrow">Featured · {featured.category}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><span className="button button-gold" style={{ alignSelf: "flex-start" }}>Read guide <ArrowRight size={16} /></span></div></Link></div></section>
    <section className="section section-soft"><div className="container"><SectionHeading eyebrow="Browse every guide" title="Research at your own pace" /><div className="article-grid">{rest.map((article) => <Link className="article-card" href={`/blog/${article.slug}`} key={article.slug}><div className="article-card-image"><Image src={article.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div><div className="article-card-content"><div className="article-card-meta"><span>{article.category}</span><span>{article.readTime}</span></div><h3>{article.title}</h3><p>{article.excerpt}</p></div></Link>)}</div></div></section>
  </>;
}
