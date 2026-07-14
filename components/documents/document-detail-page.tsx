import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { DocumentDetail } from "@/components/documents/document-detail";
import { getCurrentProfile } from "@/lib/auth/session";
import { getSavedDocumentById } from "@/lib/documents/documents";
import type { Locale } from "@/lib/i18n/config";

export async function DocumentDetailPageContent({ locale, documentId }: Readonly<{ locale: Locale; documentId: string }>) {
  const { user } = await getCurrentProfile(locale);

  if (!user) {
    redirect(`/${locale}/login?error=login_required`);
  }

  const document = await getSavedDocumentById(user.id, documentId, locale);

  if (!document) {
    notFound();
  }

  return (
    <Container className="py-10 sm:py-16">
      <DocumentDetail document={document} locale={locale} />
    </Container>
  );
}
