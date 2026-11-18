import Image from "next/image";
import type { Project } from "@/data/projects";
import { ProjectPreview } from "./project-preview";
import { VideoPreview } from "./video-preview";

export function ProjectMedia({ project, sizes }: { project: Project; sizes: string }) {
  if (project.videoId !== null) {
    return (
      <VideoPreview
        videoId={project.videoId}
        title={project.videoTitle}
        poster={project.image}
        sizes={sizes}
      />
    );
  }

  if (!project.image) return <ProjectPreview />;

  return (
    <div className="relative aspect-video overflow-hidden bg-canvas">
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        sizes={sizes}
        className="object-contain motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]"
      />
    </div>
  );
}
