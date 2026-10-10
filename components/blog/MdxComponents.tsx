import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

/**
 * MDX component overrides for the editorial blog layout.
 *
 * Design tokens applied here:
 *   --font-cormorant   serif typeface (headings)
 *   --font-inter       sans-serif typeface (body)
 *   max prose width    65ch
 *   blockquote accent  gold hairline (#B8960C)
 */

type AnchorProps = ComponentPropsWithoutRef<"a">;
type ImgProps = ComponentPropsWithoutRef<"img">;

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      style={{
        fontFamily: "var(--font-cormorant, Georgia, serif)",
        fontSize: "1.75rem",
        fontWeight: 600,
        lineHeight: 1.25,
        marginTop: "2.5rem",
        marginBottom: "0.75rem",
        letterSpacing: "-0.01em",
      }}
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3
      style={{
        fontFamily: "var(--font-cormorant, Georgia, serif)",
        fontSize: "1.375rem",
        fontWeight: 600,
        lineHeight: 1.3,
        marginTop: "2rem",
        marginBottom: "0.5rem",
        letterSpacing: "-0.01em",
      }}
      {...props}
    >
      {children}
    </h3>
  ),

  p: ({ children, ...props }) => (
    <p
      style={{
        maxWidth: "65ch",
        lineHeight: 1.75,
        marginTop: "1.25rem",
        marginBottom: "1.25rem",
      }}
      {...props}
    >
      {children}
    </p>
  ),

  blockquote: ({ children, ...props }) => (
    <blockquote
      style={{
        borderLeft: "2px solid #B8960C",
        paddingLeft: "1.25rem",
        marginLeft: 0,
        marginRight: 0,
        marginTop: "1.75rem",
        marginBottom: "1.75rem",
        fontFamily: "var(--font-cormorant, Georgia, serif)",
        fontSize: "1.125rem",
        fontStyle: "italic",
        color: "inherit",
        opacity: 1,
      }}
      {...props}
    >
      {children}
    </blockquote>
  ),

  ul: ({ children, ...props }) => (
    <ul
      style={{
        maxWidth: "65ch",
        paddingLeft: "1.5rem",
        marginTop: "1.25rem",
        marginBottom: "1.25rem",
        listStyleType: "disc",
        lineHeight: 1.75,
      }}
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol
      style={{
        maxWidth: "65ch",
        paddingLeft: "1.5rem",
        marginTop: "1.25rem",
        marginBottom: "1.25rem",
        listStyleType: "decimal",
        lineHeight: 1.75,
      }}
      {...props}
    >
      {children}
    </ol>
  ),

  a: ({ href, children, ...props }: AnchorProps) => {
    const isExternal =
      typeof href === "string" &&
      (href.startsWith("http://") || href.startsWith("https://"));
    return (
      <a
        href={href}
        style={{
          color: "#0f2841",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...props}
      >
        {children}
      </a>
    );
  },

  img: ({ src, alt, ...props }: ImgProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      style={{
        maxWidth: "100%",
        height: "auto",
        borderRadius: "4px",
        marginTop: "1.75rem",
        marginBottom: "1.75rem",
      }}
      {...props}
    />
  ),

  hr: (props) => (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid currentColor",
        opacity: 0.15,
        marginTop: "2.5rem",
        marginBottom: "2.5rem",
      }}
      {...props}
    />
  ),
};
