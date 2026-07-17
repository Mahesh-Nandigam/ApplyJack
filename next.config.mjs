/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Lusion JS scroll-navigates to /projects - redirect back to /about so JS initializes correctly
      {
        source: '/projects',
        destination: '/about',
        permanent: false,
      },
      {
        source: '/home',
        destination: '/about',
        permanent: false,
      },
    ];
  },
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
