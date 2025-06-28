// next.config.js (CẤU HÌNH MỚI)
/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Hoặc 'http' nếu cần
        hostname: 'via.placeholder.com', // Thay thế bằng domain của bạn
        // Có thể thêm port và pathname nếu cần giới hạn cụ thể hơn
        // port: '',
        // pathname: '/path/to/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Thêm các domain khác của bạn ở đây
      },
      // Thêm các đối tượng khác cho mỗi domain bạn muốn cho phép
    ],
  },
};

export default nextConfig;