const LEGACY_ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";

export function isAdsenseEnabled() {
  return process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" || LEGACY_ADSENSE_ENABLED;
}

export function shouldShowAdPlaceholders() {
  return process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true";
}

export function getAdsenseClient() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

  if (!client || !client.startsWith("ca-pub-")) {
    return null;
  }

  return client;
}

export function getAdsenseSlot(value: string | undefined) {
  const slot = value?.trim();
  return slot && /^\d+$/.test(slot) ? slot : null;
}
