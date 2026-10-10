"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

const emptySubscribe = () => () => {};

export default function ImageLightbox({ src, alt, className, children }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // prevent scroll behind modal
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {children ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={className ?? "block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"}
          aria-label={`View larger image of ${alt}`}
        >
          {children}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-transform hover:scale-105"
          aria-label={`View larger image of ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-48 object-contain rounded border border-gold/20 shadow-sm cursor-zoom-in"
            loading="lazy"
          />
        </button>
      )}

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-royal-950/50 backdrop-blur-sm p-4 md:p-8"
              onClick={() => setIsOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label={`Image detail: ${alt}`}
            >
              {/* Close Button */}
              <button
                type="button"
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded p-2 z-10"
                onClick={() => setIsOpen(false)}
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

              {/* Image Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative max-w-full max-h-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()} // prevent click from bubbling to backdrop
              >
                <img
                  src={src}
                  alt={alt}
                  className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
                />
                <p className="mt-6 text-white/80 font-serif text-lg md:text-xl text-center max-w-2xl">
                  {alt}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
