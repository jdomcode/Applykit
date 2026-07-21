import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAboutPath, getHomePath, getToolsPath } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/config";
import { BrandMark } from "@/components/brand/brand-mark";

function NavLink({ href, children }: Readonly<{ href: string; children: React.ReactNode }>) {
  return (
    <Link
      href={href}
      className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-[color:var(--brand-soft)] hover:text-slate-950"
    >
      {children}
    </Link>
  );
}

export function Header({ locale }: Readonly<{ locale: Locale }>) {
  const dictionary = getDictionary(locale);
  const alternateLocale = locale === "en" ? "es" : "en";

  const primaryLinks = (
    <>
      <NavLink href={getToolsPath(locale)}>{dictionary.nav.tools}</NavLink>
      <NavLink href={getAboutPath(locale)}>{locale === "es" ? "Sobre nosotros" : "About"}</NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-white/82 backdrop-blur-xl">
      <Container className="flex min-h-18 items-center justify-between gap-4 py-3">
        <Link href={getHomePath(locale)} className="group inline-flex items-center gap-3" aria-label="ApplyKit home">
          <BrandMark caption={locale === "es" ? "Aplica con claridad" : "Apply with clarity"} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}>
          {primaryLinks}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={getHomePath(alternateLocale)}
            className="rounded-full border border-[color:var(--border)] bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-[color:var(--brand-border-strong)] hover:bg-[color:var(--brand-soft)] hover:text-slate-950"
          >
            {alternateLocale.toUpperCase()}
          </Link>
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-[color:var(--brand-soft)]">
            {locale === "es" ? "Menú" : "Menu"}
            <span className="text-slate-500 transition group-open:rotate-180">⌄</span>
          </summary>
          <div className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-3xl border border-[color:var(--border)] bg-white p-3 shadow-xl shadow-slate-950/10">
            <nav className="grid gap-1" aria-label={locale === "es" ? "Navegación móvil" : "Mobile navigation"}>
              {primaryLinks}
              <Link
                href={getHomePath(alternateLocale)}
                className="rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[color:var(--brand-soft)] hover:text-slate-950"
              >
                {locale === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
              </Link>
            </nav>
          </div>
        </details>
      </Container>
    </header>
  );
}
