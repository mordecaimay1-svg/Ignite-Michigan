# Deploying Ignite Michigan to Vercel

## Prerequisites

- GitHub repository with this codebase
- Supabase project with migration applied
- (Optional) Resend API key, HubSpot token, GA4 measurement ID

## Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial Ignite Michigan platform"
git remote add origin <your-repo-url>
git push -u origin main
```

## Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `.` (project root)

## Step 3: Environment Variables

Add all variables from `.env.example` in Vercel → Project → Settings → Environment Variables:

| Variable | Environment |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Production: `https://your-domain.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All |
| `SUPABASE_SERVICE_ROLE_KEY` | All (encrypted) |
| `RESEND_API_KEY` | All |
| `RESEND_FROM_EMAIL` | All |
| `ADMIN_EMAILS` | All |
| `HUBSPOT_ACCESS_TOKEN` | All (optional) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | All (optional) |

## Step 4: Supabase Auth URLs

In Supabase → Authentication → URL Configuration:

- **Site URL**: `https://your-domain.com`
- **Redirect URLs**:
  - `https://your-domain.com/auth/callback`
  - `http://localhost:3000/auth/callback` (for local dev)

## Step 5: Deploy

Click **Deploy**. Vercel runs `npm run build` automatically.

## Step 6: Custom Domain

1. Vercel → Project → Settings → Domains
2. Add `ignitemichigan.org` (or your domain)
3. Update DNS per Vercel instructions
4. Update `NEXT_PUBLIC_APP_URL` and Supabase auth URLs

## Post-Deploy Checklist

- [ ] Run SQL migration if not already applied
- [ ] Create first admin user and verify `/admin` access
- [ ] Publish a test event and article in Supabase
- [ ] Submit newsletter form on production
- [ ] Test member signup and portal
- [ ] Add `og-default.jpg` to `/public` (1200×630) for social previews
- [ ] Verify sitemap at `/sitemap.xml`

## Edge Middleware

Auth middleware runs on `/portal`, `/admin`, and `/auth` routes. No extra Vercel configuration required.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Auth redirect loop | Check Supabase redirect URLs match production domain |
| Empty events/news | Publish rows in Supabase with `status = 'published'` |
| Admin 403 | Set `ADMIN_EMAILS` or `role = admin` on profile |
| Build env errors | Ensure all `NEXT_PUBLIC_*` vars are set for build |
