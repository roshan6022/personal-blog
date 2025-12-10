import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow ALL https domains
      },
      {
        protocol: "http",
        hostname: "**", // allow ALL http domains (if needed)
      },
    ],
  },
};

module.exports = nextConfig;
