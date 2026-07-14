import { z } from "zod";


const InputDataSchema = z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).default({});

export const SaveDocumentSchema = z.object({
  slug: z.string().min(1).max(120),
  locale: z.enum(["en", "es"]),
  title: z.string().trim().min(1).max(180).optional(),
  inputData: InputDataSchema,
  outputText: z.string().trim().min(1).max(20000),
  templateVersionId: z.string().uuid().nullable().optional()
});

export type SaveDocumentInput = z.infer<typeof SaveDocumentSchema>;
