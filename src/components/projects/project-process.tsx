import { ArrowDown, ArrowRight } from "lucide-react";

export function ProjectProcess({ steps }: { steps: readonly string[] }) {
  return (
    <figure className="mt-6 rounded-[18px] border border-line bg-panel p-5 lg:p-7">
      <figcaption className="mb-5 text-sm text-muted">
        Illustrative process based on the résumé. Exact system architecture was not documented.
      </figcaption>
      <ol className="flex flex-col gap-3 lg:flex-row">
        {steps.map((step, index) => (
          <li key={step} className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center">
            {index > 0 && (
              <>
                <ArrowDown size={16} className="ml-4 text-accent lg:hidden" aria-hidden="true" />
                <ArrowRight size={16} className="hidden shrink-0 text-accent lg:block" aria-hidden="true" />
              </>
            )}
            <div className="flex min-h-18 flex-1 items-center gap-3 self-stretch rounded-lg border border-line bg-canvas p-3">
              <span aria-hidden="true" className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-sm font-medium">{step}</span>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
