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

- **Web:** Next.js 16 deployed to Vercel
- **Database/Auth:** Supabase Postgres and Auth
- **Email:** Resend REST API
- **Bot protection:** Cloudflare Turnstile

Apply `supabase/migrations/20260808000000_initial.sql` to a Supabase project, configure the environment variables in `.env.example`, and promote an authenticated profile by setting its `role` to `admin`.

## Content note

The bundled listings are clearly structured editorial preview records used to exercise search, comparison, and property profiles. They must be replaced with researched, source-cited operator records before a public launch. Never mark a property verified until its operator has confirmed the profile.

## Quality checks

```bash
pnpm lint
pnpm test
pnpm build
```
