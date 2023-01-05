/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['api.mapbox.com', '127.0.0.1', 'localhost', 'pc-builder-eta.vercel.app', 'billowing-hill-1662.fly.dev'],
  },
};

module.exports = nextConfig;

