"use client";

import { type ReactNode } from "react";

type Section = { heading: string; body: ReactNode };

export function LegalPage({
  title,
  subtitle,
  lastUpdated,
  sections,
}: {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  sections: Section[];
}) {
  return (
    <div className="page-dense pt-28 md:pt-36 pb-16">
      {/* Header */}
      <header className="mb-10 md:mb-14" data-animate="rise">
        <p className="tag-soft mb-4">Legal</p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.04] max-w-3xl" style={{ color: "var(--forest-deep)" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: "var(--muted-foreground)" }}>
            {subtitle}
          </p>
        )}
        {lastUpdated && (
          <p className="mt-3 text-xs uppercase tracking-[0.2em]" style={{ color: "var(--straw-deep)" }}>
            Last updated · {lastUpdated}
          </p>
        )}
      </header>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
        {/* TOC */}
        <aside className="hidden lg:block sticky top-32 self-start">
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "var(--straw-deep)" }}>
            On this page
          </p>
          <nav className="glass rounded-[1.5rem] p-3">
            <ul className="space-y-0.5">
              {sections.map((s, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="block text-sm py-2 px-3 rounded-full transition-colors hover:bg-forest/8"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="glass-card rounded-[2rem] p-6 md:p-10 lg:p-12">
          {sections.map((s, i) => (
            <section
              key={i}
              id={`section-${i}`}
              className="scroll-mt-32 pb-7 mb-7 border-b last:border-0 last:mb-0"
              style={{ borderColor: "rgba(31, 61, 43, 0.12)" }}
              data-animate="rise"
              data-delay={Math.min(i * 0.04, 0.3)}
            >
              <h2 className="font-display text-xl md:text-2xl mb-3" style={{ color: "var(--forest-deep)" }}>
                <span style={{ color: "var(--straw-deep)" }}>{String(i + 1).padStart(2, "0")}</span> · {s.heading}
              </h2>
              <div className="text-[0.975rem] leading-[1.7] space-y-3" style={{ color: "var(--foreground)" }}>
                {s.body}
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function LegalList({ items, ordered = false }: { items: ReactNode[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`space-y-2 ${ordered ? "list-decimal" : "list-disc"} ml-5 mt-2`}>
      {items.map((it, i) => (
        <li key={i} className="leading-relaxed">
          {it}
        </li>
      ))}
    </Tag>
  );
}
