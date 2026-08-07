import { Breadcrumbs } from "@/components/ui";

export interface ContentSection { title: string; paragraphs: string[]; bullets?: string[] }

export function ContentPage({ eyebrow, title, intro, sections, updated }: { eyebrow: string; title: string; intro: string; sections: ContentSection[]; updated?: string }) {
  return <><header className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} /><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p>{updated && <small style={{ color: "var(--muted)" }}>Last updated {updated}</small>}</div></header><article className="narrow prose">{sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}</article></>;
}
