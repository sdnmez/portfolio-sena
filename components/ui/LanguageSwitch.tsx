"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { LOCALE_COOKIE } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

type LanguageSwitchProps = {
  locale: Locale;
  labels: { en: string; nl: string };
  label?: string;
  className?: string;
  onSwitch?: () => void;
};

export function LanguageSwitch({
  locale,
  labels,
  label = "Language",
  className,
  onSwitch,
}: LanguageSwitchProps) {
  const router = useRouter();
  const [pending, setPending] = useState<Locale | null>(null);
  const [isPending, startTransition] = useTransition();
  const active = isPending && pending ? pending : locale;

  function switchTo(next: Locale) {
    if (next === active) return;

    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    try {
      localStorage.setItem(LOCALE_COOKIE, next);
    } catch {
      // Storage can be unavailable in private browsing; the cookie still works.
    }
    document.documentElement.lang = next;
    setPending(next);
    onSwitch?.();
    startTransition(() => router.refresh());
  }

  function buttonClass(isActive: boolean) {
    return cn(
      "transition-colors",
      isActive
        ? "text-foreground underline decoration-accent decoration-2 underline-offset-4"
        : "text-muted hover:text-foreground",
    );
  }

  return (
    <div
      role="group"
      className={cn(
        "flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em]",
        className,
      )}
      aria-label={label}
    >
      <button
        type="button"
        lang="en"
        onClick={() => switchTo("en")}
        aria-pressed={active === "en"}
        className={buttonClass(active === "en")}
      >
        {labels.en}
      </button>
      <span className="text-line">/</span>
      <button
        type="button"
        lang="nl"
        onClick={() => switchTo("nl")}
        aria-pressed={active === "nl"}
        className={buttonClass(active === "nl")}
      >
        {labels.nl}
      </button>
    </div>
  );
}
