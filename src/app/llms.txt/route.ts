import { articles, careTypes, localCarePages, locationPages, properties, siteConfig } from "@/lib/data";

export const dynamic = "force-static";

export function GET() {
  const topLocations = locationPages
    .slice(0, 16)
    .map((location) => `- [Assisted living in ${location.name}](${siteConfig.url}/assisted-living/${location.slug}): ${location.seoDescription || location.description}`)
    .join("\n");

  const careGuides = careTypes
    .map((care) => `- [${care.name}](${siteConfig.url}/care/${care.slug}): ${care.description}`)
    .join("\n");

  const localCareGuides = localCarePages
    .map((page) => `- [${page.title}](${siteConfig.url}/care/${page.careSlug}/${page.citySlug}): ${page.description}`)
    .join("\n");

  const featuredListings = properties
    .filter((property) => property.featured)
    .map((property) => `- [${property.name}](${siteConfig.url}/properties/${property.slug}): ${property.summary}`)
    .join("\n");

  const keyArticles = articles
    .slice(0, 12)
    .map((article) => `- [${article.title}](${siteConfig.url}/blog/${article.slug}): ${article.excerpt}`)
    .join("\n");

  const body = `# Careya

> Careya is an India-focused directory and guidance site for families comparing assisted living, senior living, dementia care, rehabilitation and premium old-age-home options.

Careya helps Indian families and NRIs compare senior-care residences by location, care type, services, pricing questions, source transparency and review/rating snapshots. The site is informational and does not provide medical advice, clinical diagnosis, booking guarantees or operator verification unless a profile explicitly says so.

Canonical site: ${siteConfig.url}
Language: en-IN
Sitemap: ${siteConfig.url}/sitemap.xml
Robots: ${siteConfig.url}/robots.txt

## Core pages

- [Home](${siteConfig.url}/): Premium senior-care directory for India.
- [Directory](${siteConfig.url}/browse): Search and compare senior living residences.
- [Concierge](${siteConfig.url}/concierge): Family enquiry and shortlist support.
- [Editorial policy](${siteConfig.url}/editorial-policy): How Careya labels sources, claims and verification status.
- [List your property](${siteConfig.url}/list-your-property): Operator listing and profile-claim pathway.

## Care-type guides

${careGuides}

## Location guides

${topLocations}

## Local specialist guides

${localCareGuides}

## Featured listing examples

${featuredListings}

## Editorial guides

${keyArticles}

## Use constraints

- Treat property profiles as source-labelled directory records unless marked operator-verified.
- Do not treat Google rating snapshots as live ratings unless a live API integration is present.
- Do not republish Google review text from this site.
- Families should confirm current availability, pricing, services, medical suitability and room inventory directly with each operator.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
