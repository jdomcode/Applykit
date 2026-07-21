import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getToolsPath } from "@/lib/i18n/navigation";
import { ToolGrid } from "@/components/tools/tool-grid";
import { DataSourceNotice } from "@/components/tools/data-source-notice";
import { getPublicTools } from "@/lib/tools/public-tools";
import { ButtonLink } from "@/components/ui/button";
import { buildHomeMetadata } from "@/lib/seo/metadata";
import { AdSlot } from "@/components/ads/ad-slot";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

type HomePageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const activeLocale = locale as Locale;
  const dictionary = getDictionary(activeLocale);

  return buildHomeMetadata(activeLocale, dictionary.home.title, dictionary.home.description);
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const activeLocale = locale as Locale;
  const dictionary = getDictionary(activeLocale);
  const toolsResult = await getPublicTools(activeLocale);

  return (
    <>
      <Container className="py-12 sm:py-20 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm">
              {dictionary.home.eyebrow}
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">{dictionary.home.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{dictionary.home.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={getToolsPath(activeLocale)} className="w-full sm:w-auto">
                {dictionary.home.primaryCta}
              </ButtonLink>
              <a
                href="#how-it-works"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-slate-950 sm:w-auto"
              >
                {dictionary.home.secondaryCta}
              </a>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[dictionary.home.featureOne, dictionary.home.featureTwo, dictionary.home.featureThree].map((feature) => (
                <div key={feature} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface overflow-hidden rounded-[2rem] p-4 sm:p-6">
            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-slate-300">{activeLocale === "es" ? "Ejemplo de flujo" : "Example flow"}</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">{activeLocale === "es" ? "Listo para usar" : "Ready to use"}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold">
                {activeLocale === "es" ? "Formulario → Resultado → Copiar" : "Form → Result → Copy"}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {activeLocale === "es"
                  ? "El usuario completa campos concretos y recibe un texto profesional editable."
                  : "The user fills concrete fields and receives an editable professional text."}
              </p>
            </div>
            <div className="mt-4 grid gap-3">
              {[
                activeLocale === "es" ? "1. Elige una herramienta" : "1. Choose a tool",
                activeLocale === "es" ? "2. Completa campos simples" : "2. Complete simple fields",
                activeLocale === "es" ? "3. Copia o guarda el resultado" : "3. Copy or save the result"
              ].map((step) => (
                <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>

      <section id="how-it-works" className="border-y border-slate-200 bg-white/80 py-14 backdrop-blur sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{dictionary.home.processTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{dictionary.home.processDescription}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              activeLocale === "es" ? "Elige herramienta" : "Choose tool",
              activeLocale === "es" ? "Completa formulario" : "Fill form",
              activeLocale === "es" ? "Revisa resultado" : "Review result",
              activeLocale === "es" ? "Copia el texto" : "Copy text"
            ].map((step, index) => (
              <div key={step} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-sm font-semibold text-slate-500">0{index + 1}</span>
                <p className="mt-3 font-semibold text-slate-950">{step}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <AdSlot locale={activeLocale} placement="home_before_tools" className="mb-12" />

        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{dictionary.home.toolsPreviewTitle}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">{dictionary.home.toolsPreviewDescription}</p>
        </div>
        <DataSourceNotice locale={activeLocale} source={toolsResult.source} error={toolsResult.error} />
        <ToolGrid tools={toolsResult.tools} locale={activeLocale} />
      </Container>
    </>
  );
}
