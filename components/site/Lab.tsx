import { Reveal } from "@/components/motion/Reveal";
import { ScrollInkTitle } from "@/components/motion/ScrollInkTitle";
import { LabShowcase } from "@/components/site/LabShowcase";
import { SectionLabel } from "@/components/site/SectionLabel";
import { modelStudies } from "@/data/models";
import type { Messages } from "@/messages/en";
import { resolveModelStudy, type Locale } from "@/types";

type LabProps = {
  locale: Locale;
  messages: Messages;
};

export function Lab({ locale, messages }: LabProps) {
  const models = modelStudies.map((model) => resolveModelStudy(model, locale));

  return (
    <section id="lab" className="relative border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>{messages.lab.label}</SectionLabel>
              <h2 className="mt-4 max-w-xl font-display text-4xl tracking-tight md:text-5xl">
                <ScrollInkTitle>{messages.lab.title}</ScrollInkTitle>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted md:text-base">
              {messages.lab.intro}
            </p>
          </div>
        </Reveal>

        <LabShowcase models={models} labels={messages.lab} />
      </div>
    </section>
  );
}
