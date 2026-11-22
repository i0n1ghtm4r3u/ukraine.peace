import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { FundraiserCard } from "@/components/fundraiser-card";
import { fundraisers } from "@/lib/content";

export const Route = createFileRoute("/fundraisers")({
  head: () => ({
    meta: [
      { title: "Сборы — ukraine.peace" },
      { name: "description", content: "Открытые сборы на лекарства и продовольствие для пострадавших от войны и беженцев." },
      { property: "og:title", content: "Сборы — ukraine.peace" },
      { property: "og:description", content: "Открытые сборы на лекарства и продовольствие." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FundraisersPage,
});

function FundraisersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Сборы"
        title="Каждый сбор — конкретная нужда конкретных людей"
        text="Только гуманитарные цели: лекарства и продовольствие. По каждому сбору публикуем отчёт с чеками. Суммы ниже — примеры."
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-28 md:grid-cols-2">
        {fundraisers.map((f) => (
          <FundraiserCard key={f.id} f={f} />
        ))}
      </section>
    </>
  );
}
