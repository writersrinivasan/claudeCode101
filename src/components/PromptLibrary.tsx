"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { PromptEntry } from "@/content/types";
import { PromptCard } from "./PromptCard";

export function PromptLibrary({ prompts, categories }: { prompts: PromptEntry[]; categories: readonly string[] }) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cat, setCat] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return prompts.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!needle || `${p.title} ${p.prompt} ${p.when} ${p.category}`.toLowerCase().includes(needle)),
    );
  }, [prompts, q, cat]);

  return (
    <>
      <div className="filter-bar">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter prompts… (e.g. test, review, refactor)"
          aria-label="Filter prompts"
        />
      </div>
      <div className="filter-bar" role="group" aria-label="Categories">
        <button type="button" className="chip" aria-pressed={cat === null} onClick={() => setCat(null)}>
          All ({prompts.length})
        </button>
        {categories.map((c) => (
          <button type="button" key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(cat === c ? null : c)}>
            {c}
          </button>
        ))}
      </div>
      <p style={{ color: "var(--text-faint)", fontSize: 14 }}>
        Showing {filtered.length} prompt{filtered.length === 1 ? "" : "s"}. Replace <code>&lt;placeholders&gt;</code> with your specifics.
      </p>
      <div className="prompt-grid">
        {filtered.map((p) => (
          <PromptCard key={p.title} label={`${p.category} · ${p.title}`} text={p.prompt} why={`Use when: ${p.when}`} />
        ))}
      </div>
    </>
  );
}
