import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/user-dashboard/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/user-dashboard",
        destination: "/",
        permanent: false,
      },
      {
        source: "/organization-dashboard/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/organization-dashboard",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
