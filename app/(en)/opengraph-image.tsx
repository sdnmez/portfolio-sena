import { getMessages } from "@/lib/i18n";
import { renderOgImage } from "@/lib/render-og";

export const alt = "Sena Donmez — Software Engineer & 2D/3D Artist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const t = getMessages("en");

  return renderOgImage({
    title: "Ink, paper & character art.",
    description: t.meta.description,
    localeLabel: "EN",
  });
}
