import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        /** Audience of a guide; shown as a badge and used to pick home page previews. */
        level: z.enum(["beginner", "admin"]).optional(),
        readMinutes: z.number().int().positive().optional(),
      }),
    }),
  }),
};
