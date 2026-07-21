# Phase 6 — AdSense static migration

ApplyKit keeps AdSense prepared but visible ads remain disabled during the static migration.

## Source of truth

Use this variable as the canonical switch:

```env
NEXT_PUBLIC_ADSENSE_ENABLED=false
```

`NEXT_PUBLIC_ENABLE_ADS` may remain only as a legacy compatibility variable while migrating older deployments. Keep it `false` unless intentionally testing ad rendering.

## ads.txt

The confirmed `public/ads.txt` line is preserved:

```txt
google.com, pub-2860965210851539, DIRECT, f08c47fec0942fa0
```

After build it must also exist at:

```txt
out/ads.txt
```

In production it must load from:

```txt
https://applykit.online/ads.txt
```

## Visible ads

Visible ads are disabled during migration. Do not enable them until production on Cloudflare has passed QA.

When ads are re-enabled later:

- Use a maximum of 2 or 3 ads per tool page.
- Do not place ads inside forms.
- Do not place ads inside the generated result textarea.
- Do not place ads next to Generate, Clear, Copy, or language controls.
- Do not show ads on legal pages.
- Reserve enough space to avoid CLS.
- Do not add a strict CSP that blocks AdSense.

## Validation

Run:

```bash
npm run build
npm run validate:adsense
```

This confirms:

- `public/ads.txt` exists.
- `out/ads.txt` exists.
- The confirmed publisher line is unchanged.
- Legal pages do not include AdSense markup.
- Disabled placeholders are not visible in static HTML.
