"use client";

import { resetProgress, useCompleted } from "./progress";

export function ProgressSummary({ slugs }: { slugs: string[] }) {
  const completed = useCompleted();
  const done = slugs.filter((s) => completed.has(s)).length;
  const pct = Math.round((done / slugs.length) * 100);
  return (
    <div className="progress">
      <span>
        <strong>{done}</strong> / {slugs.length} modules
      </span>
      <div className="progress-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      {done > 0 && (
        <button type="button" className="chip" onClick={resetProgress}>
          Reset
        </button>
      )}
    </div>
  );
}

export function DoneTick({ slug }: { slug: string }) {
  const done = useCompleted().has(slug);
  return done ? <span className="done-tick">✓ Done</span> : null;
}
