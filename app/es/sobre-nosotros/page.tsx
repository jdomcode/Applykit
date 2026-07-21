import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";
import { getInfoContent } from "@/lib/info/content";
import { buildPublicPageMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  const content = getInfoContent("about", "es");

  return buildPublicPageMetadata({
    locale: "es",
    title: `${content.eyebrow} | ApplyKit`,
    description: content.description,
    path: "/es/sobre-nosotros",
    alternatePaths: {
      en: "/en/about",
      es: "/es/sobre-nosotros"
    }
  });
}

export default function SobreNosotrosPage() {
  return <InfoPage content={getInfoContent("about", "es")} />;
}
