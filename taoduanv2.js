const fs = require('fs');
const path = require('path');

// --- Configuration ---
const workspaceName = 'kataoffical'; // Updated name for clarity
const projectRootDir = workspaceName;

// --- Nx Directory Structure (apps & libs) ---
const directories = [
    // Applications
    'apps/shared-core-api/prisma',
    'apps/academy-api/prisma',
    'apps/cosmetics-api/prisma',
    'apps/spa-api/prisma',
    'apps/landing-page-builder-api/prisma',
    'apps/admin-ui/src',
    'apps/academy-ui/src',
    'apps/cosmetics-ui/src',
    'apps/spa-ui/src',
    // Libraries (Placeholder)
    'libs/shared/dto/src',
    'libs/shared/utils/src',
    'libs/landing-page/interfaces/src',
    // Infrastructure
    'infra/nginx/includes',
    'infra/docker/postgres',
];

// --- File Contents ---

// --- Nội dung docker-compose.yml (Sử dụng bun nx serve) ---
const dockerComposeContent = `
version: '3.8'

services:
  # --- Database and Cache Services (Giữ nguyên) ---
  postgres:
    image: postgres:15-alpine
    container_name: postgres_db_nx_lp_bun
    environment:
      POSTGRES_USER: \${POSTGRES_USER:-user}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD:-password}
      POSTGRES_DB: \${SHARED_DATABASE_NAME:-shared_db}
      ACADEMY_DATABASE_NAME: \${ACADEMY_DATABASE_NAME:-academy_db}
      COSMETICS_DATABASE_NAME: \${COSMETICS_DATABASE_NAME:-cosmetics_db}
      SPA_DATABASE_NAME: \${SPA_DATABASE_NAME:-spa_db}
      LANDING_PAGE_DATABASE_NAME: \${LANDING_PAGE_DATABASE_NAME:-landing_page_db}
    volumes:
      - postgres_data_nx_lp_bun:/var/lib/postgresql/data
      - ./infra/docker/postgres/init-db.sh:/docker-entrypoint-initdb.d/init-db.sh
    ports:
      - "5433:5432" # Use a different host port if the Node version is running
    networks:
      - app-network-nx-lp-bun
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER:-user} -d \${SHARED_DATABASE_NAME:-shared_db}"]
      interval: 10s
      timeout: 5s
      retries: 5

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: pgadmin_gui_nx_lp_bun
    environment:
      PGADMIN_DEFAULT_EMAIL: \${PGADMIN_EMAIL:-admin@example.com}
      PGADMIN_DEFAULT_PASSWORD: \${PGADMIN_PASSWORD:-admin}
    volumes:
      - pgadmin_data_nx_lp_bun:/var/lib/pgadmin
    ports:
      - "5051:80" # Use a different host port if the Node version is running
    networks:
      - app-network-nx-lp-bun
    depends_on:
      postgres: { condition: service_healthy }
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: redis_cache_nx_lp_bun
    command: redis-server --save 60 1 --loglevel warning
    volumes:
      - redis_data_nx_lp_bun:/data
    ports:
      - "6380:6379" # Use a different host port if the Node version is running
    networks:
      - app-network-nx-lp-bun
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # --- Backend Services (Nx Apps - using Bun) ---
  shared-core-api:
    build: { context: ., dockerfile: ./apps/shared-core-api/Dockerfile }
    container_name: shared_core_api_nx_lp_bun
    environment:
      NODE_ENV: development # Bun respects NODE_ENV
      PORT: 3000
      DATABASE_URL: \${SHARED_DATABASE_URL}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      JWT_SECRET: \${JWT_SECRET}
      ACADEMY_API_INTERNAL_URL: http://academy-api:3000
      COSMETICS_API_INTERNAL_URL: http://cosmetics-api:3000
      SPA_API_INTERNAL_URL: http://spa-api:3000
      LANDING_PAGE_API_INTERNAL_URL: http://landing-page-builder-api:3000
    volumes: [".:/usr/src/app", "/usr/src/app/node_modules"] # Mount source code, keep node_modules from image
    depends_on: { postgres: { condition: service_healthy }, redis: { condition: service_healthy } }
    networks: ["app-network-nx-lp-bun"]
    # Use bun run <script> or bun <command>
    command: bun nx serve shared-core-api --host 0.0.0.0 --port=3000 --verbose # Use bun nx
    restart: unless-stopped

  academy-api:
    build: { context: ., dockerfile: ./apps/academy-api/Dockerfile }
    container_name: academy_api_nx_lp_bun
    environment:
      NODE_ENV: development
      PORT: 3000
      DATABASE_URL: \${ACADEMY_DATABASE_URL}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      SHARED_CORE_API_URL: http://shared-core-api:3000
      JWT_SECRET: \${JWT_SECRET}
    volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
    depends_on: { postgres: { condition: service_healthy }, redis: { condition: service_healthy }, shared-core-api: { condition: service_started } }
    networks: ["app-network-nx-lp-bun"]
    command: bun nx serve academy-api --host 0.0.0.0 --port=3000 --verbose # Use bun nx
    restart: unless-stopped

  cosmetics-api:
    build: { context: ., dockerfile: ./apps/cosmetics-api/Dockerfile }
    container_name: cosmetics_api_nx_lp_bun
    environment: { NODE_ENV: development, PORT: 3000, DATABASE_URL: \${COSMETICS_DATABASE_URL}, REDIS_HOST: redis, REDIS_PORT: 6379, SHARED_CORE_API_URL: http://shared-core-api:3000, JWT_SECRET: \${JWT_SECRET} }
    volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
    depends_on: { postgres: { condition: service_healthy }, redis: { condition: service_healthy }, shared-core-api: { condition: service_started } }
    networks: ["app-network-nx-lp-bun"]
    command: bun nx serve cosmetics-api --host 0.0.0.0 --port=3000 --verbose # Use bun nx
    restart: unless-stopped

  spa-api:
    build: { context: ., dockerfile: ./apps/spa-api/Dockerfile }
    container_name: spa_api_nx_lp_bun
    environment: { NODE_ENV: development, PORT: 3000, DATABASE_URL: \${SPA_DATABASE_URL}, REDIS_HOST: redis, REDIS_PORT: 6379, SHARED_CORE_API_URL: http://shared-core-api:3000, JWT_SECRET: \${JWT_SECRET} }
    volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
    depends_on: { postgres: { condition: service_healthy }, redis: { condition: service_healthy }, shared-core-api: { condition: service_started } }
    networks: ["app-network-nx-lp-bun"]
    command: bun nx serve spa-api --host 0.0.0.0 --port=3000 --verbose # Use bun nx
    restart: unless-stopped

  landing-page-builder-api:
    build:
      context: .
      dockerfile: ./apps/landing-page-builder-api/Dockerfile
    container_name: landing_page_builder_api_nx_lp_bun
    environment:
      NODE_ENV: development
      PORT: 3000
      DATABASE_URL: \${LANDING_PAGE_DATABASE_URL}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      SHARED_CORE_API_URL: http://shared-core-api:3000
      JWT_SECRET: \${JWT_SECRET}
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    depends_on:
      postgres: { condition: service_healthy }
      redis: { condition: service_healthy }
      shared-core-api: { condition: service_started }
    networks:
      - app-network-nx-lp-bun
    command: bun nx serve landing-page-builder-api --host 0.0.0.0 --port=3000 --verbose # Use bun nx
    restart: unless-stopped

  # --- Frontend Services (Nx Apps - using Bun for dev server) ---
  admin-ui:
    build: { context: ., dockerfile: ./apps/admin-ui/Dockerfile }
    container_name: admin_ui_app_nx_lp_bun
    volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
    ports: ["4200:4200"] # Use different host port if Node version is running
    depends_on:
      shared-core-api: { condition: service_started }
      landing-page-builder-api: { condition: service_started }
    networks: ["app-network-nx-lp-bun"]
    command: bun nx serve admin-ui --host 0.0.0.0 --port 4200 # Use bun nx
    restart: unless-stopped

  academy-ui:
      build: { context: ., dockerfile: ./apps/academy-ui/Dockerfile }
      container_name: academy_ui_app_nx_lp_bun
      volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
      ports: ["4201:4200"]
      depends_on: { academy-api: { condition: service_started } }
      networks: ["app-network-nx-lp-bun"]
      command: bun nx serve academy-ui --host 0.0.0.0 --port 4200 # Use bun nx
      restart: unless-stopped

  cosmetics-ui:
    build: { context: ., dockerfile: ./apps/cosmetics-ui/Dockerfile }
    container_name: cosmetics_ui_app_nx_lp_bun
    volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
    ports: ["4202:4200"]
    depends_on: { cosmetics-api: { condition: service_started } }
    networks: ["app-network-nx-lp-bun"]
    command: bun nx serve cosmetics-ui --host 0.0.0.0 --port 4200 # Use bun nx
    restart: unless-stopped

  spa-ui:
    build: { context: ., dockerfile: ./apps/spa-ui/Dockerfile }
    container_name: spa_ui_app_nx_lp_bun
    volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
    ports: ["4203:4200"]
    depends_on: { spa-api: { condition: service_started } }
    networks: ["app-network-nx-lp-bun"]
    command: bun nx serve spa-ui --host 0.0.0.0 --port 4200 # Use bun nx
    restart: unless-stopped

  # --- Nginx Reverse Proxy (Dependency names updated) ---
  nginx:
    image: nginx:1.25-alpine
    container_name: nginx_proxy_nx_lp_bun
    ports: ["8088:80"] # Use different host port if Node version is running
    volumes:
      - ./infra/nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./infra/nginx/includes:/etc/nginx/includes:ro
    depends_on: # Ensure these match the service names above
      - shared-core-api
      - academy-api
      - cosmetics-api
      - spa-api
      - landing-page-builder-api
      - admin-ui
      - academy-ui
      - cosmetics-ui
      - spa-ui
    networks:
      - app-network-nx-lp-bun
    restart: unless-stopped

# --- Volumes and Networks (Updated names) ---
volumes:
  postgres_data_nx_lp_bun: { driver: local }
  pgadmin_data_nx_lp_bun: { driver: local }
  redis_data_nx_lp_bun: { driver: local }

networks:
  app-network-nx-lp-bun: { driver: bridge }
`;

