interface SectionHeadingProps {
  /** Small uppercase label above the main heading */
  label?: string;
  /** Large serif heading */
  heading: string;
  /** Optional subheading / lead paragraph beneath */
  subheading?: string;
  /** Controls text colours for dark vs light sections */
  tone?: "dark" | "light";
  /** HTML tag for the heading. Defaults to h2. */
  as?: "h1" | "h2" | "h3";
  className?: string;
}

/**
 * Uppercase tracked label + large serif heading, always left-aligned.
 * No pill, no decoration — editorial style.
 */
export default function SectionHeading({
  label,
  heading,
  subheading,
  tone = "dark",
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  const labelColor = tone === "dark" ? "text-gold" : "text-gold";
  const headingColor = tone === "dark" ? "text-white" : "text-ink";
  const subColor = tone === "dark" ? "text-white/60" : "text-ink/60";

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {label && (
        <p
          className={`font-sans text-xs font-semibold uppercase tracking-widest ${labelColor}`}
          aria-label={label}
        >
          {label}
        </p>
      )}
      <Tag
        className={`font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl ${headingColor}`}
      >
        {heading}
      </Tag>
      {subheading && (
        <p
          className={`mt-2 max-w-2xl font-sans text-base leading-relaxed sm:text-lg ${subColor}`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
