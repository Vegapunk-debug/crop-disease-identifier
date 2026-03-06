import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: typeof __dirname !== 'undefined' ? __dirname : process.cwd(),
  },
};

export default nextConfig;
