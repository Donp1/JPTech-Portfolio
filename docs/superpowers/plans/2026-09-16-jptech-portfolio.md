# JPTech Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a premium, accessible, single-page Next.js portfolio for Joseph Chukwuka Precious and JPTech, including truthful project showcases, dual themes, a working contact form, résumé PDF, and production SEO.

**Architecture:** Use Next.js 16 App Router with Server Components by default and small Client Components for theme state, navigation, motion, and form interaction. Keep verified portfolio facts in typed data modules, build sections from focused reusable components, deliver email through a server-only route handler, and deploy the production build to Vercel.

**Tech Stack:** Next.js 16.3.5, React 19, strict TypeScript, Tailwind CSS 4, shadcn/ui, Magic UI, Motion for React, Lucide React, React Hook Form, Zod, Resend, Vitest, Testing Library, Playwright, Vercel

**Spec:** `docs/superpowers/specs/2026-09-16-jptech-portfolio-design.md`

## Global Constraints

- Use npm and `npm.cmd` on this Windows machine; Node.js is `v24.15.0`, above Next.js 16's minimum Node.js `20.9` requirement.
- Use Next.js App Router, strict TypeScript, Tailwind CSS, and the `@/*` import alias.
- Keep the marketing experience to one public page with anchored sections; framework metadata endpoints and `not-found.tsx` are allowed.
- Render with Server Components by default; add `"use client"` only for interaction, browser APIs, forms, or Motion.
- Use the approved palette exactly: `#2563EB`, `#22D3EE`, `#8B5CF6`, `#EC4899`, `#060B18`, `#0F172A`, `#F8FAFC`, `#94A3B8`.
- Provide both light and dark themes, follow system preference initially, persist visitor choice, and prevent an incorrect-theme flash.
- Use real shadcn/ui and Magic UI components listed in the specification; do not add a competing component or animation library.
- Never invent clients, testimonials, users, results, public links, screenshots, or backend completion.
- Label Evolve2p and GluviaCare+ as private products and RelayOps as a JPTech Lab concept.
- Treat GluviaCare+'s backend as roadmap work until deployable backend evidence exists.
- Target WCAG 2.2 AA where practical, including skip navigation, focus visibility, semantic headings, form labeling, and reduced-motion support.
- Keep Resend credentials server-only; contact failures must retain form content and expose direct email and WhatsApp recovery actions.
- Do not add analytics, a blog, GitHub, LinkedIn, testimonials, or a portrait in the first release.
- Use only the approved Evolve2p logo and GluviaCare+ icon; no fabricated product screenshots.
- Use official documentation before relying on changed framework APIs: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [shadcn/ui for Next.js](https://ui.shadcn.com/docs/installation/next), and [Resend with Next.js](https://resend.com/docs/send-with-nextjs).

---

## Planned File Structure

```text
.
├── app/
│   ├── api/contact/route.ts          # Server-only email delivery endpoint
│   ├── globals.css                   # Tokens, themes, layout, and global motion rules
│   ├── icon.tsx                      # Generated JPTech favicon
│   ├── layout.tsx                    # Fonts, metadata, providers, JSON-LD
│   ├── not-found.tsx                 # Branded accessible 404
│   ├── page.tsx                      # Single-page section composition
│   ├── robots.ts                     # Robots metadata
│   └── sitemap.ts                    # Sitemap metadata
├── components/
│   ├── brand/jptech-mark.tsx         # Typography-led brand mark
│   ├── contact/contact-form.tsx      # Form UI and submission state
│   ├── layout/footer.tsx             # Footer links and availability
│   ├── layout/header.tsx             # Desktop and mobile navigation
│   ├── motion/hero-spotlight.tsx     # Pointer lighting with safe fallbacks
│   ├── motion/reveal.tsx             # Reduced-motion-aware reveal wrapper
│   ├── projects/browser-frame.tsx    # Web product presentation shell
│   ├── projects/device-frame.tsx     # Mobile product presentation shell
│   ├── projects/project-showcase.tsx # Project narrative renderer
│   ├── providers/theme-provider.tsx  # next-themes wrapper
│   ├── sections/about.tsx            # Bio, experience, education, certifications
│   ├── sections/expertise.tsx        # Grouped capabilities
│   ├── sections/hero.tsx             # Value proposition and CTAs
│   ├── sections/projects.tsx         # Three approved project stories
│   ├── sections/services.tsx         # Six service offerings
│   ├── ui/*                          # shadcn/ui primitives
│   ├── magicui/*                     # Magic UI registry components
│   ├── section-heading.tsx           # Shared heading hierarchy
│   └── theme-toggle.tsx              # Accessible theme control
├── lib/
│   ├── contact-schema.ts             # Shared Zod request schema
│   ├── portfolio-data.ts             # Verified typed content
│   ├── portfolio-types.ts            # Content interfaces
│   ├── site-config.ts                # Canonical identity and URL helpers
│   └── utils.ts                      # Class-name composition helper
├── public/
│   ├── brands/evolve2p.png           # Approved Evolve2p logo
│   ├── brands/gluviacare.png         # Approved GluviaCare+ icon
│   ├── joseph-chukwuka-precious-resume.pdf
│   └── og.png                        # Bespoke social card
├── tests/
│   ├── contact/route.test.ts
│   ├── contact/schema.test.ts
│   ├── content/portfolio-data.test.ts
│   ├── components/header.test.tsx
│   ├── components/hero.test.tsx
│   ├── components/projects.test.tsx
│   ├── components/sections.test.tsx
│   ├── smoke/home-page.test.tsx
│   └── setup.ts
├── e2e/portfolio.spec.ts
├── .env.example
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── playwright.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── vitest.config.mts
```

### Task 1: Establish the Next.js Foundation and Test Harness

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.mts`
- Create: `tests/setup.ts`
- Create: `tests/smoke/home-page.test.tsx`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `.gitignore`
- Modify: `DESIGN.md` only if encoding cleanup is needed; do not change its requirements

**Interfaces:**
- Consumes: approved spec and the existing root-level project files
- Produces: `HomePage(): JSX.Element`, root layout, Tailwind pipeline, `npm.cmd run test`, `npm.cmd run typecheck`, `npm.cmd run lint`, and `npm.cmd run build`

- [ ] **Step 1: Create npm metadata and install the runtime/tooling dependencies**

Run:

```powershell
npm.cmd init -y
npm.cmd install next@16.3.5 react@latest react-dom@latest motion next-themes lucide-react react-hook-form zod @hookform/resolvers resend class-variance-authority clsx tailwind-merge
npm.cmd install -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss eslint eslint-config-next vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react playwright @playwright/test
```

Update `package.json` scripts to exactly:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

- [ ] **Step 2: Write the failing home-page smoke test**

Create `tests/smoke/home-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import HomePage from "@/app/page"

describe("home page", () => {
  it("provides one main landmark and the approved primary heading", () => {
    render(<HomePage />)
    expect(screen.getByRole("main")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /full-stack web & mobile developer/i })
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run the test and verify the missing app fails**

Run: `npm.cmd run test -- tests/smoke/home-page.test.tsx`

Expected: FAIL because `@/app/page` does not exist.

- [ ] **Step 4: Implement the minimal App Router shell and test configuration**

Create `vitest.config.mts` with jsdom, the React plugin, `@` path resolution, and `tests/setup.ts`. Create a root layout importing `globals.css`, and make `app/page.tsx` return:

```tsx
export default function HomePage() {
  return (
    <main>
      <h1>Full-Stack Web &amp; Mobile Developer</h1>
    </main>
  )
}
```

Set `strict: true`, `noEmit: true`, and `@/*` path aliases in `tsconfig.json`. Configure Tailwind 4 through `@tailwindcss/postcss`. Add `.next`, `node_modules`, coverage, Playwright output, `.env*` except `.env.example`, and `.superpowers/` to `.gitignore`.

- [ ] **Step 5: Verify the foundation**

Run:

```powershell
npm.cmd run test -- tests/smoke/home-page.test.tsx
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

Expected: all commands exit 0.

- [ ] **Step 6: Commit the foundation**

```powershell
git add -- package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs vitest.config.mts tests/setup.ts tests/smoke/home-page.test.tsx app/layout.tsx app/page.tsx app/globals.css .gitignore
git commit -m "build: establish Next.js portfolio foundation"
```

### Task 2: Define Verified Portfolio Content and Site Configuration

**Files:**
- Create: `lib/portfolio-types.ts`
- Create: `lib/portfolio-data.ts`
- Create: `lib/site-config.ts`
- Create: `tests/content/portfolio-data.test.ts`
- Create: `.env.example`

**Interfaces:**
- Consumes: identity, projects, services, skills, experience, education, and certifications from the approved spec
- Produces: `portfolioData: PortfolioData`, `siteConfig`, `getSiteUrl(): URL`, and shared content types consumed by every section

- [ ] **Step 1: Write content-integrity tests before the data exists**

Create `tests/content/portfolio-data.test.ts`:

```ts
import { portfolioData } from "@/lib/portfolio-data"

describe("portfolioData", () => {
  it("keeps the approved project truth labels", () => {
    expect(portfolioData.projects).toHaveLength(3)
    expect(portfolioData.projects.map((project) => project.name)).toEqual([
      "Evolve2p",
      "GluviaCare+",
      "RelayOps",
    ])
    expect(portfolioData.projects[0].status).toBe("Private product")
    expect(portfolioData.projects[1].status).toBe("Private product · In development")
    expect(portfolioData.projects[2].status).toBe("JPTech Lab concept")
  })

  it("contains only the six approved services", () => {
    expect(portfolioData.services.map((service) => service.title)).toEqual([
      "Website Development",
      "Web Application Development",
      "Mobile App Development",
      "Figma-to-Code UI Implementation",
      "API Integration and Backend Development",
      "Performance, Maintenance and Support",
    ])
  })

  it("uses the verified contact channels", () => {
    expect(portfolioData.contact.email).toBe("josephchukwuka4@gmail.com")
    expect(portfolioData.contact.phoneDisplay).toBe("+234 814 714 3376")
    expect(portfolioData.contact.whatsappHref).toBe("https://wa.me/2348147143376")
  })
})
```

- [ ] **Step 2: Verify the content tests fail**

Run: `npm.cmd run test -- tests/content/portfolio-data.test.ts`

Expected: FAIL because the typed data modules do not exist.

- [ ] **Step 3: Define exact content interfaces**

Create `lib/portfolio-types.ts` with these public types:

```ts
export type ProjectStatus =
  | "Private product"
  | "Private product · In development"
  | "JPTech Lab concept"

export interface Project {
  slug: "evolve2p" | "gluviacare" | "relayops"
  name: string
  status: ProjectStatus
  category: "Fintech" | "Healthtech" | "Product concept"
  summary: string
  role: string
  period: string
  stack: readonly string[]
  features: readonly string[]
  disclosure: string
  asset?: { src: string; alt: string }
  presentation: "device" | "browser"
}

export interface Service { title: string; description: string; icon: string }
export interface ExpertiseGroup { label: string; skills: readonly string[] }
export interface TimelineEntry {
  title: string
  organization: string
  period: string
  description: string
}
export interface PortfolioData {
  identity: {
    name: string
    title: string
    company: string
    location: string
    availability: string
    introduction: string
  }
  contact: {
    email: string
    phoneDisplay: string
    phoneHref: string
    whatsappHref: string
  }
  projects: readonly Project[]
  services: readonly Service[]
  expertise: readonly ExpertiseGroup[]
  experience: readonly TimelineEntry[]
  education: readonly TimelineEntry[]
  certifications: readonly string[]
}
```

- [ ] **Step 4: Implement the complete verified data and site configuration**

Populate `portfolioData` from the spec, using `satisfies PortfolioData` to preserve literal types. Use `/brands/evolve2p.png` and `/brands/gluviacare.png` for approved assets. In `site-config.ts`, export:

```ts
export const siteConfig = {
  name: "JPTech",
  title: "Joseph Chukwuka Precious — Full-Stack Web & Mobile Developer",
  description:
    "JPTech builds responsive websites, scalable web applications, and cross-platform mobile products from Abuja, Nigeria.",
  email: "josephchukwuka4@gmail.com",
} as const

export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  return new URL(value)
}
```

Create `.env.example`:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=re_example_replace_in_vercel
```

- [ ] **Step 5: Run content tests and type checking**

Run:

```powershell
npm.cmd run test -- tests/content/portfolio-data.test.ts
npm.cmd run typecheck
```

Expected: PASS and exit 0.

- [ ] **Step 6: Commit typed content**

```powershell
git add -- lib/portfolio-types.ts lib/portfolio-data.ts lib/site-config.ts tests/content/portfolio-data.test.ts .env.example
git commit -m "feat: add verified JPTech portfolio content"
```

### Task 3: Build Themes and the Approved Component Foundation

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `components/providers/theme-provider.tsx`
- Create: `components/theme-toggle.tsx`
- Create: `components/brand/jptech-mark.tsx`
- Create: `components/section-heading.tsx`
- Create: `components/ui/button.tsx`
- Create: `components/ui/field.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/select.tsx`
- Create: `components/ui/sheet.tsx`
- Create: `components/ui/textarea.tsx`
- Create: `components/magicui/dot-pattern.tsx`
- Create: `components/magicui/border-beam.tsx`
- Create: `components/magicui/blur-fade.tsx`
- Create: `lib/utils.ts`
- Create: `tests/components/theme-toggle.test.tsx`

**Interfaces:**
- Consumes: approved palette and component-source decisions
- Produces: `<ThemeProvider>`, `<ThemeToggle>`, `<JPTechMark>`, `<SectionHeading>`, shadcn form/navigation primitives, and approved Magic UI effects

- [ ] **Step 1: Install official shadcn/ui and Magic UI registry components**

Run:

```powershell
npx.cmd shadcn@latest init -d
npx.cmd shadcn@latest add button field input textarea select sheet
npx.cmd shadcn@latest add @magicui/dot-pattern @magicui/border-beam @magicui/blur-fade
```

Keep the generated source in the repository. If the registry writes Magic UI files under `components/ui`, move them with imports intact into `components/magicui` using `apply_patch`; do not duplicate the generated components.

- [ ] **Step 2: Write the failing accessible theme-toggle test**

Create `tests/components/theme-toggle.test.tsx` with a mocked `next-themes` hook:

```tsx
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import { ThemeToggle } from "@/components/theme-toggle"

const setTheme = vi.fn()
vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark", setTheme }),
}))

it("announces and switches the theme", async () => {
  render(<ThemeToggle />)
  const button = screen.getByRole("button", { name: /switch to light theme/i })
  await userEvent.click(button)
  expect(setTheme).toHaveBeenCalledWith("light")
})
```

- [ ] **Step 3: Verify the test fails**

Run: `npm.cmd run test -- tests/components/theme-toggle.test.tsx`

Expected: FAIL because `ThemeToggle` does not exist.

- [ ] **Step 4: Implement theme behavior and brand primitives**

Wrap the app with `next-themes` using `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and `disableTransitionOnChange={false}`. Add `suppressHydrationWarning` to `<html>`. The toggle must render only after mount, expose a 44px minimum target, and use Sun/Moon icons with an explicit accessible name.

Define CSS custom properties for both themes, including background, foreground, surface, muted, border, primary, cyan, violet, magenta, radii, container width, duration, and easing. Add `color-scheme`, visible `:focus-visible`, `scroll-padding-top`, and a `prefers-reduced-motion` block that removes nonessential animation and smooth scrolling.

Implement `JPTechMark` as semantic text with a decorative cyan accent; do not create an SVG logo. Implement `SectionHeading` with eyebrow, title, optional description, and caller-selectable heading level.

- [ ] **Step 5: Adapt imported components to JPTech tokens**

Replace registry default colors, radii, and shadows with CSS-variable-backed classes. Configure Dot Pattern opacity to remain below text, Border Beam colors to cyan/violet, and Blur Fade to return children without motion when `useReducedMotion()` is true.

- [ ] **Step 6: Verify theme/component behavior**

Run:

```powershell
npm.cmd run test -- tests/components/theme-toggle.test.tsx
npm.cmd run typecheck
npm.cmd run lint
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit the component foundation**

```powershell
git add -- app/globals.css app/layout.tsx components components.json lib/utils.ts tests/components/theme-toggle.test.tsx
git commit -m "feat: add JPTech themes and component foundation"
```

### Task 4: Implement the Header and Hero Experience

**Files:**
- Create: `components/layout/header.tsx`
- Create: `components/sections/hero.tsx`
- Create: `components/motion/hero-spotlight.tsx`
- Create: `components/motion/reveal.tsx`
- Create: `tests/components/header.test.tsx`
- Create: `tests/components/hero.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `portfolioData.identity`, `portfolioData.contact`, theme/UI primitives
- Produces: `<Header />`, `<Hero />`, `<HeroSpotlight />`, and `<Reveal />`

- [ ] **Step 1: Write failing navigation and hero tests**

`tests/components/header.test.tsx` must assert that Work, Services, Expertise, About, and Contact anchors exist and point to `#work`, `#services`, `#expertise`, `#about`, and `#contact`. `tests/components/hero.test.tsx` must assert the full name, title, availability, primary CTA to `#contact`, and secondary CTA to `#work`.

```tsx
expect(screen.getByRole("link", { name: /let's work together/i })).toHaveAttribute(
  "href",
  "#contact"
)
expect(screen.getByRole("link", { name: /view selected work/i })).toHaveAttribute(
  "href",
  "#work"
)
```

- [ ] **Step 2: Verify the tests fail**

Run: `npm.cmd run test -- tests/components/header.test.tsx tests/components/hero.test.tsx`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement accessible navigation**

Build a sticky translucent header with the JPTech mark, desktop anchor list, theme toggle, and shadcn Sheet for mobile. Opening the mobile menu must move focus into the sheet; selecting a link closes it; Escape closes it; the sheet title is available to screen readers.

- [ ] **Step 4: Implement the hero composition**

Render a skip link before the header. Use the supplied identity content, availability indicator, and approved calls to action. Build the product composition with CSS surfaces and semantic text rather than a fake terminal or portrait. Add Dot Pattern behind the composition and use `HeroSpotlight` only for fine-pointer devices.

`HeroSpotlight` must update CSS variables from `pointermove`, avoid React state per frame, and stop listening when `prefers-reduced-motion: reduce` or `(pointer: coarse)` matches.

- [ ] **Step 5: Verify the header and hero**

Run:

```powershell
npm.cmd run test -- tests/components/header.test.tsx tests/components/hero.test.tsx
npm.cmd run typecheck
npm.cmd run lint
```

Expected: PASS and exit 0.

- [ ] **Step 6: Commit the first viewport**

```powershell
git add -- components/layout/header.tsx components/sections/hero.tsx components/motion/hero-spotlight.tsx components/motion/reveal.tsx tests/components/header.test.tsx tests/components/hero.test.tsx app/page.tsx
git commit -m "feat: build JPTech header and hero"
```

### Task 5: Build Truthful Project Storytelling and Product Presentations

**Files:**
- Create: `components/projects/device-frame.tsx`
- Create: `components/projects/browser-frame.tsx`
- Create: `components/projects/project-showcase.tsx`
- Create: `components/sections/projects.tsx`
- Create: `tests/components/projects.test.tsx`
- Create: `public/brands/evolve2p.png`
- Create: `public/brands/gluviacare.png`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Project` from `lib/portfolio-types.ts` and `portfolioData.projects`
- Produces: `<ProjectShowcase project: Project priority?: boolean>`, `<DeviceFrame>`, `<BrowserFrame>`, and the `#work` section

- [ ] **Step 1: Copy and normalize approved assets**

Copy root `Logo.png` to `public/brands/evolve2p.png`. Copy root `app-icon.jpg` to `public/brands/gluviacare.png`, preserving the original file if conversion is unnecessary. Verify both with an image viewer before use. Do not alter the brand artwork beyond safe crop/format optimization.

- [ ] **Step 2: Write failing project truth tests**

Create `tests/components/projects.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import { Projects } from "@/components/sections/projects"

it("distinguishes private work from the JPTech concept", () => {
  render(<Projects />)
  expect(screen.getByRole("heading", { name: "Evolve2p" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "GluviaCare+" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "RelayOps" })).toBeInTheDocument()
  expect(screen.getAllByText(/private product/i)).toHaveLength(2)
  expect(screen.getByText(/jptech lab concept/i)).toBeInTheDocument()
  expect(screen.queryByRole("link", { name: /live demo/i })).not.toBeInTheDocument()
})

it("discloses GluviaCare+'s current local data state", () => {
  render(<Projects />)
  expect(screen.getByText(/current data is local and mocked/i)).toBeInTheDocument()
})
```

- [ ] **Step 3: Verify the project tests fail**

Run: `npm.cmd run test -- tests/components/projects.test.tsx`

Expected: FAIL because the project section does not exist.

- [ ] **Step 4: Implement reusable presentation shells**

`DeviceFrame` and `BrowserFrame` must accept `children`, `label`, and optional `className`. They render accessible figcaptions, reserve stable dimensions, and never imply that the CSS presentation is a production screenshot. Device content should summarize confirmed flows, while the browser frame should display RelayOps concept modules such as operations overview, orders, workload, and team activity.

- [ ] **Step 5: Implement three project stories**

Render project category, status, title, summary, role, period, stack, confirmed features, and disclosure. Use `next/image` for approved logos with explicit sizes. Use Border Beam once on the lead showcase only. Use Blur Fade/Reveal conservatively and keep all content visible when JavaScript or motion is unavailable.

- [ ] **Step 6: Verify projects and asset behavior**

Run:

```powershell
npm.cmd run test -- tests/components/projects.test.tsx
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

Expected: all commands exit 0; Next.js reports no invalid image dimensions or client-boundary errors.

- [ ] **Step 7: Commit project storytelling**

```powershell
git add -- components/projects components/sections/projects.tsx tests/components/projects.test.tsx public/brands app/page.tsx
git commit -m "feat: add truthful project showcases"
```

### Task 6: Add Services, Expertise, Journey, and the Résumé

**Files:**
- Create: `components/sections/services.tsx`
- Create: `components/sections/expertise.tsx`
- Create: `components/sections/about.tsx`
- Create: `components/timeline-item.tsx`
- Create: `components/layout/footer.tsx`
- Create: `tests/components/sections.test.tsx`
- Create: `public/joseph-chukwuka-precious-resume.pdf`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: services, expertise, experience, education, certifications, contact details
- Produces: `#services`, `#expertise`, `#about`, résumé download link, and `<Footer />`

- [ ] **Step 1: Write failing section-content tests**

Create `tests/components/sections.test.tsx` to render Services, Expertise, and About and assert:

```tsx
expect(screen.getAllByRole("article")).toHaveLength(6)
expect(screen.getByText("React Native")).toBeInTheDocument()
expect(screen.getByText("November 2024 — January 2026")).toBeInTheDocument()
expect(screen.getByText("Expected December 2026")).toBeInTheDocument()
expect(screen.getByRole("link", { name: /download résumé/i })).toHaveAttribute(
  "href",
  "/joseph-chukwuka-precious-resume.pdf"
)
```

- [ ] **Step 2: Verify the tests fail**

Run: `npm.cmd run test -- tests/components/sections.test.tsx`

Expected: FAIL because the sections do not exist.

- [ ] **Step 3: Implement the supporting sections**

Use six service articles with individual Lucide icons. Render expertise as grouped text chips with semantic headings, not a decorative logo wall. Render experience and education through `TimelineItem`, followed by the five freeCodeCamp certifications. Add the résumé action and direct contact links to the footer.

- [ ] **Step 4: Generate and visually verify the résumé PDF**

Before generating the résumé, load and follow the `documents:documents` and `pdf:pdf` skills. Create a one-to-two-page professional résumé using only the verified data in the spec. Render it to page images, inspect margins, hierarchy, wrapping, links, and page breaks, correct any layout defects, and save the final artifact as `public/joseph-chukwuka-precious-resume.pdf`.

The résumé must include contact details, profile, core skills, Evolve2p and GluviaCare+ experience, education, and the five certifications. It must not include unverified metrics, testimonials, social accounts, or a portrait.

- [ ] **Step 5: Run section tests and verify the PDF exists**

Run:

```powershell
npm.cmd run test -- tests/components/sections.test.tsx
Test-Path -LiteralPath "public\joseph-chukwuka-precious-resume.pdf"
npm.cmd run typecheck
npm.cmd run lint
```

Expected: tests pass, `Test-Path` prints `True`, and checks exit 0.

- [ ] **Step 6: Commit supporting content and résumé**

```powershell
git add -- components/sections/services.tsx components/sections/expertise.tsx components/sections/about.tsx components/timeline-item.tsx components/layout/footer.tsx tests/components/sections.test.tsx public/joseph-chukwuka-precious-resume.pdf app/page.tsx
git commit -m "feat: add services journey and résumé"
```

### Task 7: Implement Validated Contact Delivery and Recovery States

**Files:**
- Create: `lib/contact-schema.ts`
- Create: `app/api/contact/route.ts`
- Create: `components/contact/contact-form.tsx`
- Create: `tests/contact/schema.test.ts`
- Create: `tests/contact/route.test.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `RESEND_API_KEY`, recipient email, React Hook Form, and Zod
- Produces: `contactSchema`, `ContactPayload`, `POST(request: Request): Promise<Response>`, and `#contact`

- [ ] **Step 1: Write failing schema tests**

Create `tests/contact/schema.test.ts`:

```ts
import { contactSchema } from "@/lib/contact-schema"

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  projectType: "Web application",
  budget: "$2,000–$5,000",
  message: "We need a responsive operations portal for our distributed team.",
  company: "",
  startedAt: Date.now() - 5000,
}

it("accepts a complete human submission", () => {
  expect(contactSchema.safeParse(valid).success).toBe(true)
})

it("rejects honeypot and too-fast submissions", () => {
  expect(contactSchema.safeParse({ ...valid, company: "spam" }).success).toBe(false)
  expect(contactSchema.safeParse({ ...valid, startedAt: Date.now() }).success).toBe(false)
})
```

- [ ] **Step 2: Verify schema tests fail**

Run: `npm.cmd run test -- tests/contact/schema.test.ts`

Expected: FAIL because `contactSchema` does not exist.

- [ ] **Step 3: Implement the shared schema**

Create fields with these constraints: trimmed name 2–80 characters, valid email up to 160 characters, project type from `Website`, `Web application`, `Mobile application`, `Figma-to-code implementation`, `API or backend work`, `Maintenance and support`, `Career opportunity`, or `Other`; budget from `Under $1,000`, `$1,000–$2,000`, `$2,000–$5,000`, `$5,000–$10,000`, `$10,000+`, or `Not sure yet`; message 30–2000 characters; empty honeypot; and `startedAt` at least 2500ms before parsing. Export `type ContactPayload = z.infer<typeof contactSchema>`.

- [ ] **Step 4: Write failing route-handler tests with a mocked Resend client**

Test these outcomes in `tests/contact/route.test.ts`:

```ts
expect((await POST(invalidRequest)).status).toBe(400)
expect((await POST(validRequestWithoutKey)).status).toBe(503)
expect((await POST(validRequestWithMockedResend)).status).toBe(200)
```

Mock `resend` before importing the route and assert email is sent to `josephchukwuka4@gmail.com`, uses a safe fixed sender, sets `replyTo` to the visitor email, and escapes user text by rendering it as React email content or plain text rather than concatenated HTML.

- [ ] **Step 5: Implement the route handler**

Parse JSON defensively, validate with `contactSchema`, return `{ ok: false, message }` for 400/503/502 outcomes, and return `{ ok: true }` on successful delivery. Construct the Resend client only after confirming the server environment key exists. Use `onboarding@resend.dev` for the initial self-recipient setup and document replacing it after a custom sending domain is verified.

- [ ] **Step 6: Implement the accessible form**

Use shadcn Field/Input/Select/Textarea/Button with React Hook Form and the Zod resolver. Preserve field values after network or server failure. Disable only the submit button while sending. Move focus to the success/error summary after response. On failure, expose `mailto:josephchukwuka4@gmail.com` and `https://wa.me/2348147143376` links.

- [ ] **Step 7: Verify contact behavior**

Run:

```powershell
npm.cmd run test -- tests/contact/schema.test.ts tests/contact/route.test.ts
npm.cmd run typecheck
npm.cmd run lint
```

Expected: all checks pass; tests do not make network requests.

- [ ] **Step 8: Commit contact functionality**

```powershell
git add -- lib/contact-schema.ts app/api/contact/route.ts components/contact/contact-form.tsx tests/contact/schema.test.ts tests/contact/route.test.ts app/page.tsx
git commit -m "feat: add validated portfolio contact flow"
```

### Task 8: Complete Page Composition, Metadata, Brand Assets, and Sharing

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `app/icon.tsx`
- Create: `app/not-found.tsx`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `public/og.png`
- Create: `tests/content/site-config.test.ts`

**Interfaces:**
- Consumes: all completed sections and `getSiteUrl()`
- Produces: final one-page hierarchy, metadata, JSON-LD, favicon, social card, sitemap, robots, and 404 experience

- [ ] **Step 1: Write failing metadata-route tests**

Create `tests/content/site-config.test.ts`:

```ts
import robots from "@/app/robots"
import sitemap from "@/app/sitemap"
import { siteConfig } from "@/lib/site-config"

it("emits the configured canonical URL", () => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://jptech.example"
  expect(sitemap()).toEqual([
    expect.objectContaining({ url: "https://jptech.example/" }),
  ])
  expect(robots().sitemap).toBe("https://jptech.example/sitemap.xml")
})

it("uses truthful JPTech identity metadata", () => {
  expect(siteConfig.title).toContain("Joseph Chukwuka Precious")
  expect(siteConfig.description).toContain("web applications")
  expect(siteConfig.description).toContain("mobile products")
})
```

Run `npm.cmd run test -- tests/content/site-config.test.ts` and expect failure because `app/robots.ts` and `app/sitemap.ts` do not exist yet.

- [ ] **Step 2: Assemble the final page and section IDs**

Render Header, Hero, Projects, Services, Expertise, About, Contact, and Footer in the approved order. Ensure each navigation target exists exactly once, heading levels are sequential, and the page has one `<main id="main-content">`.

- [ ] **Step 3: Implement SEO and structured data**

In `layout.tsx`, export metadata with `metadataBase: getSiteUrl()`, approved title/description, canonical root, Open Graph, and X card settings. Add JSON-LD for `Person` and `ProfessionalService` using only verified name, company, location, email, phone, and service names. Implement `robots.ts` and `sitemap.ts` from `getSiteUrl()`.

- [ ] **Step 4: Create favicon and social card**

Create `app/icon.tsx` with Next.js `ImageResponse`, rendering the typography-led `JP` mark with blue/cyan styling. Before creating `public/og.png`, load and follow the `imagegen` skill. Generate exactly one cohesive 1200×630 JPTech card after the final headline and palette are stable. Inspect the returned image for exact spelling of `JPTech`, `Joseph Chukwuka Precious`, and `Full-Stack Web & Mobile Developer`; retry once only if the card is unusable. If text remains incorrect, omit `og:image` instead of shipping a misleading asset.

- [ ] **Step 5: Build the branded 404 and global finishing styles**

Provide a concise not-found page with the JPTech mark and a link back to `/`. Finish responsive section spacing, selection colors, scroll margins, light/dark surfaces, and print styles that avoid animating or clipping content.

- [ ] **Step 6: Verify production metadata and build**

Run:

```powershell
npm.cmd run test -- tests/content/site-config.test.ts
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

Expected: all commands exit 0; build output includes `/`, `/api/contact`, `/robots.txt`, `/sitemap.xml`, and the not-found route.

- [ ] **Step 7: Commit production presentation**

```powershell
git add -- app public/og.png tests/content/site-config.test.ts
git commit -m "feat: complete JPTech page metadata and sharing"
```

### Task 9: Run Browser Verification, Document Operations, and Deploy to Vercel

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/portfolio.spec.ts`
- Create: `README.md`
- Modify: `.env.example`
- Modify: any implementation file only when verification exposes a defect

**Interfaces:**
- Consumes: finished application and production environment configuration
- Produces: repeatable browser checks, setup/deployment documentation, and a verified Vercel production URL

- [ ] **Step 1: Write end-to-end acceptance tests**

Create `e2e/portfolio.spec.ts` with tests for desktop and mobile:

```ts
import { expect, test } from "@playwright/test"

test("navigates the single-page portfolio", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Full-Stack Web & Mobile Developer"
  )
  await page.getByRole("link", { name: "View Selected Work" }).click()
  await expect(page.locator("#work")).toBeInViewport()
})

test("switches and persists theme", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: /switch to (light|dark) theme/i }).click()
  const selected = await page.locator("html").getAttribute("class")
  await page.reload()
  await expect(page.locator("html")).toHaveClass(new RegExp(selected ?? ""))
})

test("shows accessible validation without losing data", async ({ page }) => {
  await page.goto("/#contact")
  await page.getByLabel("Name").fill("J")
  await page.getByRole("button", { name: /send enquiry/i }).click()
  await expect(page.getByText(/name must contain at least 2 characters/i)).toBeVisible()
  await expect(page.getByLabel("Name")).toHaveValue("J")
})
```

Add projects for Chromium desktop, 390×844 mobile, and reduced motion. Add assertions that `document.documentElement.scrollWidth <= window.innerWidth`, the mobile menu opens/closes by keyboard, the résumé request returns 200, and no console error is emitted.

- [ ] **Step 2: Install the Playwright browser and run end-to-end tests**

Run:

```powershell
npx.cmd playwright install chromium
npm.cmd run test:e2e
```

Expected: all desktop, mobile, and reduced-motion projects pass.

- [ ] **Step 3: Perform visual and accessibility QA**

Run the development server, then use the in-app browser to inspect 360px, 390px, 768px, 1024px, 1440px, and 1920px widths in both themes. Verify project-logo cropping, text wrapping, focus order, touch targets, theme contrast, mobile sheet, reduced motion, error/success summaries, and absence of horizontal overflow. Fix discovered defects with tests where practical, then rerun affected checks.

- [ ] **Step 4: Write the operational README**

Document prerequisites, `npm.cmd install`, `npm.cmd run dev`, `npm.cmd run test`, `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, environment variables, Resend self-recipient limitation, Vercel deployment, custom-domain follow-up, contact content, and how to replace project assets safely.

- [ ] **Step 5: Run the complete local verification suite**

Run:

```powershell
npm.cmd run test
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
npm.cmd run test:e2e
git diff --check
git status --short
```

Expected: every automated command exits 0; `git diff --check` prints no output; only intentional files are modified/untracked.

- [ ] **Step 6: Commit final verification and documentation**

```powershell
git add -- playwright.config.ts e2e/portfolio.spec.ts README.md .env.example
git commit -m "test: verify and document JPTech portfolio"
```

- [ ] **Step 7: Deploy to Vercel**

Set `RESEND_API_KEY` and `NEXT_PUBLIC_SITE_URL` in the Vercel project. Run:

```powershell
npx.cmd vercel@latest --prod
```

If authentication is requested, have Joseph authenticate the Vercel CLI or connect the repository through the Vercel dashboard, then rerun the production deployment. Update `NEXT_PUBLIC_SITE_URL` to the assigned HTTPS production URL and redeploy so canonical, sitemap, structured data, and sharing metadata use the live origin.

- [ ] **Step 8: Verify the live deployment**

Open the production URL and confirm HTTPS, homepage rendering, theme persistence, anchored navigation, résumé download, email/phone/WhatsApp links, social metadata, and contact delivery to `josephchukwuka4@gmail.com`. Do not report completion until a production form submission succeeds or clearly report that delivery awaits the user's Resend credential.

- [ ] **Step 9: Record deployment configuration**

Commit any final URL/configuration documentation without committing secrets:

```powershell
git add -- README.md .env.example
git commit -m "docs: record JPTech deployment configuration"
```
