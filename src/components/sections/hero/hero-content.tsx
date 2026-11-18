import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./hero.module.css";

export function HeroContent() {
  return (
    <>
      <div className={styles.intro}>
        <p className="mb-5 font-mono text-xs font-medium tracking-[0.16em] text-accent">
          AI ENGINEER / DHAKA
        </p>
        <h1 id="hero-heading" className={`hero-heading font-semibold ${styles.headline}`}>
          <span data-motion-hero-text className="inline-block">Building AI</span>{" "}
          <span data-motion-hero-text className="inline-block">for the</span>{" "}
          <span data-motion-hero-text className="inline-block text-accent">Real World.</span>
        </h1>
        <p className="mt-6 max-w-[39ch] text-muted">
          Computer Vision, AI Agents, and intelligent systems built to solve meaningful problems.
        </p>
      </div>
      <div className={styles.actions}>
        <Button href="#work">
          Explore Work <ArrowDownRight size={16} aria-hidden="true" />
        </Button>
        <Button href="#contact" variant="outline">Get in Touch</Button>
      </div>
    </>
  );
}
