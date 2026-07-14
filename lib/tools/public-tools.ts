import type { Locale } from "@/lib/i18n/config";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getAllTools, getToolBySlug, type ToolDefinition, type ToolFaqItem, type ToolField, type ToolFieldType } from "@/lib/tools/tools-data";
import type { Json } from "@/lib/supabase/database.types";

type ToolTranslationRow = {
  locale: Locale;
  title: string;
  description: string;
  seo_title: string | null;
  seo_description: string | null;
  intro_content: string | null;
  faq: Json;
};

type ToolListRow = {
  id: string;
  slug: string;
  category: ToolDefinition["category"];
  icon: string | null;
  tool_translations: ToolTranslationRow[] | ToolTranslationRow | null;
};

type TemplateVersionRow = {
  id: string;
  locale: Locale;
  tone: string;
  template_body: string;
  input_schema: Json;
  is_active: boolean;
};

type ToolDetailRow = ToolListRow & {
  template_versions: TemplateVersionRow[] | TemplateVersionRow | null;
};

export type PublicToolsResult = {
  tools: ToolDefinition[];
  source: "supabase" | "local-fallback";
  error?: string;
};

function firstItem<T>(value: T[] | T | null | undefined): T | undefined {
  if (!value) {
    return undefined;
  }

  return Array.isArray(value) ? value[0] : value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getLocalizedText(value: unknown, locale: Locale, fallback: string) {
  if (!isRecord(value)) {
    return fallback;
  }

  const localizedValue = value[locale];
  return typeof localizedValue === "string" && localizedValue.trim().length > 0 ? localizedValue : fallback;
}


function parseFaq(value: unknown): ToolFaqItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }

      const question = typeof item.question === "string" ? item.question.trim() : "";
      const answer = typeof item.answer === "string" ? item.answer.trim() : "";

      return question && answer ? { question, answer } : null;
    })
    .filter((item): item is ToolFaqItem => Boolean(item));
}

function getLocalizedOptions(value: unknown, locale: Locale) {
  if (!isRecord(value)) {
    return [];
  }

  const localizedValue = value[locale];
  return Array.isArray(localizedValue) ? localizedValue.filter((option): option is string => typeof option === "string") : [];
}

function isToolFieldType(value: unknown): value is ToolFieldType {
  return value === "text" || value === "textarea" || value === "select" || value === "date";
}

function getLocalFieldAlias(fieldName: string) {
  const aliases: Record<string, string> = {
    desired_range: "target_range",
    target_role: "current_role"
  };

  return aliases[fieldName] ?? fieldName;
}

function fieldsFromInputSchema(inputSchema: Json, locale: Locale, fallbackTool?: ToolDefinition): ToolField[] {
  if (!isRecord(inputSchema) || !Array.isArray(inputSchema.fields)) {
    return [];
  }

  if (inputSchema.fields.every((field) => typeof field === "string")) {
    const mappedFields = inputSchema.fields
      .map((field) => fallbackTool?.fields.find((item) => item.name === getLocalFieldAlias(field as string)))
      .filter((field): field is ToolField => Boolean(field));

    return mappedFields.length > 0 ? mappedFields : [];
  }

  const parsedFields: ToolField[] = [];

  for (const rawField of inputSchema.fields) {
    if (!isRecord(rawField)) {
      continue;
    }

    const name = typeof rawField.name === "string" ? rawField.name : null;

    if (!name) {
      continue;
    }

    const fieldType = isToolFieldType(rawField.type) ? rawField.type : "text";
    const label = getLocalizedText(rawField.labels, locale, name.replaceAll("_", " "));
    const options = getLocalizedOptions(rawField.options, locale);

    parsedFields.push({
      name,
      type: fieldType,
      required: typeof rawField.required === "boolean" ? rawField.required : false,
      translations: {
        en: {
          label: getLocalizedText(rawField.labels, "en", label),
          placeholder: getLocalizedText(rawField.placeholders, "en", "") || undefined,
          helper: getLocalizedText(rawField.helpers, "en", "") || undefined
        },
        es: {
          label: getLocalizedText(rawField.labels, "es", label),
          placeholder: getLocalizedText(rawField.placeholders, "es", "") || undefined,
          helper: getLocalizedText(rawField.helpers, "es", "") || undefined
        }
      },
      options: options.length > 0
        ? {
            en: getLocalizedOptions(rawField.options, "en"),
            es: getLocalizedOptions(rawField.options, "es")
          }
        : undefined
    });
  }

  return parsedFields;
}

