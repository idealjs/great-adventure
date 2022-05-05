const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => ({
  reactStrictMode: true,
  webpack: (config, context) => {
    const { isServer } = context;
    if (phase === PHASE_DEVELOPMENT_SERVER && !isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }
    return config;
  },
});

module.exports = nextConfig;
