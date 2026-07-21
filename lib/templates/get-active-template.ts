import type { Locale } from "@/lib/i18n/config";
import { getToolBySlug } from "@/lib/tools/tools-data";
import { getLocalTemplate, type LocalTemplate } from "@/lib/tools/templates";

export type ActiveTemplate = LocalTemplate;

export function getActiveTemplateByToolSlug(slug: string, locale: Locale, _requestedTone?: string) {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { tool: null, template: null };
  }

  return {
    tool,
    template: getLocalTemplate(tool, locale)
  };
}
