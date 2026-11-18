import type { ComponentPropsWithoutRef } from "react";

export function Card({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={`rounded-[18px] border border-line bg-panel ${className}`} {...props} />;
}
