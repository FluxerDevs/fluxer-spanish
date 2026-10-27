# Builds the site and runs it with the Node adapter's standalone server on port 4321.
# The database and sessions live in /app/.data, which should be a persistent volume.

FROM node:24-slim AS build
WORKDIR /app
ENV HUSKY=0
# Only needed if better-sqlite3 has no prebuilt binary for this platform.
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build && pnpm prune --prod

FROM node:24-slim
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/drizzle ./drizzle
RUN mkdir .data && chown node:node .data
USER node
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
