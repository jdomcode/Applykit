import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import type { InfoPageContent } from "@/lib/info/content";

export function InfoPage({ content }: Readonly<{ content: InfoPageContent }>) {
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{content.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{content.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{content.description}</p>

          {(content.primaryAction || content.secondaryAction) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {content.primaryAction ? (
                <ButtonLink href={content.primaryAction.href}>{content.primaryAction.label}</ButtonLink>
              ) : null}
              {content.secondaryAction ? (
                <ButtonLink href={content.secondaryAction.href} variant="secondary">
                  {content.secondaryAction.label}
                </ButtonLink>
              ) : null}
            </div>
          )}

          <div className="mt-12 grid gap-6">
            {content.sections.map((section) => (
              <section key={section.heading} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                <h2 className="text-xl font-semibold text-slate-950">{section.heading}</h2>
                <div className="mt-4 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="leading-7 text-slate-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
