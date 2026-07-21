import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, siteName } from "@/lib/seo/metadata";
import { BrandMark } from "@/components/brand/brand-mark";

export const metadata: Metadata = {
  title: "Choose your language",
  description: "Choose English or Spanish to use ApplyKit's free job application document tools.",
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      en: absoluteUrl("/en"),
      es: absoluteUrl("/es"),
      "x-default": absoluteUrl("/")
    }
  },
  openGraph: {
    title: "Choose your language",
    description: "Choose English or Spanish to use ApplyKit's free job application document tools.",
    url: absoluteUrl("/"),
    siteName,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Choose your language",
    description: "Choose English or Spanish to use ApplyKit's free job application document tools."
  }
};

export default function RootPage() {
  return (
    <main id="main-content" className="min-h-screen px-6 py-16 text-slate-950">
      <div className="brand-card mx-auto max-w-2xl rounded-[2rem] p-8 sm:p-10">
        <BrandMark caption="English / Español" />
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Choose your language</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Create professional job application documents and messages using simple forms.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--brand-accent-strong)] bg-[linear-gradient(135deg,var(--brand-hero-from),var(--brand-hero-to))] px-5 py-3 text-center text-sm font-semibold text-white" href="/en/">
            English
          </Link>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-center text-sm font-semibold text-slate-800" href="/es/">
            Español
          </Link>
        </div>
      </div>
    </main>
  );
}
