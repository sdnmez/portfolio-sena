import { TiltCard } from "@/components/motion/TiltCard";

type HeroVisualProps = {
  mainSrc: string;
  mainAlt: string;
  mainCaption: string;
  catSrc: string;
  catAlt: string;
  catName: string;
  catCaption: string;
};

export function HeroVisual({
  mainSrc,
  mainAlt,
  mainCaption,
  catSrc,
  catAlt,
  catName,
  catCaption,
}: HeroVisualProps) {
  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[3rem] border border-dashed border-foreground/10"
      />

      <TiltCard className="relative">
        <figure className="hero-print relative rotate-[-2deg] p-3 pb-14">
          <span className="tape -left-3 -top-3 sm:-left-5" aria-hidden="true" />
          <span className="tape -right-3 -top-3 rotate-[6deg] sm:-right-5" aria-hidden="true" />

          <div className="relative aspect-[3/4] overflow-hidden border border-ink/15 bg-ink/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mainSrc}
              alt={mainAlt}
              width={1200}
              height={1600}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="print-image h-full w-full object-cover"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 border border-white/20"
            />
          </div>

          <figcaption className="absolute inset-x-5 bottom-4 flex items-end justify-end gap-3">
            <span
              aria-hidden="true"
              className="mb-1 h-px w-10 rotate-[-2deg] bg-accent/60"
            />
            <p className="font-hand text-2xl leading-none text-ink md:text-[1.7rem]">
              {mainCaption}
            </p>
          </figcaption>
        </figure>

        <figure className="absolute bottom-[-1.9rem] left-0 w-[35%] rotate-[-5deg] border border-ink/15 bg-paper p-2 pb-3 shadow-[0_18px_34px_rgba(0,0,0,0.34)] sm:-left-4">
          <span
            aria-hidden="true"
            className="tape left-1/2 -top-3 h-4 w-14 -translate-x-1/2 rotate-[2deg] scale-90"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={catSrc}
            alt={catAlt}
            width={640}
            height={853}
            loading="eager"
            decoding="async"
            className="print-image aspect-square w-full border border-ink/10 object-cover object-top"
          />
          <figcaption className="mt-2 text-center font-hand text-[13px] leading-none text-ink sm:text-lg">
            <span className="block">{catName}</span>
            <span className="block">{catCaption}</span>
          </figcaption>
        </figure>
      </TiltCard>
    </div>
  );
}
