import { sql } from "drizzle-orm";
import { index, integer, primaryKey, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import type { BotCategory, BotLanguage, CommunityTopic, ToolGroup } from "@/lib/types";

const createdAt = () =>
  integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`);

export const users = sqliteTable("users", {
  /** Fluxer user ID (snowflake). */
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  globalName: text("global_name"),
  avatar: text("avatar"),
  createdAt: createdAt(),
  lastLoginAt: integer("last_login_at", { mode: "timestamp" }).notNull(),
});

export type SubmissionStatus = "pending" | "approved" | "rejected";

/** Columns every submission table shares: who sent it and how staff reviewed it. */
const review = () => ({
  id: integer("id").primaryKey({ autoIncrement: true }),
  submitterId: text("submitter_id")
    .notNull()
    .references(() => users.id),
  status: text("status").$type<SubmissionStatus>().notNull().default("pending"),
  reviewNote: text("review_note"),
  reviewedBy: text("reviewed_by").references(() => users.id),
  reviewedAt: integer("reviewed_at", { mode: "timestamp" }),
  createdAt: createdAt(),
});

export const communitySubmissions = sqliteTable(
  "community_submissions",
  {
    ...review(),
    guildId: text("guild_id").notNull(),
    inviteCode: text("invite_code").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    topics: text("topics", { mode: "json" }).$type<CommunityTopic[]>().notNull(),
    // Copied from the invite and refreshed while the community is listed.
    icon: text("icon"),
    memberCount: integer("member_count").notNull().default(0),
    presenceCount: integer("presence_count"),
    countsUpdatedAt: integer("counts_updated_at", { mode: "timestamp" }),
  },
  (table) => [
    uniqueIndex("community_guild_active").on(table.guildId).where(sql`status <> 'rejected'`),
    index("community_status").on(table.status),
  ],
);

export const botSubmissions = sqliteTable(
  "bot_submissions",
  {
    ...review(),
    /** The bot application's client ID, taken from its invite URL. */
    clientId: text("client_id").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    categories: text("categories", { mode: "json" }).$type<BotCategory[]>().notNull(),
    language: text("language").$type<BotLanguage>().notNull(),
    inviteUrl: text("invite_url").notNull(),
    website: text("website"),
  },
  (table) => [
    uniqueIndex("bot_client_active").on(table.clientId).where(sql`status <> 'rejected'`),
    index("bot_status").on(table.status),
  ],
);

export const toolSubmissions = sqliteTable(
  "tool_submissions",
  {
    ...review(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    group: text("group").$type<ToolGroup>().notNull(),
    tagline: text("tagline").notNull(),
    purpose: text("purpose").notNull(),
  },
  (table) => [index("tool_status").on(table.status)],
);

export const favorites = sqliteTable(
  "favorites",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    guideSlug: text("guide_slug").notNull(),
    createdAt: createdAt(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.guideSlug] })],
);
