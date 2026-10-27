import { getCollection } from "astro:content";
import type { GuideSummary } from "@/lib/types";
import { href } from "@/lib/url";

/** Guides (docs pages with a level) in sidebar order, as card data. */
export async function getGuides(): Promise<GuideSummary[]> {
  const entries = await getCollection("docs", (entry) => entry.data.level !== undefined);
  return entries
    .sort((a, b) => (a.data.sidebar.order ?? 0) - (b.data.sidebar.order ?? 0))
    .map((entry) => ({
      id: entry.id,
      href: href(`/${entry.id}`),
      title: entry.data.title,
      description: entry.data.description ?? "",
      level: entry.data.level!,
      readMinutes: entry.data.readMinutes,
    }));
}
