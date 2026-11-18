"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HomeMotion({ children }: { children: ReactNode }) {
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = main.current;
    if (!element) return;
    const root: HTMLElement = element;

    const preference = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let stopped = false;
    let dispose: (() => void) | undefined;

    async function configure() {
      if (!preference.matches) {
        dispose?.();
        dispose = undefined;
        return;
      }
      if (dispose) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (stopped || !preference.matches || dispose) return;

      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {}, root);
      const elements = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));
      const desktop = window.matchMedia("(min-width: 64rem)");

      function reveal(target: HTMLElement, from: gsap.TweenVars) {
        ScrollTrigger.create({
          trigger: target,
          start: "top 94%",
          once: true,
          onEnter: () => {
            const { top, bottom } = target.getBoundingClientRect();
            if (bottom <= 0 || top >= window.innerHeight || target.matches(":focus-within")) return;
            context.add(() => gsap.from(target, { duration: 0.62, ease: "power2.out", ...from }));
          },
        });
      }

      context.add(() => {
        if (!window.location.hash && window.scrollY <= 8) {
          gsap.timeline({ defaults: { ease: "power2.out" } })
            .from(elements("[data-motion-hero-label]"), { opacity: 0, duration: 0.3 }, 0)
            .from(elements("[data-motion-hero-name]"), { y: 14, opacity: 0, duration: 0.5 }, 0.07)
            .from(elements("[data-motion-hero-text]"), { y: 19, opacity: 0, duration: 0.56, stagger: 0.09 }, 0.15)
            .from(elements("[data-motion-hero-experience]"), { opacity: 0, duration: 0.4 }, 0.27)
            .from(elements("[data-motion-hero-action]"), { y: 8, opacity: 0, duration: 0.4, stagger: 0.065 }, 0.32)
            .from(elements("[data-motion-hero-social]"), { y: 7, opacity: 0, duration: 0.3, stagger: 0.045 }, 0.43)
            .from(elements("[data-motion-hero-portrait]"), {
              clipPath: "inset(10% 0% 16% 0%)", opacity: 0.4, duration: 0.68,
            }, 0.18);
        }

        const hero = root.querySelector("#home");
        if (hero && desktop.matches) {
          gsap.to(elements("[data-motion-hero-scroll]"), {
            opacity: 0.86,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "bottom 93%", end: "bottom 42%", scrub: true },
          });
        }

        elements("[data-motion-heading]").forEach((target) => reveal(target, { y: 24, opacity: 0 }));
        elements("[data-motion-project]").forEach((target, index) => {
          reveal(target, { y: 20, opacity: 0.25, delay: desktop.matches ? (index % 2) * 0.08 : 0 });
        });


        const rail = root.querySelector<HTMLElement>("[data-motion-rail]");
        if (rail) {
          gsap.fromTo(rail, { "--journey-progress": 0 }, {
            "--journey-progress": 1,
            ease: "none",
            scrollTrigger: { trigger: rail, start: "top 84%", end: "bottom 61%", scrub: 0.22 },
          });
        }

        const particles = root.querySelector<HTMLElement>("[data-motion-particles]");
        if (particles?.parentElement && desktop.matches) {
          gsap.fromTo(particles, { y: 12 }, {
            y: -14,
            ease: "none",
            scrollTrigger: { trigger: particles.parentElement, start: "top bottom", end: "bottom 55%", scrub: true },
          });
        }
      });

      let frame = 0;
      const observer = new ResizeObserver(() => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          ScrollTrigger.refresh();
        });
      });
      observer.observe(root);

      dispose = () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        context.revert();
      };
    }

    function sync() {
      // A failed animation chunk leaves the server-rendered page usable.
      void configure().catch(() => {});
    }

    sync();
    preference.addEventListener("change", sync);

    return () => {
      stopped = true;
      preference.removeEventListener("change", sync);
      dispose?.();
    };
  }, []);

  return <main ref={main} id="main-content" className="site-main" tabIndex={-1}>{children}</main>;
}