// --- Nội dung infra/nginx/nginx.conf (Giữ nguyên - upstream names match compose service names) ---
const nginxConfContent = `
# infra/nginx/nginx.conf

# Backend Upstreams (Names match service names in docker-compose)
upstream shared_api { server shared-core-api:3000; }
upstream academy_api { server academy-api:3000; }
upstream cosmetics_api { server cosmetics-api:3000; }
upstream spa_api { server spa-api:3000; }
upstream landing_page_api { server landing-page-builder-api:3000; }

# Frontend Upstreams (Names match service names in docker-compose, pointing to dev servers)
upstream admin_fe_app { server admin-ui:4200; }
upstream academy_fe_app { server academy-ui:4200; }
upstream cosmetics_fe_app { server cosmetics-ui:4200; }
upstream spa_fe_app { server spa-ui:4200; }

server {
    listen 80;
    server_name localhost;

    client_max_body_size 50M;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;


    # API Routing
    location /api/shared/ { proxy_pass http://shared_api/; include /etc/nginx/includes/proxy_params; }
    location /api/academy/ { proxy_pass http://academy_api/; include /etc/nginx/includes/proxy_params; }
    location /api/cosmetics/ { proxy_pass http://cosmetics_api/; include /etc/nginx/includes/proxy_params; }
    location /api/spa/ { proxy_pass http://spa_api/; include /etc/nginx/includes/proxy_params; }
    location /api/landing-page/ { proxy_pass http://landing_page_api/; include /etc/nginx/includes/proxy_params; }


    # Frontend Routing (Proxying to Angular Dev Servers run by Bun)
    location /admin/ { proxy_pass http://admin_fe_app/; include /etc/nginx/includes/proxy_params_angular_dev; }
    location /academy/ { proxy_pass http://academy_fe_app/; include /etc/nginx/includes/proxy_params_angular_dev; }
    location /cosmetics/ { proxy_pass http://cosmetics_fe_app/; include /etc/nginx/includes/proxy_params_angular_dev; }
    location /spa/ { proxy_pass http://spa_fe_app/; include /etc/nginx/includes/proxy_params_angular_dev; }

    # Root Location
    location = / { return 301 /admin/; }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
`;

