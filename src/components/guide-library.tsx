"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import type { Article } from "@/lib/types";

type GuidePreview = Pick<Article, "slug" | "title" | "excerpt" | "category" | "image" | "readTime">;

export function GuideLibrary({ guides, topics }: { guides: GuidePreview[]; topics: { id: string; label: string; categories: string[] }[] }) {
  const [topic, setTopic] = useState("all");
  const [query, setQuery] = useState("");
  const categories = topics.find((item) => item.id === topic)?.categories;
  const results = guides.filter((guide) => (!categories || categories.includes(guide.category)) && `${guide.title} ${guide.excerpt}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <div className="journal-library-tools">
      <div className="journal-filters" role="group" aria-label="Filter guides by topic">
        {[{ id: "all", label: "All guides" }, ...topics].map((item) => <button type="button" key={item.id} aria-pressed={topic === item.id} onClick={() => setTopic(item.id)}>{item.label}</button>)}
      </div>
      <label className="journal-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search guides</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a question or topic" type="search" /></label>
    </div>
    <p className="journal-result-count" role="status">{results.length} guides{query.trim() && ` matching “${query.trim()}”`}</p>
    <div className="journal-grid">{results.map((guide) => <Link className="journal-card" href={`/blog/${guide.slug}`} key={guide.slug}>
      <div className="journal-card-image"><Image src={guide.image} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 33vw" /><span>{guide.category}</span></div>
      <div className="journal-card-body"><small>{guide.readTime}</small><h3>{guide.title}</h3><p>{guide.excerpt}</p><span className="journal-read">Read the guide <ArrowUpRight size={18} /></span></div>
    </Link>)}</div>
    {results.length === 0 && <div className="journal-empty"><h3>No guides found for this search</h3><p>Try “cost”, “dementia” or a city name.</p><button className="button button-small" onClick={() => { setQuery(""); setTopic("all"); }}>Show all guides</button></div>}
  </>;
}
