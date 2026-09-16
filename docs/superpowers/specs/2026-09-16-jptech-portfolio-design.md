# JPTech Portfolio Design Specification

Date: 2026-09-16  
Status: Approved design, pending user review of this written specification

## 1. Product Summary

Create a production-quality, single-page portfolio for Joseph Chukwuka Precious and his company, JPTech. The site will position Joseph as a Full-Stack Web & Mobile Developer who builds responsive, accessible, high-performance websites, web applications, and cross-platform mobile products.

The approved visual direction is **Signal & Substance**: a balanced premium-technology aesthetic with crisp structure, luminous blue/cyan accents, restrained violet/magenta depth, product-led storytelling, and selective motion. The design must feel memorable without compromising accessibility, performance, or professional credibility.

## 2. Goals

- Convert a mixed audience of business clients, startup founders, agencies, recruiters, and employers.
- Establish JPTech as capable across web, mobile, frontend, and full-stack JavaScript work.
- Present Evolve2p and GluviaCare+ honestly as private products.
- Demonstrate broader web-product thinking through one clearly labeled self-initiated concept.
- Make it easy to contact Joseph by form, email, phone, or WhatsApp.
- Deliver a polished downloadable résumé using verified information only.
- Deploy the finished site to Vercel and keep future custom-domain setup straightforward.

## 3. Non-Goals for the First Release

- Blog or content-management system
- Visitor analytics
- Public GitHub or LinkedIn links
- Testimonials or unverified performance metrics
- Portrait photography
- Public demos or source links for private products
- Multiple marketing pages

## 4. Identity and Contact Information

- Name: Joseph Chukwuka Precious
- Professional title: Full-Stack Web & Mobile Developer
- Company: JPTech
- Location: Abuja, Nigeria
- Availability: Remote work and on-site engagements when needed
- Email: josephchukwuka4@gmail.com
- Phone and WhatsApp: +234 814 714 3376
- Primary CTA: Let's Work Together
- Secondary CTA: View Selected Work

The introduction will be edited for clarity while preserving the supplied meaning: Joseph builds modern, responsive, high-performance digital products with React, React Native, Next.js, TypeScript, and related full-stack JavaScript technologies.

## 5. Site Architecture

The portfolio will use a single public page with anchored navigation. The section order is:

1. Header and navigation
2. Hero
3. Selected Work
4. Services
5. Expertise
6. About and Journey
7. Contact
8. Footer

Project stories will be embedded into the page as substantial showcases instead of sending visitors to separate case-study routes. A custom not-found page, sitemap, robots configuration, metadata, and social-sharing metadata may use framework-level support without changing the single-page marketing structure.

## 6. Section Design

### Header

- Custom typography-led JPTech mark
- Anchors for Work, Services, Expertise, About, and Contact
- Theme toggle
- Desktop navigation and accessible mobile sheet
- Sticky treatment that remains visually lightweight

### Hero

- Clear name, role, location/availability, and value proposition
- Primary and secondary calls to action
- Original product-focused visual composition instead of a portrait
- Subtle cursor-responsive illumination on capable desktop devices
- Static and touch-friendly fallback for mobile and reduced-motion users

### Selected Work

#### Evolve2p

- Private cryptocurrency application for buying, selling, and peer-to-peer trading
- Role: Mobile App Developer, responsible for frontend and backend
- Dates: November 2024 to January 2026
- Technology: React Native, Expo, Express
- Confirmed scope: authentication, identity verification, wallets, buy/sell orders, P2P listings, escrow, trader chat, payment-method management, transaction history, dispute handling, push notifications, and admin controls
- Use the approved official Evolve2p logo
- No public demo link and no fabricated production screenshots

#### GluviaCare+

- Private diabetes-management and connected-care product in active development
- Role: Mobile App Developer. Joseph reports responsibility across frontend and backend; the public case study will substantiate the mobile implementation and describe backend integration only as roadmap work until deployable backend evidence is available.
- Dates: March 2026 to present
- Current mobile stack: Expo SDK 57, React Native 0.86, React 19, TypeScript, Expo Router, NativeWind/Tailwind, React Hook Form, Zod, Zustand, React Native Reanimated, FlashList, and supporting Expo libraries
- Current functionality includes glucose tracking, medication and wellness logging, trends, reminders, consultation/store/urgent-care entry points, onboarding, authentication flows, and persisted local state
- Clearly disclose that current application data is local/mocked and backend/API integration remains on the roadmap
- Use the approved official GluviaCare+ icon
- No public demo link and no fabricated production screenshots

#### RelayOps — JPTech Lab Concept

