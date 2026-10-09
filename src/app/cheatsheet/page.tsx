import type { Metadata } from "next";
import { CopyButton } from "@/components/CopyButton";
import { DocShell } from "@/components/DocShell";
import { cheatsheet } from "@/content/reference";

export const metadata: Metadata = {
  title: "Cheat sheet",
  description: "Claude Code commands, flags, shortcuts, slash commands and config files on one page.",
};

export default function CheatsheetPage() {
  return (
    <DocShell>
      <div className="eyebrow">
        <span className="badge accent">Reference</span>
        <span className="badge">Print-friendly</span>
      </div>
      <h1 className="page-title">📋 Cheat sheet</h1>
      <p className="page-lead">
        Everything you’ll type, on one page. Claude Code updates often, so run <code>/help</code> and{" "}
        <code>claude --help</code> for the exact list in your version.
      </p>
      <div className="cheat-grid">
        {cheatsheet.map((g) => (
          <section key={g.title} className="cheat-group">
            <h2>{g.title}</h2>
            {g.rows.map(([cmd, desc]) => (
              <div className="cheat-row" key={cmd}>
                <code>{cmd}</code>
                <span style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                  {desc}
                  {/^(claude|curl|brew|npm|irm|cat)\b/.test(cmd) && <CopyButton text={cmd} light label="⧉" />}
                </span>
              </div>
            ))}
          </section>
        ))}
      </div>
    </DocShell>
  );
}
