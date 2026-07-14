import type { Locale } from "@/lib/i18n/config";

export function DataSourceNotice({
  locale,
  source,
  error
}: Readonly<{
  locale: Locale;
  source: "supabase" | "local-fallback";
  error?: string;
}>) {
  if (source === "supabase") {
    return null;
  }

  return (
    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
      <p className="font-semibold">{locale === "es" ? "Modo local temporal" : "Temporary local mode"}</p>
      <p className="mt-1">
        {locale === "es"
          ? "La app está usando datos locales porque Supabase aún no está configurado o no respondió. Configura .env.local para leer las herramientas reales de la base de datos."
          : "The app is using local data because Supabase is not configured yet or did not respond. Configure .env.local to read real tools from the database."}
      </p>
      {error ? <p className="mt-1 text-xs opacity-80">{error}</p> : null}
    </div>
  );
}
