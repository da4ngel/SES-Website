# SES Website Audit: ses-omega.vercel.app

**Audited:** 23 September 2026
**Build:** https://ses-omega.vercel.app/
**Method:** Live inspection at desktop (1512px), tablet and 390px mobile. All 25 routes checked for status. DOM, accessibility tree, colour contrast, motion behaviour, form markup, structured data, SSR output and resource weight measured directly in the browser.

**Scope note:** This lists negatives only, by request. Craft level on this build is high, so most findings below are about substance, compliance and measurement rather than visual polish.

---

## Summary

| Area | Verdict |
|---|---|
| Visual design and motion craft | Strong |
| Information architecture | Strong |
| Colour contrast | Passes, one item to check by eye |
| Responsive layout | No horizontal overflow at any width |
| Content depth | Severely thin, every page |
| Credibility assets (photos, logos, proof) | Absent |
| Form handling | Unvalidated, unprotected, privacy risk |
| Legal pages | Not adequate |
| Analytics and conversion tracking | None at all |
| Accessibility | Three real failures |
| SEO technical | Good foundation, gaps in schema and preview indexing |

**Priority order for fixes:** analytics and form handling first (cheap, and value is leaking daily), then legal, then accessibility failures, then content and credibility assets.

---

## 1. Blocking. Fix before production

- [ ] **Form has zero validation.** No field carries `required` or `aria-required`, and the form is set to `noValidate`. An empty submission is possible.
- [ ] **Form degrades to a GET with PII in the URL.** The `<form>` element has no `method` and no `action`, so it defaults to a GET request to the same page. If React fails to hydrate or the submit handler throws, the browser falls back to native submission and the visitor's first name, last name, work email, phone, company and job title end up in the query string, in their browser history, in referrer headers and in server logs. Set `method="post"`, give it a real action, and add server-side validation.
- [ ] **No spam protection on the form.** No honeypot field, no captcha, no visible rate limiting. A public B2B form with a free-text message field will be harvested within weeks of launch.
- [ ] **No analytics or conversion tracking anywhere on the site.** Third-party scripts: zero. No GA4, no LinkedIn Insight tag, no call tracking, no form-submit event. Right now it is impossible to tell which page, campaign or channel produced a lead. For a site whose only job is "Book a call", this is the largest commercial gap.
- [ ] **Confirm where form submissions actually go.** No backend endpoint is visible from the client. Worth verifying a submission reaches a human inbox or CRM before launch.

---

## 2. Legal

- [ ] **The privacy policy is 89 words.** It covers what the contact form collects and stops there. Missing: last-updated date, the legal entity acting as data controller, retention periods, cookies and tracking disclosure, sub-processors, CCPA/CPRA disclosures plus the "Do Not Sell or Share My Personal Information" link (SES serves national US retail, so California applies), GDPR basis if there is any EU traffic, and a deletion process beyond emailing sales@.
- [ ] **No Terms of Service page.**
- [ ] **No cookie policy**, and no consent mechanism. Not needed today because there is no tracking, but it becomes mandatory the moment analytics is added.
- [ ] **No accessibility statement.** Enterprise procurement asks for one.
- [ ] **Named customers without logos or visible permission.** "BMW", "Volvo", "Sheraton", "Planet Fitness" and "YMCA" appear as client names. Worth confirming SES has written approval to use each.

---

## 3. Accessibility failures

