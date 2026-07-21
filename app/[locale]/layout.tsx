import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { HtmlLangSync } from "@/components/i18n/html-lang-sync";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <HtmlLangSync locale={locale as Locale} />
      <Header locale={locale as Locale} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer locale={locale as Locale} />
    </div>
  );
}
