import { z } from "zod";

export const UsageEventTypeSchema = z.enum(["tool_viewed", "document_generated", "document_copied", "document_saved"]);

export const TrackEventSchema = z.object({
  eventType: UsageEventTypeSchema,
  slug: z.string().min(1).max(120).optional(),
  locale: z.enum(["en", "es"]).optional(),
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional()
});

export type UsageEventType = z.infer<typeof UsageEventTypeSchema>;
