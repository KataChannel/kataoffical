import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills'; // Import the polyfills plugin

export default defineConfig({
  // URL cơ sở cho ứng dụng (dùng "/" cho local, hoặc "/tên-repo/" cho GitHub Pages)
  base: '/',
  
  // Cấu hình alias để import dễ dàng
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // Plugin
  plugins: [
    // Add Node.js polyfills
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
    // Thay thế html-webpack-plugin
    createHtmlPlugin({
      minify: true,
      template: 'index1.html', // Đường dẫn đến tệp HTML mẫu
    }),
    // Thay thế copy-webpack-plugin
    viteStaticCopy({
      targets: [
        {
          src: 'assets/**/*', // Sao chép tất cả tệp từ assets (hình ảnh, sprites)
          dest: 'assets', // Đầu ra vào dist/assets
        },
      ],
    }),
  ],

  // Tùy chọn build
  build: {
    outDir: 'docs', // Thư mục đầu ra (trước đây là 'docs')
    assetsDir: 'assets', // Thư mục con cho tài nguyên
    sourcemap: process.env.NODE_ENV === 'development', // Bật sourcemap trong dev
    rollupOptions: {
      output: {
        // Tùy chỉnh đầu ra để giống bundle.js của Webpack
        entryFileNames: 'bundle-[hash].js',
        chunkFileNames: 'chunk-[hash].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },

  // Tùy chọn server cho phát triển
  server: {
    port: 3000,
    open: true, // Tự động mở trình duyệt
  },
});