import { SITE_URL, STAFF_WEBHOOK_URL } from "astro:env/server";

const kindLabels = {
  community: "comunidad",
  bot: "sugerencia de bot",
  tool: "sugerencia de herramienta",
} as const;

/**
 * Tells staff about a new submission through a Fluxer webhook, if one is configured.
 * Never throws: a failed ping shouldn't fail the submission.
 */
export async function notifyStaff(kind: keyof typeof kindLabels, name: string, submitter: string) {
  if (!STAFF_WEBHOOK_URL) return;
  const reviewUrl = `${SITE_URL.replace(/\/$/, "")}/moderacion/`;
  try {
    const response = await fetch(STAFF_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Fluxer Español",
        content: `Nueva ${kindLabels[kind]}: **${name}**, enviada por ${submitter}. Revísala en ${reviewUrl}`,
        allowed_mentions: { parse: [] },
      }),
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) console.error("Staff webhook failed", response.status);
  } catch (error) {
    console.error("Staff webhook failed", error);
  }
}
