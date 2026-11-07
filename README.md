# Yami — Personal Developer Portfolio

A responsive portfolio with GSAP 3, ScrollTrigger, ScrollSmoother, ScrollToPlugin, and CustomEase, inspired by the typography and cinematic motion of [Huy Nguyen's portfolio](https://ghuynguyen.vercel.app/). Artwork and implementation are original, with Yami's supplied content.

## Run locally

Requires Node.js 18 or later. Install the pinned dependencies on a fresh checkout:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Set the `PORT` environment variable to change the port.

```sh
npm run check
npm run build
```

The build produces a standalone `dist/` folder suitable for static hosting, including Vercel, Netlify, or GitHub Pages. Select `npm run build` as the build command and `dist` as the output directory. No backend, API keys, or environment variables are needed for the portfolio.

## Edit content

- `index.html`: biography, leadership, achievements, learning, interests, contact, and metadata.
- `projects.js`: all 10 case studies, project statuses, repository links, and skill groups.
- `styles.css`: colors, typography, layouts, and mobile breakpoints.
- `motion.css`: reference-inspired monochrome UI, fixed navigation, 3D stage, and animation-specific layouts.
- `motion.js`: GSAP opening sequence, per-letter rolling links, scroll and cursor text illumination, pinned perspective cards, scroll marquees, image reveals, hover rows, custom cursor, and smooth scrolling.
- `app.js`: filters, native accessible project dialogs, mobile menu, and original canvas animation.

Email and LinkedIn are intentionally marked **To be added**, as neither was supplied. Replace those labels with verified links in the contact section when ready. No nonfunctional contact form or fabricated résumé is included. Project visuals are original illustrative compositions, not screenshots of the projects.

GSAP is served locally from `assets/vendor/`; `prepare-assets.mjs` copies the runtime from the installed npm package before development and production builds. No CDN requests are needed at runtime. The opening sequence runs on a fresh visit to the home URL, and skips on section deep links. Reload the home URL to replay it. Desktop uses ScrollSmoother; phones keep native touch scrolling with ScrollTrigger effects. The entire GSAP presentation respects reduced motion and provides a static, readable card layout in that mode.

The background supports pausing and stops animating when offscreen or when the browser tab is hidden. The locally bundled Geist font uses the SIL Open Font License in `assets/Geist-OFL.txt`. GSAP's license notice and links are retained in its runtime headers and `assets/vendor/GSAP-README.md`.

## Repository research

Quackathon and Synapse Agents were checked against their public READMEs and source on 27 October 2026. See `SOURCES.md` for the source files. Project content describes prototypes and experimental work without fabricated awards, performance, or deployment claims.

The project is local; it has not been published to a hosting provider.
