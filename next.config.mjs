/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/play",
        permanent: true, // Indicates that the redirect is permanent
      },
    ];
  },
};

export default nextConfig;
