import { useQuery } from "@tanstack/react-query";
import {
  fetchMediaNews,
  MEDIA_SOURCES,
  type FeedArticle,
} from "@/lib/media-news";

function ArticleRow({ article }: { article: FeedArticle }) {
  return (
    <article className="grid gap-2 py-7 md:grid-cols-[180px_1fr]">
      <div>
        <time className="font-mono text-xs text-muted-foreground" dateTime={article.publishedAt}>
          {new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(article.publishedAt))}
        </time>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{article.publisher}</p>
      </div>
      <div>
        <h3 className="text-xl text-bone">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            {article.title}
          </a>
        </h3>
        {article.excerpt && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
        )}
        <p className="mt-2 font-mono text-[0.65rem] text-muted-foreground">
          via {article.publisher} — opens on the publisher's site
        </p>
      </div>
    </article>
  );
}

/**
 * Aggregates official RSS feeds of independent outlets through a server
 * function. Shows titles, short excerpts and links only — no full articles,
 * no fabricated items: a source that fails simply does not appear, and the
 * section reports which sources could not be fetched.
 */
export function MediaNews() {
  const { data, isPending, isError, refetch, isRefetching } = useQuery({
    queryKey: ["media-news"],
    queryFn: () => fetchMediaNews(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Independent media</p>
            <h2 className="mt-4 text-4xl text-bone md:text-5xl">Latest News</h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Recent articles from independent outlets, shown with the publisher's name and a link
              to the original. We publish headlines and short excerpts only.
            </p>
          </div>
          {MEDIA_SOURCES.filter((s) => s.enabled).length > 0 && (
            <p className="font-mono text-[0.65rem] text-muted-foreground">
              Sources:{" "}
              {MEDIA_SOURCES.filter((s) => s.enabled)
                .map((s) => s.name)
                .join(" · ")}
            </p>
          )}
        </div>

        {isPending ? (
          <div className="mt-12 divide-y divide-border border-y border-border" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="grid gap-2 py-7 md:grid-cols-[180px_1fr]">
                <div className="h-4 w-28 animate-pulse rounded bg-accent" />
                <div className="space-y-2">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-accent" />
                  <div className="h-4 w-full animate-pulse rounded bg-accent" />
                </div>
              </div>
            ))}
          </div>
        ) : isError || !data ? (
          <div className="mt-12 border-y border-border py-10 text-center">
            <p className="text-muted-foreground">
              The news could not be loaded right now. The rest of the site still works.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isRefetching}
              className="btn-ghost-bone mt-6 disabled:opacity-60"
            >
              {isRefetching ? "Loading…" : "Try again"}
            </button>
          </div>
        ) : data.articles.length === 0 ? (
          <div className="mt-12 border-y border-border py-10 text-center">
            <p className="text-muted-foreground">
              No articles are available from the enabled sources at the moment. This is not filled
              in with other content.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-12 divide-y divide-border border-y border-border">
              {data.articles.map((article) => (
                <ArticleRow key={article.id} article={article} />
              ))}
            </div>
            {data.sourceErrors.length > 0 && (
              <p className="mt-4 font-mono text-[0.65rem] text-muted-foreground">
                Some sources could not be reached and are omitted: {data.sourceErrors.join("; ")}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
