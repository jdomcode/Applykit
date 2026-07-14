import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthMessage } from "@/components/auth/auth-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPasswordResetAction } from "@/app/auth/actions";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type ForgotPasswordPageProps = Readonly<{
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ message?: string; error?: string }>;
}>;

export async function generateMetadata({ params }: ForgotPasswordPageProps) {
  const { locale } = await params;
  return locale === "es"
    ? { title: "Recuperar contraseña | ApplyKit", description: "Solicita un enlace para recuperar tu contraseña." }
    : { title: "Reset password | ApplyKit", description: "Request a link to reset your password." };
}

export default async function ForgotPasswordPage({ params, searchParams }: ForgotPasswordPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    redirect("/en/forgot-password");
  }

  const activeLocale = locale as Locale;
  const { message, error } = await searchParams;

  return (
    <AuthCard
      eyebrow="ApplyKit"
      title={activeLocale === "es" ? "Recuperar contraseña" : "Reset password"}
      description={
        activeLocale === "es"
          ? "Escribe tu correo y te enviaremos un enlace para crear una nueva contraseña."
          : "Enter your email and we will send a link to create a new password."
      }
    >
      <AuthMessage locale={activeLocale} message={message} error={error} />
      <form action={requestPasswordResetAction} className="space-y-4">
        <input type="hidden" name="locale" value={activeLocale} />
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
            {activeLocale === "es" ? "Correo" : "Email"}
          </label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <Button type="submit" className="w-full">
          {activeLocale === "es" ? "Enviar enlace" : "Send reset link"}
        </Button>
      </form>
      <p className="mt-6 text-sm text-slate-600">
        <Link href={`/${activeLocale}/login`} className="font-medium text-slate-950 underline">
          {activeLocale === "es" ? "Volver a iniciar sesión" : "Back to sign in"}
        </Link>
      </p>
    </AuthCard>
  );
}
