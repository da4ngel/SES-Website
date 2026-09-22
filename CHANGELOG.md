# SES Website: Changelog

How to use this file:
1. **Where to change what** tells you which file to edit for common changes. No component code needed for copy.
2. **Entries** (newest first) record each change: what, why, files, how to modify, and follow-ups.
3. **Open items** collects every TODO in one place.

Run locally: `npm run dev` → http://localhost:3000 · Static build: `npm run build` → `out/`

---

## Where to change what

| I want to change… | Edit | Notes |
|---|---|---|
| Any homepage copy | `content/home.ts` | Keys follow section order: `hero`, `bigNumbers`, `storySection`, `solutionsSection`, `platformPeek`, `socialProof`, `finalCta`, `resultsTeaser` |
| Scale numbers (25M+ sq ft, 100K+ assets…) | `content/company.ts` → `scale` | Shown on home, Results, About |
| Managed services block | `content/company.ts` → `managedServices` | |
| ESG numbers, awards | `content/company.ts` → `esg`, `awards` | |
| The 4 steps (how it works) | `content/howItWorks.ts` → `steps` | Homepage story + `/technology/how-it-works/` |
| Technology pages copy, FAQs | `content/technology.ts` | `techNav` = local sub-nav order |
| A solution (title, copy, deep-dive sections) | `content/solutions.ts` | `sections` renders in order; kinds: `split`, `compare`, `story`, `stack`, `steps`, `beforeAfter`, `groups` |
| Case studies | `content/caseStudies.ts` | Add an entry → new page at `/results/<slug>/` + card + sitemap |
| Testimonials, client names | `content/results.ts` | Clients are text placeholders until SVG logos arrive |
| News posts | `content/news.ts` | Add an entry → new page at `/news/<slug>/` |
| Pilot Program page | `content/pilot.ts` | |
| SES Pro (contractors) page | `content/sesPro.ts` | Partner names = text placeholders |
| Form fields / options / messages | `content/forms.ts` | `contactForm`, `pilotForm`, `sesProForm`; submit stub in `components/forms/Form.tsx` → `submitLead` |
| Contact page side cards | `content/contact.ts` | |
| Phone, emails, address, socials, header nav, footer links | `content/site.ts` | |
| Page titles & descriptions (SEO) | `content/seo.ts` | Solutions/case studies/news build theirs from their own content |
| Brand colors (teal, navy), accent | `app/globals.css` → `:root` tokens | `--brand-teal`, `--brand-navy`, `--accent*`, `--teal-on-navy`; dark mode in the `prefers-color-scheme: dark` block |
| Type sizes / tracking | `app/globals.css` → `@utility text-*` | |
| Easing & durations (CSS) | `app/globals.css` → `--ease-out`, `--ease-in-out`, `--ease-spring`, `--dur-press`, `--dur-hover` | |
| Spring feel (JS), stagger | `lib/motion.ts` → `spring`, `ease`, `STAGGER` | |
| Carousel physics | `lib/gesture.ts` + `components/ui/Carousel.tsx` (`FLICK_VELOCITY`) | |
| Logo | `public/images/ses-logo-original.svg` → run `node scripts/build-logo.mjs` | Generates `components/layout/logo-paths.ts` |
| Favicon / app icon / social image | `app/icon.svg`, `app/apple-icon.tsx`, `app/opengraph-image.tsx` | |
| Toast styling | `app/layout.tsx` → `<Toaster />` | Only used for "Email copied" + form network errors |

---

## 2026-09-22 · [Phase 2] Brand, full content, motion & mobile polish

