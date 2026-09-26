"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotionPreference } from "@/components/use-reduced-motion-preference";

// Adapted for this site's small wordmark from React Bits Fuzzy Text.
// https://reactbits.dev/text-animations/fuzzy-text
type FuzzyTextProps = {
  text: string;
  children: ReactNode;
  className?: string;
  baseIntensity?: number;
  hoverIntensity?: number;
};

export function FuzzyText({
  text,
  children,
  className = "",
  baseIntensity = 0,
  hoverIntensity = 2.3,
}: FuzzyTextProps) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourceRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef(0);
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotionPreference();

  const prepare = useCallback(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const styles = getComputedStyle(host);
    const width = Math.ceil(host.getBoundingClientRect().width + 16);
    const height = Math.ceil(host.getBoundingClientRect().height + 16);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const source = document.createElement("canvas");
    source.width = canvas.width;
    source.height = canvas.height;
    const context = source.getContext("2d");
    if (!context) return;
    context.scale(dpr, dpr);
    context.font = `${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
    context.letterSpacing = styles.letterSpacing;
    context.textBaseline = "middle";
    const gradient = context.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#f5f0e9");
    gradient.addColorStop(0.58, "#ead2bd");
    gradient.addColorStop(1, "#e9905b");
    context.fillStyle = gradient;
    context.fillText(text, 8, height / 2 + 1);
    sourceRef.current = source;
  }, [text]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new ResizeObserver(prepare);
    observer.observe(host);
    document.fonts.ready.then(prepare);
    prepare();
    return () => observer.disconnect();
  }, [prepare]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !active || reduceMotion) return;
    let lastFrame = 0;
    const draw = (time: number) => {
      if (time - lastFrame >= 1000 / 30) {
        const source = sourceRef.current;
        if (source) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const stripHeight = Math.max(2, Math.round(2 * dpr));
          context.clearRect(0, 0, canvas.width, canvas.height);
          for (let y = 0; y < canvas.height; y += stripHeight) {
            const displacement =
              (Math.sin(y * 0.29 + time * 0.026) +
                Math.sin(y * 0.11 - time * 0.019)) *
              hoverIntensity *
              dpr;
            context.drawImage(
              source,
              0,
              y,
              source.width,
              stripHeight,
              displacement,
              y,
              source.width,
              stripHeight,
            );
          }
        }
        lastFrame = time;
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active, hoverIntensity, reduceMotion]);

  return (
    <span
      ref={hostRef}
      className={`react-bits-fuzzy-text ${className}`.trim()}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      data-base-intensity={baseIntensity}
    >
      {children}
      <canvas
        ref={canvasRef}
        className={`react-bits-fuzzy-text__canvas${active && !reduceMotion ? " is-active" : ""}`}
        aria-hidden="true"
      />
    </span>
  );
}
