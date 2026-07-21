import Script from "next/script";
import { getAdsenseClient, isAdsenseEnabled } from "@/lib/site/adsense";

export function AdsenseScript() {
  const adsEnabled = isAdsenseEnabled();
  const client = getAdsenseClient();

  if (!adsEnabled || !client) {
    return null;
  }

  return (
    <Script
      id="applykit-google-adsense"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
