import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { research } from "@/lib/content";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Независимые исследования — ukraine.peace" },
      { name: "description", content: "Независимые исследования и отчёты о гуманитарном положении пострадавших от войны." },
      { property: "og:title", content: "Независимые исследования — ukraine.peace" },
      { property: "og:description", content: "Доклады, обзоры и полевые наблюдения независимых авторов." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <>
      <PageIntro
        eyebrow="Исследования"
        title="Независимые исследования"
        text="Доклады, обзоры и полевые наблюдения, которые помогают понять, где помощь нужнее всего. Ниже — образцы, которые будут заменены реальными материалами со ссылками на первоисточники."
      />
      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="divide-y divide-border border-y border-border">
          {research.map((r, i) => (
            <article key={r.id} className="grid gap-4 py-10 md:grid-cols-[80px_1fr_220px]">
              <span className="font-mono text-xs text-ember">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="eyebrow">{r.kind}</p>
                <h2 className="mt-3 text-3xl text-bone">{r.title}</h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
              <p className="text-sm text-muted-foreground md:text-right">{r.authors}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
