/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /*
     * Next.js Image component requires us to whitelist external image domains.
     * Without this, images from Unsplash would fail to load with a 400 error.
     *
     * In Phase 3 when we store images on our own server or Cloudinary,
     * we will add those domains here.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
