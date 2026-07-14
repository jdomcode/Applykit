"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

function getLocale(formData: FormData): Locale {
  const locale = String(formData.get("locale") ?? "en");
  return isValidLocale(locale) ? locale : "en";
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

async function getOrigin() {
  const headerStore = await headers();
  return headerStore.get("origin") ?? "http://localhost:3000";
}

function authRedirect(locale: Locale, path: string, params?: Record<string, string>): never {
  const searchParams = new URLSearchParams(params ?? {});
  const query = searchParams.toString();
  redirect(`/${locale}${path}${query ? `?${query}` : ""}`);
}

function ensureAuthConfigured(locale: Locale) {
  if (!isSupabaseConfigured()) {
    authRedirect(locale, "/login", { error: "supabase_not_configured" });
  }
}

function getAuthErrorCode(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("already") || normalized.includes("registered")) {
    return "user_already_registered";
  }

  if (normalized.includes("signup") && (normalized.includes("disabled") || normalized.includes("not allowed"))) {
    return "signups_disabled";
  }

  if (normalized.includes("database") || normalized.includes("saving new user")) {
    return "profile_trigger_failed";
  }

  if (normalized.includes("password")) {
    return "invalid_password";
  }

  if (normalized.includes("email")) {
    return "invalid_email";
  }

  return "signup_failed";
}

function getSafeDetail(message: string) {
  return message.replace(/[\r\n]+/g, " ").slice(0, 180);
}

export async function signInAction(formData: FormData) {
  const locale = getLocale(formData);
  ensureAuthConfigured(locale);

  const email = getText(formData, "email").toLowerCase();
  const password = getText(formData, "password");

  if (!email || !password) {
    authRedirect(locale, "/login", { error: "missing_credentials" });
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    authRedirect(locale, "/login", { error: "invalid_credentials" });
  }

  authRedirect(locale, "/dashboard");
}

export async function signUpAction(formData: FormData) {
  const locale = getLocale(formData);
  ensureAuthConfigured(locale);

  const fullName = getText(formData, "full_name");
  const email = getText(formData, "email").toLowerCase();
  const password = getText(formData, "password");

  if (!email || !password || password.length < 6) {
    authRedirect(locale, "/register", { error: "invalid_signup" });
  }

  const origin = await getOrigin();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/${locale}/dashboard`,
      data: {
        full_name: fullName || null,
        preferred_language: locale
      }
    }
  });

  if (error) {
    console.error("[ApplyKit Auth] Sign up failed", {
      message: error.message,
      status: error.status,
      code: error.code,
      name: error.name
    });

    authRedirect(locale, "/register", {
      error: getAuthErrorCode(error.message),
      detail: getSafeDetail(error.message)
    });
  }

  if (data.user && data.session) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      full_name: fullName || null,
      preferred_language: locale,
      role: "user"
    });

    authRedirect(locale, "/dashboard");
  }

  authRedirect(locale, "/login", { message: "check_email" });
}

export async function signOutAction(formData: FormData) {
  const locale = getLocale(formData);

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  authRedirect(locale, "/login", { message: "signed_out" });
}

export async function requestPasswordResetAction(formData: FormData) {
  const locale = getLocale(formData);
  ensureAuthConfigured(locale);

  const email = getText(formData, "email").toLowerCase();

  if (!email) {
    authRedirect(locale, "/forgot-password", { error: "missing_email" });
  }

  const origin = await getOrigin();
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/${locale}/update-password`
  });

  if (error) {
    authRedirect(locale, "/forgot-password", { error: "reset_failed" });
  }

  authRedirect(locale, "/forgot-password", { message: "reset_sent" });
}

export async function updatePasswordAction(formData: FormData) {
  const locale = getLocale(formData);
  ensureAuthConfigured(locale);

  const password = getText(formData, "password");

  if (!password || password.length < 6) {
    authRedirect(locale, "/update-password", { error: "invalid_password" });
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    authRedirect(locale, "/update-password", { error: "update_failed" });
  }

  authRedirect(locale, "/dashboard", { message: "password_updated" });
}

export async function updateProfileAction(formData: FormData) {
  const locale = getLocale(formData);
  ensureAuthConfigured(locale);

  const fullName = getText(formData, "full_name");
  const preferredLanguage = getText(formData, "preferred_language");

  const safeLanguage: Locale = isValidLocale(preferredLanguage) ? preferredLanguage : locale;

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    authRedirect(locale, "/login", { error: "login_required" });
  }

  const authenticatedUser = user;

  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: authenticatedUser.id,
      full_name: fullName || null,
      preferred_language: safeLanguage
    }, { onConflict: "id" });

  if (error) {
    authRedirect(locale, "/profile", { error: "profile_update_failed" });
  }

  authRedirect(locale, "/profile", { message: "profile_updated" });
}
