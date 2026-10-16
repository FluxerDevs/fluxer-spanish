import type { Bot, BotCategory, BotLanguage, Community, CommunityTopic } from "@/lib/types";
import { normalize } from "@/lib/format";

export interface BotFilters {
  query: string;
  category: BotCategory | null;
  language: BotLanguage | null;
}

export function filterBots(bots: Bot[], { query, category, language }: BotFilters) {
  const needle = normalize(query.trim());
  return bots.filter(
    (bot) =>
      (!category || bot.categories.includes(category)) &&
      (!language || bot.language === language) &&
      (!needle || normalize(`${bot.name} ${bot.description}`).includes(needle)),
  );
}

export interface CommunityFilters {
  query: string;
  topic: CommunityTopic | null;
}

export function filterCommunities(
  communities: Community[],
  { query, topic }: CommunityFilters,
) {
  const needle = normalize(query.trim());
  return communities.filter(
    (community) =>
      (!topic || community.topics.includes(topic)) &&
      (!needle ||
        normalize(`${community.name} ${community.description} ${community.country}`).includes(
          needle,
        )),
  );
}

export function isOneOf<T extends string>(value: string | null, options: readonly T[]): value is T {
  return value !== null && (options as readonly string[]).includes(value);
}
