import { NextResponse } from "next/server";
import { TrackEventSchema } from "@/lib/validations/events";
import { recordUsageEvent } from "@/lib/analytics/track-event";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = TrackEventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid event." }, { status: 400 });
  }

  const result = await recordUsageEvent({
    eventType: parsed.data.eventType,
    locale: parsed.data.locale,
    toolSlug: parsed.data.slug,
    metadata: parsed.data.metadata
  });

  if (!result.ok) {
    return NextResponse.json({ error: "The event could not be recorded." }, { status: 202 });
  }

  return NextResponse.json({ ok: true });
}
