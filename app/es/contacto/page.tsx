import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";
import { getInfoContent } from "@/lib/info/content";
import { buildPublicPageMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  const content = getInfoContent("contact", "es");

  return buildPublicPageMetadata({
    locale: "es",
    title: `${content.eyebrow} | ApplyKit`,
    description: content.description,
    path: "/es/contacto",
    alternatePaths: {
      en: "/en/contact",
      es: "/es/contacto"
    }
  });
}

export default function ContactoPage() {
  return <InfoPage content={getInfoContent("contact", "es")} />;
}
