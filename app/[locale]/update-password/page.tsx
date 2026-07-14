import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthMessage } from "@/components/auth/auth-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updatePasswordAction } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth/session";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type UpdatePasswordPageProps = Readonly<{
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}>;

export async function generateMetadata({ params }: UpdatePasswordPageProps) {
  const { locale } = await params;
  return locale === "es"
    ? { title: "Nueva contraseña | ApplyKit", description: "Crea una nueva contraseña para tu cuenta." }
    : { title: "New password | ApplyKit", description: "Create a new password for your account." };
}

export default async function UpdatePasswordPage({ params, searchParams }: UpdatePasswordPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    redirect("/en/update-password");
  }

  const activeLocale = locale as Locale;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${activeLocale}/login?error=login_required`);
  }

  const { error } = await searchParams;

  return (
    <AuthCard
      eyebrow="ApplyKit"
      title={activeLocale === "es" ? "Crear nueva contraseña" : "Create new password"}
      description={
        activeLocale === "es"
          ? "Escribe una nueva contraseña para completar la recuperación de tu cuenta."
          : "Enter a new password to complete account recovery."
      }
    >
      <AuthMessage locale={activeLocale} error={error} />
      <form action={updatePasswordAction} className="space-y-4">
        <input type="hidden" name="locale" value={activeLocale} />
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
            {activeLocale === "es" ? "Nueva contraseña" : "New password"}
          </label>
          <Input id="password" name="password" type="password" autoComplete="new-password" minLength={6} required />
        </div>
        <Button type="submit" className="w-full">
          {activeLocale === "es" ? "Actualizar contraseña" : "Update password"}
        </Button>
      </form>
    </AuthCard>
  );
}
