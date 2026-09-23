import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { seo } from "@/content/seo";
import { Hero } from "@/components/home/Hero";
import { BigNumbers } from "@/components/home/BigNumbers";
import { SolutionsBento } from "@/components/home/SolutionsBento";
import { FinalCta } from "@/components/home/FinalCta";
import { ManagedServices } from "@/components/home/ManagedServices";
import { ResultsTeaser } from "@/components/home/ResultsTeaser";

// Code-split the heaviest below-the-fold sections (Motion-driven scroll story,
// gesture-driven carousel) into their own chunks. No ssr:false — these still render
// fully on the server/at build time, this only splits the client bundle so hydrating
// the rest of the page doesn't wait on their JS too.
const HowItWorksStory = dynamic(() => import("@/components/home/HowItWorksStory").then((m) => m.HowItWorksStory));
const PlatformPeek = dynamic(() => import("@/components/home/PlatformPeek").then((m) => m.PlatformPeek));
const SocialProof = dynamic(() => import("@/components/home/SocialProof").then((m) => m.SocialProof));

export const metadata: Metadata = {
  title: { absolute: seo.home.title },
  description: seo.home.description,
  openGraph: { title: seo.home.title, description: seo.home.description, url: "/" },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <BigNumbers />
      <HowItWorksStory />
      <SolutionsBento />
      <PlatformPeek />
      <ManagedServices />
      <ResultsTeaser />
      <SocialProof />
      <FinalCta />
    </>
  );
}
