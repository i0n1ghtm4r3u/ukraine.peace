export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-14 pt-40">
      <p className="eyebrow animate-slow-fade">{eyebrow}</p>
      <h1 className="mt-5 max-w-3xl animate-slow-fade text-5xl leading-[1.05] text-bone md:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl animate-slow-fade text-base leading-relaxed text-muted-foreground">
        {text}
      </p>
    </section>
  );
}
