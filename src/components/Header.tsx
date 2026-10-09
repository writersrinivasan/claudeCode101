import Link from "next/link";
import { buildSearchIndex, modules, type SearchEntry } from "@/content";
import { labs } from "@/content/labs";
import { prompts } from "@/content/prompts";
import { MainNav, MobileMenu } from "./MainNav";
import { SearchDialog } from "./SearchDialog";
import { ThemeToggle } from "./ThemeToggle";

function fullIndex(): SearchEntry[] {
  return [
    ...buildSearchIndex(),
    ...labs.map((l) => ({
      title: l.title,
      context: "Hands-on lab",
      href: `/labs#${l.slug}`,
      text: `${l.summary} ${l.goal} ${l.steps.map((s) => `${s.title} ${s.body} ${s.prompt ?? ""}`).join(" ")}`,
    })),
    ...prompts.map((p) => ({
      title: p.title,
      context: `Prompt library · ${p.category}`,
      href: `/prompts?q=${encodeURIComponent(p.title)}`,
      text: `${p.when} ${p.prompt}`,
    })),
  ];
}

export function Header() {
  const nav = modules.map(({ slug, number, title }) => ({ slug, number, title }));
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden>
            &gt;_
          </span>
          <span>
            Claude Code 101
            <small>Developer portal</small>
          </span>
        </Link>
        <MainNav />
        <div className="header-actions">
          <SearchDialog index={fullIndex()} />
          <ThemeToggle />
          <MobileMenu modules={nav} />
        </div>
      </div>
    </header>
  );
}
