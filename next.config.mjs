/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Serve the static Lusion About page at /about (pathname must be /about for JS to work)
      {
        source: '/about',
        destination: '/about.html',
      },
      // Lusion JS navigates to /projects when user scrolls - serve same page
      {
        source: '/projects',
        destination: '/about.html',
      },
      // Lusion JS navigates to / (home) - redirect to /about
      {
        source: '/home',
        destination: '/about.html',
      },
    ];
  },
};

export default nextConfig;
