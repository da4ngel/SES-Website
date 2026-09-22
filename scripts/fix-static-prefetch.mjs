/**
 * Postbuild fix for a Windows-only Next.js static-export quirk.
 *
 * The client router prefetches  out/contact/__next.contact.__PAGE__.txt
 * but on Windows the exporter writes out/contact/__next.contact/__PAGE__.txt
 * (a folder instead of a dot-joined file name), so prefetches 404.
 * This flattens every "__next.*" folder into dot-joined files. On Linux/macOS
 * builds there is nothing to fix and the script does nothing.
 */
import { readdirSync, statSync, renameSync, rmSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
let fixed = 0;

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const f of files(p)) {
        const flat = `${name}.${relative(p, f).split(sep).join(".")}`;
        const target = join(dir, flat);
        if (!existsSync(target)) {
          renameSync(f, target);
          fixed++;
        }
      }
      rmSync(p, { recursive: true, force: true });
    } else {
      walk(p);
    }
  }
}

if (existsSync(OUT)) walk(OUT);
console.log(`fix-static-prefetch: flattened ${fixed} prefetch file(s)`);
