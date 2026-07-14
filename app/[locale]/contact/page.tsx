import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getInfoContent } from "@/lib/info/content";
import { buildPublicPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = isValidLocale(locale) ? locale : "en";
  const content = getInfoContent("contact", validLocale);

  return buildPublicPageMetadata({
    locale: validLocale,
    title: `${content.eyebrow} | ApplyKit`,
    description: content.description,
    path: validLocale === "es" ? "/es/contacto" : "/en/contact",
    alternatePaths: {
      en: "/en/contact",
      es: "/es/contacto"
    }
  });
}

export default async function ContactPage({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : "en";

  return <InfoPage content={getInfoContent("contact", validLocale)} />;
}
