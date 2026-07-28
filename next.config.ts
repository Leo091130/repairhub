import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    // The Cloudflare-only database helper is not part of the static Pages app.
    ignoreBuildErrors: isGitHubPages,
  },
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/repairhub",
        assetPrefix: "/repairhub/",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
