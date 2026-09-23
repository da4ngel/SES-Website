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
| Form fields / options / messages | `content/forms.ts` | `contactForm`, `pilotForm`, `sesProForm`; submit stub in `components/forms/Form.tsx` → `submitLead` (see TODO(backend) comment there) |
| Contact page side cards | `content/contact.ts` | |
| Phone, emails, address, socials, header nav, footer links | `content/site.ts` | |
| Page titles & descriptions (SEO) | `content/seo.ts` | Solutions/case studies/news build theirs from their own content |
| FAQ page | `app/faq/page.tsx` | Pulls from `content/technology.ts`'s `technologyFaq` + `managedServicesFaq` — no separate content file |
| Savings calculator | `components/calculator/SavingsCalculator.tsx` | Uses the single published "up to 30%" figure — don't add a second rate without a real source |
| Legal pages (Privacy/Terms/Cookies/Accessibility) | `app/{privacy,terms,cookies,accessibility}/page.tsx` | Each has a `LAST_UPDATED` const and inline TODOs for facts that need legal/business confirmation |
| GA4 analytics | `app/layout.tsx` (`GA_MEASUREMENT_ID`), `lib/analytics.ts` | Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` at build time; nothing ships until it's set |
| Every real route (for the XML + HTML sitemap) | `lib/routes.ts` | Both `app/sitemap.ts` and `app/html-sitemap/page.tsx` read from here — add new routes here, not in either file |
| Brand colors (teal, navy), accent | `app/globals.css` → `:root` tokens | `--brand-teal`, `--brand-navy`, `--accent*`, `--teal-on-navy`; dark mode in the `prefers-color-scheme: dark` block |
| Type sizes / tracking | `app/globals.css` → `@utility text-*` | |
| Easing & durations (CSS) | `app/globals.css` → `--ease-out`, `--ease-in-out`, `--ease-spring`, `--dur-press`, `--dur-hover` | |
| Spring feel (JS), stagger | `lib/motion.ts` → `spring`, `ease`, `STAGGER` | |
| Carousel physics | `lib/gesture.ts` + `components/ui/Carousel.tsx` (`FLICK_VELOCITY`) | |
| Logo | `public/images/ses-logo-original.svg` → run `node scripts/build-logo.mjs` | Generates `components/layout/logo-paths.ts` |
| Favicon / app icon / social image | `app/icon.svg`, `app/apple-icon.tsx`, `app/opengraph-image.tsx` | |
| Toast styling | `app/layout.tsx` → `<Toaster />` | Only used for "Email copied" + form network errors |

---

## 2026-09-23 · Social icons in the footer

- **What:** The footer's LinkedIn/YouTube/Facebook links were plain text. Added icon buttons instead —
  `lucide-react` (already the site's icon set) doesn't ship brand/logo icons, so these are small hand-drawn
  `currentColor` SVGs, same approach `components/layout/Logo.tsx` already uses for the brand mark.
- **Files:** `content/site.ts` (each `social` entry gets an `icon` key), `components/layout/Footer.tsx` (new
  `socialIcons` map + `SocialIcon` component, local to the file since nothing else uses them).
- **How to modify:** add/remove a platform by adding an entry to `site.social` in `content/site.ts` (with `icon`
  matching a key in `socialIcons`) and, for a new platform, its path data in `components/layout/Footer.tsx`.

---

## 2026-09-23 · [Phase 4] Codebase audit cleanup (`docs/CODEBASE_AUDIT_REPORT.md`)

A second, code-architecture-focused audit (dead code, over-engineering, repo noise). Fixed everything except two
deliberately-declined rewrites, and two claims that turned out to be stale on re-check.

### Fixed
- **Dead code:** removed unused `about.facts` (`content/about.ts`, superseded by `content/company.ts`'s `scale`);
  un-exported `STAGGER`, `StoryItem`, `NewsPost`, `Solution` (still used internally, just never imported elsewhere);
  deleted the unused reference-only `public/images/SES-logo.png`.
- **Bug I introduced in Phase 3:** `app/technology/architecture/page.tsx` wrapped the trivial, static, hook-free
  `ArchitectureVisual` in `next/dynamic` — zero bundle benefit, just an extra chunk. Reverted to a plain import. (The
  three homepage `dynamic()` wraps stay — those wrap genuinely heavy Motion/gesture client components.)
- **Redundant helper:** `buttonClasses()` in `components/ui/Button.tsx` duplicated what `<Button href>` already does.
  Replaced both call sites (`app/pilot/page.tsx`, `app/ses-pro/page.tsx`) with `<Button>` directly and removed the export.
- **Stale copy I wrote in Phase 3:** `app/accessibility/page.tsx` said 44px tap targets were "actively being brought up
  to" guidance — that work was already done in the same Phase 3 pass. Moved it into "What's already in place."
- **Inconsistent metadata:** `app/html-sitemap/page.tsx` hardcoded its title/description instead of using
  `content/seo.ts` like every other page. Added `seo.htmlSitemap` and switched it over.
- **Repo hygiene:** `graphify-out/` (~1 MB, regeneratable) was genuinely tracked in git — untracked it and added
  `/graphify-out/` to `.gitignore`.

### Investigated, left as-is
- **`.claude/` and `tsconfig.tsbuildinfo`**: the audit called these "committed to the repo," but neither is actually
  tracked (`git status`/`git ls-files` show nothing for either) — already correctly ignored. Stale claim, no fix needed.
- **`CLAUDE.md`**: is tracked, but it's one line (`@AGENTS.md`) and is the intentional, conventional entry point Claude
  Code itself reads for project instructions — not IDE clutter. Kept.
- **`scripts/build-logo.mjs`**: flagged as an "orphaned" one-off script since it's not wired into `npm run build`. It's
  meant to be run manually and rarely (regenerate the logo paths when the source SVG changes) — `CHANGELOG.md`'s own
  "Where to change what" table already documents it as the tool for exactly that. Kept.
- **`app/how-it-works/page.tsx`** (meta-refresh forwarding stub): the audit suggests deleting it in favor of a host
  redirect. Static export can't do `next.config.ts` redirects, so this depends entirely on the final host — already an
  open item below. Deleting the stub now, before a host redirect exists, would just break the URL outright. Kept until
  the host is confirmed.
- **`ScrollStory.tsx` / `LocalNav.tsx` DOM duplication:** looked at refactoring both to a single shared DOM tree.
  `LocalNav`'s second `<ul>` is Emil Kowalski's clip-path active-tab technique — `aria-hidden`, lightweight (nav labels
  only), and a deliberate, well-known pattern; not worth undoing for architecture purity. `ScrollStory`'s desktop
  (sticky pinned panel, JS-driven cross-fade) and mobile (stacked cards, no cross-fade) layouts are genuinely different
  interaction models, not just a responsive reflow of identical markup — merging them into one CSS-only tree would mean
  dropping the pinned cross-fade UX entirely. Left as two layouts (the heading-text duplication itself was already
  fixed in Phase 3 via the shared `StoryText` subcomponent).
- **Custom Carousel gesture-physics engine (`lib/gesture.ts`, `components/ui/Carousel.tsx`) and `sonner`**: the two P3
  items in the audit's own matrix — real UI/UX rewrites, not bugs, declined per explicit user decision when this pass
  was scoped.

---

## 2026-09-23 · [Phase 3] Site audit fixes (`docs/ses-site-audit.md`)

An external audit found real bugs, missing legal/SEO surface area and a fully-stubbed form. Fixed everything code-level;
content-heavy items (real photos, logos, rewritten case studies, security/integrations pages) are tracked in Open items
below rather than fabricated. Two of the audit's specific claims didn't match the code as written and needed no fix:
the counter animation already renders inside `aria-hidden` with a `sr-only` static value (`components/ui/StatNumber.tsx`),
and there was no scroll-linked opacity fade anywhere in the codebase (`Reveal.tsx` is a one-time `whileInView`, and
`ScrollStory.tsx`'s inactive text only ever dimmed to 30%, never near-zero) — noted here so neither gets "fixed" again.

### [Blocking] Form + analytics
- **What:** Native `required`/`aria-required` on every required field (kept alongside the existing custom JS validation),
  a honeypot spam-trap field, `method="post"` on the form, and the stub `submitLead()` rewritten with an explicit
  TODO(backend) block plus a dev-only console warning so it can't be missed in review. GA4 wired up behind
  `NEXT_PUBLIC_GA_MEASUREMENT_ID` (unset → nothing ships, not even a script tag) with a `generate_lead` event on
  successful submit.
- **Why:** the form discarded every submission (fake 600ms delay, always "success"); `noValidate` + no native attributes
  meant no real field validation signal; no analytics existed anywhere on the site.
- **Files:** `components/forms/Form.tsx`, `lib/analytics.ts` (new), `app/layout.tsx`.
- **Still open:** a real form backend and a real GA4 ID — see Open items.

### [Legal] Real pages, not an 89-word stub
- **What:** Expanded Privacy (was ~80 words) to cover cookies/analytics, CCPA/CPRA, sub-processors, retention, and added
  Terms of Service, Cookie Policy and an Accessibility Statement — all new routes, all linked from the footer.
- **Files:** `app/privacy/page.tsx` (rewritten), `app/terms/page.tsx`, `app/cookies/page.tsx`, `app/accessibility/page.tsx`,
  `content/seo.ts`, `content/site.ts` (`footer.legal`).
- **Still open:** legal review before launch — each page has inline TODO comments (not visible copy) for facts only
  legal/the business can confirm: exact retention period, named sub-processors, governing-law jurisdiction.

### [A11y] The 3 real failures, tap targets, contrast, reduced motion
- Carousel (`components/ui/Carousel.tsx`): added an explicit, visible pause/play button — hover/focus pausing existed
  but wasn't a discoverable WCAG 2.2.2 mechanism.
- `ScrollStory.tsx`: pulled the duplicated desktop/mobile heading markup into one `StoryText` subcomponent so the two
  layouts (genuinely different DOM shapes, can't be merged) can't drift out of sync again.
- Tap targets bumped to ≥44px via hit-area padding, not visual size, on: carousel dots/arrows, `ThemeToggle`, the nav
  hamburger, and `Button`'s `ghost` variant (was unsized).
- Contrast: the "Flagged early" pill was ~4.5:1 in light mode (borderline pass). Added `--accent-soft-text` token
  (`app/globals.css`) — a darker teal for text-on-`accent-soft`, ~6.4:1 — used only where that combination appears.
- Reduced motion: guarded `ScrollStory`'s raw CSS opacity transition (outside Motion, `MotionConfig` didn't cover it) and
  `HeroVisual`'s opacity keyframes (Motion's `reducedMotion="user"` only strips transforms, not opacity).

### [UX] Hero illustration timing
- `components/home/HeroVisual.tsx`: the teal/accent elements (glow, cloud, links, LEDs) started at `opacity: 0` with
  delays stacking to ~2.1s. Compressed the whole sequence to under ~1s — same stagger, faster overall.
- **Not touched:** homepage/how-it-works scroll length — cutting it would work against the site's stated
  "Apple product page" long-scroll brief (`docs/SES_redesign_prompt.md`); flagged for a decision, not trimmed.

### [SEO/technical]
- `app/robots.ts`: `disallow: "/"` on any non-production `VERCEL_ENV` (falls back to `allow` locally/no env var).
- `app/not-found.tsx`: own `metadata` (was inheriting the homepage title).
- `lib/jsonld.ts`: added `websiteJsonLd()` (no `SearchAction` — no search feature exists), `breadcrumbJsonLd()` (wired
  into every nested route), `serviceJsonLd()` (each solution page), `reviewJsonLd()` (the real, attributed testimonials
  on `/results/`). `FAQPage` schema already existed inside `components/ui/Faq.tsx` — the audit's "missing FAQPage" claim
  was stale, same as the counter/scroll-fade claims above.
- `app/page.tsx` and `app/technology/architecture/page.tsx`: `next/dynamic` (no `ssr: false`) on the heaviest
  below-the-fold sections (`HowItWorksStory`, `PlatformPeek`, `SocialProof`, `ArchitectureVisual`) — still fully
  server-rendered, just code-split into separate chunks.
- New `app/html-sitemap/page.tsx`, built from the same `lib/routes.ts` list `app/sitemap.ts` now also reads from.

### [Small stuff]
- `components/layout/Logo.tsx`: removed the baked-in default height. `lib/cn.ts` is a plain join, not `tailwind-merge` —
  the old default (`h-9`) plus every caller's override (`h-10`, `h-12`) were both landing in the class list.
- `content/news.ts`: the `pfifc-frisco-2026` post was dated before the event it describes in the past tense — moved the
  date to after the event instead of rewriting the copy.
- `components/ui/LogoWall.tsx`: removed the `grayscale`/`hover:grayscale-0` classes that had zero effect on plain text
  (documented in the file comment for when real `<img>` logos replace the names).
- `components/forms/Form.tsx`: the consent checkbox now has an explicit `id`/`htmlFor` pairing instead of relying only
  on implicit label-wrapping.

### [Credibility] What was actually buildable without fabricating anything
- New `app/savings-calculator/page.tsx` + `components/calculator/SavingsCalculator.tsx`: visitor-input-driven, uses only
  the one already-published "up to 30%" figure — no invented range or second statistic.
- New `app/faq/page.tsx`: consolidates the real `technologyFaq` + `managedServicesFaq` content (already accurate,
  previously split across two pages with no dedicated URL) using the existing `Faq` component.

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
- [ ] **Forms backend:** replace `submitLead` in `components/forms/Form.tsx` (form id is sent: `contact` / `pilot` / `ses-pro`) — see the TODO(backend) comment there.
- [ ] **GA4 Measurement ID:** set `NEXT_PUBLIC_GA_MEASUREMENT_ID` at build time (see `app/layout.tsx`, `lib/analytics.ts`). A cookie-consent banner should ship in the same change (`app/cookies/page.tsx` already commits to this).
- [ ] Real client + partner logo SVGs, case-study photos, a DLC product photo (see `public/images/README.md`).
- [ ] **Legal review** of `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/cookies/page.tsx`, `app/accessibility/page.tsx` before launch — each has inline TODO comments for facts that need confirming (retention period, named sub-processors, governing-law jurisdiction).
- [ ] **Content depth** (from the 2026-09-23 audit, not fabricated — needs real facts/copy):
  - Case studies rewritten to 800–1,200 words each with real methodology/timeline (`content/caseStudies.ts`)
  - About page leadership/team bios (real names)
  - Sourcing footnotes for headline claims ("up to 30%", "1,100+ locations", etc.)
  - Security/compliance page (SOC 2, data handling, uptime)
  - Integrations page (BMS/CMMS/ServiceChannel/Corrigo/utility programs)
  - Careers page
- [ ] **Homepage/how-it-works scroll length:** the 2026-09-23 audit flagged this as excessive; conflicts with the site's own "Apple product page" long-scroll brief — needs a decision before anyone touches it.
- [ ] If the host supports redirects: 301 `/how-it-works/` → `/technology/how-it-works/`.
