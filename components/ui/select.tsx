import type { SelectHTMLAttributes } from "react";

export function Select({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm text-slate-950 outline-none transition disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 focus:border-[color:var(--brand-accent)] focus:ring-4 focus:ring-[color:var(--brand-accent-soft)] ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
