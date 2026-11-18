import { featuredProject } from "@/data/projects";
import { ProjectCard } from "./project-card";

export function FeaturedProject() {
  return (
    <div data-motion-project>
      <ProjectCard project={featuredProject} />
    </div>
  );
}
