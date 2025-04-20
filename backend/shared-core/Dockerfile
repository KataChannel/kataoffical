FROM oven/bun:latest AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --no-cache
COPY . .
RUN bun install -g prisma
RUN bun prisma migrate dev --name hethong1.1
RUN bun prisma generate
FROM oven/bun:latest
WORKDIR /app
COPY --from=builder /app /app
COPY --from=builder /app/dist /app/dist
COPY .env .env
EXPOSE 3100

# Run the application
CMD ["bun", "run", "dist/src/main.js"]
