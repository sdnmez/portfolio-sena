import { cn } from "@/lib/utils";

type AnimatedWordsProps = {
  text: string;
  className?: string;
  delay?: number;
  clip?: boolean;
};

export function AnimatedWords({ text, className, delay = 0, clip = true }: AnimatedWordsProps) {
  const words = text.split(" ");

  return (
    <span className={cn("inline", className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={cn(
            "inline-block align-bottom",
            clip ? "overflow-hidden pb-[0.08em]" : "overflow-visible",
          )}
          data-word
        >
          <span
            className={cn(clip ? "word-reveal" : "word-fade", "inline-block")}
            style={{ animationDelay: `${delay + index * 0.065}s` }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : null}
          </span>
        </span>
      ))}
    </span>
  );
}
