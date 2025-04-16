const path = require('path');
const CopyPlugin = require('copy-webpack-plugin'); // Thêm plugin copy assets

module.exports = {
  entry: './src/game.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  // output: {
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'docs'),
  //   publicPath: '/docs/' // Quan trọng cho dev server
  // },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname), // Phục vụ file từ thư mục gốc (chứa index.html)
    },
    compress: true,
    port: 9000,
    devMiddleware: {
       publicPath: '/docs/', // Đảm bảo bundle.js được phục vụ từ /docs/
       writeToDisk: true, // Có thể cần thiết để plugin copy hoạt động đúng trong dev
    },
    watchFiles: ['src/**/*', 'assets/**/*'], // Theo dõi thay đổi trong src và assets
  },
  plugins: [
    new CopyPlugin({ // Copy thư mục assets vào docs khi build
      patterns: [
        { from: 'assets', to: 'assets' }
      ],
    }),
  ],
};