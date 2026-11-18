import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/projects/project-case-study";
import { portfolio } from "@/data/portfolio";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return {
    title: project.title,
    description: project.description[0],
    openGraph: {
      type: "website",
      title: `${project.title} | ${portfolio.name}`,
      description: project.description[0],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  return <ProjectCaseStudy project={projects[index]} previous={projects[index - 1]} next={projects[index + 1]} />;
}
