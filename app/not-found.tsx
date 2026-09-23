import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="pb-24">
      <PageHero eyebrow="404" title="This page took the day off." subhead="The link may be old, or the page has moved.">
        <Button href="/" size="lg">
          Go home
        </Button>
        <Button href="/contact/" size="lg" variant="secondary">
          Contact us
        </Button>
      </PageHero>
    </div>
  );
}
