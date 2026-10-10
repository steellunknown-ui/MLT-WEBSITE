"use client";

import { useEffect, useRef } from "react";

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      barRef.current.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] bg-gold/20 z-50 origin-left"
    >
      <div
        ref={barRef}
        className="h-full bg-gold origin-left"
        style={{ transform: "scaleX(0)", willChange: "transform" }}
      />
    </div>
  );
}
