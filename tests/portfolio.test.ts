import { describe, expect, it } from "vitest";
import { projects, technologies, timeline } from "@/lib/content";
import { contactSchema } from "@/lib/contact";

describe("portfolio content", () => {
  it("distinguishes private work from the concept and covers web and mobile", () => {
    expect(
      projects.some(
        (project) => project.category === "Web" && project.status === "Concept",
      ),
    ).toBe(true);
    expect(
      projects.filter(
        (project) =>
          project.category === "Mobile (React Native)" &&
          project.status === "Private product",
      ),
    ).toHaveLength(2);
  });

  it("includes every technology in the requested showcase", () => {
    for (const name of [
      "Next.js",
      "React Native",
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "AWS",
      "Tailwind CSS",
    ]) {
      expect(technologies.map((technology) => technology.name)).toContain(name);
    }
  });

  it("includes the verified production tools used across web, mobile and data work", () => {
    for (const name of [
      "React",
      "Expo",
      "Expo Router",
      "Prisma",
      "Supabase",
      "Firebase",
      "Zustand",
      "TanStack Query",
      "Zod",
      "Git",
      "Vercel",
    ]) {
      expect(technologies.map((technology) => technology.name)).toContain(name);
    }
  });

  it("keeps timeline entries in reverse chronological order", () => {
    expect(timeline.map((item) => item.company)).toEqual([
      "GluviaCare+",
      "Evolve2p",
    ]);
  });
});

describe("contact validation", () => {
  it("rejects malformed and excessively long messages", () => {
    expect(
      contactSchema.safeParse({
        name: "J",
        email: "bad",
        message: "hi",
        website: "",
      }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({
        name: "Joseph",
        email: "j@example.com",
        message: "x".repeat(3001),
        website: "",
      }).success,
    ).toBe(false);
  });

  it("accepts a valid enquiry", () => {
    expect(
      contactSchema.safeParse({
        name: "Joseph",
        email: "j@example.com",
        message: "I would like to discuss a React Native project.",
        website: "",
      }).success,
    ).toBe(true);
  });
});
