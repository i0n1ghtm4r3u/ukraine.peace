import { createFileRoute, Link } from "@tanstack/react-router";
import { DIRECTIONS, directionInfo, formatEur, fundraisers } from "@/lib/content";

export const Route = createFileRoute("/fundraisers/")({
  head: () => ({
    meta: [
      { title: "Fundraisers — ukraine.peace" },
      { name: "description", content: "Choose who you want to help: people hurt by the war, or wounded people who took part in the fighting." },
      { property: "og:title", content: "Fundraisers — ukraine.peace" },
      { property: "og:description", content: "Two ways to help. Medicine, food and medical care only." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FundraisersFork,
});

function FundraisersFork() {
  return (
    <div className="theme-hope dawn min-h-screen">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-40">
        <p className="eyebrow animate-slow-fade">Fundraisers</p>
        <h1 className="mt-5 max-w-3xl animate-slow-fade text-5xl leading-[1.05] text-bone md:text-6xl">
          Help is already on its way. You can make it go further.
        </h1>
        <p className="mt-6 max-w-2xl animate-slow-fade text-base leading-relaxed text-muted-foreground">
          Choose who you want to help. Every fundraiser has a clear goal, and we share a report
          with receipts when it ends. The amounts are examples for now.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-28 md:grid-cols-2">
        {DIRECTIONS.map((d) => {
          const list = fundraisers.filter((f) => f.direction === d);
          const raised = list.reduce((sum, f) => sum + f.raised, 0);
          return (
            <Link
              key={d}
              to="/fundraisers/$category"
              params={{ category: d }}
              className="group flex min-h-[420px] flex-col justify-between border border-border bg-card p-10 transition-colors duration-500 hover:border-ember hover:bg-accent"
            >
              <div>
                <span className="eyebrow">{directionInfo[d].short}</span>
                <h2 className="mt-6 text-4xl leading-tight text-bone">
                  {directionInfo[d].title}{" "}
                  <span className="inline-block text-ember transition-transform duration-500 group-hover:translate-x-2">
                    →
                  </span>
                </h2>
                <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
                  {directionInfo[d].text}
                </p>
              </div>
              <div className="mt-10 flex gap-10 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
                <span>
                  <span className="block text-2xl text-bone">{list.length}</span>
                  open fundraisers
                </span>
                <span>
                  <span className="block text-2xl text-bone">{formatEur(raised)}</span>
                  raised so far (example)
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
