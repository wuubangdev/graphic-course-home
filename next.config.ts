/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.khoahocdohoa.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "admin.khoahocdohoa.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
