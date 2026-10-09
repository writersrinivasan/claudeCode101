"use client";

import { useEffect, useState } from "react";

export function Toc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="toc" aria-label="On this page">
      <h4>On this page</h4>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className={active === i.id ? "active" : undefined}>
              {i.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
