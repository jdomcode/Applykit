import { z } from "zod";
import type { Locale } from "@/lib/i18n/config";
import type { ToolDefinition } from "@/lib/tools/tools-data";

export const GenerateRequestSchema = z.object({
  slug: z
    .string()
    .min(1, "Tool slug is required.")
    .max(120, "Tool slug is too long.")
    .regex(/^[a-z0-9-]+$/, "Tool slug has an invalid format."),
  locale: z.enum(["en", "es"]),
  inputData: z.record(z.string(), z.unknown()).default({})
});

export type GenerateRequestInput = z.infer<typeof GenerateRequestSchema>;
export type SanitizedInputData = Record<string, string>;

export type LocalInputSchema = {
  fields?: Array<string | { name: string; required?: boolean }>;
} | null;

const MAX_FIELD_LENGTH = 2000;

export function sanitizeInputData(inputData: Record<string, unknown>): SanitizedInputData {
  const sanitized: SanitizedInputData = {};

  for (const [key, value] of Object.entries(inputData)) {
    if (!/^[a-zA-Z0-9_]+$/.test(key)) {
      continue;
    }

    if (typeof value === "string") {
      sanitized[key] = value.replace(/\r\n/g, "\n").trim().slice(0, MAX_FIELD_LENGTH);
      continue;
    }

    if (typeof value === "number" || typeof value === "boolean") {
      sanitized[key] = String(value).slice(0, MAX_FIELD_LENGTH);
    }
  }

  return sanitized;
}

function getSchemaFieldNames(inputSchema: LocalInputSchema) {
  if (!inputSchema || !Array.isArray(inputSchema.fields)) {
    return null;
  }

  return inputSchema.fields
    .map((field) => {
      if (typeof field === "string") {
        return { name: field, required: null as boolean | null };
      }

      if (typeof field.name === "string") {
        return {
          name: field.name,
          required: typeof field.required === "boolean" ? field.required : null
        };
      }

      return null;
    })
    .filter((field): field is { name: string; required: boolean | null } => Boolean(field));
}

function getRequiredFieldNames(tool: ToolDefinition, inputSchema?: LocalInputSchema) {
  const schemaFields = getSchemaFieldNames(inputSchema ?? null);

  if (!schemaFields) {
    return tool.fields.filter((field) => field.required).map((field) => field.name);
  }

  return schemaFields
    .filter((schemaField) => {
      if (schemaField.required !== null) {
        return schemaField.required;
      }

      const localField = tool.fields.find((field) => field.name === schemaField.name);
      return Boolean(localField?.required);
    })
    .map((field) => field.name);
}

export function validateRequiredFields(tool: ToolDefinition, inputData: SanitizedInputData, locale: Locale, inputSchema?: LocalInputSchema) {
  const missingFields = getRequiredFieldNames(tool, inputSchema).filter((fieldName) => !inputData[fieldName]?.trim());

  if (missingFields.length === 0) {
    return null;
  }

  const labels = missingFields.map((fieldName) => {
    const field = tool.fields.find((item) => item.name === fieldName);
    return field?.translations[locale].label ?? fieldName.replaceAll("_", " ");
  });

  return locale === "es"
    ? `Completa los campos requeridos: ${labels.join(", ")}.`
    : `Complete the required fields: ${labels.join(", ")}.`;
}
