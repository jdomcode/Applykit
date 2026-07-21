"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/ads/ad-slot";

type GeneratedResultProps = Readonly<{
  title: string;
  outputText: string;
  locale: Locale;
  status: "idle" | "loading" | "success" | "error";
  errorMessage: string | null;
  onChange: (value: string) => void;
}>;

export function GeneratedResult({
  title,
  outputText,
  locale,
  status,
  errorMessage,
  onChange
}: GeneratedResultProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="brand-panel min-w-0 rounded-[2rem] p-5 sm:p-6 xl:sticky xl:top-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p aria-live="polite" className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-accent-strong)]">
            {status === "success" ? (locale === "es" ? "Resultado generado" : "Generated result") : locale === "es" ? "Resultado" : "Result"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
        </div>
        <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row">
          <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={handleCopy} disabled={!outputText || status === "loading"}>
            {copied ? (locale === "es" ? "Copiado" : "Copied") : locale === "es" ? "Copiar" : "Copy"}
          </Button>
        </div>
      </div>

      {errorMessage ? (
        <div role="alert" className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <textarea
        className="mt-6 min-h-[28rem] w-full min-w-0 resize-y rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-5 font-sans text-sm leading-7 text-slate-700 outline-none transition focus:border-[color:var(--brand-accent)] focus:ring-4 focus:ring-[color:var(--brand-accent-soft)]"
        value={status === "loading" ? (locale === "es" ? "Generando documento..." : "Generating document...") : outputText}
        onChange={(event) => onChange(event.target.value)}
        readOnly={status === "loading"}
      />

      <p className="mt-4 text-xs leading-5 text-slate-500">
        {locale === "es"
          ? "Puedes editar el resultado antes de copiarlo. El texto se genera localmente en tu navegador y ApplyKit no lo guarda."
          : "You can edit the result before copying it. The text is generated locally in your browser and ApplyKit does not save it."}
      </p>

      <AdSlot locale={locale} placement="tool_result_below" variant="inline" className="mt-6" />
    </section>
  );
}
