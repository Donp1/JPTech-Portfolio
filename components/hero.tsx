"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotionPreference } from "@/components/use-reduced-motion-preference";
import { ArrowDownRight, ArrowUpRight, Asterisk } from "lucide-react";
import { BlurText } from "@/components/react-bits/blur-text";
import { Magnet } from "@/components/react-bits/magnet";
import { TrueFocus } from "@/components/react-bits/true-focus";

const words = ["Building", "what's", "next", "for", "web", "&", "mobile."];

function HeroMesh() {
  const reduceMotion = useReducedMotionPreference();
  const pointX = useMotionValue(0);
  const pointY = useMotionValue(0);
  const x = useSpring(pointX, { stiffness: 70, damping: 20 });
  const y = useSpring(pointY, { stiffness: 70, damping: 20 });
  const rotateX = useTransform(y, [-1, 1], [8, -8]);
  const rotateY = useTransform(x, [-1, 1], [-8, 8]);
  return (
    <div
      className="hero-art"
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
        pointY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        pointX.set(0);
        pointY.set(0);
      }}
    >
      <div className="hero-art__halo" />
      <div className="hero-art__orbit hero-art__orbit--one" />
      <div className="hero-art__orbit hero-art__orbit--two" />
      <motion.div
        className="hero-art__mesh"
        style={reduceMotion ? undefined : { rotateX, rotateY }}
      >
        <svg viewBox="0 0 500 500" fill="none" role="presentation">
          <defs>
            <linearGradient id="meshStroke" x1="0" y1="0" x2="500" y2="500">
              <stop stopColor="#89E1FF" />
              <stop offset=".45" stopColor="#4277FF" />
              <stop offset="1" stopColor="#9B67E7" />
            </linearGradient>
          </defs>
          <circle
            cx="250"
            cy="250"
            r="178"
            stroke="url(#meshStroke)"
            strokeOpacity=".28"
          />
          <circle
            cx="250"
            cy="250"
            r="140"
            stroke="url(#meshStroke)"
            strokeOpacity=".4"
          />
          <ellipse
            cx="250"
            cy="250"
            rx="178"
            ry="64"
            stroke="url(#meshStroke)"
            strokeOpacity=".65"
            transform="rotate(-31 250 250)"
          />
          <ellipse
            cx="250"
            cy="250"
            rx="178"
            ry="64"
            stroke="url(#meshStroke)"
            strokeOpacity=".48"
            transform="rotate(61 250 250)"
          />
          <path
            d="M76 250C128 190 193 148 250 72C311 149 376 194 424 250C363 304 303 354 250 428C193 354 132 307 76 250Z"
            stroke="url(#meshStroke)"
            strokeOpacity=".45"
          />
          <path
            d="M250 72V428M76 250H424M122 131L378 369M378 131L122 369"
            stroke="url(#meshStroke)"
            strokeOpacity=".25"
          />
          <circle
            cx="250"
            cy="250"
            r="87"
            fill="#0D1A37"
            stroke="url(#meshStroke)"
            strokeOpacity=".6"
          />
          <circle
            cx="250"
            cy="250"
            r="64"
            fill="#101F43"
            stroke="#83D8FF"
            strokeOpacity=".45"
          />
          <path
            d="M204 254L235 223M204 254L235 285M296 254L265 223M296 254L265 285"
            stroke="#AEEBFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M259 211L242 297"
            stroke="#79A7FF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="250" cy="72" r="6" fill="#A8E6FF" />
          <circle cx="424" cy="250" r="5" fill="#6B91FF" />
          <circle cx="122" cy="131" r="4" fill="#87C7FF" />
        </svg>
      </motion.div>
      <motion.div
        className="hero-art__portrait-wrap"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={reduceMotion ? undefined : { rotateX, rotateY }}
      >
        <Image
          src="/images/profile-transparent.png"
          alt="Portrait of Joseph Chukwuka Precious"
          fill
          priority
          sizes="(max-width: 760px) 82vw, (max-width: 1100px) 40vw, 480px"
          className="hero-art__portrait"
        />
      </motion.div>
      <div className="hero-art__caption" aria-hidden="true">
        <span>JOSEPH CHUKWUKA PRECIOUS</span>
        <span>FULL-STACK DEVELOPER / 001</span>
      </div>
      <div className="hero-art__label hero-art__label--top">
        <span className="status-dot" /> AVAILABLE FOR PROJECTS
      </div>
      <div className="hero-art__label hero-art__label--bottom">
        JS ECOSYSTEM <span>↗</span>
      </div>
      <div className="hero-art__axis hero-art__axis--x" />
      <div className="hero-art__axis hero-art__axis--y" />
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionPreference();
  return (
    <section id="top" ref={sectionRef} className="hero shell">
      <div className="hero-copy">
        <motion.div
          className="eyebrow hero-eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow-line" /> JPTECH / DIGITAL CRAFT
        </motion.div>
        <TrueFocus
          words={words}
          className="hero-title"
          ariaLabel="Building what's next for web and mobile."
          accentStart={4}
        />
        <BlurText
          className="hero-description"
          text="I'm Joseph Chukwuka Precious, a full-stack web and mobile developer crafting refined interfaces and dependable systems in the JavaScript ecosystem."
          delay={48}
        />
        <motion.div
          className="hero-actions"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92, duration: 0.65 }}
        >
          <Magnet>
            <a className="button button--primary" href="#work">
              Explore my work <ArrowUpRight size={18} />
            </a>
          </Magnet>
          <a className="text-link" href="#contact">
            Let&apos;s collaborate <ArrowUpRight size={17} />
          </a>
        </motion.div>
        <div className="hero-meta">
          <span>
            <Asterisk size={14} /> FULL-STACK WEB & MOBILE
          </span>
          <span>BASED IN ABUJA, NIGERIA</span>
        </div>
      </div>
      <HeroMesh />
      <a className="hero-scroll" href="#work">
        SCROLL TO EXPLORE <ArrowDownRight size={17} />
      </a>
    </section>
  );
}
