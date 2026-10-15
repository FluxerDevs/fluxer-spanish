export type UpdateKind = "feature" | "build";

export interface ChangelogSection {
  title: "Nuevo" | "Mejoras" | "Correcciones";
  items: string[];
}

export interface Update {
  slug: string;
  kind: UpdateKind;
  title: string;
  summary: string;
  /** ISO date (YYYY-MM-DD) of the original announcement. */
  date: string;
  /** Person who published the original announcement. */
  author: string;
  version?: string;
  originalUrl: string;
  translatedBy: string;
  sections: ChangelogSection[];
}

export type GuideLevel = "beginner" | "admin";

export type GuideBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "tip"; title: string; text: string };

export interface Guide {
  slug: string;
  level: GuideLevel;
  title: string;
  summary: string;
  readMinutes: number;
  body: GuideBlock[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** How well a bot speaks Spanish. */
export type BotLanguage = "es" | "partial" | "en";

export type BotCategory =
  | "moderation"
  | "music"
  | "utility"
  | "fun"
  | "levels"
  | "economy";

export interface Bot {
  id: string;
  name: string;
  description: string;
  categories: BotCategory[];
  language: BotLanguage;
  inviteUrl: string;
  website?: string;
  /** Hue (0-360) used for the placeholder avatar. */
  hue: number;
}

export type ToolGroup = "tools" | "feedback" | "misc";

export interface Tool {
  id: string;
  name: string;
  url: string;
  group: ToolGroup;
  tagline: string;
  /** Plain-language "what is it for?" explanation. */
  purpose: string;
  official: boolean;
}

export interface ServerTemplate {
  id: string;
  name: string;
  description: string;
  idealFor: string;
  categories: { name: string; channels: string[]; voice?: boolean }[];
  roles: string[];
}

export type CommunityTopic =
  | "gaming"
  | "tech"
  | "art"
  | "anime"
  | "music"
  | "social"
  | "learning";

export interface Community {
  id: string;
  name: string;
  description: string;
  topics: CommunityTopic[];
  members: number;
  country: string;
  inviteUrl: string;
  hue: number;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  description: string;
  country: string;
  links: { label: string; url: string }[];
  hue: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  hue: number;
}

export interface DemoUser {
  name: string;
  handle: string;
}
