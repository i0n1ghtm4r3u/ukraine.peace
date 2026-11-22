import { createFileRoute, Link } from "@tanstack/react-router";
import { PhotoFigure } from "@/components/photo-figure";
import { FundraiserCard } from "@/components/fundraiser-card";
import {
  DIRECTIONS,
  directionInfo,
  formatDate,
  fundraisers,
  heroShareImage,
  news,
  photos,
} from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ukraine.peace — помощь пострадавшим от войны" },
      {
        name: "description",
        content:
          "Пожертвования на лекарства и продовольствие для пострадавших от войны в Украине и беженцев. Евро или криптовалюта.",
      },
      { property: "og:title", content: "ukraine.peace — помощь пострадавшим от войны" },
      {
        property: "og:description",
        content: "Лекарства и еда для тех, кто остался среди руин. Сборы, новости, исследования.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: heroShareImage },
      { name: "twitter:image", content: heroShareImage },
    ],
  }),
  component: Index,
});

function Index() {
  const [hero, ...rest] = photos;
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        {hero && (
          <img
            src={hero.src}
            alt={`${hero.place}. ${hero.caption}`}
            className="photo-grade absolute inset-0 h-full w-full animate-drift object-cover"
          />
        )}
        <div className="veil absolute inset-0" />
        <div className="vignette absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20">
          <p className="eyebrow animate-slow-fade">{hero?.place} · 2022</p>
          <h1 className="mt-6 max-w-4xl animate-slow-fade text-6xl leading-[0.98] text-bone md:text-8xl">
            Здесь жили люди.
          </h1>
          <p className="mt-8 max-w-xl animate-slow-fade text-lg leading-relaxed text-foreground/80">
            Кто-то из них до сих пор здесь — без воды, без лекарств, без дома. Мы собираем
            помощь тем, кто остался, и тем, кому пришлось уйти.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/donate" className="btn-ember">
              Пожертвовать
            </Link>
            <Link to="/fundraisers" className="btn-ghost-bone">
              Открытые сборы
            </Link>
          </div>
          {hero && (
            <a
              href={hero.source}
              target="_blank"
              rel="noreferrer"
              className="mt-16 block font-mono text-[0.65rem] text-muted-foreground hover:underline"
            >
              {hero.caption} Фото: {hero.author} · {hero.license}
            </a>
          )}
        </div>
      </section>

      {/* Chronicle */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-end">
          <div>
            <p className="eyebrow">Хроника</p>
            <h2 className="mt-4 text-4xl text-bone md:text-5xl">То, что осталось</h2>
          </div>
          <p className="max-w-xl text-muted-foreground md:justify-self-end">
            Настоящие снимки независимых фотографов. Дома, школы, кинотеатр, университет. За
            каждым окном — чья-то жизнь, которой больше нет.
          </p>
        </div>
        <div className="mt-14 grid gap-3 md:grid-cols-6">
          {rest.map((p, i) => (
            <PhotoFigure
              key={p.source}
              photo={p}
              className={
                i === 0
                  ? "aspect-[4/3] md:col-span-4 md:row-span-2 md:aspect-auto"
                  : i === 1
                    ? "aspect-[4/3] md:col-span-2"
                    : i === 2
                      ? "aspect-[4/3] md:col-span-2"
                      : "aspect-[16/9] md:col-span-3"
              }
            />
          ))}
        </div>
      </section>

      {/* Directions */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <p className="eyebrow">Куда идут деньги</p>
          <h2 className="mt-4 max-w-2xl text-4xl text-bone md:text-5xl">
            Вы выбираете, на что пойдёт ваш взнос
          </h2>
          <div className="mt-14 grid gap-px bg-border md:grid-cols-2">
            {DIRECTIONS.map((d, i) => (
              <div key={d} className="flex flex-col bg-card p-10">
                <span className="font-mono text-xs text-ember">0{i + 1}</span>
                <h3 className="mt-6 text-3xl text-bone">{directionInfo[d].title}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                  {directionInfo[d].text}
                </p>
                <Link to="/donate" search={{ direction: d }} className="btn-ghost-bone mt-8 self-start">
                  Помочь: {directionInfo[d].title.toLowerCase()}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fundraisers */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Сборы</p>
            <h2 className="mt-4 text-4xl text-bone md:text-5xl">Сейчас не хватает</h2>
          </div>
          <Link to="/fundraisers" className="eyebrow hover:text-bone">
            Все сборы →
          </Link>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {fundraisers.slice(0, 3).map((f) => (
            <FundraiserCard key={f.id} f={f} />
          ))}
        </div>
      </section>

      {/* News */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Последние новости</p>
              <h2 className="mt-4 text-4xl text-bone md:text-5xl">С мест</h2>
            </div>
            <Link to="/news" className="eyebrow hover:text-bone">
              Все новости →
            </Link>
          </div>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {news.map((n) => (
              <article key={n.id} className="grid gap-2 py-7 md:grid-cols-[180px_1fr]">
                <time className="font-mono text-xs text-muted-foreground">{formatDate(n.date)}</time>
                <div>
                  <h3 className="text-xl text-bone">{n.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{n.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
