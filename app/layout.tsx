import type { Metadata } from "next";
import { getSiteUrl, siteName } from "@/lib/seo/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: siteName,
  title: {
    default: "ApplyKit",
    template: `%s | ${siteName}`
  },
  description: "Create job application emails, cover letters, recruiter messages, and career documents in minutes.",
  openGraph: {
    siteName,
    type: "website"
  },
  twitter: {
    card: "summary_large_image"
  },
  icons: {
    icon: "/icon.svg"
  },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
