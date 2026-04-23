/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Kullanıcı yüklediği görselleri data URL olarak kullandığımız için
    // remote pattern tanımına gerek yok.
    unoptimized: true,
  },
};

export default nextConfig;
