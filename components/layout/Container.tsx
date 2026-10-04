import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Constrains content to a max-width of 1200 px with responsive horizontal
 * padding. Used inside every Section.
 */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
