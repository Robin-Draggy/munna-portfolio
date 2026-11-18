import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & { href: string };
type NativeButtonProps = ComponentPropsWithoutRef<"button"> & { href?: never };
type ButtonProps = (LinkButtonProps | NativeButtonProps) & {
  variant?: "primary" | "outline";
};

export function Button({ variant = "primary", ...props }: ButtonProps) {
  const base = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold";
  const appearance = variant === "outline"
    ? "border-line text-ink hover:border-accent hover:text-accent"
    : "border-accent bg-accent text-canvas hover:border-ink hover:bg-ink";
  const className = `${base} ${appearance} ${props.className ?? ""}`;

  if (props.href !== undefined) {
    return <Link {...props} className={className} />;
  }

  return <button type="button" {...props} className={className} />;
}
