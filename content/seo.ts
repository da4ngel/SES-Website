/**
 * Page titles and descriptions (search results + link previews).
 * Keys match routes. Solution pages build theirs from content/solutions.ts.
 */
export const seo = {
  home: {
    title: "Save Energy Systems | Smart HVAC energy management",
    description:
      "Cut HVAC energy costs up to 30% across every site. Patented controllers, live monitoring and AI that catches failures months early.",
  },
  technology: {
    title: "Technology",
    description: "The patented Demand Limiting Controller (DLC), sensors and a cloud platform with AI fault detection. Works with your existing HVAC and BMS.",
  },
  architecture: {
    title: "Smart energy saving architecture",
    description: "Six layers, from building systems and DLC hardware to AI, virtual facility management and up to 30% energy savings.",
  },
  dlc: {
    title: "DLC advanced features",
    description: "Occupancy sensing with PIR, ultrasonic or CO2 sensors, per-zone setpoints and real-time adaptive comfort.",
  },
  assetManagement: {
    title: "Asset management",
    description: "Real-time asset monitoring, predictive maintenance alerts and automated PM schedules that extend equipment life.",
  },
  pilot: {
    title: "Pilot Program",
    description: "Prove the savings on a few buildings first. 90-day performance guarantee and no upfront cost for qualified buildings.",
  },
  sesPro: {
    title: "SES Pro for HVAC contractors",
    description: "Add $10K–$12K install revenue per location and $1.5K–$3K recurring per site. Free SES Pro kit for qualified contractors.",
  },
  news: {
    title: "News",
    description: "Events, awards, reports and insights from Save Energy Systems.",
  },
  howItWorks: {
    title: "How it works",
    description:
      "A small controller and sensors on your existing rooftop units, connected to one cloud platform. Here's how SES saves energy.",
  },
  solutions: {
    title: "Solutions",
    description:
      "Fault detection, HVAC savings, predictive maintenance, remote management, sensors, air quality and occupancy-based comfort.",
  },
  results: {
    title: "Results",
    description: "Case studies and customer stories from 1,100+ locations running on SES.",
  },
  about: {
    title: "About",
    description:
      "Save Energy Systems has deployed its patented Demand Limiting Controller since 2012. Based in Westborough, MA.",
  },
  contact: {
    title: "Contact",
    description: "Book a call or start a pilot. Talk to the SES team about your sites.",
  },
  privacy: {
    title: "Privacy",
    description: "How Save Energy Systems handles information you share on this website.",
  },
} as const;
