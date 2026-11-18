import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/data/projects";
import { ProjectPreview } from "./project-preview";

export function ProjectResult({ result }: { result: NonNullable<Project["result"]> }) {
  return (
    <div className="mt-5 border-l border-accent/50 pl-4">
      <p className="flex items-center gap-3 font-mono text-xl text-accent">
        <span>{result.from}</span><span className="sr-only">to</span><ArrowRight size={16} aria-hidden="true" /><span>{result.to}</span>
      </p>
      <p className="mt-1 text-sm text-muted">{result.label}</p>
    </div>
  );
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const titleId = `project-${project.slug}`;

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-labelledby={titleId}
      className={`group grid h-full overflow-hidden rounded-[18px] border border-accent/25 bg-elevated hover:border-accent/60 motion-safe:transition-colors ${featured ? "lg:grid-cols-[3fr_2fr]" : "grid-rows-[auto_1fr]"}`}
    >
      <div className="relative min-w-0 overflow-hidden [&>div]:h-full [&_svg]:h-full [&_svg]:object-cover">
        <ProjectPreview preview={project.preview} />
      </div>
      <div className="flex flex-col justify-center p-5 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <h3 id={titleId} className={`font-semibold leading-tight tracking-tight ${featured ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"}`}>
            {project.name}
          </h3>
          <ArrowUpRight size={19} aria-hidden="true" className="mt-1 shrink-0 text-accent motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5" />
        </div>
        <p className="mt-3 text-muted">{project.description}</p>
        {project.result && <ProjectResult result={project.result} />}
        <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => <li key={technology}><Tag>{technology}</Tag></li>)}
        </ul>
      </div>
    </Link>
  );
}
