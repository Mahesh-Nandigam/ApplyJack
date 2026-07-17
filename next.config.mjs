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
    ];
  },
  async rewrites() {
    return [
      // Serve the static Lusion About page at /about (pathname must be /about for JS to work)
      {
        source: '/about',
        destination: '/about.html',
      },
      // Proxy ALL /assets/* requests to lusion.co CDN
      // The Lusion JS dynamically fetches 3D models, textures, audio, team photos at runtime
      // These are too large to bundle and must be proxied
      {
        source: '/assets/:path*',
        destination: 'https://lusion.co/assets/:path*',
      },
    ];
  },
};

export default nextConfig;
