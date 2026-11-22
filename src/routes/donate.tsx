import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageIntro } from "@/components/page-intro";
import { cn } from "@/lib/utils";
import {
  DIRECTIONS,
  EUR_PRESETS,
  cryptoWallets,
  directionInfo,
  formatEur,
  fundraisers,
  parseDirection,
  type Direction,
  type PaymentMethod,
} from "@/lib/content";

type DonateSearch = { direction?: Direction; fundraiser?: string };

export const Route = createFileRoute("/donate")({
  validateSearch: (search: Record<string, unknown>): DonateSearch => {
    const out: DonateSearch = {};
    const direction = parseDirection(search["direction"]);
    if (direction) out.direction = direction;
    const fid = search["fundraiser"];
    if (typeof fid === "string" && fundraisers.some((f) => f.id === fid)) out.fundraiser = fid;
    return out;
  },
  head: () => ({
    meta: [
      { title: "Пожертвовать — ukraine.peace" },
      { name: "description", content: "Пожертвуйте на лекарства или продовольствие для пострадавших от войны и беженцев — в евро или криптовалюте." },
      { property: "og:title", content: "Пожертвовать — ukraine.peace" },
      { property: "og:description", content: "Лекарства или продовольствие. Евро или криптовалюта." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  const search = Route.useSearch();
  const fundraiser = fundraisers.find((f) => f.id === search.fundraiser);
  const [direction, setDirection] = useState<Direction>(
    search.direction ?? fundraiser?.direction ?? "medicine",
  );
  const [method, setMethod] = useState<PaymentMethod>("eur");
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [walletId, setWalletId] = useState(cryptoWallets[0]?.id ?? "");
  const [copied, setCopied] = useState(false);

  const finalAmount = custom ? Number(custom) : amount;
  const wallet = cryptoWallets.find((w) => w.id === walletId);

  return (
    <>
      <PageIntro
        eyebrow="Пожертвование"
        title="Ваш взнос — чья-то следующая неделя"
        text="Выберите, на что пойдут деньги, и удобный способ оплаты. Все средства идут только на гуманитарную помощь."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-28 lg:grid-cols-[1fr_380px]">
        <div className="space-y-14">
          {fundraiser && (
            <p className="border-l-2 border-ember pl-4 text-sm text-muted-foreground">
              Сбор: <span className="text-bone">{fundraiser.title}</span>
            </p>
          )}

          {/* Step 1 */}
          <fieldset>
            <legend className="eyebrow">01 · На что</legend>
            <div className="mt-5 grid gap-px bg-border sm:grid-cols-2">
              {DIRECTIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={direction === d}
                  onClick={() => setDirection(d)}
                  className={cn(
                    "bg-card p-7 text-left transition-colors",
                    direction === d ? "bg-accent outline outline-1 outline-ember" : "hover:bg-accent",
                  )}
                >
                  <span className="eyebrow">{directionInfo[d].short}</span>
                  <span className="mt-3 block font-display text-2xl text-bone">
                    {directionInfo[d].title}
                  </span>
                  <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">
                    {directionInfo[d].text}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Step 2 */}
          <fieldset>
            <legend className="eyebrow">02 · Способ оплаты</legend>
            <div className="mt-5 flex gap-px bg-border">
              {(
                [
                  ["eur", "Евро · карта"],
                  ["crypto", "Криптовалюта"],
                ] as const
              ).map(([m, label]) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={method === m}
                  onClick={() => {
                    setMethod(m);
                    setSubmitted(false);
                  }}
                  className={cn(
                    "flex-1 bg-card px-5 py-4 font-mono text-xs uppercase tracking-[0.18em] transition-colors",
                    method === m ? "bg-accent text-bone outline outline-1 outline-ember" : "text-muted-foreground hover:bg-accent",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Step 3 */}
          {method === "eur" ? (
            <fieldset>
              <legend className="eyebrow">03 · Сумма</legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {EUR_PRESETS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={!custom && amount === v}
                    onClick={() => {
                      setAmount(v);
                      setCustom("");
                    }}
                    className={cn(
                      "min-w-20 border px-5 py-3 font-mono text-sm transition-colors",
                      !custom && amount === v
                        ? "border-ember bg-accent text-bone"
                        : "border-border text-muted-foreground hover:border-ash",
                    )}
                  >
                    {formatEur(v)}
                  </button>
                ))}
                <label className="flex items-center border border-border px-4 focus-within:border-ember">
                  <span className="font-mono text-sm text-muted-foreground">€</span>
                  <input
                    inputMode="numeric"
                    placeholder="Другая сумма"
                    aria-label="Другая сумма в евро"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
                    className="w-32 bg-transparent px-2 py-3 font-mono text-sm text-bone outline-none placeholder:text-muted-foreground"
                  />
                </label>
              </div>
            </fieldset>
          ) : (
            <fieldset>
              <legend className="eyebrow">03 · Кошелёк</legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {cryptoWallets.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    aria-pressed={walletId === w.id}
                    onClick={() => {
                      setWalletId(w.id);
                      setCopied(false);
                    }}
                    className={cn(
                      "border px-5 py-3 font-mono text-sm transition-colors",
                      walletId === w.id
                        ? "border-ember bg-accent text-bone"
                        : "border-border text-muted-foreground hover:border-ash",
                    )}
                  >
                    {w.name} <span className="text-xs opacity-60">{w.network}</span>
                  </button>
                ))}
              </div>
              {wallet && (
                <div className="mt-6 border border-border bg-card p-6">
                  <p className="eyebrow">
                    Адрес {wallet.name} · сеть {wallet.network}
                  </p>
                  <p className="mt-3 break-all font-mono text-sm text-bone">{wallet.address}</p>
                  <button
                    type="button"
                    className="btn-ghost-bone mt-5"
                    onClick={() => {
                      void navigator.clipboard?.writeText(wallet.address);
                      setCopied(true);
                    }}
                  >
                    {copied ? "Скопировано" : "Скопировать адрес"}
                  </button>
                  <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                    Отправляйте только {wallet.name} в сети {wallet.network}. Перевод в другой сети
                    может быть потерян. В комментарии к переводу можно указать направление:{" "}
                    {directionInfo[direction].title.toLowerCase()}.
                  </p>
                </div>
              )}
            </fieldset>
          )}
        </div>

        {/* Summary */}
        <aside className="h-fit border border-border bg-card p-8 lg:sticky lg:top-8">
          <p className="eyebrow">Итог</p>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Направление</dt>
              <dd className="text-bone">{directionInfo[direction].title}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Способ</dt>
              <dd className="text-bone">{method === "eur" ? "Евро · карта" : `Крипто · ${wallet?.name ?? ""}`}</dd>
            </div>
            {method === "eur" && (
              <div className="flex justify-between gap-4 border-t border-border pt-4">
                <dt className="text-muted-foreground">Сумма</dt>
                <dd className="font-display text-3xl text-bone">
                  {finalAmount > 0 ? formatEur(finalAmount) : "—"}
                </dd>
              </div>
            )}
          </dl>

          {method === "eur" ? (
            submitted ? (
              <p className="mt-8 border-l-2 border-ember pl-4 text-sm leading-relaxed text-muted-foreground">
                Спасибо. Оплата картой ещё не подключена — деньги не списаны. Скоро здесь
                появится настоящая оплата.
              </p>
            ) : (
              <button
                type="button"
                disabled={!(finalAmount > 0)}
                onClick={() => setSubmitted(true)}
                className="btn-ember mt-8 w-full disabled:opacity-40"
              >
                Пожертвовать {finalAmount > 0 ? formatEur(finalAmount) : ""}
              </button>
            )
          ) : (
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              Переведите любую сумму на адрес слева. Поступления отражаются в ежемесячном отчёте.
            </p>
          )}
        </aside>
      </section>
    </>
  );
}
