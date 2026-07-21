import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteUrl } from "@/lib/seo/metadata";
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/en",
          "/es",
          "/en/tools",
          "/es/herramientas",
          "/en/about",
          "/es/sobre-nosotros",
          "/en/contact",
          "/es/contacto",
          "/en/privacy",
          "/es/privacidad",
          "/en/terms",
          "/es/terminos"
        ],
        disallow: [
          "/api/",
          "/auth/",
          "/en/dashboard",
          "/es/dashboard",
          "/es/panel",
          "/en/documents",
          "/es/documentos",
          "/en/profile",
          "/es/profile",
          "/en/admin",
          "/es/admin",
          "/*.pages.dev"
        ]
      }
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteUrl()
  };
}
