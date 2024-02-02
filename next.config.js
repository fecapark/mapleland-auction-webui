/** @type {import('next').NextConfig} */

const withContentlayer = require("next-contentlayer").withContentlayer;

const nextConfig = {
  images: {
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
