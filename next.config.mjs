/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Serve the static Lusion About page at /about (pathname must be /about for JS to work)
      {
        source: '/about',
        destination: '/about.html',
      },
    ];
  },
};

export default nextConfig;
