import type { TextareaHTMLAttributes } from "react";

export function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`min-h-28 w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 focus:border-[color:var(--brand-accent)] focus:ring-4 focus:ring-[color:var(--brand-accent-soft)] ${className}`}
      {...props}
    />
  );
}
