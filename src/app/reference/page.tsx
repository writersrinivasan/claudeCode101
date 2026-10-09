import type { Metadata } from "next";
import { DocShell } from "@/components/DocShell";
import { faq, glossary, resources } from "@/content/reference";

export const metadata: Metadata = {
  title: "Glossary & FAQ",
  description: "Claude Code terminology, frequently asked questions and official resources.",
};

export default function ReferencePage() {
  return (
    <DocShell
      toc={[
        { id: "faq", title: "FAQ" },
        { id: "glossary", title: "Glossary" },
        { id: "resources", title: "Resources" },
      ]}
    >
      <div className="eyebrow">
        <span className="badge accent">Reference</span>
      </div>
      <h1 className="page-title">📖 Glossary, FAQ &amp; resources</h1>
      <p className="page-lead">Plain-English answers to the questions developers ask most, and where to go next.</p>

      <h2 id="faq">Frequently asked questions</h2>
      <div className="faq">
        {faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>

      <h2 id="glossary">Glossary</h2>
      <dl className="glossary">
        {glossary.map((g) => (
          <div key={g.term}>
            <dt>{g.term}</dt>
            <dd>{g.def}</dd>
          </div>
        ))}
      </dl>

      <h2 id="resources">Official resources</h2>
      <div className="cards">
        {resources.map((r) => (
          <a key={r.url} href={r.url} target="_blank" rel="noreferrer" className="card" style={{ color: "var(--text)" }}>
            <h4>{r.title} ↗</h4>
            <p>{r.desc}</p>
          </a>
        ))}
      </div>
    </DocShell>
  );
}
