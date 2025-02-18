# Sử dụng image BunJS chính thức
FROM oven/bun:latest

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file package.json và bun.lockb trước để cache dependencies
COPY package.json bun.lock ./

# Cài đặt dependencies bằng Bun
# Copy toàn bộ source code vào container
COPY . .
COPY .env .env
RUN bun install
# (Tùy chọn) Nếu cần chạy migrate Prisma:
# RUN bunx prisma migrate deploy
# RUN bun prisma migrate dev --name init
# RUN bun run build
RUN bun prisma generate
# Mở cổng mà ứng dụng NestJS sử dụng (ví dụ: 3000)
EXPOSE 3000

# Chạy ứng dụng
CMD ["bun", "dist/main.js"]
