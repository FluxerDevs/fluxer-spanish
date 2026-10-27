import { and, desc, eq } from "drizzle-orm";
import { getGuides } from "@/lib/guides";
import { db } from "./db";
import { favorites } from "./schema";

/** Guide IDs the user saved, most recent first. */
export async function listFavoriteIds(userId: string) {
  const rows = await db()
    .select({ guideSlug: favorites.guideSlug })
    .from(favorites)
    .where(eq(favorites.userId, userId))
    .orderBy(desc(favorites.createdAt));
  return rows.map((row) => row.guideSlug);
}

/** Saves or un-saves a guide. Returns whether it's saved now, or null for an unknown guide. */
export async function setFavorite(userId: string, guideId: string, saved: boolean) {
  const guides = await getGuides();
  if (!guides.some((guide) => guide.id === guideId)) return null;
  if (saved) {
    await db().insert(favorites).values({ userId, guideSlug: guideId }).onConflictDoNothing();
  } else {
    await db().delete(favorites).where(and(eq(favorites.userId, userId), eq(favorites.guideSlug, guideId)));
  }
  return saved;
}
