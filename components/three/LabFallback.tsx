type LabFallbackProps = {
  label: string;
};

export function LabFallback({ label }: LabFallbackProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
      <div className="relative h-40 w-40" aria-hidden="true">
        <div className="absolute inset-0 rounded-full border border-accent/40" />
        <div className="absolute inset-4 rotate-45 rounded-full border border-accent-2/40" />
        <div className="absolute inset-8 -rotate-12 rounded-full border border-ink/20" />
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">
          R3F / offline
        </span>
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55">{label}</p>
    </div>
  );
}
