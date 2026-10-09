import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { DoneTick, ProgressSummary } from "@/components/ProgressSummary";
import { modules } from "@/content";

const MODE_COLOR: Record<string, string> = {
  "Concept + Demo": "var(--note)",
  "Live Demo": "var(--tip)",
  "Live Coding": "var(--tip)",
  "Major Demo": "var(--accent)",
  Demo: "var(--pro)",
  "WOW Demo": "var(--accent)",
  Discussion: "var(--text-faint)",
};

export default function Home() {
  const session = modules.filter((m) => m.minutes > 0);
  const slugs = modules.map((m) => m.slug);

  return (
    <main>
      <section className="container hero">
        <div className="hero-meta">
          <span className="badge accent">60-minute hands-on session</span>
          <span className="badge">20% concepts · 70% live coding · 10% Q&amp;A</span>
          <span className="badge">For developers, tech leads &amp; teams</span>
        </div>
        <h1>
          Claude Code: from <em>natural language</em> to production-ready software
        </h1>
        <p className="page-lead">
          Your 101 portal for working with Claude Code as an <strong>AI coding agent</strong>, not just a
          code-completion tool. Every topic from the session has the concepts, copy-paste prompts, real commands,
          hands-on labs on a practice repo, and a quick knowledge check. Bookmark it and come back whenever you need it.
        </p>
        <div className="hero-actions">
          <Link href="/modules/why-claude-code" className="btn primary">
            Start module 0 →
          </Link>
          <Link href="/labs" className="btn">
            🧪 Jump to labs
          </Link>
          <Link href="/cheatsheet" className="btn">
            📋 Cheat sheet
          </Link>
        </div>

        <div className="terminal" aria-label="Example Claude Code session">
          <div className="terminal-bar" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <pre>
            <span className="t-dim">~/code/taskflow-api $ </span>claude{"\n"}
            <span className="t-user">&gt; Run the tests, find the root cause of the failures, fix them, and show me what changed.</span>
            {"\n\n"}
            <span className="t-tool">● Bash</span>(npm test){"\n"}
            <span className="t-dim">  ⎿ </span>
            <span className="t-bad">✖ 2 failing</span>
            <span className="t-dim"> — page 1 returns the first tasks · overdue filter</span>
            {"\n"}
            <span className="t-tool">● Read</span>(src/services/taskService.js){"\n"}
            <span className="t-dim">  ⎿ Found it: start = page * limit skips the first page; overdue compares dueDate &gt; now.</span>
            {"\n"}
            <span className="t-tool">● Edit</span>(src/services/taskService.js){"\n"}
            <span className="t-dim">  ⎿ </span>start = (page - 1) * limit · dueDate &lt; now{"\n"}
            <span className="t-tool">● Bash</span>(npm test){"\n"}
            <span className="t-dim">  ⎿ </span>
            <span className="t-ok">✔ 8 passing, 0 failing</span>
            {"\n\n"}
            Both failures were real bugs in taskService.js, not test problems. Fixed with two one-line changes;
            {"\n"}no test files modified. Want me to commit this as <span className="t-user">fix(tasks): …</span>?
          </pre>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>⚡ Quick start in 60 seconds</h2>
          <p>Install, open a repo, ask a question. Everything else in this portal builds on these three steps.</p>
        </div>
        <div className="quick-grid">
          <div>
            <CodeBlock lang="bash" title="1 · Install" code="curl -fsSL https://claude.ai/install.sh | bash" />
          </div>
          <div>
            <CodeBlock lang="bash" title="2 · Open your project" code={"cd your-project\nclaude"} />
          </div>
          <div>
            <CodeBlock lang="text" title="3 · Ask" code={"> Explain this codebase: main components,\n  entry points, dependencies, data flow."} />
          </div>
        </div>
      </section>

      <section className="container section" id="agenda">
        <div className="section-head">
          <h2>🗓 The 60-minute flow</h2>
          <p>The session agenda. Each row links to its full module with deeper material than we can cover live.</p>
        </div>
        <div className="timeline">
          <div className="timeline-bar" aria-hidden>
            {session.map((m) => (
              <Link
                key={m.slug}
                href={`/modules/${m.slug}`}
                title={`${m.time} · ${m.title}`}
                style={{ flex: m.minutes, background: MODE_COLOR[m.mode] ?? "var(--accent)" }}
              />
            ))}
          </div>
          <div className="timeline-rows">
            {session.map((m) => (
              <Link key={m.slug} href={`/modules/${m.slug}`}>
                <span className="t">{m.time}</span>
                <span>
                  <span className="dot" style={{ background: MODE_COLOR[m.mode] ?? "var(--accent)" }} aria-hidden />
                  {m.title}
                </span>
                <span className="badge">{m.mode}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container section" id="modules">
        <div className="section-head" style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "end" }}>
          <div>
            <h2>📚 All modules</h2>
            <p>Work through them in order, or jump to what you need. Mark modules complete to track progress.</p>
          </div>
          <div style={{ minWidth: 280 }}>
            <ProgressSummary slugs={slugs} />
          </div>
        </div>
        <div className="module-grid">
          {modules.map((m) => (
            <Link key={m.slug} href={`/modules/${m.slug}`} className="module-card">
              <div className="top">
                <span className="icon" aria-hidden>
                  {m.icon}
                </span>
                <DoneTick slug={m.slug} />
              </div>
              <h3>
                {m.number === 10 ? "Bonus" : m.number}. {m.title}
              </h3>
              <p>{m.tagline}</p>
              <div className="meta">
                <span className="badge">⏱ {m.time}</span>
                <span className="badge">{m.mode}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>🛠 Practise &amp; reference</h2>
          <p>The parts you’ll come back to after the session.</p>
        </div>
        <div className="feature-grid">
          <Link href="/labs" className="feature">
            <div className="icon">🧪</div>
            <h3>Hands-on labs</h3>
            <p>Seven guided labs on TaskFlow, a downloadable practice API with planted bugs and security flaws.</p>
          </Link>
          <Link href="/prompts" className="feature">
            <div className="icon">💬</div>
            <h3>Prompt library</h3>
            <p>40 battle-tested prompts for understanding, planning, implementing, debugging, reviewing and git.</p>
          </Link>
          <Link href="/cheatsheet" className="feature">
            <div className="icon">📋</div>
            <h3>Cheat sheet</h3>
            <p>CLI flags, slash commands, keyboard shortcuts, MCP commands and config file locations.</p>
          </Link>
          <Link href="/reference" className="feature">
            <div className="icon">📖</div>
            <h3>Glossary, FAQ &amp; resources</h3>
            <p>Plain-English definitions, answers to common questions and links to official docs.</p>
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>🎯 5 things to remember</h2>
        </div>
        <div className="cards">
          {[
            ["More than code completion", "An agent that reads, plans, edits, runs and verifies."],
            ["Give it repository context", "Let it explore. Maintain a sharp CLAUDE.md."],
            ["Use it for multi-step tasks", "Hand it goals: features, bug hunts, refactors."],
            ["Tests & review remain critical", "Give it a way to check itself. Read every diff."],
            ["Developer + AI agent", "Not developer vs AI. You own direction and quality."],
          ].map(([t, b], i) => (
            <div className="card" key={t}>
              <div className="icon" aria-hidden>
                {["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"][i]}
              </div>
              <h4>{t}</h4>
              <p>{b}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
