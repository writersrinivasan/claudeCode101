import { CopyButton } from "./CopyButton";

const SHELL = new Set(["bash", "sh", "shell", "powershell"]);

// Light-touch shell highlighting: dim comments, accent the leading command word.
function renderLine(line: string, lang: string) {
  if (!SHELL.has(lang)) return line;
  if (line.trimStart().startsWith("#")) return <span className="c-comment">{line}</span>;
  const hashAt = line.indexOf(" # ");
  const body = hashAt > -1 ? line.slice(0, hashAt) : line;
  const comment = hashAt > -1 ? line.slice(hashAt) : "";
  const m = body.match(/^(\s*)([a-z/.!][\w./-]*)(.*)$/i);
  if (!m) return line;
  return (
    <>
      {m[1]}
      <span className="c-cmd">{m[2]}</span>
      {m[3]}
      {comment && <span className="c-comment">{comment}</span>}
    </>
  );
}

export function CodeBlock({ code, lang = "text", title }: { code: string; lang?: string; title?: string }) {
  const lines = code.split("\n");
  return (
    <div className="code-block">
      <div className="code-head">
        <span>
          {title ? title : <span className="lang">{lang}</span>}
        </span>
        <CopyButton text={code} />
      </div>
      <pre>
        <code>
          {lines.map((l, i) => (
            <span key={i}>
              {renderLine(l, lang)}
              {i < lines.length - 1 ? "\n" : ""}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
