import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import portrait from "../../../../public/images/mehedi-hasan.jpeg";
import styles from "./hero.module.css";

export function HeroPortrait() {
  return (
    <div className={styles.visual} data-motion-hero-scroll>
      <figure data-motion-hero-portrait className={styles.portrait}>
        <Image
          src={portrait}
          alt={`Portrait of ${portfolio.hero.name}`}
          fill
          preload
          sizes="(min-width: 1024px) 390px, (min-width: 420px) 280px, 72vw"
          className={styles.photo}
        />
      </figure>
    </div>
  );
}
