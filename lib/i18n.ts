import { en, type Messages } from "@/messages/en";
import { nl } from "@/messages/nl";
import type { Locale } from "@/types";

const dictionaries: Record<Locale, Messages> = { en, nl };

export const LOCALE_COOKIE = "sena-locale";

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

export function resolveLocale(value: string | undefined | null): Locale {
  return value === "nl" ? "nl" : "en";
}
