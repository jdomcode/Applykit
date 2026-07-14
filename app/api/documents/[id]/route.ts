import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getSavedDocumentById } from "@/lib/documents/documents";

function getLocaleFromRequest(request: Request) {
  const { searchParams } = new URL(request.url);
  return searchParams.get("locale") === "es" ? "es" : "en";
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const { id } = await context.params;
  const locale = getLocaleFromRequest(request);
  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const document = await getSavedDocumentById(user.id, id, locale);

  if (!document) {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }

  return NextResponse.json({ document });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const { id } = await context.params;
  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { error } = await supabase.from("generated_documents").delete().eq("id", id).eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: "Document could not be deleted." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
