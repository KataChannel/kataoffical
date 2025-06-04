# ---- Stage 1: Build Stage ----
# Sử dụng Node.js LTS làm base image. Sử dụng phiên bản cụ thể hơn.
FROM node:18.19.1 AS builder
LABEL stage="builder"

# Đặt thư mục làm việc
WORKDIR /app

# Copy các file quản lý dependencies và cấu hình build cốt lõi
COPY package.json package-lock.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Cài đặt tất cả dependencies cần thiết cho build (bao gồm devDependencies)
# Thêm --no-audit để bỏ qua kiểm tra lỗ hổng (có thể tăng tốc build nhẹ)
# Thêm --prefer-offline nếu bạn muốn ưu tiên cache cục bộ của npm
RUN npm ci --no-audit --prefer-offline --force

# Copy toàn bộ source code (trừ những gì trong .dockerignore)
COPY . .

# Thực hiện build production cho app 'beshop'
# Thêm NODE_ENV=production ở đây để đảm bảo build tối ưu
RUN NODE_ENV=production npx nx build beshop --prod

# ---- Stage 2: Production Stage ----
# Sử dụng base image Alpine nhẹ nhất có thể
FROM node:18.19.1-alpine

LABEL stage="production"

# Đặt biến môi trường cho Node.js là production
ENV NODE_ENV=production

# Đặt thư mục làm việc
WORKDIR /app

# Tạo group và user không có quyền root để chạy ứng dụng
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy file quản lý dependencies
COPY package.json package-lock.json ./

# Chỉ cài đặt production dependencies và xóa cache npm sau khi cài xong để giảm kích thước
RUN npm ci --omit=dev --no-audit --prefer-offline --force && npm cache clean --force

# Copy thư mục build từ stage 'builder' và gán quyền sở hữu
COPY --from=builder --chown=appuser:appgroup /app/dist/apps/beshop ./dist/apps/beshop

# Tạo thư mục uploads và gán quyền sở hữu cho appuser (để khắc phục lỗi EACCES)
RUN mkdir /app/uploads && chown appuser:appgroup /app/uploads

# Chuyển sang user không có quyền root
USER appuser

# Expose cổng ứng dụng (cổng 3200 theo main.ts của bạn)
EXPOSE 3200

# Thêm HEALTHCHECK để Docker kiểm tra tình trạng container
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD nc -z localhost 3200 || exit 1

# Lệnh chạy ứng dụng
CMD ["node", "dist/apps/beshop/main.js"]