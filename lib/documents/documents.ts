import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Locale } from "@/lib/i18n/config";
import type { Json } from "@/lib/supabase/database.types";

type GeneratedDocumentRow = {
  id: string;
  user_id: string;
  tool_id: string | null;
  template_version_id: string | null;
  locale: Locale;
  title: string;
  input_data: Json;
  output_text: string;
  created_at: string;
  updated_at: string;
};

type ToolTranslationRow = {
  tool_id: string;
  title: string;
};

type ToolRow = {
  id: string;
  slug: string;
  icon: string | null;
};

export type SavedDocumentSummary = {
  id: string;
  title: string;
  locale: Locale;
  outputPreview: string;
  createdAt: string;
  updatedAt: string;
  toolSlug: string | null;
  toolIcon: string | null;
  toolTitle: string | null;
  isFavorite: boolean;
};

export type SavedDocumentDetail = SavedDocumentSummary & {
  inputData: Json;
  outputText: string;
  templateVersionId: string | null;
};

function toPreview(outputText: string) {
  const compact = outputText.replace(/\s+/g, " ").trim();
  return compact.length > 180 ? `${compact.slice(0, 180)}...` : compact;
}

function uniqueDefined(values: Array<string | null>) {
  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

function isLocale(value: string): value is Locale {
  return value === "en" || value === "es";
}

function mapDocument(
  document: GeneratedDocumentRow,
  toolsById: Map<string, ToolRow>,
  translationsByToolId: Map<string, string>,
  favoriteIds: Set<string>
): SavedDocumentDetail {
  const tool = document.tool_id ? toolsById.get(document.tool_id) : undefined;

  return {
    id: document.id,
    title: document.title,
    locale: isLocale(document.locale) ? document.locale : "en",
    outputPreview: toPreview(document.output_text),
    outputText: document.output_text,
    inputData: document.input_data,
    createdAt: document.created_at,
    updatedAt: document.updated_at,
    templateVersionId: document.template_version_id,
    toolSlug: tool?.slug ?? null,
    toolIcon: tool?.icon ?? null,
    toolTitle: document.tool_id ? translationsByToolId.get(document.tool_id) ?? null : null,
    isFavorite: favoriteIds.has(document.id)
  };
}

async function getRelatedData(userId: string, documents: GeneratedDocumentRow[], locale: Locale) {
  const supabase = await createClient();
  const documentIds = documents.map((document) => document.id);
  const toolIds = uniqueDefined(documents.map((document) => document.tool_id));

  const toolsById = new Map<string, ToolRow>();
  const translationsByToolId = new Map<string, string>();
  const favoriteIds = new Set<string>();

  if (toolIds.length > 0) {
    const { data: tools } = await supabase.from("tools").select("id, slug, icon").in("id", toolIds);

    for (const tool of (tools ?? []) as ToolRow[]) {
      toolsById.set(tool.id, tool);
    }

    const { data: translations } = await supabase
      .from("tool_translations")
      .select("tool_id, title")
      .eq("locale", locale)
      .in("tool_id", toolIds);

    for (const translation of (translations ?? []) as ToolTranslationRow[]) {
      translationsByToolId.set(translation.tool_id, translation.title);
    }
  }

  if (documentIds.length > 0) {
    const { data: favorites } = await supabase
      .from("document_favorites")
      .select("document_id")
      .eq("user_id", userId)
      .in("document_id", documentIds);

    for (const favorite of (favorites ?? []) as Array<{ document_id: string }>) {
      favoriteIds.add(favorite.document_id);
    }
  }

  return { toolsById, translationsByToolId, favoriteIds };
}

export async function getSavedDocuments(userId: string, locale: Locale): Promise<SavedDocumentSummary[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("generated_documents")
    .select("id, user_id, tool_id, template_version_id, locale, title, input_data, output_text, created_at, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  const documents = data as GeneratedDocumentRow[];
  const relatedData = await getRelatedData(userId, documents, locale);

  return documents.map((document) => mapDocument(document, relatedData.toolsById, relatedData.translationsByToolId, relatedData.favoriteIds));
}

export async function getSavedDocumentById(userId: string, documentId: string, locale: Locale): Promise<SavedDocumentDetail | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("generated_documents")
    .select("id, user_id, tool_id, template_version_id, locale, title, input_data, output_text, created_at, updated_at")
    .eq("id", documentId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const document = data as GeneratedDocumentRow;
  const relatedData = await getRelatedData(userId, [document], locale);

  return mapDocument(document, relatedData.toolsById, relatedData.translationsByToolId, relatedData.favoriteIds);
}

export async function countSavedDocuments(userId: string) {
  if (!isSupabaseConfigured()) {
    return 0;
  }

  const supabase = await createClient();
  const { count, error } = await supabase
    .from("generated_documents")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) {
    return 0;
  }

  return count ?? 0;
}
