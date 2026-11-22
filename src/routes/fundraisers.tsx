import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { FundraiserCard } from "@/components/fundraiser-card";
import { fundraisers } from "@/lib/content";

export const Route = createFileRoute("/fundraisers")({
  head: () => ({
    meta: [
      { title: "Fundraisers — ukraine.peace" },
      { name: "description", content: "Open fundraisers for medicine, food and medical care for people hurt by the war." },
      { property: "og:title", content: "Fundraisers — ukraine.peace" },
      { property: "og:description", content: "Open fundraisers for medicine, food and medical care." },
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
        eyebrow="Fundraisers"
        title="Each fundraiser helps real people with a real need"
        text="Only medicine, food and medical care. No weapons. For each fundraiser we share a report with receipts. The amounts below are examples."
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-28 md:grid-cols-2">
        {fundraisers.map((f) => (
          <FundraiserCard key={f.id} f={f} />
        ))}
      </section>
    </>
  );
}
