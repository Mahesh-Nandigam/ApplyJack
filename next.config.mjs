/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
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
