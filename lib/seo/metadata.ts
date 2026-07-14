import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getHomePath, getToolsPath } from "@/lib/i18n/navigation";
import { getToolPath } from "@/lib/tools/tools-data";

export const siteName = "ApplyKit";

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  return (configuredUrl ?? "http://localhost:3000").replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${cleanPath}`;
}

export function getAlternateLanguages(pathByLocale: Record<Locale, string>) {
  return {
    en: absoluteUrl(pathByLocale.en),
    es: absoluteUrl(pathByLocale.es)
  };
}

export function buildPublicPageMetadata({
  locale,
  title,
  description,
  path,
  alternatePaths,
  type = "website"
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  alternatePaths: Record<Locale, string>;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: getAlternateLanguages(alternatePaths)
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: locale === "es" ? "es_ES" : "en_US",
      type
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export function buildHomeMetadata(locale: Locale, title: string, description: string) {
  return buildPublicPageMetadata({
    locale,
    title: `${title} | ${siteName}`,
    description,
    path: getHomePath(locale),
    alternatePaths: {
      en: getHomePath("en"),
      es: getHomePath("es")
    }
  });
}

export function buildToolsIndexMetadata(locale: Locale, title: string, description: string) {
  return buildPublicPageMetadata({
    locale,
    title,
    description,
    path: getToolsPath(locale),
    alternatePaths: {
      en: getToolsPath("en"),
      es: getToolsPath("es")
    }
  });
}

export function buildToolMetadata(locale: Locale, slug: string, title: string, description: string) {
  return buildPublicPageMetadata({
    locale,
    title,
    description,
    path: getToolPath(locale, slug),
    alternatePaths: {
      en: getToolPath("en", slug),
      es: getToolPath("es", slug)
    },
    type: "article"
  });
}

export function buildNoIndexMetadata(title: string): Metadata {
  return {
    title,
    robots: {
      index: false,
      follow: false
    }
  };
}
