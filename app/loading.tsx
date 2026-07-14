import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="bg-slate-50 py-16">
      <Container>
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-6 h-8 w-2/3 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-slate-200" />
          <div className="mt-3 h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
        </div>
      </Container>
    </div>
  );
}
