import { ArrowDown, ArrowUpRight } from "lucide-react";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { Marquee } from "@/components/motion/Marquee";
import { HeroVisual } from "@/components/site/HeroVisual";
import { site } from "@/data/site";
import type { Messages } from "@/messages/en";

type HeroProps = {
  messages: Messages;
};

export function Hero({ messages }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-36 right-[-12%] h-[34rem] w-[34rem] rounded-full bg-accent-2/10 blur-[120px]" />
        <div className="absolute left-[-18%] top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:pb-24">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            <span className="h-px w-8 bg-accent" />
            <span className="text-foreground/80">{site.name}</span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-line sm:block" />
            <span>{messages.hero.eyebrow}</span>
          </div>

          <h1
            className="mt-12 pb-2 font-script text-[clamp(6rem,21vw,15rem)] leading-[0.62] tracking-[-0.02em]"
            aria-label={site.name}
          >
            <span className="inline-block origin-bottom -rotate-2 scale-y-[1.1]">
              <AnimatedWords text={site.shortName} clip={false} />
            </span>
            <span aria-hidden="true" className="text-accent">.</span>
          </h1>

          <p className="mt-6 font-hand text-2xl text-muted md:text-3xl">
            {messages.hero.subtitle}
          </p>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {messages.hero.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#art"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-5 py-3 text-sm font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative">{messages.hero.ctaArt}</span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-foreground transition-colors duration-300 hover:border-accent/50 hover:bg-foreground/[0.03]"
            >
              {messages.hero.ctaWork}
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
            {messages.hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl tracking-tight md:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 font-hand text-lg leading-tight text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroVisual
          mainSrc="/personal/studio.jpg"
          mainAlt={messages.hero.studioAlt}
          mainCaption={messages.hero.studioCaption}
          catSrc="/personal/cat.jpg"
          catAlt={messages.hero.catAlt}
          catName={messages.hero.catName}
          catCaption={messages.hero.catCaption}
        />
      </div>

      <Marquee items={messages.hero.marquee} />
    </section>
  );
}
