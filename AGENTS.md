<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project conventions

## Environment

Node 22.13+ is required — pnpm 11.16 imports `node:sqlite` and crashes on older runtimes before any project script runs. On macOS external drives, `predev`/`prebuild` run `scripts/clean-appledouble.mjs` to strip `._*` files that Turbopack would otherwise parse as modules.

## Architecture

- App Router only, under `src/app`. Server components by default; add `"use client"` only where interactivity requires it.
- Content lives as typed collections in `src/lib/data.ts` (`properties`, `careTypes`, `locationPages`, `articles`, `openRoles`), with interfaces in `src/lib/types.ts`. Add content as data, not as markup inside a page.
- Shared UI is in `src/components`. `ui.tsx` exports `SectionHeading`, `Breadcrumbs`, and `JsonLd`; `content-page.tsx` renders simple prose pages.
- Every new route must be added to the `staticPages` list in `src/app/sitemap.ts`.
- End content templates with `<CityLinks currentSlug={…} />` (after the FAQ block where there is one). It is the site's main internal-linking surface; `currentSlug` prevents self-links.

## Styling

All styling is semantic class names in `src/app/globals.css` — no CSS modules, no Tailwind utilities in markup despite the Tailwind import.

- Use the radius scale (`--r-xs`/`--r-sm`/`--r-md`/`--r-lg`/`--r-pill`) and elevation tokens (`--shadow-sm`/`--shadow-md`/`--shadow-soft`) rather than literal values.
- Prefer radius plus a soft shadow over a hard `1px` border. Where a border is genuinely needed, use `rgba(23,63,53,.07)`.
- Do not build hairline-table grids (`gap: 1px` over a background colour). Cards float on gapped grids.
- Georgia serif headings are the brand's distinguishing mark. Keep them.
- Add responsive rules to the existing `1050px` / `760px` / `500px` breakpoint blocks rather than introducing new ones.

## Editorial integrity

Listings, reviews, and job postings in `src/lib/data.ts` are editorial preview records, not verified facts. Never mark a property `verified` without operator confirmation, and keep sourcing and verification status visible wherever a claim is displayed.

## Before finishing

```bash
pnpm typecheck && pnpm lint && pnpm test
```
