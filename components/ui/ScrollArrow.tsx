"use client";

import { useState, useEffect } from "react";

export default function ScrollArrow() {
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateDirection = () => {
      const scrollY = window.scrollY;
      // When scrolled down past 300px, point UP so clicking scrolls to top.
      // When near the top (<= 300px), point DOWN so clicking scrolls to bottom.
      if (scrollY > 300) {
        setDirection("up");
      } else {
        setDirection("down");
      }
    };

    window.addEventListener("scroll", updateDirection, { passive: true });
    updateDirection();

    return () => window.removeEventListener("scroll", updateDirection);
  }, []);

  const handleScroll = () => {
    if (direction === "down") {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={handleScroll}
      aria-label={direction === "up" ? "Scroll to top" : "Scroll to bottom"}
      title={direction === "up" ? "Scroll to top" : "Scroll to bottom"}
      style={{ right: "1.5rem", bottom: "1.5rem" }}
      className="fixed z-50 w-11 h-11 md:w-12 md:h-12 rounded-full bg-royal-950/95 text-gold border border-gold/40 shadow-xl shadow-black/50 backdrop-blur-xs flex items-center justify-center transition-all duration-300 hover:bg-gold hover:text-royal-950 hover:border-gold hover:scale-110 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-gold cursor-pointer group"
    >
      <svg
        className={`w-5 h-5 transition-transform duration-300 ${
          direction === "up" ? "rotate-0" : "rotate-180"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
