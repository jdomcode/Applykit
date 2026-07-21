# ApplyKit Phase 8 final QA checklist

Run before each production release:

```bash
npm ci
npm run lint
npm run typecheck
npm test
NEXT_PUBLIC_SITE_URL=https://applykit.online npm run build
npm run validate:seo
npm run validate:adsense
npm run validate:phase7
```

## Public routes

- `/`
- `/en`
- `/es`
- `/en/tools`
- `/es/herramientas`
- Eight English tool pages.
- Eight Spanish tool pages.
- `/en/about`
- `/es/sobre-nosotros`
- `/en/contact`
- `/es/contacto`
- `/en/privacy`
- `/es/privacidad`
- `/en/terms`
- `/es/terminos`
- `/sitemap.xml`
- `/robots.txt`
- `/ads.txt`
- `/manifest.webmanifest`

## Tool regression

- Generate in English.
- Generate in Spanish.
- Required field validation.
- Optional fields empty.
- Edit result.
- Copy result.
- Clear form.
- No unresolved placeholders.
- No literal `\\n` output.
- No `undefined`, `null`, or `[object Object]`.
- No account, dashboard, save, admin, login, or registration UI.

## Visual / responsive

- Desktop layout.
- 375 px mobile layout.
- Header and mobile menu.
- Tool grid.
- Tool form and result panel.
- About/contact/legal pages.
- No horizontal overflow.
- Brand favicon and visual identity consistent.

## Network / privacy

- No Supabase calls.
- No document POST requests.
- No session requests.
- No private API calls.
- Visible AdSense disabled unless production monetization is intentionally enabled.
