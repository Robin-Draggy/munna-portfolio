import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { portfolio } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="flex min-h-[72px] flex-wrap items-center justify-between gap-x-5 gap-y-1 py-3 font-mono text-xs text-muted">
        <p className="tracking-wide uppercase">{portfolio.name} — {portfolio.location}</p>
        <a href="#main-content" className="inline-flex min-h-11 items-center gap-2 hover:text-accent">
          Back to top <ArrowUp size={15} aria-hidden="true" />
        </a>
      </Container>
    </footer>
  );
}
