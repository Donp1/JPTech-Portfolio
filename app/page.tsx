import {
  ArrowUpRight,
  Code2,
  Layers3,
  Smartphone,
  Workflow,
} from "lucide-react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/tech-stack";
import { Timeline } from "@/components/timeline";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { Brand } from "@/components/brand";
import { AnchorScroll } from "@/components/anchor-scroll";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { ElectricBorder } from "@/components/react-bits/electric-border";
import Particles from "@/components/react-bits/particles";

const particleColors = ["#92ddff", "#58b7ff", "#7894ff"];

const services = [
  {
    icon: Code2,
    number: "01",
    title: "Web experiences",
    description:
      "Responsive websites and web apps shaped around speed, clarity and conversion.",
  },
  {
    icon: Smartphone,
    number: "02",
    title: "Mobile products",
    description:
      "Cross-platform React Native applications with a native feel and real utility.",
  },
  {
    icon: Layers3,
    number: "03",
    title: "Full-stack systems",
    description:
      "APIs, data and integrations that give polished interfaces a reliable foundation.",
  },
  {
    icon: Workflow,
    number: "04",
    title: "UI implementation",
    description:
      "Thoughtful translation of product designs into accessible, maintainable code.",
  },
];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-particles" aria-hidden="true">
        <Particles
          particleCount={230}
          particleSpread={15}
          speed={0.075}
          particleColors={particleColors}
          alphaParticles
          particleBaseSize={90}
          sizeRandomness={0.7}
          cameraDistance={20}
        />
      </div>
      <Header />
      <AnchorScroll />
      <main id="main-content">
        <Hero />
        <Projects />
        <section className="section services-section shell">
          <div className="section-intro">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-line" /> WHAT I DO
              </span>
              <h2>
                Ideas deserve <em>excellent execution.</em>
              </h2>
            </div>
            <p>
              From the first screen to the final API response, I build
              experiences that make your product feel complete.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal
                key={service.title}
                delay={index * 0.06}
                className="service-reveal"
              >
                <ElectricBorder
                  className="service-electric-border"
                  color="#72c8ff"
                  chaos={0.22}
                  speed={0.7 + index * 0.08}
                  borderRadius={12}
                >
                  <SpotlightCard className="service-card">
                    <div className="service-card__inner">
                      <div className="service-card__top">
                        <service.icon size={27} strokeWidth={1.5} />
                        <span>{service.number}</span>
                      </div>
                      <div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                      </div>
                      <ArrowUpRight className="service-card__arrow" size={20} />
                    </div>
                  </SpotlightCard>
                </ElectricBorder>
              </Reveal>
            ))}
          </div>
        </section>
        <TechStack />
        <Timeline />
        <section id="contact" className="section contact-section">
          <div className="shell contact-layout">
            <Reveal className="contact-copy">
              <span className="eyebrow">
                <span className="eyebrow-line" /> 04 / START A CONVERSATION
              </span>
              <h2>
                Have something <em>in mind?</em>
              </h2>
              <p>
                Whether you have a clear brief or an early idea, let&apos;s talk
                about what we can build together.
              </p>
              <div className="contact-links">
                <a href="mailto:josephchukwuka4@gmail.com">
                  josephchukwuka4@gmail.com <ArrowUpRight size={18} />
                </a>
                <a
                  href="https://wa.me/2348147143376"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="contact-availability">
                <span className="status-dot" /> AVAILABLE FOR SELECT PROJECTS
              </div>
            </Reveal>
            <Reveal className="contact-reveal" delay={0.12}>
              <ElectricBorder
                className="contact-electric-border"
                color="#72c8ff"
                chaos={0.17}
                speed={0.8}
                borderRadius={14}
              >
                <div className="contact-panel">
                  <div className="contact-panel__heading">
                    <span>PROJECT INQUIRY</span>
                    <span>↗ 2026</span>
                  </div>
                  <h3>Let&apos;s make it happen.</h3>
                  <ContactForm />
                </div>
              </ElectricBorder>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="shell footer-top">
          <div>
            <a href="#top" aria-label="JPTECH, back to top">
              <Brand />
            </a>
            <p>
              Considered digital products.
              <br />
              Built from interface to infrastructure.
            </p>
          </div>
          <div className="footer-nav">
            <a href="#work">Work</a>
            <a href="#expertise">Expertise</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} JPTECH. BUILT WITH INTENT.</span>
          <span>ABUJA, NIGERIA · WORKING EVERYWHERE</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </>
  );
}
