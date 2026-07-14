import { redirect } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { DocumentDetailPageContent } from "@/components/documents/document-detail-page";

type DocumentDetailPageProps = Readonly<{
  params: Promise<{ locale: string; id: string }>;
}>;

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: DocumentDetailPageProps) {
  const { locale } = await params;

  return locale === "es"
    ? { title: "Documento guardado | ApplyKit", description: "Documento guardado en ApplyKit." }
    : { title: "Saved document | ApplyKit", description: "Document saved in ApplyKit." };
}

export default async function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const { locale, id } = await params;

  if (!isValidLocale(locale)) {
    redirect("/en/documents");
  }

  return <DocumentDetailPageContent locale={locale as Locale} documentId={id} />;
}
