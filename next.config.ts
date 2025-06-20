import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  sw: "service-worker.js",
});

const nextConfig: NextConfig = withPWA({
  /* config options here */
});

export default nextConfig;
