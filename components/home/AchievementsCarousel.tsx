"use client";

import { useState } from "react";
import Link from "next/link";
import ImageLightbox from "@/components/ui/ImageLightbox";
import type { Achievement } from "@/lib/schema";

interface AchievementsCarouselProps {
  achievements: Achievement[];
}

export default function AchievementsCarousel({ achievements }: AchievementsCarouselProps) {
  // Sort achievements reverse-chronologically so highest honours (PM Vajpayee, Dr. Manmohan Singh, etc.) are upfront
  const items = [...achievements].sort((a, b) => {
    const yearA = parseInt(a.year.match(/^(\d{4})/)?.[1] ?? "0", 10);
    const yearB = parseInt(b.year.match(/^(\d{4})/)?.[1] ?? "0", 10);
    return yearB - yearA;
  });

  // Duplicate items to create a seamless infinite looping track
  const duplicatedItems = [...items, ...items];

  const [direction, setDirection] = useState<"normal" | "reverse">("normal");
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePause = () => {
    setIsManuallyPaused((prev) => !prev);
  };

  const isPaused = isManuallyPaused || isHovered;

  return (
    <section
      id="landmark-achievements"
      className="bg-paper py-24 md:py-32 border-t border-gold/20 overflow-hidden relative"
      aria-label="Achievements Showcase"
    >
      {/* Background delicate gold ornament glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10 mb-10 sm:mb-14">
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-gold" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold font-royal">
                National Honours & Export Legacy
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-royal-950 font-medium leading-tight">
              Landmark Achievements
            </h2>
            <p className="mt-3 text-base sm:text-lg text-ink/70 font-light leading-relaxed">
              Archival record of state honours, national export trophies, and certificates of excellence
              conferred on Mr. M. L. Tandon by India&apos;s Prime Ministers, Presidents, and Union Ministers.
            </p>
          </div>

          {/* Navigation Controls, Status Badge & View All Link */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 shrink-0">
            {/* Live Reel Status Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-royal-950 bg-white/80 border border-gold/30 px-3 py-1.5 rounded-full shadow-xs">
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  isPaused ? "bg-amber-500" : "bg-emerald-500 animate-pulse"
                }`}
                aria-hidden="true"
              />
              <span className="tracking-wider uppercase text-[11px] font-semibold">
                {isPaused ? "Paused" : "Continuous Loop"}
              </span>
            </div>

            {/* Direction & Pause Controls */}
            <div className="flex items-center gap-2">
              {/* Glide Left Button */}
              <button
                type="button"
                onClick={() => {
                  setDirection("reverse");
                  setIsManuallyPaused(false);
                }}
                className={`w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold active:scale-95 ${
                  direction === "reverse" && !isPaused
                    ? "bg-gold text-white"
                    : "bg-white/80 text-royal-950 hover:bg-gold/15"
                }`}
                aria-label="Glide to the left"
                title="Glide backward"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={togglePause}
                className="w-10 h-10 rounded-full border border-gold/40 bg-white/80 text-royal-950 hover:bg-gold hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold active:scale-95"
                aria-label={isManuallyPaused ? "Resume continuous loop" : "Pause continuous loop"}
                title={isManuallyPaused ? "Resume loop" : "Pause loop"}
              >
                {isManuallyPaused ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                )}
              </button>

              {/* Glide Right Button */}
              <button
                type="button"
                onClick={() => {
                  setDirection("normal");
                  setIsManuallyPaused(false);
                }}
                className={`w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold active:scale-95 ${
                  direction === "normal" && !isPaused
                    ? "bg-gold text-white"
                    : "bg-white/80 text-royal-950 hover:bg-gold/15"
                }`}
                aria-label="Glide to the right"
                title="Glide forward"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            {/* View Full Archive Link */}
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold hover:text-royal-950 transition-colors font-royal"
            >
              View Full Archive ({achievements.length}+) <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── CONTINUOUS INFINITE MARQUEE RAIL ── */}
      <div className="relative w-full overflow-hidden">
        {/* Soft Left Vignette Gradient Fade */}
        <div
          className="absolute left-0 inset-y-0 w-12 sm:w-24 lg:w-36 bg-gradient-to-r from-paper via-paper/80 to-transparent z-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Soft Right Vignette Gradient Fade */}
        <div
          className="absolute right-0 inset-y-0 w-12 sm:w-24 lg:w-36 bg-gradient-to-l from-paper via-paper/80 to-transparent z-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Continuous Gliding Track */}
        <div
          className="flex gap-6 w-max py-2 select-none"
          style={{
            animation: "continuous-marquee 58s linear infinite",
            animationDirection: direction === "reverse" ? "reverse" : "normal",
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {duplicatedItems.map((item, idx) => {
            return (
              <div
                key={`${item.year}-${idx}`}
                className="w-[320px] sm:w-[380px] lg:w-[410px] shrink-0 flex flex-col"
              >
                <article className="bg-white border border-gold/25 hover:border-gold rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group overflow-hidden">
                  {/* Archival Photograph Frame with Lightbox Zoom */}
                  {item.image && (
                    <div className="relative aspect-[16/11] bg-royal-950 overflow-hidden flex items-center justify-center p-3 border-b border-gold/20">
                      {/* Background matting hairline */}
                      <div
                        className="absolute inset-2 border border-gold/20 pointer-events-none rounded-xs"
                        aria-hidden="true"
                      />

                      <ImageLightbox
                        src={item.image}
                        alt={`${item.title} presented to Mr. M. L. Tandon`}
                        className="w-full h-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-zoom-in group/img"
                      >
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                          <img
                            src={item.image}
                            alt={`${item.title} presented to Mr. M. L. Tandon`}
                            className="max-h-full max-w-full object-contain rounded-xs transition-transform duration-500 group-hover/img:scale-105"
                            loading="lazy"
                          />
                          {/* Hover Badge with Magnifying Glass */}
                          <div className="absolute bottom-2 right-2 bg-royal-950/85 backdrop-blur-xs border border-gold/40 text-gold px-2 py-1 rounded text-[11px] font-sans flex items-center gap-1.5 opacity-90 group-hover/img:opacity-100 transition-opacity shadow-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="11" cy="11" r="8"></circle>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              <line x1="11" y1="8" x2="11" y2="14"></line>
                              <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                            <span>Zoom</span>
                          </div>
                        </div>
                      </ImageLightbox>
                    </div>
                  )}

                  {/* Card Content Details */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col">
                    {/* Year pill & Issuer */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold font-royal tracking-widest">
                        {item.year}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-ink/40">
                        Official Citation
                      </span>
                    </div>

                    {/* Presenter / Dignitary */}
                    <p className="text-xs font-semibold uppercase tracking-wider text-royal-900/80 mb-2 line-clamp-1">
                      {item.issuer}
                    </p>

                    {/* Award Title */}
                    <h3 className="font-serif text-xl lg:text-2xl text-royal-950 font-medium leading-snug mb-3 group-hover:text-gold transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Description / Export Statistics */}
                    {item.description && (
                      <p className="text-sm text-ink/75 leading-relaxed flex-1 line-clamp-3 font-light mb-6">
                        {item.description}
                      </p>
                    )}

                    {/* Footer: Link to full archive */}
                    <div className="pt-4 border-t border-gold/15 flex items-center justify-between mt-auto">
                      <Link
                        href="/achievements"
                        className="text-xs uppercase tracking-[0.16em] text-gold font-semibold group-hover:text-royal-950 transition-colors inline-flex items-center gap-1.5 font-royal"
                      >
                        Explore in Archive <span aria-hidden="true">&rarr;</span>
                      </Link>
                      <span className="text-[11px] text-ink/40 font-serif italic">
                        Tandon Group
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FOOTER HINT ── */}
      <div className="container mx-auto px-4 md:px-8 mt-8 sm:mt-10">
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-ink/50 border-t border-gold/15 pt-4 gap-2">
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60 inline-block" />
            Hover over any award card to pause &amp; inspect details
          </p>
          <p className="font-serif italic text-ink/40">
            Click any award photograph to examine high-resolution document
          </p>
        </div>
      </div>
    </section>
  );
}
