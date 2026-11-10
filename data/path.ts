import type { PathEntry } from "@/types";

export const pathEntries: PathEntry[] = [
  {
    id: "wetenschappen-wiskunde",
    track: "study",
    period: { en: "Secondary education", nl: "Middelbaar" },
    title: {
      en: "Science & Mathematics (7h maths/week)",
      nl: "Wetenschappen-wiskunde (7u)",
    },
    org: { en: "Graduated", nl: "Afgestudeerd" },
    description: {
      en: "A science and mathematics track with seven hours of maths per week. The first place where structure, logic and problem-solving clicked.",
      nl: "Een wetenschaps- en wiskunderichting met zeven uur wiskunde per week. De eerste plek waar structuur, logica en probleemoplossing klikten.",
    },
  },
  {
    id: "applied-cs",
    track: "study",
    period: { en: "September 2022 — June 2025", nl: "September 2022 — juni 2025" },
    title: { en: "Applied Computer Science", nl: "Toegepaste Informatica" },
    org: { en: "Hogeschool Gent", nl: "Hogeschool Gent" },
    description: {
      en: "A three-year programme at Hogeschool Gent, from September 2022 to June 2025. The bridge from a science track to building software professionally.",
      nl: "Een driejarige opleiding aan Hogeschool Gent, van september 2022 tot juni 2025. De brug van een wetenschapsrichting naar professioneel software bouwen.",
    },
  },
  {
    id: "2d-art",
    track: "study",
    period: { en: "Ongoing", nl: "Doorlopend" },
    title: { en: "2D art practice", nl: "2D-kunstpraktijk" },
    org: { en: "Practice", nl: "Praktijk" },
    description: {
      en: "Drawing, character work and visual studies. A practice built around curiosity, references and putting in the hours.",
      nl: "Tekenen, personages en visuele studies. Een praktijk rond nieuwsgierigheid, referenties en uren maken.",
    },
    current: true,
  },
  {
    id: "3d-lab",
    track: "study",
    period: { en: "From 2027", nl: "Vanaf 2027" },
    title: { en: "3D modelling & animation", nl: "3D-modellering & animatie" },
    org: { en: "Planned", nl: "Gepland" },
    description: {
      en: "The next chapter: modelling, lighting and animation. The first real studies will be shared here from 2027.",
      nl: "Het volgende hoofdstuk: modelleren, licht en animatie. De eerste echte studies verschijnen hier vanaf 2027.",
    },
  },
  {
    id: "volvo",
    track: "work",
    period: { en: "September 2025 — present", nl: "September 2025 — heden" },
    title: { en: "Software Engineer", nl: "Software Engineer" },
    org: {
      en: "Volvo Group Belgium",
      nl: "Volvo Group Belgium",
    },
    description: {
      en: "Working full-time as a software engineer in a global industrial environment.",
      nl: "Fulltime aan de slag als software engineer in een internationale industriële omgeving.",
    },
    current: true,
  },
];
