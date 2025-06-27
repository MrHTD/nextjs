import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains : ['mawrid.vendor.devxonic.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
      {
        protocol: "http",
        hostname: "137.59.222.200",
        port: "4006",
        pathname: "/file/**",
      },
      {
        protocol: "https",
        hostname: "upload.devxonic.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
