import type { BotCategory, BotLanguage, CommunityTopic, ToolGroup } from "@/lib/types";

// Validation shared by the submission forms (as the user types) and the actions (on the server),
// so both give the same Spanish messages.

export const DESCRIPTION_MAX = 200;
/** Pending submissions a single user can have at once. */
export const PENDING_LIMIT = 5;

export type Rules<V> = Partial<Record<keyof V, (values: V) => string | undefined>>;
export type FieldErrors<V> = Partial<Record<keyof V, string>>;

export function validateAll<V>(rules: Rules<V>, values: V): FieldErrors<V> {
  const errors: FieldErrors<V> = {};
  for (const field of Object.keys(rules) as (keyof V)[]) {
    const error = rules[field]?.(values);
    if (error) errors[field] = error;
  }
  return errors;
}

const minLength = (value: string, min: number, message: string) =>
  value.trim().length < min ? message : undefined;

function description(value: string) {
  if (value.trim().length < 20) return "Cuéntanos un poco más (mínimo 20 caracteres).";
  return value.length > DESCRIPTION_MAX ? `Acorta la descripción a ${DESCRIPTION_MAX} caracteres.` : undefined;
}

function isHttpsUrl(value: string) {
  try {
    return new URL(value.trim()).protocol === "https:";
  } catch {
    return false;
  }
}

// Communities

export interface CommunityValues {
  name: string;
  invite: string;
  description: string;
  topics: CommunityTopic[];
  consent: boolean;
}

/** The invite code from https://fluxer.gg/<code>, or null. */
export function parseInviteCode(value: string) {
  const match = /^https:\/\/fluxer\.gg\/([\w-]+)\/?$/.exec(value.trim());
  return match ? match[1] : null;
}

export const communityRules: Rules<CommunityValues> = {
  name: (v) => minLength(v.name, 3, "Escribe al menos 3 caracteres."),
  invite: (v) =>
    parseInviteCode(v.invite)
      ? undefined
      : "Usa un enlace que empiece por https://fluxer.gg/, por ejemplo https://fluxer.gg/micomunidad.",
  description: (v) => description(v.description),
  consent: (v) => (v.consent ? undefined : "Marca la casilla para confirmar."),
};

// Bots

export interface BotValues {
  name: string;
  invite: string;
  description: string;
  categories: BotCategory[];
  language: BotLanguage | "";
  website: string;
}

/** The bot's client ID from its Fluxer authorize link, or null. */
export function parseBotClientId(value: string) {
  try {
    const url = new URL(value.trim());
    const fluxerHost = url.hostname === "fluxer.app" || url.hostname.endsWith(".fluxer.app");
    const clientId = url.searchParams.get("client_id");
    const isBotScope = url.searchParams.get("scope")?.split(/[\s+]/).includes("bot");
    if (url.protocol !== "https:" || !fluxerHost || !url.pathname.includes("/oauth2/authorize")) return null;
    return clientId && /^\d+$/.test(clientId) && isBotScope ? clientId : null;
  } catch {
    return null;
  }
}

export const botRules: Rules<BotValues> = {
  name: (v) => minLength(v.name, 2, "Escribe el nombre del bot."),
  invite: (v) =>
    parseBotClientId(v.invite)
      ? undefined
      : "Pega el enlace de invitación del bot: https://web.fluxer.app/oauth2/authorize?client_id=…&scope=bot",
  description: (v) => description(v.description),
  categories: (v) => (v.categories.length > 0 ? undefined : "Elige al menos una categoría."),
  language: (v) => (v.language ? undefined : "Indica en qué idioma están sus comandos."),
  website: (v) => (!v.website.trim() || isHttpsUrl(v.website) ? undefined : "Usa un enlace que empiece por https://."),
};

// Tools

export interface ToolValues {
  name: string;
  url: string;
  group: ToolGroup | "";
  tagline: string;
  purpose: string;
}

export const toolRules: Rules<ToolValues> = {
  name: (v) => minLength(v.name, 2, "Escribe el nombre de la herramienta."),
  url: (v) => (isHttpsUrl(v.url) ? undefined : "Usa un enlace que empiece por https://."),
  group: (v) => (v.group ? undefined : "Elige dónde encaja."),
  tagline: (v) => {
    if (v.tagline.trim().length < 5) return "Resúmela en unas pocas palabras.";
    return v.tagline.length > 80 ? "Acórtala a 80 caracteres." : undefined;
  },
  purpose: (v) => description(v.purpose),
};
