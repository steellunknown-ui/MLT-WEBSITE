"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** Distance to translate from, in pixels */
  distance?: number;
  className?: string;
}

/**
 * Wraps children in a subtle fade-up animation triggered when the element
 * enters the viewport. Respects prefers-reduced-motion by disabling animation.
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 24,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      // Framer Motion respects prefers-reduced-motion via its global setting,
      // but we also set style directly for environments without JS animation.
      style={{
        willChange: "opacity, transform",
      }}
    >
      {children}
    </motion.div>
  );
}