// --- Nội dung infra/nginx/includes/... (Giữ nguyên) ---
const nginxProxyParamsContent = `
# infra/nginx/includes/proxy_params
proxy_set_header Host $http_host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_buffer_size          128k;
proxy_buffers            4 256k;
proxy_busy_buffers_size    256k;
`;
const nginxProxyParamsAngularDevContent = `
# infra/nginx/includes/proxy_params_angular_dev
include /etc/nginx/includes/proxy_params;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "Upgrade";
`;

// --- Nội dung infra/docker/postgres/init-db.sh (Giữ nguyên) ---
const initDbScriptContent = `
#!/bin/bash
# infra/docker/postgres/init-db.sh
set -e
POSTGRES_USER="\${POSTGRES_USER:-user}"
SHARED_DB="\${SHARED_DATABASE_NAME:-shared_db}"
ACADEMY_DB="\${ACADEMY_DATABASE_NAME:-academy_db}"
COSMETICS_DB="\${COSMETICS_DATABASE_NAME:-cosmetics_db}"
SPA_DB="\${SPA_DATABASE_NAME:-spa_db}"
LANDING_PAGE_DB="\${LANDING_PAGE_DATABASE_NAME:-landing_page_db}"

echo "--- Initializing Databases (NX Version with LP) ---"
create_db_if_not_exists() {
  local db_name=\$1
  echo "Checking/Creating database '\$db_name'..."
  psql -v ON_ERROR_STOP=1 --username "\$POSTGRES_USER" --dbname "\$POSTGRES_DB" <<-EOSQL
    SELECT 'CREATE DATABASE \$db_name' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '\$db_name')\gexec
EOSQL
  if [ \$? -eq 0 ]; then echo "Database '\$db_name' checked/created."; else echo "Error checking/creating database '\$db_name'."; fi;
}

create_db_if_not_exists "\$ACADEMY_DB";
create_db_if_not_exists "\$COSMETICS_DB";
create_db_if_not_exists "\$SPA_DB";
create_db_if_not_exists "\$LANDING_PAGE_DB";

echo "--- Database Initialization Complete (NX Version with LP) ---"
`;

