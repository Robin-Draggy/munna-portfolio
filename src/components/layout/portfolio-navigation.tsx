"use client";

import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";

const navigation = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "expertise", label: "Expertise" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof navigation)[number]["id"];

function NavigationLinks({ active, onSelect }: { active: SectionId | null; onSelect?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className="nav-links">
      {navigation.map(({ id, label }) => (
        <li key={id}>
          <a
            className="nav-link"
            href={`${pathname === "/" ? "" : "/"}#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={onSelect}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ResumeLink({ href, onSelect }: { href: string; onSelect?: () => void }) {
  return (
    <a
      href={href}
      download
      onClick={onSelect}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line px-3.5 text-sm font-medium whitespace-nowrap text-ink hover:border-accent hover:text-accent"
    >
      Download Resume <Download size={16} aria-hidden="true" />
    </a>
  );
}

export function PortfolioNavigation({ resumeHref }: { resumeHref?: string }) {
  const pathname = usePathname();
  const [active, setActive] = useState<SectionId>("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = navigation.flatMap(({ id }) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });
    let frame = 0;

    function update() {
      frame = 0;
      const root = document.documentElement;
      const offset = parseFloat(getComputedStyle(root).scrollPaddingTop) + 1;
      const atEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= root.scrollHeight - 2;
      let current: SectionId = "home";
      for (const { id, element } of sections) {
        if (element.getBoundingClientRect().top <= offset) current = id;
      }
      setScrolled(window.scrollY > 8);
      setActive(atEnd ? "contact" : current);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(document.body);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    update();
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia("(min-width: 64rem)");
    function closeOnDesktop() {
      if (desktop.matches) setOpen(false);
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggle.current?.focus();
      }
    }

    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", handleKey);
    panel.current?.querySelector("a")?.focus();
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function dismissMenu() {
    setOpen(false);
    toggle.current?.focus();
  }

  return (
    <header
      className="site-header"
      data-scrolled={scrolled}
      data-menu-open={open}
      onBlur={(event) => {
        if (open && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      {open && <div className="nav-backdrop lg:hidden" aria-hidden="true" onClick={dismissMenu} />}
      <Container className="relative z-10 flex h-full items-center justify-between gap-8">
        <a
          href={pathname === "/" ? "#home" : "/#home"}
          aria-label="Md. Mehedi Hasan, home"
          className="inline-flex min-h-11 shrink-0 items-center font-mono text-lg font-semibold tracking-tight text-ink hover:text-accent"
          onClick={() => setOpen(false)}
        >
          M <span className="mx-1.5 text-accent">/</span> H<span className="text-accent">.</span>
        </a>

        <div className="ml-auto hidden items-center gap-8 lg:flex">
          <nav aria-label="Main navigation">
            <NavigationLinks active={pathname === "/" ? active : null} />
          </nav>
          {resumeHref && <ResumeLink href={resumeHref} />}
        </div>

        <button
          ref={toggle}
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="grid size-11 place-items-center rounded-lg border border-line text-ink hover:text-accent lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </Container>

      <nav
        ref={panel}
        id="mobile-navigation"
        className="mobile-navigation lg:hidden"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
      >
        <Container className="py-4">
          <NavigationLinks active={pathname === "/" ? active : null} onSelect={() => setOpen(false)} />
          {resumeHref && <div className="mt-4"><ResumeLink href={resumeHref} onSelect={dismissMenu} /></div>}
        </Container>
      </nav>
    </header>
  );
}
