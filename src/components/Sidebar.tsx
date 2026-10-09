"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCompleted } from "./progress";

export type NavModule = { slug: string; number: number; title: string };

export function Sidebar({ modules }: { modules: NavModule[] }) {
  const pathname = usePathname();
  const completed = useCompleted();
  return (
    <aside className="sidebar" aria-label="Modules">
      <h4>Session modules</h4>
      <ol>
        {modules.map((m) => {
          const href = `/modules/${m.slug}`;
          const done = completed.has(m.slug);
          return (
            <li key={m.slug}>
              <Link href={href} aria-current={pathname === href ? "page" : undefined}>
                <span className={`num${done ? " done" : ""}`}>{done ? "✓" : m.number}</span>
                <span>{m.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
      <h4>Practice & reference</h4>
      <ol>
        {[
          ["/labs", "🧪", "Hands-on labs"],
          ["/prompts", "💬", "Prompt library"],
          ["/cheatsheet", "📋", "Cheat sheet"],
          ["/reference", "📚", "Glossary & FAQ"],
        ].map(([href, icon, label]) => (
          <li key={href}>
            <Link href={href} aria-current={pathname === href ? "page" : undefined}>
              <span className="num" style={{ border: 0 }}>{icon}</span>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}
