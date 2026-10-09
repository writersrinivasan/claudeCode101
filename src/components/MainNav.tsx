"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavModule } from "./Sidebar";

export const NAV_LINKS = [
  ["/modules/why-claude-code", "Modules"],
  ["/labs", "Labs"],
  ["/prompts", "Prompts"],
  ["/cheatsheet", "Cheat Sheet"],
  ["/reference", "Glossary & FAQ"],
] as const;

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="main-nav" aria-label="Main">
      {NAV_LINKS.map(([href, label]) => {
        const active = label === "Modules" ? pathname.startsWith("/modules") : pathname === href;
        return (
          <Link key={href} href={href} aria-current={active ? "page" : undefined}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileMenu({ modules }: { modules: NavModule[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer whenever navigation happens.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button type="button" className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <div className="mobile-drawer">
          <nav aria-label="Mobile">
            <Link href="/">Home</Link>
            {NAV_LINKS.slice(1).map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <h4>Modules</h4>
            {modules.map((m) => (
              <Link key={m.slug} href={`/modules/${m.slug}`}>
                {m.number}. {m.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
