import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function SectionHeading({ eyebrow, title, body, action }: { eyebrow: string; title: string; body?: string; action?: { label: string; href: string } }) {
  return (
    <div className="section-heading">
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{body && <p>{body}</p>}</div>
      {action && <Link className="text-link" href={action.href}>{action.label}<ChevronRight size={16} /></Link>}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => <span key={`${item.label}-${index}`}>{index > 0 && <ChevronRight size={13} />}{item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}</span>)}
    </nav>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
