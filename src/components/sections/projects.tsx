import { ProjectCard } from "@/components/projects/project-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProject, secondaryProjects } from "@/data/projects";

export function Projects() {
  return (
    <section id="work" tabIndex={-1} aria-labelledby="work-heading" className="section border-t border-line">
      <Container>
        <p className="mb-5 font-mono text-xs font-medium tracking-[0.15em] text-accent">03 / SELECTED WORK</p>
        <SectionHeading data-motion-heading id="work-heading" className="mb-8 max-w-[17ch] text-balance lg:mb-12">
          Real-World AI. Measurable Impact.
        </SectionHeading>
        <div data-motion-project><ProjectCard project={featuredProject} featured /></div>
        <ul className="mt-5 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {secondaryProjects.map((project) => <li key={project.slug} data-motion-project><ProjectCard project={project} /></li>)}
        </ul>
      </Container>
    </section>
  );
}
