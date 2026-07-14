import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getPublicToolBySlug } from "@/lib/tools/public-tools";
import { ToolDetail } from "@/components/tools/tool-detail";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

type ToolPageProps = Readonly<{
  params: Promise<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const activeLocale = locale as Locale;
  const tool = await getPublicToolBySlug(slug, activeLocale);

  if (!tool) {
    return {};
  }

  const copy = tool.translations[activeLocale];

  return buildToolMetadata(activeLocale, slug, copy.seoTitle, copy.seoDescription);
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const activeLocale = locale as Locale;
  const tool = await getPublicToolBySlug(slug, activeLocale);

  if (!tool) {
    notFound();
  }

  return <ToolDetail tool={tool} locale={activeLocale} />;
}
