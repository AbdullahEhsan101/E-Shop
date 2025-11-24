import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'breakout.com.pk',

      },
    ],
  },
};

export default nextConfig;
