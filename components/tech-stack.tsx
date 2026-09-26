"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { technologies } from "@/lib/content";

const glyphs: Record<string, string> = {
  "Next.js": "N",
  React: "✳",
  "React Native": "✳",
  Expo: "E",
  "Expo Router": "ER",
  "Node.js": "⬡",
  Express: "ex",
  TypeScript: "TS",
  PostgreSQL: "♘",
  MongoDB: "◕",
  Prisma: "P",
  Supabase: "S",
  Firebase: "F",
  Docker: "▣",
  AWS: "a",
  "Tailwind CSS": "〰",
  NativeWind: "NW",
  Zustand: "Z",
  "TanStack Query": "TQ",
  "React Hook Form": "HF",
  Zod: "Z",
  Git: "G",
  Vercel: "▲",
  Postman: "P",
};

export function TechStack() {
  const [paused, setPaused] = useState(false);
  return (
    <section id="expertise" className="section expertise-section">
      <div className="shell">
        <div className="section-intro">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" /> 02 / EXPERTISE
            </span>
            <h2>
              Built with the <em>right tools.</em>
            </h2>
          </div>
          <p>
            From polished frontends to the services behind them, I work across
            the JavaScript ecosystem to ship complete products.
          </p>
        </div>
      </div>
      <div className="marquee-control-row shell">
        <button
          type="button"
          className="marquee-control"
          aria-label={
            paused ? "Resume scrolling tools" : "Pause scrolling tools"
          }
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? (
            <>
              <Play size={12} aria-hidden="true" /> PLAY
            </>
          ) : (
            <>
              <Pause size={12} aria-hidden="true" /> PAUSE
            </>
          )}
        </button>
      </div>
      <div
        className="marquee-wrap"
        aria-label={`Technologies: ${technologies.map((technology) => technology.name).join(", ")}`}
      >
        <motion.div
          className="marquee-track"
          animate={paused ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 72, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
              {technologies.map((tech) => (
                <div className="tech-pill" key={tech.name}>
                  <span className="tech-glyph">{glyphs[tech.name]}</span>
                  <span>
                    <strong>{tech.name}</strong>
                    <small>{tech.group}</small>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      <div className="shell expertise-grid">
        <div className="expertise-lead">
          <span className="expertise-asterisk">✳</span>
          <h3>
            End-to-end, <br />
            <em>without compromise.</em>
          </h3>
        </div>
        <div className="expertise-copy">
          <p>
            I move comfortably between interface details, application
            architecture, APIs and data. The result is work that looks
            considered and holds up in real use.
          </p>
          <div className="expertise-capabilities">
            <span>01&nbsp; FRONTEND & UI</span>
            <span>02&nbsp; MOBILE APPS</span>
            <span>03&nbsp; BACKEND & APIs</span>
            <span>04&nbsp; DATA & DEPLOYMENT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
