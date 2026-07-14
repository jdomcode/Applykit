"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/ads/ad-slot";

type SaveStatus = {
  state: "idle" | "loading" | "success" | "error";
  message: string | null;
  href?: string;
};

type GeneratedResultProps = Readonly<{
  title: string;
  outputText: string;
  locale: Locale;
  status: "idle" | "loading" | "success" | "error";
  errorMessage: string | null;
  onChange: (value: string) => void;
  onCopy?: () => Promise<void> | void;
  onSave: () => Promise<void>;
  saveStatus: SaveStatus;
  isAuthenticated: boolean;
}>;

export function GeneratedResult({
  title,
  outputText,
  locale,
  status,
  errorMessage,
  onChange,
  onCopy,
  onSave,
  saveStatus,
  isAuthenticated
}: GeneratedResultProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(outputText);
      await onCopy?.();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const saveButtonText = (() => {
    if (saveStatus.state === "loading") {
      return locale === "es" ? "Guardando" : "Saving";
    }

    if (!isAuthenticated) {
      return locale === "es" ? "Guardar con cuenta" : "Save with account";
    }

    return locale === "es" ? "Guardar" : "Save";
  })();

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:sticky xl:top-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {locale === "es" ? "Resultado generado" : "Generated result"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row">
          <Button type="button" variant="secondary" onClick={handleCopy} disabled={!outputText || status === "loading"}>
            {copied ? (locale === "es" ? "Copiado" : "Copied") : locale === "es" ? "Copiar" : "Copy"}
          </Button>
          <Button type="button" onClick={onSave} disabled={!outputText || status === "loading" || saveStatus.state === "loading"}>
            {saveButtonText}
          </Button>
        </div>
      </div>

      {errorMessage ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {saveStatus.message ? (
        <div
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm leading-6 ${
            saveStatus.state === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : saveStatus.state === "error"
                ? "border-amber-200 bg-amber-50 text-amber-800"
                : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        >
          {saveStatus.message}{" "}
          {saveStatus.href ? (
            <Link href={saveStatus.href} className="font-semibold underline">
              {saveStatus.state === "success"
                ? locale === "es"
                  ? "Ver documento"
                  : "View document"
                : locale === "es"
                  ? "Iniciar sesión"
                  : "Sign in"}
            </Link>
          ) : null}
        </div>
      ) : null}

      <textarea
        className="mt-6 min-h-[28rem] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-5 font-sans text-sm leading-7 text-slate-700 outline-none transition focus:border-slate-700 focus:ring-4 focus:ring-slate-200"
        value={status === "loading" ? (locale === "es" ? "Generando documento..." : "Generating document...") : outputText}
        onChange={(event) => onChange(event.target.value)}
        readOnly={status === "loading"}
      />

      <p className="mt-4 text-xs leading-5 text-slate-500">
        {locale === "es"
          ? "Puedes editar el resultado antes de copiarlo o guardarlo. Los documentos solo se guardan si inicias sesión."
          : "You can edit the result before copying or saving it. Documents are only saved when you are signed in."}
      </p>

      <AdSlot locale={locale} placement="tool_result_below" variant="inline" className="mt-6" />
    </section>
  );
}
