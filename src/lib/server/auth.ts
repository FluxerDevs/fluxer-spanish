import type { APIContext } from "astro";
import { STAFF_USER_IDS } from "astro:env/server";
import type { SessionUser } from "@/lib/types";
import { db } from "./db";
import { avatarUrl, getUserInfo, refreshTokens, type FluxerUser, type TokenSet } from "./fluxer";
import { users } from "./schema";

type Context = Pick<APIContext, "session">;

const staffIds = new Set(
  STAFF_USER_IDS.split(",")
    .map((id) => id.trim())
    .filter(Boolean),
);

export const isStaff = (userId: string) => staffIds.has(userId);

export async function getUser({ session }: Context) {
  return (await session?.get("user")) ?? null;
}

/** Saves the Fluxer account locally and starts a session for it. */
export async function signIn({ session }: Context, tokens: TokenSet) {
  const profile = await getUserInfo(tokens.accessToken);
  await upsertUser(profile);
  // A fresh session ID on login, so an ID set before login can't be reused.
  await session?.regenerate();
  session?.set("user", toSessionUser(profile));
  session?.set("tokens", tokens);
}

async function upsertUser(profile: FluxerUser) {
  const row = {
    username: profile.username,
    globalName: profile.global_name,
    avatar: profile.avatar,
    lastLoginAt: new Date(),
  };
  await db()
    .insert(users)
    .values({ id: profile.id, ...row })
    .onConflictDoUpdate({ target: users.id, set: row });
}

function toSessionUser(profile: FluxerUser): SessionUser {
  return {
    id: profile.id,
    name: profile.global_name || profile.username,
    handle: `@${profile.username}`,
    avatarUrl: avatarUrl(profile.id, profile.avatar),
  };
}

/**
 * A valid Fluxer access token for the logged-in user, refreshed when it's about to expire.
 * Returns null (and ends the session) when the user has to log in again.
 */
export async function getAccessToken({ session }: Context) {
  const tokens = await session?.get("tokens");
  if (!tokens) return null;
  if (tokens.expiresAt - 60_000 > Date.now()) return tokens.accessToken;
  try {
    const fresh = await refreshTokens(tokens.refreshToken);
    session?.set("tokens", fresh);
    return fresh.accessToken;
  } catch {
    session?.destroy();
    return null;
  }
}

/** Only allows internal paths, so `?volver=` can't send people to another site. */
export function safeReturnPath(value: string | null | undefined) {
  return value && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\") ? value : "/";
}
