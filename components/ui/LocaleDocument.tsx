"use client";

import { useEffect } from "react";
import type { Locale } from "@/types";

type LocaleDocumentProps = {
  locale: Locale;
  title: string;
};

export function LocaleDocument({ locale, title }: LocaleDocumentProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = title;
  }, [locale, title]);

  return null;
}
