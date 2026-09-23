import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/content/site";
import { seo } from "@/content/seo";
import { organizationJsonLd } from "@/lib/jsonld";
import { Providers } from "@/components/layout/Providers";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seo.home.title, template: `%s | ${site.name}` },
  description: seo.home.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Paint edge to edge; content is padded back with env(safe-area-inset-*)
  viewportFit: "cover",
  // Android: the software keyboard resizes the layout, like iOS
  interactiveWidget: "resizes-content",
  // Dark is the default theme (see components/layout/ThemeToggle.tsx), so the
  // pre-hydration meta tag matches it; the toggle updates it once mounted.
  themeColor: "#000000",
};

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme")||"dark";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent-fill focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        <Providers>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
        {/* One Toaster for the whole site. Used sparingly: "Email copied" and form network errors. */}
        <Toaster
          theme="system"
          position="bottom-center"
          offset={{ bottom: "calc(24px + env(safe-area-inset-bottom, 0px))" }}
          mobileOffset={{ bottom: "calc(16px + env(safe-area-inset-bottom, 0px))" }}
          toastOptions={{ style: { borderRadius: "18px", fontFamily: "inherit", fontSize: "0.9375rem" } }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </body>
    </html>
  );
}
