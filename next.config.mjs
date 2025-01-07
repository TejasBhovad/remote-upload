/** @type {import('next').NextConfig} */
// next.config.js

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/ingest/:path*",
        destination: "https://app.posthog.com/:path*", // Proxy to PostHog cloud service
      },
    ];
  },
};

export default nextConfig;
