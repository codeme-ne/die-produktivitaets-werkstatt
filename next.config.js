const path = require("path");
const withMDX = require("@next/mdx")({
  options: {
    // Ensure compiled MDX imports the Next MDX hook import source,
    // which we alias below to app/mdx-components.tsx.
    providerImportSource: "next-mdx-import-source",
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  // Fix workspace root inference so Next resolves app/* hooks correctly
  outputFileTracingRoot: __dirname,
  // Ensure MDX component mapping resolves to our server-safe hook
  webpack: (config, { dev }) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "next-mdx-import-source": path.join(__dirname, "app/mdx-components.tsx"),
      "next-mdx-import-source-file": path.join(
        __dirname,
        "app/mdx-components.tsx",
      ),
    };

    // Fix: Exclude node_modules and .next from file watching
    if (dev) {
      config.watchOptions = {
        ignored: ["**/node_modules", "**/.next", "**/.git", "**/logs"],
      };
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: "/course",
        destination: "/kurs",
        permanent: true,
      },
      {
        source: "/course/:path*",
        destination: "/kurs",
        permanent: true,
      },
    ];
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
      // Bunny CDN for course assets (images, PDFs)
      {
        protocol: "https",
        hostname: "pw-bunny.b-cdn.net",
      },
    ],
  },
};

module.exports = withMDX(nextConfig);
