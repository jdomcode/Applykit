"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdsenseAdProps = Readonly<{
  client: string;
  slot: string;
  className?: string;
}>;

export function AdsenseAd({ client, slot, className = "" }: AdsenseAdProps) {
  const pushedRef = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (pushedRef.current || failed) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      setFailed(true);
    }
  }, [failed]);

  return (
    <ins
      className={`adsbygoogle block min-h-[120px] w-full ${className}`}
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
