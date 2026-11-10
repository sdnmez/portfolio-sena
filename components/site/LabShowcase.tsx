"use client";

import dynamic from "next/dynamic";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Rotate3d } from "lucide-react";
import { useRef, useState } from "react";
import { LabFallback } from "@/components/three/LabFallback";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";
import type { Messages } from "@/messages/en";
import type { ModelShape, ModelStatus, ResolvedModelStudy } from "@/types";

const LabCanvas = dynamic(() => import("@/components/three/LabViewer"), {
  ssr: false,
  loading: () => <ViewerLoading />,
});

function ViewerLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="relative h-40 w-40">
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-accent/30" />
        <div className="absolute inset-6 rounded-full border border-accent/20" />
        <div className="absolute inset-12 rounded-full border border-accent-2/20" />
      </div>
    </div>
  );
}

function StudyBackdrop() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      className="h-full w-full text-ink/25"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="200" cy="200" r="132" strokeDasharray="3 6" />
        <circle cx="200" cy="200" r="174" opacity="0.45" />
        <path d="M200 26 V374 M26 200 H374" opacity="0.35" />
        <path d="M200 70 L300 135 L300 265 L200 330 L100 265 L100 135 Z" />
        <path d="M200 70 L200 330 M100 135 L300 265 M300 135 L100 265" opacity="0.6" />
      </g>
      <g stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.45">
        <circle cx="200" cy="200" r="96" />
        <path d="M200 104 L285 152 L285 248 L200 296 L115 248 L115 152 Z" />
      </g>
      <g fill="currentColor" opacity="0.6">
        <circle cx="200" cy="70" r="2.5" />
        <circle cx="300" cy="135" r="2.5" />
        <circle cx="300" cy="265" r="2.5" />
        <circle cx="200" cy="330" r="2.5" />
        <circle cx="100" cy="265" r="2.5" />
        <circle cx="100" cy="135" r="2.5" />
      </g>
    </svg>
  );
}

function StatusBadge({
  status,
  labels,
  className,
}: {
  status: ModelStatus;
  labels: Messages["lab"]["statuses"];
  className?: string;
}) {
  const tone =
    status === "inProgress"
      ? "border-accent/40 text-accent"
      : status === "concept"
        ? "border-ink/25 text-ink/60"
        : "border-ink/15 text-ink/45";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em]",
        tone,
        className,
      )}
    >
      {status === "inProgress" ? (
        <span className="h-1 w-1 animate-pulse-soft rounded-full bg-accent" />
      ) : null}
      {labels[status]}
    </span>
  );
}

function ModelThumb({ shape, className }: { shape: ModelShape; className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1" opacity="0.28">
        <circle cx="40" cy="40" r="34" strokeDasharray="2 4" />
        <path d="M6 40h68M40 6v68" />
      </g>

      {shape === "icosahedron" ? (
        <g stroke="var(--color-accent)" strokeWidth="1.1">
          <path d="M40 10 L68 26 L68 54 L40 70 L12 54 L12 26 Z" />
          <path d="M40 10 L40 70 M12 26 L68 54 M68 26 L12 54" opacity="0.6" />
          <path d="M40 10 L12 54 M40 10 L68 54" opacity="0.4" />
        </g>
      ) : null}

      {shape === "torusKnot" ? (
        <g stroke="var(--color-accent)" strokeWidth="1.1">
          <ellipse cx="40" cy="40" rx="26" ry="13" transform="rotate(30 40 40)" />
          <ellipse cx="40" cy="40" rx="26" ry="13" transform="rotate(-30 40 40)" opacity="0.8" />
          <ellipse cx="40" cy="40" rx="13" ry="26" transform="rotate(45 40 40)" opacity="0.5" />
        </g>
      ) : null}

      {shape === "blob" ? (
        <g stroke="var(--color-accent)" strokeWidth="1.1">
          <path d="M40 10 C58 10 70 24 70 40 C70 58 56 70 40 70 C22 70 10 56 10 40 C10 22 24 10 40 10 Z" />
          <path
            d="M40 19 C52 19 61 29 61 40 C61 53 51 61 40 61 C27 61 19 51 19 40 C19 27 29 19 40 19 Z"
            opacity="0.75"
          />
          <path
            d="M40 28 C47 28 52 34 52 40 C52 47 46 52 40 52 C33 52 28 46 28 40 C28 33 34 28 40 28 Z"
            opacity="0.5"
          />
        </g>
      ) : null}
    </svg>
  );
}

