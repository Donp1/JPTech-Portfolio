"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { useReducedMotionPreference } from "@/components/use-reduced-motion-preference";
import { timeline } from "@/lib/content";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 45%"],
  });
  return (
    <section id="experience" className="section experience-section shell">
      <div className="section-intro">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-line" /> 03 / JOURNEY
          </span>
          <h2>
            Where craft meets <em>experience.</em>
          </h2>
        </div>
        <p>
          A path shaped by building useful products, solving hard problems, and
          caring about every interaction.
        </p>
      </div>
      <div className="experience-layout">
        <div className="experience-aside">
          <span>THE JOURNEY SO FAR</span>
          <div className="experience-big">
            Always
            <br />
            <em>building.</em>
          </div>
          <p>
            Curiosity keeps me moving. Every project is a chance to make complex
            technology feel simple.
          </p>
        </div>
        <div className="timeline" ref={ref}>
          <div className="timeline-rail">
            <motion.div
              className="timeline-progress"
              style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
            />
          </div>
          {timeline.map((item, index) => (
            <motion.article
              className="timeline-item"
              key={item.company}
              initial={
                reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
            >
              <span className="timeline-dot" />
              <span className="timeline-period">{item.period}</span>
              <h3>{item.company}</h3>
              <span className="timeline-role">{item.role}</span>
              <p>{item.description}</p>
            </motion.article>
          ))}
          <motion.article
            className="timeline-item"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="timeline-dot" />
            <span className="timeline-period">FOUNDATION</span>
            <h3>Computer Science</h3>
            <span className="timeline-role">Ahmadu Bello University</span>
            <p>Diploma completed in 2020. BSc expected December 2026.</p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
