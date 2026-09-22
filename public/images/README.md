# Images to supply

The site currently uses text placeholders and illustrations. When the real assets arrive, drop them here and they can be swapped in.

| Asset | Format | Used on | Notes |
|---|---|---|---|
| Client logos (Planet Fitness, Sheraton, BMW, Volvo, YMCA, Gengras, EPIC, Pearson Ford, Flynn, Cummings, Grand Fitness, NuCar, Momentum Manufacturing Group, Lyon Waugh, Beehive Pros) | SVG, single color | Home logo wall, Results | Rendered grayscale, with color on hover |
| SES Pro partner logos (12, see `content/sesPro.ts`) | SVG | `/ses-pro/` | |
| Case-study photos (one per study, see `content/caseStudies.ts`) | WebP, 1600×1000 | `/results/<slug>/` | |
| DLC controller product photo | WebP or PNG with transparency, 1200px | Technology, HVAC Savings | |
| Rooftop / building hero photo (optional) | WebP, 2400×1400 | Home hero (currently an SVG illustration) | |
| Dashboard screenshot (optional) | WebP, 2400px wide | Platform peek (currently an HTML/CSS mock) | |

Already here:
- `ses-logo-original.svg`: the official vector logo (source for `scripts/build-logo.mjs`).
- `SES-logo.png`: the small PNG you supplied (reference only; not used on the site).
