import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { AuthMessage } from "@/components/auth/auth-message";
import { signOutAction, updateProfileAction } from "@/app/auth/actions";
import { getCurrentProfile } from "@/lib/auth/session";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type ProfilePageProps = Readonly<{
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ message?: string; error?: string }>;
}>;

export async function generateMetadata({ params }: ProfilePageProps) {
  const { locale } = await params;
  return locale === "es"
    ? { title: "Perfil | ApplyKit", description: "Perfil básico de ApplyKit." }
    : { title: "Profile | ApplyKit", description: "Basic ApplyKit profile." };
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    redirect("/en/profile");
  }

  const activeLocale = locale as Locale;
  const { user, profile } = await getCurrentProfile(activeLocale);

  if (!user) {
    redirect(`/${activeLocale}/login?error=login_required`);
  }

  const { message, error } = await searchParams;

  return (
    <Container className="py-8 sm:py-14">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-950/5 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ApplyKit</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-slate-950">
          {activeLocale === "es" ? "Perfil básico" : "Basic profile"}
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          {activeLocale === "es"
            ? "Solo guardamos datos mínimos para personalizar tu cuenta. No guardamos CVs en el MVP."
            : "Only minimal data is stored to personalize your account. CVs are not stored in the MVP."}
        </p>

        <div className="mt-8">
          <AuthMessage locale={activeLocale} message={message} error={error} />
          <form action={updateProfileAction} className="space-y-4">
            <input type="hidden" name="locale" value={activeLocale} />
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
                {activeLocale === "es" ? "Correo" : "Email"}
              </label>
              <Input id="email" type="email" value={user.email ?? ""} disabled />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="full_name">
                {activeLocale === "es" ? "Nombre completo" : "Full name"}
              </label>
              <Input id="full_name" name="full_name" type="text" defaultValue={profile?.fullName ?? ""} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="preferred_language">
                {activeLocale === "es" ? "Idioma preferido" : "Preferred language"}
              </label>
              <Select id="preferred_language" name="preferred_language" defaultValue={profile?.preferredLanguage ?? activeLocale}>
                <option value="en">English</option>
                <option value="es">Español</option>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              {activeLocale === "es" ? "Guardar perfil" : "Save profile"}
            </Button>
          </form>

          <form action={signOutAction} className="mt-4">
            <input type="hidden" name="locale" value={activeLocale} />
            <Button type="submit" variant="secondary" className="w-full">
              {activeLocale === "es" ? "Cerrar sesión" : "Sign out"}
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}
