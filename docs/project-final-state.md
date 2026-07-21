# ApplyKit final static state

Status: production-ready static release candidate after Phase 8 QA.

## Product

- Bilingual English/Spanish job-search toolkit.
- Eight public tools.
- Local template-based generation in the browser.
- Editable results.
- Copy and clear/reset actions.
- No accounts, login, sessions, dashboard, profiles, admin, saved documents, or document backend APIs.

## Hosting

- Next.js static export with `output: "export"`.
- Cloudflare Pages build output: `out/`.
- Canonical production domain: `https://applykit.online`.

## SEO and trust

- Public canonical routes in English and Spanish.
- Canonical metadata and hreflang alternates.
- Sitemap and robots metadata routes.
- About, contact, privacy, and terms pages in both languages.

## Monetization readiness

- `ads.txt` preserved with the confirmed Google publisher ID.
- AdSense integration is prepared but visible ads remain disabled by default.
- Legal pages do not contain ad placements.
- Before enabling personalized ads for EEA/UK/Switzerland traffic, configure a Google-certified CMP that supports IAB TCF.

## Phase 8 closeout

Final cleanup includes:

- ApplyKit favicon aligned with the blue brand identity.
- Spanish contact wording corrected.
- Root language page skip-link target fixed.
- Result errors exposed with `role="alert"` and result status with a polite live region.
- Package lock sanitized so it does not reference internal package registries.
