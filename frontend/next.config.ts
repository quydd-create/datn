import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker (optional, Vercel doesn't need this)
  // output: "standalone", // Comment out for Vercel, uncomment for Docker
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.vercel.app",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.render.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
