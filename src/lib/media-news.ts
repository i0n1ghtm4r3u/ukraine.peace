import { createServerFn } from "@tanstack/react-start";

/**
 * Configurable list of independent media outlets. Only sources with an
 * official, working feed are enabled — never enable a source whose feed
 * does not respond, and never fabricate items for one that does not.
 */
export type MediaSource = {
  id: string;
  name: string;
  feedUrl: string;
  enabled: boolean;
  note?: string;
};

export const MEDIA_SOURCES: MediaSource[] = [
  {
    id: "kyiv-independent",
    name: "The Kyiv Independent",
    feedUrl: "https://kyivindependent.com/feed/",
    enabled: false,
    note: "No official RSS feed available (the feed URL returns 404 as of November 2026). Re-enable once the outlet publishes a working feed — do not substitute scraping.",
  },
  {
    id: "new-humanitarian",
    name: "The New Humanitarian",
    feedUrl: "https://www.thenewhumanitarian.org/rss.xml",
    enabled: true,
  },
  {
    id: "bellingcat",
    name: "Bellingcat",
    feedUrl: "https://www.bellingcat.com/feed/",
    enabled: true,
  },
  {
    id: "meduza",
    name: "Meduza",
    feedUrl: "https://meduza.io/rss/all",
    enabled: true,
  },
];

export type FeedArticle = {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publisher: string;
  publishedAt: string;
};

export type MediaNewsResult = {
  articles: FeedArticle[];
  sourceErrors: string[];
};

const ITEMS_PER_SOURCE = 4;

function tagValue(block: string, tag: string): string | undefined {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}\\s*>`, "i"));
  return match?.[1];
}

function cleanText(raw: string | undefined): string {
  if (!raw) return "";
  const decoded = raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&apos;/g, "'");
  return decoded.replace(/\s+/g, " ").trim();
}

function excerptFrom(raw: string | undefined): string {
  const text = cleanText(raw);
  if (text.length <= 220) return text;
  const cut = text.slice(0, 220);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function parseRss(xml: string, source: MediaSource): FeedArticle[] {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  const articles: FeedArticle[] = [];
  for (const item of items) {
    const title = cleanText(tagValue(item, "title"));
    const link = cleanText(tagValue(item, "link"));
    if (!title || !/^https?:\/\//i.test(link)) continue;
    const parsedDate = new Date(cleanText(tagValue(item, "pubDate")));
    if (Number.isNaN(parsedDate.getTime())) continue;
    articles.push({
      id: `${source.id}:${link}`,
      title,
      excerpt: excerptFrom(tagValue(item, "description")),
      url: link,
      publisher: source.name,
      publishedAt: parsedDate.toISOString(),
    });
  }
  return articles;
}

/**
 * Runs on the server only: browsers cannot fetch cross-origin RSS feeds,
 * and routing the fetches through the server keeps publisher feed URLs and
 * CORS handling in one place. Returns whatever sources responded — a failed
 * source is reported, never filled in with invented content.
 */
export const fetchMediaNews = createServerFn({ method: "GET" }).handler(
  async (): Promise<MediaNewsResult> => {
    const articles: FeedArticle[] = [];
    const sourceErrors: string[] = [];

    await Promise.all(
      MEDIA_SOURCES.filter((source) => source.enabled).map(async (source) => {
        try {
          const response = await fetch(source.feedUrl, {
            headers: {
              "User-Agent": "ukraine-peace/1.0 (homepage news aggregator)",
              Accept: "application/rss+xml, application/xml, text/xml",
            },
            signal: AbortSignal.timeout(8000),
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const parsed = parseRss(await response.text(), source).slice(0, ITEMS_PER_SOURCE);
          if (parsed.length === 0) throw new Error("feed returned no usable items");
          articles.push(...parsed);
        } catch (error) {
          sourceErrors.push(`${source.name}: ${error instanceof Error ? error.message : "failed"}`);
        }
      }),
    );

    articles.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
    return { articles, sourceErrors };
  },
);
