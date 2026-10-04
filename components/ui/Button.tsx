import { type ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  as?: "button";
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

interface ButtonAsLink extends ButtonBaseProps {
  as: "link";
  href: string;
  external?: boolean;
  type?: never;
  onClick?: never;
  disabled?: never;
  children: ReactNode;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeMap: Record<Size, string> = {
  sm: "px-5 py-2 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

/**
 * Primary: gold border + gold text on dark backgrounds.
 * Secondary: text-only link with a trailing → arrow.
 */
export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "" } = props;

  const baseStyles = "inline-flex items-center gap-2 font-sans font-medium tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2";

  const variantStyles =
    variant === "primary"
      ? "border border-gold text-gold hover:bg-gold hover:text-ink"
      : "text-white/70 hover:text-white";

  const combined = `${baseStyles} ${variantStyles} ${sizeMap[size]} ${className}`;

  if (props.as === "link") {
    const { href, external, children } = props;
    return (
      <Link
        href={href}
        className={combined}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
        {variant === "secondary" && (
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        )}
      </Link>
    );
  }

  const { type = "button", onClick, disabled, children } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${combined} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
      {variant === "secondary" && (
        <span aria-hidden="true">→</span>
      )}
    </button>
  );
}
