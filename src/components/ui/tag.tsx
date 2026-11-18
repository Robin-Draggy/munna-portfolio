import type { ComponentPropsWithoutRef } from "react";

export function Tag({ className = "", ...props }: ComponentPropsWithoutRef<"span">) {
  return <span className={`inline-flex rounded-md border border-line bg-elevated px-2.5 py-1 font-mono text-xs leading-relaxed text-accent ${className}`} {...props} />;
}
