import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-slate-950 text-white shadow-sm shadow-slate-950/10 hover:bg-slate-800",
  secondary: "border border-slate-300 bg-white text-slate-950 hover:border-slate-400 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950",
  danger: "bg-red-50 text-red-700 hover:bg-red-100"
};

const baseClasses =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2";

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
