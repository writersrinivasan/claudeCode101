import { CopyButton } from "./CopyButton";
import { Inline } from "./Inline";

export function PromptCard({ text, label, why }: { text: string; label?: string; why?: string }) {
  return (
    <div className="prompt-card">
      <div className="prompt-head">
        <span className="who">{label ?? "Prompt"}</span>
        <CopyButton text={text} light />
      </div>
      <div className="prompt-body">{text}</div>
      {why && (
        <div className="prompt-why">
          {why.startsWith("Use when:") ? null : <strong>Why it works: </strong>}
          <Inline text={why} />
        </div>
      )}
    </div>
  );
}
