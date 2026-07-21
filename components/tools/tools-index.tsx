import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { ToolDefinition } from "@/lib/tools/tools-data";
import { getToolPath } from "@/lib/tools/tools-data";
import { ToolGrid } from "@/components/tools/tool-grid";
import { DataSourceNotice } from "@/components/tools/data-source-notice";
import { AdSlot } from "@/components/ads/ad-slot";

export function ToolsIndex({
  locale,
  tools,
  source,
  error
}: Readonly<{
  locale: Locale;
  tools: ToolDefinition[];
  source: "local-code";
  error?: string;
}>) {
  const dictionary = getDictionary(locale);
  const highlightedTools = tools.slice(0, 4);

  return (
    <Container className="py-12 sm:py-18 md:py-20">
      <section className="brand-card max-w-4xl rounded-[2rem] p-6 sm:p-8">
        <p className="section-kicker">ApplyKit</p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{dictionary.tools.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{dictionary.tools.description}</p>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {locale === "es"
            ? "Cada herramienta está pensada para un paso real del proceso de aplicación laboral: escribir una carta, enviar un CV, contactar un reclutador o presentar tu perfil profesional con claridad."
            : "Each tool is designed for a real step in the job-application process: writing a letter, sending a resume, contacting a recruiter, or presenting your professional profile clearly."}
        </p>
      </section>

      <section className="mt-8">
        <DataSourceNotice locale={locale} source={source} error={error} />
        <ToolGrid tools={tools} locale={locale} />
      </section>

      <AdSlot locale={locale} placement="tools_index_after_grid" className="mt-12" />

      {highlightedTools.length > 0 ? (
        <section className="brand-panel mt-14 rounded-[2rem] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            {locale === "es" ? "Herramientas populares" : "Popular tools"}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            {locale === "es"
              ? "Estas herramientas combinan formularios simples, textos editables y orientación práctica para preparar documentos laborales con menos fricción."
              : "These tools combine simple forms, editable text, and practical guidance to prepare job-search documents with less friction."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {highlightedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={getToolPath(locale, tool.slug)}
                className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-[color:var(--brand-border-strong)] hover:bg-[color:var(--brand-soft)] hover:text-slate-950"
              >
                {tool.translations[locale].title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
