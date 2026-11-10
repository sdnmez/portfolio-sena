"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Messages } from "@/messages/en";
import type { Locale } from "@/types";

type HeaderProps = {
  locale: Locale;
  messages: Messages;
};

export function Header({ locale, messages }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const homeHref = "/";
  const items = [
    { href: "#work", label: messages.nav.work },
    { href: "#art", label: messages.nav.art },
    { href: "#lab", label: messages.nav.lab },
    { href: "#path", label: messages.nav.path },
    { href: "#contact", label: messages.nav.contact },
  ];
  const mobileItems = [
    ...items.slice(0, 4),
    { href: "#about", label: messages.nav.about },
    items[4],
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousBody = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const menu = menuRef.current;
    const menuButton = menuButtonRef.current;
    const menuFocusable = menu
      ? Array.from(
          menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
        )
      : [];
    const focusable = menuButton ? [menuButton, ...menuFocusable] : menuFocusable;
    menuFocusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousHtml;
      window.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-line bg-background"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 md:h-20">
        <Link
          href={homeHref}
          className="group flex items-center gap-3"
          aria-label={`${messages.meta.title} — home`}
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 rotate-6 rounded-[0.55rem] border border-accent/40 transition-transform duration-500 group-hover:rotate-12" />
            <span className="font-display text-xl leading-none text-foreground">S</span>
          </span>
          <span className="font-display text-xl tracking-tight whitespace-nowrap md:text-2xl">
            {site.name}
          </span>
          <span className="stamp mt-1 hidden text-foreground/60 sm:inline-flex">
            Vol. 01
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitch
            locale={locale}
            labels={messages.language}
            label={messages.common.language}
          />
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-accent/50 hover:bg-foreground/[0.03]"
          >
            {messages.common.letsTalk}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? messages.common.close : messages.common.menu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={messages.common.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-40 flex flex-col overflow-y-auto bg-background px-6 pb-8 pt-8 md:top-20 lg:hidden"
            data-lenis-prevent
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {mobileItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + index * 0.04, duration: 0.35 }}
                  className="flex items-center justify-between border-b border-line py-3.5 font-display text-3xl tracking-tight"
                >
                  {item.label}
                  <span className="font-mono text-[10px] text-muted">0{index + 1}</span>
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-5 pt-8">
              <p className="font-hand text-xl text-accent">{messages.contact.note}</p>
              <div className="flex items-center justify-between gap-4">
                <LanguageSwitch
                  locale={locale}
                  labels={messages.language}
                  label={messages.common.language}
                  className="text-sm"
                  onSwitch={() => setOpen(false)}
                />
                <span className="stamp text-muted">{messages.footer.volume}</span>
              </div>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-between rounded-2xl border border-line px-5 py-4 text-sm"
              >
                <span>{messages.contact.emailLabel}</span>
                <span className="font-mono text-xs text-accent">{site.email}</span>
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
