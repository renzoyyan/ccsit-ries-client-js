/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CCSIT_RIES: process.env.NEXT_PUBLIC_CCSIT_RIES_API_DOMAIN,
  },
};

module.exports = nextConfig;
