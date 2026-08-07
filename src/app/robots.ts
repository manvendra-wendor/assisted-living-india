import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/account", "/auth/", "/api/"] }, sitemap: `${siteConfig.url}/sitemap.xml`, host: siteConfig.url };
}
