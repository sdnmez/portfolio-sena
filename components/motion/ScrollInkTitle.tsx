"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollInkTitleProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollInkTitle({ children, className }: ScrollInkTitleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "start 38%"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const clipPath = useTransform(smooth, [0, 1], [
    "inset(-0.35em 100% -0.35em 0)",
    "inset(-0.35em 0% -0.35em 0)",
  ]);

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <span aria-hidden="true" className="title-base">
        {children}
      </span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 text-accent"
        style={{ clipPath: reduce ? "none" : clipPath }}
      >
        {children}
      </motion.span>
      <span className="sr-only">{children}</span>
    </span>
  );
}
