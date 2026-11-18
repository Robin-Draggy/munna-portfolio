import { statSync } from "node:fs";
import { join } from "node:path";
import { PortfolioNavigation } from "./portfolio-navigation";

export function SiteHeader() {
  const resume = statSync(join(process.cwd(), "public", "resume.pdf"), {
    throwIfNoEntry: false,
  });

  return <PortfolioNavigation resumeHref={resume?.isFile() ? "/resume.pdf" : undefined} />;
}
