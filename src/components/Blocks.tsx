import type { Block, CalloutVariant } from "@/content/types";
import { CodeBlock } from "./CodeBlock";
import { Inline } from "./Inline";
import { PromptCard } from "./PromptCard";

const CALLOUT_ICON: Record<CalloutVariant, string> = {
  tip: "💡",
  note: "ℹ️",
  warning: "⚠️",
  pro: "🎓",
};
const CALLOUT_LABEL: Record<CalloutVariant, string> = {
  tip: "Tip",
  note: "Note",
  warning: "Warning",
  pro: "Pro tip",
};

export function StepList({ items }: { items: { title: string; body: string; code?: string; prompt?: string }[] }) {
  return (
    <ol className="steps">
      {items.map((s, i) => (
        <li key={i}>
          <h4>{s.title}</h4>
          <p>
            <Inline text={s.body} />
          </p>
          {s.code && <CodeBlock code={s.code} lang="bash" />}
          {s.prompt && <PromptCard text={s.prompt} />}
        </li>
      ))}
    </ol>
  );
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <Inline text={block.text} />
        </p>
      );
    case "h3":
      return <h3>{block.text}</h3>;
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag>
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </Tag>
      );
    }
    case "code":
      return <CodeBlock code={block.code} lang={block.lang} title={block.title} />;
    case "callout":
      return (
        <div className={`callout ${block.variant}`} role="note">
          <div className="callout-title">
            <span aria-hidden>{CALLOUT_ICON[block.variant]}</span>
            {block.title ?? CALLOUT_LABEL[block.variant]}
          </div>
          <p>
            <Inline text={block.text} />
          </p>
        </div>
      );
    case "prompt":
      return <PromptCard text={block.text} label={block.label} why={block.why} />;
    case "flow":
      return (
        <div className={`flow${block.vertical ? " vertical" : ""}`}>
          {block.title && <div className="flow-title">{block.title}</div>}
          <div className="flow-row">
            {block.steps.map((s, i) => (
              <span key={i} style={{ display: "contents" }}>
                {i > 0 && <span className="flow-arrow" aria-hidden>{block.vertical ? "↓" : "→"}</span>}
                <span className="flow-step">{s}</span>
              </span>
            ))}
          </div>
        </div>
      );
    case "compare":
      return (
        <div className="compare">
          <div className={`compare-col ${block.left.tone ?? "neutral"}`}>
            <h4>
              {block.left.tone === "bad" && <span aria-hidden>✗</span>}
              {block.left.title}
            </h4>
            <ul>
              {block.left.items.map((it, i) => (
                <li key={i}>
                  <Inline text={it} />
                </li>
              ))}
            </ul>
          </div>
          <div className={`compare-col ${block.right.tone ?? "neutral"}`}>
            <h4>
              {block.right.tone === "good" && <span aria-hidden>✓</span>}
              {block.right.title}
            </h4>
            <ul>
              {block.right.items.map((it, i) => (
                <li key={i}>
                  <Inline text={it} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "table":
      return (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "steps":
      return <StepList items={block.items} />;
    case "cards":
      return (
        <div className="cards">
          {block.items.map((c, i) => (
            <div className="card" key={i}>
              {c.icon && <div className="icon" aria-hidden>{c.icon}</div>}
              <h4>{c.title}</h4>
              <p>
                <Inline text={c.body} />
              </p>
            </div>
          ))}
        </div>
      );
  }
}
