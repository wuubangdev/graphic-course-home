/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    staleTimes: { dynamic: 0, static: 0 }, // <- XÓA dòng này là cache lại
  },
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
      {
        protocol: "http",
        hostname: "103.173.66.91",
        port: "1339",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
