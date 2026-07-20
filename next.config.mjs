/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async rewrites() {
    return [
      {
        source: "/portfolio/petlive-market-research",
        destination: "/portfolio/petlive-market-research/index.html"
      },
      {
        source: "/portfolio/petlive-market-research/",
        destination: "/portfolio/petlive-market-research/index.html"
      }
    ];
  }
};

export default nextConfig;
