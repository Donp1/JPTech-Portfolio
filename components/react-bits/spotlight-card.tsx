"use client";

// Adapted from React Bits SpotlightCard (David Haz). See LICENSE.md in this folder.
import { useRef, type CSSProperties, type ReactNode } from "react";

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(228, 138, 82, 0.15)",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`react-bits-spotlight-card ${className}`}
      style={{ "--spotlight-color": spotlightColor } as CSSProperties}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !ref.current) return;
        const bounds = ref.current.getBoundingClientRect();
        ref.current.style.setProperty(
          "--mouse-x",
          `${event.clientX - bounds.left}px`,
        );
        ref.current.style.setProperty(
          "--mouse-y",
          `${event.clientY - bounds.top}px`,
        );
      }}
    >
      {children}
    </div>
  );
}
