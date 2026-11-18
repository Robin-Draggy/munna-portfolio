import Image from "next/image";
import { AudioLines, Boxes, ScanLine, Workflow } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";
import portrait from "../../../public/images/mehedi-hasan.jpeg";
import styles from "./about/about.module.css";

const highlights = [
  { title: "Computer Vision", detail: "Vehicle recognition and tracking", icon: ScanLine },
  { title: "LLMs & AI Agents", detail: "Retrieval and task-focused agents", icon: Workflow },
  { title: "Voice AI", detail: "Bangla–English voice agents", icon: AudioLines },
  { title: "AI Deployment", detail: "Model deployment and API integration", icon: Boxes },
];

export function About() {
  return (
    <section id="about" tabIndex={-1} aria-labelledby="about-heading" className="section border-t border-line">
      <Container className={`design-grid ${styles.layout}`}>
        <div className={styles.intro}>
          <p className="mb-5 font-mono text-xs font-medium tracking-[0.15em] text-accent">02 / ABOUT</p>
          <SectionHeading data-motion-heading id="about-heading" className={styles.heading}>
            The Engineer Behind the Intelligence
          </SectionHeading>
          <p data-motion-copy className="mt-6 max-w-[62ch] text-muted">{portfolio.about}</p>
        </div>

        <Card className={styles.portraitCard}>
          <div data-motion-portrait className={styles.portraitMask}>
            <Image
              src={portrait}
              alt={`Portrait of ${portfolio.name}`}
              fill
              sizes="(min-width: 1408px) 490px, (min-width: 1024px) calc(42vw - 70px), (min-width: 560px) 502px, calc(100vw - 56px)"
              className={styles.portrait}
            />
          </div>
        </Card>

        <ul aria-label="Areas of expertise" className={styles.highlights}>
          {highlights.map(({ title, detail, icon: Icon }) => (
            <li key={title} data-motion-highlight>
              <Card className="flex h-full items-start gap-3 p-4 lg:p-5">
                <Icon size={19} strokeWidth={1.6} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="text-base leading-snug font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{detail}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
