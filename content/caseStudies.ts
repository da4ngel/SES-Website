/**
 * Case studies (/results and /results/[slug]).
 * Numbers verified against saveenergysystems.com on 2026-09-22.
 * Rewritten short; the originals are linked in `source` for reference.
 */

export type Industry = "Fitness" | "Automotive" | "Hospitality" | "Manufacturing" | "Worship";

export type CaseStudy = {
  slug: string;
  client: string;
  industry: Industry;
  location?: string;
  /** Card + page headline (2–6 words) */
  headline: string;
  /** One-line summary */
  line: string;
  /** Up to 4 real numbers for the stat tiles */
  stats: { value: string; label: string }[];
  challenge: string;
  solution: string;
  results: string[];
  quote?: { text: string; name: string; role: string };
  year?: string;
  source: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "planet-fitness",
    client: "Planet Fitness",
    industry: "Fitness",
    headline: "Cooler clubs, lower bills.",
    line: "Hundreds of gyms, one controller strategy.",
    stats: [
      { value: "350+", label: "Planet Fitness locations since 2015" },
      { value: "~30%", label: "Less energy at the first clubs" },
      { value: "$500K+", label: "Corporate savings per year" },
      { value: "$2M", label: "Saved yearly by 23 franchise owners" },
    ],
    challenge: "Busy gyms run big rooftop units for long hours, and every club needs to stay comfortable for members.",
    solution: "The DLC was installed across corporate and franchise clubs. SES monitors them daily and coordinates local contractors when repairs are needed.",
    results: [
      "Energy use dropped about 30% at the first clubs, and they felt noticeably more comfortable.",
      "Installed at 100+ corporate clubs and 250+ franchise locations.",
      "A fresh-air purge feature was added in fall 2020.",
    ],
    source: "https://saveenergysystems.com/2025/07/energy-management-without-breaking-a-sweat/",
  },
  {
    slug: "gengras",
    client: "Gengras Motor Cars",
    industry: "Automotive",
    location: "CT, MA and VT",
    headline: "Showrooms that save.",
    line: "Nine dealerships, installed in under two days.",
    stats: [
      { value: "30%", label: "HVAC energy savings" },
      { value: "25%", label: "Longer asset life" },
      { value: "3–5×", label: "Return on investment" },
      { value: "9", label: "Dealerships on SES" },
    ],
    challenge: "A family-owned group founded in 1937, with showrooms and service bays that need very different comfort. Its old HVAC controls were unreliable.",
    solution: "SES installed the DLC on HVAC units and gas heaters at every site in under two days, plus Remote Facility Management.",
    results: [
      "30% HVAC energy savings and a 3–5× ROI.",
      "Assets last 25% longer.",
      "Full remote visibility and control of every location.",
    ],
    quote: {
      text: "Working with Save Energy Systems, I can see past performance and do basic diagnostics at any time without ever leaving my office.",
      name: "Marc Rienow",
      role: "Director of Facilities, Gengras Motor Cars",
    },
    source: "https://saveenergysystems.com/2026/06/driving-down-energy-use-across-complex-gengras-dealership-operations/",
  },
  {
    slug: "sheraton-stamford",
    client: "Sheraton Stamford Hotel",
    industry: "Hospitality",
    location: "Stamford, CT",
    headline: "From complaints to comfort.",
    line: "A 389-room hotel with zero comfort complaints.",
    stats: [
      { value: "100%", label: "Fewer comfort complaints" },
      { value: "±2°", label: "Every public room, within set point" },
      { value: "17%", label: "Utility rebate from Eversource" },
      { value: "30%", label: "Energy goal beaten, years early" },
    ],
    challenge: "Lobby and event spaces drew dozens of complaints a day, even with full-time engineers balancing 18 heat pumps by hand.",
    solution: "The DLC now coordinates all 18 heat pumps so they never start at once, with 52 HVAC control points and 4 loop monitors.",
    results: [
      "Customer complaints were eliminated.",
      "Every public room holds within two degrees of set point.",
      "Energy savings beat the company's 30% target ahead of schedule.",
    ],
    quote: {
      text: "We saved energy and therefore saved money… a lot of money.",
      name: "Joseph Zummo",
      role: "Director of Engineering, Sheraton Stamford Hotel",
    },
    source: "https://saveenergysystems.com/2025/07/from-complaints-to-comfort-sheraton-cuts-costs-and-boosts-comfort-with-precision-hvac-control/",
  },
  {
    slug: "st-michaels-parish",
    client: "St. Michael's Parish",
    industry: "Worship",
    // TODO: confirm location. The case study says Lyons, NY; the old homepage caption says North Andover, MA.
    location: "Lyons, NY",
    headline: "Paid back in 10 months.",
    line: "An 1891 church, heated only when it's used.",
    stats: [
      { value: "31%", label: "Lower electricity costs" },
      { value: "35.2%", label: "Lower gas costs" },
      { value: "$4,342", label: "Saved in the first year" },
      { value: "10 mo", label: "Payback on a ~$3,600 system" },
    ],
    challenge: "A 7,600 sq ft building from 1891 that sits empty for long stretches, yet still hosts services and events.",
    solution: "The DLC was installed in October 2011 to control four zones around the parish's real schedule.",
    results: [
      "Utility costs fell $4,342.62 in the first year.",
      "$3,178.90 in savings after adjusting for weather.",
      "The system paid for itself in 10 months.",
    ],
    year: "2011–2012",
    source: "https://saveenergysystems.com/2026/06/smarter-hvac-control-lower-utility-costs-the-st-michaels-parish-story/",
  },
  {
    slug: "edge",
    client: "EDGE Tech Corp.",
    industry: "Manufacturing",
    location: "Ada, OK",
    headline: "Savings in record heat.",
    line: "Oklahoma's hottest summer, and usage still went down.",
    stats: [
      { value: "5 of 6", label: "Months with lower kWh use" },
      { value: "7", label: "HVAC units controlled" },
      { value: "43,000", label: "Square feet" },
    ],
    challenge: "The DLC went live in June 2011, right before Oklahoma's hottest summer on record. Could savings be proven in that heat?",
    solution: "SES compared June–November 2011 with 2010 and normalized for cooling degree days, so weather couldn't flatter the numbers.",
    results: [
      "Lower kilowatt-hour use in five of six months.",
      "Lower demand charges across nearly the whole period.",
    ],
    year: "2011",
    source: "https://saveenergysystems.com/2026/06/proven-ai-driven-energy-savings-even-in-record-summer-heat/",
  },
  {
    slug: "epic-fitness",
    client: "EPIC Fitness",
    industry: "Fitness",
    headline: "Data into action, every site.",
    line: "One view of energy across a franchise portfolio.",
    stats: [{ value: "63", label: "Locations run by SES" }],
    challenge: "Rising energy costs, uneven RTU performance, equipment running after hours, and little visibility across sites.",
    solution: "SES brought every site's schedules, setpoints and trends into one platform, with controls that stop waste automatically.",
    results: [
      "Lower energy costs across the portfolio.",
      "Less wear on rooftop units and a longer lifespan.",
      "Clearer data for budgeting repairs and replacements.",
    ],
    quote: {
      text: "We currently have SES running the HVAC at 63 of our locations. In addition to the energy cost savings, it helps reduce the wear on the RTUs, expanding the lifespan of the units and reducing our bills at the same time.",
      name: "Art Nichols",
      role: "VP, Facilities and Construction, EPIC Fitness",
    },
    source: "https://saveenergysystems.com/2026/06/epic-multiunit-franchise/",
  },
  {
    slug: "fitness-franchise",
    client: "International fitness franchise",
    industry: "Fitness",
    location: "North America",
    headline: "$450,000 saved in a year.",
    line: "57 corporate-owned centers, retrofitted.",
    stats: [
      { value: "$450K+", label: "Saved in 2016" },
      { value: "18%", label: "Average bill reduction" },
      { value: "52", label: "Centers installed" },
    ],
    challenge: "57 corporate centers, each running four to seven AC units, with costs and comfort varying site to site.",
    solution: "A full DLC retrofit across the portfolio, announced at the 2017 franchisee convention.",
    results: [
      "Bills fell 18% on average.",
      "More than $450,000 saved in 2016.",
      "Precise temperatures and happier members.",
    ],
    quote: {
      text: "The internal climate is now consistently precise. This is good for our members and good for our bottom line.",
      name: "Alan Buell",
      role: "Head of Construction", // TODO: confirm title and whether the client can be named
    },
    year: "2016",
    source: "https://saveenergysystems.com/2025/07/international-fitness-franchise-improves-energy-efficiency-and-trims-energy-costs-by-450000/",
  },
];

export const industries: Industry[] = ["Fitness", "Automotive", "Hospitality", "Manufacturing", "Worship"];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
