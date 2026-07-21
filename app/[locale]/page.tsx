import Image from "next/image";
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
import { HeroVisual } from "@/components/brand/hero-visual";

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

  const audiencePoints = activeLocale === "es"
    ? ["Bilingüe EN / ES", "Sin cuenta", "Texto editable"]
    : ["Bilingual EN / ES", "No account", "Editable text"];

  const trustPoints = activeLocale === "es"
    ? [
        "Formularios cortos para reducir fricción.",
        "Tono profesional pensado para empleo y reclutamiento.",
        "El texto se genera localmente y puedes copiarlo al instante."
      ]
    : [
        "Short forms to reduce friction.",
        "Professional tone designed for hiring and job search use cases.",
        "Text is generated locally and ready to copy instantly."
      ];

  return (
    <>
      <Container className="py-12 sm:py-20 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div>
            <p className="section-kicker">{dictionary.home.eyebrow}</p>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">{dictionary.home.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{dictionary.home.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {audiencePoints.map((item) => (
                <span key={item} className="stat-pill rounded-full px-4 py-2 text-sm font-semibold text-slate-700">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={getToolsPath(activeLocale)} className="w-full sm:w-auto">
                {dictionary.home.primaryCta}
              </ButtonLink>
              <a
                href="#how-it-works"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[color:var(--brand-soft)] hover:text-slate-950 sm:w-auto"
              >
                {dictionary.home.secondaryCta}
              </a>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[dictionary.home.featureOne, dictionary.home.featureTwo, dictionary.home.featureThree].map((feature) => (
                <div key={feature} className="brand-panel rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <HeroVisual locale={activeLocale} />
        </section>
      </Container>

      <section id="how-it-works" className="border-y border-[color:var(--border)] bg-white/72 py-14 backdrop-blur sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{dictionary.home.processTitle}</h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{dictionary.home.processDescription}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  activeLocale === "es" ? "1. Elige una herramienta" : "1. Choose a tool",
                  activeLocale === "es" ? "2. Completa los campos" : "2. Fill in the fields",
                  activeLocale === "es" ? "3. Edita y copia el resultado" : "3. Edit and copy the result"
                ].map((step, index) => (
                  <div key={step} className="brand-panel rounded-3xl p-6">
                    <span className="text-sm font-semibold text-[color:var(--brand-accent-strong)]">0{index + 1}</span>
                    <p className="mt-3 font-semibold text-slate-950">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="brand-card rounded-[2rem] p-5 sm:p-6">
              <Image
                src="/illustrations/applykit-hero.svg"
                alt={activeLocale === "es" ? "Vista previa visual del flujo de ApplyKit" : "Visual preview of the ApplyKit workflow"}
                width={960}
                height={720}
                className="h-auto w-full rounded-[1.5rem]"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <AdSlot locale={activeLocale} placement="home_before_tools" className="mb-12" />

        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{dictionary.home.toolsPreviewTitle}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">{dictionary.home.toolsPreviewDescription}</p>
        </div>
        <div className="mb-8 grid gap-3 md:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point} className="brand-panel rounded-3xl p-5 text-sm leading-6 text-slate-700">
              {point}
            </div>
          ))}
        </div>
        <DataSourceNotice locale={activeLocale} source={toolsResult.source} error={toolsResult.error} />
        <ToolGrid tools={toolsResult.tools} locale={activeLocale} />
      </Container>
    </>
  );
}
