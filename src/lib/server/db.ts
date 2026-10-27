import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { DATABASE_PATH } from "astro:env/server";
import * as schema from "./schema";

let instance: BetterSQLite3Database<typeof schema> | undefined;

/** Opens the SQLite database on first use and applies pending migrations from drizzle/. */
export function db() {
  if (!instance) {
    mkdirSync(dirname(DATABASE_PATH), { recursive: true });
    const sqlite = new Database(DATABASE_PATH);
    sqlite.pragma("journal_mode = WAL");
    sqlite.pragma("foreign_keys = ON");
    instance = drizzle(sqlite, { schema });
    migrate(instance, { migrationsFolder: "drizzle" });
  }
  return instance;
}
