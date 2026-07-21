import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAboutPath, getContactPath, getHomePath, getPrivacyPath, getTermsPath, getToolsPath } from "@/lib/i18n/navigation";
import { getAllTools, getToolPath } from "@/lib/tools/tools-data";
import type { Locale } from "@/lib/i18n/config";
import { BrandMark } from "@/components/brand/brand-mark";
import { siteConfig } from "@/lib/site/config";

export function Footer({ locale }: Readonly<{ locale: Locale }>) {
  const dictionary = getDictionary(locale);
  const tools = getAllTools();

  return (
    <footer className="mt-16 border-t border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(239,246,255,0.72)_100%)] backdrop-blur">
      <Container className="grid gap-8 py-10 text-sm text-slate-600 md:grid-cols-[1.15fr_0.8fr_1fr_0.8fr] md:py-12">
        <div>
          <Link href={getHomePath(locale)} className="inline-flex items-center gap-3 font-semibold text-slate-950">
            <BrandMark caption={locale === "es" ? "Documentos laborales claros" : "Clear job-search documents"} />
          </Link>
          <p className="mt-4 max-w-sm leading-6">{dictionary.footer.tagline}</p>
          <p className="mt-4 text-xs font-medium text-slate-500">{siteConfig.contactEmail}</p>
        </div>

        <nav className="grid content-start gap-3" aria-label={locale === "es" ? "Producto" : "Product"}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{locale === "es" ? "Producto" : "Product"}</p>
          <Link href={getToolsPath(locale)} className="hover:text-slate-950">
            {dictionary.nav.tools}
          </Link>
          <Link href={getAboutPath(locale)} className="hover:text-slate-950">
            {dictionary.footer.about}
          </Link>
          <Link href={getContactPath(locale)} className="hover:text-slate-950">
            {dictionary.footer.contact}
          </Link>
        </nav>

        <nav className="grid content-start gap-3" aria-label={locale === "es" ? "Herramientas" : "Tools"}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{locale === "es" ? "Herramientas" : "Tools"}</p>
          {tools.map((tool) => (
            <Link key={tool.slug} href={getToolPath(locale, tool.slug)} className="hover:text-slate-950">
              {tool.translations[locale].title}
            </Link>
          ))}
        </nav>

        <nav className="grid content-start gap-3" aria-label={locale === "es" ? "Legal" : "Legal"}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Legal</p>
          <Link href={getPrivacyPath(locale)} className="hover:text-slate-950">
            {dictionary.footer.privacy}
          </Link>
          <Link href={getTermsPath(locale)} className="hover:text-slate-950">
            {dictionary.footer.terms}
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
