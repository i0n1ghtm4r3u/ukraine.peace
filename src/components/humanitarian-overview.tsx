import { useState } from "react";
import { ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  humanitarianStats,
  type HumanitarianStat,
} from "@/lib/humanitarian-stats";

function StatCard({ stat }: { stat: HumanitarianStat }) {
  return (
    <div className="flex flex-col gap-3 border border-border bg-card p-6">
      <p className="font-mono text-2xl text-bone md:text-3xl">{stat.value}</p>
      <h4 className="text-sm font-medium text-bone">{stat.label}</h4>
      <p className="text-sm leading-relaxed text-muted-foreground">{stat.note}</p>
      <dl className="mt-auto space-y-1 border-t border-border pt-3 font-mono text-[0.65rem] text-muted-foreground">
        <div className="flex flex-wrap justify-between gap-x-4">
          <dt>Source</dt>
          <dd className="text-right text-foreground/80">{stat.source}</dd>
        </div>
        <div className="flex flex-wrap justify-between gap-x-4">
          <dt>Published</dt>
          <dd className="text-right text-foreground/80">{stat.published}</dd>
        </div>
        <div className="flex flex-wrap justify-between gap-x-4">
          <dt>Period</dt>
          <dd className="text-right text-foreground/80">{stat.period}</dd>
        </div>
      </dl>
      <a
        href={stat.url}
        target="_blank"
        rel="noreferrer"
        className="font-mono text-[0.65rem] text-muted-foreground underline underline-offset-4 hover:text-bone"
      >
        Original source →
      </a>
    </div>
  );
}

/**
 * Compact, collapsed-by-default accordion so the figures are available to
 * every visitor without dominating the homepage. The whole heading row is
 * the keyboard-accessible trigger.
 */
export function HumanitarianOverview() {
  const [open, setOpen] = useState(false);

  return (
    <section aria-label="Humanitarian overview" className="mx-auto max-w-7xl px-6 pb-4">
      <AccordionPrimitive.Root
        type="single"
        collapsible
        value={open ? "overview" : ""}
        onValueChange={(value) => setOpen(value === "overview")}
      >
        <AccordionPrimitive.Item value="overview" className="border border-border bg-card">
          <AccordionPrimitive.Header asChild>
            <AccordionPrimitive.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              <span>
                <span className="eyebrow block">Verified figures</span>
                <span className="mt-1 block text-lg text-bone">Humanitarian Overview</span>
              </span>
              <ChevronDown
                aria-hidden
                className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="border-t border-border px-6 pb-6 pt-6">
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                The three figures below count different groups of people and are not
                interchangeable — none of them can be added together. Each links to the
                original source, with the date it was published and the period it covers.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {humanitarianStats.map((stat) => (
                  <StatCard key={stat.id} stat={stat} />
                ))}
              </div>
              <p className="mt-6 font-mono text-[0.65rem] text-muted-foreground">
                Figures are checked manually against the named sources. When a source publishes a
                new edition, the figure here is updated with its date — never estimated.
              </p>
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    </section>
  );
}
