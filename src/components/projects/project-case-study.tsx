import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/data/projects";
import { ProjectCTA } from "./project-cta";
import { ProjectMedia } from "./project-media";
import { ProjectProcess } from "./project-process";

function ProjectNeighbor({ project, direction }: { project: Project; direction: "Previous" | "Next" }) {
  const Icon = direction === "Previous" ? ArrowLeft : ArrowRight;
  return (
    <Link href={`/projects/${project.slug}`} className="flex items-center justify-between gap-4 rounded-xl border border-line bg-panel p-5 hover:border-accent">
      <div>
        <span className="block font-mono text-xs text-accent">{direction} project</span>
        <span className="mt-1 block font-semibold">{project.title}</span>
      </div>
      <Icon size={18} className="shrink-0 text-accent" aria-hidden="true" />
    </Link>
  );
}

export function ProjectCaseStudy({ project, previous, next }: { project: Project; previous?: Project; next?: Project }) {
  return (
    <main id="main-content" tabIndex={-1} className="site-main">
      <Container className="pt-9 pb-16 lg:pt-14 lg:pb-24">
        <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:underline">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Work
        </Link>

        <article className="mt-7" aria-labelledby="project-title">
          <header>
            <p className="font-mono text-xs font-medium tracking-[0.15em] text-accent uppercase">{project.category}</p>
            <h1 id="project-title" className="section-heading mt-4 max-w-[22ch] font-semibold text-balance">{project.title}</h1>
            <div className="mt-5 max-w-[65ch] space-y-3 text-muted">
              {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {project.externalLink && <div className="mt-5"><ProjectCTA project={project} /></div>}
          </header>
          <section aria-label={project.videoId ? "Project demonstration" : "Project visualization"} className="mt-9 max-w-5xl overflow-hidden rounded-[18px] border border-line lg:mt-12">
            <ProjectMedia project={project} sizes="(min-width: 1120px) 1024px, 94vw" />
          </section>
          <div className="mt-12 space-y-10 lg:mt-16 lg:space-y-14">
            <section aria-labelledby="project-problem">
              <h2 id="project-problem" className="text-2xl font-semibold tracking-tight lg:text-3xl">Problem</h2>
              <p className="mt-3 max-w-[65ch] text-muted">{project.problem}</p>
            </section>
            <section aria-labelledby="project-process">
              <h2 id="project-process" className="text-2xl font-semibold tracking-tight lg:text-3xl">Technical process</h2>
              <ProjectProcess steps={project.process} />
            </section>
            <section aria-labelledby="project-stack">
              <h2 id="project-stack" className="text-2xl font-semibold tracking-tight lg:text-3xl">Technology stack</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((technology) => <li key={technology}><Tag>{technology}</Tag></li>)}
              </ul>
            </section>
          </div>
        </article>

        <nav aria-label="Project navigation" className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2 lg:mt-20">
          {previous && <ProjectNeighbor project={previous} direction="Previous" />}
          {next && <div className="sm:col-start-2"><ProjectNeighbor project={next} direction="Next" /></div>}
        </nav>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-line bg-elevated p-6 lg:p-8">
          <p className="text-lg font-semibold">Want to discuss this project?</p>
          <Button href="/#contact">Get in Touch <ArrowRight size={16} aria-hidden="true" /></Button>
        </div>
      </Container>
    </main>
  );
}
