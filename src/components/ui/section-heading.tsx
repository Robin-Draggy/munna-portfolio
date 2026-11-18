import type { ComponentPropsWithoutRef } from "react";

export function SectionHeading({ className = "", ...props }: ComponentPropsWithoutRef<"h2">) {
  return <h2 className={`section-heading font-semibold text-ink ${className}`} {...props} />;
}
