"use client";

import { useEffect } from "react";
import { animate } from "motion";

/** Eased navigation for on-page links, with native anchors as the no-JS fallback. */
export function AnchorScroll() {
  useEffect(() => {
    let current: { stop: () => void } | null = null;

    const stop = () => {
      current?.stop();
      current = null;
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      )
        return;

      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || link.classList.contains("skip-link")) return;
      const hash = link.getAttribute("href");
      const section = hash && document.getElementById(hash.slice(1));
      if (!hash || !section) return;

      event.preventDefault();
      stop();

      const headerHeight =
        document.querySelector(".site-header")?.getBoundingClientRect()
          .height ?? 0;
      const target = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          window.scrollY +
            section.getBoundingClientRect().top -
            headerHeight -
            12,
        ),
      );

      window.history.pushState(null, "", hash);
      current = animate(window.scrollY, target, {
        duration: 1.05,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (value) => window.scrollTo(0, value),
      });
      const animation = current;
      Promise.resolve(animation).then(() => {
        if (current !== animation) return;
        const heading = section.querySelector<HTMLElement>("h1, h2");
        if (heading) {
          heading.tabIndex = -1;
          heading.focus({ preventScroll: true });
        }
        current = null;
      });
    };

    document.addEventListener("click", onClick);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    return () => {
      stop();
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, []);

  return null;
}
