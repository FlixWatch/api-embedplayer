/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
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