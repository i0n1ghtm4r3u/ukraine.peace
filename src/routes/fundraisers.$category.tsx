import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FundraiserCard } from "@/components/fundraiser-card";
import {
  DIRECTIONS,
  directionHope,
  directionInfo,
  fundraisers,
  parseDirection,
} from "@/lib/content";

export const Route = createFileRoute("/fundraisers/$category")({
  loader: ({ params }) => {
    const direction = parseDirection(params.category);
    if (!direction) throw notFound();
    return { direction };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Fundraisers — ukraine.peace" }, { name: "robots", content: "noindex" }] };
    }
    const info = directionInfo[loaderData.direction];
    const title = `${info.title} — Fundraisers — ukraine.peace`;
    return {
      meta: [
        { title },
        { name: "description", content: info.text },
        { property: "og:title", content: title },
        { property: "og:description", content: info.text },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { direction } = Route.useLoaderData();
  const hope = directionHope[direction];
  const list = fundraisers.filter((f) => f.direction === direction);
  const other = DIRECTIONS.find((d) => d !== direction);

  return (
    <div className="theme-hope dawn min-h-screen">
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-40">
        <Link to="/fundraisers" className="eyebrow hover:text-bone">
          ← All fundraisers
        </Link>
        <p className="eyebrow mt-10 animate-slow-fade !text-ember">{hope.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl animate-slow-fade text-5xl leading-[1.05] text-bone md:text-6xl">
          {hope.title}
        </h1>
        <p className="mt-6 max-w-2xl animate-slow-fade text-base leading-relaxed text-muted-foreground">
          {hope.text}
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-16 md:grid-cols-3">
        {list.map((f) => (
          <FundraiserCard key={f.id} f={f} />
        ))}
      </section>

      {other && (
        <section className="mx-auto max-w-7xl px-6 pb-28">
          <Link
            to="/fundraisers/$category"
            params={{ category: other }}
            className="group block border-t border-border pt-8"
          >
            <span className="eyebrow">You can also help</span>
            <span className="mt-3 block font-display text-3xl text-bone">
              {directionInfo[other].title}{" "}
              <span className="inline-block text-ember transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </span>
          </Link>
        </section>
      )}
    </div>
  );
}
