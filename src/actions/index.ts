import { ActionError, defineAction, type ActionAPIContext } from "astro:actions";
import { z } from "astro/zod";
import { botCategoryLabels, botLanguageLabels } from "@/data/bots";
import { communityTopicLabels } from "@/data/community";
import { toolGroupLabels } from "@/data/tools";
import { getAccessToken, getUser } from "@/lib/server/auth";
import { submitBot } from "@/lib/server/bots";
import { submitCommunity } from "@/lib/server/communities";
import { FluxerError } from "@/lib/server/fluxer";
import { submitTool } from "@/lib/server/tools";
import type { BotCategory, BotLanguage, CommunityTopic, ToolGroup } from "@/lib/types";

const keys = <T extends string>(labels: Record<T, unknown>) => Object.keys(labels) as [T, ...T[]];

/** Messages the forms show as-is, so they're in Spanish. */
const loginRequired = () =>
  new ActionError({ code: "UNAUTHORIZED", message: "Tu sesión ha caducado. Vuelve a entrar con Fluxer." });

async function requireUser(context: ActionAPIContext) {
  const user = await getUser(context);
  if (!user) throw loginRequired();
  return user;
}

/** Runs a handler that talks to Fluxer, turning outages into a readable error. */
async function withFluxer<T>(context: ActionAPIContext, run: () => Promise<T>) {
  try {
    return await run();
  } catch (error) {
    if (!(error instanceof FluxerError)) throw error;
    // The user revoked access in Fluxer: end our session too so they can log in again.
    if (error.status === 401) {
      context.session?.destroy();
      throw loginRequired();
    }
    console.error(error);
    throw new ActionError({
      code: "BAD_GATEWAY",
      message: "Fluxer no responde ahora mismo. Espera un momento y vuelve a intentarlo.",
    });
  }
}

export const server = {
  submitCommunity: defineAction({
    input: z.object({
      name: z.string().max(100),
      invite: z.string().max(200),
      description: z.string().max(1000),
      topics: z.array(z.enum(keys<CommunityTopic>(communityTopicLabels))).max(7),
      consent: z.boolean(),
    }),
    handler: async (input, context) => {
      const user = await requireUser(context);
      const accessToken = await getAccessToken(context);
      if (!accessToken) throw loginRequired();
      return withFluxer(context, () => submitCommunity(user, accessToken, input));
    },
  }),

  suggestBot: defineAction({
    input: z.object({
      name: z.string().max(100),
      invite: z.string().max(500),
      description: z.string().max(1000),
      categories: z.array(z.enum(keys<BotCategory>(botCategoryLabels))).max(6),
      // "" until the user picks one; the shared rules turn that into a field message.
      language: z.enum([...keys<BotLanguage>(botLanguageLabels), ""]),
      website: z.string().max(300),
    }),
    handler: async (input, context) => submitBot(await requireUser(context), input),
  }),

  suggestTool: defineAction({
    input: z.object({
      name: z.string().max(100),
      url: z.string().max(300),
      group: z.enum([...keys<ToolGroup>(toolGroupLabels), ""]),
      tagline: z.string().max(200),
      purpose: z.string().max(1000),
    }),
    handler: async (input, context) => submitTool(await requireUser(context), input),
  }),
};
