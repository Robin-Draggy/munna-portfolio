import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";
import styles from "./contact.module.css";

export function Contact() {
  const { email, github, phone } = portfolio.contact;

  return (
    <section id="contact" tabIndex={-1} aria-labelledby="contact-heading" className={`${styles.section} border-t border-line`}>
      <Container>
        <div className={styles.panel}>
          <div className={styles.particles} data-motion-particles aria-hidden="true" />
          <div className="relative">
            <p className="mb-5 font-mono text-xs font-medium tracking-[0.15em] text-accent">
              05 / ESTABLISH CONNECTION
            </p>
            <SectionHeading data-motion-heading id="contact-heading" className={styles.heading}>
              Have a Challenge?
              <span className="block text-accent">Let&apos;s Solve It with AI.</span>
            </SectionHeading>
            <p className="mt-5 max-w-[52ch] text-muted">
              Open to discussing AI engineering opportunities, projects, and collaborations.
            </p>
            <address className="mt-8 flex flex-col items-start gap-3 not-italic sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={`mailto:${email}`} className="w-full sm:w-auto">
                <Mail size={16} aria-hidden="true" /> Start a Conversation
              </Button>
              <Button href={github} variant="outline">
                View GitHub <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
              <a href={phone.href} className="inline-flex min-h-11 items-center gap-2 px-1.5 font-mono text-sm text-muted hover:text-accent">
                <Phone size={15} aria-hidden="true" /> {phone.label}
              </a>
            </address>
          </div>
        </div>
      </Container>
    </section>
  );
}
