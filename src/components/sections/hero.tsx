import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { HeroContent } from "./hero/hero-content";
import { VisionDemo } from "./hero/vision-demo";
import styles from "./hero/hero.module.css";

export function Hero() {
  return (
    <section id="home" tabIndex={-1} aria-labelledby="hero-heading">
      <Container className={styles.layout}>
        <HeroContent />
        <VisionDemo />
        <a href="#about" className={styles.scrollCue}>
          <ArrowDown size={14} aria-hidden="true" /> Scroll to explore
        </a>
      </Container>
    </section>
  );
}
