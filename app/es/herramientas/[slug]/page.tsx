import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolDetail } from "@/components/tools/tool-detail";
import { getPublicToolBySlug } from "@/lib/tools/public-tools";
import { buildToolMetadata } from "@/lib/seo/metadata";
import { getAllTools } from "@/lib/tools/tools-data";


export function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

type SpanishToolPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({ params }: SpanishToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getPublicToolBySlug(slug, "es");

  if (!tool) {
    return {};
  }

  const copy = tool.translations.es;

  return buildToolMetadata("es", slug, copy.seoTitle, copy.seoDescription);
}

export default async function SpanishToolPage({ params }: SpanishToolPageProps) {
  const { slug } = await params;
  const tool = await getPublicToolBySlug(slug, "es");

  if (!tool) {
    notFound();
  }

  return <ToolDetail tool={tool} locale="es" />;
}
