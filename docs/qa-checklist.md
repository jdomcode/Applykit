# ApplyKit static QA checklist

Run before approving the static version:

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

Public route checks:

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
- `/ads.txt`, if present.

Tool checks:

- Generate in English.
- Generate in Spanish.
- Required field validation.
- Optional fields empty.
- Edit result.
- Copy result.
- Clear form.
- No placeholders.
- No literal `\\n` output.
- No `undefined`, `null`, or `[object Object]`.
- No account, dashboard, save, admin, login, or registration UI.

Network checks:

- No document POST requests.
- No session requests.
- No account backend requests.
- No private API calls.
