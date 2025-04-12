/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  distDir: '.next',
  // For Cloudflare Pages, we'll copy the output after build
  // instead of using output: 'export' which requires generateStaticParams
  async redirects() {
    return [
      {
        source: '/',
        destination: '/movie/tt0111161',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig 