import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { ToolDefinition, ToolFaqItem } from "@/lib/tools/tools-data";
import { Container } from "@/components/ui/container";
import { ToolGenerator } from "@/components/tools/tool-generator";
import { RelatedTools } from "@/components/tools/related-tools";
import { FaqSection } from "@/components/seo/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { getToolsPath } from "@/lib/i18n/navigation";
import { getToolPath } from "@/lib/tools/tools-data";
import { absoluteUrl, siteName } from "@/lib/seo/metadata";
import { getPublicTools } from "@/lib/tools/public-tools";
import { AdSlot } from "@/components/ads/ad-slot";

function getDefaultFaq(locale: Locale): ToolFaqItem[] {
  return locale === "es"
    ? [
        {
          question: "¿Puedo editar el texto generado?",
          answer: "Sí. El resultado aparece en un campo editable para que puedas ajustarlo antes de copiarlo."
        },
        {
          question: "¿La herramienta inventa experiencia o logros?",
          answer: "No. ApplyKit usa los datos que proporcionas y evita agregar experiencia, logros o información que no hayas indicado."
        }
      ]
    : [
        {
          question: "Can I edit the generated text?",
          answer: "Yes. The result appears in an editable field so you can adjust it before copying it."
        },
        {
          question: "Does the tool invent experience or achievements?",
          answer: "No. ApplyKit uses the details you provide and avoids adding experience, achievements, or information you did not enter."
        }
      ];
}

function buildToolJsonLd(tool: ToolDefinition, locale: Locale, faq: ToolFaqItem[]) {
  const copy = tool.translations[locale];
  const url = absoluteUrl(getToolPath(locale, tool.slug));

  const webApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: copy.title,
    description: copy.seoDescription,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: locale,
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: siteName
    }
  };

  if (faq.length === 0) {
    return webApplication;
  }

  return [
    webApplication,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    }
  ];
}

export async function ToolDetail({ tool, locale }: Readonly<{ tool: ToolDefinition; locale: Locale }>) {
  const copy = tool.translations[locale];
  const allToolsResult = await getPublicTools(locale);
  const relatedTools = allToolsResult.tools
    .filter((item) => item.slug !== tool.slug && item.category === tool.category)
    .slice(0, 3);
  const fallbackRelatedTools = allToolsResult.tools.filter((item) => item.slug !== tool.slug).slice(0, 3);
  const visibleRelatedTools = relatedTools.length > 0 ? relatedTools : fallbackRelatedTools;
  const faq = copy.faq && copy.faq.length > 0 ? copy.faq : getDefaultFaq(locale);

  return (
    <Container className="py-8 sm:py-14">
      <JsonLd data={buildToolJsonLd(tool, locale, faq)} />

      <div className="mb-8">
        <Link href={getToolsPath(locale)} className="text-sm font-medium text-slate-600 hover:text-slate-950">
          {locale === "es" ? "← Volver a herramientas" : "← Back to tools"}
        </Link>
      </div>

      <section className="grid min-w-0 gap-8 rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
            {tool.icon}
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ApplyKit</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{copy.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{copy.description}</p>
          {copy.introContent ? <p className="mt-4 text-base leading-7 text-slate-600">{copy.introContent}</p> : null}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-950">{locale === "es" ? "Qué incluye" : "What it includes"}</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>{locale === "es" ? "Formulario simple, sin experiencia tipo chatbot." : "Simple form, no chatbot-style experience."}</li>
            <li>{locale === "es" ? "Resultado editable y listo para copiar." : "Editable result ready to copy."}</li>
            <li>{locale === "es" ? "Texto profesional basado en tu información." : "Professional text based on your information."}</li>
                      </ul>
        </div>
      </section>

      <div className="mt-8"><ToolGenerator tool={tool} locale={locale} /></div>

      <AdSlot locale={locale} placement="tool_before_faq" className="mt-10" />

      <FaqSection locale={locale} faq={faq} />
      <RelatedTools locale={locale} tools={visibleRelatedTools} />
    </Container>
  );
}
