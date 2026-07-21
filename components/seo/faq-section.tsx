import type { Locale } from "@/lib/i18n/config";
import type { ToolFaqItem } from "@/lib/tools/tools-data";

export function FaqSection({
  locale,
  faq
}: Readonly<{
  locale: Locale;
  faq: ToolFaqItem[];
}>) {
  if (faq.length === 0) {
    return null;
  }

  return (
    <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{locale === "es" ? "PREGUNTAS FRECUENTES" : "FAQ"}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
          {locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
        </h2>
      </div>

      <div className="mt-8 divide-y divide-slate-200">
        {faq.map((item) => (
          <details key={item.question} className="group py-5 first:pt-0 last:pb-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-950">
              <span>{item.question}</span>
              <span className="text-xl text-slate-400 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