### [Brand] Official logo + brand teal
- **What:** Replaced the placeholder logo with the official SES vector (fetched from the current site's `logo.svg`), refined: "save energy" now uses `currentColor` so it reads on light and dark (the original was white-only). Accent switched to the brand teal; green/blue comparison switch removed.
- **Why:** You supplied the logo and chose "Brand teal". Pure teal `#069999` is only 3.4:1 on white, so text uses `#007a7a` (5.0:1); dark mode uses `#22b8b8` (8.6:1). Text on navy uses `--teal-on-navy` (6.0:1).
- **Files:** `components/layout/Logo.tsx`, `components/layout/logo-paths.ts` (generated), `scripts/build-logo.mjs`, `public/images/ses-logo-original.svg`, `app/globals.css`, `app/icon.svg`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`, `lib/jsonld.ts`. Deleted `components/layout/AccentSwitch.tsx`.
- **How to modify:** Colors → tokens in `app/globals.css`. New logo file → replace the SVG and run `node scripts/build-logo.mjs`.

### [Content] Everything from the old site, restructured
- **What:** New sections and pages:
  - `/technology/` (+ `how-it-works`, `architecture`, `dlc`, `asset-management`) with a sticky local nav
  - 7 case studies at `/results/<slug>/` with an industry filter
  - `/news/` with 7 posts
  - `/pilot/` and `/ses-pro/` with their own application forms
  - About gains scale, ESG and awards
  - Solution pages gain deep-dive sections: the FDD comparison table, the "Unit 3" story, the value stack, SmartPM steps + PDF, sensor groups, and the product names SESAirQ / SetPoint IQ / ARC
  - Full real testimonial wording
  - Homepage gains a scale strip, Managed Services and case-study teasers
- **Why:** You asked to use all the information from the original site. Numbers were re-checked against the live pages on 2026-09-22 (except the Pilot and ESG pages, flagged below).
- **Files:**
  - Content: `content/technology.ts`, `caseStudies.ts`, `news.ts`, `pilot.ts`, `sesPro.ts`, `company.ts`, `forms.ts`, `solutions.ts`, `results.ts`, `site.ts`, `seo.ts`, `home.ts`
  - Routes: `app/technology/**`, `app/results/[slug]`, `app/news/**`, `app/pilot`, `app/ses-pro`
  - Components: `components/solutions/SolutionSections.tsx`, `components/results/ResultsGrid.tsx`, `components/home/ManagedServices.tsx`, `components/home/ResultsTeaser.tsx`, `components/technology/ArchitectureVisual.tsx`
- **How to modify:** Edit only the `content/` files (see the map above).
- `/how-it-works/` is now a forwarding stub to `/technology/how-it-works/`, because static hosting can't do server redirects. If your host supports redirects, add a 301 there and delete `app/how-it-works/`.

### [Design system] New shared components
- **What:**
  - `Form`: schema-driven. Inline validation, focus on the first invalid field, success in place, chips/radio groups.
  - `ScrollStory`: a pinned scroll story, reused on the homepage and on Architecture.
  - `Faq`: native `<details>` + FAQPage JSON-LD.
  - `LocalNav`: clip-path active pill that glides between Technology pages.
  - `StatTiles`, `CopyEmail` (a Sonner toast), `ResultsGrid`.
- **Files:** `components/forms/Form.tsx`, `components/ui/{ScrollStory,Faq,LocalNav,StatTiles,CopyEmail}.tsx`, `components/results/ResultsGrid.tsx`. Removed `components/contact/ContactForm.tsx`.

### [Motion] Audit fixes (emil-design-eng / improve-animations / apple-design)
| Before | After | Why |
|---|---|---|
| Mobile menu enter/exit `scale: 0.6`, same speed both ways | `scale: 0.95` + opacity from the trigger; enter `spring.ui`, exit 150ms ease-out | Nothing appears from almost nothing; the system's response should be faster than the entrance |
| `.lift` hover 400ms, `(hover: hover)` only | 250ms `--ease-out`, `(hover: hover) and (pointer: fine)` | UI transitions stay under 300ms; no sticky hover after a tap |
| Press 280ms back / 120ms down | Press-in 100ms, release 160ms, `--ease-out` | Press feedback budget 100–160ms |
| Button `transition-colors` overrode the press transform | `pressable` owns transform + color transitions | The press scale was being cancelled |
| Story visual cross-fade showed two states | `blur(2px)` during the swap | Masks the double exposure |
| Carousel: projection only | + flick above 0.11 px/ms advances; a second finger mid-drag is ignored | Momentum dismissal; multi-touch protection |
| Ad-hoc `i * 0.06` / `0.08` delays | One `STAGGER = 50ms`, capped at 6 items | Consistent, short, decorative |
| Tailwind default easing | `--default-transition-*` = 200ms strong ease-out | Stronger curve everywhere by default |

### [Mobile] Native feel (mobile-native)
- **What:**
  - No tap-highlight flash.
  - `touch-action: manipulation` on controls (no tap delay).
  - `user-select: none` on controls only.
  - `viewport-fit=cover` + safe-area padding on the header, footer, page gutters and toasts.
  - `interactive-widget=resizes-content`.
  - Inputs stay at 17px (no iOS zoom).
- **Needs a real phone to confirm:** sticky hover, tap delay, safe areas (notch, home bar), keyboard behavior on the forms.

### [A11y] Fixes
- Footer links have 24px+ tap targets. The consent link is always underlined.
- Local nav: the longest matching path wins, so "Overview" no longer claims every sub-page.

### [Perf] Static export prefetch fix
- `scripts/fix-static-prefetch.mjs` (postbuild) flattens the Windows-only `__next.*` folders, so client prefetches don't 404.

---

## 2026-09-22 · [Phase 1] Design system + all pages
- Next.js 16 static export, Tailwind v4 tokens, Motion springs, system font type scale.
- Homepage sections:
  - hero with a one-shot energy glow
  - count-up numbers
  - pinned 4-step story
  - bento of 7 solutions
  - glass dashboard mock
  - logo wall + swipeable testimonial carousel (momentum projection, rubber-banding, velocity handoff)
  - final CTA
- Inner pages: How it works, Solutions + 7 pages, Results, About, Contact (form), Privacy, 404.
- SEO: per-page metadata, Open Graph image, sitemap, robots, JSON-LD Organization.

---

## Open items
- [ ] **Confirm facts that conflict on the old site:**
  - St. Michael's location (Lyons, NY in the case study vs. North Andover, MA on the old homepage)
  - ROI (3–18 months vs. 3+ months)
  - support hours (16/7 vs. 24/7)
  - savings range (up to 30% vs. 20–30%)
  - Planet Fitness counts (350+ locations vs. "100-plus corporate")
- [ ] **Verify Pilot figures** (90-day guarantee, $7K–$15K, 30–50%, 15–30%) and **ESG figures**. These come from the crawl summary; the live pages couldn't be re-read.
- [ ] Alan Buell's title, and whether the "international fitness franchise" can be named.
- [ ] Bed Bath & Beyond on the client list: keep or drop?
- [ ] Response times in form success messages ("one business day"): confirm.
- [ ] **Forms backend:** replace `submitLead` in `components/forms/Form.tsx` (form id is sent: `contact` / `pilot` / `ses-pro`).
- [ ] Real client + partner logo SVGs, case-study photos, a DLC product photo (see `public/images/README.md`).
- [ ] Privacy policy: legal review (`app/privacy/page.tsx`).
- [ ] If the host supports redirects: 301 `/how-it-works/` → `/technology/how-it-works/`.
