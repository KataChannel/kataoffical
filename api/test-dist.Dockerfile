FROM oven/bun:latest
WORKDIR /app
COPY dist/ ./dist/
RUN ls -la dist/
RUN ls -la dist/prisma/
