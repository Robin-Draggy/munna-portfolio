import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExpertiseControls } from "./expertise-controls";

export function Expertise() {
  return (
    <section id="expertise" tabIndex={-1} aria-labelledby="expertise-heading" className="section border-t border-line">
      <Container className="grid items-start gap-7 lg:grid-cols-[minmax(0,25fr)_minmax(0,40fr)_minmax(0,35fr)]">
        <div>
          <p className="mb-4 font-mono text-xs font-medium tracking-[0.15em] text-accent">EXPERTISE</p>
          <SectionHeading data-motion-heading id="expertise-heading" className="text-balance lg:text-[clamp(30px,2.65vw,42px)]">
            A Practical Mix of AI, Engineering, and Deployment.
          </SectionHeading>
        </div>
        <ExpertiseControls />
      </Container>
    </section>
  );
}
