import { Reveal } from "@/components/motion/Reveal";
import { ScrollInkTitle } from "@/components/motion/ScrollInkTitle";
import { SectionLabel } from "@/components/site/SectionLabel";
import { PathTimeline } from "@/components/site/PathTimeline";
import { pathEntries } from "@/data/path";
import type { Messages } from "@/messages/en";
import { resolvePathEntry, type Locale } from "@/types";

type PathProps = {
  locale: Locale;
  messages: Messages;
};

export function Path({ locale, messages }: PathProps) {
  const entries = pathEntries.map((entry) => resolvePathEntry(entry, locale));

  return (
    <section id="path" className="relative border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>{messages.path.label}</SectionLabel>
              <h2 className="mt-4 max-w-xl font-display text-4xl tracking-tight md:text-5xl">
                <ScrollInkTitle>{messages.path.title}</ScrollInkTitle>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted md:text-base">
              {messages.path.intro}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12">
            <PathTimeline entries={entries} labels={messages.path} />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-10 font-hand text-2xl text-accent">{messages.path.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
