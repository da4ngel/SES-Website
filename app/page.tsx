import type { Metadata } from "next";
import { seo } from "@/content/seo";
import { Hero } from "@/components/home/Hero";
import { BigNumbers } from "@/components/home/BigNumbers";
import { HowItWorksStory } from "@/components/home/HowItWorksStory";
import { SolutionsBento } from "@/components/home/SolutionsBento";
import { PlatformPeek } from "@/components/home/PlatformPeek";
import { SocialProof } from "@/components/home/SocialProof";
import { FinalCta } from "@/components/home/FinalCta";
import { ManagedServices } from "@/components/home/ManagedServices";
import { ResultsTeaser } from "@/components/home/ResultsTeaser";

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
