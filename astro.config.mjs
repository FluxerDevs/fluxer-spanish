// @ts-check
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// Set by the GitHub Pages workflow: "/<repo>" on github.io, "" with a custom domain.
const base = process.env.PAGES_BASE_PATH || "/";
const site = process.env.PAGES_SITE || undefined;

export default defineConfig({
  site,
  base,
  output: "static",
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
