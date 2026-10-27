# Fluxer Español

Community site for Spanish-speaking Fluxer users: translated updates, guides, a bot directory, ecosystem tools and community listings. Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build) (guides at `/guias`). Code is in English; UI copy and URLs are in Spanish.

Users log in with their Fluxer account to add their server to the directory, suggest bots and tools, and save guides. Staff review submissions at `/moderacion`.

## Development

1. Create an OAuth2 application in Fluxer and add `http://localhost:4321/cuenta/autorizado` as a redirect URI.
2. Copy `.env.example` to `.env` and fill in `FLUXER_CLIENT_ID`, `FLUXER_CLIENT_SECRET` and your own Fluxer user ID in `STAFF_USER_IDS`.
3. Run:

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm check        # type-check (astro check)
pnpm lint
pnpm build        # server in dist/server, static files in dist/client
pnpm db:generate  # after changing src/lib/server/schema.ts
```

The SQLite database and login sessions are created in `.data/` (git-ignored). Delete the folder to start over.

## Where things live

- `src/pages/` — site pages. The ones that read the database (home, bots, ecosistema, comunidad, cuenta, moderacion) render on demand; the rest are prerendered. `src/pages/cuenta/` also holds the login, callback and logout routes.
- `src/actions/` — Astro Actions for every form: submissions, favorites and moderation.
- `src/lib/server/` — server-only code: database schema and queries, the Fluxer API client, sessions.
- `src/lib/submission-rules.ts` — form validation shared by the browser and the server.
- `drizzle/` — SQL migrations, applied automatically when the server starts using the database.
- `src/content/docs/guias/` — guides as MDX. Folders match the sidebar groups in `astro.config.mjs`; frontmatter `level` and `readMinutes` drive the badges and home page previews.
- `src/data/` — content curated by staff (updates, templates, creators, team) plus the sample bots, tools and communities shown next to approved submissions.
- `src/components/` — UI. React components render statically; the ones with a `client:*` directive in a page are interactive islands. `src/components/starlight/` holds the Starlight overrides that give `/guias` the site header and theme.
- `src/styles/` — `tokens.css` (shared colors), `site.css` (site pages), `docs.css` (Starlight).

Internal links must go through `href()` from `src/lib/url.ts`.

## Configuration

| Variable | Required | What it's for |
| --- | --- | --- |
| `SITE_URL` | yes | Public URL of the site. The OAuth redirect URI is `SITE_URL/cuenta/autorizado`. |
| `FLUXER_CLIENT_ID`, `FLUXER_CLIENT_SECRET` | yes | The Fluxer OAuth2 application. |
| `STAFF_USER_IDS` | yes | Comma-separated Fluxer user IDs that can open `/moderacion`. |
| `STAFF_WEBHOOK_URL` | no | Fluxer webhook that gets a message for each new submission. |
| `DATABASE_PATH` | no | Defaults to `.data/fluxer-es.db`. |
| `FLUXER_API_URL`, `FLUXER_MEDIA_URL` | no | Default to Fluxer's public instance. |

## Deploy

Pushing to `main` builds a Docker image and pushes it to `ghcr.io/<owner>/fluxer-spanish:main` (`.github/workflows/image.yml`).

The site runs on Kubernetes with the manifests in `deploy/k8s/`:

1. Copy `secret.example.yaml`, fill it in and apply it. Don't commit the copy.
2. Set the host in `ingress.yaml`. `SITE_URL` in the Secret must match it, and the production redirect URI (`https://<host>/cuenta/autorizado`) must be added to the Fluxer application.
3. `kubectl apply -k deploy/k8s`, or import the files in Rancher.

It runs as a single pod because SQLite sits on a ReadWriteOnce volume. The Deployment uses the `Recreate` strategy so two pods never open the same database. To back it up, copy `fluxer-es.db` from the volume.

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (checked by commitlint).
