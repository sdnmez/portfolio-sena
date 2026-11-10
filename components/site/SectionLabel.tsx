import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
      <span className="h-px w-8 bg-accent" />
      {children}
    </div>
  );
}
