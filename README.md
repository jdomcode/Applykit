# ApplyKit

ApplyKit is a bilingual English/Spanish static web app for creating job application documents and professional messages with simple forms and local templates.

## Current static direction

This version removes account features and prepares ApplyKit for a fully public, anonymous, static deployment.

Included:

- Public routes in English and Spanish.
- Eight job-search document tools.
- Local template-based generation in the browser.
- Editable results.
- Copy result.
- Clear/reset form.
- SEO metadata, sitemap, robots, manifest, and legal pages.
- Conservative AdSense preparation with visible ads disabled by default during migration.

Removed in the static direction:

- Account backend.
- Login, registration, password recovery, and sessions.
- Dashboard.
- Saved documents.
- Favorites.
- Profiles.
- Admin analytics.
- Backend document APIs.

## Tools

1. Cover Letter Generator.
2. Job Application Email Generator.
3. Follow-Up Email Generator.
4. Recruiter Message Generator.
5. Resignation Letter Generator.
6. Salary Negotiation Email Generator.
7. LinkedIn Bio Generator.
8. Professional Bio Generator.

## Install

```bash
npm.cmd install
npm.cmd run dev
```

If PowerShell blocks `npm`, continue using `npm.cmd`.

## Environment variables

Create `.env.local` only if needed:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=false
NEXT_PUBLIC_ADSENSE_ENABLED=false
NEXT_PUBLIC_ENABLE_ADS=false
```

For production:

```env
NEXT_PUBLIC_SITE_URL=https://applykit.online
NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=false
NEXT_PUBLIC_ADSENSE_ENABLED=false
NEXT_PUBLIC_ENABLE_ADS=false
```

## Local URLs

```txt
http://localhost:3000/en
http://localhost:3000/es
http://localhost:3000/en/tools
http://localhost:3000/es/herramientas
http://localhost:3000/en/tools/cover-letter-generator
http://localhost:3000/es/herramientas/cover-letter-generator
http://localhost:3000/en/about
http://localhost:3000/es/sobre-nosotros
http://localhost:3000/en/contact
http://localhost:3000/es/contacto
http://localhost:3000/en/privacy
http://localhost:3000/es/privacidad
http://localhost:3000/en/terms
http://localhost:3000/es/terminos
http://localhost:3000/sitemap.xml
http://localhost:3000/robots.txt
http://localhost:3000/ads.txt
http://localhost:3000/manifest.webmanifest
```

## Scripts

```bash
npm.cmd run dev
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run check
```

`lint` currently runs TypeScript validation. `test` runs the template regression matrix.

## Static production status

ApplyKit is now configured as a fully static, anonymous application for Cloudflare Pages. The account/backend migration, local templates, static export, SEO/trust work, AdSense preparation, visual identity, accessibility, security headers, and final Phase 8 QA are complete.

## Static export for Cloudflare Pages

ApplyKit is configured for static export with `output: "export"`.

Cloudflare Pages settings:

```txt
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Node version verified locally: v22.16.0
```

After build, verify these files exist:

```txt
out/robots.txt
out/sitemap.xml
out/ads.txt
out/manifest.webmanifest
out/icon.svg
```

## AdSense during static migration

Visible ads remain disabled by default until production monetization is intentionally enabled. The canonical switch is:

```env
NEXT_PUBLIC_ADSENSE_ENABLED=false
```

`public/ads.txt` is preserved with the confirmed publisher line and is copied to `out/ads.txt` during build. Validate it with:

```bash
npm.cmd run validate:adsense
```

Do not enable visible ads or add new ad placements until the static production deployment is approved.
