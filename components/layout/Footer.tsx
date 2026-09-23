import Link from "next/link";
import { footer, site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { Logo } from "./Logo";

// py-1 gives every footer link at least a 24px tap target (WCAG 2.2 target size)
const link = "inline-block py-1 hover:text-text";

// lucide-react has no brand/logo icons (dropped from the set) — hand-drawn to match
// its single-path, currentColor convention instead of pulling in a new dependency.
const socialIcons = {
  linkedin: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  ),
  youtube: (
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  ),
  facebook: (
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.732-.009 2.484 2.484 0 0 0-.766.045c-.396.1-.647.412-.76.822-.02.081-.04.161-.056.246-.05.246-.05.505-.05.766-.001.234 0 1.24 0 1.24l3.117-.001-.36 3.658h-2.756v7.98H9.101z" />
  ),
} as const;

function SocialIcon({ name }: { name: keyof typeof socialIcons }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-[18px]">
      {socialIcons[name]}
    </svg>
  );
}

export function Footer() {
  const { address: a } = site;
  return (
    <footer className="border-t border-hairline bg-surface-2 pb-[env(safe-area-inset-bottom)] text-caption text-text-2">
      <div className="container-page py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_0.9fr_1.1fr]">
          <div>
            <Logo className="h-12 text-text" title={site.name} />
            <p className="mt-4 max-w-[18rem]">{footer.blurb}</p>
            <ul className="mt-6 flex gap-2">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="pressable grid size-11 place-items-center rounded-full text-text-2 ring-1 ring-inset ring-hairline hover:bg-surface hover:text-accent"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Solutions">
            <h2 className="mb-3 font-semibold text-text">Solutions</h2>
            <ul className="space-y-2">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link href={`/solutions/${s.slug}/`} className={link}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="mb-3 font-semibold text-text">Company</h2>
            <ul className="space-y-2">
              {footer.columns.company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Programs">
            <h2 className="mb-3 font-semibold text-text">Programs</h2>
            <ul className="space-y-2">
              {footer.columns.programs.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={site.portalUrl} className={link}>
                  Customer log in
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 font-semibold text-text">Contact</h2>
            <address className="space-y-3 not-italic">
              <p>
                <a href={site.phone.href} className={link}>
                  {site.phone.display}
                </a>
                <span className="block">Sales: ext. {site.phone.salesExt}</span>
              </p>
              <p>
                <a href={`mailto:${site.email.sales}`} className={link}>
                  {site.email.sales}
                </a>
                <br />
                <a href={`mailto:${site.email.support}`} className={link}>
                  {site.email.support}
                </a>
              </p>
              <p>
                {a.street}
                <br />
                {a.city}, {a.region} {a.postalCode}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <ul className="flex gap-6">
            {footer.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