// --- Nội dung Dockerfile Backend (NestJS) Template - Using Bun ---
const backendDockerfileContent = `
# apps/<APP_NAME>/Dockerfile
# Use official Bun image on Alpine
FROM oven/bun:1-alpine AS base

# Set the working directory
WORKDIR /usr/src/app

# Define ARG for App Name and Schema Path
ARG APP_NAME=<APP_NAME>
ARG SCHEMA_PATH=./apps/\${APP_NAME}/prisma/schema.prisma

# Install OS-level dependencies needed for Prisma (and potentially other native modules)
# openssl should be present in bun alpine image, but ensure build tools are there if needed
RUN apk add --no-cache python3 make g++

# --- Dependencies Stage ---
FROM base AS deps
WORKDIR /usr/src/app

# Copy essential package management and config files
COPY package.json bun.lockb nx.json tsconfig.base.json ./
# Copy potentially relevant workspace config if it exists
COPY workspace.json* angular.json* ./

# Install dependencies using Bun
RUN bun install --frozen-lockfile

# --- Prisma Generation Stage ---
FROM deps AS prisma_generator
WORKDIR /usr/src/app
ARG APP_NAME
ARG SCHEMA_PATH
# Copy potentially shared prisma utils/seed files
COPY prisma ./prisma
# Copy app-specific prisma schema (ensure path is correct)
COPY apps/\${APP_NAME}/prisma ./apps/\${APP_NAME}/prisma

# Generate Prisma client using bunx (equivalent to npx)
# Ensure the schema path copied above is correct relative to WORKDIR
RUN bunx prisma generate --schema=\${SCHEMA_PATH}

# --- Development Build Stage ---
# Prepares the image for development with volume mounts
FROM prisma_generator AS development
WORKDIR /usr/src/app
ARG APP_NAME

# Copy all source code (will be overlayed by volume mount in dev)
# Copying node_modules from deps stage is implicitly done by FROM
COPY . .

# Set a default command (will be overridden by docker-compose 'command')
# This command would typically run the production build if not overridden.
EXPOSE 3000
# Default to running the built app IF it exists (for potential direct run)
# CMD [ "bun", "run", "dist/apps/<APP_NAME>/main.js" ] # Use bun run
# Placeholder, as compose overrides this for dev server
CMD ["echo", "Default command overridden by docker-compose for development"]


# --- Production Build Stage (Example) ---
# FROM deps AS builder
# WORKDIR /usr/src/app
# ARG APP_NAME
# COPY . .
# # Generate Prisma client if needed here
# # RUN bunx prisma generate --schema=./apps/\${APP_NAME}/prisma/schema.prisma
# # Build the specific application using Nx (via bun nx)
# RUN bun nx build \${APP_NAME} --prod --skip-nx-cache
#
# # --- Production Runtime Stage (Example) ---
# FROM oven/bun:1-alpine AS production # Use bun image for runtime too
# WORKDIR /usr/src/app
# ARG APP_NAME
# ENV NODE_ENV production
# COPY --from=builder /usr/src/app/dist/apps/\${APP_NAME} ./dist/apps/\${APP_NAME}
# # Copy necessary node_modules (might need pruning)
# COPY --from=deps /usr/src/app/node_modules ./node_modules
# # Copy Prisma client & runtime files
# COPY --from=prisma_generator /usr/src/app/node_modules/.prisma ./node_modules/.prisma
# COPY --from=prisma_generator /usr/src/app/node_modules/@prisma ./node_modules/@prisma
# COPY --from=builder /usr/src/app/apps/\${APP_NAME}/prisma ./prisma # Optional: Copy schema for runtime migrations
#
# # Add a non-root user (recommended)
# # RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# # USER appuser
#
# EXPOSE 3000
# CMD [ "bun", "run", "dist/apps/<APP_NAME>/main.js" ] # Use bun run
`;

