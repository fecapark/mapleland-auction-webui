/** @type {import('next').NextConfig} */

const withContentlayer = require("next-contentlayer").withContentlayer;

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maplestory.io",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
    ],
  },
};

module.exports = withContentlayer(nextConfig);
