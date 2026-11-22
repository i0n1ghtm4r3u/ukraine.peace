import krasnodarska from "@/assets/photos/kharkiv-krasnodarska.jpg.asset.json";
import kholodnohirska from "@/assets/photos/kharkiv-kholodnohirska.jpg.asset.json";
import buchmy from "@/assets/photos/kharkiv-buchmy.jpg.asset.json";
import chernihiv from "@/assets/photos/chernihiv-cinema.jpg.asset.json";
import irpin from "@/assets/photos/irpin-university.jpg.asset.json";
import kyivSchool from "@/assets/photos/kyiv-oblast-school.jpg.asset.json";

/* ---------- Photos: real, freely licensed, always credited ---------- */

export type Photo = {
  src: string;
  place: string;
  caption: string;
  author: string;
  license: string;
  source: string;
};

export const photos: Photo[] = [
  {
    src: kholodnohirska.url,
    place: "Харьков",
    caption: "Жилой дом на улице Холодногорской, 3, после авиаудара. Март 2022.",
    author: "Kharkivian",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Destroyed_apartment_building_3_Kholodnohirska_Street,_Kharkiv_after_Russian_airstrike_by_Kharkivian_(03.2022)_01.jpg",
  },
  {
    src: krasnodarska.url,
    place: "Харьков",
    caption: "Многоэтажный дом на улице Краснодарской, 177, после обстрела.",
    author: "Kharkivian",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Destroyed_apartment_building_177_Krasnodarska_Street,_Kharkiv_after_Russian_shelling_by_Kharkivian_(01).jpg",
  },
  {
    src: chernihiv.url,
    place: "Чернигов",
    caption: "Руины здания кинотеатра имени Щорса.",
    author: "Dimma837",
    license: "CC0",
    source:
      "https://commons.wikimedia.org/wiki/File:Chernihiv_Shchors_movie_theater_building_destroyed_01.jpg",
  },
  {
    src: irpin.url,
    place: "Ирпень",
    caption: "Корпус университета государственной налоговой службы.",
    author: "Kisnaak",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:A_destroyed_National_State_Tax_Service_University_building_in_Irpin_after_the_invasion_of_Russian_troops_p2.jpg",
  },
  {
    src: buchmy.url,
    place: "Харьков",
    caption: "Жилой дом на улице Бучмы, 40а.",
    author: "Kharkivian",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Destroyed_apartment_building_40a_Buchmy_Street,_Kharkiv_after_Russian_shelling_by_Kharkivian_(03).jpg",
  },
  {
    src: kyivSchool.url,
    place: "Киевская область",
    caption: "Школьный двор после удара. Осколки стекла и обломки на земле.",
    author: "Kisnaak",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:A_destroyed_school_building_in_Kyiv_oblast_after_the_invasion_of_Russian_troops_p1.jpg",
  },
];

/** Absolute URL of the hero photo, used for social previews. */
export const heroShareImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Destroyed_apartment_building_3_Kholodnohirska_Street%2C_Kharkiv_after_Russian_airstrike_by_Kharkivian_%2803.2022%29_01.jpg/1280px-Destroyed_apartment_building_3_Kholodnohirska_Street%2C_Kharkiv_after_Russian_airstrike_by_Kharkivian_%2803.2022%29_01.jpg";

/* ---------- Donation directions: humanitarian only ---------- */

export const DIRECTIONS = ["medicine", "food"] as const;
export type Direction = (typeof DIRECTIONS)[number];

export const directionInfo: Record<Direction, { title: string; short: string; text: string }> = {
  medicine: {
    title: "Лекарства",
    short: "Препараты и медпомощь",
    text: "Инсулин, антибиотики, обезболивающие, перевязочные материалы и аптечки для больниц, пунктов помощи и семей, оставшихся без доступа к аптекам.",
  },
  food: {
    title: "Продовольствие",
    short: "Еда и вода",
    text: "Продуктовые наборы, питьевая вода и детское питание для пострадавших, переселенцев и беженцев.",
  },
};

export function parseDirection(value: unknown): Direction | undefined {
  return typeof value === "string" && (DIRECTIONS as readonly string[]).includes(value)
    ? (value as Direction)
    : undefined;
}

