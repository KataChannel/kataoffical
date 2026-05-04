# Frontend Angular 19 SSR — Build local, deploy Docker
FROM node:20-alpine

WORKDIR /app

# Copy toàn bộ dist đã build từ local (bao gồm manifest đã tạo bởi create-manifest.js)
COPY ./dist/frontend /app/dist/frontend

# Verify: đảm bảo tất cả file SSR quan trọng tồn tại trước khi chạy
RUN echo "🔍 Verifying SSR build artifacts..." \
    && test -f /app/dist/frontend/server/server.mjs \
    && test -f /app/dist/frontend/server/main.server.mjs \
    && test -f /app/dist/frontend/server/angular-app-manifest.mjs \
    && test -f /app/dist/frontend/server/angular-app-engine-manifest.mjs \
    && test -f /app/dist/frontend/server/index.server.html \
    && test -d /app/dist/frontend/browser \
    && echo "✅ All SSR files verified successfully" \
    || (echo "❌ ERROR: Missing critical SSR files! Run 'bun run build' locally first." && exit 1)

EXPOSE 4301
CMD ["node", "dist/frontend/server/server.mjs"]
