# ApplyKit

ApplyKit is a bilingual English/Spanish MVP for creating job application documents and professional messages with simple forms and internal templates.

## Current status

Production readiness and visual polish phases are complete after the 10 MVP phases.

The app includes:

- Public routes in English and Spanish.
- Tool listing pages.
- Dynamic tool detail pages from Supabase.
- Template-based generation through `/api/generate`.
- Supabase Auth login, registration, logout, password recovery, and password update.
- Private dashboard and profile page.
- Saved documents, document details, delete action, and favorites.
- SEO improvements for public pages:
  - Metadata by locale.
  - Canonical URLs.
  - English/Spanish alternate links.
  - Open Graph and Twitter metadata.
  - Tool intro content.
  - Tool FAQ sections.
  - FAQ and WebApplication JSON-LD.
  - Internal links between related tools.
  - `sitemap.xml`.
  - `robots.txt`.
- Internal usage events:
  - Tool views.
  - Document generation.
  - Copy actions.
  - Save actions.
- Basic admin analytics panel at `/:locale/admin/analytics`.
- Conservative Google AdSense integration for production monetization.
- Public `ads.txt` file for AdSense verification.
- Production-readiness additions:
  - Privacy page.
  - Terms page.
  - Localized Spanish legal routes.
  - Global 404 page.
  - Loading skeleton.
  - Web app manifest.
  - App icon.
  - Vercel deployment checklist.
  - Manual QA checklist.
  - `typecheck` and `check` scripts.
- Visual polish and responsive refinements:
  - Mobile-friendly header menu.
  - Improved home hero and workflow preview.
  - Refined tool cards, forms, and generated result panel.
  - Improved dashboard and document pages.
  - Better focus, disabled, and reduced-motion states.

## Install

From the project folder:

```bash
npm.cmd install
npm.cmd run dev
```

If PowerShell blocks `npm`, continue using `npm.cmd`.

If npm tries to use a wrong registry, this project includes `.npmrc` with:

```txt
registry=https://registry.npmjs.org/
```

You can also run:

```bash
npm.cmd config set registry https://registry.npmjs.org/
```

## Environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-or-publishable-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=false
NEXT_PUBLIC_ENABLE_ADS=false
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-2860965210851539
NEXT_PUBLIC_ADSENSE_TOOL_RESULT_SLOT=5544517438
NEXT_PUBLIC_ADSENSE_CONTENT_FAQ_SLOT=2100096449
```

For production, set `NEXT_PUBLIC_SITE_URL` to the final domain, for example:

```env
NEXT_PUBLIC_SITE_URL=https://applykit.online
NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=false
NEXT_PUBLIC_ENABLE_ADS=true
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-2860965210851539
NEXT_PUBLIC_ADSENSE_TOOL_RESULT_SLOT=5544517438
NEXT_PUBLIC_ADSENSE_CONTENT_FAQ_SLOT=2100096449
```

Do not expose the Supabase service role key in the frontend.

## Local URLs

```txt
http://localhost:3000/en
http://localhost:3000/es
http://localhost:3000/en/tools
http://localhost:3000/es/herramientas
http://localhost:3000/en/tools/cover-letter-generator
http://localhost:3000/es/herramientas/cover-letter-generator
http://localhost:3000/en/documents
http://localhost:3000/es/documentos
http://localhost:3000/en/admin/analytics
http://localhost:3000/es/admin/analytics
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
npm.cmd run typecheck
npm.cmd run build
npm.cmd run check
```

`check` runs TypeScript validation and production build.

## Supabase

Required migrations:

```txt
supabase/migrations/20260710000100_create_applykit_schema.sql
supabase/migrations/20260712000200_create_auth_profile_trigger.sql
```

Seed file:

```txt
supabase/seed.sql
```

The seed includes tools, translations, intro content, FAQ data, and template versions.

Expected seed counts:

```sql
select 'tools' as table_name, count(*) as total from public.tools
union all
select 'tool_translations' as table_name, count(*) as total from public.tool_translations
union all
select 'template_versions' as table_name, count(*) as total from public.template_versions;
```

Expected result:

```txt
tools                 8
tool_translations     16
template_versions     16
```

## Admin access for analytics

The analytics page is only available to users with:

```txt
profiles.role = 'admin'
```

For local testing, after creating a user, you can promote it from Supabase SQL Editor:

```sql
update public.profiles
set role = 'admin'
where id = (
  select id
  from auth.users
  where email = 'your-email@example.com'
  limit 1
);
```

Then sign out and sign in again.

## Deployment and QA docs

Use these files before deployment:

```txt
docs/vercel-deployment.md
docs/qa-checklist.md
docs/visual-polish-notes.md
```

## Visual polish validation

Review these routes after Phase 12:

```txt
http://localhost:3000/es
http://localhost:3000/en
http://localhost:3000/es/herramientas
http://localhost:3000/en/tools
http://localhost:3000/es/herramientas/cover-letter-generator
http://localhost:3000/en/tools/cover-letter-generator
http://localhost:3000/es/login
http://localhost:3000/es/register
http://localhost:3000/es/dashboard
http://localhost:3000/es/documentos
```

Check mobile widths, tablet widths, desktop widths, keyboard focus, form overflow, generated-result readability, and document actions.

## Production readiness validation

Run:

```bash
npm.cmd run check
```

Expected result: TypeScript validation passes and the production build completes successfully.

Functional checks:

- Public English and Spanish pages load.
- Tool pages generate documents.
- Logged-in users can save, view, favorite, and delete documents.
- Anonymous users cannot save documents.
- Legal pages load in English and Spanish.
- `sitemap.xml`, `robots.txt`, and `manifest.webmanifest` load.
- Admin analytics remains restricted to admin users.
- AdSense is enabled only when `NEXT_PUBLIC_ENABLE_ADS=true`.
- AdSense slots are limited to tool pages and are not placed near Generate, Copy, or Save buttons.
- `ads.txt` loads from `/ads.txt`.

## Notes before public launch

Confirm the contact email works before publishing publicly. Keep AdSense disabled until the domain is approved or ready for review in AdSense.

Keep payment, AI, PDF/DOCX export, and real ad network scripts outside the MVP until they are intentionally scoped and reviewed.


## Day 2 production content pass

This version adds final basic trust pages for the beta launch:

- `/en/about` and `/es/sobre-nosotros`
- `/en/contact` and `/es/contacto`
- Footer links for About, Contact, Privacy, and Terms
- Privacy Policy updated for cookies, advertising partners, Google AdSense-style disclosures, and service providers
- Terms updated with advertising, user responsibility, no professional advice, and contact sections
- Sitemap and robots updated for the new public pages

Contact email used in public pages: `contact@applykit.online`. Configure email forwarding or a mailbox before public promotion.


## Day 5 final closeout

ApplyKit is closed as a beta-stable release. The Day 5 update includes final documentation and a generation-quality fix for the Professional Bio and Recruiter Message templates.

New documentation:

- `docs/project-final-state.md`
- `docs/day-5-final-closeout.md`

New Supabase migration:

- `supabase/migrations/20260714000100_polish_generation_templates.sql`

Run that migration in Supabase SQL Editor after deploying this version so production templates match the corrected generator behavior.
