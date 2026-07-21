import Link from "next/link";

export default function RootPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-950">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ApplyKit</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Choose your language</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Create professional job application documents and messages using simple forms.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white" href="/en/">
            English
          </Link>
          <Link className="rounded-full border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-800" href="/es/">
            Español
          </Link>
        </div>
      </div>
    </main>
  );
}
