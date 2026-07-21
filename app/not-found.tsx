import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-slate-50 py-16">
      <Container>
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Page not found</h1>
          <p className="mt-4 text-slate-600">
            The page you requested does not exist or is not available in this version of ApplyKit.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/en" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800">
              Go to English home
            </Link>
            <Link href="/es" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:border-slate-950">
              Ir al inicio en español
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
