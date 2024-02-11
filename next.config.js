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
      {
        protocol: 'https',
        hostname: '1drv.ms',
      },
      {
        protocol: 'https',
        hostname: 'onedrive.live.com',
      },
      {
        protocol: 'https',
        hostname: 'yqpagg.ph.files.1drv.com'
      }
    ],
  },
  env: {
    VERSION: process.env.VERSION,
    API_URL: process.env.API_URL,
    IS_AUTH_BY: process.env.IS_AUTH_BY,
  }
};

module.exports = nextConfig;
