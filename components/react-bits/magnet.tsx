"use client";

// Adapted from React Bits Magnet (David Haz). See LICENSE.md in this folder.
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotionPreference } from "@/components/use-reduced-motion-preference";

export function Magnet({
  children,
  padding = 70,
  strength = 5,
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionPreference();

  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !wrapper.current || !inner.current)
        return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!wrapper.current || !inner.current) return;
        const rect = wrapper.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const nearby =
          Math.abs(event.clientX - centerX) < rect.width / 2 + padding &&
          Math.abs(event.clientY - centerY) < rect.height / 2 + padding;
        const x = nearby ? (event.clientX - centerX) / strength : 0;
        const y = nearby ? (event.clientY - centerY) / strength : 0;
        inner.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, [padding, strength, reduceMotion]);

  return (
    <div ref={wrapper} className="react-bits-magnet">
      <div ref={inner} className="react-bits-magnet__inner">
        {children}
      </div>
    </div>
  );
}
