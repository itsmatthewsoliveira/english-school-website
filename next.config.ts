import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dropped output:"export" + trailingSlash — static export breaks App Router
  // client-side navigation on Vercel, and disables API routes needed for the
  // Claude Haiku chatbot. Vercel runs Next.js natively, which is simpler.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