- [ ] **Auto-rotating testimonial carousel with no pause control.** Confirmed advancing on its own (track transform moved from -896px to -1716px across 7 seconds of idle observation). No pause, stop or play control exists. This is a WCAG 2.2.2 Level A failure and the kind of thing an enterprise accessibility review catches immediately.
- [ ] **Four headings duplicated in the DOM.** "Zone control", "Smart Start", "Real-time monitoring" and "Peak and off-peak optimization" each render twice, once for desktop and once for mobile. The inactive copy is neither `display:none` nor `aria-hidden="true"`, so screen readers announce the entire how-it-works sequence twice and the H3 count doubles for crawlers.
- [ ] **Counter animation leaks intermediate frames into the text layer.** The stats block contains the literal string "3–0 mo" alongside "3–18 mo", plus stray "0%" values. A screen reader reads "three to zero months". These strings are present in the server-rendered HTML, so search engines see them too. Mark the animating element `aria-hidden` and expose a static value to assistive tech.
- [ ] **36 tap targets under 44px on mobile.** Carousel dots are 24x24, prev/next arrows and the theme toggle are 40x40, inline "All solutions ›" links are 26px tall. The dots technically clear the WCAG 2.2 minimum of 24x24 but fail Apple and Google guidance.
- [ ] **Check the "Flagged early" pill by eye.** Teal text on a 16% teal background in the alerts mock calculates as unreadable. It is the only contrast item on the site that does not clearly pass.
- [ ] **Reduced-motion coverage looks partial.** Only 6 rules across the stylesheets respond to `prefers-reduced-motion`. Given how much of this site is scroll-driven transform and opacity work, that is unlikely to cover the pinned section, the counters or the carousel. Test with the OS setting enabled.

---

## 4. Content depth. The biggest structural weakness

Measured word counts of main content, excluding nav and footer:

| Page | Words |
|---|---|
| Solutions hub | 99 |
| SmartPM | 154 |
| News | 167 |
| Gengras case study | 171 |
| Pilot | 211 |
| About | 216 |
| SES Pro | 223 |
| Fault Detection & Diagnostics | 311 |
| Results hub | 341 |
| Technology | 541 |

- [ ] **A 171-word case study is a caption, not a case study.** Buyers evaluating a multi-site rollout want the baseline, the install scope, the measurement method, the timeline and the objections that came up.
- [ ] **This site will rank for "Save Energy Systems" and almost nothing else.** Competitors ranking for terms like "multi-site HVAC energy management" publish 1,200 to 2,000 word pages plus an active blog. There is no page here long enough to compete.
- [ ] **No leadership, team or company history on About.** 216 words, no names. Buyers signing multi-site contracts look for who runs the company.
- [ ] **No blog, resources or insights section.** The News page is an events and awards list, not a content engine.

---

## 5. Credibility and proof

- [ ] **Zero images across the entire site.** Every route returns 0 `<img>` elements. There is no photograph of the DLC controller, no installation shot, no rooftop unit, no dashboard screenshot, no office, no team. For a company selling a patented physical device into facilities budgets, this is a credibility problem. The illustrations are good, but they depict a generic RTU, not the SES product.
- [ ] **The customer logo wall contains no logos.** "Planet Fitness", "BMW", "Volvo", "Sheraton" and the rest are plain `<li>` text elements in the site's own font. There is even a leftover `grayscale` utility class on the text, which does nothing to text, clearly intended for images that never arrived. Text names read as claims. Logos read as proof.
- [ ] **The platform section shows "Illustrative data".** Honest labelling, and correct to disclose, but it means the one place a buyer looks to judge the software shows invented numbers. A blurred or anonymised screenshot of the real portal would do far more work.
- [ ] **Every headline claim is unsubstantiated.** "Up to 30%", "up to 75% fewer breakdowns", "25M+ sq ft", "100K+ assets", "1,100+ locations" all appear with no footnote, no methodology, no date and no source. One "Read the original case study" link is the only external evidence on the whole site.
- [ ] **No pricing page or ROI calculator.** A savings calculator is the standard lead magnet in this category and is currently missing.
- [ ] **No security or compliance page.** SOC 2, data handling, uptime and device security get asked in every enterprise deal. There is nowhere on the site to answer.
- [ ] **No integrations page.** Nothing about BMS, CMMS, ServiceChannel, Corrigo or utility programs.
- [ ] **No FAQ and no careers page.**

---

## 6. UX and motion

