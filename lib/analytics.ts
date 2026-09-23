declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** No-ops until NEXT_PUBLIC_GA_MEASUREMENT_ID is set and the GA4 script has loaded. */
export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
