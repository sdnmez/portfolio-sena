"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Messages } from "@/messages/en";
import type { ArtCategory, ResolvedArtwork } from "@/types";

type ArtGalleryProps = {
  artworks: ResolvedArtwork[];
  labels: Messages["art"];
};

type Filter = "all" | ArtCategory;

const tilts = ["-1.4deg", "0.9deg", "-0.7deg", "1.3deg", "-1deg", "0.6deg"];

const artSlide = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 44 : -44,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -44 : 44,
  }),
};

function EmptyGallery({ labels }: { labels: Messages["art"] }) {
  const instagram = site.socials.find((social) => social.label === "Instagram");

  return (
    <section id="art" className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12%] top-24 h-[30rem] w-[30rem] rounded-full bg-accent/5 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              <span className="h-px w-8 bg-accent" />
              {labels.label}
            </div>
            <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
              {labels.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted md:text-base">
            {labels.intro}
          </p>
        </div>

        <div className="paper paper-texture relative mt-12 overflow-hidden border border-ink/15 p-6 text-ink shadow-[0_26px_60px_rgba(0,0,0,0.3)] md:p-10">
          <span className="tape -left-3 -top-3" aria-hidden="true" />
          <span className="tape -right-4 -top-2 rotate-[6deg]" aria-hidden="true" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55">
                {labels.plate} / 00
              </p>
              <p className="mt-4 font-display text-3xl leading-tight tracking-tight md:text-4xl">
                {labels.empty}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/70">
                {labels.emptyBody}
              </p>
            </div>

            {instagram ? (
              <a
                href={instagram.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-ink/25 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/75 transition-colors hover:border-accent/60 hover:text-ink"
              >
                Instagram
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ) : null}
          </div>

          <div aria-hidden="true" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="flex aspect-[4/5] items-center justify-center border border-dashed border-ink/20 bg-ink/[0.02]"
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/30">
                  Plate {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 font-hand text-2xl text-accent">{labels.note}</p>
        </div>
      </div>
    </section>
  );
}

export function ArtGallery({ artworks, labels }: ArtGalleryProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? artworks : artworks.filter((art) => art.category === filter)),
    [artworks, filter],
  );

  const current = active !== null ? visible[active] : null;
  const isOpen = active !== null;

  const options: { value: Filter; label: string }[] = [
    { value: "all", label: labels.filters.all },
    { value: "anime", label: labels.filters.anime },
    { value: "sketch", label: labels.filters.sketch },
    { value: "digital", label: labels.filters.digital },
  ];

  const close = useCallback(() => setActive(null), []);

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setActive((value) => {
        if (value === null || visible.length === 0) return value;
        return (value + delta + visible.length) % visible.length;
      });
    },
    [visible.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (active !== null && current) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [active, current]);

  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
    };
  }, [isOpen]);

  useEffect(() => {
    if (active === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, go]);

  useEffect(() => {
    if (active === null || visible.length < 2) return;

    [active - 1, active + 1].forEach((index) => {
      const item = visible[(index + visible.length) % visible.length];
      if (item) {
        const image = new Image();
        image.src = item.image;
      }
    });
  }, [active, visible]);

  const handlePointerDown = (event: React.PointerEvent) => {
    swipeStart.current = event.clientX;
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    if (swipeStart.current === null) return;
    const delta = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1);
  };

  if (artworks.length === 0) {
    return <EmptyGallery labels={labels} />;
  }

  return (
    <section id="art" className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12%] top-24 h-[30rem] w-[30rem] rounded-full bg-accent/5 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              <span className="h-px w-8 bg-accent" />
              {labels.label}
            </div>
            <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
              {labels.title}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm leading-relaxed text-muted md:text-base">{labels.intro}</p>
            <p className="mt-3 font-hand text-xl text-accent">{labels.hint}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label={labels.filterLabel}>
            {options.map((option) => {
              const isActive = filter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors",
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-line text-muted hover:border-accent/50 hover:text-foreground",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <p className="font-hand text-xl text-muted">{labels.note}</p>
        </div>

        {visible.length === 0 ? (
          <p className="mt-12 text-sm text-muted">{labels.noResults}</p>
        ) : (
          <motion.div
            key={filter}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((art, index) => {
              const plate =
                artworks.findIndex((item) => item.slug === art.slug) + 1;

              return (
                <button
                  key={art.slug}
                  type="button"
                  onClick={() => {
                    setDirection(1);
                    setActive(index);
                  }}
                  data-cursor="view"
                  aria-label={`${labels.view}: ${art.title}`}
                  className="group block w-full text-left"
                >
                  <div
                    className="art-frame p-2.5 pb-10"
                    style={{ "--tilt": tilts[index % tilts.length] } as CSSProperties}
                  >
                    <span className="tape -left-2 -top-2 h-5 w-16" aria-hidden="true" />

                    <div className="relative overflow-hidden border border-black/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={art.image}
                        alt={art.title}
                        width={art.width}
                        height={art.height}
                        loading="lazy"
                        decoding="async"
                        className="art-image h-auto w-full"
                      />
                      <span className="art-halftone" aria-hidden="true" />
                    </div>

                    <div className="px-1 pb-1 pt-4">
                      <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-[color:var(--art-muted)]">
                        <span>{labels.filters[art.category]}</span>
                        <span>{art.year}</span>
                      </div>
                      <h3 className="mt-2 font-display text-2xl leading-none tracking-tight text-[color:var(--art-fg)]">
                        {art.title}
                      </h3>
                      <p className="mt-2 text-[11px] text-[color:var(--art-muted)]">{art.medium}</p>
                    </div>

                    <span className="stamp absolute bottom-3 right-3 text-[color:var(--art-fg)]">
                      {labels.plate} {String(plate).padStart(2, "0")}
                    </span>
                  </div>
                </button>
                );
            })}
          </motion.div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className="art-dialog"
        data-lenis-prevent
        aria-labelledby="art-dialog-title"
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {current ? (
          <div className="art-dialog-panel mx-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-6xl flex-col overflow-y-auto rounded-3xl">
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-7">
              <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                <span className="text-accent">
                  {labels.plate}{" "}
                  {String(
                    artworks.findIndex((item) => item.slug === current.slug) + 1,
                  ).padStart(2, "0")}
                </span>
                <span aria-hidden="true">/</span>
                <span>{String(artworks.length).padStart(2, "0")}</span>
                <span className="hidden sm:inline">— {labels.filters[current.category]}</span>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={labels.close}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-accent/50 hover:text-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black/20 p-4 md:p-8"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => {
                swipeStart.current = null;
              }}
            >
              <div className="dialog-art-stage">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={current.slug}
                    custom={direction}
                    variants={artSlide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="dialog-art-frame max-h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={current.image}
                        alt={current.title}
                        width={current.width}
                        height={current.height}
                        className="dialog-art-image"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="grid gap-5 border-t border-line px-5 py-5 md:grid-cols-[1fr_auto] md:items-end md:px-7">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  {current.medium} / {current.year}
                </p>
                <h3
                  id="art-dialog-title"
                  className="mt-1 font-display text-3xl tracking-tight md:text-4xl"
                >
                  {current.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {current.description}
                </p>
              </motion.div>

              <div className="flex items-center gap-2 md:justify-end">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={labels.prev}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={labels.next}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
