/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't let lint warnings (e.g. unescaped apostrophes) block a deploy.
  eslint: { ignoreDuringBuilds: true },
  // Product images from Drive / an image host: whitelist the host(s).
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
