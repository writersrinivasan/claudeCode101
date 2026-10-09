import { Fragment, type ReactNode } from "react";

// Minimal inline markdown: `code`, **bold**, [text](url).
const TOKEN = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => {
        let node: ReactNode = part;
        if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
          node = <code>{part.slice(1, -1)}</code>;
        } else if (part.startsWith("**") && part.endsWith("**")) {
          node = <strong>{part.slice(2, -2)}</strong>;
        } else {
          const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (link) {
            const external = link[2].startsWith("http");
            node = (
              <a href={link[2]} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
                {link[1]}
              </a>
            );
          }
        }
        return <Fragment key={i}>{node}</Fragment>;
      })}
    </>
  );
}
