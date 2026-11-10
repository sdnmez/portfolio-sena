import type { ModelStudy } from "@/types";

/**
 * A single planned study keeps the 3D lab warm until the first real models
 * are ready in 2027. The viewer renders a procedural preview, not a claim
 * that this is finished work.
 */
export const modelStudies: ModelStudy[] = [
  {
    slug: "first-study",
    title: { en: "First study", nl: "Eerste studie" },
    status: "soon",
    shape: "icosahedron",
    description: {
      en: "Space reserved for the first modelling, lighting and character experiments. Starting in 2027.",
      nl: "Ruimte voor de eerste experimenten met modelleren, licht en personages. Vanaf 2027.",
    },
  },
];
