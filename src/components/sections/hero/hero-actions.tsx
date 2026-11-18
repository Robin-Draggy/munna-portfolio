import { ArrowDownRight, FileText } from "lucide-react";
import styles from "./hero.module.css";

export function HeroActions({ resumeHref }: { resumeHref?: string }) {
  return (
    <div className={styles.actions}>
      <a href="#work" data-motion-hero-action className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-accent bg-accent px-6 py-2.5 text-sm font-semibold text-canvas hover:border-ink hover:bg-ink">
        My Works <ArrowDownRight size={17} aria-hidden="true" />
      </a>
      {resumeHref ? (
        <a data-motion-hero-action href={resumeHref} target="_blank" rel="noopener noreferrer" className={styles.resume}>
          <FileText size={16} aria-hidden="true" /> View Resume
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <button data-motion-hero-action type="button" disabled title="Resume PDF unavailable" className={styles.resume}>
          <FileText size={16} aria-hidden="true" /> View Resume
          <span className="sr-only"> — PDF unavailable</span>
        </button>
      )}
    </div>
  );
}
