import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HtmlLangSync } from "@/components/i18n/html-lang-sync";

export default function SpanishToolsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <HtmlLangSync locale="es" />
      <Header locale="es" />
      <main className="flex-1">{children}</main>
      <Footer locale="es" />
    </div>
  );
}
