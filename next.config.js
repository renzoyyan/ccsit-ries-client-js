/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["ccsit-ries-api.onrender.com", "storage.googleapis.com"],
  },

  env: {
    CCSIT_RIES:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_CCSIT_RIES_API_DOMAIN
        : "http://localhost:5000",
  },
};

module.exports = nextConfig;
