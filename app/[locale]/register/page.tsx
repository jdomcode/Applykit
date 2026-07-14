import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthMessage } from "@/components/auth/auth-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpAction } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth/session";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type RegisterPageProps = Readonly<{
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; detail?: string }>;
}>;

export async function generateMetadata({ params }: RegisterPageProps) {
  const { locale } = await params;
  return locale === "es"
    ? { title: "Crear cuenta | ApplyKit", description: "Crea una cuenta de ApplyKit." }
    : { title: "Create account | ApplyKit", description: "Create an ApplyKit account." };
}

export default async function RegisterPage({ params, searchParams }: RegisterPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    redirect("/en/register");
  }

  const activeLocale = locale as Locale;
  const user = await getCurrentUser();

  if (user) {
    redirect(`/${activeLocale}/dashboard`);
  }

  const { error, detail } = await searchParams;

  return (
    <AuthCard
      eyebrow="ApplyKit"
      title={activeLocale === "es" ? "Crear cuenta" : "Create account"}
      description={
        activeLocale === "es"
          ? "Crea una cuenta para guardar documentos generados cuando agreguemos el historial en la próxima fase."
          : "Create an account to save generated documents when document history is added in the next phase."
      }
    >
      <AuthMessage locale={activeLocale} error={error} detail={detail} />
      <form action={signUpAction} className="space-y-4">
        <input type="hidden" name="locale" value={activeLocale} />
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="full_name">
            {activeLocale === "es" ? "Nombre completo" : "Full name"}
          </label>
          <Input id="full_name" name="full_name" type="text" autoComplete="name" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
            {activeLocale === "es" ? "Correo" : "Email"}
          </label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
            {activeLocale === "es" ? "Contraseña" : "Password"}
          </label>
          <Input id="password" name="password" type="password" autoComplete="new-password" minLength={6} required />
          <p className="mt-2 text-xs text-slate-500">
            {activeLocale === "es" ? "Mínimo 6 caracteres." : "Minimum 6 characters."}
          </p>
        </div>
        <Button type="submit" className="w-full">
          {activeLocale === "es" ? "Crear cuenta" : "Create account"}
        </Button>
      </form>
      <p className="mt-6 text-sm text-slate-600">
        {activeLocale === "es" ? "¿Ya tienes cuenta?" : "Already have an account?"} {" "}
        <Link href={`/${activeLocale}/login`} className="font-medium text-slate-950 underline">
          {activeLocale === "es" ? "Iniciar sesión" : "Sign in"}
        </Link>
      </p>
    </AuthCard>
  );
}
