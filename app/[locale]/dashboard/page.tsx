import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { getCurrentProfile } from "@/lib/auth/session";
import { getDocumentsPath, getToolsPath } from "@/lib/i18n/navigation";
import { countSavedDocuments } from "@/lib/documents/documents";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type DashboardPageProps = Readonly<{
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ message?: string }>;
}>;

export async function generateMetadata({ params }: DashboardPageProps) {
  const { locale } = await params;
  return locale === "es"
    ? { title: "Panel | ApplyKit", description: "Panel privado de ApplyKit." }
    : { title: "Dashboard | ApplyKit", description: "Private ApplyKit dashboard." };
}

export default async function DashboardPage({ params, searchParams }: DashboardPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    redirect("/en/dashboard");
  }

  const activeLocale = locale as Locale;
  const { user, profile } = await getCurrentProfile(activeLocale);

  if (!user) {
    redirect(`/${activeLocale}/login?error=login_required`);
  }

  const { message } = await searchParams;
  const displayName = profile?.fullName || user.email || (activeLocale === "es" ? "Usuario" : "User");
  const documentsCount = await countSavedDocuments(user.id);

  return (
    <Container className="py-8 sm:py-14">
      {message === "password_updated" ? (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {activeLocale === "es" ? "Tu contraseña fue actualizada." : "Your password was updated."}
        </div>
      ) : null}

      <section className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ApplyKit</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-slate-950">
          {activeLocale === "es" ? `Bienvenido, ${displayName}` : `Welcome, ${displayName}`}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {activeLocale === "es"
            ? "Tu cuenta ya está activa. Ya puedes guardar documentos generados y consultar tu historial privado."
            : "Your account is active. You can now save generated documents and view your private history."}
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:flex lg:flex-row">
          <ButtonLink href={getToolsPath(activeLocale)}>{activeLocale === "es" ? "Abrir herramientas" : "Open tools"}</ButtonLink>
          <ButtonLink href={getDocumentsPath(activeLocale)} variant="secondary">
            {activeLocale === "es" ? "Ver documentos" : "View documents"}
          </ButtonLink>
          <ButtonLink href={`/${activeLocale}/profile`} variant="ghost">
            {activeLocale === "es" ? "Editar perfil" : "Edit profile"}
          </ButtonLink>
          {profile?.role === "admin" ? (
            <ButtonLink href={`/${activeLocale}/admin/analytics`} variant="ghost">
              {activeLocale === "es" ? "Ver analítica" : "View analytics"}
            </ButtonLink>
          ) : null}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          {
            title: activeLocale === "es" ? "Documentos guardados" : "Saved documents",
            description: activeLocale === "es" ? `${documentsCount} documentos en tu cuenta.` : `${documentsCount} documents in your account.`
          },
          {
            title: activeLocale === "es" ? "Historial privado" : "Private history",
            description: activeLocale === "es" ? "Conectado a generated_documents con RLS." : "Connected to generated_documents with RLS."
          },
          {
            title: activeLocale === "es" ? "Privacidad" : "Privacy",
            description: activeLocale === "es" ? "Cada usuario solo verá sus documentos." : "Each user will only see their own documents."
          }
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-950">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
          </div>
        ))}
      </section>

      <p className="mt-8 text-sm text-slate-600">
        <Link href={getDocumentsPath(activeLocale)} className="font-medium text-slate-950 underline">
          {activeLocale === "es" ? "Abrir historial de documentos" : "Open document history"}
        </Link>
      </p>
    </Container>
  );
}
