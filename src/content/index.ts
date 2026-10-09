import { modulesPart1 } from "./modules-1";
import { modulesPart2 } from "./modules-2";
import { modulesPart3 } from "./modules-3";
import type { Block, Module } from "./types";

export const modules: Module[] = [...modulesPart1, ...modulesPart2, ...modulesPart3];

export function getModule(slug: string) {
  return modules.find((m) => m.slug === slug);
}

export function getAdjacent(slug: string) {
  const i = modules.findIndex((m) => m.slug === slug);
  return { prev: modules[i - 1], next: modules[i + 1] };
}

// Flatten text out of blocks for the client-side search index.
function blockText(b: Block): string {
  switch (b.type) {
    case "p":
    case "h3":
      return b.text;
    case "list":
      return b.items.join(" ");
    case "code":
      return `${b.title ?? ""} ${b.code}`;
    case "callout":
      return `${b.title ?? ""} ${b.text}`;
    case "prompt":
      return `${b.label ?? ""} ${b.text} ${b.why ?? ""}`;
    case "flow":
      return b.steps.join(" ");
    case "compare":
      return [...b.left.items, ...b.right.items].join(" ");
    case "table":
      return b.rows.flat().join(" ");
    case "steps":
      return b.items.map((s) => `${s.title} ${s.body} ${s.prompt ?? ""} ${s.code ?? ""}`).join(" ");
    case "cards":
      return b.items.map((c) => `${c.title} ${c.body}`).join(" ");
  }
}

export type SearchEntry = { title: string; context: string; href: string; text: string };

export function buildSearchIndex(): SearchEntry[] {
  return modules.flatMap((m) =>
    m.sections.map((s) => ({
      title: s.title,
      context: `Module ${m.number} · ${m.title}`,
      href: `/modules/${m.slug}#${s.id}`,
      text: s.blocks.map(blockText).join(" ").replace(/[`*]/g, ""),
    })),
  );
}
