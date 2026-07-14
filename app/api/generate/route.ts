import { NextResponse } from "next/server";
import { GenerateRequestSchema, sanitizeInputData, validateRequiredFields } from "@/lib/validations/generate";
import { getActiveTemplateByToolSlug } from "@/lib/templates/get-active-template";
import { renderTemplate } from "@/lib/templates/render-template";
import { recordUsageEvent } from "@/lib/analytics/track-event";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = GenerateRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Invalid request."
      },
      { status: 400 }
    );
  }

  const { slug, locale, inputData } = parsed.data;
  const sanitizedInputData = sanitizeInputData(inputData);
  const { tool, template } = await getActiveTemplateByToolSlug(slug, locale, sanitizedInputData.tone);

  if (!tool || !template) {
    return NextResponse.json(
      {
        error: locale === "es" ? "La herramienta no está disponible." : "The tool is not available."
      },
      { status: 404 }
    );
  }

  const missingRequiredFieldsError = validateRequiredFields(tool, sanitizedInputData, locale);

  if (missingRequiredFieldsError) {
    return NextResponse.json({ error: missingRequiredFieldsError }, { status: 400 });
  }

  const outputText = renderTemplate(template.templateBody, sanitizedInputData, { locale });

  if (!outputText) {
    return NextResponse.json(
      {
        error: locale === "es" ? "No se pudo generar el documento." : "The document could not be generated."
      },
      { status: 500 }
    );
  }

  await recordUsageEvent({
    eventType: "document_generated",
    locale,
    toolSlug: slug,
    metadata: {
      template_version_id: template.id,
      source: template.source,
      tone: sanitizedInputData.tone || null
    }
  });

  return NextResponse.json({
    outputText,
    templateVersionId: template.id,
    source: template.source
  });
}
