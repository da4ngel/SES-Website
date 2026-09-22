import type { IconName } from "./solutions";
import type { FaqItem } from "@/components/ui/Faq";

/**
 * /technology/* copy. Source: saveenergysystems.com/technology/ and its 4 sub-pages,
 * rewritten short. Facts only from the old site; nothing invented.
 */

export const techNav = [
  { label: "Overview", href: "/technology/" },
  { label: "How it works", href: "/technology/how-it-works/" },
  { label: "Architecture", href: "/technology/architecture/" },
  { label: "DLC features", href: "/technology/dlc/" },
  { label: "Asset management", href: "/technology/asset-management/" },
];

export const techOverview = {
  eyebrow: "Technology",
  headline: "One controller. A smarter roof.",
  subhead: "The patented Demand Limiting Controller (DLC), sensors and a cloud platform, working as one.",
  pillars: [
    { icon: "zones" as IconName, title: "The DLC", line: "Our patented controller manages peak demand on the units you already own." },
    { icon: "gauge" as IconName, title: "Sensors", line: "Temperature, occupancy, air quality and energy, read in real time." },
    { icon: "remote" as IconName, title: "The platform", line: "One dashboard for every site, with AI fault detection built in." },
  ],
  integration: {
    headline: "Works with what you have.",
    line: "The DLC adds intelligent demand management to an existing BAS or BMS. No rip and replace.",
    points: [
      "Connects to existing HVAC and building systems without disrupting operations.",
      "Sends control, energy data and alerts up to your building energy dashboard.",
      "Reachable from any web-enabled device.",
      "API for third-party integration.",
    ],
  },
  sections: [
    { href: "/technology/how-it-works/", title: "How it works", line: "Four steps from rooftop to savings." },
    { href: "/technology/architecture/", title: "Architecture", line: "Six layers, from hardware to outcomes." },
    { href: "/technology/dlc/", title: "DLC features", line: "Occupancy sensing and zone control." },
    { href: "/technology/asset-management/", title: "Asset management", line: "Longer equipment life, planned repairs." },
  ],
};

export const howItWorksBenefits = [
  { title: "Quick install", line: "Minimal time and cost, on the units already on your roof." },
  { title: "Easier maintenance", line: "The DLC handles the heavy lifting." },
  { title: "Fewer truck rolls", line: "Virtual facility management means fewer visits and less rework." },
  { title: "Seamless integration", line: "Works alongside existing HVAC and building systems." },
  { title: "Remote control", line: "Every site, from anywhere, on one dashboard." },
  { title: "Ahead of regulations", line: "A smaller carbon footprint and easier compliance." },
];

/** The six layers (bottom-up is how they're built; shown top-down as a stack) */
export const architecture = {
  eyebrow: "Architecture",
  headline: "Six layers. One system.",
  subhead: "From the hardware on your roof to the outcomes on your bill.",
  layers: [
    {
      key: "building",
      title: "Building systems",
      line: "Everything the platform can see and steer.",
      items: ["HVAC", "Occupancy", "Air quality (CO₂, VOCs, particulates)", "Humidity", "Lighting", "Refrigeration", "Equipment & energy metering"],
    },
    {
      key: "hardware",
      title: "Hardware",
      line: "The DLC controller, thermostats and smart sensors.",
      items: ["DLC controller (peak demand)", "Wired & wireless thermostats", "Occupancy, temperature & air sensors", "Custom configurations"],
    },
    {
      key: "data",
      title: "Data",
      line: "Every reading, in one place.",
      items: ["Web portal & history", "Remote dashboard", "Reports", "API for integrations"],
    },
    {
      key: "application",
      title: "Intelligence",
      line: "Patented DLC logic plus AI and machine learning.",
      items: ["Patented algorithms", "Fault detection & diagnostics", "Asset management", "Detailed reporting"],
    },
    {
      key: "vfm",
      title: "Virtual facility management",
      line: "Real people watching your sites.",
      items: ["Live customer support", "Verification of on-site service calls", "HVAC expertise & consulting"],
    },
    {
      key: "outcomes",
      title: "Outcomes",
      line: "What it all adds up to.",
      items: ["Up to 30% energy savings", "Fewer emergency repairs", "Longer equipment life", "Smaller carbon footprint"],
    },
  ],
  cloud: {
    headline: "A secure, scalable cloud.",
    points: ["Asset control", "Asset monitoring", "Predictive analytics", "Scales from one site to hundreds", "Enhanced security"],
  },
};

