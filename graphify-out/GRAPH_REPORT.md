# Graph Report - SES-Website  (2026-09-23)

## Corpus Check
- Corpus is ~31,796 words - fits in a single context window. You may not need a graph.

## Summary
- 421 nodes · 1075 edges · 23 communities (14 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.85)
- Token cost: 213,886 input · 0 output

## Community Hubs (Navigation)
- Home & Top-Level Pages
- Site Navigation & Chrome
- Root Layout, SEO & News
- Forms & Lead-Gen Pages
- How It Works & Technology
- Package Dependencies & Scripts
- Case Studies & Solution Pages
- Social Proof & Results Listing
- Architecture Visuals & Motion
- TypeScript Config
- Brand Icons & OG Image
- Carousel & Gesture Physics
- Project Docs & Changelog
- Logo Brand Assets
- Logo Build Script
- Static Prefetch Fix Script
- Agent Instructions Files
- Motion Audit & Apple Design Skill
- ESLint Config
- PostCSS Config
- Favicon Icon
- Mobile Native Feel Fixes
- Motion Rules Spec

## God Nodes (most connected - your core abstractions)
1. `cn()` - 45 edges
2. `Reveal()` - 26 edges
3. `Section()` - 23 edges
4. `Heading()` - 22 edges
5. `Button()` - 20 edges
6. `Card()` - 20 edges
7. `pageMetadata()` - 20 edges
8. `seo` - 16 edges
9. `compilerOptions` - 16 edges
10. `PageHero()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `README.md Getting Started (create-next-app boilerplate)` --semantically_similar_to--> `CHANGELOG.md Where-to-Change-What Map`  [INFERRED] [semantically similar]
  README.md → CHANGELOG.md
- `Block()` --calls--> `cn()`  [EXTRACTED]
  components/solutions/SolutionSections.tsx → lib/cn.ts
- `Accessibility Fixes (tap targets, LocalNav longest-match)` --implements--> `SES Website Redesign Claude Code Prompt Brief`  [INFERRED]
  CHANGELOG.md → docs/SES_redesign_prompt.md
- `Static Export Prefetch Fix (fix-static-prefetch.mjs)` --implements--> `SES Website Redesign Claude Code Prompt Brief`  [INFERRED]
  CHANGELOG.md → docs/SES_redesign_prompt.md
- `Phase 1: Design System + All Pages` --implements--> `SES Website Redesign Claude Code Prompt Brief`  [INFERRED]
  CHANGELOG.md → docs/SES_redesign_prompt.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Redesign Brief Realized Through Phase 1 and Phase 2 Changelog Entries** — docs_ses_redesign_prompt_brief, changelog_phase1_design_system, changelog_phase2_content_restructure, changelog_phase2_brand_teal [INFERRED 0.85]
- **Design/Motion Skill-Driven Audit Pass (motion, mobile, a11y)** — changelog_motion_audit_fixes, changelog_mobile_native_feel, changelog_a11y_fixes, docs_ses_redesign_prompt_motion_rules [INFERRED 0.75]
- **Tracking of Placeholder Content and Real Assets Needed** — public_images_readme_assets_needed, changelog_open_items, docs_ses_redesign_prompt_brief [INFERRED 0.80]
- **SES Logo Source-of-Truth Asset Group (icon + wordmark composing the brandmark)** — public_images_ses_logo_original_brandmark, public_images_ses_logo_original_leaf_icon, public_images_ses_logo_original_wordmark, concept_ses_brand_identity [INFERRED 0.85]

## Communities (23 total, 9 thin omitted)

### Community 0 - "Home & Top-Level Pages"
Cohesion: 0.07
Nodes (29): metadata, metadata, metadata, metadata, BigNumbers(), FinalCta(), Hero(), HowItWorksStory() (+21 more)

### Community 1 - "Site Navigation & Chrome"
Cohesion: 0.08
Nodes (35): HowItWorksPage(), Logo(), MobileMenu(), Props, MenuGlyph(), Nav(), Providers(), applyTheme() (+27 more)

### Community 2 - "Root Layout, SEO & News"
Cohesion: 0.09
Nodes (25): metadata, metadata, RootLayout(), viewport, metadata, NewsPage(), dynamicParams, generateMetadata() (+17 more)

### Community 3 - "Forms & Lead-Gen Pages"
Cohesion: 0.08
Nodes (31): metadata, PilotPage(), metadata, SesProPage(), Field(), Form(), initialValues(), inputClass() (+23 more)

### Community 4 - "How It Works & Technology"
Cohesion: 0.10
Nodes (22): metadata, metadata, metadata, StepVisual(), Faq(), FaqItem, Icon(), icons (+14 more)

### Community 5 - "Package Dependencies & Scripts"
Cohesion: 0.06
Nodes (35): dependencies, lucide-react, motion, next, react, react-dom, sonner, devDependencies (+27 more)

### Community 6 - "Case Studies & Solution Pages"
Cohesion: 0.11
Nodes (21): CaseStudyPage(), dynamicParams, generateMetadata(), dynamic, dynamicParams, generateMetadata(), SolutionPage(), ResultsTeaser() (+13 more)

### Community 7 - "Social Proof & Results Listing"
Cohesion: 0.13
Nodes (18): metadata, metadata, Heading(), Props, Size, sizeClass, LogoWall(), Stat (+10 more)

### Community 8 - "Architecture Visuals & Motion"
Cohesion: 0.15
Nodes (14): metadata, HeroVisual(), units, ArchitectureVisual(), Props, Reveal(), Props, ScrollStory() (+6 more)

### Community 9 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "Brand Icons & OG Image"
Cohesion: 0.17
Nodes (12): contentType, dynamic, size, alt, contentType, dynamic, size, arc (+4 more)

### Community 11 - "Carousel & Gesture Physics"
Cohesion: 0.27
Nodes (7): Carousel(), Props, clamp(), HYSTERESIS, project(), rubberband(), VelocityTracker

### Community 12 - "Project Docs & Changelog"
Cohesion: 0.17
Nodes (12): Accessibility Fixes (tap targets, LocalNav longest-match), New Shared Design System Components (Form, ScrollStory, Faq, LocalNav, StatTiles, CopyEmail, ResultsGrid), Open Items / TODOs (facts to confirm, assets needed), Static Export Prefetch Fix (fix-static-prefetch.mjs), Phase 1: Design System + All Pages, Phase 2: Official Logo + Brand Teal, Phase 2: Content Restructure from Old Site, CHANGELOG.md Where-to-Change-What Map (+4 more)

### Community 13 - "Logo Brand Assets"
Cohesion: 0.40
Nodes (5): SES Brand Identity (Teal Energy/Leaf Motif), SES (Save Energy Systems) Brand Logo — navy background, white 'save energy' wordmark, 'SYSTEMS' subtext, yellow radiating burst icon, SES Brand Logo (Original SVG Source), Teal Leaf/Energy Swoosh Icon Mark, Save Energy Systems Wordmark Text

## Knowledge Gaps
- **135 isolated node(s):** `metadata`, `dynamic`, `size`, `contentType`, `metadata` (+130 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 182 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Site Navigation & Chrome` to `Home & Top-Level Pages`, `Forms & Lead-Gen Pages`, `How It Works & Technology`, `Case Studies & Solution Pages`, `Social Proof & Results Listing`, `Architecture Visuals & Motion`, `Brand Icons & OG Image`, `Carousel & Gesture Physics`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `next` connect `Root Layout, SEO & News` to `Home & Top-Level Pages`, `Package Dependencies & Scripts`, `Case Studies & Solution Pages`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `react` connect `Site Navigation & Chrome` to `Carousel & Gesture Physics`, `Architecture Visuals & Motion`, `Forms & Lead-Gen Pages`, `Package Dependencies & Scripts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **What connects `metadata`, `dynamic`, `size` to the rest of the system?**
  _135 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Home & Top-Level Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.07102040816326531 - nodes in this community are weakly interconnected._
- **Should `Site Navigation & Chrome` be split into smaller, more focused modules?**
  _Cohesion score 0.07568027210884354 - nodes in this community are weakly interconnected._
- **Should `Root Layout, SEO & News` be split into smaller, more focused modules?**
  _Cohesion score 0.08826945412311266 - nodes in this community are weakly interconnected._