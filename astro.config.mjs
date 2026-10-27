// @ts-check
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import { defineConfig, envField, fontProviders, sessionDrivers } from "astro/config";

export default defineConfig({
  // Canonical URLs and the sitemap; the OAuth redirect URI uses SITE_URL at runtime instead.
  site: process.env.SITE_URL || undefined,
  // Pages are prerendered unless they set `prerender = false` (the ones that read the database).
  output: "static",
  adapter: node({ mode: "standalone" }),
  session: {
    // Relative to the working directory, so it lands on the data volume in the container.
    driver: sessionDrivers.fsLite({ base: ".data/sessions" }),
    cookie: { name: "fluxer-es-session", sameSite: "lax" },
    // Matches the Fluxer access token lifetime.
    ttl: 60 * 60 * 24 * 7,
  },
  env: {
    schema: {
      SITE_URL: envField.string({ context: "server", access: "public", url: true, default: "http://localhost:4321" }),
      FLUXER_API_URL: envField.string({ context: "server", access: "public", url: true, default: "https://api.fluxer.app" }),
      FLUXER_MEDIA_URL: envField.string({ context: "server", access: "public", url: true, default: "https://fluxerusercontent.com" }),
      FLUXER_CLIENT_ID: envField.string({ context: "server", access: "secret" }),
      FLUXER_CLIENT_SECRET: envField.string({ context: "server", access: "secret" }),
      // Comma-separated Fluxer user IDs that can open /moderacion.
      STAFF_USER_IDS: envField.string({ context: "server", access: "secret", default: "" }),
      // Fluxer webhook that gets a message for each new submission.
      STAFF_WEBHOOK_URL: envField.string({ context: "server", access: "secret", url: true, optional: true }),
      DATABASE_PATH: envField.string({ context: "server", access: "secret", default: ".data/fluxer-es.db" }),
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Nunito",
      cssVariable: "--font-nunito",
      weights: [700, 800],
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Nunito Sans",
      cssVariable: "--font-nunito-sans",
      weights: [400, 600, 700],
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
    },
  ],
  integrations: [
    starlight({
      title: "Fluxer Español",
      description: "Guías de Fluxer en español para principiantes y admins de servidores.",
      locales: { root: { label: "Español", lang: "es" } },
      favicon: "/favicon.ico",
      // The site has its own 404 page in src/pages/404.astro.
      disable404Route: true,
      editLink: { baseUrl: "https://github.com/FluxerDevs/fluxer-spanish/edit/main/" },
      customCss: ["./src/styles/docs.css"],
      components: {
        Head: "./src/components/starlight/Head.astro",
        Header: "./src/components/starlight/Header.astro",
        ThemeSelect: "./src/components/starlight/ThemeSelect.astro",
        MobileMenuFooter: "./src/components/starlight/MobileMenuFooter.astro",
        Footer: "./src/components/starlight/Footer.astro",
        PageTitle: "./src/components/starlight/PageTitle.astro",
      },
      sidebar: [
        {
          label: "Primeros pasos",
          items: [
            { label: "Centro de guías", slug: "guias" },
            { slug: "guias/primeros-pasos" },
          ],
        },
        { label: "Principiantes", items: [{ autogenerate: { directory: "guias/principiantes" } }] },
        { label: "Admins de servidores", items: [{ autogenerate: { directory: "guias/admins" } }] },
        { slug: "guias/preguntas-frecuentes" },
      ],
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
