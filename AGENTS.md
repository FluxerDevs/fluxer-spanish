## Stack: Astro 7 + Starlight

This site runs on Astro 7 and Starlight 0.42, which may differ from your training data. Check the installed packages (`node_modules/astro/dist/types/public/config.d.ts`, `node_modules/@astrojs/starlight/dist/`) and their docs before using an API.

- Code and identifiers in English; UI copy and URL slugs in Spanish.
- Internal links use `href()` from `src/lib/url.ts` (base path and trailing slash).
- Theme is shared with Starlight through `localStorage["starlight-theme"]` and `<html data-theme>`.
- Commits follow Conventional Commits (commitlint runs on `commit-msg`).

## Backend

The site runs on the `@astrojs/node` adapter. Pages are prerendered unless they set `export const prerender = false`; only pages that read the database or the session do.

- Server-only code lives in `src/lib/server/` (SQLite through drizzle, the Fluxer API client, auth). Import it only from on-demand pages, endpoints and `src/actions/`, never from client islands.
- Mutations go through Astro Actions in `src/actions/index.ts`. Messages in `ActionError` are shown to users, so write them in Spanish.
- Form validation lives in `src/lib/submission-rules.ts` and runs both in the form and in the action. Change rules there, not in the form.
- Env vars are declared in `astro.config.mjs` (`astro:env`), all as `secret` so they're read at runtime. Document new ones in `.env.example` and `deploy/k8s/secret.example.yaml`.
- After changing `src/lib/server/schema.ts`, run `pnpm db:generate` and commit the new file in `drizzle/`. Migrations apply on the first database access.