/* ---------- Payment methods ---------- */

export const PAYMENT_METHODS = ["eur", "crypto"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const EUR_PRESETS = [10, 25, 50, 100, 250] as const;

export type CryptoWallet = { id: string; name: string; network: string; address: string };

// Placeholder addresses — replace with the organisation's real wallets before launch.
export const cryptoWallets: CryptoWallet[] = [
  { id: "usdt", name: "USDT", network: "TRC-20", address: "АДРЕС КОШЕЛЬКА USDT БУДЕТ ЗДЕСЬ" },
  { id: "btc", name: "Bitcoin", network: "BTC", address: "АДРЕС КОШЕЛЬКА BTC БУДЕТ ЗДЕСЬ" },
  { id: "eth", name: "Ethereum", network: "ERC-20", address: "АДРЕС КОШЕЛЬКА ETH БУДЕТ ЗДЕСЬ" },
];

/* ---------- Sample content (clearly marked as examples) ---------- */

export type Fundraiser = {
  id: string;
  direction: Direction;
  title: string;
  place: string;
  text: string;
  raised: number;
  goal: number;
};

export const fundraisers: Fundraiser[] = [
  {
    id: "insulin-winter",
    direction: "medicine",
    title: "Инсулин на зиму",
    place: "Прифронтовые районы",
    text: "Запас инсулина и тест-полосок на три зимних месяца для людей с диабетом, которые не могут выехать.",
    raised: 6420,
    goal: 15000,
  },
  {
    id: "food-kits-refugees",
    direction: "food",
    title: "Продуктовые наборы для переселенцев",
    place: "Пункты временного размещения",
    text: "Наборы на две недели для семей, потерявших дом: крупы, консервы, масло, детское питание.",
    raised: 9870,
    goal: 12000,
  },
  {
    id: "first-aid-villages",
    direction: "medicine",
    title: "Аптечки для отрезанных сёл",
    place: "Сёла без аптек",
    text: "Базовые аптечки и перевязочные материалы для сёл, куда больше не ходит транспорт.",
    raised: 2150,
    goal: 8000,
  },
  {
    id: "water-shelters",
    direction: "food",
    title: "Питьевая вода для укрытий",
    place: "Города без водоснабжения",
    text: "Бутилированная вода и фильтры для подвалов и укрытий, где люди живут неделями.",
    raised: 3300,
    goal: 6000,
  },
];

export type NewsItem = { id: string; date: string; title: string; text: string };

export const news: NewsItem[] = [
  {
    id: "n1",
    date: "2026-11-20",
    title: "Пример: отчёт о передаче лекарств",
    text: "Здесь будет реальный отчёт: что закуплено, куда доставлено, с чеками и фотографиями.",
  },
  {
    id: "n2",
    date: "2026-11-14",
    title: "Пример: новый сбор на продуктовые наборы",
    text: "Здесь будет новость о запуске сбора — для кого, на какой срок и какая сумма нужна.",
  },
  {
    id: "n3",
    date: "2026-11-05",
    title: "Пример: ежемесячный финансовый отчёт",
    text: "Здесь будет сводка поступлений и расходов за месяц со ссылкой на документы.",
  },
];

export type Research = {
  id: string;
  kind: string;
  title: string;
  authors: string;
  text: string;
};

export const research: Research[] = [
  {
    id: "r1",
    kind: "Образец · Доклад",
    title: "Доступ к лекарствам у вынужденных переселенцев",
    authors: "Автор и организация будут указаны",
    text: "Место для реального независимого исследования: методика, выводы и ссылка на полный текст.",
  },
  {
    id: "r2",
    kind: "Образец · Обзор",
    title: "Продовольственная безопасность в пострадавших районах",
    authors: "Автор и организация будут указаны",
    text: "Место для реального обзора: источники данных, ключевые цифры и ссылка на первоисточник.",
  },
  {
    id: "r3",
    kind: "Образец · Полевое наблюдение",
    title: "Жизнь в укрытиях: условия и потребности",
    authors: "Автор и организация будут указаны",
    text: "Место для реального полевого отчёта независимых наблюдателей или журналистов.",
  },
];

export function formatEur(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );
}
