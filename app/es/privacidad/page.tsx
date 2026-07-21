import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { getLegalContent } from "@/lib/legal/content";
import { buildPublicPageMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  const content = getLegalContent("privacy", "es");

  return buildPublicPageMetadata({
    locale: "es",
    title: content.title,
    description: content.description,
    path: "/es/privacidad",
    alternatePaths: {
      en: "/en/privacy",
      es: "/es/privacidad"
    }
  });
}

export default function PrivacidadPage() {
  return <LegalPage content={getLegalContent("privacy", "es")} locale="es" />;
}
