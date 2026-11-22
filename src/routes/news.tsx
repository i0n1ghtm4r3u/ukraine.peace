import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { formatDate, news } from "@/lib/content";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Latest news — ukraine.peace" },
      { name: "description", content: "News and reports about our deliveries of medicine, food and medical help." },
      { property: "og:title", content: "Latest news — ukraine.peace" },
      { property: "og:description", content: "Delivery reports and new fundraisers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <>
      <PageIntro
        eyebrow="News"
        title="Latest news"
        text="Delivery reports, new fundraisers and money reports. The posts below are examples. Real posts will replace them."
      />
      <section className="mx-auto max-w-4xl px-6 pb-28">
        <div className="divide-y divide-border border-y border-border">
          {news.map((n) => (
            <article key={n.id} className="py-10">
              <time className="font-mono text-xs text-muted-foreground">{formatDate(n.date)}</time>
              <h2 className="mt-3 text-3xl text-bone">{n.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{n.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
