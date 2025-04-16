// webpack.dev.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development', // Chế độ development
  devtool: 'inline-source-map', // Giúp debug dễ dàng hơn
  devServer: {
    static: './dist', // Phục vụ file từ thư mục dist
    hot: true, // Bật hot module replacement (tải lại nhanh khi code thay đổi)
    open: true, // Tự động mở trình duyệt
    compress: true,
    port: 8080, // Cổng cho dev server
  },
  output: {
      filename: 'bundle.js', // Tên file đơn giản cho dev
      // path đã được định nghĩa trong common
  },
});