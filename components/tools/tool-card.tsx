import type { Locale } from "@/lib/i18n/config";
import type { ToolDefinition } from "@/lib/tools/tools-data";
import { getToolPath } from "@/lib/tools/tools-data";
import { ButtonLink } from "@/components/ui/button";

type ToolCardProps = Readonly<{
  tool: ToolDefinition;
  locale: Locale;
}>;

export function ToolCard({ tool, locale }: ToolCardProps) {
  const copy = tool.translations[locale];
  const cta = locale === "es" ? "Abrir herramienta" : "Open tool";

  return (
    <article className="group brand-panel flex h-full flex-col rounded-3xl p-5 transition hover:-translate-y-1 hover:border-[color:var(--brand-border-strong)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.1)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--brand-border-strong)] bg-[linear-gradient(135deg,var(--brand-hero-from),var(--brand-hero-to))] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] transition group-hover:scale-105">
          {tool.icon}
        </div>
        <span className="rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-accent-strong)]">{locale === "es" ? "Herramienta" : "Tool"}</span>
      </div>

      <h2 className="mt-5 text-balance text-xl font-semibold tracking-tight text-slate-950">{copy.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{copy.shortDescription}</p>

      <ButtonLink href={getToolPath(locale, tool.slug)} variant="secondary" className="mt-6 w-full px-4 py-2.5">
        {cta}
      </ButtonLink>
    </article>
  );
}
