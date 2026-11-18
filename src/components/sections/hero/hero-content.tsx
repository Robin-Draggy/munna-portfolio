import { portfolio } from "@/data/portfolio";
import styles from "./hero.module.css";

export function HeroContent() {
  const { name, role } = portfolio.hero;

  return (
    <div className={styles.intro} data-motion-hero-scroll>
      <p data-motion-hero-label className="font-mono text-xs font-medium tracking-[0.2em] text-accent">
        {role}
      </p>
      <p data-motion-hero-name className={styles.name}>{name}</p>
      <h1 id="hero-heading" className={styles.headline}>
        <span data-motion-hero-text>Applied</span>{" "}
        <span data-motion-hero-text className="text-accent">AI.</span>
      </h1>
    </div>
  );
}
