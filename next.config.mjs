/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.youthplusafrica.com",
      },
    ],
  },
  // Next.js 16 uses Turbopack by default; keep config explicit.
  turbopack: {},
};

export default nextConfig;
