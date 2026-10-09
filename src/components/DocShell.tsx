import type { ReactNode } from "react";
import { modules } from "@/content";
import { Sidebar } from "./Sidebar";
import { Toc } from "./Toc";

export function DocShell({ children, toc }: { children: ReactNode; toc?: { id: string; title: string }[] }) {
  const nav = modules.map(({ slug, number, title }) => ({ slug, number, title }));
  return (
    <div className={`container doc-layout${toc ? "" : " no-toc"}`}>
      <Sidebar modules={nav} />
      <main className="content" id="main">
        {children}
      </main>
      {toc && <Toc items={toc} />}
    </div>
  );
}
