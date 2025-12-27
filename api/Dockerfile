# === OPTIMIZED DOCKERFILE FOR PRODUCTION ===
# Stage 1: Builder
FROM oven/bun:latest AS builder
RUN apt-get update -y && apt-get install -y openssl libssl-dev

WORKDIR /app

# Copy package files first (cache layer optimization)
COPY package.json bun.lockb ./

# Install dependencies (including dev dependencies for build)
RUN bun install --frozen-lockfile

# Copy source code
COPY prisma ./prisma
COPY src ./src
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Generate Prisma client
RUN bun prisma generate

# Build the application
RUN bun run build

# === PRODUCTION IMAGE ===
FROM oven/bun:slim AS production
RUN apt-get update -y && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

# Add non-root user for security
RUN addgroup --system app && adduser --system --ingroup app app
RUN chown -R app:app /app
USER app

# Expose the application port
EXPOSE 3331

# Run the application
CMD ["bun", "run", "dist/src/main.js"]
