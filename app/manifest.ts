import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/metadata";
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ApplyKit",
    short_name: "ApplyKit",
    description: "Create job application emails, cover letters, recruiter messages, and career documents in minutes.",
    start_url: "/en",
    scope: "/",
    display: "standalone",
    background_color: "#f6f9fc",
    theme_color: "#2563eb",
    icons: [
      {
        src: absoluteUrl("/icon.svg"),
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