// --- Nội dung Dockerfile Frontend (Angular) Template - Using Bun ---
const frontendDockerfileContent = `
# apps/<APP_NAME>/Dockerfile
# Use official Bun image on Alpine for build and dev server
FROM oven/bun:1-alpine AS base

WORKDIR /usr/src/app

# Define ARG for App Name
ARG APP_NAME=<APP_NAME>

# Install git, needed for certain dependencies
RUN apk add --no-cache git

# --- Dependencies Stage ---
FROM base AS deps
WORKDIR /usr/src/app

# Copy essential package management and config files
COPY package.json bun.lockb nx.json tsconfig.base.json ./
# Copy potentially relevant workspace/angular config
COPY workspace.json* angular.json* ./

# Install dependencies using Bun
RUN bun install --frozen-lockfile

# --- Development Build Stage ---
# Prepares the image for development with volume mounts
FROM deps AS development
WORKDIR /usr/src/app
ARG APP_NAME

# Copy the entire source code (will be overlayed by volume mount in dev)
COPY . .

# Expose the default Angular dev server port
EXPOSE 4200

# Default command (will be overridden by docker-compose 'command' to run 'bun nx serve')
CMD [ "bun", "nx", "serve", "<APP_NAME>", "--host", "0.0.0.0", "--port", "4200" ]


# --- Production Build Stage (Example - Using Bun builder) ---
# FROM deps AS builder
# WORKDIR /usr/src/app
# ARG APP_NAME
# COPY . .
# # Build the specific application using Nx (via bun nx)
# RUN bun nx build \${APP_NAME} --prod --skip-nx-cache
#
# # --- Production Runtime Stage (Example - Using Nginx) ---
# FROM nginx:1.25-alpine AS production
# ARG APP_NAME
# # Copy built Angular app artifacts from builder stage to Nginx html directory
# COPY --from=builder /usr/src/app/dist/apps/\${APP_NAME}/browser /usr/share/nginx/html
# # Copy custom Nginx configuration for Angular routing
# COPY ./infra/nginx/nginx-prod-angular.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
`;

// --- Nội dung .dockerignore (Giữ nguyên) ---
const dockerignoreContent = `
# .dockerignore - Exclude files/folders from Docker build context
.git
.gitignore
node_modules
# Bun cache directory (if applicable locally)
.bun
# Nx specific cache/outputs
dist
tmp
.nx/cache
# OS specific
.DS_Store
Thumbs.db
# IDE specific
.idea
.vscode
# Log files
*.log
logs/
# Environment files
.env
.env.*
!/.env.example
# Docker specific files
docker-compose.yml
docker-compose.*.yml
Dockerfile
# !/apps/*/Dockerfile
# Other temporary/unnecessary files
coverage/
*.tsbuildinfo
`;