- [ ] **The homepage is 11.6 viewports tall on desktop and 15.7 on mobile.** Measured page height 11,544px at 997px viewport, 13,167px at 390px wide.
- [ ] **The how-it-works section is 3,160px tall, roughly 3.2 full screens, to deliver four one-sentence steps.** About 40 words of information for three screens of scrolling.
- [ ] **Scroll-driven fade leaves headings invisible mid-scroll.** Partway through the pinned section, "Smarter units, not new ones." and its supporting paragraph render at near-zero opacity while filling the viewport. A user scrolling at normal pace lands on what looks like a blank black screen. The opacity is tied to scroll position rather than a one-time reveal, so it fades back out as well as in.
- [ ] **The hero illustration is invisible on first paint.** The RTU and cloud diagram sits dark grey on black until its entrance animation runs. On a fresh load, the largest element on screen reads as empty space for the first couple of seconds.

---

## 7. SEO and technical

- [ ] **The Vercel preview is fully indexable.** `robots.txt` reads `User-Agent: * / Allow: /` with no `noindex` on the preview host. Canonical tags correctly point at saveenergysystems.com, which mitigates it, but a `noindex` header on non-production deployments is the safer default.
- [ ] **Social preview images point at the production domain.** `og:image` and `twitter:image` resolve to `saveenergysystems.com/opengraph-image`. If production is still the old site, every share of this build renders a wrong or broken card. Verify with the LinkedIn Post Inspector and the X card validator.
- [ ] **The 404 page inherits the homepage title.** Well-written page, but `<title>` reads "Save Energy Systems | Smart HVAC energy management" instead of "Page not found".
- [ ] **Structured data is minimal.** One Organization block on most pages. Missing: WebSite with SearchAction, BreadcrumbList on nested routes, Service or Product markup for the seven solutions, FAQPage, Review markup on the four testimonials, and LocalBusiness or PostalAddress for the Westborough office that sits unmarked in the footer.
- [ ] **669 KB of decoded JavaScript across 17 chunks** for a static brochure site (198 KB transferred, 185 KB of HTML on the homepage). Most of it drives scroll animation on content that is already fully server-rendered.
- [ ] **No HTML sitemap page.** `sitemap.xml` exists and is correct.
- [ ] **Confirm font loading behaviour on a cold, throttled connection.** No web fonts were observed on repeat load, which is either a system stack (fine) or a caching artefact. Check for a flash of invisible text.

---

## 8. Small stuff

- [ ] Duplicate Tailwind classes on the header logo: `class="h-9 w-auto h-10"`, two conflicting heights on one element.
- [ ] News item dated 29 April 2026 describes a May event in the past tense ("SES joined Planet Fitness franchisees in Frisco, May 5–8").
- [ ] Footer carries one legal link and a 2026 copyright, with no "last updated" anywhere on the site.
- [ ] The form's consent checkbox relies on being wrapped in a `<label>` rather than an explicit `for`/`id` pairing. It works, but it is the fragile version.
- [ ] The `grayscale` and `hover:grayscale-0` classes on the text-based client list have no effect and should be removed or replaced with real logo images.

---

## What passed

Worth recording so nobody "fixes" these:

- No horizontal overflow at 390px, 768px or 1512px.
- All 25 routes return 200. The 404 route correctly returns 404.
- Colour contrast passes across the site in both themes, with the one pill noted above.
- Skip-to-content link present and working.
- Correct landmark structure: one `<header>`, one `<main>`, one `<footer>`, one H1 per page.
- Visible focus outline (3px) on interactive elements.
- Server-side rendering works. Full content is present in the HTML before JavaScript runs.
- Light and dark themes both render cleanly, with the preference persisted to `localStorage`.
- Every page has a unique title and meta description, plus correct canonical tags.
- Form inputs carry correct `autocomplete` attributes.
- External links use `rel="noopener noreferrer"`.
- No console errors observed.
- Zero layout shift measured.

---

## Recommended order of work

1. **Week 1:** Form method, validation, spam protection. GA4 plus conversion events. Proper privacy policy, terms, cookie policy.
2. **Week 2:** The three accessibility failures (carousel pause, duplicate headings, counter text leak). Preview `noindex`. Social image URLs. 404 title.
3. **Weeks 3 to 6:** Photography of the DLC and an install. Real client logos. Rewrite the three case studies at 800 to 1,200 words each with method and measurement. Add sourcing footnotes to every claim.
4. **Ongoing:** Pricing or ROI calculator, security and compliance page, integrations page, FAQ, and a blog with a real publishing cadence.
