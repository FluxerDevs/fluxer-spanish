import type { NextConfig } from "next";

// Set by the GitHub Pages workflow: build a static export served from /<repo>/.
const pagesBasePath = process.env.PAGES_BASE_PATH;
const isPagesExport = pagesBasePath !== undefined;

const nextConfig: NextConfig = {
  /* config options here */
  // Export mode doesn't support PPR, which Cache Components turns on.
  cacheComponents: !isPagesExport,
  partialPrefetching: !isPagesExport,
  ...(isPagesExport && {
    output: "export",
    basePath: pagesBasePath,
    // Emit /guias/index.html so Pages serves /guias/ without extra rules.
    trailingSlash: true,
  }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
