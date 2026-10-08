"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Achievement } from "@/lib/schema";
import { useReducedMotion } from "framer-motion";

interface AchievementsSliderProps {
  achievements: Achievement[];
}

export default function AchievementsSlider({ achievements }: AchievementsSliderProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % achievements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [achievements.length, isPaused, prefersReducedMotion]);

  if (!achievements.length) return null;

  const current = achievements[index];

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto overflow-hidden bg-white border border-gold/10 p-8 md:p-16 min-h-[340px] flex flex-col justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-royal-950/5">
        <div 
          className="h-full bg-gold transition-all"
          style={{ 
            width: `${((index + 1) / achievements.length) * 100}%`,
            transitionDuration: prefersReducedMotion ? '0s' : '500ms'
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full flex flex-col items-center text-center"
        >
          <span className="text-sm font-semibold tracking-widest text-gold uppercase mb-6 block">
            {current.year}
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-royal-950 leading-tight mb-4 max-w-3xl">
            {current.title}
          </h3>
          <p className="text-ink/80 text-lg mb-4">
            Presented by <span className="font-medium text-ink">{current.issuer}</span>
          </p>
          {current.description && (
            <p className="text-ink/60 text-sm max-w-2xl mx-auto">
              {current.description}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {achievements.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-px transition-all duration-300 ${
              idx === index ? "w-8 bg-gold" : "w-4 bg-gold/20 hover:bg-gold/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
