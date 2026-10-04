"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "./router";

export function GsapProvider({ children }: { children: ReactNode }) {
  const { route } = useRouter();

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      try {
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");
        // GSAP v3 exports registerPlugin and context as named exports.
        // The default export also exposes them, but TypeScript sees the
        // module shape as the namespace. Use whichever is available.
        const gsap = ((gsapModule as { gsap?: unknown; default?: unknown }).gsap ||
          (gsapModule as { default?: unknown }).default ||
          gsapModule) as {
          registerPlugin: (...args: unknown[]) => void;
          context: (fn: () => void) => { revert: () => void };
          set: (target: unknown, vars: Record<string, unknown>) => void;
          to: (target: unknown, vars: Record<string, unknown>) => void;
        };
        const ScrollTrigger = (scrollTriggerModule as { ScrollTrigger?: unknown; default?: unknown })
          .ScrollTrigger || scrollTriggerModule.default || scrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);

        if (cancelled) return;

        const ctx = gsap.context(() => {
          // Reveal: any [data-animate] element fades/rises when it enters view
          const reveals = document.querySelectorAll<HTMLElement>("[data-animate]");
          reveals.forEach((el) => {
            const variant = el.dataset.animate || "rise";
            const delay = parseFloat(el.dataset.delay || "0");
            const fromVars: Record<string, unknown> = { opacity: 0 };
            if (variant === "rise") fromVars.y = 28;
            if (variant === "slide-left") fromVars.x = -40;
            if (variant === "slide-right") fromVars.x = 40;
            if (variant === "scale") {
              fromVars.scale = 0.94;
              fromVars.y = 16;
            }
            if (variant === "fade") fromVars.y = 0;

            gsap.set(el, fromVars);
            gsap.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.95,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 86%",
                toggleActions: "play none none reverse",
              },
            });
          });

          // Parallax: [data-parallax] elements move slightly slower than scroll
          document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
            const speed = parseFloat(el.dataset.parallax || "0.18");
            gsap.to(el, {
              y: () => -window.innerHeight * speed,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          });

          // Stagger groups: [data-animate-stagger] children fade in sequence
          document.querySelectorAll<HTMLElement>("[data-animate-stagger]").forEach((parent) => {
            const children = Array.from(parent.querySelectorAll<HTMLElement>("[data-stagger-child]"));
            if (children.length === 0) return;
            gsap.set(children, { opacity: 0, y: 24 });
            gsap.to(children, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: parent,
                start: "top 84%",
                toggleActions: "play none none reverse",
              },
            });
          });
        });

        cleanup = () => ctx.revert();
      } catch (err) {
        console.error("[GsapProvider] failed to init", err);
      }
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [route]);

  return <>{children}</>;
}
