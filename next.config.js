/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sensiba.com',
        port: '',
        pathname: '/wp-content/uploads/2023/04/Work-in-Progress.jpg',
      },
    ],
  },
  env: {
    VERSION: process.env.VERSION,
    API_URL: process.env.API_URL,
  }
};

module.exports = nextConfig;
