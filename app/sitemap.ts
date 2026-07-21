import type { MetadataRoute } from "next";
import { getAllTools, getToolPath } from "@/lib/tools/tools-data";
import { getAboutPath, getContactPath, getHomePath, getPrivacyPath, getTermsPath, getToolsPath } from "@/lib/i18n/navigation";
import { absoluteUrl } from "@/lib/seo/metadata";

export const dynamic = "force-static";

type PairedPage = {
  en: string;
  es: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

function sitemapEntry(path: string, pairedPage: PairedPage, now: Date): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: pairedPage.changeFrequency,
    priority: pairedPage.priority,
    alternates: {
      languages: {
        en: absoluteUrl(pairedPage.en),
        es: absoluteUrl(pairedPage.es),
        "x-default": absoluteUrl(pairedPage.en)
      }
    }
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const tools = getAllTools();
  const pairedPages: PairedPage[] = [
    { en: getHomePath("en"), es: getHomePath("es"), priority: 1, changeFrequency: "monthly" },
    { en: getToolsPath("en"), es: getToolsPath("es"), priority: 0.9, changeFrequency: "weekly" },
    { en: getAboutPath("en"), es: getAboutPath("es"), priority: 0.6, changeFrequency: "yearly" },
    { en: getContactPath("en"), es: getContactPath("es"), priority: 0.5, changeFrequency: "yearly" },
    { en: getPrivacyPath("en"), es: getPrivacyPath("es"), priority: 0.4, changeFrequency: "yearly" },
    { en: getTermsPath("en"), es: getTermsPath("es"), priority: 0.4, changeFrequency: "yearly" },
    ...tools.map((tool): PairedPage => ({
      en: getToolPath("en", tool.slug),
      es: getToolPath("es", tool.slug),
      priority: 0.8,
      changeFrequency: "monthly"
    }))
  ];

  return pairedPages.flatMap((pairedPage) => [
    sitemapEntry(pairedPage.en, pairedPage, now),
    sitemapEntry(pairedPage.es, pairedPage, now)
  ]);
}
