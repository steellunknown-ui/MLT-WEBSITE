"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { type TimelineItem } from "@/lib/schema";
import Reveal from "@/components/ui/Reveal";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

interface TimelineProps {
  items: TimelineItem[];
}

/**
 * Option 1: Animated milestone node that blooms into solid gold with a pulsing radar ring
 * when it reaches the reading zone of the viewport.
 */
function TimelineNode({ year }: { year: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-15% 0px -35% 0px",
  });

  return (
    <div
      ref={ref}
      aria-label={`Milestone year ${year}`}
      className="absolute left-6 md:left-1/2 -translate-x-1/2 mt-2 z-20 flex items-center justify-center w-7 h-7"
    >
      {/* Expanding Radar Ripple Ring */}
      {isInView && (
        <motion.span
          className="absolute inset-0 rounded-full border border-gold"
          initial={{ scale: 0.8, opacity: 0.9 }}
          animate={{ scale: [0.8, 1.9, 2.5], opacity: [0.9, 0.35, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}

      {/* Outer Ambient Glow */}
      <motion.div
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1.4 : 0.8,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-full bg-gold/25 blur-xs pointer-events-none"
      />

      {/* Center Solid Node */}
      <motion.div
        animate={{
          scale: isInView ? 1.2 : 0.85,
          backgroundColor: isInView ? "#c9a24b" : "rgba(201, 162, 75, 0.35)",
          boxShadow: isInView
            ? "0 0 14px rgba(201, 162, 75, 0.9), 0 0 2px rgba(201, 162, 75, 1)"
            : "0 0 0px rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-3.5 h-3.5 rounded-full border-2 border-paper relative z-10"
      />
    </div>
  );
}

export default function Timeline({ items }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress along the timeline container with a wider, relaxed scroll range
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 35%", "end 85%"],
  });

  // Balanced, critically-damped spring physics for ultra-smooth, silky liquid flow
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 24,
    mass: 0.5,
    restDelta: 0.0001,
  });

  // Position of the advancing comet head at the leading edge of the line
  const headTop = useTransform(
    scaleY,
    (v) => `${Math.max(0, Math.min(1, v)) * 100}%`
  );

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto py-12">
      {/* Background Track (Muted dormant line) */}
      <div className="absolute top-4 bottom-12 left-6 md:left-1/2 w-0.5 bg-gold/20 -translate-x-1/2" />

      {/* Liquid Gold Line (Scroll-driven draw with GPU transform) */}
      <motion.div
        style={{
          scaleY: shouldReduceMotion ? 1 : scaleY,
          originY: 0,
          willChange: "transform",
        }}
        className="absolute top-4 bottom-12 left-6 md:left-1/2 w-0.5 bg-gradient-to-b from-gold via-gold-light to-gold -translate-x-1/2 shadow-[0_0_10px_rgba(201,162,75,0.7)] z-10"
      />

      {/* Leading Golden Comet Head */}
      {!shouldReduceMotion && (
        <div className="absolute top-4 bottom-12 left-6 md:left-1/2 -translate-x-1/2 w-0.5 pointer-events-none z-20">
          <motion.div
            style={{
              top: headTop,
              willChange: "top, transform",
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-gold shadow-[0_0_14px_#c9a24b,0_0_24px_rgba(201,162,75,0.7)] flex items-center justify-center"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
          </motion.div>
        </div>
      )}

      {/* ── Timeline Items ── */}
      <div className="space-y-24 md:space-y-32">
        {items.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <Reveal key={idx} delay={0.1}>
              <div className="relative flex flex-col md:flex-row items-start">
                {/* Interactive Animated Milestone Node */}
                <TimelineNode year={item.year} />

                {/* Left side content (only visible on desktop for even items) */}
                <div
                  className={`hidden md:block w-1/2 pr-16 lg:pr-24 text-right ${
                    !isEven ? "md:invisible" : ""
                  }`}
                >
                  {isEven && (
                    <>
                      <div className="font-serif text-5xl md:text-6xl lg:text-7xl text-gold mb-6 leading-none">
                        {item.year}
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl text-royal-950 mb-4">
                        {item.title}
                      </h3>
                      <p className="text-ink/80 text-lg">{item.description}</p>
                      {item.image && (
                        <div className="mt-8">
                          <ImagePlaceholder
                            aspectRatio="16/9"
                            description={`PLACEHOLDER: ${item.image}`}
                            className="border border-gold/10"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Mobile content wrapper (left aligned) / Right side content for odd items on desktop */}
                <div
                  className={`w-full md:w-1/2 pl-16 md:pl-16 lg:pl-24 ${
                    isEven ? "md:hidden" : ""
                  }`}
                >
                  <div className="font-serif text-5xl md:text-6xl lg:text-7xl text-gold mb-6 leading-none">
                    {item.year}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-royal-950 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-ink/80 text-lg">{item.description}</p>
                  {item.image && (
                    <div className="mt-8">
                      <ImagePlaceholder
                        aspectRatio="16/9"
                        description={`PLACEHOLDER: ${item.image}`}
                        className="border border-gold/10"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}