- Clearly label this as a self-initiated concept, not client work
- Present a modern operations web application concept that demonstrates information architecture, dashboard UI, responsive web craftsmanship, and product thinking
- Do not claim users, commercial outcomes, a public deployment, or client ownership
- Use a polished browser presentation created specifically for the portfolio

### Services

Present six core services with concise descriptions:

1. Website Development
2. Web Application Development
3. Mobile App Development
4. Figma-to-Code UI Implementation
5. API Integration and Backend Development
6. Performance, Maintenance and Support

### Expertise

Group verified capabilities into readable categories instead of displaying an indiscriminate logo wall:

- Languages: JavaScript, TypeScript, HTML5, CSS3
- Web: React, Next.js, Tailwind CSS, responsive design, component architecture, forms and validation
- Mobile: React Native, Expo, Expo Router, NativeWind, cross-platform development, push notifications
- Backend: Node.js, Express, REST APIs, authentication/authorization, third-party integrations
- Data: PostgreSQL, MongoDB, Firebase, Supabase, Prisma
- State/data fetching: React Context, Redux Toolkit, Zustand, TanStack Query
- Tools/platforms: Git, GitHub, npm, Postman, Figma implementation, Vercel, EAS, Visual Studio Code
- Engineering practices: accessibility, SEO fundamentals, performance, debugging, reusable components, and maintenance

### About and Journey

- Short professional story and development philosophy
- Experience timeline:
  - Evolve2p — Mobile App Developer, November 2024 to January 2026
  - GluviaCare+ — Mobile App Developer, March 2026 to present
- Education:
  - Diploma in Computer Science, Ahmadu Bello University, 2020
  - BSc in Computer Science, Ahmadu Bello University, expected December 2026
- Certifications from freeCodeCamp:
  - Responsive Web Design
  - JavaScript Algorithms and Data Structures
  - Front End Development Libraries
  - Back End Development and APIs
  - Relational Databases
- Downloadable professional résumé PDF containing only verified facts

### Contact

- Friendly invitation to discuss work
- Fields: name, email, project type, budget range, and message
- React Hook Form and Zod client validation
- Repeat server-side validation before delivery
- Hidden honeypot and timing checks to reduce automated spam
- Delivery to josephchukwuka4@gmail.com through Resend
- Clear sending, success, validation, and delivery-failure states
- Direct email and WhatsApp recovery links when form delivery fails
- No credentials in client-side code

## 7. Visual System

### Color Tokens

Approved source palette:

- Primary blue: `#2563EB`
- Cyan highlight: `#22D3EE`
- Violet accent: `#8B5CF6`
- Optional magenta accent: `#EC4899`
- Dark background: `#060B18`
- Dark surface: `#0F172A`
- Dark-theme main text: `#F8FAFC`
- Dark-theme muted text: `#94A3B8`

Light-theme tokens will use cool white/ice surfaces, dark navy text, and the same brand colors at contrast-safe strengths. Magenta remains a rare supporting accent rather than a dominant color.

### Typography

- Modern geometric display treatment for major headings and the JPTech mark
- Highly readable sans-serif body type
- Compact mono or technical-label treatment may be used sparingly for metadata
- Fluid sizes that remain readable without oversized mobile headings

### Shape and Layout

- Approximate maximum content width: 1200px
- Fluid gutters and section spacing
- Moderate radii for controls and larger radii for showcase canvases
- Fine borders, restrained glows, subtle grids, and deliberate whitespace
- Avoid excessive glassmorphism, repetitive bento grids, or decorative terminal windows

### Themes

- Both dark and light themes
- Initial theme follows system preference
- Visitor selection persists locally
- No flash of the incorrect theme during page load
- Theme transition remains subtle and honors reduced-motion preferences

## 8. Component and Motion Sources

Use real components from the sources named in `DESIGN.md`, with full visual adaptation:

- shadcn/ui: Sheet, Button, Field, Input, Textarea, Select, and accessible dialog primitives where needed
- Magic UI: restrained Dot Pattern, one Border Beam treatment, and selective Blur Fade reveals
- Motion for React: project transitions, device storytelling, theme microinteractions, and view-based reveals that exceed simple CSS needs
- Lucide React: interface, service, contact, theme, and status icons imported individually
- React Hook Form and Zod: form state and validation

Magic UI components are used from the free MIT-licensed project. Do not use paid components or assets. Avoid adding competing component or animation libraries that solve the same problems.

Visual inspiration will be drawn from the portfolio categories in Awwwards, Framer Marketplace, and Lapa Ninja. These sources guide composition, hierarchy, spacing, and case-study rhythm; no template or distinctive artwork will be copied.

## 9. Signature Interactions

1. Subtle cursor-responsive hero lighting on desktop, with a static mobile fallback
2. Layered browser/device project presentations that reveal supporting details during scroll
3. Refined theme transition and tactile button/project-card feedback

