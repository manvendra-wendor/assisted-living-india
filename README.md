# Careya

Careya is a premium, search-led directory for families comparing assisted living, independent living, luxury senior communities, dementia care, rehabilitation, and post-operative care across India. It is designed for families making a considered decision from another city or abroad.

## Local development

```bash
pnpm install
pnpm dev
```

The application runs without external credentials using its editorial preview dataset. Configure Supabase to enable persistent leads, reviews, listing submissions, authentication, and admin workflows.

### Node version

Use **Node 22.13 or newer**. The repository pins pnpm 11.16 via `packageManager`, and that version imports `node:sqlite`, which is only available unflagged from 22.13 onward. On an older Node, `pnpm` itself fails with `ERR_UNKNOWN_BUILTIN_MODULE: No such built-in module: node:sqlite` before any project script runs.

```bash
nvm install 22.20.0 && nvm alias default 22.20.0
```

### macOS external drives

`pnpm dev` and `pnpm build` run `scripts/clean-appledouble.mjs` first. Working copies stored on exFAT/HFS volumes (external SSDs, network shares) accumulate `._*` AppleDouble files that Turbopack tries to parse as modules. The predev/prebuild hook removes them; if you invoke `next` directly, run the script yourself first.

## Environment variables

Set these in `.env` (or `.env.local`) for local work, and as Worker variables or encrypted secrets in production. All are optional locally — each unset key disables its feature rather than breaking the build.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used by metadata, sitemap, and JSON-LD. Defaults to `https://careya.in`. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key for browser and SSR clients. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for admin and moderation workflows. Never expose to the client. |
| `RESEND_API_KEY` | Resend REST API key for transactional email. |
| `EMAIL_FROM` | From address on outbound email. |
| `LEAD_NOTIFICATION_EMAIL` | Internal recipient for new family enquiries. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key for public forms. |
| `TURNSTILE_SECRET_KEY` | Turnstile server-side verification secret. |

## Site structure

Content is organised into four silos plus a faceted directory that crosses them.

| Silo | Route | Count | Notes |
| --- | --- | --- | --- |
| Location | `/assisted-living/[city]` | 10 | Highest sitemap priority. Filters properties by `parentCitySlug`. |
| Care type | `/care/[slug]` | 6 | Six `CareTypeSlug` values, mirrored in directory filters. |
| Property | `/properties/[slug]` | 27 | Flat URLs; the city breadcrumb carries the hierarchy. |
| Editorial | `/blog/[slug]` | 16 | Seven evergreen guides plus nine city articles. |

`/directory` is the faceted search layer (`?city=`, `?care=`). Company and trust pages — `/about`, `/careers`, `/contact`, `/concierge`, `/compare`, `/list-your-property`, `/editorial-policy`, `/review-guidelines`, `/privacy`, `/terms` — are enumerated in `src/app/sitemap.ts`.

### Interlinking

`CityLinks` (`src/components/city-links.tsx`) renders every location page as a descriptive-anchor grid and is mounted at the bottom of the city, care, property, blog-article, and directory templates — after the FAQ block where one exists. Pass `currentSlug` so a page never links to itself. City pages additionally carry a `.care-link-row` into all six care types.

Any new template that represents a page families land on should end with `CityLinks`.

Care pages explain the care need, city pages own local comparison intent, and property pages carry profile-level information. Keep links descriptive for screen readers and search engines while allowing concise visual labels such as city names in location cards.

## Lead capture and routing

Family and operator forms are intentionally progressive so the active step fits within the first viewport:

- **Pricing / shortlist modal:** six short questions; selecting an option advances automatically. It captures relationship, state/UT, city, care need, timing, budget, and contact details.
- **Concierge page:** three-step family intake for location, care context, and contact details.
- **List your property:** three-step operator intake for residence information, verification contact, and optional property notes.

`preferred_state` is sent with every family lead. Apply both the initial Supabase migration and `supabase/migrations/20260910000000_lead_preferred_state.sql`. Until that field exists in Supabase, the server fallback retains the state in the lead message so enquiries are not lost.

The floating family CTA is available on informational and directory pages, but intentionally excluded from `/concierge`, `/list-your-property`, authentication, and admin routes so it never covers an active form.

## SEO and indexing

Careya uses `https://careya.in` as its production canonical origin by default. App routes emit canonical metadata, `lang="en-IN"`, robots directives, Open Graph metadata, and page-appropriate JSON-LD. The crawlable endpoints are:

- `/sitemap.xml` — generated from the route and content collections
- `/robots.txt` — permits public pages and points crawlers to the sitemap
- `/llms.txt` — concise machine-readable directory guide

After deployment, validate these URLs on the production domain, submit the sitemap in Google Search Console, and use URL Inspection to confirm rendered canonical and structured-data output.

## Design system

Tokens live at the top of `src/app/globals.css`. There is no component library — pages compose semantic class names defined there.

- **Type:** Georgia serif for `h1`/`h2`/`.display`, Avenir Next for body. The serif is the brand's distinguishing mark; keep it.
- **Colour:** calm botanical greens (`--forest`, `--forest-2`, `--forest-3`), warm neutrals (`--ivory`, `--cream`, `--paper`), and muted olive-gold accents (`--gold`, `--gold-dark`). Primary actions remain dark eucalyptus green; all overlays are softened for a reassuring elder-care tone.
- **Radius scale:** `--r-xs` 8px, `--r-sm` 12px, `--r-md` 18px (default card), `--r-lg` 26px (forms, search), `--r-pill` for buttons, badges, and tags.
- **Elevation:** `--shadow-sm` at rest, `--shadow-md` on hover, `--shadow-soft` for sticky and form panels. Prefer a soft shadow over a hard `1px` border; where a border is still needed use `rgba(23,63,53,.07)`.

Cards float on gapped grids rather than sitting in hairline tables. When adding a surface, reach for radius plus shadow before reaching for a border.

## Production services

- **Web:** Next.js 16 deployed to Cloudflare Workers through OpenNext
- **Database/Auth:** Supabase Postgres and Auth
- **Email:** Resend REST API
- **Bot protection:** Cloudflare Turnstile

Apply the migrations in `supabase/migrations/` in filename order to a Supabase project, configure the environment variables above, and promote an authenticated profile by setting its `role` to `admin`.

## Cloudflare Workers deployment

Use a Workers project rather than Cloudflare Pages. The repository pins Node.js 22 and includes the OpenNext and Wrangler configuration.

Configure a Workers Builds project with:

```text
Build command: pnpm build:cloudflare
Deploy command: pnpm exec wrangler deploy
Root directory: /
```

No build-output directory is required for Workers. OpenNext generates `.open-next`, and Wrangler uploads it according to `wrangler.jsonc`.

## Content and sourcing note

Listings are source-labelled editorial records. A visible Google rating or review count is a sourced directory signal, not Careya’s endorsement; review text is not copied from Google. Provider websites open with `rel="nofollow"`. Never mark a property verified until its operator has confirmed the profile, and do not treat a source label as a clinical or availability guarantee.

The same applies to `openRoles` in `src/lib/data.ts`, which powers `/careers`. Those entries are placeholder copy written to match the site's editorial voice, not real openings, and applications currently route to a `mailto:` address rather than into Supabase.

Photography credits and licence terms are recorded in [SEO/IMAGE_SOURCES.md](SEO/IMAGE_SOURCES.md).

## Quality checks

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```
