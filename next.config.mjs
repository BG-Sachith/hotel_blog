// const Dotenv = require('dotenv-webpack');
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: 'swiperjs.com',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'vajrapani-blog-dev3.s3.eu-north-1.amazonaws.com',
      },
      {
        hostname: 'vajrapani-blog-dev.s3.eu-north-1.amazonaws.com',
      },
      {
        hostname: 'vajrapani-blog-beta.s3.eu-north-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'vajrapani-blog.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/post/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(path.resolve());
    // config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
  transpilePackages: ['@mui/system', '@mui/material', '@mui/icons-material'],
};

export default nextConfig;
