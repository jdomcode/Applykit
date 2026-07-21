import type { Locale } from "@/lib/i18n/config";
import { getAllTools, getToolBySlug, type ToolDefinition } from "@/lib/tools/tools-data";

export type PublicToolsResult = {
  tools: ToolDefinition[];
  source: "local-code";
  error?: string;
};

export async function getPublicTools(_locale: Locale): Promise<PublicToolsResult> {
  return {
    tools: getAllTools(),
    source: "local-code"
  };
}

export async function getPublicToolBySlug(slug: string, _locale: Locale): Promise<ToolDefinition | null> {
  return getToolBySlug(slug) ?? null;
}
