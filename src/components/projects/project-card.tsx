import { Tag } from "@/components/ui/tag";
import type { Project } from "@/data/projects";
import { ProjectCTA } from "./project-cta";
import { ProjectMedia } from "./project-media";

export function ProjectCard({ project }: { project: Project }) {
  const titleId = `project-${project.slug}`;
  const wide = project.featured || project.videoId === null;
  const sizes = wide
    ? "(min-width: 1408px) 735px, (min-width: 1200px) 54vw, 94vw"
    : "(min-width: 1408px) 650px, (min-width: 768px) 46vw, 94vw";

  return (
    <article
      aria-labelledby={titleId}
      className={`group grid h-full min-w-0 overflow-hidden rounded-[18px] border border-accent/25 bg-elevated hover:border-accent/60 focus-within:border-accent/60 motion-safe:transition-colors ${wide ? "min-[1200px]:grid-cols-[1.3fr_1fr]" : "grid-rows-[auto_1fr]"}`}
    >
      <div className={`min-w-0 bg-canvas ${wide ? "min-[1200px]:grid min-[1200px]:content-center min-[1200px]:border-r min-[1200px]:border-line min-[1200px]:bg-[radial-gradient(ellipse_at_center,var(--surface-elevated),var(--background)_78%)]" : ""}`}>
        <ProjectMedia project={project} sizes={sizes} />
      </div>
      <div className={`flex min-w-0 flex-col p-5 sm:p-7 ${wide ? "min-[1200px]:justify-center min-[1200px]:p-8" : ""}`}>
        <p className="mb-3 font-mono text-[11px] tracking-wider text-accent uppercase">
          {project.id} / {project.category}{project.videoId ? " / VIDEO DEMO" : ""}
        </p>
        <h3 id={titleId} className={`font-semibold leading-tight tracking-tight ${project.featured ? "text-3xl lg:text-4xl" : "text-2xl lg:text-3xl"}`}>
          {project.title}
        </h3>
        <div className="mt-4 max-w-[68ch] space-y-3 leading-relaxed text-muted">
          {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => <li key={technology}><Tag>{technology}</Tag></li>)}
        </ul>
        <div className="mt-auto pt-5">
          <ProjectCTA project={project} caseStudy />
        </div>
      </div>
    </article>
  );
}
