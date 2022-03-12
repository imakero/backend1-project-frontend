/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://localhost:5000/uploads/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/:path*",
      },
    ]
  },
}

module.exports = nextConfig
