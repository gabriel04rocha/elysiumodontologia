import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config) => {
    config.optimization.splitChunks.automaticNameDelimiter = "-";
    return config;
  },
  turbopack: {},
};

export default nextConfig;
