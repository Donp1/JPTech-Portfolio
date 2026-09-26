"use client";

// Adapted from React Bits True Focus for the JPTECH hero headline.
// https://github.com/DavidHDev/react-bits/tree/main/src/ts-tailwind/TextAnimations/TrueFocus
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotionPreference } from "@/components/use-reduced-motion-preference";

type FocusRect = { x: number; y: number; width: number; height: number };

type TrueFocusProps = {
  words: readonly string[];
  className?: string;
  ariaLabel: string;
  accentStart?: number;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  blurAmount?: number;
};

export function TrueFocus({
  words,
  className = "",
  ariaLabel,
  accentStart = words.length,
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.05,
  blurAmount = 0.45,
}: TrueFocusProps) {
  const reduceMotion = useReducedMotionPreference();
  const containerRef = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [focusRect, setFocusRect] = useState<FocusRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const activeIndex = hoveredIndex ?? currentIndex;

  useEffect(() => {
    if (!ready || words.length < 2) return;
    const interval = window.setInterval(
      () => setCurrentIndex((index) => (index + 1) % words.length),
      (animationDuration + pauseBetweenAnimations) * 1000,
    );
    return () => window.clearInterval(interval);
  }, [animationDuration, pauseBetweenAnimations, ready, words.length]);

  useEffect(() => {
    const container = containerRef.current;
    const word = wordRefs.current[activeIndex];
    if (!container || !word) return;

    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      const containerRect = container.getBoundingClientRect();
      const wordRect = word.getBoundingClientRect();
      setFocusRect({
        x: wordRect.left - containerRect.left,
        y: wordRect.top - containerRect.top,
        width: wordRect.width,
        height: wordRect.height,
      });
      setReady(true);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(word);
    window.addEventListener("resize", measure);
    const frame = requestAnimationFrame(measure);
    document.fonts.ready.then(measure);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [activeIndex]);

  return (
    <h1
      ref={containerRef}
      className={`react-bits-true-focus ${className}`.trim()}
      aria-label={ariaLabel}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            ref={(element) => {
              wordRefs.current[index] = element;
            }}
            className={`react-bits-true-focus__word hero-word${index >= accentStart ? " hero-word--accent" : ""}`}
            style={{
              filter:
                ready && index !== activeIndex
                  ? `blur(${blurAmount}px)`
                  : "blur(0px)",
              transition: `filter ${animationDuration}s ease`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.span
              initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.75,
                delay: 0.12 + index * 0.075,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>{" "}
        </span>
      ))}
      <motion.span
        className="react-bits-true-focus__frame"
        aria-hidden="true"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: ready ? 1 : 0,
        }}
        transition={{ duration: animationDuration, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="react-bits-true-focus__corner react-bits-true-focus__corner--tl" />
        <span className="react-bits-true-focus__corner react-bits-true-focus__corner--tr" />
        <span className="react-bits-true-focus__corner react-bits-true-focus__corner--bl" />
        <span className="react-bits-true-focus__corner react-bits-true-focus__corner--br" />
      </motion.span>
    </h1>
  );
}
