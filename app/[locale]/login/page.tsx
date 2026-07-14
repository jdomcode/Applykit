import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthMessage } from "@/components/auth/auth-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInAction } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth/session";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type LoginPageProps = Readonly<{
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ message?: string; error?: string }>;
}>;

export async function generateMetadata({ params }: LoginPageProps) {
  const { locale } = await params;
  return locale === "es"
    ? { title: "Iniciar sesión | ApplyKit", description: "Accede a tu cuenta de ApplyKit." }
    : { title: "Sign in | ApplyKit", description: "Access your ApplyKit account." };
}

export default async function LoginPage({ params, searchParams }: LoginPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    redirect("/en/login");
  }

  const activeLocale = locale as Locale;
  const user = await getCurrentUser();

  if (user) {
    redirect(`/${activeLocale}/dashboard`);
  }

  const { message, error } = await searchParams;

  return (
    <AuthCard
      eyebrow="ApplyKit"
      title={activeLocale === "es" ? "Iniciar sesión" : "Sign in"}
      description={
        activeLocale === "es"
          ? "Accede para guardar documentos y preparar tu historial de aplicaciones."
          : "Sign in to save documents and prepare your application history."
      }
    >
      <AuthMessage locale={activeLocale} message={message} error={error} />
      <form action={signInAction} className="space-y-4">
        <input type="hidden" name="locale" value={activeLocale} />
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
          <Input id="password" name="password" type="password" autoComplete="current-password" required />
        </div>
        <Button type="submit" className="w-full">
          {activeLocale === "es" ? "Entrar" : "Sign in"}
        </Button>
      </form>
      <div className="mt-6 space-y-2 text-sm text-slate-600">
        <p>
          {activeLocale === "es" ? "¿No tienes cuenta?" : "No account yet?"} {" "}
          <Link href={`/${activeLocale}/register`} className="font-medium text-slate-950 underline">
            {activeLocale === "es" ? "Crear cuenta" : "Create account"}
          </Link>
        </p>
        <p>
          <Link href={`/${activeLocale}/forgot-password`} className="font-medium text-slate-950 underline">
            {activeLocale === "es" ? "Olvidé mi contraseña" : "Forgot password"}
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
