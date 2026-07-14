# ApplyKit Vercel deployment checklist

This checklist prepares ApplyKit for a first production deployment after the MVP phases.

## 1. Supabase project

Confirm the production Supabase project has these migrations applied:

```txt
supabase/migrations/20260710000100_create_applykit_schema.sql
supabase/migrations/20260712000200_create_auth_profile_trigger.sql
```

Then confirm the seed has been applied:

```txt
supabase/seed.sql
```

Expected counts:

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

## 2. Supabase Auth URLs

In Supabase, open `Authentication > URL Configuration`.

For local development:

```txt
Site URL: http://localhost:3000
Redirect URLs:
http://localhost:3000/auth/callback
http://localhost:3000/en/dashboard
http://localhost:3000/es/dashboard
http://localhost:3000/en/update-password
http://localhost:3000/es/update-password
```

For production, add the production domain equivalents:

```txt
https://your-domain.com/auth/callback
https://your-domain.com/en/dashboard
https://your-domain.com/es/dashboard
https://your-domain.com/en/update-password
https://your-domain.com/es/update-password
```

## 3. Vercel environment variables

Set these variables in Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-or-publishable-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=false
```

Do not add the Supabase service role key to frontend variables.

## 4. Build command

Use Vercel defaults for Next.js:

```txt
Install command: npm install
Build command: npm run build
Output: .next
```

Before deployment, run locally:

```bash
npm.cmd run check
```

## 5. Post-deployment validation

After deployment, test:

```txt
/en
/es
/en/tools
/es/herramientas
/en/tools/cover-letter-generator
/es/herramientas/cover-letter-generator
/en/login
/es/login
/en/register
/es/register
/en/documents
/es/documentos
/sitemap.xml
/robots.txt
```

Confirm the production `sitemap.xml` uses the production domain from `NEXT_PUBLIC_SITE_URL`.

## 6. Before public launch

Replace placeholder legal contact text in the privacy and terms pages.

Keep ad placeholders disabled until an ad network is approved and configured.
