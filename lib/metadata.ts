import type { Metadata } from "next";
import { site } from "@/data/site";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/types";

export function buildMetadata(locale: Locale): Metadata {
  const t = getMessages(locale);

  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: `${site.name} — Portfolio`,
    authors: [{ name: site.name }],
    creator: site.name,
    keywords: [
      "software engineer",
      "2D artist",
      "3D artist",
      "illustrator",
      "creative developer",
      "web development",
      "React",
      "Next.js",
      "character design",
      "digital illustration",
      "portfolio",
      "Belgium",
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "nl_BE",
      url: "/",
      siteName: `${site.name} — Portfolio`,
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
