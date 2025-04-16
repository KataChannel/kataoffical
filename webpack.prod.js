// webpack.prod.js
const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Đã có trong devDependencies

module.exports = merge(common, {
  mode: 'production', // Chế độ production (tự động tối ưu hóa)
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/kataoffical/dist',
  },
  plugins: [
    // Sao chép thư mục assets vào thư mục dist
    // Đảm bảo đường dẫn 'from' là chính xác
    new CopyWebpackPlugin({
      patterns: [
        // Ví dụ: nếu assets nằm trong public/assets
        { from: 'assets', to: 'assets' }
        // Ví dụ: nếu assets nằm trong thư mục gốc assets
        // { from: 'assets', to: 'assets' }
      ]
    })
  ],
  performance: {
    // Có thể tắt cảnh báo về kích thước file lớn nếu muốn
    hints: false,
  },
  optimization: {
    // Có thể thêm các tối ưu hóa nâng cao ở đây nếu cần
    // splitChunks: { chunks: 'all' }, // Ví dụ: tách vendor code
  },
});