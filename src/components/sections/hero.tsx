import { statSync } from "node:fs";
import { join } from "node:path";
import { portfolio } from "@/data/portfolio";
import { Container } from "@/components/ui/container";
import { HeroActions } from "./hero/hero-actions";
import { HeroContent } from "./hero/hero-content";
import { HeroPortrait } from "./hero/hero-portrait";
import { SocialLinks } from "./hero/social-links";
import styles from "./hero/hero.module.css";

export function Hero() {
  const resume = statSync(join(process.cwd(), "public", "resume.pdf"), { throwIfNoEntry: false });

  return (
    <section id="home" tabIndex={-1} aria-labelledby="hero-heading" className={styles.hero}>
      <Container className={styles.layout}>
        <HeroContent />
        <HeroPortrait />
        <p data-motion-hero-experience className={styles.experience}>{portfolio.hero.experience}</p>
        <HeroActions resumeHref={resume?.isFile() ? "/resume.pdf" : undefined} />
        <SocialLinks />
      </Container>
    </section>
  );
}
