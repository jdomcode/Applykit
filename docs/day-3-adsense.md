# Day 3 — Google AdSense integration

ApplyKit now has a conservative AdSense integration for production.

## Publisher and slots

- Publisher client: `ca-pub-2860965210851539`
- Tool result slot: `5544517438`
- Content / FAQ slot: `2100096449`

## Environment variables

Set these in Vercel:

```env
NEXT_PUBLIC_ENABLE_ADS=true
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-2860965210851539
NEXT_PUBLIC_ADSENSE_TOOL_RESULT_SLOT=5544517438
NEXT_PUBLIC_ADSENSE_CONTENT_FAQ_SLOT=2100096449
NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=false
```

Keep ads disabled locally unless intentionally testing ad rendering:

```env
NEXT_PUBLIC_ENABLE_ADS=false
```

## Placements

Ads are only placed in conservative locations:

1. Below the generated result panel.
2. Before the FAQ section on tool detail pages.

Ads are not placed inside forms, next to Generate, next to Copy, next to Save, or in modal/popup experiences.

## ads.txt

The file `public/ads.txt` publishes:

```txt
google.com, pub-2860965210851539, DIRECT, f08c47fec0942fa0
```

After deployment it must be available at:

```txt
https://applykit.online/ads.txt
```

## Validation

After deploy, check:

```txt
https://applykit.online/ads.txt
https://applykit.online/es/herramientas/cover-letter-generator
https://applykit.online/en/tools/cover-letter-generator
```

Ads may remain blank while AdSense reviews the domain, the ad units, or traffic quality. A blank ad area is not automatically a code error.
