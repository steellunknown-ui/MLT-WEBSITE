import Link from "next/link";
import { site } from "@/lib/site";

const currentYear = new Date().getFullYear();

const contactLinks = [
  { label: "Mumbai, India", href: null },
  { label: "Silicon Valley, USA", href: null },
];

export default function Footer() {
  return (
    <footer className="bg-royal-950" role="contentinfo">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        {/* Top hairline */}
        <hr className="hairline" aria-hidden="true" />

        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Wordmark + tagline */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-serif text-xl font-semibold tracking-tight text-white"
              aria-label={`${site.siteName} — home`}
            >
              {site.siteName}
            </Link>
            <p className="font-sans text-sm leading-relaxed text-white/50">
              {site.tagline}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <nav aria-label="Footer navigation">
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-gold">
              Navigation
            </p>
            <ul className="flex flex-col gap-2" role="list">
              {site.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Contact */}
          <div>
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-gold">
              Contact
            </p>
            <ul className="flex flex-col gap-2" role="list">
              {contactLinks.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-sans text-sm text-white/60 transition-colors duration-200 hover:text-white"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="font-sans text-sm text-white/60">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-gold">
              Enquiries
            </p>
            <ul className="flex flex-col gap-2" role="list">
              <li>
                <Link
                  href="/contact"
                  className="font-sans text-sm text-white/60 transition-colors duration-200 hover:text-white"
                >
                  Contact Office &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom hairline + copyright */}
        <hr className="hairline" aria-hidden="true" />
        <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-white/60">
            © {currentYear} {site.founderName}. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="font-sans text-xs text-white/60 transition-colors duration-200 hover:text-white"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
