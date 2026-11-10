"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import type { Messages } from "@/messages/en";

type CursorProps = {
  labels: Messages["cursor"];
};

export function Cursor({ labels }: CursorProps) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.35 });

  useEffect(() => {
    if (reduce) return;

    const query = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement | null;
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor]");
      const cursorType = cursorTarget?.dataset.cursor;

      if (cursorType === "view" || cursorType === "drag" || cursorType === "open") {
        setLabel(labels[cursorType]);
      } else {
        setLabel(null);
      }

      setHovering(Boolean(target?.closest("a, button, [data-cursor]")));
    };

    const handlePointerLeave = () => {
      setHovering(false);
      setLabel(null);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [enabled, labels, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 2.1 : 1,
          opacity: hovering ? 0.9 : 0.45,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="pointer-events-none fixed left-0 top-0 z-[99] -ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-accent/70"
      />
      <motion.span
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.9 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed left-0 top-0 z-[99] ml-5 mt-5 rounded-full border border-accent/40 bg-background/80 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-accent backdrop-blur"
      >
        {label}
      </motion.span>
    </>
  );
}
