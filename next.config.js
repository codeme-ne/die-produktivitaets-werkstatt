const path = require('path');
const withMDX = require('@next/mdx')({
  options: {
    // Ensure compiled MDX imports the Next MDX hook import source,
    // which we alias below to app/mdx-components.tsx.
    providerImportSource: 'next-mdx-import-source',
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // Fix workspace root inference so Next resolves app/* hooks correctly
  outputFileTracingRoot: __dirname,
  // Ensure MDX component mapping resolves to our server-safe hook
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next-mdx-import-source': path.join(__dirname, 'app/mdx-components.tsx'),
      'next-mdx-import-source-file': path.join(__dirname, 'app/mdx-components.tsx'),
    };
    return config;
  },
  images: {
    remotePatterns: [
      // NextJS <Image> component needs to whitelist domains for src={}
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "logos-world.net",
      },
    ],
  },
};

module.exports = withMDX(nextConfig);
