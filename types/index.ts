export type Locale = "en" | "nl";

export type Localized = Record<Locale, string>;

export type ArtCategory = "anime" | "sketch" | "digital";

export type Artwork = {
  slug: string;
  title: Localized;
  year: number;
  category: ArtCategory;
  medium: Localized;
  description: Localized;
  image: string;
  width: number;
  height: number;
  featured?: boolean;
};

export type ResolvedArtwork = Omit<Artwork, "title" | "medium" | "description"> & {
  title: string;
  medium: string;
  description: string;
};

export function resolveArtwork(artwork: Artwork, locale: Locale): ResolvedArtwork {
  return {
    ...artwork,
    title: artwork.title[locale],
    medium: artwork.medium[locale],
    description: artwork.description[locale],
  };
}

export type PathTrack = "study" | "work";

export type PathEntry = {
  id: string;
  track: PathTrack;
  period: Localized;
  title: Localized;
  org: Localized;
  description: Localized;
  current?: boolean;
};

export type ResolvedPathEntry = Omit<PathEntry, "period" | "title" | "org" | "description"> & {
  period: string;
  title: string;
  org: string;
  description: string;
};

export function resolvePathEntry(entry: PathEntry, locale: Locale): ResolvedPathEntry {
  return {
    ...entry,
    period: entry.period[locale],
    title: entry.title[locale],
    org: entry.org[locale],
    description: entry.description[locale],
  };
}

export type ModelShape = "icosahedron" | "torusKnot" | "blob";

export type ModelStatus = "concept" | "inProgress" | "soon";

export type ModelStudy = {
  slug: string;
  title: Localized;
  description: Localized;
  status: ModelStatus;
  shape: ModelShape;
};

export type ResolvedModelStudy = Omit<ModelStudy, "title" | "description"> & {
  title: string;
  description: string;
};

export function resolveModelStudy(model: ModelStudy, locale: Locale): ResolvedModelStudy {
  return {
    ...model,
    title: model.title[locale],
    description: model.description[locale],
  };
}
