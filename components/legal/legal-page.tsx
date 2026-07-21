import { Container } from "@/components/ui/container";
import type { LegalPageContent } from "@/lib/legal/content";
import type { Locale } from "@/lib/i18n/config";

export function LegalPage({ content, locale }: Readonly<{ content: LegalPageContent; locale: Locale }>) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="brand-card mx-auto max-w-3xl rounded-3xl p-6 sm:p-10">
          <p className="text-sm font-medium text-slate-500">
            {locale === "es" ? "Última actualización" : "Last updated"}: {content.lastUpdated}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{content.title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{content.description}</p>

          <div className="mt-10 space-y-8">
            {content.sections.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-950">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="leading-7 text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
