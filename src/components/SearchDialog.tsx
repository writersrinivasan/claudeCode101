"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { SearchEntry } from "@/content";

function snippet(text: string, q: string) {
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text.slice(0, 110);
  const start = Math.max(0, i - 40);
  return (start > 0 ? "…" : "") + text.slice(start, i + 80);
}

export function SearchDialog({ index }: { index: SearchEntry[] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = useMemo(() => {
    const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    return index
      .map((e) => {
        const hay = `${e.title} ${e.text}`.toLowerCase();
        if (!terms.every((t) => hay.includes(t))) return null;
        const score = terms.reduce((s, t) => s + (e.title.toLowerCase().includes(t) ? 10 : 1), 0);
        return { e, score };
      })
      .filter((r): r is { e: SearchEntry; score: number } => !!r)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((r) => r.e);
  }, [q, index]);

  function close() {
    setOpen(false);
    setQ("");
    setSel(0);
  }

  return (
    <>
      <button type="button" className="icon-btn search-trigger" onClick={() => setOpen(true)} aria-label="Search">
        <span aria-hidden>🔍</span>
        <span className="label">Search the portal…</span>
        <kbd>⌘K</kbd>
      </button>
      {open && (
        <div className="search-overlay" onClick={close} role="dialog" aria-modal="true" aria-label="Search">
          <div className="search-panel" onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              value={q}
              placeholder="Search topics, commands, prompts… (e.g. “plan mode”, “hooks”)"
              onChange={(e) => {
                setQ(e.target.value);
                setSel(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSel((s) => Math.min(s + 1, results.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSel((s) => Math.max(s - 1, 0));
                } else if (e.key === "Enter" && results[sel]) {
                  router.push(results[sel].href);
                  close();
                }
              }}
            />
            <div className="search-results">
              {q && results.length === 0 && <div className="search-empty">No matches for “{q}”.</div>}
              {!q && <div className="search-empty">Type to search across all modules.</div>}
              {results.map((r, i) => (
                <Link key={r.href} href={r.href} className={i === sel ? "sel" : undefined} onClick={close}>
                  <small>{r.context}</small>
                  {r.title}
                  <span className="snippet">{snippet(r.text, q.trim().split(/\s+/)[0] ?? "")}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
