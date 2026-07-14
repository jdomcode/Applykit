import type { Locale } from "@/lib/i18n/config";

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
    en: "Reserved space below the generated result",
    es: "Espacio reservado debajo del resultado generado"
  },
  tool_before_faq: {
    en: "Reserved space before the FAQ section",
    es: "Espacio reservado antes de la sección de preguntas frecuentes"
  }
};

const variantClasses: Record<NonNullable<AdSlotProps["variant"]>, string> = {
  horizontal: "min-h-28 sm:min-h-32",
  inline: "min-h-24",
  compact: "min-h-20"
};

export function AdSlot({ locale, placement, label, className = "", variant = "horizontal" }: AdSlotProps) {
  const showPlaceholder = process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS !== "false";

  if (!showPlaceholder) {
    return null;
  }

  const visibleLabel = label ?? placementLabels[placement][locale];

  return (
    <aside
      className={`rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-4 text-center ${variantClasses[variant]} ${className}`}
      aria-label={locale === "es" ? "Espacio publicitario reservado" : "Reserved advertising space"}
      data-ad-slot={placement}
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
