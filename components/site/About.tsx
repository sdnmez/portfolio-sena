import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollInkTitle } from "@/components/motion/ScrollInkTitle";
import { SectionLabel } from "@/components/site/SectionLabel";
import type { Messages } from "@/messages/en";

type AboutProps = {
  messages: Messages;
};

export function About({ messages }: AboutProps) {
  const groups = [messages.skills.engineering, messages.skills.creative, messages.skills.art];

  return (
    <section id="about" className="relative border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <SectionLabel>{messages.about.label}</SectionLabel>
            <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
              <ScrollInkTitle>{messages.about.title}</ScrollInkTitle>
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <Reveal delay={0.05}>
              <div className="max-w-xl space-y-5 text-sm leading-relaxed text-muted md:text-base">
                {messages.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-10 grid max-w-xl grid-cols-1 gap-x-8 gap-y-5 border-t border-line pt-6 sm:grid-cols-2">
                {messages.about.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <span className="stamp text-accent">About / 06</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  {messages.about.currentlyLabel}: {messages.about.currently}
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative mx-auto w-full max-w-[440px] lg:ml-auto">
              <figure
                className="art-frame relative p-2.5 pb-14"
                style={{ "--tilt": "1.4deg" } as CSSProperties}
              >
                <span className="tape -left-3 -top-3" aria-hidden="true" />
                <span className="tape -right-4 -top-2 rotate-[7deg]" aria-hidden="true" />

                <div className="relative aspect-[4/5] overflow-hidden border border-black/10">
                  {/* Replace public/portrait/sena.jpg with your own 4:5 portrait. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/portrait/sena.jpg?v=2"
                    alt={messages.about.portraitAlt}
                    width={960}
                    height={1200}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-4 border border-ink/10"
                  />
                </div>

                <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[color:var(--art-muted)]">
                    {messages.about.caption}
                  </p>
                  <span className="stamp text-[color:var(--art-fg)]">2026</span>
                </figcaption>
              </figure>

              <div className="absolute -bottom-7 -left-4 w-[min(92%,320px)] rotate-[-2deg] border border-ink/15 bg-paper p-4 text-ink shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/55">
                  {messages.about.currentlyLabel}
                </p>
                <p className="mt-1 font-display text-xl tracking-tight">{messages.about.currently}</p>
              </div>

              <p className="font-hand absolute -bottom-16 right-0 rotate-[-4deg] text-2xl text-accent">
                {messages.about.note} <span aria-hidden="true">↗</span>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 border-t border-line pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {messages.about.skillsLabel}
                </p>
                <p className="mt-1 font-display text-2xl tracking-tight">
                  {messages.about.skillsTitle}
                </p>
              </div>
              <p className="font-hand text-xl text-accent">
                {messages.skills.learningLabel}: {messages.skills.learning}
              </p>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {groups.map((group, index) => (
                <div key={group.title} className="border-t border-line pt-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl tracking-tight">{group.title}</h3>
                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{group.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
