import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SaveDocumentSchema } from "@/lib/validations/documents";
import { getSavedDocuments } from "@/lib/documents/documents";
import { recordUsageEvent } from "@/lib/analytics/track-event";

function buildDocumentTitle(input: { title?: string; slug: string; inputData: Record<string, unknown>; locale: "en" | "es" }) {
  if (input.title?.trim()) {
    return input.title.trim();
  }

  const jobTitle = typeof input.inputData.job_title === "string" ? input.inputData.job_title.trim() : "";
  const targetRole = typeof input.inputData.target_role === "string" ? input.inputData.target_role.trim() : "";
  const currentRole = typeof input.inputData.current_role === "string" ? input.inputData.current_role.trim() : "";
  const companyName = typeof input.inputData.company_name === "string" ? input.inputData.company_name.trim() : "";
  const role = jobTitle || targetRole || currentRole;

  const readableToolName = input.slug
    .replace(/-generator$/g, "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  if (role && companyName) {
    return input.locale === "es" ? `${readableToolName}: ${role} en ${companyName}` : `${readableToolName}: ${role} at ${companyName}`;
  }

  if (role) {
    return `${readableToolName}: ${role}`;
  }

  return readableToolName;
}

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "es" ? "es" : "en";
  const documents = await getSavedDocuments(user.id, locale);

  return NextResponse.json({ documents });
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = SaveDocumentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid document." }, { status: 400 });
  }

  const input = parsed.data;
  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: input.locale === "es" ? "Inicia sesión para guardar documentos." : "Sign in to save documents." }, { status: 401 });
  }

  const { data: tool } = await supabase.from("tools").select("id").eq("slug", input.slug).eq("status", "active").maybeSingle();
  const toolId = tool?.id ?? null;
  const title = buildDocumentTitle(input);

  const { data, error } = await supabase
    .from("generated_documents")
    .insert({
      user_id: user.id,
      tool_id: toolId,
      template_version_id: input.templateVersionId ?? null,
      locale: input.locale,
      title,
      input_data: input.inputData,
      output_text: input.outputText
    })
    .select("id, title")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: input.locale === "es" ? "No se pudo guardar el documento." : "The document could not be saved." },
      { status: 500 }
    );
  }

  await recordUsageEvent({
    eventType: "document_saved",
    locale: input.locale,
    toolSlug: input.slug,
    metadata: {
      document_id: data.id,
      template_version_id: input.templateVersionId ?? null
    }
  });

  return NextResponse.json({ documentId: data.id, title: data.title }, { status: 201 });
}
