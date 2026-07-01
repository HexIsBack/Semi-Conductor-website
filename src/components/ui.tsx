export function SectionHead({
  tag,
  title,
  desc,
}: {
  tag: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-2xl mb-14">
      <div className="tag-label mb-4">{tag}</div>
      <h2 className="font-[var(--font-display)] font-semibold text-3xl md:text-4xl tracking-tight mb-4">
        {title}
      </h2>
      {desc && <p className="text-ink-dim text-base leading-relaxed">{desc}</p>}
    </div>
  );
}

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-8 border-l border-line first:border-l-0">
      <div className="font-[var(--font-display)] font-semibold text-3xl md:text-4xl inline-block border-b-2 border-copper pb-1 mb-2">
        {value}
      </div>
      <div className="font-[var(--font-mono)] text-xs uppercase tracking-wider text-ink-dim">
        {label}
      </div>
    </div>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-[var(--font-mono)] text-xs border border-line px-3 py-1.5 rounded-[2px] text-ink-dim">
      {children}
    </span>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Passed: "text-ok border-ok/40",
    Failed: "text-warn border-warn/40",
    "Burning In": "text-amber border-amber/40",
    "In Queue": "text-ink-dim border-line",
    Retest: "text-copper border-copper/40",
  };
  return (
    <span
      className={`font-[var(--font-mono)] text-[11px] uppercase tracking-wide border px-2 py-1 rounded-[2px] whitespace-nowrap ${
        map[status] ?? "text-ink-dim border-line"
      }`}
    >
      {status}
    </span>
  );
}
