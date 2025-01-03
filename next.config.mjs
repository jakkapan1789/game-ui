/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/tasks",
        permanent: true, // Indicates that the redirect is permanent
      },
    ];
  },
};

export default nextConfig;
