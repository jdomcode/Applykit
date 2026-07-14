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
  source: "supabase" | "local-fallback";
  error?: string;
}>) {
  const dictionary = getDictionary(locale);
  const highlightedTools = tools.slice(0, 4);

  return (
    <Container className="py-12 sm:py-18 md:py-20">
      <section className="max-w-3xl rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm sm:p-8">
        <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">ApplyKit</p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{dictionary.tools.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{dictionary.tools.description}</p>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {locale === "es"
            ? "Cada herramienta está diseñada para una tarea laboral concreta: escribir una carta, enviar un CV, contactar un reclutador, dar seguimiento o preparar una bio profesional sin usar una experiencia tipo chatbot."
            : "Each tool is designed for a concrete job-search task: writing a letter, sending a resume, contacting a recruiter, following up, or preparing a professional bio without using a chatbot-style experience."}
        </p>
      </section>

      <section className="mt-8">
        <DataSourceNotice locale={locale} source={source} error={error} />
        <ToolGrid tools={tools} locale={locale} />
      </section>

      <AdSlot locale={locale} placement="tools_index_after_grid" className="mt-12" />

      {highlightedTools.length > 0 ? (
        <section className="mt-14 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            {locale === "es" ? "Herramientas populares" : "Popular tools"}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            {locale === "es"
              ? "Estas páginas públicas tienen título, descripción, contenido introductorio, preguntas frecuentes y enlaces internos para mejorar su utilidad e indexación."
              : "These public pages include a title, description, intro content, FAQs, and internal links to improve usefulness and indexability."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {highlightedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={getToolPath(locale, tool.slug)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 hover:text-slate-950"
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
