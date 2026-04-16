import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
