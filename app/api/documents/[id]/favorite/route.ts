import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
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

  const { data: document } = await supabase.from("generated_documents").select("id").eq("id", id).eq("user_id", user.id).maybeSingle();

  if (!document) {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }

  const { error } = await supabase
    .from("document_favorites")
    .upsert({ user_id: user.id, document_id: id }, { onConflict: "user_id,document_id" });

  if (error) {
    return NextResponse.json({ error: "Favorite could not be saved." }, { status: 500 });
  }

  return NextResponse.json({ isFavorite: true });
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

  const { error } = await supabase.from("document_favorites").delete().eq("document_id", id).eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: "Favorite could not be removed." }, { status: 500 });
  }

  return NextResponse.json({ isFavorite: false });
}
