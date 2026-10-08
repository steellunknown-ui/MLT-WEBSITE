"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  // Detect scroll position to toggle solid background
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close drawer on route change without setting state inside effect
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setDrawerOpen(false);
    setPrevPathname(pathname);
  }

  // Focus trap inside mobile drawer
  useEffect(() => {
    if (!drawerOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusable = drawer.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        openButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [drawerOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // The link that should show the underline indicator:
  // hovered link takes priority; falls back to the active page link.
  const indicatorHref = hoveredHref ?? site.navLinks.find((l) => isActive(l.href))?.href ?? null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-royal-950 border-b border-gold/30"
            : "bg-transparent border-b border-transparent"
        }`}
        role="banner"
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-serif text-xl font-semibold tracking-tight text-white"
            aria-label={`${site.siteName} — home`}
          >
            {site.siteName}
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:block"
            onMouseLeave={() => setHoveredHref(null)}
          >
            <ul className="flex items-center gap-8" role="list">
              {site.navLinks.map((link) => {
                const active = isActive(link.href);
                const showIndicator = indicatorHref === link.href;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onMouseEnter={() => setHoveredHref(link.href)}
                      className={`relative inline-block font-sans text-sm tracking-wide transition-colors duration-200 pb-1 ${
                        active || hoveredHref === link.href
                          ? "text-gold"
                          : "text-white/80"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}

                      {/* Sliding gold underline — shared layoutId so it moves */}
                      <AnimatePresence>
                        {showIndicator && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute bottom-0 left-0 h-px w-full bg-gold"
                            aria-hidden="true"
                            initial={false}
                            transition={{
                              duration: 0.25,
                              ease: "easeOut",
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile menu toggle */}
          <button
            ref={openButtonRef}
            type="button"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={() => setDrawerOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded lg:hidden"
          >
            <span
              className={`block h-px w-6 bg-white transition-all duration-300 ${
                drawerOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
              aria-hidden="true"
            />
            <span
              className={`block h-px w-6 bg-white transition-all duration-300 ${
                drawerOpen ? "opacity-0" : ""
              }`}
              aria-hidden="true"
            />
            <span
              className={`block h-px w-6 bg-white transition-all duration-300 ${
                drawerOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      {drawerOpen && (
        <div
          id="mobile-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 flex flex-col bg-royal-950 pt-16"
        >
          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 flex-col justify-center px-8"
          >
            <ul className="flex flex-col gap-2" role="list">
              {site.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block border-b py-4 font-serif text-2xl font-medium tracking-tight transition-colors duration-200 ${
                      isActive(link.href)
                        ? "border-gold text-gold"
                        : "border-white/10 text-white hover:text-gold hover:border-gold/40"
                    }`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
