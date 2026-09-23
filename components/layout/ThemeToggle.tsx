"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Moon, Sun } from "lucide-react";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const BG = { light: "#fbfbfd", dark: "#000000" } as const satisfies Record<Theme, string>;

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute("content", BG[theme]);
  });
}

/**
 * Dark is the default theme until the user picks explicitly (then localStorage
 * owns it). Syncs with the inline script in app/layout.tsx that already set
 * data-theme before paint; see node_modules/next/dist/docs/.../preventing-flash-before-hydration.md.
 */
export function ThemeToggle() {
  // Starts "dark" to match the server-rendered <html data-theme="dark">, so
  // hydration never diffs against a client-only value (the classic pitfall the
  // Next docs call out). The real theme — already applied to <html> pre-paint by
  // the inline script in app/layout.tsx — is read into state below, before paint.
  const [theme, setTheme] = useState<Theme>("dark");

  // Re-derive from the same source the inline script used (not from the DOM
  // attribute — React Strict Mode's dev remount can wipe it back to the JSX
  // default first; see the docs' "Re-applying attributes in development").
  useLayoutEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const resolved: Theme = stored === "light" ? "light" : "dark";
    // Syncing render state from localStorage, unavailable during SSR/the initial
    // render — not state derivable from props, so the usual "don't setState in
    // an effect" advice doesn't apply.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(resolved);
    applyTheme(resolved);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
      return next;
    });
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={cn("pressable relative grid size-11 place-items-center overflow-hidden rounded-full")}
    >
      <AnimatePresence initial={false} mode="wait">
        <m.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1, transition: spring.snappy }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6, transition: spring.snappy }}
          className="grid place-items-center"
        >
          {theme === "dark" ? (
            <Moon strokeWidth={1.5} aria-hidden="true" className="size-4.5" />
          ) : (
            <Sun strokeWidth={1.5} aria-hidden="true" className="size-4.5" />
          )}
        </m.span>
      </AnimatePresence>
    </button>
  );
}