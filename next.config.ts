import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript:{
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      // Add this new object for the 'ibb.co' hostname
      {
        protocol: 'https',
        hostname: 'ibb.co',
        port: '',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'handsome-raccoon-677.convex.cloud'
      },

      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      }
    ]
  }
};

export default nextConfig;