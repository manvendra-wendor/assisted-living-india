# Ahrefs keyword mapping — September 2026

## Source and interpretation

Read all three files in `Ahrefs-keywords/`: 37 parent-topic rows in assisted-living.csv, 17 in dementia care.csv and 545 in Rehabilitation.csv (599 total). These are UTF-16, tab-separated parent-topic exports despite the CSV extension. They contain cluster counts, not the individual keywords inside each cluster. AppleDouble `._` files are filesystem metadata and are excluded.

Numbers below are the exports’ **Cluster Volume** values, not forecasts of visits, leads or unique searchers. The exports have separate Volume and Global Volume columns; these should not be substituted or summed together. The country setting is not included as a column, so confirm it in Ahrefs before describing these as India-only search volumes. A zero or empty metric is not evidence that a topic has no value.

## Implemented page ownership

| Parent topic / related intent | Export cluster volume | Primary URL | Action |
| --- | ---: | --- | --- |
| assisted living | 2,710 | /care/assisted-living | Enhanced service page, care questions, cost context, links and schema |
| assisted living near me / facilities | 1,210 / 680 | /directory | Retain city/care filters; local pages own city intent |
| assisted living chennai | 1,170 | /assisted-living/chennai | Retain established targeted metadata; improve city template and contextual links |
| assisted living cost | 240 | /blog/cost-of-assisted-living-in-india | Expanded quote checklist and explicitly illustrative premium budgeting section |
| luxury retirement homes in mumbai | 200 | /assisted-living/mumbai | Retain Mumbai URL, improve design and link to luxury care and local dementia page |
| assisted living vs nursing home | 150 | /blog/assisted-living-vs-nursing-home | Existing comparison; improved article layout, contents, metadata and links |
| assisted living pune / mumbai | 100 / 70 | /assisted-living/pune and /assisted-living/mumbai | Preserve city intent and improve shared template |
| senior living / senior housing | 270 / 80 | /care/independent-living | Improved retirement-home positioning and decision content |
| assisted living meaning | 60 | /blog/what-is-assisted-living | Retain explanatory article; add answer summary, contents and contextual navigation |
| retirement homes in bangalore / senior living bangalore | 60 / 0 | /assisted-living/bengaluru | Use Bangalore terminology in H1, retain Bengaluru canonical URL |
| memory care / memory care facility / dementia assisted living | 40 / 10 / 30 | /care/dementia-care | Consolidated with dementia-care intent |
| dementia care | 2,940 | /care/dementia-care | Expanded care-home page, dedicated decision content and related guides |
| dementia care homes in mumbai | 140 | /care/dementia-care/mumbai | New local landing page with city-and-care-filtered preview profiles and Mumbai-specific planning content |
| home care for dementia / dementia home care / dementia care at home | 150 / 30 / 10 | /blog/dementia-care-at-home-vs-care-home | New comparison guide |
| dementia care plan | 50 | /blog/dementia-care-questions-for-families | Expanded to the promised 12 questions; family planning rather than clinical nursing protocol |
| dementia care near me / Alzheimer’s care near me / best dementia care home | 150 / 50 / 50 | /care/dementia-care | Compare care and location; no unsupported “best” ranking |
| rehabilitation meaning / types of rehabilitation | 16,150 / 1,230 | /blog/rehabilitation-meaning-and-types | New family-oriented explanation; explicit senior physical rehabilitation scope |
| stroke rehabilitation | 1,120 | /blog/stroke-rehabilitation-care-guide | New guide to choosing post-discharge support, with NHS source |
| neuro rehabilitation | 850 | /blog/neuro-rehabilitation-for-seniors | New family guide and links to relevant city pages |
| geriatric rehabilitation | 160 | /care/rehabilitation | Enhanced service page with geriatric terminology and specialist questions |
| post operative physiotherapy | 230 | /care/post-operative-care and /blog/post-operative-care-after-discharge | Service page owns enquiries; existing guide owns discharge planning |

The homepage remains the broad brand/directory entry point. Avoid creating extra exact-match URLs for alternate spellings or minor wording changes. City checklist articles remain informational; city landing pages own local comparison intent. Added blog records are included automatically in the existing sitemap collection. The new local-care URL is registered in staticPages.

## Queries not turned into new pages

- Branded providers (Athulya, The Golden Estate, Artha, Priaashraya, Ambient and others): need sourced, real operator records. Current preview listings do not substantiate provider-specific pages or tariffs. The cost guide explains how to request a current branch-specific quote.
- Addiction, alcohol/drug rehab, de-addiction and psychiatric-provider searches: materially different service intent from the directory’s senior physical rehabilitation scope.
- RCI qualifications, courses, jobs, exam materials, PPT/PDF clinical protocols, translations, slum/land rehabilitation, animal care and sports/injury exercise protocols: do not match this family directory. No bulk pages created to chase unrelated volume.
- Stroke/neuro centres in Bangalore or Hyderabad: useful future commercial pages once there are source-backed specialist profiles. General rehabilitation preview records cannot establish those capabilities.
- Clinical dementia nursing diagnoses and care-plan PDFs: require qualified clinical authorship and review; family checklists are not substitutes.
- Overseas searches and Medicare: do not match the India service scope.

## Design and on-page implementation

- Journal: featured family story, care-topic links, working category filters and keyword search, larger editorial cards, dedicated concierge section.
- Articles: one H1, H2 sections, short summary, anchor navigation, editorial attribution, relevant internal links, source links on new clinical-context guides, Article and BreadcrumbList JSON-LD, canonical and social metadata.
- Care and city pages: photography, clearer first-screen actions, type-specific questions and budget guidance, contextual guide links and local cross-links. Collection schema describes the visible listing subset.
- New Mumbai dementia page: only profiles matching both city and dementia care; visible editorial status. No invented review/rating or verified-provider claims.

## Search guidance and measurement

Google’s guidance says standard SEO remains relevant to AI search and there is no special AI schema requirement: https://developers.google.com/search/docs/appearance/ai-features. Structured data should match visible content: https://developers.google.com/search/docs/appearance/structured-data/sd-policies.

These changes improve page relevance, navigation and crawlable content; they do not guarantee ranking or AI Overview inclusion. After deployment, validate production canonicals and rendered structured data, submit the sitemap, and monitor impressions, queries, clicks and qualified enquiries per landing page in Search Console and analytics. Do not infer a ranking change from localhost checks.
