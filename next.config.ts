import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    // The editorial stock sources already serve responsive assets; bypassing the local proxy also
    // keeps previews reliable in restricted and serverless development environments.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "graciasliving.com" },
      { protocol: "https", hostname: "d394n47j9kf644.cloudfront.net" },
      { protocol: "https", hostname: "epochwebsite2026.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "aurumliving.b-cdn.net" },
      { protocol: "https", hostname: "d3cit1div2ht9e.cloudfront.net" },
      { protocol: "https", hostname: "cdn.athulyaseniorcare.net" },
      { protocol: "https", hostname: "kitesseniorcare.com" },
      { protocol: "https", hostname: "www.vedaanta.com" },
      { protocol: "https", hostname: "ashianaseniorliving.com" },
      { protocol: "https", hostname: "www.ashianahousing.com" },
      { protocol: "https", hostname: "www.jagritidham.com" },
      { protocol: "https", hostname: "www.covaicare.com" },
      { protocol: "https", hostname: "travancorefoundation.org" },
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
};

export default nextConfig;
