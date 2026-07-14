import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/database.types";
import { getSupabaseConfig } from "@/lib/supabase/env";

export function createClient() {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
