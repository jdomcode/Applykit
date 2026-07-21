import type { ReactNode } from "react";

type BrandMarkProps = Readonly<{
  compact?: boolean;
  className?: string;
  caption?: ReactNode;
}>;

export function BrandMark({ compact = false, className = "", caption }: BrandMarkProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <span
        aria-hidden="true"
        className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--brand-border-strong)] bg-[linear-gradient(135deg,var(--brand-hero-from),var(--brand-hero-to))] text-base font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)]"
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.38),transparent_48%)]" />
        <span className="relative tracking-[-0.04em]">A</span>
      </span>
      {!compact ? (
        <span className="flex flex-col">
          <span className="text-base font-semibold tracking-tight text-slate-950">ApplyKit</span>
          {caption ? <span className="text-xs text-slate-500">{caption}</span> : null}
        </span>
      ) : null}
    </span>
  );
}
