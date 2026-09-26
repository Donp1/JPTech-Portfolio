"use client";

import { motion } from "motion/react";
import { useReducedMotionPreference } from "@/components/use-reduced-motion-preference";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { projects, type Project } from "@/lib/content";

function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  if (visual === "evolve")
    return (
      <div className="project-visual project-visual--evolve" aria-hidden="true">
        <div className="visual-grid" />
        <div className="phone phone--evolve">
          <div className="phone-notch" />
          <div className="phone-content">
            <div className="mock-top">
              <span className="mock-brand">
                evolve<span>2p</span>
              </span>
              <span className="mock-avatar">JP</span>
            </div>
            <div className="mock-label">Total balance</div>
            <div className="mock-balance">
              $24,580<span>.80</span>
            </div>
            <div className="mock-gain">↗ +8.42% this month</div>
            <div className="mock-chart">
              <svg viewBox="0 0 260 90" preserveAspectRatio="none">
                <path
                  d="M0 69C17 62 24 75 44 57S75 65 91 47S115 67 135 36S162 53 184 27S218 37 237 12L260 21"
                  fill="none"
                  stroke="#6C93FF"
                  strokeWidth="3"
                />
              </svg>
            </div>
            <div className="mock-actions">
              <span>
                ↗<small>Send</small>
              </span>
              <span>
                ↓<small>Receive</small>
              </span>
              <span>
                ⇄<small>Trade</small>
              </span>
            </div>
            <div className="mock-row">
              <i /> Bitcoin <strong>$42,180</strong>
            </div>
            <div className="mock-row">
              <i /> Ethereum <strong>$3,195</strong>
            </div>
          </div>
        </div>
        <div className="float-tile float-tile--evolve">
          <span>↗</span>
          <small>PORTFOLIO GROWTH</small>
          <strong>+18.6%</strong>
        </div>
      </div>
    );
  if (visual === "gluvia")
    return (
      <div className="project-visual project-visual--gluvia" aria-hidden="true">
        <div className="visual-grid" />
        <div className="phone phone--gluvia">
          <div className="phone-notch" />
          <div className="phone-content">
            <div className="mock-top">
              <span className="gluvia-logo">
                ✳ Gluvia<span>Care+</span>
              </span>
              <span className="mock-avatar">JP</span>
            </div>
            <div className="gluvia-greeting">Good morning, Joseph</div>
            <div className="gluvia-heading">
              Your health, <em>at a glance.</em>
            </div>
            <div className="gluvia-number">
              <span>Glucose level</span>
              <strong>
                112 <small>mg/dL</small>
              </strong>
              <i>● In range</i>
            </div>
            <div className="gluvia-chart">
              <svg viewBox="0 0 260 90" preserveAspectRatio="none">
                <path
                  d="M0 55C25 44 33 60 59 49S94 33 120 42S158 67 184 48S224 35 260 30"
                  fill="none"
                  stroke="#7ADFC9"
                  strokeWidth="3"
                />
              </svg>
            </div>
            <div className="gluvia-cards">
              <span>
                ◷<small>Medication</small>
              </span>
              <span>
                ♡<small>Wellness</small>
              </span>
            </div>
          </div>
        </div>
        <div className="float-tile float-tile--gluvia">
          <small>DAILY SUMMARY</small>
          <strong>
            On track <span>✳</span>
          </strong>
          <p>Small steps, healthier days.</p>
        </div>
      </div>
    );
  return (
    <div className="project-visual project-visual--relay" aria-hidden="true">
      <div className="visual-grid" />
      <div className="browser-frame">
        <div className="browser-bar">
          <span className="browser-dots">● ● ●</span>
          <span>relayops.app / overview</span>
          <span>⌘</span>
        </div>
        <div className="browser-body">
          <div className="browser-sidebar">
            <strong>◈ relayops</strong>
            <span>▦ Overview</span>
            <span>◷ Activity</span>
            <span>☷ Projects</span>
            <span>♙ Team</span>
          </div>
          <div className="browser-main">
            <div className="browser-head">
              <span>
                Overview<small>Monday, 16 September 2026</small>
              </span>
              <i>+ New project</i>
            </div>
            <div className="browser-stat-row">
              <div>
                <small>ACTIVE PROJECTS</small>
                <strong>12</strong>
                <span>↗ 4 this month</span>
              </div>
              <div>
                <small>TEAM EFFICIENCY</small>
                <strong>94%</strong>
                <span>↗ 6.2% increase</span>
              </div>
              <div>
                <small>TASKS COMPLETED</small>
                <strong>248</strong>
                <span>↗ 18 this week</span>
              </div>
            </div>
            <div className="browser-content-row">
              <div className="browser-graph">
                <small>PROJECT ACTIVITY</small>
                <div className="graph-bars">
                  {[35, 52, 43, 69, 56, 76, 63, 88, 72, 93, 82, 100].map(
                    (h, i) => (
                      <i key={i} style={{ height: `${h}%` }} />
                    ),
                  )}
                </div>
              </div>
              <div className="browser-activity">
                <small>RECENT ACTIVITY</small>
                <span>● Design review complete</span>
                <span>● Sprint planning</span>
                <span>● New release ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const reduceMotion = useReducedMotionPreference();
  return (
    <section id="work" className="section work-section shell">
      <div className="section-intro">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-line" /> 01 / SELECTED WORK
          </span>
          <h2>
            Proof in the <em>product.</em>
          </h2>
        </div>
        <p>
          A selection of mobile products and a web concept that show how I
          think, design and build across the stack.
        </p>
      </div>
      <div className="project-list">
        {projects.map((project, index) => (
          <motion.article
            className={`project-card project-card--${project.visual}`}
            key={project.id}
            initial={reduceMotion ? false : { opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.13 }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="project-card__copy">
              <div className="project-card__top">
                <span className="project-number">{project.number} / 03</span>
                <span className="project-category">{project.category}</span>
              </div>
              <div>
                <div className="project-status">
                  {project.status === "Private product" ? (
                    <LockKeyhole size={13} />
                  ) : (
                    <span className="concept-dot" />
                  )}
                  {project.status}
                </div>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <p className="project-role">{project.role}</p>
                <div className="project-tags">
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="project-card__bottom">
                <span>{project.period}</span>
                <a
                  href="#contact"
                  aria-label={`Discuss a project like ${project.name}`}
                >
                  <ArrowUpRight size={21} />
                </a>
              </div>
            </div>
            <motion.div
              className="project-card__art"
              whileHover={reduceMotion ? undefined : { scale: 1.025 }}
              transition={{ duration: 0.45 }}
            >
              <ProjectVisual visual={project.visual} />
            </motion.div>
            {index === 1 && (
              <span className="sr-only">
                Current application data is local or mocked; backend integration
                is on the roadmap.
              </span>
            )}
          </motion.article>
        ))}
      </div>
      <p className="work-note">
        Private product visuals are illustrative interface compositions.
        RelayOps is an independent JPTECH Lab concept.
      </p>
    </section>
  );
}
