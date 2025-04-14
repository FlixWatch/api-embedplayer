/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  distDir: '.next',
  // For Cloudflare Pages, we'll copy the output after build
  // instead of using output: 'export' which requires generateStaticParams
  async redirects() {
    return [] // Removed redirect to show the home page
  },
}

module.exports = nextConfig 