function mapToolRow(row: ToolListRow, locale: Locale, template?: TemplateVersionRow): ToolDefinition {
  const translation = firstItem(row.tool_translations);
  const fallbackTool = getToolBySlug(row.slug);
  const fallbackCopy = fallbackTool?.translations[locale];
  const title = translation?.title ?? fallbackCopy?.title ?? row.slug;
  const description = translation?.description ?? fallbackCopy?.description ?? "";
  const introContent = translation?.intro_content ?? fallbackCopy?.introContent;
  const faq = parseFaq(translation?.faq);
  const fields = template ? fieldsFromInputSchema(template.input_schema, locale, fallbackTool) : [];

  return {
    slug: row.slug,
    icon: row.icon ?? fallbackTool?.icon ?? "AK",
    category: row.category,
    translations: {
      en: {
        title: locale === "en" ? title : fallbackTool?.translations.en.title ?? title,
        shortDescription: locale === "en" ? description : fallbackTool?.translations.en.shortDescription ?? description,
        description: locale === "en" ? description : fallbackTool?.translations.en.description ?? description,
        seoTitle: locale === "en" ? translation?.seo_title ?? title : fallbackTool?.translations.en.seoTitle ?? title,
        seoDescription: locale === "en" ? translation?.seo_description ?? description : fallbackTool?.translations.en.seoDescription ?? description,
        formTitle: fallbackTool?.translations.en.formTitle ?? "Tool details",
        resultTitle: fallbackTool?.translations.en.resultTitle ?? "Preview result",
        sampleOutput: locale === "en" ? template?.template_body ?? fallbackTool?.translations.en.sampleOutput ?? "" : fallbackTool?.translations.en.sampleOutput ?? "",
        introContent: locale === "en" ? introContent : fallbackTool?.translations.en.introContent,
        faq: locale === "en" ? faq : fallbackTool?.translations.en.faq
      },
      es: {
        title: locale === "es" ? title : fallbackTool?.translations.es.title ?? title,
        shortDescription: locale === "es" ? description : fallbackTool?.translations.es.shortDescription ?? description,
        description: locale === "es" ? description : fallbackTool?.translations.es.description ?? description,
        seoTitle: locale === "es" ? translation?.seo_title ?? title : fallbackTool?.translations.es.seoTitle ?? title,
        seoDescription: locale === "es" ? translation?.seo_description ?? description : fallbackTool?.translations.es.seoDescription ?? description,
        formTitle: fallbackTool?.translations.es.formTitle ?? "Detalles de la herramienta",
        resultTitle: fallbackTool?.translations.es.resultTitle ?? "Vista previa del resultado",
        sampleOutput: locale === "es" ? template?.template_body ?? fallbackTool?.translations.es.sampleOutput ?? "" : fallbackTool?.translations.es.sampleOutput ?? "",
        introContent: locale === "es" ? introContent : fallbackTool?.translations.es.introContent,
        faq: locale === "es" ? faq : fallbackTool?.translations.es.faq
      }
    },
    fields: fields.length > 0 ? fields : fallbackTool?.fields ?? []
  };
}

function getLocalFallbackTools(): ToolDefinition[] {
  return getAllTools();
}

export async function getPublicTools(locale: Locale): Promise<PublicToolsResult> {
  if (!isSupabaseConfigured()) {
    return {
      tools: getLocalFallbackTools(),
      source: "local-fallback",
      error: "Supabase environment variables are not configured yet."
    };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("tools")
      .select("id, slug, category, icon, tool_translations!inner(locale, title, description, seo_title, seo_description, intro_content, faq)")
      .eq("status", "active")
      .eq("tool_translations.locale", locale)
      .order("created_at", { ascending: true });

    if (error) {
      return {
        tools: getLocalFallbackTools(),
        source: "local-fallback",
        error: error.message
      };
    }

    return {
      tools: (data as unknown as ToolListRow[]).map((tool) => mapToolRow(tool, locale)),
      source: "supabase"
    };
  } catch (error) {
    return {
      tools: getLocalFallbackTools(),
      source: "local-fallback",
      error: error instanceof Error ? error.message : "Unexpected Supabase error."
    };
  }
}

export async function getPublicToolBySlug(slug: string, locale: Locale): Promise<ToolDefinition | null> {
  if (!isSupabaseConfigured()) {
    return getToolBySlug(slug) ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("tools")
      .select(
        "id, slug, category, icon, tool_translations!inner(locale, title, description, seo_title, seo_description, intro_content, faq), template_versions(id, locale, tone, template_body, input_schema, is_active)"
      )
      .eq("slug", slug)
      .eq("status", "active")
      .eq("tool_translations.locale", locale)
      .eq("template_versions.locale", locale)
      .eq("template_versions.is_active", true)
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return getToolBySlug(slug) ?? null;
    }

    const row = data as unknown as ToolDetailRow;
    const template = firstItem(row.template_versions);

    return mapToolRow(row, locale, template);
  } catch {
    return getToolBySlug(slug) ?? null;
  }
}
