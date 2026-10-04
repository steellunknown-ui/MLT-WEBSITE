import { type ReactNode } from "react";
import Container from "./Container";

type Tone = "dark" | "light";
type Spacing = "sm" | "md" | "lg" | "xl";

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  spacing?: Spacing;
  /** Omit the inner Container — useful when a section needs full-bleed children */
  noContainer?: boolean;
  className?: string;
  id?: string;
}

const spacingMap: Record<Spacing, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

const toneMap: Record<Tone, string> = {
  dark: "bg-royal-950 text-white",
  light: "bg-paper text-ink",
};

/**
 * Full-width semantic section. Alternates dark / light backgrounds.
 * Wraps content in <Container> by default.
 */
export default function Section({
  children,
  tone = "dark",
  spacing = "lg",
  noContainer = false,
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${toneMap[tone]} ${spacingMap[spacing]} ${className}`}
    >
      {noContainer ? children : <Container>{children}</Container>}
    </section>
  );
}
