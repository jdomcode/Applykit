import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ApplyKit",
    short_name: "ApplyKit",
    description: "Create job application emails, cover letters, recruiter messages, and career documents in minutes.",
    start_url: "/en",
    scope: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#020617",
    icons: [
      {
        src: absoluteUrl("/icon.svg"),
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
