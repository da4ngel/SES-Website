# SES Website Redesign: Claude Code Prompt

Paste everything below the line into Claude Code.

---

Use the apple-design skill for every design and motion decision in this project.

## Goal

Build a new marketing website for Save Energy Systems (SES) from scratch. The current site (https://saveenergysystems.com) feels outdated and too wordy compared to competitors. The new site should feel like an Apple product page: calm, confident, lots of whitespace, big type, short copy, one idea per section, and fluid motion that feels physical, not decorative.

I do not have the old codebase. Everything is built fresh. You may fetch https://saveenergysystems.com and its subpages if you need extra facts, but rewrite all copy. Never copy their long paragraphs.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Motion (motion.dev) for springs and scroll animation
- System font stack (`-apple-system, system-ui, "SF Pro Display", Inter, sans-serif`), no heavy custom fonts
- Static export friendly, fast, Lighthouse 95+ on all categories
- Fully responsive (phone first), light and dark mode

## Brand facts (use these, do not invent new numbers)

- Name: Save Energy Systems (SES)
- Current tagline: "Be smart, take control"
- What they do: smart HVAC energy management for multi-site businesses. A patented Demand Limiting Controller (DLC) plus sensors installed on existing rooftop units, connected to a cloud platform with AI fault detection and remote monitoring.
- Proof points:
  - Up to 30% lower energy costs
  - Up to 75% fewer equipment failures
  - Average ROI in 3 to 18 months
  - 50% less time spent on facility management
  - Faults caught months before failure
  - 1,100+ locations across five verticals
  - DLC deployed since 2012
  - Trusted by 900+ Planet Fitness franchise locations
- How it works (4 steps): Zone control, Smart Start, Real-time monitoring, Peak/off-peak optimization
- Solutions:
  1. Fault Detection & Diagnostics (FDD): AI that catches faults before they become failures
  2. HVAC Savings
  3. SmartPM (predictive maintenance)
  4. Remote Facility Management
  5. Facility Sensors & Metering
  6. Indoor Air Quality
  7. Occupancy-Based Comfort
- Clients (logo wall, use text placeholders until I supply SVGs): Pearson Ford, Gengras Motor Cars, EPIC Fitness, Sheraton, BMW, Flynn, Cummings, Grand Fitness, NuCar, Momentum Manufacturing Group, Lyon Waugh
- Testimonials:
  - Jeremy Kilpatrick, MAK Fitness: "SES provides monitoring and management of our HVAC controls in a manner that is unmatched."
  - Art Nichols, EPIC Fitness: uses SES across 63 locations, less equipment wear and longer RTU lifespan (write a short quote placeholder and mark it TODO: confirm wording)
  - Marc Rienow, Gengras Motor Cars: energy savings and diagnostics (placeholder, TODO: confirm wording)
- Case studies: St. Michael's Parish (North Andover, MA), EDGE (record summer heat), Gengras dealership
- Contact: (617) 564-4800 (Sales ext. 2), sales@saveenergysystems.com, support@saveenergysystems.com
- HQ: One Research Drive, Suite 100A, Westborough, MA 01581
- Social: LinkedIn (linkedin.com/company/save-energy-systems-inc-), YouTube (@SaveEnergySystems), Facebook (facebook.com/ses01581)
- Customer login link: https://dashboard.saveenergysystems.com

## Copy rules

- Headlines: 2 to 6 words. Subheads: one sentence, max 15 words.
- No paragraph longer than 2 short sentences on the homepage.
- Lead with outcomes (money saved, failures avoided), not features.
- Plain language, no jargon. Explain "RTU", "DLC", "FDD" once, briefly, where they first appear.
- Put all copy in a single `content/` folder (TS or JSON) so I can edit wording without touching components.
- Example tone: "Your HVAC, thinking ahead." / "Save up to 30% on energy." / "Catch failures before they happen."

## Sitemap

1. `/` Home
2. `/how-it-works`
3. `/solutions` plus one page per solution (`/solutions/[slug]`), generated from one data file
4. `/results` (case studies + testimonials)
5. `/about`
6. `/contact` (includes Book a call and Pilot Program)
7. Header: logo, How it works, Solutions, Results, About, "Log in" (portal link), primary CTA "Book a call"
8. Footer: contact info, address, socials, solution links, reseller link, privacy

## Homepage structure (Apple product page rhythm)

1. **Hero**: full viewport, huge headline, one line subhead, two CTAs (Book a call, See how it works). Subtle visual of a building or rooftop unit with a soft animated energy glow. No carousel.
2. **Big numbers**: 30% / 75% / 3 to 18 months, count up once when in view. Each number gets one short line.
3. **How it works**: 4 steps as a sticky scroll story (pinned visual on one side, steps advance on scroll). On mobile, simple stacked cards.
4. **Solutions**: bento grid of 7 cards, each with an icon, a 3 to 5 word title and one line. Card hover lifts slightly; press scales to 0.97 on pointer-down.
5. **Platform peek**: a clean mock dashboard (built in HTML/CSS, not a screenshot) showing live-looking tiles: energy saved, active sites, faults caught. Translucent glass panels.
6. **Social proof**: logo wall (grayscale, color on hover) + one rotating testimonial with a draggable, swipeable carousel using momentum projection and snap (per the skill).
7. **Final CTA**: "Start with a pilot." Book a call button.

## Design system

- Colors: near-white `#fbfbfd` / near-black `#1d1d1f` text, one accent. Suggest an energy green or electric blue accent and show me both before committing. Dark mode uses true dark surfaces, not gray.
- Type scale with size-specific tracking and leading exactly as the skill describes (negative tracking on display, near 0 on body, tight leading on headings).
- Spacing in rem on an 8px grid. Generous section padding (e.g. 120 to 160px desktop).
- Radius: 18 to 28px on cards, full pill on buttons.
- Sticky header: translucent material (`backdrop-filter: blur(20px) saturate(180%)`), scroll edge fade instead of a hard border.
- Icons: one consistent line icon set (Lucide), 1.5px stroke.
- Build shared components first: Button, Section, Heading, StatNumber, Card, GlassPanel, Carousel, Nav, Footer.

## Motion rules (from the skill)

- Springs for anything interactive; critically damped by default (bounce 0), bounce only after a flick or drag.
- All animations interruptible, animate from the current value.
- Scroll reveals: short fade + small rise, once, never on every scroll.
- Only animate transform and opacity.
- Respect `prefers-reduced-motion` (cross-fade only), `prefers-reduced-transparency` (solid surfaces), and `prefers-contrast: more`.
- Mobile menu opens from the menu button (anchored origin) and closes back into it.

## Contact form

Fields: first name, last name, work email, phone, company, job title, interested solution (dropdown of the 7 solutions + Pilot Program + Other), message (optional), privacy consent. Inline validation (not on submit), clear success state. Leave the submit handler as a stub with a TODO for the backend.

## Quality bar

- Semantic HTML, accessible (WCAG AA contrast, focus rings, keyboard nav, alt text).
- SEO: metadata per page, Open Graph, sitemap.xml, robots.txt, JSON-LD Organization schema.
- Images via `next/image`; use tasteful placeholders and a `public/images/README.md` listing what real photos I need to supply.
- No lorem ipsum anywhere.

## How to work

1. First, show me a short plan: folder structure, design tokens, and the homepage section list. Wait for my OK.
2. Build the design system and the homepage first. Run it locally and tell me the URL.
3. Then build the remaining pages one at a time.
4. After each page, self-review against the apple-design skill checklist (response, interruptibility, spatial consistency, typography, reduced motion) and fix issues before moving on.
5. Keep a `CHANGELOG.md` of what you built.
