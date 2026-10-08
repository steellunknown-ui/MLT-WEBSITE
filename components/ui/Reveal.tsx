"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

  const yOffset = shouldReduceMotion ? 0 : distance;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        willChange: "opacity, transform",
      }}
    >
      {children}
    </motion.div>
  );
}
