import Link from "next/link";
import { footer, site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { Logo } from "./Logo";

// py-1 gives every footer link at least a 24px tap target (WCAG 2.2 target size)
const link = "inline-block py-1 hover:text-text";

export function Footer() {
  const { address: a } = site;
  return (
    <footer className="border-t border-hairline bg-surface-2 pb-[env(safe-area-inset-bottom)] text-caption text-text-2">
      <div className="container-page py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_0.9fr_1.1fr]">
          <div>
            <Logo className="h-12 text-text" title={site.name} />
            <p className="mt-4 max-w-[18rem]">{footer.blurb}</p>
            <ul className="mt-6 flex gap-4">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {s.label}
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
