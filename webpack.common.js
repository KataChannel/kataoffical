// webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/game.ts', // Đảm bảo đường dẫn này đúng với file entry của bạn
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Tìm các file .ts hoặc .tsx
        use: 'ts-loader', // Sử dụng ts-loader để biên dịch
        exclude: /node_modules/, // Bỏ qua node_modules
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Cho phép import không cần đuôi file
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Đường dẫn đến file HTML mẫu của bạn
      title: 'Phaser Farm Game', // Tiêu đề trang
    }),
  ],
  output: {
    // Output sẽ được định nghĩa cụ thể trong dev và prod configs
    path: path.resolve(__dirname, 'docs'),
    clean: true, // Xóa thư mục output trước mỗi lần build
  }, 
};