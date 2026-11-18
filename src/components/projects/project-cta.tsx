import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCTA({ project, caseStudy = false }: { project: Project; caseStudy?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {project.externalLink && (
        <a
          href={project.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group/action inline-flex min-h-11 items-center gap-2 rounded-lg border border-line px-3.5 py-2 text-sm font-semibold text-ink hover:border-accent hover:text-accent motion-safe:transition-colors"
        >
          {project.externalLabel}
          <ArrowUpRight size={16} aria-hidden="true" className="shrink-0 motion-safe:transition-transform motion-safe:group-hover/action:-translate-y-0.5" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {caseStudy && (
        <Link href={`/projects/${project.slug}`} aria-label={`View Case Study: ${project.title}`} className="group/case inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent hover:underline">
          View Case Study <ArrowRight size={16} aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover/case:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