// --- Nội dung Prisma Schema (Giữ nguyên binaryTargets - Bun uses Node-API compatible binaries) ---
const landingPagePrismaContent = `
/// apps/landing-page-builder-api/prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("LANDING_PAGE_DATABASE_URL")
}
generator client {
  provider        = "prisma-client-js"
  output          = "../../../node_modules/.prisma/client-landing-page"
  // Bun's Node-API compatibility generally works with linux-musl targets
  binaryTargets   = ["native", "linux-musl-openssl-3.0.x"]
  previewFeatures = ["extendedWhereUnique"]
}
model LandingPage { id String @id @default(cuid()) slug String @unique name String title String? description String? content Json isPublished Boolean @default(false) publishedAt DateTime? userId String? createdAt DateTime @default(now()) updatedAt DateTime @updatedAt @@index([isPublished]) @@map("landing_pages") }
model BlockType { id String @id @default(cuid()) code String @unique name String schema Json template String? icon String? createdAt DateTime @default(now()) updatedAt DateTime @updatedAt @@map("block_types") }
`;
const sharedPrismaContent = `
// apps/shared-core-api/prisma/schema.prisma
datasource db { provider = "postgresql" url = env("SHARED_DATABASE_URL") }
generator client { provider = "prisma-client-js" output = "../../../node_modules/.prisma/client-shared-core" binaryTargets = ["native", "linux-musl-openssl-3.0.x"] }
model User { id String @id @default(cuid()) email String @unique password String name String? createdAt DateTime @default(now()) updatedAt DateTime @updatedAt @@map("users") }
`;
const academyPrismaContent = `
// apps/academy-api/prisma/schema.prisma
datasource db { provider = "postgresql" url = env("ACADEMY_DATABASE_URL") }
generator client { provider = "prisma-client-js" output = "../../../node_modules/.prisma/client-academy" binaryTargets = ["native", "linux-musl-openssl-3.0.x"] }
model Course { id String @id @default(cuid()) title String description String? createdAt DateTime @default(now()) updatedAt DateTime @updatedAt @@map("courses") }
`;
const cosmeticsPrismaContent = `
// apps/cosmetics-api/prisma/schema.prisma
datasource db { provider = "postgresql" url = env("COSMETICS_DATABASE_URL") }
generator client { provider = "prisma-client-js" output = "../../../node_modules/.prisma/client-cosmetics" binaryTargets = ["native", "linux-musl-openssl-3.0.x"] }
model Product { id String @id @default(cuid()) name String price Float description String? createdAt DateTime @default(now()) updatedAt DateTime @updatedAt @@map("products") }
`;
const spaPrismaContent = `
// apps/spa-api/prisma/schema.prisma
datasource db { provider = "postgresql" url = env("SPA_DATABASE_URL") }
generator client { provider = "prisma-client-js" output = "../../../node_modules/.prisma/client-spa" binaryTargets = ["native", "linux-musl-openssl-3.0.x"] }
model Service { id String @id @default(cuid()) name String durationMin Int price Float createdAt DateTime @default(now()) updatedAt DateTime @updatedAt @@map("services") }
`;

// --- Nội dung .env (Giữ nguyên - DB URLs/secrets are independent of runtime) ---
const envContent = `
# .env - Environment Variables for Nx Workspace with Landing Page (Bun version)
# Database URLs
SHARED_DATABASE_URL="postgresql://user:password@postgres:5432/shared_db?schema=public"
ACADEMY_DATABASE_URL="postgresql://user:password@postgres:5432/academy_db?schema=public"
COSMETICS_DATABASE_URL="postgresql://user:password@postgres:5432/cosmetics_db?schema=public"
SPA_DATABASE_URL="postgresql://user:password@postgres:5432/spa_db?schema=public"
LANDING_PAGE_DATABASE_URL="postgresql://user:password@postgres:5432/landing_page_db?schema=public"

# Database Names
SHARED_DATABASE_NAME=shared_db
ACADEMY_DATABASE_NAME=academy_db
COSMETICS_DATABASE_NAME=cosmetics_db
SPA_DATABASE_NAME=spa_db
LANDING_PAGE_DATABASE_NAME=landing_page_db

# Postgres Credentials
POSTGRES_USER=user
POSTGRES_PASSWORD=password

# PgAdmin Credentials
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin

# Redis
# REDIS_PASSWORD=your_redis_password

# Security
JWT_SECRET=replace_this_with_a_very_strong_random_secret_key_nx_lp_bun
`;

