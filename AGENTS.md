## Stack: Astro 7 + Starlight

This site runs on Astro 7 and Starlight 0.42, which may differ from your training data. Check the installed packages (`node_modules/astro/dist/types/public/config.d.ts`, `node_modules/@astrojs/starlight/dist/`) and their docs before using an API.

- Code and identifiers in English; UI copy and URL slugs in Spanish.
- Internal links use `href()` from `src/lib/url.ts` (GitHub Pages base path).
- Theme is shared with Starlight through `localStorage["starlight-theme"]` and `<html data-theme>`.
- Commits follow Conventional Commits (commitlint runs on `commit-msg`).
