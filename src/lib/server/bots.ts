import { and, desc, eq, ne } from "drizzle-orm";
import { bots as curatedBots } from "@/data/bots";
import { botRules, parseBotClientId, validateAll, type BotValues } from "@/lib/submission-rules";
import type { Bot, BotLanguage, SessionUser } from "@/lib/types";
import { db } from "./db";
import { notifyStaff } from "./notify";
import { botSubmissions } from "./schema";
import { fail, hasTooManyPending, hueFor, tooManyPendingMessage, type SubmitResult } from "./submissions";

function toBot(row: typeof botSubmissions.$inferSelect): Bot {
  return {
    id: `fluxer-${row.clientId}`,
    name: row.name,
    description: row.description,
    categories: row.categories,
    language: row.language,
    inviteUrl: row.inviteUrl,
    website: row.website ?? undefined,
    hue: hueFor(row.clientId),
  };
}

/** Approved suggestions, newest first, followed by the curated list in src/data. */
export async function listBots(): Promise<Bot[]> {
  const rows = await db()
    .select()
    .from(botSubmissions)
    .where(eq(botSubmissions.status, "approved"))
    .orderBy(desc(botSubmissions.reviewedAt));
  return [...rows.map(toBot), ...curatedBots];
}

export async function submitBot(user: SessionUser, values: BotValues): Promise<SubmitResult<BotValues>> {
  const errors = validateAll(botRules, values);
  if (Object.keys(errors).length > 0) return fail(errors);
  if (await hasTooManyPending(user.id)) return fail({ name: tooManyPendingMessage });

  const clientId = parseBotClientId(values.invite)!;
  const existing = await db()
    .select({ status: botSubmissions.status })
    .from(botSubmissions)
    .where(and(eq(botSubmissions.clientId, clientId), ne(botSubmissions.status, "rejected")))
    .get();
  if (existing) {
    return fail({
      invite:
        existing.status === "approved" ? "Este bot ya está en el directorio." : "Alguien ya sugirió este bot y está pendiente de revisión.",
    });
  }

  const [row] = await db()
    .insert(botSubmissions)
    .values({
      submitterId: user.id,
      clientId,
      name: values.name.trim(),
      description: values.description.trim(),
      categories: values.categories,
      language: values.language as BotLanguage,
      inviteUrl: values.invite.trim(),
      website: values.website.trim() || null,
    })
    .returning({ id: botSubmissions.id });
  void notifyStaff("bot", values.name.trim(), user.handle);
  return { ok: true, id: row.id };
}
