"use client";

import { useState } from "react";

export function CopyButton({ text, light = false, label = "Copy" }: { text: string; light?: boolean; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (insecure context); fail quietly.
    }
  }

  return (
    <button type="button" className={`copy-btn${light ? " light" : ""}`} onClick={copy} aria-live="polite">
      {copied ? "Copied ✓" : label}
    </button>
  );
}
