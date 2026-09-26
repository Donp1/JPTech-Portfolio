"use client";

import { motion } from "motion/react";
import { useReducedMotionPreference } from "@/components/use-reduced-motion-preference";
import { FuzzyText } from "@/components/react-bits/fuzzy-text";

export function Brand({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotionPreference();
  return (
    <motion.span
      className="brand-motion"
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.035,
              textShadow: "0 0 24px rgba(63, 172, 255, .45)",
            }
      }
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <FuzzyText
        text="JPTECH."
        className={`brand-mark ${compact ? "brand-mark--compact" : ""}`}
      >
        JP<span className="brand-mark__tech">TECH</span>
        <span className="brand-mark__dot">.</span>
      </FuzzyText>
    </motion.span>
  );
}
