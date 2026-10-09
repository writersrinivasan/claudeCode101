import type { Metadata } from "next";
import { StepList } from "@/components/Blocks";
import { CodeBlock } from "@/components/CodeBlock";
import { DocShell } from "@/components/DocShell";
import { Inline } from "@/components/Inline";
import { getModule } from "@/content";
import { labs } from "@/content/labs";

export const metadata: Metadata = {
  title: "Hands-on labs",
  description: "Guided Claude Code exercises on the TaskFlow practice repository.",
};

export default function LabsPage() {
  return (
    <DocShell toc={[{ id: "practice-repo", title: "The practice repo" }, ...labs.map((l) => ({ id: l.slug, title: l.title }))]}>
      <div className="eyebrow">
        <span className="badge accent">Practice</span>
        <span className="badge">{labs.length} labs · ~1h 35m total</span>
      </div>
      <h1 className="page-title">🧪 Hands-on labs</h1>
      <p className="page-lead">
        Reading about agents is not the same as driving one. These labs follow the session’s modules and use a small,
        realistic practice repo with <strong>deliberate bugs and security flaws</strong> for you to find with Claude Code.
      </p>

      <h2 id="practice-repo">The practice repo: TaskFlow API</h2>
      <div className="download-box">
        <div>
          <strong>taskflow-api.zip</strong>
          <p>Zero-dependency Node.js 20+ REST API · auth, tasks, pagination · 8 tests (2 fail on purpose)</p>
        </div>
        <a className="btn primary" href="/downloads/taskflow-api.zip" download>
          ⬇ Download practice repo
        </a>
      </div>
      <CodeBlock
        lang="text"
        title="What's inside"
        code={`taskflow-api/
├── src/
│   ├── server.js          entry point (seeds data, starts HTTP)
│   ├── app.js             JSON parsing, routing, error mapping
│   ├── router.js          tiny method + path router
│   ├── db.js              in-memory store + seed data
│   ├── routes/            thin HTTP layer (auth, tasks)
│   ├── services/          business logic  ← bugs live here
│   └── utils/             crypto + validation helpers
├── test/                  node:test suites
└── test-utils/server.js   boots app on a random port for tests`}
      />
      <div className="callout tip" role="note">
        <div className="callout-title">💡 How to get the most out of the labs</div>
        <p>
          Commit after every lab so you can diff and reset. Before you read Claude’s answer, guess what it will find.
          When something goes wrong, press <code>Esc</code> and redirect it. Course-correcting is part of the skill.
        </p>
      </div>

      {labs.map((lab) => {
        const mod = getModule(lab.module);
        return (
          <section key={lab.slug} className="lab-card" aria-labelledby={lab.slug}>
            <h2 id={lab.slug}>{lab.title}</h2>
            <div className="lab-meta">
              <span className="badge">⏱ {lab.duration}</span>
              <span className="badge">{lab.level}</span>
              {mod && (
                <a className="badge accent" href={`/modules/${mod.slug}`}>
                  Module {mod.number === 10 ? "Bonus" : mod.number}: {mod.title}
                </a>
              )}
            </div>
            <p>{lab.summary}</p>
            <div className="lab-goal">
              <strong>🎯 Goal: </strong>
              {lab.goal}
            </div>
            <StepList items={lab.steps} />
            <h3>✅ You’re done when</h3>
            <ul className="checklist">
              {lab.success.map((s) => (
                <li key={s}>
                  <span>
                    <Inline text={s} />
                  </span>
                </li>
              ))}
            </ul>
            {lab.stretch && (
              <>
                <h3>🚀 Stretch goals</h3>
                <ul>
                  {lab.stretch.map((s) => (
                    <li key={s}>
                      <Inline text={s} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        );
      })}
    </DocShell>
  );
}
