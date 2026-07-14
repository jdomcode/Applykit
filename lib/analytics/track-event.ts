import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Locale } from "@/lib/i18n/config";
import type { UsageEventType } from "@/lib/validations/events";
import type { Json } from "@/lib/supabase/database.types";

type SafeMetadataValue = string | number | boolean | null;

type RecordUsageEventInput = {
  eventType: UsageEventType;
  locale?: Locale;
  toolSlug?: string;
  metadata?: Record<string, SafeMetadataValue>;
};

function cleanMetadata(metadata: Record<string, SafeMetadataValue> | undefined): Record<string, SafeMetadataValue> {
  if (!metadata) {
    return {};
  }

  const cleanEntries = Object.entries(metadata)
    .filter(([key]) => !["inputData", "outputText", "documentText", "content", "cv", "resume"].includes(key))
    .slice(0, 20);

  return Object.fromEntries(cleanEntries);
}

export async function recordUsageEvent(input: RecordUsageEventInput) {
  if (!isSupabaseConfigured()) {
    return { ok: false, reason: "supabase_not_configured" } as const;
  }

  try {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    let toolId: string | null = null;

    if (input.toolSlug) {
      const { data: tool } = await supabase.from("tools").select("id").eq("slug", input.toolSlug).eq("status", "active").maybeSingle();
      toolId = tool?.id ?? null;
    }

    const { error } = await supabase.from("usage_events").insert({
      user_id: user?.id ?? null,
      tool_id: toolId,
      event_type: input.eventType,
      locale: input.locale ?? null,
      metadata: cleanMetadata(input.metadata) as Json
    });

    if (error) {
      return { ok: false, reason: error.message } as const;
    }

    return { ok: true } as const;
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : "unexpected_error" } as const;
  }
}
