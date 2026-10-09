import type { Metadata } from "next";
import { Suspense } from "react";
import { DocShell } from "@/components/DocShell";
import { PromptLibrary } from "@/components/PromptLibrary";
import { promptCategories, prompts } from "@/content/prompts";

export const metadata: Metadata = {
  title: "Prompt library",
  description: "Copy-paste Claude Code prompts for every stage of development.",
};

export default function PromptsPage() {
  return (
    <DocShell>
      <div className="eyebrow">
        <span className="badge accent">Reference</span>
        <span className="badge">{prompts.length} prompts</span>
      </div>
      <h1 className="page-title">💬 Prompt library</h1>
      <p className="page-lead">
        Prompts that work, grouped by stage of the development loop. Each one is specific, points at context, and
        defines what “done” means. Copy one, fill in the placeholders, and adapt it to your codebase.
      </p>
      <Suspense fallback={<p>Loading prompts…</p>}>
        <PromptLibrary prompts={prompts} categories={promptCategories} />
      </Suspense>
    </DocShell>
  );
}
