# ApplyKit Phase 7 — visual identity, UX rationale, performance, accessibility, and security

## Audience-informed design direction

ApplyKit targets global job seekers who want a tool that feels:

- professional,
- trustworthy,
- efficient,
- low-friction,
- bilingual,
- and calm under pressure.

For that audience, a clean productivity-style interface is more effective than a playful or overly experimental design. The visual direction chosen in this phase prioritizes:

- high readability,
- clear calls to action,
- strong contrast,
- minimal cognitive load,
- and confidence-building visual cues.

## Brand palette

- Background: `#F6F9FC`
- Foreground: `#0F172A`
- Primary: `#2563EB`
- Primary strong: `#1D4ED8`
- Secondary accent: `#0EA5E9`
- Accent soft: `#DBEAFE`
- Border: `#D8E3F2`
- Surface soft: `#EEF6FF`
- Success: `#10B981`

## Visual identity changes

- New ApplyKit brand mark.
- New visual hero system.
- New illustration assets in `public/illustrations/`.
- Updated gradients, cards, buttons, forms, and surfaces.
- Stronger section hierarchy and clearer navigation.
- Better visual consistency across home, tools, about, contact, privacy, and terms.

## Accessibility and quality changes

- Added skip link.
- Preserved strong focus states.
- Kept high-contrast text.
- Reduced visual clutter.
- Added Cloudflare `_headers` file for security headers.

## Static validation

Run after build:

```bash
npm run validate:phase7
```

This checks:

- `public/_headers` exists,
- SVG brand illustrations exist,
- `_headers` is exported to `out/`,
- key security headers are present,
- skip link exists in exported HTML,
- and blocked Supabase-related tokens are absent from exported HTML.
