import type { Metadata } from "next";
import { getSiteUrl, siteName } from "@/lib/seo/metadata";
import { AdsenseScript } from "@/components/ads/adsense-script";
import "./globals.css";

function getLangBootstrapScript() {
  return `(function(){try{var path=window.location.pathname||'';document.documentElement.lang=(path==='/es'||path.indexOf('/es/')===0)?'es':'en';}catch(e){}})();`;
}

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
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script dangerouslySetInnerHTML={{ __html: getLangBootstrapScript() }} />
        <AdsenseScript />
        {children}
      </body>
    </html>
  );
}
