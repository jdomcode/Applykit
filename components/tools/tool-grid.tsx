import type { Locale } from "@/lib/i18n/config";
import type { ToolDefinition } from "@/lib/tools/tools-data";
import { ToolCard } from "@/components/tools/tool-card";

export function ToolGrid({ tools, locale }: Readonly<{ tools: ToolDefinition[]; locale: Locale }>) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} locale={locale} />
      ))}
    </div>
  );
}
