# Sử dụng image Node.js mới nhất
FROM node:20-alpine AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install --force

# Sao chép toàn bộ project và build Angular
COPY . .
RUN npm run build --prod

# Dùng Nginx để phục vụ ứng dụng
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
