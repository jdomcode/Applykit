import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { DocumentList } from "@/components/documents/document-list";
import { getCurrentProfile } from "@/lib/auth/session";
import { getSavedDocuments } from "@/lib/documents/documents";
import { getToolsPath } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/config";

export async function DocumentsPageContent({ locale }: Readonly<{ locale: Locale }>) {
  const { user } = await getCurrentProfile(locale);

  if (!user) {
    redirect(`/${locale}/login?error=login_required`);
  }

  const documents = await getSavedDocuments(user.id, locale);

  return (
    <Container className="py-8 sm:py-14">
      <section className="mb-8 flex flex-col gap-5 rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm sm:p-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ApplyKit</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {locale === "es" ? "Documentos guardados" : "Saved documents"}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            {locale === "es"
              ? "Consulta los textos que guardaste desde las herramientas. Cada usuario solo puede ver sus propios documentos."
              : "Review the texts you saved from the tools. Each user can only see their own documents."}
          </p>
        </div>
        <ButtonLink href={getToolsPath(locale)} className="w-full md:w-auto">{locale === "es" ? "Crear nuevo" : "Create new"}</ButtonLink>
      </section>

      <DocumentList documents={documents} locale={locale} />
    </Container>
  );
}
