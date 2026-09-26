"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotionPreference } from "@/components/use-reduced-motion-preference";

// Adapted for this site from React Bits Electric Border (MIT + Commons Clause).
// https://github.com/DavidHDev/react-bits/tree/main/src/ts-tailwind/Animations/ElectricBorder
type ElectricBorderProps = {
  children: ReactNode;
  className?: string;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  style?: CSSProperties;
};

function pointOnRoundedRect(
  progress: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  const horizontal = width - 2 * r;
  const vertical = height - 2 * r;
  const arc = (Math.PI * r) / 2;
  const perimeter = 2 * (horizontal + vertical) + 4 * arc;
  let distance = progress * perimeter;

  const parts = [
    horizontal,
    arc,
    vertical,
    arc,
    horizontal,
    arc,
    vertical,
    arc,
  ];
  for (let segment = 0; segment < parts.length; segment++) {
    if (distance <= parts[segment]) {
      if (segment % 2 === 0) {
        const fraction = parts[segment] ? distance / parts[segment] : 0;
        switch (segment) {
          case 0:
            return { x: r + fraction * horizontal, y: 0, nx: 0, ny: -1 };
          case 2:
            return { x: width, y: r + fraction * vertical, nx: 1, ny: 0 };
          case 4:
            return {
              x: width - r - fraction * horizontal,
              y: height,
              nx: 0,
              ny: 1,
            };
          default:
            return { x: 0, y: height - r - fraction * vertical, nx: -1, ny: 0 };
        }
      }
      const fraction = parts[segment] ? distance / parts[segment] : 0;
      const angle =
        -Math.PI / 2 +
        Math.floor(segment / 2) * (Math.PI / 2) +
        fraction * (Math.PI / 2);
      const centers = [
        { x: width - r, y: r },
        { x: width - r, y: height - r },
        { x: r, y: height - r },
        { x: r, y: r },
      ];
      const center = centers[Math.floor(segment / 2)];
      return {
        x: center.x + Math.cos(angle) * r,
        y: center.y + Math.sin(angle) * r,
        nx: Math.cos(angle),
        ny: Math.sin(angle),
      };
    }
    distance -= parts[segment];
  }
  return { x: r, y: 0, nx: 0, ny: -1 };
}

export function ElectricBorder({
  children,
  className = "",
  color = "#72c8ff",
  speed = 1,
  chaos = 0.12,
  borderRadius = 12,
  style,
}: ElectricBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotionPreference();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;

    let visible = false;
    let frame = 0;
    let lastDraw = 0;
    let width = 0;
    let height = 0;
    const padding = 12;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil((width + padding * 2) * dpr);
      canvas.height = Math.ceil((height + padding * 2) * dpr);
      canvas.style.width = `${width + padding * 2}px`;
      canvas.style.height = `${height + padding * 2}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const draw = (time: number) => {
      if (!width || !height) return;
      context.clearRect(0, 0, width + padding * 2, height + padding * 2);
      const t = time * 0.001 * speed;
      const steps = Math.max(120, Math.ceil((width + height) / 5));
      const outline = new Path2D();
      for (let index = 0; index <= steps; index++) {
        const progress = index / steps;
        const point = pointOnRoundedRect(progress, width, height, borderRadius);
        const surge =
          Math.sin(progress * 41 + t * 2.4) *
          Math.sin(progress * 103 - t * 3.1);
        const crackle =
          Math.sin(progress * 251 + t * 8) * Math.sin(progress * 79 - t * 5);
        const offset = reduceMotion ? 0 : (surge * 4 + crackle * 2) * chaos;
        const x = point.x + padding + point.nx * offset;
        const y = point.y + padding + point.ny * offset;
        if (index === 0) outline.moveTo(x, y);
        else outline.lineTo(x, y);
      }
      outline.closePath();
      context.lineJoin = "round";
      context.shadowColor = color;
      context.shadowBlur = 12;
      context.globalAlpha = 0.35;
      context.strokeStyle = color;
      context.lineWidth = 4;
      context.stroke(outline);
      context.shadowBlur = 4;
      context.globalAlpha = 0.9;
      context.lineWidth = 1.35;
      context.stroke(outline);
      context.shadowBlur = 0;
      context.globalAlpha = 1;
    };

    const tick = (time: number) => {
      if (time - lastDraw >= 1000 / 30) {
        draw(time);
        lastDraw = time;
      }
      if (visible && !reduceMotion) frame = requestAnimationFrame(tick);
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        cancelAnimationFrame(frame);
        if (reduceMotion) draw(performance.now());
        else frame = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(frame);
      }
    });
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    intersection.observe(container);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      intersection.disconnect();
      observer.disconnect();
    };
  }, [borderRadius, chaos, color, reduceMotion, speed]);

  return (
    <div
      ref={containerRef}
      className={`react-bits-electric-border ${className}`.trim()}
      style={{ borderRadius, ...style }}
    >
      <canvas
        ref={canvasRef}
        className="react-bits-electric-border__canvas"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
