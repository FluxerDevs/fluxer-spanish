import { and, desc, eq, isNull, lt, ne, or } from "drizzle-orm";
import { communities as sampleCommunities } from "@/data/community";
import { communityRules, parseInviteCode, validateAll, type CommunityValues } from "@/lib/submission-rules";
import type { Community, SessionUser } from "@/lib/types";
import { db } from "./db";
import { canManageGuild, getInvite, getUserGuilds, guildIconUrl } from "./fluxer";
import { notifyStaff } from "./notify";
import { communitySubmissions } from "./schema";
import { fail, hasTooManyPending, hueFor, tooManyPendingMessage, type SubmitResult } from "./submissions";

const COUNTS_MAX_AGE_MS = 30 * 60 * 1000;

type CommunityRow = typeof communitySubmissions.$inferSelect;

function toCommunity(row: CommunityRow): Community {
  return {
    id: `fluxer-${row.guildId}`,
    name: row.name,
    description: row.description,
    topics: row.topics,
    members: row.memberCount,
    online: row.presenceCount ?? undefined,
    inviteUrl: `https://fluxer.gg/${row.inviteCode}`,
    hue: hueFor(row.guildId),
    iconUrl: guildIconUrl(row.guildId, row.icon),
  };
}

/** Approved communities, newest first, followed by the sample entries in src/data. */
export async function listCommunities(): Promise<Community[]> {
  const rows = await db()
    .select()
    .from(communitySubmissions)
    .where(eq(communitySubmissions.status, "approved"))
    .orderBy(desc(communitySubmissions.reviewedAt));
  void refreshStaleCounts();
  return [...rows.map(toCommunity), ...sampleCommunities];
}

let refreshing = false;

/**
 * Updates member counts and icons from Fluxer for listed communities whose numbers are older
 * than 30 minutes. Runs in the background so pages never wait for Fluxer; the next visit sees them.
 */
async function refreshStaleCounts() {
  if (refreshing) return;
  refreshing = true;
  try {
    const staleBefore = new Date(Date.now() - COUNTS_MAX_AGE_MS);
    const stale = await db()
      .select({ id: communitySubmissions.id, inviteCode: communitySubmissions.inviteCode })
      .from(communitySubmissions)
      .where(
        and(
          eq(communitySubmissions.status, "approved"),
          or(isNull(communitySubmissions.countsUpdatedAt), lt(communitySubmissions.countsUpdatedAt, staleBefore)),
        ),
      );
    for (const row of stale) {
      const invite = await getInvite(row.inviteCode);
      // A deleted invite keeps the last known numbers; staff can see it in /moderacion.
      await db()
        .update(communitySubmissions)
        .set(
          invite
            ? {
                memberCount: invite.member_count ?? 0,
                presenceCount: invite.presence_count ?? null,
                icon: invite.guild?.icon ?? null,
                countsUpdatedAt: new Date(),
              }
            : { countsUpdatedAt: new Date() },
        )
        .where(eq(communitySubmissions.id, row.id));
    }
  } catch (error) {
    console.error("Community count refresh failed", error);
  } finally {
    refreshing = false;
  }
}

/**
 * Checks a community submission against Fluxer and stores it as pending:
 * the invite has to exist and never expire, and the user has to be able to manage that server.
 */
export async function submitCommunity(
  user: SessionUser,
  accessToken: string,
  values: CommunityValues,
): Promise<SubmitResult<CommunityValues>> {
  const errors = validateAll(communityRules, values);
  if (Object.keys(errors).length > 0) return fail(errors);
  if (await hasTooManyPending(user.id)) return fail({ name: tooManyPendingMessage });

  const code = parseInviteCode(values.invite)!;
  const invite = await getInvite(code);
  if (!invite?.guild) return fail({ invite: "Este enlace no existe o ya no funciona. Revisa que esté bien copiado." });
  if (invite.expires_at !== null) {
    return fail({ invite: "Este enlace caduca. Crea uno que no caduque en los ajustes de invitación del servidor." });
  }

  const guildId = invite.guild.id;
  const guild = (await getUserGuilds(accessToken)).find((entry) => entry.id === guildId);
  if (!guild || !canManageGuild(guild, user.id)) {
    return fail({
      invite: `Para enviar «${invite.guild.name}» necesitas ser su dueño o tener el permiso Gestionar servidor.`,
    });
  }

  const existing = await db()
    .select({ status: communitySubmissions.status })
    .from(communitySubmissions)
    .where(and(eq(communitySubmissions.guildId, guildId), ne(communitySubmissions.status, "rejected")))
    .get();
  if (existing) {
    return fail({
      invite:
        existing.status === "approved"
          ? "Este servidor ya está en el directorio."
          : "Este servidor ya está pendiente de revisión.",
    });
  }

  const [row] = await db()
    .insert(communitySubmissions)
    .values({
      submitterId: user.id,
      guildId,
      inviteCode: invite.code,
      name: values.name.trim(),
      description: values.description.trim(),
      topics: values.topics,
      icon: invite.guild.icon,
      memberCount: invite.member_count ?? 0,
      presenceCount: invite.presence_count ?? null,
      countsUpdatedAt: new Date(),
    })
    .returning({ id: communitySubmissions.id });
  void notifyStaff("community", values.name.trim(), user.handle);
  return { ok: true, id: row.id };
}
