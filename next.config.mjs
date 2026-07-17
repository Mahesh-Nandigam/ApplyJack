/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Serve the static Lusion About page at /about (pathname must be /about for JS to work)
      {
        source: '/about',
        destination: '/about.html',
      },
      // Proxy Lusion CDN assets (CSS, JS, WASM, fonts, images)
      {
        source: '/_astro/:path*',
        destination: 'https://lusion.co/_astro/:path*',
      },
      {
        source: '/assets/:path*',
        destination: 'https://lusion.co/assets/:path*',
      },
    ];
  },
};

export default nextConfig;
