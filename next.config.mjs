/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Add SVG support as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"] // Adds SVGR to handle SVGs as React components
    });

    // Add support for video files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      type: "asset/resource" // Handles video files as static assets
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true // Set to true for 308 redirects, false for 307
      }
    ];
  }
};

export default nextConfig;
