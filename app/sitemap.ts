import type { MetadataRoute } from "next";
import { getAllTools, getToolPath } from "@/lib/tools/tools-data";
import { getAboutPath, getContactPath, getHomePath, getPrivacyPath, getTermsPath, getToolsPath } from "@/lib/i18n/navigation";
import { absoluteUrl } from "@/lib/seo/metadata";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const tools = getAllTools();
  const staticPages = [
    getHomePath("en"),
    getHomePath("es"),
    getToolsPath("en"),
    getToolsPath("es"),
    getAboutPath("en"),
    getAboutPath("es"),
    getContactPath("en"),
    getContactPath("es"),
    getPrivacyPath("en"),
    getPrivacyPath("es"),
    getTermsPath("en"),
    getTermsPath("es")
  ];
  const toolPages = tools.flatMap((tool) => [getToolPath("en", tool.slug), getToolPath("es", tool.slug)]);

  return [...staticPages, ...toolPages].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path.includes("/tools/") || path.includes("/herramientas/") ? "weekly" : "monthly",
    priority: path === "/en" || path === "/es" ? 1 : path.endsWith("/tools") || path.endsWith("/herramientas") ? 0.9 : 0.7
  }));
}
