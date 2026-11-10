import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { site } from "@/data/site";
import type { Messages } from "@/messages/en";
import type { Locale } from "@/types";

type FooterProps = {
  locale: Locale;
  messages: Messages;
};

export function Footer({ locale, messages }: FooterProps) {
  const homeHref = "/";
  const items = [
    { href: "#work", label: messages.nav.work },
    { href: "#art", label: messages.nav.art },
    { href: "#lab", label: messages.nav.lab },
    { href: "#path", label: messages.nav.path },
    { href: "#about", label: messages.nav.about },
    { href: "#contact", label: messages.nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-accent-2/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link href={homeHref} className="flex items-center gap-3">
              <span className="relative flex h-8 w-8 items-center justify-center">
                <span className="absolute inset-0 rotate-6 rounded-[0.55rem] border border-accent/40" />
                <span className="font-display text-xl leading-none">S</span>
              </span>
              <span className="font-display text-xl tracking-tight">Sena Donmez</span>
              <span className="stamp text-muted">{messages.footer.volume}</span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted">{messages.contact.intro}</p>
            <div className="mt-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
              {messages.contact.status}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h2 className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                {messages.common.menu}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {items.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="transition-colors hover:text-accent">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                {messages.contact.socialsLabel}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                    >
                      {social.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                {messages.common.email}
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 inline-block text-sm transition-colors hover:text-accent"
              >
                {site.email}
              </a>
              <div className="mt-6">
                <LanguageSwitch
                  locale={locale}
                  labels={messages.language}
                  label={messages.common.language}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[10px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.name}. {messages.footer.rights}
          </p>
          <p className="font-mono uppercase tracking-[0.12em]">{messages.footer.built}</p>
          <p className="font-mono uppercase tracking-[0.12em]">{messages.footer.volume}</p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
          >
            {messages.footer.backToTop}
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