// --- Helper Function to replace placeholders in Dockerfiles ---
function createDockerfileContent(template, appName) {
    const schemaPath = `./apps/${appName}/prisma/schema.prisma`;
    return template
        .replace(/<APP_NAME>/g, appName)
        .replace('<SCHEMA_PATH>', schemaPath);
}


// --- Main Script Logic ---
const rootDirPath = path.resolve(__dirname, projectRootDir);

console.log(`\n--- Simulating Nx Workspace Structure Creation (with LandingPage & Bun Dockerfiles) ---`);
console.log(`Target Directory: ${rootDirPath}`);
console.warn(`\n[!] IMPORTANT: This script ONLY creates directories and config files.`);
console.warn(`You MUST run 'npx create-nx-workspace...' (or 'bun create nx-workspace') first, then the 'nx generate...' commands provided below.`);

try {
    if (!fs.existsSync(rootDirPath)) {
        console.error(`Error: Root directory ${projectRootDir} does not exist.`);
        console.error(`Please create the Nx workspace first using Bun:`);
        console.error(`  bun create nx-workspace@latest ${workspaceName} --preset=ts --nxCloud=skip --pm=bun`); // Create with Bun
        console.error(`Then 'cd ${workspaceName}' and run this script again, OR manually run the nx generate commands.`);
        process.exit(1);
    } else {
        console.log(`Directory ${projectRootDir} found. Proceeding to create structure inside.`);
    }

    // Tạo cấu trúc thư mục con
    directories.forEach(dir => {
        const dirPath = path.join(rootDirPath, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Created directory: ${dir}`);
        }
    });

    // Tạo các file cấu hình
    const files = {
        'docker-compose.yml': dockerComposeContent,
        '.env': envContent,
        '.dockerignore': dockerignoreContent,
        'infra/nginx/nginx.conf': nginxConfContent,
        'infra/nginx/includes/proxy_params': nginxProxyParamsContent,
        'infra/nginx/includes/proxy_params_angular_dev': nginxProxyParamsAngularDevContent,
        'infra/docker/postgres/init-db.sh': initDbScriptContent,
        // Prisma Schema Files
        'apps/shared-core-api/prisma/schema.prisma': sharedPrismaContent,
        'apps/academy-api/prisma/schema.prisma': academyPrismaContent,
        'apps/cosmetics-api/prisma/schema.prisma': cosmeticsPrismaContent,
        'apps/spa-api/prisma/schema.prisma': spaPrismaContent,
        'apps/landing-page-builder-api/prisma/schema.prisma': landingPagePrismaContent,
        // Dockerfiles (Generated from Bun templates)
        'apps/shared-core-api/Dockerfile': createDockerfileContent(backendDockerfileContent, 'shared-core-api'),
        'apps/academy-api/Dockerfile': createDockerfileContent(backendDockerfileContent, 'academy-api'),
        'apps/cosmetics-api/Dockerfile': createDockerfileContent(backendDockerfileContent, 'cosmetics-api'),
        'apps/spa-api/Dockerfile': createDockerfileContent(backendDockerfileContent, 'spa-api'),
        'apps/landing-page-builder-api/Dockerfile': createDockerfileContent(backendDockerfileContent, 'landing-page-builder-api'),
        'apps/admin-ui/Dockerfile': frontendDockerfileContent.replace(/<APP_NAME>/g, 'admin-ui'),
        'apps/academy-ui/Dockerfile': frontendDockerfileContent.replace(/<APP_NAME>/g, 'academy-ui'),
        'apps/cosmetics-ui/Dockerfile': frontendDockerfileContent.replace(/<APP_NAME>/g, 'cosmetics-ui'),
        'apps/spa-ui/Dockerfile': frontendDockerfileContent.replace(/<APP_NAME>/g, 'spa-ui'),
    };

    for (const [filePath, content] of Object.entries(files)) {
        const fullPath = path.join(rootDirPath, filePath);
        const dirName = path.dirname(fullPath);
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, { recursive: true });
        }
        try {
            fs.writeFileSync(fullPath, content.trim());
            console.log(`Created file: ${filePath}`);
            if (filePath.endsWith('init-db.sh')) {
                fs.chmodSync(fullPath, 0o755);
                console.log(`Made ${filePath} executable.`);
            }
        } catch (writeErr) {
            console.error(`Error writing file ${filePath}:`, writeErr);
        }
    }

    console.log('\n--- Simulated Nx Structure and Config Files Created Successfully (with Landing Page & Bun Dockerfiles)! ---');

    // --- Hướng dẫn các bước tiếp theo (Updated for Bun) ---
    console.log('\n--- [!!!] REQUIRED NEXT STEPS (Using Bun) ---');
    console.log(`1. Ensure you are inside the '${workspaceName}' directory.`);
    console.log(`2. Install root dependencies: bun install`);
    console.log(`3. Run 'nx generate' commands (can use 'bun nx g ...'):`);
    console.log(`   (Adjust options as needed. Script assumes these directory structures)`);
    console.log("\n   # Backend Apps (NestJS):");
    console.log(`   bun nx g @nx/nest:app shared-core-api --directory=apps/shared-core-api --projectNameAndRootFormat=as-provided`);
    console.log(`   bun nx g @nx/nest:app academy-api --directory=apps/academy-api --projectNameAndRootFormat=as-provided`);
    // ... (generate other backend apps similarly) ...
    console.log(`   bun nx g @nx/nest:app landing-page-builder-api --directory=apps/landing-page-builder-api --projectNameAndRootFormat=as-provided`);
    console.log("\n   # Frontend Apps (Angular):");
    console.log(`   bun nx g @nx/angular:app admin-ui --directory=apps/admin-ui --style=scss --routing --prefix=admin --projectNameAndRootFormat=as-provided`);
    // ... (generate other frontend apps similarly) ...
    console.log(`   bun nx g @nx/angular:app spa-ui --directory=apps/spa-ui --style=scss --routing --prefix=spa --projectNameAndRootFormat=as-provided`);
    console.log("   # (Landing Page UI integrated into admin-ui)");
    console.log("\n   # Shared Libraries (Example):");
    console.log(`   bun nx g @nx/js:lib shared/dto --directory=libs/shared/dto --publishable --importPath=@${workspaceName}/shared/dto --projectNameAndRootFormat=as-provided`);
    // ... (generate other libs similarly) ...
    console.log(`   bun nx g @nx/js:lib landing-page/interfaces --directory=libs/landing-page/interfaces --publishable --importPath=@${workspaceName}/landing-page/interfaces --projectNameAndRootFormat=as-provided`);
    console.log(`\n4. IMPORTANT: After generating, the 'nx generate' commands WILL OVERWRITE Dockerfiles etc.`);
    console.log(`   **COPY THE CONTENTS** from the files generated by **THIS SCRIPT**`);
    console.log(`   and **PASTE/REPLACE** into the corresponding files created/overwritten by 'nx generate'.`);
    console.log(`5. Review files (.env, docker-compose.yml, Nginx, Prisma schemas, Dockerfiles).`);
    console.log(`   Ensure Prisma 'binaryTargets' include "linux-musl-openssl-3.0.x" for Alpine.`);
    console.log(`6. Add Prisma dependencies using Bun:`);
    console.log(`   bun add @prisma/client`);
    console.log(`   bun add -d prisma`);
    console.log(`7. Dockerfiles now include 'bunx prisma generate'. Building images should generate clients.`);
    console.log(`   For manual generation during dev: bun nx run <backend-app>:prisma-generate`);
    console.log(`8. Configure 'baseHref' in Angular apps' project.json to match Nginx paths.`);
    console.log(`9. Develop Landing Page builder module in 'admin-ui'.`);
    console.log(`10. Run: docker-compose up -d --build`);
    console.log(`    (First build installs deps and generates Prisma clients via Docker).`);

} catch (err) {
    console.error('\n--- Error during script execution: ---', err);
}