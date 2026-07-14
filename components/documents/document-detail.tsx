import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { SavedDocumentDetail } from "@/lib/documents/documents";
import { getDocumentsPath, getToolsPath } from "@/lib/i18n/navigation";
import { ButtonLink } from "@/components/ui/button";
import { DocumentActions } from "@/components/documents/document-actions";

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "es" ? "es" : "en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function inputEntries(inputData: SavedDocumentDetail["inputData"]) {
  if (!inputData || typeof inputData !== "object" || Array.isArray(inputData)) {
    return [];
  }

  return Object.entries(inputData).filter(([, value]) => typeof value === "string" && value.trim().length > 0) as Array<[string, string]>;
}

export function DocumentDetail({ document, locale }: Readonly<{ document: SavedDocumentDetail; locale: Locale }>) {
  const entries = inputEntries(document.inputData);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.42fr] xl:items-start">
      <article className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <Link href={getDocumentsPath(locale)} className="text-sm font-medium text-slate-600 hover:text-slate-950">
          {locale === "es" ? "← Volver a documentos" : "← Back to documents"}
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {document.isFavorite ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
              {locale === "es" ? "Favorito" : "Favorite"}
            </span>
          ) : null}
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {document.toolTitle ?? (locale === "es" ? "Documento guardado" : "Saved document")}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{document.title}</h1>
        <p className="mt-3 text-sm text-slate-500">
          {locale === "es" ? "Actualizado" : "Updated"}: {formatDate(document.updatedAt, locale)}
        </p>

        <textarea
          className="mt-8 min-h-[30rem] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-5 font-sans text-sm leading-7 text-slate-700 outline-none focus:border-slate-700 focus:ring-4 focus:ring-slate-200"
          defaultValue={document.outputText}
          readOnly
        />
      </article>

      <aside className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:sticky xl:top-24">
        <h2 className="text-lg font-semibold text-slate-950">{locale === "es" ? "Acciones" : "Actions"}</h2>
        <DocumentActions documentId={document.id} locale={locale} isFavorite={document.isFavorite} mode="detail" />

        {document.toolSlug ? (
          <ButtonLink href={`${getToolsPath(locale)}/${document.toolSlug}`} variant="secondary" className="w-full px-4 py-2">
            {locale === "es" ? "Usar esta herramienta otra vez" : "Use this tool again"}
          </ButtonLink>
        ) : null}

        <div className="border-t border-slate-200 pt-4">
          <h3 className="text-sm font-semibold text-slate-950">{locale === "es" ? "Datos usados" : "Input data"}</h3>
          {entries.length > 0 ? (
            <dl className="mt-3 space-y-3 text-sm leading-6">
              {entries.map(([key, value]) => (
                <div key={key}>
                  <dt className="font-medium capitalize text-slate-950">{key.replaceAll("_", " ")}</dt>
                  <dd className="text-slate-600">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {locale === "es" ? "No hay datos de entrada disponibles." : "No input data is available."}
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
