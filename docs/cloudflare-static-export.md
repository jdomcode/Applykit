# ApplyKit static export

ApplyKit is now configured for a static HTML export compatible with Cloudflare Pages.

## Build

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://applykit.online npm run build
```

The build creates:

```txt
out/
```

## Cloudflare Pages settings

```txt
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Node version verified locally: v22.16.0
```

## Required static files

The build output includes:

```txt
out/robots.txt
out/sitemap.xml
out/ads.txt
out/manifest.webmanifest
out/icon.svg
```

## Notes

- Supabase and authentication were removed in Phase 3.
- Generation is local in the browser.
- `output: "export"` is enabled in `next.config.ts`.
- Tool routes are pre-rendered for English and Spanish.
- Root `/` is a static language selection page to avoid runtime redirects.
- Visible AdSense ads remain controlled by environment configuration.