All interactions must remain keyboard-accessible, touch-friendly, and usable without hover. `prefers-reduced-motion` removes ambient and scroll-linked movement while preserving content and state changes.

## 10. Technical Architecture

- Next.js App Router
- React and strict TypeScript
- Tailwind CSS and CSS custom properties for design tokens
- Server Components by default
- Small Client Components only for navigation, theme switching, motion wrappers, and form interaction
- Typed content modules for portfolio data; no CMS in the first release
- Next.js Image for raster assets
- Route handler or server action for contact delivery
- Vercel-compatible production output

The setup will use npm because the workspace currently has no existing package manager or lockfile. Stable, mutually compatible package versions will be confirmed against current official documentation before installation.

## 11. Component Boundaries

- `JPTechMark`: brand rendering independent of header layout
- `Header`: navigation state and desktop/mobile presentation
- `ThemeToggle`: theme selection and accessible state announcement
- `Hero`: content and visual composition
- `SectionHeading`: consistent section hierarchy
- `ProjectShowcase`: shared project narrative structure driven by typed content
- `DeviceFrame` and `BrowserFrame`: reusable project presentation shells
- `ServiceCard`: individual service content
- `ExpertiseGroup`: grouped skills presentation
- `TimelineItem`: experience and education entries
- `ContactForm`: browser validation and submission state
- `Reveal`: reduced-motion-aware entrance behavior
- `Footer`: contact summary and navigation

Large section files will be split when presentation and interaction responsibilities diverge. Portfolio facts will not be embedded repeatedly in components.

## 12. Accessibility

- Target WCAG 2.2 AA where practical
- Semantic landmarks and logical heading hierarchy
- Skip link and visible keyboard focus
- Accessible mobile sheet and theme control
- Labeled form controls with inline error association
- Contrast-safe theme tokens
- Meaningful alternative text for official logos
- Decorative visuals hidden from assistive technology
- Minimum practical touch targets
- No content available only by hover, motion, or color
- Reduced-motion support across CSS and Motion components

## 13. Performance

- Keep the page server-rendered except for necessary interactive islands
- Optimize and correctly size project logos and generated social imagery
- Lazy-load below-the-fold visual media
- Use CSS for simple effects and Motion only for purposeful interactions
- Avoid autoplay video, 3D libraries, constant particles, and heavyweight smooth-scroll libraries
- Prevent layout shift by reserving media dimensions
- Subset/optimize fonts through Next.js font tooling
- Tree-shake icons and animation features

## 14. SEO and Sharing

- Site-specific title and meta description
- Canonical URL configurable for the Vercel deployment and future custom domain
- Open Graph and X metadata
- Bespoke social card reflecting the finished JPTech visual system
- Favicon derived from the JPTech mark
- Sitemap and robots configuration
- Person and professional-service structured data using only verified details
- Truthful project descriptions and semantic headings

## 15. Error Handling

- Validation errors appear beside the affected fields and focus moves appropriately
- Network or delivery failures preserve the visitor's message in the form
- Contact failures offer direct email and WhatsApp alternatives
- Project media failure must not hide project content
- Theme and motion enhancements fail back to a fully usable static page
- Missing deployment secrets produce a controlled form error rather than exposing configuration details

## 16. Verification

Before completion:

- Run the production build
- Run strict TypeScript checking
- Run linting and available automated tests
- Test schema validation and contact success/failure states
- Verify every navigation, phone, email, WhatsApp, and résumé link
- Verify mobile navigation and theme persistence
- Check keyboard order, focus visibility, labels, and reduced-motion behavior
- Check common mobile, tablet, laptop, desktop, and wide-screen widths
- Check for horizontal overflow and layout shift
- Review metadata, sitemap, robots, structured data, and social card
- Review optimized asset usage and browser console output

## 17. Delivery and External Requirements

Deliverables:

- Responsive Next.js portfolio
- JPTech typography-led brand mark and favicon
- Dark and light themes
- Three project presentations
- Contact form integration
- Downloadable résumé PDF
- Bespoke social-sharing image
- Vercel-ready configuration and deployment guidance

External values required at deployment:

- `RESEND_API_KEY`
- A Resend account associated with the receiving email
- Vercel account/project connection

The first deployment may use a Vercel-provided domain. A custom domain can be connected later without redesigning the application.

## 18. Acceptance Criteria

The design is successful when visitors can immediately understand who Joseph is, what JPTech builds, whom it helps, and how to make contact; real and conceptual work are unmistakably differentiated; both themes are polished; the page is responsive and keyboard-usable; animation enhances hierarchy without being required; verified content is accurate; form secrets remain server-only; and the production build passes the defined verification checks.
