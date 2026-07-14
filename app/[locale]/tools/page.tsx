import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { ToolsIndex } from "@/components/tools/tools-index";
import { getPublicTools } from "@/lib/tools/public-tools";
import { buildToolsIndexMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

type ToolsPageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: ToolsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const activeLocale = locale as Locale;

  if (activeLocale === "es") {
    return buildToolsIndexMetadata(
      "es",
      "Herramientas laborales | ApplyKit",
      "Herramientas para crear cartas de presentación, correos laborales, mensajes a reclutadores, bios profesionales y otros textos para aplicar a trabajos."
    );
  }

  return buildToolsIndexMetadata(
    "en",
    "Career tools | ApplyKit",
    "Tools to create cover letters, job application emails, recruiter messages, professional bios, and other job application texts."
  );
}

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const activeLocale = locale as Locale;
  const result = await getPublicTools(activeLocale);

  return <ToolsIndex locale={activeLocale} tools={result.tools} source={result.source} error={result.error} />;
}
