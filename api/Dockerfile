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
RUN apt-get update -y && apt-get install -y openssl libssl-dev postgresql-client && rm -rf /var/lib/apt/lists/*

# Create non-root user FIRST before copying files
RUN groupadd -r app && useradd -r -g app app

WORKDIR /app

# Copy files with --chown flag to avoid slow chown -R  
COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/dist ./dist
COPY --from=builder --chown=app:app /app/package.json ./package.json

# Copy original prisma folder for schema.prisma (needed for Prisma client)
COPY --from=builder --chown=app:app /app/prisma ./prisma-schema

# Create prisma as a local package in node_modules for 'prisma/prisma.service' import
RUN mkdir -p /app/node_modules/prisma-local && \
    cp /app/dist/prisma/*.js /app/node_modules/prisma-local/ && \
    cp /app/dist/prisma/*.d.ts /app/node_modules/prisma-local/ && \
    echo '{"name":"prisma-local","main":"prisma.module.js"}' > /app/node_modules/prisma-local/package.json

# Backup existing prisma and create our module
RUN mv /app/node_modules/prisma /app/node_modules/prisma-cli && \
    mv /app/node_modules/prisma-local /app/node_modules/prisma

# Create symlink for 'src/' path resolution (compiled code uses 'src/xxx' imports)
RUN ln -s /app/dist/src /app/node_modules/src

# Copy sync scripts and sql files
COPY --chown=app:app scripts ./scripts
COPY --chown=app:app sql ./sql
RUN chmod +x /app/scripts/*.sh

# Ensure logs directory exists and is writable by app user
RUN mkdir -p /app/logs && chown app:app /app/logs && chmod 777 /app/logs

USER app

# Expose the application port
EXPOSE 3331

WORKDIR /app

# Run the application
CMD ["bun", "run", "dist/src/main.js"]
