"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export const archivalImages = [
  {
    src: "/images/seepz-cleanroom-manufacturing.jpg",
    alt: "Historical SEEPZ cleanroom, Mumbai: Mr. M. L. Tandon demonstrating micro-precision magnetic recording head assembly with technicians inside the cleanroom",
  },
  {
    src: "/images/seepz-assembly-floor-1982.jpg",
    alt: "Historical 1982 assembly floor: Women technicians assembling precision components with visiting international dignitaries and Mr. M. L. Tandon",
  },
  {
    src: "/images/seepz-cleanroom-dignitaries.jpg",
    alt: "Cleanroom briefing: Mr. M. L. Tandon reviewing precision micro-assembly procedures with visiting delegates in cleanroom suits",
  },
  {
    src: "/images/seepz-cleanroom-magnetic-head-tray.jpg",
    alt: "Precision manufacturing: Mr. M. L. Tandon inspecting finished magnetic head cassettes on the SEEPZ cleanroom floor",
  },
  {
    src: "/images/seepz-cleanroom-inspection-review.jpg",
    alt: "Quality review: High-precision component verification under cleanroom microscope workstations with executive supervisors",
  },
  {
    src: "/images/seepz-cleanroom-microscope-hall.jpg",
    alt: "SEEPZ cleanroom facility: Technicians operating microscope workstations for high-density magnetic recording head production",
  },
];

const emptySubscribe = () => () => {};

export default function ArchivalImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    if (isPaused || isLightboxOpen) return;

    // Auto-advance every 4.5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % archivalImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, isLightboxOpen]);

  // Handle keyboard events when lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % archivalImages.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + archivalImages.length) % archivalImages.length);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  const currentImage = archivalImages[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + archivalImages.length) % archivalImages.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % archivalImages.length);
  };

  return (
    <>
      <div
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs border border-gold/30 bg-royal-950/5 shadow-md transition-all duration-300 hover:border-gold hover:shadow-xl group">
          {/* Main Clickable Image Area (Lightbox trigger) */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label={`View larger image of ${currentImage.alt}`}
            className="absolute inset-0 w-full h-full text-left cursor-zoom-in focus:outline-hidden focus-visible:ring-2 focus-visible:ring-gold z-0"
          >
            {/* Stack of images with crossfade opacity transition */}
            {archivalImages.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={img.src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    priority={idx === 0}
                  />
                </div>
              );
            })}

            {/* Hover Overlay with expand hint */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-royal-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5">
              <span className="text-xs text-white/95 flex items-center gap-1.5 font-medium tracking-wide drop-shadow-sm">
                <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                Click to expand ({currentIndex + 1} of {archivalImages.length})
              </span>
            </div>
          </button>

          {/* Sibling Navigation Controls: Arrows on hover (NOT nested inside any button) */}
          <div className="absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous archival image"
              className="w-8 h-8 rounded-full bg-royal-950/80 hover:bg-gold text-white hover:text-royal-950 flex items-center justify-center transition-all duration-200 pointer-events-auto border border-gold/40 shadow-md active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next archival image"
              className="w-8 h-8 rounded-full bg-royal-950/80 hover:bg-gold text-white hover:text-royal-950 flex items-center justify-center transition-all duration-200 pointer-events-auto border border-gold/40 shadow-md active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Sibling Navigation Controls: Dots Indicator (NOT nested inside any button) */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-xs border border-white/10 pointer-events-auto">
            {archivalImages.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  dotIdx === currentIndex
                    ? "w-4 h-1.5 bg-gold"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-royal-950/80 backdrop-blur-md p-4 md:p-8"
              onClick={() => setIsLightboxOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label={`Archival photo: ${currentImage.alt}`}
            >
              {/* Close Button */}
              <button
                type="button"
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-gold rounded p-2 z-20 cursor-pointer"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Prev in Lightbox */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev - 1 + archivalImages.length) % archivalImages.length);
                }}
                aria-label="Previous photograph"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-gold text-white hover:text-royal-950 flex items-center justify-center border border-gold/40 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next in Lightbox */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev + 1) % archivalImages.length);
                }}
                aria-label="Next photograph"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-gold text-white hover:text-royal-950 flex items-center justify-center border border-gold/40 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Container */}
              <motion.div
                key={currentImage.src}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative max-w-full max-h-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-xs shadow-2xl border border-gold/20"
                />
                <p className="mt-4 text-gold-light/90 font-serif text-base md:text-lg text-center max-w-2xl px-4">
                  {currentImage.alt}
                </p>
                <span className="text-xs text-white/50 font-mono mt-1">
                  {currentIndex + 1} / {archivalImages.length}
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
