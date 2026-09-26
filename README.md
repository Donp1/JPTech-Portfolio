# JPTECH portfolio

A responsive portfolio for Joseph Chukwuka Precious, built with Next.js App Router, TypeScript, Tailwind CSS and Motion for React (the current Framer Motion package).

The site uses adapted [React Bits](https://reactbits.dev/) BlurText, TrueFocus, Magnet, SpotlightCard, ElectricBorder, FuzzyText, and Particles components. Particles uses `ogl` with a canvas fallback when WebGL is unavailable. Their source notice is in `components/react-bits/LICENSE.md`.

## Run locally

Use Node.js 24 (Node 22.12+ and 26+ are also supported by the test tooling). On this Windows workspace, use `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

## Contact delivery

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`. The contact route validates requests on the server and sends plain-text enquiries to `josephchukwuka4@gmail.com`. Set `CONTACT_FROM_EMAIL` to an address on a verified sending domain for production. Without a key, the form keeps the visitor's message and offers a direct email link.

Set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS origin for canonical metadata, sitemap and robots output.

## Checks

```powershell
npm.cmd run test
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

With the dev server running, `npm.cmd run test:browser` checks mobile navigation, particle and portrait rendering, badge stability, browser errors, and horizontal overflow at six viewport widths. It stubs the contact API so test submissions never send an email. The browser smoke test uses the local Microsoft Edge executable; update `tests/browser-smoke.mjs` if Edge is installed elsewhere.

## Content notes

Evolve2p and GluviaCare+ are private products. Their interface compositions on this site are illustrative. RelayOps is an independent JPTECH Lab concept. GluviaCare+'s current data is local or mocked; backend integration remains on its roadmap. Update `lib/content.ts` when verified project details or public links become available.
