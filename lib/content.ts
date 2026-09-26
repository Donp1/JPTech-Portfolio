export type Project = {
  id: string;
  number: string;
  name: string;
  category: "Web" | "Mobile (React Native)";
  status: "Private product" | "Concept";
  period: string;
  description: string;
  role: string;
  stack: string[];
  highlights: string[];
  visual: "evolve" | "gluvia" | "relay";
};

export const projects: Project[] = [
  {
    id: "evolve2p",
    number: "01",
    name: "Evolve2p",
    category: "Mobile (React Native)",
    status: "Private product",
    period: "2024 — 2026",
    role: "Mobile App Developer · Frontend & Backend",
    description:
      "A cryptocurrency experience bringing wallets, trading and peer-to-peer transactions into one mobile product.",
    stack: ["React Native", "Expo", "Express", "Node.js"],
    highlights: [
      "Wallets and transaction history",
      "P2P listings and escrow",
      "Identity verification and trader chat",
    ],
    visual: "evolve",
  },
  {
    id: "gluviacare",
    number: "02",
    name: "GluviaCare+",
    category: "Mobile (React Native)",
    status: "Private product",
    period: "2026 — Present",
    role: "Mobile App Developer",
    description:
      "A connected-care mobile experience designed to make daily diabetes management feel clearer and more human.",
    stack: ["React Native", "Expo", "TypeScript", "Zustand"],
    highlights: [
      "Glucose and wellness tracking",
      "Medication reminders",
      "Trends and care entry points",
    ],
    visual: "gluvia",
  },
  {
    id: "relayops",
    number: "03",
    name: "RelayOps",
    category: "Web",
    status: "Concept",
    period: "JPTECH LAB",
    role: "Independent product concept",
    description:
      "An operations dashboard concept exploring how complex workflows can become calm, legible interfaces.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Information architecture",
      "Responsive dashboard UI",
      "Product-led visual system",
    ],
    visual: "relay",
  },
];

export const technologies = [
  { name: "Next.js", group: "Web" },
  { name: "React", group: "Web" },
  { name: "React Native", group: "Mobile" },
  { name: "Expo", group: "Mobile" },
  { name: "Expo Router", group: "Mobile" },
  { name: "Node.js", group: "Backend" },
  { name: "Express", group: "Backend" },
  { name: "TypeScript", group: "Language" },
  { name: "PostgreSQL", group: "Data" },
  { name: "MongoDB", group: "Data" },
  { name: "Prisma", group: "Data" },
  { name: "Supabase", group: "Data" },
  { name: "Firebase", group: "Data" },
  { name: "Docker", group: "Tooling" },
  { name: "AWS", group: "Cloud" },
  { name: "Tailwind CSS", group: "Web" },
  { name: "NativeWind", group: "Mobile" },
  { name: "Zustand", group: "State" },
  { name: "TanStack Query", group: "State" },
  { name: "React Hook Form", group: "Forms" },
  { name: "Zod", group: "Validation" },
  { name: "Git", group: "Tooling" },
  { name: "Vercel", group: "Cloud" },
  { name: "Postman", group: "Tooling" },
] as const;

export const timeline = [
  {
    company: "GluviaCare+",
    role: "Mobile App Developer",
    period: "MAR 2026 — PRESENT",
    description:
      "Building the mobile foundation for a more connected diabetes care experience.",
  },
  {
    company: "Evolve2p",
    role: "Mobile App Developer",
    period: "NOV 2024 — JAN 2026",
    description:
      "Developed product flows spanning trading, wallets, verification and peer-to-peer exchange.",
  },
] as const;
