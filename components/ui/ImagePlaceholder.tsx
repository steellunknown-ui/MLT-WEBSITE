interface ImagePlaceholderProps {
  /** e.g. "16/9", "4/3", "1/1", "3/4" */
  aspectRatio?: string;
  /** Human-readable description of what the image will be */
  description: string;
  className?: string;
}

/**
 * Neutral placeholder box used in place of real photography until assets are
 * supplied. Displays a visible "PLACEHOLDER: [description]" label.
 * Has an explicit role and aria-label so it is announced to screen readers.
 */
export default function ImagePlaceholder({
  aspectRatio = "16/9",
  description,
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${description}`}
      className={`relative overflow-hidden bg-royal-900/60 ${className}`}
      style={{ aspectRatio }}
    >
      {/* Cross-hair pattern */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(201,162,75,0.15)" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(201,162,75,0.15)" strokeWidth="1" />
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="rgba(201,162,75,0.2)"
          strokeWidth="1"
        />
      </svg>

      {/* Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold/60">
          Placeholder
        </span>
        <span className="font-sans text-sm text-white/50">{description}</span>
      </div>
    </div>
  );
}
