import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Locale } from "@/lib/i18n/config";

export type AuthProfile = {
  id: string;
  fullName: string | null;
  preferredLanguage: Locale;
  role: "user" | "admin";
};

export async function getCurrentUser(): Promise<User | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error
    } = await supabase.auth.getUser();

    if (error) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

export async function ensureProfile(user: User, preferredLanguage: Locale = "en"): Promise<AuthProfile | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id, full_name, preferred_language, role")
    .eq("id", user.id)
    .maybeSingle();

  if (existingProfile) {
    return {
      id: existingProfile.id,
      fullName: existingProfile.full_name,
      preferredLanguage: existingProfile.preferred_language,
      role: existingProfile.role
    };
  }

  const fallbackName = typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : null;

  const { data: insertedProfile } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      full_name: fallbackName,
      preferred_language: preferredLanguage,
      role: "user"
    })
    .select("id, full_name, preferred_language, role")
    .maybeSingle();

  if (!insertedProfile) {
    return null;
  }

  return {
    id: insertedProfile.id,
    fullName: insertedProfile.full_name,
    preferredLanguage: insertedProfile.preferred_language,
    role: insertedProfile.role
  };
}

export async function getCurrentProfile(preferredLanguage: Locale = "en") {
  const user = await getCurrentUser();

  if (!user) {
    return { user: null, profile: null };
  }

  const profile = await ensureProfile(user, preferredLanguage);

  return { user, profile };
}
