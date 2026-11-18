import type { Project } from "@/data/projects";
import { ProjectPreview } from "./project-preview";
import { VideoPreview } from "./video-preview";

export function ProjectMedia({ project, sizes }: { project: Project; sizes: string }) {
  return project.videoId ? (
    <VideoPreview
      videoId={project.videoId}
      title={project.videoTitle}
      poster={project.image}
      sizes={sizes}
    />
  ) : <ProjectPreview />;
}
