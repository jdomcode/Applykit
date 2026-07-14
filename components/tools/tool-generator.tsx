"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { ToolDefinition } from "@/lib/tools/tools-data";
import { ToolForm } from "@/components/tools/tool-form";
import { GeneratedResult } from "@/components/tools/generated-result";
import { getDocumentsPath } from "@/lib/i18n/navigation";

type GenerateResponse = {
  outputText?: string;
  templateVersionId?: string | null;
  error?: string;
};

type SaveResponse = {
  documentId?: string;
  error?: string;
};

type SaveStatus = {
  state: "idle" | "loading" | "success" | "error";
  message: string | null;
  href?: string;
};

function buildDocumentTitle(tool: ToolDefinition, locale: Locale, inputData: Record<string, string>) {
  const copy = tool.translations[locale];
  const role = inputData.job_title || inputData.target_role || inputData.current_role;
  const company = inputData.company_name;

  if (role && company) {
    return locale === "es" ? `${copy.title}: ${role} en ${company}` : `${copy.title}: ${role} at ${company}`;
  }

  if (role) {
    return `${copy.title}: ${role}`;
  }

  return copy.title;
}

export function ToolGenerator({
  tool,
  locale,
  isAuthenticated
}: Readonly<{ tool: ToolDefinition; locale: Locale; isAuthenticated: boolean }>) {
  const copy = tool.translations[locale];
  const [resultText, setResultText] = useState(copy.sampleOutput);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastInputData, setLastInputData] = useState<Record<string, string> | null>(null);
  const [lastTemplateVersionId, setLastTemplateVersionId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({ state: "idle", message: null });

  async function handleGenerate(inputData: Record<string, string>) {
    setStatus("loading");
    setErrorMessage(null);
    setSaveStatus({ state: "idle", message: null });

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug: tool.slug,
          locale,
          inputData
        })
      });

      const data = (await response.json()) as GenerateResponse;

      if (!response.ok || !data.outputText) {
        throw new Error(data.error ?? (locale === "es" ? "No se pudo generar el texto." : "The text could not be generated."));
      }

      setResultText(data.outputText);
      setLastInputData(inputData);
      setLastTemplateVersionId(data.templateVersionId ?? null);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : locale === "es" ? "Error inesperado." : "Unexpected error.");
    }
  }

  async function handleSave() {
    if (!isAuthenticated) {
      setSaveStatus({
        state: "error",
        message: locale === "es" ? "Inicia sesión para guardar este documento." : "Sign in to save this document.",
        href: `/${locale}/login`
      });
      return;
    }

    if (!lastInputData || status !== "success") {
      setSaveStatus({
        state: "error",
        message: locale === "es" ? "Genera un documento antes de guardarlo." : "Generate a document before saving it."
      });
      return;
    }

    setSaveStatus({ state: "loading", message: locale === "es" ? "Guardando documento..." : "Saving document..." });

    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug: tool.slug,
          locale,
          title: buildDocumentTitle(tool, locale, lastInputData),
          inputData: lastInputData,
          outputText: resultText,
          templateVersionId: lastTemplateVersionId
        })
      });

      const data = (await response.json()) as SaveResponse;

      if (!response.ok || !data.documentId) {
        throw new Error(data.error ?? (locale === "es" ? "No se pudo guardar el documento." : "The document could not be saved."));
      }

      setSaveStatus({
        state: "success",
        message: locale === "es" ? "Documento guardado." : "Document saved.",
        href: `${getDocumentsPath(locale)}/${data.documentId}`
      });
    } catch (error) {
      setSaveStatus({
        state: "error",
        message: error instanceof Error ? error.message : locale === "es" ? "Error inesperado." : "Unexpected error."
      });
    }
  }


  async function handleCopyEvent() {
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          eventType: "document_copied",
          slug: tool.slug,
          locale,
          metadata: { source: "generated_result" }
        })
      });
    } catch {
      // Analytics must never block the copy action.
    }
  }

  function handleClear() {
    setResultText(copy.sampleOutput);
    setStatus("idle");
    setErrorMessage(null);
    setLastInputData(null);
    setLastTemplateVersionId(null);
    setSaveStatus({ state: "idle", message: null });
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
      <ToolForm tool={tool} locale={locale} isGenerating={status === "loading"} onGenerate={handleGenerate} onClear={handleClear} />
      <GeneratedResult
        title={copy.resultTitle}
        outputText={resultText}
        locale={locale}
        status={status}
        errorMessage={errorMessage}
        onChange={setResultText}
        onCopy={handleCopyEvent}
        onSave={handleSave}
        saveStatus={saveStatus}
        isAuthenticated={isAuthenticated}
      />
    </section>
  );
}
