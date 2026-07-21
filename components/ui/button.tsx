import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[color:var(--brand-accent-strong)] bg-[linear-gradient(135deg,var(--brand-hero-from),var(--brand-hero-to))] text-white shadow-[0_14px_30px_rgba(37,99,235,0.22)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(37,99,235,0.28)]",
  secondary:
    "border border-[color:var(--border-strong)] bg-white text-slate-950 hover:border-[color:var(--brand-border-strong)] hover:bg-[color:var(--brand-soft)]",
  ghost: "bg-transparent text-slate-700 hover:bg-[color:var(--brand-soft)] hover:text-slate-950",
  danger: "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
};

const baseClasses =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55 focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)] focus:ring-offset-2";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props} />;
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
};

export function ButtonLink({ className = "", variant = "primary", href, children, ...props }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}
