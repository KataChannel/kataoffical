# ---- Stage 1: Build Stage ----
FROM node:20-alpine AS builder
LABEL stage="builder"

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --no-audit --prefer-offline

# Copy source code
COPY . .

# Build the Angular application
RUN npm run build

# ---- Stage 2: Production Stage ----
FROM node:20-alpine AS runtime

WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built application from builder stage
COPY --from=builder --chown=appuser:appgroup /app/dist/sandboxrau /app/dist/sandboxrau

# Copy package.json for any runtime dependencies
COPY --from=builder --chown=appuser:appgroup /app/package.json /app/package.json

# Switch to non-root user
USER appuser

# Expose port 4000 (as expected by docker-compose)
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD nc -z localhost 4000 || exit 1

# Run SSR application
CMD ["node", "dist/sandboxrau/server/server.mjs"]
