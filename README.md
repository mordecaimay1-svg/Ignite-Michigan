# Ignite Michigan

Production-ready political movement website platform — Christian civic engagement, exponential growth model, and statewide chapter organization.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** + **shadcn/ui**
- **Framer Motion** animations
- **Supabase** (auth, database, RLS)
- **Zod** validation · **Resend** email · **HubSpot**-ready CRM
- Deploy to **Vercel**

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

### 3. Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL migration: `supabase/migrations/001_initial_schema.sql` in the SQL Editor
3. Enable Email auth under Authentication → Providers
4. Add your site URL to Authentication → URL Configuration:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`
5. Copy **Project URL** and **anon key** to `.env.local`
6. Copy **service role key** for admin export (server-only)

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Admin access

Set `ADMIN_EMAILS` in `.env.local` (comma-separated). After signing up with that email, visit `/admin`.

Or set `role = 'admin'` on a `member_profiles` row in Supabase.

## Project Structure

```
src/
├── app/                    # Routes (pages, API, actions)
│   ├── actions/            # Server actions (forms, auth)
│   ├── admin/              # Protected admin dashboard
│   ├── portal/             # Member portal
│   ├── api/                # REST endpoints
│   └── ...
├── components/
│   ├── layout/             # Navbar, Footer, SiteLayout
│   ├── sections/           # Homepage sections
│   ├── forms/              # Newsletter, volunteer, RSVP, auth
│   ├── cards/              # Event & article cards
│   ├── portal/             # Portal sidebar
│   └── admin/              # Admin widgets
├── lib/
│   ├── supabase/           # Client, server, middleware
│   ├── validations/        # Zod schemas
│   ├── data/               # Data fetching helpers
│   └── ...
└── types/
    └── database.ts         # Supabase TypeScript types

supabase/migrations/        # SQL schema + RLS
```

## Features

| Area | Features |
|------|----------|
| **Public site** | Landing, About, Movement Model, Events, News, Get Involved |
| **Homepage** | Animated hero, stats, Michigan map, testimonials, CTAs |
| **Auth** | Email/password signup, referral codes, protected routes |
| **Portal** | Dashboard, profile, referral tree, event registrations |
| **Admin** | Members, events, articles, analytics, CSV export |
| **Forms** | Newsletter, volunteer, event RSVP with rate limiting |
| **SEO** | Metadata, Open Graph, sitemap, robots.txt |
| **Integrations** | Resend email, HubSpot CRM (optional tokens) |

## Database Tables

- `member_profiles` · `referrals` · `events` · `event_registrations`
- `blog_posts` · `categories` · `volunteer_applications`
- `chapters` · `counties` · `newsletters` · `prayer_requests`

See `supabase/migrations/001_initial_schema.sql` for full schema, indexes, and RLS policies.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel deployment steps.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

## Content Management

Until custom admin forms are added, manage CMS content via **Supabase Table Editor**:

- **Events**: set `status = 'published'` and future `starts_at`
- **Articles**: set `status = 'published'`, `published_at`, optional `is_featured`
- **Members**: view/export via `/admin/users`

## License

Private — Ignite Michigan. All rights reserved.
