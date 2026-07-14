import type { Locale } from "@/lib/i18n/config";
import type { ToolDefinition } from "@/lib/tools/tools-data";
import { ToolGrid } from "@/components/tools/tool-grid";

export function RelatedTools({
  locale,
  tools
}: Readonly<{
  locale: Locale;
  tools: ToolDefinition[];
}>) {
  if (tools.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ApplyKit</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
          {locale === "es" ? "Herramientas relacionadas" : "Related tools"}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {locale === "es"
            ? "Continúa preparando otros mensajes y documentos para tu proceso laboral."
            : "Continue preparing other messages and documents for your job application process."}
        </p>
      </div>
      <ToolGrid tools={tools} locale={locale} />
    </section>
  );
}
