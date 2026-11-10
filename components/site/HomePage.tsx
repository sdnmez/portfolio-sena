import { Cursor } from "@/components/ui/Cursor";
import { LocaleDocument } from "@/components/ui/LocaleDocument";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { About } from "@/components/site/About";
import { ArtGallery } from "@/components/site/ArtGallery";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Lab } from "@/components/site/Lab";
import { Path } from "@/components/site/Path";
import { Work } from "@/components/site/Work";
import { artworks } from "@/data/artworks";
import { site } from "@/data/site";
import type { Messages } from "@/messages/en";
import { resolveArtwork, type Locale } from "@/types";

type HomePageProps = {
  locale: Locale;
  messages: Messages;
};

export function HomePage({ locale, messages }: HomePageProps) {
  const resolvedArtworks = artworks.map((artwork) => resolveArtwork(artwork, locale));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: messages.meta.description,
    url: site.url,
    email: `mailto:${site.email}`,
    sameAs: site.socials.map((social) => social.href),
    knowsAbout: [
      "Software engineering",
      "Application development",
      "2D illustration",
      "Character art",
      "Digital art",
      "3D modelling",
      "Visual storytelling",
    ],
  };

  return (
    <>
      <LocaleDocument locale={locale} title={messages.meta.title} />
      <ScrollProgress />
      <SmoothScroll />
      <Cursor labels={messages.cursor} />

      <a href="#main" className="skip-link">
        {messages.common.skip}
      </a>

      <Header locale={locale} messages={messages} />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero messages={messages} />
        <Work messages={messages} />
        <ArtGallery artworks={resolvedArtworks} labels={messages.art} />
        <Lab locale={locale} messages={messages} />
        <Path locale={locale} messages={messages} />
        <About messages={messages} />
        <Contact messages={messages} />
      </main>

      <Footer locale={locale} messages={messages} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
