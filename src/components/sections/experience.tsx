import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { journey } from "@/data/experience";
import styles from "./experience.module.css";

export function Experience() {
  return (
    <section id="experience" tabIndex={-1} aria-labelledby="experience-heading" className="section border-t border-line">
      <Container className="design-grid items-start gap-y-8">
        <div className="col-span-4 lg:col-span-5">
          <p className="mb-5 font-mono text-xs font-medium tracking-[0.15em] text-accent">
            03 / PROFESSIONAL JOURNEY
          </p>
          <SectionHeading data-motion-heading id="experience-heading" className="max-w-[15ch] text-balance">
            From Research to Real-World Systems.
          </SectionHeading>
        </div>

        <ol data-motion-rail className={`${styles.timeline} col-span-4 lg:col-span-7`}>
          {journey.map(({ kind, institution, role, start, end, description }) => (
            <li key={institution} className={styles.entry} data-current={end === "Present"}>
              <Card className="p-5 sm:p-6 lg:p-7">
                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Tag>{kind}</Tag>
                  <p className="font-mono text-xs text-muted lg:text-sm">
                    <time dateTime={start.dateTime}>{start.label}</time>
                    <span aria-hidden="true"> – </span><span className="sr-only"> to </span>
                    {end === "Present" ? end : <time dateTime={end.dateTime}>{end.label}</time>}
                  </p>
                </div>
                <h3 className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">{institution}</h3>
                <p className="mt-1 font-medium text-ink">{role}</p>
                {description && <p className="mt-3 max-w-[62ch] text-muted">{description}</p>}
              </Card>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
