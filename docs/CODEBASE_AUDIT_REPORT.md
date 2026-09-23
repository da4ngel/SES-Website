# SES Website: Comprehensive Codebase & Architecture Audit

**Audited Repository:** `SES-Website`  
**Date:** September 23, 2026  
**Stack:** Next.js 16.3.5 (App Router, Static Export `output: "export"`), React 19.2.8, Tailwind CSS v4, Motion (Framer Motion) v13.4, Lucide React, Sonner  
**Audit Scope:** Dead/unused code, unwanted complexity, over-engineering, non-production noise, and architectural discrepancies.  
*(Note: Per user instruction, this audit is read-only; no application source code was modified.)*

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Dead & Unused Code](#2-dead--unused-code)
   - 2.1 [Unused Content Properties](#21-unused-content-properties)
   - 2.2 [Unused Exports & Types](#22-unused-exports--types)
   - 2.3 [Unused Static Assets](#23-unused-static-assets)
   - 2.4 [Orphaned One-Off Build Scripts](#24-orphaned-one-off-build-scripts)
   - 2.5 [Obsolete / Forwarding Routes](#25-obsolete--forwarding-routes)
3. [Unwanted Complexity & Over-Engineering](#3-unwanted-complexity--over-engineering)
   - 3.1 [Custom Physics & Gesture Momentum Engine for a Single Component](#31-custom-physics--gesture-momentum-engine-for-a-single-component)
   - 3.2 [Cargo-Cult Dynamic Code-Splitting of Pure Server Components](#32-cargo-cult-dynamic-code-splitting-of-pure-server-components)
   - 3.3 [Heavy SVG Path Duplication (Memory & Bundle Bloat)](#33-heavy-svg-path-duplication-memory--bundle-bloat)
   - 3.4 [DOM Tree Duplication in `ScrollStory` and `LocalNav`](#34-dom-tree-duplication-in-scrollstory-and-localnav)
   - 3.5 [Redundant Helper Abstraction (`buttonClasses`)](#35-redundant-helper-abstraction-buttonclasses)
   - 3.6 [Third-Party Toast Library Overhead for Two Messages](#36-third-party-toast-library-overhead-for-two-messages)
4. [Noise Code & Repository Clutter](#4-noise-code--repository-clutter)
   - 4.1 [`graphify-out/` Directory Tracked in Git (~1 MB)](#41-graphify-out-directory-tracked-in-git-1-mb)
   - 4.2 [Claude IDE Artifacts (`.claude/` and `CLAUDE.md`)](#42-claude-ide-artifacts-claude-and-claudemd)
   - 4.3 [`tsconfig.tsbuildinfo` in Root](#43-tsconfigtsbuildinfo-in-root)
   - 4.4 [Internal Prompt & Audit Notes in `docs/`](#44-internal-prompt--audit-notes-in-docs)
   - 4.5 [Windows-Specific Postbuild Patch](#45-windows-specific-postbuild-patch)
5. [Disconnections & Production Readiness Gaps](#5-disconnections--production-readiness-gaps)
   - 5.1 [Stubbed Form Submissions (Lead Capture Discarded)](#51-stubbed-form-submissions-lead-capture-discarded)
   - 5.2 [Analytics Fully Dormant](#52-analytics-fully-dormant)
   - 5.3 [Out-of-Sync Public Accessibility Copy](#53-out-of-sync-public-accessibility-copy)
   - 5.4 [Hardcoded Metadata on HTML Sitemap](#54-hardcoded-metadata-on-html-sitemap)
   - 5.5 [Unresolved Business & Legal Placeholders](#55-unresolved-business--legal-placeholders)
6. [Actionable Recommendations Matrix](#6-actionable-recommendations-matrix)

---

## 1. Executive Summary

The `SES-Website` repository is a high-craft static marketing website built to promote Save Energy Systems’ commercial HVAC Demand Limiting Controller (DLC) and SaaS monitoring platform. The codebase exhibits strong visual execution: custom Tailwind v4 tokens, smooth Motion animations, Apple-like typography scales, full keyboard accessibility, dark/light theme switching without hydration flashes, and comprehensive Schema.org JSON-LD structured data.

However, a technical audit reveals a stark contrast between the site's simple requirements (a static marketing brochure with 25 routes) and its internal engineering complexity:
* **Over-Engineering:** A complete 336-line gesture-physics momentum engine is implemented solely for a 4-quote testimonial slider on the homepage.
* **Dead Code:** Unreferenced content arrays, unimported types, unreferenced image files, and legacy redirect routes that are excluded from sitemaps but still build.
* **Unnecessary Overhead:** Pure static server components wrapped in `next/dynamic`, 15 KB of raw SVG vector paths serialized as JavaScript arrays, and duplicate DOM trees rendered for responsive layouts.
* **Repository Noise:** ~1 MB of third-party dependency graph dumps, IDE configurations, and build caches committed directly to Git.
* **Critical Commercial Gaps:** All lead capture forms on `/contact/`, `/pilot/`, and `/ses-pro/` run a fake `setTimeout` stub with no backend, meaning inquiries are silently discarded.

---

## 2. Dead & Unused Code

### 2.1 Unused Content Properties
* **`about.facts` in [`content/about.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/content/about.ts#L8-L12)**
  ```ts
  facts: [
    { value: "2012", label: "DLC in the field since" },
    { value: "1,100+", label: "Locations served" },
    { value: "5", label: "Industries" },
  ],
  ```
  **Finding:** When the unified `scale` constant was introduced in [`content/company.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/content/company.ts#L7-L12), [`app/about/page.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/about/page.tsx#L25) was updated to render `<StatTiles stats={scale} />`. The original `about.facts` array was left behind in `content/about.ts` and has zero references across the codebase.

### 2.2 Unused Exports & Types
* **`STAGGER` in [`lib/motion.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/lib/motion.ts#L30)**
  ```ts
  export const STAGGER = 0.05;
  ```
  **Finding:** External components import and use `staggerDelay(i)` or specify their own transition delays. The base constant `STAGGER` is never imported outside `lib/motion.ts`.
* **`StoryItem` in [`components/ui/ScrollStory.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/ui/ScrollStory.tsx#L10-L17)**
  ```ts
  export type StoryItem = { ... };
  ```
  **Finding:** Calling pages ([`app/technology/architecture/page.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/technology/architecture/page.tsx) and [`components/home/HowItWorksStory.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/home/HowItWorksStory.tsx)) pass inline object literals. `StoryItem` is never imported.
* **`NewsPost` in [`content/news.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/content/news.ts#L9-L18)**
  ```ts
  export type NewsPost = { ... };
  ```
  **Finding:** Exported type that is never imported by any page or component.
* **`Solution` in [`content/solutions.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/content/solutions.ts#L31-L52)**
  ```ts
  export type Solution = { ... };
  ```
  **Finding:** Used internally within `content/solutions.ts` to type the `solutions` array, but is exported and never imported externally.

### 2.3 Unused Static Assets
* **[`public/images/SES-logo.png`](file:///c:/Users/Dark_Angel/Projects/SES-Website/public/images/SES-logo.png) (9.4 KB)**
  **Finding:** Documented in [`public/images/README.md`](file:///c:/Users/Dark_Angel/Projects/SES-Website/public/images/README.md#L16) as *"reference only; not used on the site"*. It remains in the public directory and is bundled into every static build export (`out/images/SES-logo.png`).

### 2.4 Orphaned One-Off Build Scripts
* **[`scripts/build-logo.mjs`](file:///c:/Users/Dark_Angel/Projects/SES-Website/scripts/build-logo.mjs)**
  **Finding:** A script used once to extract SVG `<path>` definitions from `public/images/ses-logo-original.svg` into `components/layout/logo-paths.ts`. It is not configured in `package.json` scripts, not executed during build/CI, and serves no ongoing purpose in the production workflow.

### 2.5 Obsolete / Forwarding Routes
* **[`app/how-it-works/page.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/how-it-works/page.tsx)**
  ```tsx
  const TARGET = "/technology/how-it-works/";
  export default function MovedPage() {
    return (
      <section className="container-page py-32 text-center">
        <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
        ...
      </section>
    );
  }
  ```
  **Finding:** This page is an HTML client-side `<meta http-equiv="refresh">` forwarding stub created because static hosting was assumed not to support server redirects. In [`lib/routes.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/lib/routes.ts#L8), it is deliberately excluded from `allRoutes()` and both XML and HTML sitemaps. Standard host redirects (e.g. `vercel.json` or `next.config.ts` redirects) make this entire route file obsolete.

---

## 3. Unwanted Complexity & Over-Engineering

### 3.1 Custom Physics & Gesture Momentum Engine for a Single Component
* **Files:**
  * [`lib/gesture.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/lib/gesture.ts) (49 lines: deceleration projection, rubberband boundary equations, velocity tracking buffer)
  * [`components/ui/Carousel.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/ui/Carousel.tsx) (287 lines: pointer capture, multi-touch ignore, custom hysteresis, resize observers, motion animation controls)
  * [`components/ui/TestimonialCarousel.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/ui/TestimonialCarousel.tsx) (28 lines)
* **Finding:**
  A complete gesture engine implementing Apple Fluid Interface deceleration equations (`project()`), exponential resistance boundaries (`rubberband()`), 10px directional hysteresis, and microsecond `VelocityTracker` sliding windows was created **solely for one single component on the homepage**: 4 customer quotes in [`components/home/SocialProof.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/home/SocialProof.tsx).
  Nowhere else on the 25+ routes is a carousel used. For a static marketing site, a standard CSS scroll-snap container with simple next/previous buttons would reduce bundle weight and eliminate 360 lines of high-maintenance animation code.

### 3.2 Cargo-Cult Dynamic Code-Splitting of Pure Server Components
* **File:** [`app/technology/architecture/page.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/technology/architecture/page.tsx#L14-L15)
  ```ts
  // No ssr:false — still fully server-rendered, this only splits the client bundle.
  const ArchitectureVisual = dynamic(() => import("@/components/technology/ArchitectureVisual").then((m) => m.ArchitectureVisual));
  ```
* **Finding:**
  [`components/technology/ArchitectureVisual.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/technology/ArchitectureVisual.tsx) is a **37-line, stateless, static Server Component** containing only static Tailwind `div`s. It has no React hooks (`useState`, `useEffect`), no browser APIs, and no client-side motion.
  Dynamically importing a 37-line HTML component yields zero client bundle reduction, but forces Next.js to generate an extra split chunk and manifest entry, adding HTTP chunk overhead.

### 3.3 Heavy SVG Path Duplication (Memory & Bundle Bloat)
* **Files:**
  * [`public/images/ses-logo-original.svg`](file:///c:/Users/Dark_Angel/Projects/SES-Website/public/images/ses-logo-original.svg) (15.2 KB)
  * [`components/layout/logo-paths.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/layout/logo-paths.ts) (14.8 KB)
  * [`app/icon.svg`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/icon.svg) (2.6 KB)
* **Finding:**
  The 25 SVG paths making up the SES logo exist simultaneously as a static SVG file and as serialized JavaScript string arrays in `logo-paths.ts`. This file is imported into client components ([`components/layout/Logo.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/layout/Logo.tsx), [`app/apple-icon.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/apple-icon.tsx), and [`app/opengraph-image.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/opengraph-image.tsx)), inlining nearly 15 KB of raw path strings directly into client bundles.

### 3.4 DOM Tree Duplication in `ScrollStory` and `LocalNav`
* **[`components/ui/ScrollStory.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/ui/ScrollStory.tsx#L85-L135):**
  To support desktop sticky side-by-side pinning and mobile stacked cards, `ScrollStory` renders `items.map(it => it.visual)` **twice in the DOM tree** (lines 89–103 for desktop, lines 126–133 for mobile). On pages like Architecture (6 layers) and Homepage (4 steps), all complex SVG visuals and illustrations are rendered twice into the HTML.
* **[`components/ui/LocalNav.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/ui/LocalNav.tsx#L62-L93):**
  Uses a clip-path tab technique that duplicates the navigation `<ul>` list twice: one primary interactive list and a second identical `<ul>` with `aria-hidden="true"` clipped to the active pill.

### 3.5 Redundant Helper Abstraction (`buttonClasses`)
* **File:** [`components/ui/Button.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/ui/Button.tsx#L27-L29)
  ```ts
  export function buttonClasses({ variant = "primary", size = "md" }: { ... } = {}) { ... }
  ```
  **Usage:** Only used in two places:
  * [`app/pilot/page.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/pilot/page.tsx#L27): `<a href="#apply" className={buttonClasses({ size: "lg", variant: "onNavy" }) + " mt-10"}>`
  * [`app/ses-pro/page.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/ses-pro/page.tsx#L26): `<a href="#apply" className={buttonClasses({ size: "lg", variant: "onNavy" }) + " mt-10"}>`
  **Finding:** The standard `<Button>` component already supports `href` links (including `#apply` hash links) and accepts `className`. Writing a separate function and manually concatenating class strings (`+ " mt-10"`) is an unnecessary pattern divergence.

### 3.6 Third-Party Toast Library Overhead for Two Messages
* **Dependency:** `"sonner": "^2.0.8"` in [`package.json`](file:///c:/Users/Dark_Angel/Projects/SES-Website/package.json#L18)
* **Finding:**
  The `<Toaster />` component is mounted globally in [`app/layout.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/layout.tsx#L66-L72). It is invoked in only two places across the entire site:
  1. "Email copied" toast in [`components/ui/CopyEmail.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/ui/CopyEmail.tsx#L11).
  2. Network error toast in [`components/forms/Form.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/forms/Form.tsx#L112).
  Pulling in an entire third-party toast dependency and runtime portal for two static messages adds unnecessary runtime JS.

---

## 4. Noise Code & Repository Clutter

### 4.1 `graphify-out/` Directory Tracked in Git (~1 MB)
* **Location:** `graphify-out/`
* **Finding:** Contains 9 files and cache directories produced by an external dependency analysis tool:
  * `graph.json` (530 KB)
  * `graph.html` (412 KB)
  * `manifest.json` (21.6 KB)
  * `GRAPH_REPORT.md` (8.3 KB)
  * `cost.json`, `.graphify_labels.json`, `.graphify_python`, `.graphify_root`, and `cache/`
* **Impact:** These files are committed to Git history, bloating the repository and confusing search results.

### 4.2 Claude IDE Artifacts (`.claude/` and `CLAUDE.md`)
* **Files:**
  * `.claude/settings.local.json`
  * `CLAUDE.md` (1 line: `@AGENTS.md`)
* **Finding:** Tool-specific files that have no relation to website functionality and belong in global/local user configurations or `.gitignore`.

### 4.3 `tsconfig.tsbuildinfo` in Root
* **File:** `tsconfig.tsbuildinfo` (126 KB)
* **Finding:** Incremental TypeScript build cache committed to the repository root, despite `*.tsbuildinfo` already being listed in [`.gitignore`](file:///c:/Users/Dark_Angel/Projects/SES-Website/.gitignore#L40).

### 4.4 Internal Prompt & Audit Notes in `docs/`
* **Files:**
  * `docs/ses-site-audit.md` (13.4 KB, 156 lines)
  * `docs/SES_redesign_prompt.md` (7.9 KB, 203 lines)
* **Finding:** Internal planning prompts and an audit from an earlier iteration are stored in the active project directory rather than an external documentation or ticket system.

### 4.5 Windows-Specific Postbuild Patch
* **File:** [`scripts/fix-static-prefetch.mjs`](file:///c:/Users/Dark_Angel/Projects/SES-Website/scripts/fix-static-prefetch.mjs)
  ```json
  "postbuild": "node scripts/fix-static-prefetch.mjs"
  ```
* **Finding:** Workaround for a Windows-specific Next.js static-export bug where client prefetches create dot-separated directory structures (`__next.*`). On Linux/macOS and Vercel build servers, this script executes after every build but does nothing.

---

## 5. Disconnections & Production Readiness Gaps

### 5.1 Stubbed Form Submissions (Lead Capture Discarded)
* **File:** [`components/forms/Form.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/components/forms/Form.tsx#L37-L57)
  ```ts
  /**
   * TODO(backend): this is a stub. No submission currently reaches anywhere.
   * Wire this to a real form service, CRM or API before launch.
   */
  async function submitLead(formId: string, values: Values): Promise<void> {
    void formId;
    void values;
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Form] submitLead is a stub — no backend is configured...");
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  ```
  **Critical Impact:**
  The forms on `/contact/`, `/pilot/`, and `/ses-pro/` present fully functional UI with validation and success screens, but **every lead submitted by a visitor is silently discarded**. In a production environment, potential customers and contractor partners will believe they submitted a lead, while no notification or record is ever generated.

### 5.2 Analytics Fully Dormant
* **Files:** [`app/layout.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/layout.tsx#L14), [`lib/analytics.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/lib/analytics.ts#L8)
* **Impact:**
  `NEXT_PUBLIC_GA_MEASUREMENT_ID` is not set in the build environment. As a result, no Google Analytics script is loaded, and the `generate_lead` conversion event in `Form.tsx` no-ops.

### 5.3 Out-of-Sync Public Accessibility Copy
* **File:** [`app/accessibility/page.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/accessibility/page.tsx#L20-L22)
  ```ts
  title: "What we're actively working on",
  body: "Tap-target sizing on a few compact controls (carousel dots, icon buttons) is being brought up to Apple/Google's 44px guidance...",
  ```
* **Contradiction:**
  According to [`CHANGELOG.md`](file:///c:/Users/Dark_Angel/Projects/SES-Website/CHANGELOG.md#L81-L82), all tap targets were already increased to ≥44px in Phase 3. The live Accessibility statement states that this work is still in progress.

### 5.4 Hardcoded Metadata on HTML Sitemap
* **File:** [`app/html-sitemap/page.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/html-sitemap/page.tsx#L11-L15)
* **Inconsistency:**
  Every other page in the application draws its title, description, and OpenGraph data from [`content/seo.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/content/seo.ts). `html-sitemap` hardcodes its metadata inline instead of using `seo.htmlSitemap`.

### 5.5 Unresolved Business & Legal Placeholders
Unresolved TODO markers across active production content:
* [`content/results.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/content/results.ts#L23): `// TODO: Bed Bath & Beyond appears on the old site. Keep it or drop it?`
* [`content/company.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/content/company.ts#L28): `// TODO: verify figures with SES (from the crawl summary...)`
* [`content/pilot.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/content/pilot.ts#L3): `// TODO: verify figures with SES...`
* [`content/about.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/content/about.ts#L27): `// TODO: confirm service area wording`
* [`content/forms.ts`](file:///c:/Users/Dark_Angel/Projects/SES-Website/content/forms.ts#L80): `// TODO: confirm response time`
* [`app/terms/page.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/terms/page.tsx#L40): `// TODO: confirm this is the jurisdiction SES actually wants...`
* [`app/privacy/page.tsx`](file:///c:/Users/Dark_Angel/Projects/SES-Website/app/privacy/page.tsx#L42): `// TODO: name the actual vendors...`

---

## 6. Actionable Recommendations Matrix

| Priority | Area | Issue | Recommended Action |
|:---:|:---|:---|:---|
| **P0** | **Business Logic** | `submitLead` in `Form.tsx` discards all form submissions | Integrate with a real form endpoint (HubSpot, Formspree, or AWS Lambda) |
| **P0** | **Analytics** | GA4 tracking disabled | Provide `NEXT_PUBLIC_GA_MEASUREMENT_ID` in production environment |
| **P1** | **Repository Cleanliness** | `graphify-out/` committed to Git (~1 MB) | Untrack with `git rm -r --cached graphify-out` and add to `.gitignore` |
| **P1** | **Repository Cleanliness** | `tsconfig.tsbuildinfo` in workspace root | Delete untracked binary file |
| **P1** | **Tooling Artifacts** | `.claude/` and `CLAUDE.md` in repository | Remove or add to `.gitignore` |
| **P2** | **Dead Code** | `about.facts` in `content/about.ts` | Delete orphaned array |
| **P2** | **Dead Code** | Unused exports (`STAGGER`, `StoryItem`, `NewsPost`, `Solution`) | Remove unnecessary `export` keywords or prune declarations |
| **P2** | **Dead Code** | `public/images/SES-logo.png` unused | Delete unused image asset |
| **P2** | **Architecture** | Dynamic import on static Server Component (`ArchitectureVisual`) | Change to direct React import: `import { ArchitectureVisual } ...` |
| **P2** | **Architecture** | Duplicate DOM trees in `ScrollStory.tsx` | Refactor responsive layout to share visual nodes via CSS Grid |
| **P3** | **Over-Engineering** | 336-line gesture momentum engine for 4 quotes | Replace custom `Carousel` with native CSS scroll-snap and buttons |
| **P3** | **Dependency Weight** | `sonner` dependency for 2 toast strings | Replace with a lightweight inline toast or accessible tooltip |
| **P3** | **Consistency** | Hardcoded metadata in `html-sitemap/page.tsx` | Move metadata entry into `content/seo.ts` |
| **P3** | **Content Integrity** | Outdated accessibility statement regarding 44px tap targets | Update copy to confirm 44px targets are implemented |
| **P3** | **Routing** | Legacy meta-refresh stub `/how-it-works/` | Replace with standard host 301 redirect and delete page file |
