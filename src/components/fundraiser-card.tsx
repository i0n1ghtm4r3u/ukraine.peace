import { Link } from "@tanstack/react-router";
import { directionInfo, formatEur, type Fundraiser } from "@/lib/content";

export function FundraiserCard({ f }: { f: Fundraiser }) {
  const pct = Math.min(100, Math.round((f.raised / f.goal) * 100));
  return (
    <article className="flex flex-col border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <span className="eyebrow">{directionInfo[f.direction].short}</span>
        <span className="font-mono text-[0.65rem] text-muted-foreground">example</span>
      </div>
      <h3 className="mt-4 text-2xl text-bone">{f.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{f.place}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
      <div className="mt-6">
        <div className="h-px w-full bg-border">
          <div className="h-px bg-ember" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-3 flex justify-between font-mono text-xs text-muted-foreground">
          <span className="text-bone">{formatEur(f.raised)}</span>
          <span>of {formatEur(f.goal)}</span>
        </div>
      </div>
      <Link
        to="/donate"
        search={{ direction: f.direction, fundraiser: f.id }}
        className="btn-ghost-bone mt-6"
      >
        Support
      </Link>
    </article>
  );
}
