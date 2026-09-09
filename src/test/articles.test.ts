import { describe, expect, it } from "vitest";
import { articles } from "@/lib/data";

function articleWordCount(article: (typeof articles)[number]) {
  return [
    article.title,
    article.excerpt,
    article.summary ?? "",
    ...article.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
  ].join(" ").trim().split(/\s+/).length;
}

describe("editorial article depth", () => {
  it("keeps every published guide above 1,000 words", () => {
    const thinArticles = articles
      .map((article) => ({ slug: article.slug, words: articleWordCount(article) }))
      .filter((article) => article.words < 1_000);

    expect(thinArticles).toEqual([]);
  });

  it("keeps article slugs unique", () => {
    expect(new Set(articles.map((article) => article.slug)).size).toBe(articles.length);
  });
});
