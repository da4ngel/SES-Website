import type { Metadata } from "next";
import Link from "next/link";

// This page moved to /technology/how-it-works/. Static export can't do server redirects,
// so this stub forwards instantly (meta refresh) and points search engines at the new URL.
const TARGET = "/technology/how-it-works/";

export const metadata: Metadata = {
  title: "How it works",
  alternates: { canonical: TARGET },
  robots: { index: false, follow: true },
};

export default function MovedPage() {
  return (
    <section className="container-page py-32 text-center">
      <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
      <p className="text-body text-text-2">
        This page has moved to{" "}
        <Link href={TARGET} className="text-accent underline underline-offset-4">
          How it works
        </Link>
        .
      </p>
    </section>
  );
}
