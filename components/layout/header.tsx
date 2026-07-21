import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getHomePath, getToolsPath } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/config";

function NavLink({ href, children }: Readonly<{ href: string; children: React.ReactNode }>) {
  return (
    <Link href={href} className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950">
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
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href={getHomePath(locale)} className="group inline-flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white shadow-sm shadow-slate-950/20">
            A
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-950">ApplyKit</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}>
          {primaryLinks}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={getHomePath(alternateLocale)}
            className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-950"
          >
            {alternateLocale.toUpperCase()}
          </Link>
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
            {locale === "es" ? "Menú" : "Menu"}
            <span className="text-slate-500 transition group-open:rotate-180">⌄</span>
          </summary>
          <div className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-950/10">
            <nav className="grid gap-1" aria-label={locale === "es" ? "Navegación móvil" : "Mobile navigation"}>
              {primaryLinks}
              <Link
                href={getHomePath(alternateLocale)}
                className="rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
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
