# Dockerfile (NestJS Backend - Development with Bun)
FROM oven/bun:1.0-alpine AS development
WORKDIR /usr/src/app
COPY bun.lockb* ./
COPY package*.json ./
RUN bun install --frozen-lockfile
COPY . .
RUN bunx prisma generate --schema=./prisma/schema.prisma # Adjust schema path if needed
EXPOSE 3000
CMD [ "bun", "run", "start:dev" ]