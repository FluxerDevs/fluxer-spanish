import { and, count, eq } from "drizzle-orm";
import { PENDING_LIMIT, type FieldErrors } from "@/lib/submission-rules";
import { db } from "./db";
import { botSubmissions, communitySubmissions, toolSubmissions } from "./schema";

export const submissionTables = {
  community: communitySubmissions,
  bot: botSubmissions,
  tool: toolSubmissions,
};

export type SubmissionKind = keyof typeof submissionTables;

/** What a submit action returns: the new row's ID, or messages to show on the form's fields. */
export type SubmitResult<V> = { ok: true; id: number } | { ok: false; errors: FieldErrors<V> };

export const fail = <V>(errors: FieldErrors<V>): SubmitResult<V> => ({ ok: false, errors });

/** Pending submissions of every kind from this user, to stop one account flooding the queue. */
export async function hasTooManyPending(userId: string) {
  let total = 0;
  for (const table of Object.values(submissionTables)) {
    const [row] = await db()
      .select({ value: count() })
      .from(table)
      .where(and(eq(table.submitterId, userId), eq(table.status, "pending")));
    total += row?.value ?? 0;
  }
  return total >= PENDING_LIMIT;
}

export const tooManyPendingMessage = `Ya tienes ${PENDING_LIMIT} envíos pendientes. Espera a que el equipo los revise.`;

/** A stable 0-360 hue for the initials avatar, so the same entry always gets the same color. */
export function hueFor(id: string) {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return hash;
}
