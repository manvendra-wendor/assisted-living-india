# Assisted Living India

A premium, search-led directory for families comparing assisted living, independent living, luxury senior communities, dementia care, rehabilitation, and post-operative care across India.

## Local development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

The application runs without external credentials using its editorial preview dataset. Configure Supabase to enable persistent leads, reviews, listing submissions, authentication, and admin workflows.

## Production services

- **Web:** Next.js 16 deployed to Cloudflare Workers through OpenNext
- **Database/Auth:** Supabase Postgres and Auth
- **Email:** Resend REST API
- **Bot protection:** Cloudflare Turnstile

Apply `supabase/migrations/20260808000000_initial.sql` to a Supabase project, configure the environment variables in `.env.example`, and promote an authenticated profile by setting its `role` to `admin`.

## Cloudflare Workers deployment

Use a Workers project rather than Cloudflare Pages. The repository pins Node.js 22 and includes the OpenNext and Wrangler configuration.

Configure a Workers Builds project with:

```text
Build command: pnpm build:cloudflare
Deploy command: pnpm exec wrangler deploy
Root directory: /
```

No build-output directory is required for Workers. OpenNext generates `.open-next`, and Wrangler uploads it according to `wrangler.jsonc`.

Add the production values from `.env.example` as Worker variables or encrypted secrets before enabling live forms and authentication.

## Content note

The bundled listings are clearly structured editorial preview records used to exercise search, comparison, and property profiles. They must be replaced with researched, source-cited operator records before a public launch. Never mark a property verified until its operator has confirmed the profile.

## Quality checks

```bash
pnpm lint
pnpm test
pnpm build
```
