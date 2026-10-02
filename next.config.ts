import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "standalone",
  outputFileTracingIncludes: {
    "/api/admin/questions": ["./src/data/questions/*.json"],
  },
  devIndicators: false,
  turbopack: {
    root: path.join(__dirname),
  },
};
export default nextConfig;
