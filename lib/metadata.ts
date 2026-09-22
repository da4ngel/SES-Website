import type { Metadata } from "next";

/** Per-page metadata with matching Open Graph fields and a canonical URL. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, url: path },
    alternates: { canonical: path },
  };
}
