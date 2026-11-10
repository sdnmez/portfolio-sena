import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollInkTitle } from "@/components/motion/ScrollInkTitle";
import { SectionLabel } from "@/components/site/SectionLabel";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { site } from "@/data/site";
import type { Messages } from "@/messages/en";

type ContactProps = {
  messages: Messages;
};

export function Contact({ messages }: ContactProps) {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-52 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent-2/12 blur-[130px]" />
        <div className="absolute right-[-10%] top-0 h-72 w-72 rounded-full bg-accent/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>{messages.contact.label}</SectionLabel>
        </Reveal>

        <div className="mt-8 grid gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl font-display text-[clamp(2.9rem,7vw,5.6rem)] leading-[0.95] tracking-[-0.045em]">
              <ScrollInkTitle>{messages.contact.title}</ScrollInkTitle>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              {messages.contact.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <span className="stamp text-accent">{messages.contact.status}</span>
              <span className="stamp text-foreground/60">{messages.contact.commissionStatus}</span>
              <span className="font-hand text-xl text-muted">{messages.common.basedIn}</span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative">
              <div className="paper paper-texture rotate-[-1deg] border border-ink/15 p-6 shadow-[0_26px_60px_rgba(0,0,0,0.38)]">
                <div className="flex items-center justify-between gap-4 border-b border-ink/15 pb-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/70">
                    {messages.contact.emailLabel}
                  </p>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55">
                    SD / 2026
                  </span>
                </div>

                <a
                  href={`mailto:${site.email}`}
                  className="group mt-5 inline-flex items-center gap-3 font-display text-2xl tracking-tight text-ink transition-colors hover:text-accent md:text-3xl"
                >
                  {site.email}
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>

                <div className="mt-4">
                  <CopyEmail
                    email={site.email}
                    copyLabel={messages.common.copyEmail}
                    copiedLabel={messages.common.copied}
                    tone="paper"
                  />
                </div>

                <div className="mt-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/65">
                    {messages.contact.socialsLabel}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {site.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="open"
                        className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/75 transition-colors hover:border-accent/60 hover:text-ink"
                      >
                        {social.label}
                        <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                </div>

                <p className="mt-8 font-hand text-2xl text-accent">{messages.contact.note}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
            {messages.contact.status}
          </span>
          <span>{messages.common.basedIn}</span>
        </div>
      </div>
    </section>
  );
}
