/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://atpv.despachantebeto.com.br/:path*',
        permanent: true, // 308 SEO-friendly
      },
    ];
  },
};

module.exports = nextConfig;
