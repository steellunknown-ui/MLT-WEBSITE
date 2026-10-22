"use client";

import { useState } from "react";

export default function CopyLinkButton({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch (err) {
      console.error("Failed to copy", err);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={
        className ??
        "text-white hover:text-white transition-colors uppercase tracking-widest font-medium text-xs cursor-pointer"
      }
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
