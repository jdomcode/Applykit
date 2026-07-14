import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getLegalContent } from "@/lib/legal/content";
import { buildPublicPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = isValidLocale(locale) ? locale : "en";
  const content = getLegalContent("terms", validLocale);

  return buildPublicPageMetadata({
    locale: validLocale,
    title: content.title,
    description: content.description,
    path: `/${validLocale}/terms`,
    alternatePaths: {
      en: "/en/terms",
      es: "/es/terminos"
    }
  });
}

export default async function TermsPage({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : "en";

  return <LegalPage content={getLegalContent("terms", validLocale)} locale={validLocale} />;
}
