import type { APIRoute } from "astro";
import { sql } from "drizzle-orm";
import { db } from "@/lib/server/db";

export const prerender = false;

/** Liveness probe for Kubernetes: the server is up and the database file is readable. */
export const GET: APIRoute = () => {
  try {
    db().get(sql`select 1`);
    return new Response("ok", { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Health check failed", error);
    return new Response("database unavailable", { status: 503 });
  }
};
