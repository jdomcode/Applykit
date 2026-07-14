import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Locale } from "@/lib/i18n/config";
import type { UsageEventType } from "@/lib/validations/events";

type RawUsageEvent = {
  id: string;
  event_type: UsageEventType;
  locale: Locale | null;
  created_at: string;
  tools: { slug: string | null } | null;
};

export type AdminAnalyticsStats = {
  totalEvents: number;
  eventsByType: Array<{ eventType: UsageEventType; total: number }>;
  topTools: Array<{ slug: string; total: number }>;
  recentEvents: Array<{ id: string; eventType: UsageEventType; locale: Locale | null; toolSlug: string; createdAt: string }>;
  error?: string;
};

const emptyStats: AdminAnalyticsStats = {
  totalEvents: 0,
  eventsByType: [],
  topTools: [],
  recentEvents: []
};

function increment(map: Map<string, number>, key: string) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function toSortedList(map: Map<string, number>) {
  return Array.from(map.entries())
    .map(([key, total]) => ({ key, total }))
    .sort((a, b) => b.total - a.total || a.key.localeCompare(b.key));
}

export async function getAdminAnalyticsStats(): Promise<AdminAnalyticsStats> {
  if (!isSupabaseConfigured()) {
    return { ...emptyStats, error: "Supabase is not configured." };
  }

  const supabase = await createClient();
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 30);

  const { data, error } = await supabase
    .from("usage_events")
    .select("id, event_type, locale, created_at, tools(slug)")
    .gte("created_at", fromDate.toISOString())
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    return { ...emptyStats, error: error.message };
  }

  const events = (data ?? []) as unknown as RawUsageEvent[];
  const byType = new Map<string, number>();
  const byTool = new Map<string, number>();

  for (const event of events) {
    increment(byType, event.event_type);
    const toolSlug = event.tools?.slug ?? "unknown";
    increment(byTool, toolSlug);
  }

  return {
    totalEvents: events.length,
    eventsByType: toSortedList(byType).map((item) => ({ eventType: item.key as UsageEventType, total: item.total })),
    topTools: toSortedList(byTool).slice(0, 8).map((item) => ({ slug: item.key, total: item.total })),
    recentEvents: events.slice(0, 20).map((event) => ({
      id: event.id,
      eventType: event.event_type,
      locale: event.locale,
      toolSlug: event.tools?.slug ?? "unknown",
      createdAt: event.created_at
    }))
  };
}
