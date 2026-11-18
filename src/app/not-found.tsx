import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="site-main">
      <Container className="py-20 lg:py-32">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="section-heading mt-3 font-semibold">Page not found</h1>
        <p className="mt-4 text-muted">The page you requested could not be found.</p>
        <div className="mt-7"><Button href="/#work">Back to Work</Button></div>
      </Container>
    </main>
  );
}
