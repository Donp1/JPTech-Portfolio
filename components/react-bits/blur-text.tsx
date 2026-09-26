"use client";

// Adapted from React Bits BlurText (David Haz). See LICENSE.md in this folder.
import { motion } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useReducedMotionPreference } from "@/components/use-reduced-motion-preference";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  direction?: "top" | "bottom";
};

export function BlurText({
  text,
  className = "",
  delay = 75,
  direction = "bottom",
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);
  const reduceMotion = useReducedMotionPreference();
  const words = text.split(" ");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={ref} className={`react-bits-blur-text ${className}`}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <motion.span
            className="react-bits-blur-text__word"
            initial={{
              opacity: 0,
              filter: "blur(8px)",
              y: direction === "top" ? -18 : 18,
            }}
            animate={
              inView || reduceMotion
                ? { opacity: 1, filter: "blur(0px)", y: 0 }
                : undefined
            }
            transition={{
              duration: reduceMotion ? 0 : 0.62,
              delay: reduceMotion ? 0 : 0.45 + (index * delay) / 1000,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </p>
  );
}
