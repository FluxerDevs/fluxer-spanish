import {
  FLUXER_API_URL,
  FLUXER_CLIENT_ID,
  FLUXER_CLIENT_SECRET,
  FLUXER_MEDIA_URL,
  SITE_URL,
} from "astro:env/server";

// Minimal client for the parts of the Fluxer API the site uses. Docs: https://docs.fluxer.app

const api = (path: string) => `${FLUXER_API_URL.replace(/\/$/, "")}/v1${path}`;

export const REDIRECT_PATH = "/cuenta/autorizado";
export const redirectUri = () => `${SITE_URL.replace(/\/$/, "")}${REDIRECT_PATH}`;

/** Thrown for non-2xx responses so callers can tell "not found" from "Fluxer is down". */
export class FluxerError extends Error {
  constructor(
    readonly status: number,
    readonly code: string | undefined,
  ) {
    super(`Fluxer API ${status}${code ? ` ${code}` : ""}`);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(api(path), { ...init, signal: AbortSignal.timeout(10_000) });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { code?: string } | null;
    throw new FluxerError(response.status, body?.code);
  }
  return (await response.json()) as T;
}

const bearer = (token: string) => ({ headers: { Authorization: `Bearer ${token}` } });

// OAuth2

export interface TokenSet {
  accessToken: string;
  refreshToken: string;
  /** Epoch milliseconds. */
  expiresAt: number;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export function authorizeUrl({ state, codeChallenge }: { state: string; codeChallenge: string }) {
  const params = new URLSearchParams({
    client_id: FLUXER_CLIENT_ID,
    response_type: "code",
    redirect_uri: redirectUri(),
    // `guilds` lets us check that whoever submits a community administers it.
    scope: "identify guilds",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });
  return `${api("/oauth2/authorize")}?${params}`;
}

async function tokenRequest(path: string, fields: Record<string, string>) {
  return request<TokenResponse>(path, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${FLUXER_CLIENT_ID}:${FLUXER_CLIENT_SECRET}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(fields),
  });
}

const toTokenSet = (token: TokenResponse): TokenSet => ({
  accessToken: token.access_token,
  refreshToken: token.refresh_token,
  expiresAt: Date.now() + token.expires_in * 1000,
});

export async function exchangeCode(code: string, codeVerifier: string) {
  return toTokenSet(
    await tokenRequest("/oauth2/token", {
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri(),
      code_verifier: codeVerifier,
    }),
  );
}

export async function refreshTokens(refreshToken: string) {
  return toTokenSet(await tokenRequest("/oauth2/token", { grant_type: "refresh_token", refresh_token: refreshToken }));
}

/** Revokes every token this app holds for the user. */
export async function revokeToken(token: string) {
  await tokenRequest("/oauth2/token/revoke", { token });
}

// Users and guilds

export interface FluxerUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
}

export const getUserInfo = (accessToken: string) => request<FluxerUser>("/oauth2/userinfo", bearer(accessToken));

export interface FluxerGuild {
  id: string;
  name: string;
  icon: string | null;
  owner_id: string;
  /** Decimal string; only returned when `limit` is 100 or less. */
  permissions?: string;
}

/** Every guild the user is in, paged 100 at a time so `permissions` is included. */
export async function getUserGuilds(accessToken: string) {
  const guilds: FluxerGuild[] = [];
  for (;;) {
    const after = guilds.at(-1)?.id;
    const page = await request<FluxerGuild[]>(
      `/users/@me/guilds?limit=100${after ? `&after=${after}` : ""}`,
      bearer(accessToken),
    );
    guilds.push(...page);
    if (page.length < 100) return guilds;
  }
}

const ADMINISTRATOR = 1n << 3n;
const MANAGE_GUILD = 1n << 5n;

/** Owner, or has Administrator or Manage Server. */
export function canManageGuild(guild: FluxerGuild, userId: string) {
  if (guild.owner_id === userId) return true;
  const permissions = BigInt(guild.permissions ?? "0");
  return (permissions & (ADMINISTRATOR | MANAGE_GUILD)) !== 0n;
}

// Invites

export interface FluxerInvite {
  code: string;
  guild?: { id: string; name: string; icon: string | null };
  member_count?: number;
  presence_count?: number;
  /** null when the invite never expires. */
  expires_at: string | null;
}

/** Returns null for an invite that doesn't exist. Doesn't use up the invite. */
export async function getInvite(code: string) {
  try {
    return await request<FluxerInvite>(`/invites/${encodeURIComponent(code)}`);
  } catch (error) {
    if (error instanceof FluxerError && error.status === 404) return null;
    throw error;
  }
}

// Media

const media = (path: string) => `${FLUXER_MEDIA_URL.replace(/\/$/, "")}${path}`;

export const avatarUrl = (userId: string, hash: string | null) =>
  hash ? media(`/avatars/${userId}/${hash}.webp?size=128`) : undefined;

export const guildIconUrl = (guildId: string, hash: string | null) =>
  hash ? media(`/icons/${guildId}/${hash}.webp?size=128`) : undefined;
