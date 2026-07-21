"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { ToolDefinition } from "@/lib/tools/tools-data";
import { ToolForm } from "@/components/tools/tool-form";
import { GeneratedResult } from "@/components/tools/generated-result";
import { getActiveTemplateByToolSlug } from "@/lib/templates/get-active-template";
import { renderTemplate } from "@/lib/templates/render-template";
import { sanitizeInputData, validateRequiredFields } from "@/lib/validations/generate";

function resolveOutputLocale(routeLocale: Locale, languageValue?: string): Locale {
  const normalized = languageValue?.trim().toLowerCase();

  if (["spanish", "español", "espanol"].includes(normalized ?? "")) {
    return "es";
  }

  if (["english", "inglés", "ingles"].includes(normalized ?? "")) {
    return "en";
  }

  return routeLocale;
}

export function ToolGenerator({
  tool,
  locale
}: Readonly<{ tool: ToolDefinition; locale: Locale }>) {
  const copy = tool.translations[locale];
  const [resultText, setResultText] = useState(copy.sampleOutput);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleGenerate(inputData: Record<string, string>) {
    setStatus("loading");
    setErrorMessage(null);

    try {
      const sanitizedInputData = sanitizeInputData(inputData);
      const outputLocale = resolveOutputLocale(locale, sanitizedInputData.language);
      const { tool: selectedTool, template } = getActiveTemplateByToolSlug(tool.slug, outputLocale, sanitizedInputData.tone);

      if (!selectedTool || !template) {
        throw new Error(outputLocale === "es" ? "La herramienta no está disponible." : "The tool is not available.");
      }

      const missingRequiredFieldsError = validateRequiredFields(selectedTool, sanitizedInputData, outputLocale, template.inputSchema);

      if (missingRequiredFieldsError) {
        throw new Error(missingRequiredFieldsError);
      }

      const outputText = renderTemplate(template.templateBody, sanitizedInputData, { locale: outputLocale });

      if (!outputText) {
        throw new Error(outputLocale === "es" ? "No se pudo generar el documento." : "The document could not be generated.");
      }

      setResultText(outputText);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : locale === "es" ? "Error inesperado." : "Unexpected error.");
    }
  }

  function handleClear() {
    setResultText(copy.sampleOutput);
    setStatus("idle");
    setErrorMessage(null);
  }

  return (
    <section className="grid min-w-0 gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
      <ToolForm tool={tool} locale={locale} isGenerating={status === "loading"} onGenerate={handleGenerate} onClear={handleClear} />
      <GeneratedResult
        title={copy.resultTitle}
        outputText={resultText}
        locale={locale}
        status={status}
        errorMessage={errorMessage}
        onChange={setResultText}
      />
    </section>
  );
}
