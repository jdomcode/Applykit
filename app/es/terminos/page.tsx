import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { getLegalContent } from "@/lib/legal/content";
import { buildPublicPageMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  const content = getLegalContent("terms", "es");

  return buildPublicPageMetadata({
    locale: "es",
    title: content.title,
    description: content.description,
    path: "/es/terminos",
    alternatePaths: {
      en: "/en/terms",
      es: "/es/terminos"
    }
  });
}

export default function TerminosPage() {
  return <LegalPage content={getLegalContent("terms", "es")} locale="es" />;
}
