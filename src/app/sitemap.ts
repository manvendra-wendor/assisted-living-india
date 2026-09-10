import type { MetadataRoute } from "next";
import { articles, careTypes, localCarePages, locationPages, properties, siteConfig } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/browse", "/blog", "/concierge", "/list-your-property", "/about", "/careers", "/contact", "/editorial-policy", "/privacy", "/terms"];
  return [
    ...staticPages.map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: now, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .7 })),
    ...properties.map((property) => ({ url: `${siteConfig.url}/properties/${property.slug}`, lastModified: new Date(property.lastUpdated), changeFrequency: "weekly" as const, priority: .8 })),
    ...locationPages.map((location) => ({ url: `${siteConfig.url}/assisted-living/${location.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: .9 })),
    ...careTypes.map((care) => ({ url: `${siteConfig.url}/care/${care.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: .8 })),
    ...localCarePages.map((page) => ({ url: `${siteConfig.url}/care/${page.careSlug}/${page.citySlug}`, lastModified: now, changeFrequency: "monthly" as const, priority: .75 })),
    ...articles.map((article) => ({ url: `${siteConfig.url}/blog/${article.slug}`, lastModified: new Date(article.updatedAt ?? article.publishedAt), changeFrequency: "monthly" as const, priority: .65 })),
  ];
}
