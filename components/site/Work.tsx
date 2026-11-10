import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollInkTitle } from "@/components/motion/ScrollInkTitle";
import { SectionLabel } from "@/components/site/SectionLabel";
import type { Messages } from "@/messages/en";

type WorkProps = {
  messages: Messages;
};

export function Work({ messages }: WorkProps) {
  const t = messages.work;

  return (
    <section id="work" className="relative border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>{t.label}</SectionLabel>
              <h2 className="mt-4 max-w-xl font-display text-4xl tracking-tight md:text-5xl">
                <ScrollInkTitle>{t.title}</ScrollInkTitle>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-sm leading-relaxed text-muted md:text-base">{t.intro}</p>
              <p className="mt-3 font-hand text-xl text-accent">{t.note}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <article className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-6 md:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-accent/20"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 top-8 h-36 w-36 rounded-full border border-dashed border-accent/25"
              />

              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <span className="stamp text-accent">{t.currentLabel}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  {t.period}
                </span>
              </div>

              <h3 className="relative mt-10 font-display text-4xl leading-none tracking-tight md:text-5xl">
                {t.role}
              </h3>
              <p className="relative mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                {t.company}
              </p>
              <p className="relative mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                {t.description}
              </p>

              <div className="relative mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                <span>{t.location}</span>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                >
                  {t.contactCta}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </article>

            <aside className="paper paper-texture relative rotate-[1deg] overflow-hidden border border-ink/15 p-6 text-ink shadow-[0_22px_50px_rgba(0,0,0,0.28)] md:p-8">
              <span className="tape -right-4 -top-3 rotate-[6deg]" aria-hidden="true" />
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55">
                {t.projectsLabel}
              </p>
              <p className="mt-6 max-w-sm font-display text-2xl leading-tight tracking-tight md:text-3xl">
                {t.projectsEmpty}
              </p>
              <p className="mt-8 font-hand text-2xl text-accent">{t.note}</p>
              <span className="stamp mt-8 block text-ink/40">2026 / 2027</span>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
