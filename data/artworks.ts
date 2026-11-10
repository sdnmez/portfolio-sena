import type { Artwork } from "@/types";

/**
 * Add new pieces here and drop the image files in /public/art.
 * `width` and `height` are the pixel dimensions of the image file.
 */
export const artworks: Artwork[] = [
  {
    slug: "sunflower-yotsuba",
    title: {
      en: "Sunflower Yotsuba",
      nl: "Zonnebloem-Yotsuba",
    },
    year: 2026,
    category: "anime",
    medium: {
      en: "Marker and coloured pencil on paper",
      nl: "Marker en kleurpotlood op papier",
    },
    description: {
      en: "Fan art of Yotsuba from Yotsuba&!, carrying an armful of sunflowers. A warm colour study in petals, leaves and a very heavy bouquet.",
      nl: "Fan art van Yotsuba uit Yotsuba&!, met een armvol zonnebloemen. Een warme kleurstudie in bloemblaadjes, bladeren en een bijzonder zware bos.",
    },
    image: "/art/art1.jpg",
    width: 2160,
    height: 2160,
    featured: true,
  },
  {
    slug: "levi",
    title: {
      en: "Levi",
      nl: "Levi",
    },
    year: 2026,
    category: "sketch",
    medium: {
      en: "Ink and graphite on paper",
      nl: "Inkt en grafiet op papier",
    },
    description: {
      en: "Fan art of Levi Ackerman from Attack on Titan, caught mid-swing. An ink study in motion, fabric and controlled linework.",
      nl: "Fan art van Levi Ackerman uit Attack on Titan, midden in een aanval. Een inktstudie in beweging, stof en gecontroleerde lijnen.",
    },
    image: "/art/art2.jpg",
    width: 2160,
    height: 2160,
    featured: true,
  },
];
