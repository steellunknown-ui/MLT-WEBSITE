"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { useContactModal } from "@/components/contact/ContactModalContext";

export interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  kicker: string;
  title: string;
  tagline: string;
  description: string;
  objectPosition?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

const SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/images/hero-slide-1.png",
    alt: "Manohar Lal Tandon seated in his office, Chairman of Tandon Group",
    kicker: "Chairman · Tandon Group",
    title: "Manohar Lal Tandon",
    tagline: "Building Indian electronics manufacturing since the 1970s.",
    description:
      "A veteran of India's electronics manufacturing and export industry, founder of the Tandon Group, and lifelong champion of technological self-reliance.",
    objectPosition: "object-[48%_center] sm:object-[30%_center] md:object-left lg:object-left",
    primaryCta: { label: "Read the Journey", href: "/journey" },
    secondaryCta: { label: "Get in touch", href: "/contact" },
  },
  {
    id: "slide-2",
    image: "/images/hero-slide-2.png",
    alt: "Hon'ble Prime Minister Shri Atal Bihari Vajpayee presenting the Award of Excellence to Mr. M. L. Tandon",
    kicker: "Honoured by Prime Minister of India · 1996–97",
    title: "Award of Excellence",
    tagline: "Presented by Hon'ble Prime Minister Shri Atal Bihari Vajpayee.",
    description:
      "Trophy & Certificate for Third Highest Export on All-India Basis (₹144.80 Crores), celebrating pioneering excellence in Indian hardware manufacturing.",
    objectPosition: "object-right",
    primaryCta: { label: "View in Achievements", href: "/achievements" },
    secondaryCta: { label: "Read the Journey", href: "/journey" },
  },
  {
    id: "slide-3",
    image: "/images/hero-slide-3.png",
    alt: "Dr. Manmohan Singh, Union Finance Minister, presenting the Best Exporter Award to Mr. M. L. Tandon",
    kicker: "Honoured by Finance Minister · 1992–93",
    title: "Best Exporter Award",
    tagline: "Presented by Hon'ble Union Finance Minister Dr. Manmohan Singh.",
    description:
      "Recognizing landmark export achievements and foreign exchange earnings across India's export processing zones for Advance Technology Devices and Ultra Tek Devices.",
    objectPosition: "object-right",
    primaryCta: { label: "View in Achievements", href: "/achievements" },
    secondaryCta: { label: "Read the Journey", href: "/journey" },
  },
];

