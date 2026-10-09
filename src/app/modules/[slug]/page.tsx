import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockView } from "@/components/Blocks";
import { DocShell } from "@/components/DocShell";
import { MarkComplete } from "@/components/MarkComplete";
import { Quiz } from "@/components/Quiz";
import { getAdjacent, getModule, modules } from "@/content";
import { labs } from "@/content/labs";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/modules/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = getModule(slug);
  return m ? { title: m.title, description: m.tagline } : {};
}

export default async function ModulePage({ params }: PageProps<"/modules/[slug]">) {
  const { slug } = await params;
  const m = getModule(slug);
  if (!m) notFound();

  const { prev, next } = getAdjacent(slug);
  const relatedLabs = labs.filter((l) => l.module === slug);
  const toc = [
    ...m.sections.map((s) => ({ id: s.id, title: s.title })),
    ...(relatedLabs.length ? [{ id: "labs", title: "Practise it" }] : []),
    { id: "takeaways", title: "Key takeaways" },
  ];

  return (
    <DocShell toc={toc}>
      <div className="eyebrow">
        <span className="badge accent">
          {m.number === 10 ? "Bonus" : `Module ${m.number}`}
        </span>
        <span className="badge">⏱ {m.time}</span>
        <span className="badge">{m.mode}</span>
      </div>
      <h1 className="page-title">
        <span aria-hidden>{m.icon} </span>
        {m.title}
      </h1>
      <p className="page-lead">{m.tagline}</p>

      <div className="objectives">
        <h3>By the end of this module you will be able to</h3>
        <ul>
          {m.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>

      {m.sections.map((s) => (
        <section key={s.id} aria-labelledby={s.id}>
          <h2 id={s.id}>
            <a className="anchor" href={`#${s.id}`}>
              {s.title}
            </a>
          </h2>
          {s.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </section>
      ))}

      {relatedLabs.length > 0 && (
        <section aria-labelledby="labs">
          <h2 id="labs">
            <a className="anchor" href="#labs">
              Practise it
            </a>
          </h2>
          <div className="cards">
            {relatedLabs.map((l) => (
              <Link key={l.slug} href={`/labs#${l.slug}`} className="card" style={{ color: "var(--text)", textDecoration: "none" }}>
                <div className="icon" aria-hidden>
                  🧪
                </div>
                <h4>{l.title}</h4>
                <p>
                  {l.summary} · {l.duration}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="takeaways" aria-labelledby="takeaways">
        <h2 id="takeaways">🔑 Key takeaways</h2>
        <ul>
          {m.takeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      {m.quiz.length > 0 && <Quiz questions={m.quiz} />}

      <div className="module-footer">
        <MarkComplete slug={m.slug} />
        <span className="badge">Progress is saved in this browser</span>
      </div>

      <nav className="pager" aria-label="Module navigation">
        {prev && (
          <Link href={`/modules/${prev.slug}`}>
            <small>← Previous</small>
            {prev.title}
          </Link>
        )}
        {next && (
          <Link href={`/modules/${next.slug}`} className="next">
            <small>Next →</small>
            {next.title}
          </Link>
        )}
      </nav>
    </DocShell>
  );
}
