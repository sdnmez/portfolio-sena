"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import type { Messages } from "@/messages/en";
import type { ResolvedPathEntry } from "@/types";

type PathTimelineProps = {
  entries: ResolvedPathEntry[];
  labels: Messages["path"];
};

function Track({
  title,
  items,
  progress,
  nowLabel,
}: {
  title: string;
  items: ResolvedPathEntry[];
  progress: ReturnType<typeof useSpring>;
  nowLabel: string;
}) {
  return (
    <div className="relative">
      <div className="mb-7 flex items-center gap-3">
        <h3 className="font-display text-2xl tracking-tight md:text-3xl">{title}</h3>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative ml-1 border-l border-line pl-7">
        <motion.div
          aria-hidden="true"
          style={{ scaleY: progress }}
          className="absolute -left-px top-0 h-full w-px origin-top bg-accent"
        />

        <div className="flex flex-col gap-9">
          {items.map((entry) => (
            <article key={entry.id} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[2.125rem] top-1.5 h-3 w-3 rounded-full border-2 border-background",
                  entry.current ? "bg-accent" : "bg-muted/40",
                )}
              />
              {entry.current ? (
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.6rem] top-0 h-6 w-6 animate-pulse-soft rounded-full bg-accent/20"
                />
              ) : null}

              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {entry.period}
              </p>
              <h4 className="mt-2 font-display text-2xl tracking-tight">{entry.title}</h4>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                {entry.org}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                {entry.description}
              </p>

              {entry.current ? (
                <span className="stamp mt-4 text-accent">{nowLabel}</span>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PathTimeline({ entries, labels }: PathTimelineProps) {
  const [tab, setTab] = useState<"study" | "work">("study");
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 55%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const study = entries.filter((entry) => entry.track === "study");
  const work = entries.filter((entry) => entry.track === "work");
  const tabs = [
    { value: "study" as const, label: labels.tabs.study, count: study.length },
    { value: "work" as const, label: labels.tabs.work, count: work.length },
  ];

  const onTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];

    setTab(nextTab.value);
    requestAnimationFrame(() => {
      document.getElementById(`path-tab-${nextTab.value}`)?.focus();
    });
  };

  return (
    <div ref={ref}>
      <div className="md:hidden">
        <div
          role="tablist"
          aria-label={labels.label}
          className="flex gap-2 rounded-full border border-line p-1"
        >
          {tabs.map((item, index) => {
            const isActive = tab === item.value;
            return (
              <button
                key={item.value}
                role="tab"
                type="button"
                id={`path-tab-${item.value}`}
                aria-selected={isActive}
                aria-controls={`path-panel-${item.value}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setTab(item.value)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors",
                  isActive ? "bg-foreground text-background" : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
                <span className="text-[8px] opacity-60">{String(item.count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            id={`path-panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`path-tab-${tab}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9"
          >
            <Track
              title={tab === "study" ? labels.studyTitle : labels.workTitle}
              items={tab === "study" ? study : work}
              progress={progress}
              nowLabel={labels.now}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hidden gap-14 md:grid md:grid-cols-2">
        <Track title={labels.studyTitle} items={study} progress={progress} nowLabel={labels.now} />
        <Track title={labels.workTitle} items={work} progress={progress} nowLabel={labels.now} />
      </div>
    </div>
  );
}
