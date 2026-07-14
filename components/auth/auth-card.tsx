import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type AuthCardProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}>;

export function AuthCard({ eyebrow, title, description, children }: AuthCardProps) {
  return (
    <Container className="py-10 sm:py-18 md:py-20">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-950/5 sm:p-8">
        <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{eyebrow}</p>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-8">{children}</div>
      </div>
    </Container>
  );
}
