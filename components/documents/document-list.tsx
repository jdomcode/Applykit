import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { SavedDocumentSummary } from "@/lib/documents/documents";
import { getDocumentDetailPath, getToolsPath } from "@/lib/i18n/navigation";
import { ButtonLink } from "@/components/ui/button";
import { DocumentActions } from "@/components/documents/document-actions";

type DocumentListProps = Readonly<{
  documents: SavedDocumentSummary[];
  locale: Locale;
}>;

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "es" ? "es" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function DocumentList({ documents, locale }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          {locale === "es" ? "Todavía no tienes documentos guardados" : "You do not have saved documents yet"}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          {locale === "es"
            ? "Genera un documento desde cualquier herramienta y usa el botón Guardar. Los documentos anónimos no se guardan."
            : "Generate a document from any tool and use the Save button. Anonymous documents are not stored."}
        </p>
        <div className="mt-6">
          <ButtonLink href={getToolsPath(locale)}>{locale === "es" ? "Abrir herramientas" : "Open tools"}</ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      {documents.map((document) => (
        <article key={document.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {document.isFavorite ? (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                    {locale === "es" ? "Favorito" : "Favorite"}
                  </span>
                ) : null}
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {document.toolTitle ?? (locale === "es" ? "Documento" : "Document")}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">
                <Link href={getDocumentDetailPath(locale, document.id)} className="hover:underline">
                  {document.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{document.outputPreview}</p>
              <p className="mt-4 text-xs text-slate-500">
                {locale === "es" ? "Actualizado" : "Updated"}: {formatDate(document.updatedAt, locale)}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 md:items-end">
              <ButtonLink href={getDocumentDetailPath(locale, document.id)} variant="secondary" className="w-full px-4 py-2 md:w-auto">
                {locale === "es" ? "Ver" : "View"}
              </ButtonLink>
              <DocumentActions documentId={document.id} locale={locale} isFavorite={document.isFavorite} />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
