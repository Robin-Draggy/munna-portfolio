import { FeaturedProject } from "@/components/projects/featured-project";
import { ProjectCard } from "@/components/projects/project-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { secondaryProjects } from "@/data/projects";

export function SelectedWork() {
  return (
    <section id="work" tabIndex={-1} aria-labelledby="work-heading" className="section border-t border-line">
      <Container>
        <p className="mb-5 font-mono text-xs font-medium tracking-[0.15em] text-accent">02 / SELECTED WORK</p>
        <SectionHeading data-motion-heading id="work-heading" className="max-w-4xl">
          Intelligence in Action.<br />Engineering in Practice.
        </SectionHeading>
        <p className="mt-5 mb-9 max-w-[65ch] text-muted lg:mb-12">
          A selection of real-world AI systems spanning computer vision, agentic AI, workplace monitoring, and conversational interfaces.
        </p>
        <FeaturedProject />
        <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:mt-6 lg:gap-6">
          {secondaryProjects.map((project) => (
            <li key={project.slug} data-motion-project className={project.videoId ? "min-w-0" : "min-w-0 md:col-span-2"}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
