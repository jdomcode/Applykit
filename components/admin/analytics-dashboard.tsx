import type { Locale } from "@/lib/i18n/config";
import type { AdminAnalyticsStats } from "@/lib/analytics/admin-stats";

function formatEventType(eventType: string, locale: Locale) {
  const labels: Record<string, Record<Locale, string>> = {
    tool_viewed: { en: "Tool views", es: "Vistas de herramienta" },
    document_generated: { en: "Documents generated", es: "Documentos generados" },
    document_copied: { en: "Documents copied", es: "Documentos copiados" },
    document_saved: { en: "Documents saved", es: "Documentos guardados" }
  };

  return labels[eventType]?.[locale] ?? eventType;
}

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-DO" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function AnalyticsDashboard({ stats, locale }: Readonly<{ stats: AdminAnalyticsStats; locale: Locale }>) {
  const copy = {
    en: {
      title: "Internal analytics",
      eyebrow: "Admin",
      description: "Basic usage metrics from the last 30 days. These events do not store generated document content.",
      total: "Total events",
      byType: "Events by type",
      topTools: "Top tools",
      recent: "Recent events",
      empty: "No usage events have been recorded yet.",
      event: "Event",
      tool: "Tool",
      language: "Language",
      date: "Date"
    },
    es: {
      title: "Analítica interna",
      eyebrow: "Admin",
      description: "Métricas básicas de uso de los últimos 30 días. Estos eventos no guardan el contenido generado de documentos.",
      total: "Eventos totales",
      byType: "Eventos por tipo",
      topTools: "Herramientas más usadas",
      recent: "Eventos recientes",
      empty: "Todavía no hay eventos de uso registrados.",
      event: "Evento",
      tool: "Herramienta",
      language: "Idioma",
      date: "Fecha"
    }
  }[locale];

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{copy.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{copy.description}</p>
        {stats.error ? (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{stats.error}</div>
        ) : null}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-medium text-slate-500">{copy.total}</p>
          <p className="mt-3 text-4xl font-semibold text-slate-950">{stats.totalEvents}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:col-span-2">
          <h2 className="font-semibold text-slate-950">{copy.byType}</h2>
          {stats.eventsByType.length > 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {stats.eventsByType.map((item) => (
                <div key={item.eventType} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm text-slate-600">{formatEventType(item.eventType, locale)}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">{item.total}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600">{copy.empty}</p>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-950">{copy.topTools}</h2>
          <div className="mt-5 space-y-3">
            {stats.topTools.length > 0 ? (
              stats.topTools.map((item) => (
                <div key={item.slug} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-700">{item.slug}</span>
                  <span className="text-sm font-semibold text-slate-950">{item.total}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">{copy.empty}</p>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="font-semibold text-slate-950">{copy.recent}</h2>
          </div>
          {stats.recentEvents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">{copy.event}</th>
                    <th className="px-6 py-3 font-medium">{copy.tool}</th>
                    <th className="px-6 py-3 font-medium">{copy.language}</th>
                    <th className="px-6 py-3 font-medium">{copy.date}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {stats.recentEvents.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 text-slate-700">{formatEventType(event.eventType, locale)}</td>
                      <td className="px-6 py-4 text-slate-700">{event.toolSlug}</td>
                      <td className="px-6 py-4 text-slate-700">{event.locale ?? "—"}</td>
                      <td className="px-6 py-4 text-slate-700">{formatDate(event.createdAt, locale)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="px-6 py-5 text-sm text-slate-600">{copy.empty}</p>
          )}
        </div>
      </section>
    </div>
  );
}
