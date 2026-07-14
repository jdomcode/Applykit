import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAboutPath, getContactPath, getHomePath, getPrivacyPath, getTermsPath, getToolsPath } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/config";

export function Footer({ locale }: Readonly<{ locale: Locale }>) {
  const dictionary = getDictionary(locale);

  return (
    <footer className="border-t border-slate-200/80 bg-white/85 backdrop-blur">
      <Container className="grid gap-8 py-10 text-sm text-slate-600 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:py-12">
        <div>
          <Link href={getHomePath(locale)} className="inline-flex items-center gap-3 font-semibold text-slate-950">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">A</span>
            ApplyKit
          </Link>
          <p className="mt-4 max-w-sm leading-6">{dictionary.footer.tagline}</p>
          <p className="mt-2 text-xs text-slate-500">{dictionary.footer.phase}</p>
        </div>

        <nav className="grid gap-3" aria-label={locale === "es" ? "Producto" : "Product"}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{locale === "es" ? "Producto" : "Product"}</p>
          <Link href={getToolsPath(locale)} className="hover:text-slate-950">
            {dictionary.nav.tools}
          </Link>
          <Link href={getAboutPath(locale)} className="hover:text-slate-950">
            {dictionary.footer.about}
          </Link>
          <Link href={`/${locale}/login`} className="hover:text-slate-950">
            {dictionary.nav.signIn}
          </Link>
        </nav>

        <nav className="grid gap-3" aria-label={locale === "es" ? "Legal" : "Legal"}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Legal</p>
          <Link href={getPrivacyPath(locale)} className="hover:text-slate-950">
            {dictionary.footer.privacy}
          </Link>
          <Link href={getTermsPath(locale)} className="hover:text-slate-950">
            {dictionary.footer.terms}
          </Link>
          <Link href={getContactPath(locale)} className="hover:text-slate-950">
            {dictionary.footer.contact}
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
