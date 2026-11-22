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
    place: "Kharkiv",
    caption: "An apartment building on Kholodnohirska Street after an air strike. March 2022.",
    author: "Kharkivian",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Destroyed_apartment_building_3_Kholodnohirska_Street,_Kharkiv_after_Russian_airstrike_by_Kharkivian_(03.2022)_01.jpg",
  },
  {
    src: krasnodarska.url,
    place: "Kharkiv",
    caption: "A tall apartment building on Krasnodarska Street after shelling.",
    author: "Kharkivian",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Destroyed_apartment_building_177_Krasnodarska_Street,_Kharkiv_after_Russian_shelling_by_Kharkivian_(01).jpg",
  },
  {
    src: chernihiv.url,
    place: "Chernihiv",
    caption: "What is left of the Shchors cinema.",
    author: "Dimma837",
    license: "CC0",
    source:
      "https://commons.wikimedia.org/wiki/File:Chernihiv_Shchors_movie_theater_building_destroyed_01.jpg",
  },
  {
    src: irpin.url,
    place: "Irpin",
    caption: "A building of the State Tax University.",
    author: "Kisnaak",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:A_destroyed_National_State_Tax_Service_University_building_in_Irpin_after_the_invasion_of_Russian_troops_p2.jpg",
  },
  {
    src: buchmy.url,
    place: "Kharkiv",
    caption: "An apartment building on Buchmy Street.",
    author: "Kharkivian",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Destroyed_apartment_building_40a_Buchmy_Street,_Kharkiv_after_Russian_shelling_by_Kharkivian_(03).jpg",
  },
  {
    src: kyivSchool.url,
    place: "Kyiv region",
    caption: "A school yard after a strike. Broken glass and pieces of the building on the ground.",
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
// "fighters" covers medical care and recovery for wounded people only — never weapons or gear.

export const DIRECTIONS = ["civilians", "fighters"] as const;
export type Direction = (typeof DIRECTIONS)[number];

export const directionInfo: Record<Direction, { title: string; short: string; text: string }> = {
  civilians: {
    title: "Help for people hurt by the war",
    short: "Medicine and food",
    text: "Medicine, first aid kits, food boxes and drinking water. For families who lost their homes, for people who stayed and for refugees.",
  },
  fighters: {
    title: "Help for people who took part in the fighting",
    short: "Medical care and recovery",
    text: "Treatment for the wounded, rehabilitation, prosthetic limbs and help with stress and trauma. Only medical help — no weapons or equipment.",
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
  { id: "usdt", name: "USDT", network: "TRC-20", address: "USDT WALLET ADDRESS WILL BE HERE" },
  { id: "btc", name: "Bitcoin", network: "BTC", address: "BTC WALLET ADDRESS WILL BE HERE" },
  { id: "eth", name: "Ethereum", network: "ERC-20", address: "ETH WALLET ADDRESS WILL BE HERE" },
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
    direction: "civilians",
    title: "Insulin for the winter",
    place: "Areas near the front line",
    text: "Insulin and test strips for three winter months. For people with diabetes who cannot leave.",
    raised: 6420,
    goal: 15000,
  },
  {
    id: "food-kits-refugees",
    direction: "civilians",
    title: "Food boxes for families who lost their homes",
    place: "Temporary shelters",
    text: "Food for two weeks: rice and grains, tinned food, oil, baby food.",
    raised: 9870,
    goal: 12000,
  },
  {
    id: "first-aid-villages",
    direction: "civilians",
    title: "First aid kits for cut-off villages",
    place: "Villages with no pharmacy",
    text: "Simple first aid kits and bandages for villages where buses do not go any more.",
    raised: 2150,
    goal: 8000,
  },
  {
    id: "prosthetics-rehab",
    direction: "fighters",
    title: "Prosthetic limbs and rehabilitation",
    place: "Rehabilitation centres",
    text: "Prosthetic legs and arms and months of physiotherapy for people who were badly wounded.",
    raised: 4100,
    goal: 20000,
  },
];

export type NewsItem = { id: string; date: string; title: string; text: string };

export const news: NewsItem[] = [
  {
    id: "n1",
    date: "2026-11-20",
    title: "Example: report on a medicine delivery",
    text: "A real report will be here: what we bought, where we took it, with receipts and photos.",
  },
  {
    id: "n2",
    date: "2026-11-14",
    title: "Example: new fundraiser for food boxes",
    text: "News about a new fundraiser will be here: who it is for, how long it runs and how much money we need.",
  },
  {
    id: "n3",
    date: "2026-11-05",
    title: "Example: monthly money report",
    text: "A short report on money in and money out this month will be here, with links to documents.",
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
    kind: "Example · Report",
    title: "Can people who had to leave their homes get medicine?",
    authors: "Author and organisation will be added",
    text: "A real independent study will be here: how it was done, what it found and a link to the full text.",
  },
  {
    id: "r2",
    kind: "Example · Review",
    title: "Is there enough food in the areas hit by the war?",
    authors: "Author and organisation will be added",
    text: "A real review will be here: where the data comes from, the main numbers and a link to the source.",
  },
  {
    id: "r3",
    kind: "Example · Field notes",
    title: "Life in shelters: what people have and what they need",
    authors: "Author and organisation will be added",
    text: "A real report from independent observers or journalists will be here.",
  },
];

export function formatEur(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );
}
