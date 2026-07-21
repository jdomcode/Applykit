import Script from "next/script";

function getAdsenseClient() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

  if (!client || !client.startsWith("ca-pub-")) {
    return null;
  }

  return client;
}

export function AdsenseScript() {
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";
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
