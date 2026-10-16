# Fluxer Español

Community site for Spanish-speaking Fluxer users: translated updates, guides, a bot directory, ecosystem tools and community listings. Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build) (guides at `/guias`). Code is in English; UI copy and URLs are in Spanish.

## Development

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm check     # type-check (astro check)
pnpm lint
pnpm build     # static site in dist/
pnpm preview
```

## Where things live

- `src/pages/` — site pages (home, novedades, bots, ecosistema, comunidad, 404).
- `src/content/docs/guias/` — guides as MDX. Folders match the sidebar groups in `astro.config.mjs`; frontmatter `level` and `readMinutes` drive the badges and home page previews.
- `src/data/` — placeholder data (updates, bots, tools, communities, team).
- `src/components/` — UI. React components render statically; the ones with a `client:*` directive in a page are interactive islands. `src/components/starlight/` holds the Starlight overrides that give `/guias` the site header and theme.
- `src/styles/` — `tokens.css` (shared colors), `site.css` (site pages), `docs.css` (Starlight).

Internal links must go through `href()` from `src/lib/url.ts` so they work under the GitHub Pages base path.

## Deploy

Pushing to `main` deploys to GitHub Pages (`.github/workflows/pages.yml`), which sets `PAGES_BASE_PATH` and `PAGES_SITE` for the build.

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (checked by commitlint).