type LabShowcaseProps = {
  models: ResolvedModelStudy[];
  labels: Messages["lab"];
};

export function LabShowcase({ models, labels }: LabShowcaseProps) {
  const [shape, setShape] = useState<ModelShape>(models[0]?.shape ?? "icosahedron");
  const viewerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(viewerRef, { once: true, margin: "300px" });
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduce = useReducedMotion();
  const canRender3d = inView && isDesktop && !reduce;

  const selected = models.find((model) => model.shape === shape) ?? models[0];

  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div
        ref={viewerRef}
        data-cursor="drag"
        className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-line lg:min-h-[560px]"
      >
        <div className="paper-texture absolute inset-0 bg-paper" aria-hidden="true" />
        <div className="blueprint-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 opacity-75" aria-hidden="true">
          <StudyBackdrop />
        </div>

        <div className="absolute inset-0">
          {canRender3d ? (
            <LabCanvas shape={shape} fallbackLabel={labels.fallback} />
          ) : isDesktop && !reduce ? (
            <ViewerLoading />
          ) : (
            <LabFallback label={labels.fallback} />
          )}
        </div>

        <span className="pointer-events-none absolute inset-4 border border-ink/10" aria-hidden="true" />
        <span
          className="pointer-events-none absolute inset-4 border-l-2 border-t-2 border-accent/30"
          aria-hidden="true"
          style={{ width: "1.25rem", height: "1.25rem" }}
        />
        <span
          className="pointer-events-none absolute bottom-4 right-4 border-b-2 border-r-2 border-accent/30"
          aria-hidden="true"
          style={{ width: "1.25rem", height: "1.25rem" }}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5 md:p-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/50">
              {labels.viewerLabel}
            </p>
            <p className="mt-1 font-display text-xl tracking-tight text-ink md:text-2xl">
              {selected?.title}
            </p>
          </div>
          {selected ? <StatusBadge status={selected.status} labels={labels.statuses} /> : null}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5 md:p-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/45">
            R3F / wireframe
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/55">
            <Rotate3d className="h-3.5 w-3.5" />
            {labels.dragHint}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {models.map((model, index) => {
          const isActive = model.shape === shape;
          return (
            <motion.button
              key={model.slug}
              type="button"
              onClick={() => setShape(model.shape)}
              aria-pressed={isActive}
              data-active={isActive ? "true" : "false"}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "lab-card group relative flex flex-1 flex-col rounded-3xl border p-5 text-left transition-colors",
                isActive ? "border-accent/60" : "border-line hover:border-accent/30",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45">
                  {String(index + 1).padStart(2, "0")} / {labels.selectLabel}
                </span>
                <StatusBadge status={model.status} labels={labels.statuses} />
              </div>

              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl tracking-tight text-ink">{model.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/60">
                    {model.description}
                  </p>
                </div>
                <ModelThumb
                  shape={model.shape}
                  className="hidden h-20 w-20 shrink-0 text-ink/40 sm:block"
                />
              </div>

              {models.length === 1 ? (
                <p className="mt-auto max-w-xs pr-6 pt-8 font-hand text-xl leading-tight text-accent">
                  {labels.note}
                </p>
              ) : null}

              <span
                aria-hidden="true"
                className={cn(
                  "absolute bottom-5 right-5 h-2 w-2 rounded-full transition-colors",
                  isActive ? "bg-accent" : "bg-ink/20",
                )}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
