export function HeroVisual({ locale }: Readonly<{ locale: "en" | "es" }>) {
  const labels = locale === "es"
    ? {
        heading: "Flujo recomendado",
        subheading: "Mensajes claros para tu búsqueda laboral",
        form: "Formulario",
        output: "Resultado",
        bio: "Bio profesional",
        recruiter: "Mensaje al reclutador",
        cover: "Carta de presentación",
        copy: "Copiar y editar",
        quality: "Enfoque profesional",
        bilingual: "EN / ES"
      }
    : {
        heading: "Recommended flow",
        subheading: "Clear messages for your job search",
        form: "Form",
        output: "Result",
        bio: "Professional bio",
        recruiter: "Recruiter message",
        cover: "Cover letter",
        copy: "Copy and edit",
        quality: "Professional tone",
        bilingual: "EN / ES"
      };

  const resultLines = ["88%", "100%", "92%", "82%", "68%"];

  return (
    <div className="brand-card relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_30%)]" />
      <div className="relative grid gap-4">
        <div className="flex items-center justify-between gap-4 rounded-[1.5rem] bg-slate-950 px-5 py-4 text-white shadow-[0_16px_40px_rgba(15,23,42,0.22)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">{labels.heading}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{labels.subheading}</h2>
          </div>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100">{labels.bilingual}</span>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.5rem] border border-[color:var(--brand-border-strong)] bg-white/88 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-accent)]">{labels.form}</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">{labels.cover}</p>
              </div>
              <span className="rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-accent-strong)]">{labels.quality}</span>
            </div>
            <div className="mt-4 space-y-3">
              {new Array(4).fill(0).map((_, index) => (
                <div key={index} className="h-11 rounded-2xl border border-slate-200 bg-slate-50" />
              ))}
              <div className="flex gap-2">
                <div className="h-11 flex-1 rounded-full bg-[linear-gradient(135deg,var(--brand-hero-from),var(--brand-hero-to))]" />
                <div className="h-11 w-24 rounded-full border border-slate-200 bg-white" />
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-[color:var(--brand-border-strong)] bg-white/88 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-accent)]">{labels.output}</p>
              <p className="mt-1 text-sm font-semibold text-slate-950">{labels.copy}</p>
              <div className="mt-4 space-y-2">
                {resultLines.map((width, index) => (
                  <div key={index} className={`h-3 rounded-full ${index === resultLines.length - 1 ? "bg-slate-200" : "bg-slate-100"}`} style={{ width }} />
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[labels.recruiter, labels.bio].map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-[color:var(--brand-border)] bg-[color:var(--brand-soft)] p-4">
                  <p className="text-sm font-semibold text-slate-950">{item}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {locale === "es"
                      ? "Textos listos para adaptar y copiar en minutos."
                      : "Ready-to-adapt text you can copy in minutes."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
