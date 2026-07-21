import type { Locale } from "@/lib/i18n/config";
import { AdsenseAd } from "@/components/ads/adsense-ad";

type AdPlacement =
  | "home_before_tools"
  | "tools_index_after_grid"
  | "tool_result_below"
  | "tool_before_faq";

type AdSlotProps = Readonly<{
  locale: Locale;
  placement: AdPlacement;
  label?: string;
  className?: string;
  variant?: "horizontal" | "inline" | "compact";
}>;

const placementLabels: Record<AdPlacement, { en: string; es: string }> = {
  home_before_tools: {
    en: "Reserved space for a future sponsor message",
    es: "Espacio reservado para un futuro mensaje patrocinado"
  },
  tools_index_after_grid: {
    en: "Reserved space for a future sponsor message",
    es: "Espacio reservado para un futuro mensaje patrocinado"
  },
  tool_result_below: {
    en: "Advertisement below the generated result",
    es: "Publicidad debajo del resultado generado"
  },
  tool_before_faq: {
    en: "Advertisement before the FAQ section",
    es: "Publicidad antes de la sección de preguntas frecuentes"
  }
};

const variantClasses: Record<NonNullable<AdSlotProps["variant"]>, string> = {
  horizontal: "min-h-28 sm:min-h-32",
  inline: "min-h-24",
  compact: "min-h-20"
};

const realAdSlotByPlacement: Partial<Record<AdPlacement, string | undefined>> = {
  tool_result_below: process.env.NEXT_PUBLIC_ADSENSE_TOOL_RESULT_SLOT,
  tool_before_faq: process.env.NEXT_PUBLIC_ADSENSE_CONTENT_FAQ_SLOT
};

function getAdsenseClient() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

  if (!client || !client.startsWith("ca-pub-")) {
    return null;
  }

  return client;
}

export function AdSlot({ locale, placement, label, className = "", variant = "horizontal" }: AdSlotProps) {
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";
  const client = getAdsenseClient();
  const adSlot = realAdSlotByPlacement[placement]?.trim();

  if (adsEnabled) {
    if (!client || !adSlot) {
      return null;
    }

    return (
      <aside
        className={`rounded-3xl border border-slate-200 bg-white p-4 shadow-sm ${variantClasses[variant]} ${className}`}
        aria-label={locale === "es" ? "Publicidad" : "Advertisement"}
        data-ad-placement={placement}
      >
        <p className="mb-3 text-center text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
          {locale === "es" ? "Publicidad" : "Advertisement"}
        </p>
        <AdsenseAd client={client} slot={adSlot} />
      </aside>
    );
  }

  const showPlaceholder = process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true";

  if (!showPlaceholder) {
    return null;
  }

  const visibleLabel = label ?? placementLabels[placement][locale];

  return (
    <aside
      className={`rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-4 text-center ${variantClasses[variant]} ${className}`}
      aria-label={locale === "es" ? "Espacio publicitario reservado" : "Reserved advertising space"}
      data-ad-placement={placement}
    >
      <div className="flex h-full min-h-[inherit] flex-col items-center justify-center gap-2">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
          {locale === "es" ? "Publicidad" : "Advertisement"}
        </p>
        <p className="max-w-xl text-xs leading-5 text-slate-500">{visibleLabel}</p>
        <p className="text-[0.7rem] leading-5 text-slate-400">
          {locale === "es"
            ? "Placeholder no intrusivo. No bloquea el uso de la herramienta."
            : "Non-intrusive placeholder. It does not block tool usage."}
        </p>
      </div>
    </aside>
  );
}
