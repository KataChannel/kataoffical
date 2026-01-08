# Stage 1: Chạy SSR trên Bun
FROM oven/bun:alpine AS runtime

WORKDIR /app

# Copy build có sẵn từ local vào Docker image
COPY ./dist/frontend /app/dist/frontend

# Chạy ứng dụng SSR
EXPOSE 4301
CMD ["bun", "dist/frontend/server/server.mjs"]
