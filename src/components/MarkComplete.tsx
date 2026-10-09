"use client";

import { setCompleted, useCompleted } from "./progress";

export function MarkComplete({ slug }: { slug: string }) {
  const done = useCompleted().has(slug);
  return (
    <button type="button" className={`btn${done ? " done" : " primary"}`} onClick={() => setCompleted(slug, !done)}>
      {done ? "✓ Completed — click to undo" : "Mark module as complete"}
    </button>
  );
}
