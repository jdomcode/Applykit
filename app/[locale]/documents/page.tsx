import { redirect } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { DocumentsPageContent } from "@/components/documents/documents-page";

type DocumentsPageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: DocumentsPageProps) {
  const { locale } = await params;

  return locale === "es"
    ? { title: "Documentos guardados | ApplyKit", description: "Historial privado de documentos guardados en ApplyKit." }
    : { title: "Saved documents | ApplyKit", description: "Private history of documents saved in ApplyKit." };
}

export default async function DocumentsPage({ params }: DocumentsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    redirect("/en/documents");
  }

  return <DocumentsPageContent locale={locale as Locale} />;
}
