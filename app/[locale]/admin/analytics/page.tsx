import { redirect } from "next/navigation";
import { Container } from "@/components/ui/container";
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard";
import { getCurrentProfile } from "@/lib/auth/session";
import { getAdminAnalyticsStats } from "@/lib/analytics/admin-stats";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type AdminAnalyticsPageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: AdminAnalyticsPageProps) {
  const { locale } = await params;
  return locale === "es"
    ? { title: "Analítica interna | ApplyKit", description: "Panel básico de métricas internas de ApplyKit." }
    : { title: "Internal analytics | ApplyKit", description: "Basic internal metrics panel for ApplyKit." };
}

export default async function AdminAnalyticsPage({ params }: AdminAnalyticsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    redirect("/en/admin/analytics");
  }

  const activeLocale = locale as Locale;
  const { user, profile } = await getCurrentProfile(activeLocale);

  if (!user) {
    redirect(`/${activeLocale}/login?error=login_required`);
  }

  if (profile?.role !== "admin") {
    redirect(`/${activeLocale}/dashboard`);
  }

  const stats = await getAdminAnalyticsStats();

  return (
    <Container className="py-10 sm:py-16">
      <AnalyticsDashboard stats={stats} locale={activeLocale} />
    </Container>
  );
}