export const dlcFeatures = {
  eyebrow: "DLC features",
  headline: "Comfort that follows people.",
  subhead: "The Demand Limiting Controller goes well beyond a thermostat.",
  groups: [
    {
      icon: "users" as IconName,
      title: "Occupancy sensing",
      line: "Choose the right sensor for each space: passive infrared (PIR), ultrasonic or CO₂.",
      points: ["Real-time occupancy detection", "HVAC and lighting respond to who's actually there"],
    },
    {
      icon: "zones" as IconName,
      title: "Zone control",
      line: "Every zone gets its own temperature and lighting targets.",
      points: ["Setback when a zone is empty", "Fast return to comfort when people arrive", "Schedules that follow real occupancy"],
    },
    {
      icon: "activity" as IconName,
      title: "Real-time response",
      line: "Adaptive comfort, with reports that prove the savings.",
      points: ["Adaptive comfort", "Energy and performance reports", "Works with existing HVAC and BMS"],
    },
  ],
};

export const assetManagement = {
  eyebrow: "Asset management",
  headline: "Equipment that lasts longer.",
  subhead: "See how every unit performs, and fix it before it fails.",
  points: [
    { title: "Real-time transparency", line: "Remote monitoring shows which assets are wasting energy." },
    { title: "Better performance", line: "KPI tracking plus predictive analytics on every unit." },
    { title: "Lower repair costs", line: "Underperformers get flagged before they need costly repairs." },
    { title: "Reports your way", line: "By equipment, department or time period." },
  ],
  realtime: ["Predictive maintenance alerts", "Custom temperature and schedule settings", "Asset monitoring", "Automated PM schedules with reminders"],
};

export const technologyFaq: FaqItem[] = [
  {
    q: "What is the DLC?",
    a: "The Demand Limiting Controller is SES's patented energy management technology for HVAC. It uses AI and machine learning to monitor and manage energy use in real time.",
  },
  {
    q: "Is it an energy management system?",
    a: "Yes. The SES platform is a cloud-based energy management system (EMS) covering HVAC energy use, rooftop control, indoor air quality, occupancy and energy metering.",
  },
  {
    q: "Is the DLC a BAS or BMS?",
    a: "It works with them. The DLC integrates with an existing BAS or BMS and adds intelligent demand management on top.",
  },
  {
    q: "What makes the DLC's approach different?",
    a: "It combines real-time data, predictive algorithms and patented logic to manage HVAC demand without hurting comfort, and it learns and adapts to each facility.",
  },
  {
    q: "My HVAC is already efficient. Will I still save?",
    a: "Usually, yes. The DLC optimizes by zone demand and utility rate signals, which often adds savings of around 30% even on efficient equipment.",
  },
  {
    q: "Does it work with my existing building energy system?",
    a: "Yes. The DLC controls HVAC across any number of remote sites and reports up to your building energy dashboard, reachable from any web-enabled device.",
  },
  {
    q: "How does it help with maintenance?",
    a: "It monitors runtime, performance and anomalies on every unit, so maintenance is predictive. Equipment lasts longer and repairs cost less.",
  },
];

export const managedServicesFaq: FaqItem[] = [
  {
    q: "What are managed services for building energy management?",
    a: "Ongoing monitoring, maintenance and support from the SES team: real-time diagnostics, asset management and virtual support.",
  },
  {
    q: "How does the virtual facility manager work?",
    a: "Our team oversees your sites remotely. They spot issues early, suggest fixes in real time and recommend improvements, with no on-site manager needed.",
  },
  {
    q: "What does 16/7 monitoring cover?",
    // TODO: confirm support hours. The old site says both 16/7 and 24/7.
    a: "Expert monitoring and diagnostic support through your busiest hours, which means less downtime and lower maintenance costs.",
  },
  {
    q: "How does predictive maintenance cut costs?",
    a: "Data analytics catch problems before they turn into costly repairs, and equipment lasts longer.",
  },
  {
    q: "What reporting do I get?",
    a: "Equipment performance, usage trends and maintenance history, so upgrade and replacement decisions are based on data.",
  },
];
