"use client";

import { useState } from "react";

export default function CopyLinkButton({ url }: { url: string }) {
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
      className="text-royal-900 hover:text-royal-900 transition-colors uppercase tracking-widest font-medium text-sm"
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