export default function HeroSlider() {
  const { openContactModal } = useContactModal();
  const [current, setCurrent] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    setTimerKey((k) => k + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setTimerKey((k) => k + 1);
  }, []);

  const goToSlide = useCallback((idx: number) => {
    setCurrent(idx);
    setTimerKey((k) => k + 1);
  }, []);

  // Autoplay: automatically advances every 5 seconds.
  // Resets timer whenever user interacts with navigation (prev, next, or indicator pills).
  // Cursor presence does not pause it (whether cursor is hovering or not).
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, timerKey]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative bg-royal-950 text-white h-[680px] sm:h-[720px] lg:h-[780px] xl:h-[820px] overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Founder Highlights"
    >
      {/* ── BACKGROUND IMAGE SLIDER LAYER (Crossfade, locked dimensions) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              current === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={current !== idx}
          >
            {/* Wide panoramic banner positioned so subject figures are on the right */}
            <img
              src={s.image}
              alt={s.alt}
              className={`w-full h-full object-cover ${s.objectPosition ?? "object-left"}`}
              loading={idx === 0 ? "eager" : "lazy"}
            />

            {/* Seamless dark overlay extending from the left to frame typography */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-royal-950 via-royal-950/80 to-transparent w-full sm:w-[65%] md:w-[52%] lg:w-[44%] pointer-events-none"
              aria-hidden="true"
            />

            {/* Top and bottom subtle hairline borders */}
            <div className="absolute top-0 inset-x-0 h-px bg-gold/20" aria-hidden="true" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gold/20" aria-hidden="true" />
          </div>
        ))}
      </div>

      {/* ── FOREGROUND CONTENT (LEFT SIDE - Full height with pinned bottom controls) ── */}
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10 w-full h-full flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 lg:pb-12">
        {/* TOP / CENTER: TEXT CONTENT BLOCK */}
        <div className="max-w-xl lg:max-w-[480px] xl:max-w-[520px]">
          {/* Subtle gold hairline on the left */}
          <div className="relative pl-6 sm:pl-8 border-l border-gold/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* 1. Kicker / Subtitle */}
                <div className="inline-flex items-center gap-3 mb-3 sm:mb-4">
                  <span className="w-6 h-px bg-gold" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-gold font-royal">
                    {slide.kicker}
                  </span>
                </div>

                {/* 2. Royal Headline */}
                <h1 className="font-royal text-4xl sm:text-5xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-medium tracking-wide text-white uppercase leading-[1.08] mb-3 sm:mb-4 drop-shadow-md">
                  {slide.title}
                </h1>

                {/* 3. Golden Tagline */}
                <p className="font-serif text-xl sm:text-2xl md:text-[1.65rem] text-gold-light leading-snug mb-3 font-light">
                  {slide.tagline}
                </p>

                {/* 4. Description */}
                <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed mb-6 font-light">
                  {slide.description}
                </p>

                {/* 5. CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  {slide.primaryCta && (
                    <Button as="link" href={slide.primaryCta.href} size="lg">
                      {slide.primaryCta.label}
                    </Button>
                  )}
                  {slide.secondaryCta && (
                    slide.secondaryCta.label.toLowerCase().includes("touch") ? (
                      <Button
                        as="button"
                        type="button"
                        onClick={openContactModal}
                        variant="secondary"
                        size="lg"
                      >
                        {slide.secondaryCta.label}
                      </Button>
                    ) : (
                      <Button
                        as="link"
                        href={slide.secondaryCta.href}
                        variant="secondary"
                        size="lg"
                      >
                        {slide.secondaryCta.label}
                      </Button>
                    )
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM: SLIDER CONTROLS & PAGINATION (Permanently pinned at bottom, zero shifting) */}
        <div className="pt-4 border-t border-gold/20 flex items-center justify-between gap-6 max-w-xl lg:max-w-[480px] xl:max-w-[520px] w-full shrink-0">
          {/* Slide counter & progress indicator */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <span className="font-royal text-sm font-semibold tracking-widest text-gold tabular-nums w-14 inline-block select-none">
              {String(current + 1).padStart(2, "0")} <span className="text-white/40">/</span> {String(SLIDES.length).padStart(2, "0")}
            </span>

            {/* Slide Navigation Bars with dynamic 5s progress fill */}
            <div className="flex items-center gap-2">
              {SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-gold relative ${
                    current === idx
                      ? "w-9 bg-gold/25"
                      : "w-3 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${s.title}`}
                  aria-current={current === idx ? "true" : undefined}
                >
                  {current === idx && (
                    <motion.div
                      key={`progress-${current}-${timerKey}`}
                      className="absolute inset-y-0 left-0 bg-gold rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Prev / Next Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={prevSlide}
              className="w-10 h-10 shrink-0 bg-royal-950/85 backdrop-blur-sm border border-gold/40 hover:border-gold hover:bg-gold/20 text-gold flex items-center justify-center transition-all duration-200 shadow-md focus:outline-none focus-visible:ring-1 focus-visible:ring-gold active:scale-95"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-10 h-10 shrink-0 bg-royal-950/85 backdrop-blur-sm border border-gold/40 hover:border-gold hover:bg-gold/20 text-gold flex items-center justify-center transition-all duration-200 shadow-md focus:outline-none focus-visible:ring-1 focus-visible:ring-gold active:scale-95"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
