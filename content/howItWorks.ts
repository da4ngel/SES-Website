import type { IconName } from "./solutions";

/**
 * The 4 steps. Used by the homepage scroll story and /how-it-works.
 * `visual` picks the diagram in components/home/StepVisual.tsx.
 */
export type Step = {
  id: string;
  icon: IconName;
  visual: "zones" | "smartstart" | "monitoring" | "peak";
  title: string;
  line: string;
  /** Longer explainer for /how-it-works (max 2 short sentences) */
  detail: string;
};

export const steps: Step[] = [
  {
    id: "zone-control",
    icon: "zones",
    visual: "zones",
    title: "Zone control",
    line: "Each area gets exactly the heating or cooling it needs.",
    detail:
      "Every zone gets its own target. Busy spaces stay comfortable while quiet ones ease off.",
  },
  {
    id: "smart-start",
    icon: "sunrise",
    visual: "smartstart",
    title: "Smart Start",
    line: "Units start one after another, not all at once.",
    detail:
      "Starting everything together creates a costly power spike. Smart Start staggers units so you reach comfort without the spike.",
  },
  {
    id: "monitoring",
    icon: "activity",
    visual: "monitoring",
    title: "Real-time monitoring",
    line: "Sensors report every minute. AI flags anything unusual.",
    detail:
      "Readings from every rooftop unit flow to the cloud around the clock. Problems show up on your screen months before a breakdown.",
  },
  {
    id: "peak",
    icon: "clock",
    visual: "peak",
    title: "Peak and off-peak optimization",
    line: "Use power when it's cheap. Hold back when it's not.",
    detail:
      "Utility rates change through the day. The controller shifts work toward cheaper hours and trims demand at the peak.",
  },
];

export const howItWorksIntro = {
  eyebrow: "How it works",
  headline: "Smarter units, not new ones.",
  subhead: "A small controller on each rooftop unit. One cloud to run them all.",
  // First mention of RTU and DLC, explained briefly (copy rule)
  explainer:
    "We add our patented Demand Limiting Controller (DLC) and sensors to your existing rooftop units (RTUs), the heating and cooling boxes on your roof.",
};

/** What gets installed. Used on /how-it-works. */
export const whatWeInstall = {
  eyebrow: "What we install",
  headline: "Three parts. One system.",
  items: [
    {
      icon: "zones" as IconName,
      title: "The controller",
      line: "Our patented DLC mounts on each existing unit. In the field since 2012.",
    },
    {
      icon: "gauge" as IconName,
      title: "The sensors",
      line: "Small sensors read temperature, power and runtime.",
    },
    {
      icon: "remote" as IconName,
      title: "The cloud",
      line: "One platform with AI fault detection and remote control of every site.",
    },
  ],
};

export const howItWorksPage = {
  eyebrow: "How it works",
  headline: "Your units, made smart.",
  subhead: "No new equipment. Just a controller, sensors and a cloud that thinks ahead.",
};
