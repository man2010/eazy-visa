import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['mongoose', 'canvas', 'jsdom'],
  
  turbopack: {},
};

export default nextConfig;