/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    //env
  }
};

module.exports = nextConfig;
