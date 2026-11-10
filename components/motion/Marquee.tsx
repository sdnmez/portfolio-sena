import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
};

export function Marquee({ items, className }: MarqueeProps) {
  const content = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "group relative flex overflow-hidden border-y border-line bg-background/40 py-3.5",
        className,
      )}
    >
      <div className="animate-marquee flex min-w-max items-center group-hover:[animation-play-state:paused]">
        {content.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-6 px-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
          >
            <span className="h-1 w-1 rounded-full bg-accent" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
