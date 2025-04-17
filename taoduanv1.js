const fs = require('fs');
const path = require('path');

// --- Configuration ---
const workspaceName = 'duanv1'; // Đổi tên để phân biệt
const projectRootDir = workspaceName;

// --- Nx Directory Structure (apps & libs) ---
const directories = [
    // Applications
    'apps/shared-core-api/prisma',
    'apps/academy-api/prisma',
    'apps/cosmetics-api/prisma',
    'apps/spa-api/prisma',
    'apps/landing-page-builder-api/prisma', // <<<--- THÊM Landing Page API
    'apps/admin-ui/src',
    'apps/academy-ui/src',
    'apps/cosmetics-ui/src',
    'apps/spa-ui/src',
    // Libraries (Placeholder)
    'libs/shared/dto/src',
    'libs/shared/utils/src',
    'libs/landing-page/interfaces/src', // <<<--- Thư viện cho Landing Page (ví dụ)
    // Infrastructure
    'infra/nginx/includes',
    'infra/docker/postgres',
];

// --- File Contents ---

// --- Nội dung docker-compose.yml (Thêm service landing-page-builder-api) ---
const dockerComposeContent = `
version: '3.8'

services:
  # --- Database and Cache Services (Giữ nguyên) ---
  postgres:
    image: postgres:15-alpine
    container_name: postgres_db_nx_lp
    environment:
      POSTGRES_USER: \${POSTGRES_USER:-user}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD:-password}
      POSTGRES_DB: \${SHARED_DATABASE_NAME:-shared_db}
      ACADEMY_DATABASE_NAME: \${ACADEMY_DATABASE_NAME:-academy_db}
      COSMETICS_DATABASE_NAME: \${COSMETICS_DATABASE_NAME:-cosmetics_db}
      SPA_DATABASE_NAME: \${SPA_DATABASE_NAME:-spa_db}
      LANDING_PAGE_DATABASE_NAME: \${LANDING_PAGE_DATABASE_NAME:-landing_page_db} # <<<--- THÊM DB Name
    volumes:
      - postgres_data_nx_lp:/var/lib/postgresql/data
      - ./infra/docker/postgres/init-db.sh:/docker-entrypoint-initdb.d/init-db.sh
    ports:
      - "5433:5432"
    networks:
      - app-network-nx-lp
    restart: unless-stopped
    healthcheck: # Giữ nguyên healthcheck cho shared_db là đủ
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER:-user} -d \${SHARED_DATABASE_NAME:-shared_db}"]
      interval: 10s
      timeout: 5s
      retries: 5

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: pgadmin_gui_nx_lp
    environment:
      PGADMIN_DEFAULT_EMAIL: \${PGADMIN_EMAIL:-admin@example.com}
      PGADMIN_DEFAULT_PASSWORD: \${PGADMIN_PASSWORD:-admin}
    volumes:
      - pgadmin_data_nx_lp:/var/lib/pgadmin
    ports:
      - "5051:80"
    networks:
      - app-network-nx-lp
    depends_on:
      postgres: { condition: service_healthy }
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: redis_cache_nx_lp
    command: redis-server --save 60 1 --loglevel warning
    volumes:
      - redis_data_nx_lp:/data
    ports:
      - "6380:6379"
    networks:
      - app-network-nx-lp
    restart: unless-stopped
    healthcheck: # Giữ nguyên
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # --- Backend Services (Nx Apps) ---
  shared-core-api:
    build: { context: ., dockerfile: ./apps/shared-core-api/Dockerfile }
    container_name: shared_core_api_nx_lp
    environment:
      NODE_ENV: development
      PORT: 3000
      DATABASE_URL: \${SHARED_DATABASE_URL}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      JWT_SECRET: \${JWT_SECRET}
      ACADEMY_API_INTERNAL_URL: http://academy-api:3000
      COSMETICS_API_INTERNAL_URL: http://cosmetics-api:3000
      SPA_API_INTERNAL_URL: http://spa-api:3000
      LANDING_PAGE_API_INTERNAL_URL: http://landing-page-builder-api:3000 # <<<--- THÊM URL nội bộ (nếu cần gọi từ shared-core)
    volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
    depends_on: { postgres: { condition: service_healthy }, redis: { condition: service_healthy } }
    networks: ["app-network-nx-lp"]
    command: npx nx serve shared-core-api --port=3000 --verbose
    restart: unless-stopped

  academy-api:
    build: { context: ., dockerfile: ./apps/academy-api/Dockerfile }
    container_name: academy_api_nx_lp
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
    networks: ["app-network-nx-lp"]
    command: npx nx serve academy-api --port=3000 --verbose
    restart: unless-stopped

  # ... cosmetics-api, spa-api tương tự academy-api ...
  cosmetics-api:
    build: { context: ., dockerfile: ./apps/cosmetics-api/Dockerfile }
    container_name: cosmetics_api_nx_lp
    environment: { NODE_ENV: development, PORT: 3000, DATABASE_URL: \${COSMETICS_DATABASE_URL}, REDIS_HOST: redis, REDIS_PORT: 6379, SHARED_CORE_API_URL: http://shared-core-api:3000, JWT_SECRET: \${JWT_SECRET} }
    volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
    depends_on: { postgres: { condition: service_healthy }, redis: { condition: service_healthy }, shared-core-api: { condition: service_started } }
    networks: ["app-network-nx-lp"]
    command: npx nx serve cosmetics-api --port=3000 --verbose
    restart: unless-stopped

  spa-api:
    build: { context: ., dockerfile: ./apps/spa-api/Dockerfile }
    container_name: spa_api_nx_lp
    environment: { NODE_ENV: development, PORT: 3000, DATABASE_URL: \${SPA_DATABASE_URL}, REDIS_HOST: redis, REDIS_PORT: 6379, SHARED_CORE_API_URL: http://shared-core-api:3000, JWT_SECRET: \${JWT_SECRET} }
    volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
    depends_on: { postgres: { condition: service_healthy }, redis: { condition: service_healthy }, shared-core-api: { condition: service_started } }
    networks: ["app-network-nx-lp"]
    command: npx nx serve spa-api --port=3000 --verbose
    restart: unless-stopped

  # <<<--- THÊM LANDING PAGE BUILDER API ---<<<
  landing-page-builder-api:
    build:
      context: .
      dockerfile: ./apps/landing-page-builder-api/Dockerfile
    container_name: landing_page_builder_api_nx_lp
    environment:
      NODE_ENV: development
      PORT: 3000
      DATABASE_URL: \${LANDING_PAGE_DATABASE_URL} # <<<--- DB riêng
      REDIS_HOST: redis
      REDIS_PORT: 6379
      SHARED_CORE_API_URL: http://shared-core-api:3000 # <<<--- Cần để xác thực JWT
      JWT_SECRET: \${JWT_SECRET} # <<<--- Cần để xác thực JWT
      # Thêm biến môi trường khác nếu cần (vd: S3 bucket, storage path...)
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      shared-core-api: # Cần shared-core chạy trước để xác thực
        condition: service_started
    networks:
      - app-network-nx-lp
    command: npx nx serve landing-page-builder-api --port=3000 --verbose
    restart: unless-stopped
  # >>>------------------------------------->>>

  # --- Frontend Services (Nx Apps) ---
  admin-ui:
    build: { context: ., dockerfile: ./apps/admin-ui/Dockerfile }
    container_name: admin_ui_app_nx_lp
    volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
    ports: ["4200:4200"]
    depends_on:
      shared-core-api: { condition: service_started }
      landing-page-builder-api: { condition: service_started } # <<<--- Admin UI cần LP API chạy
    networks: ["app-network-nx-lp"]
    command: npx nx serve admin-ui --host 0.0.0.0 --port 4200
    restart: unless-stopped

  # ... academy-ui, cosmetics-ui, spa-ui tương tự như trước ...
  academy-ui:
     build: { context: ., dockerfile: ./apps/academy-ui/Dockerfile }
     container_name: academy_ui_app_nx_lp
     volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
     ports: ["4201:4200"]
     depends_on: { academy-api: { condition: service_started } }
     networks: ["app-network-nx-lp"]
     command: npx nx serve academy-ui --host 0.0.0.0 --port 4200
     restart: unless-stopped

  cosmetics-ui:
    build: { context: ., dockerfile: ./apps/cosmetics-ui/Dockerfile }
    container_name: cosmetics_ui_app_nx_lp
    volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
    ports: ["4202:4200"]
    depends_on: { cosmetics-api: { condition: service_started } }
    networks: ["app-network-nx-lp"]
    command: npx nx serve cosmetics-ui --host 0.0.0.0 --port 4200
    restart: unless-stopped

  spa-ui:
    build: { context: ., dockerfile: ./apps/spa-ui/Dockerfile }
    container_name: spa_ui_app_nx_lp
    volumes: [".:/usr/src/app", "/usr/src/app/node_modules"]
    ports: ["4203:4200"]
    depends_on: { spa-api: { condition: service_started } }
    networks: ["app-network-nx-lp"]
    command: npx nx serve spa-ui --host 0.0.0.0 --port 4200
    restart: unless-stopped

  # --- Nginx Reverse Proxy (Thêm landing-page-builder-api vào depends_on) ---
  nginx:
    image: nginx:1.25-alpine
    container_name: nginx_proxy_nx_lp
    ports: ["8088:80"]
    volumes:
      - ./infra/nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./infra/nginx/includes:/etc/nginx/includes:ro
    depends_on:
      - shared-core-api
      - academy-api
      - cosmetics-api
      - spa-api
      - landing-page-builder-api # <<<--- THÊM Dependency
      - admin-ui
      - academy-ui
      - cosmetics-ui
      - spa-ui
    networks:
      - app-network-nx-lp
    restart: unless-stopped

# --- Volumes and Networks (Đặt tên khác) ---
volumes:
  postgres_data_nx_lp: { driver: local }
  pgadmin_data_nx_lp: { driver: local }
  redis_data_nx_lp: { driver: local }

networks:
  app-network-nx-lp: { driver: bridge }
`;

// --- Nội dung infra/nginx/nginx.conf (Thêm upstream và location cho landing page api) ---
const nginxConfContent = `
# infra/nginx/nginx.conf

# Backend Upstreams
upstream shared_api { server shared-core-api:3000; }
upstream academy_api { server academy-api:3000; }
upstream cosmetics_api { server cosmetics-api:3000; }
upstream spa_api { server spa-api:3000; }
upstream landing_page_api { server landing-page-builder-api:3000; } # <<<--- THÊM Upstream LP

# Frontend Upstreams
upstream admin_fe_app { server admin-ui:4200; }
upstream academy_fe_app { server academy-ui:4200; }
upstream cosmetics_fe_app { server cosmetics-ui:4200; }
upstream spa_fe_app { server spa-ui:4200; }

server {
    listen 80;
    server_name localhost;

    gzip on; # Giữ nguyên cấu hình gzip
    # ... (các directives gzip khác) ...
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;


    # API Routing
    location /api/shared/ { proxy_pass http://shared_api/; include /etc/nginx/includes/proxy_params; }
    location /api/academy/ { proxy_pass http://academy_api/; include /etc/nginx/includes/proxy_params; }
    location /api/cosmetics/ { proxy_pass http://cosmetics_api/; include /etc/nginx/includes/proxy_params; }
    location /api/spa/ { proxy_pass http://spa_api/; include /etc/nginx/includes/proxy_params; }
    location /api/landing-page/ { proxy_pass http://landing_page_api/; include /etc/nginx/includes/proxy_params; } # <<<--- THÊM Location LP API


    # Frontend Routing (Giữ nguyên)
    location /admin/ { proxy_pass http://admin_fe_app/; include /etc/nginx/includes/proxy_params_angular_dev; }
    location /academy/ { proxy_pass http://academy_fe_app/; include /etc/nginx/includes/proxy_params_angular_dev; }
    location /cosmetics/ { proxy_pass http://cosmetics_fe_app/; include /etc/nginx/includes/proxy_params_angular_dev; }
    location /spa/ { proxy_pass http://spa_fe_app/; include /etc/nginx/includes/proxy_params_angular_dev; }


    # Root Location
    location = / { return 301 /admin/; }

    # WebSocket proxy (Giữ nguyên)
    location /sockjs-node/ { # Hoặc /ng-cli-ws/ tùy phiên bản Angular
        proxy_pass http://admin_fe_app; # Hoặc upstream tương ứng
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
     location /ng-cli-ws/ {
        proxy_pass http://admin_fe_app; # Hoặc upstream tương ứng
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
`;

// --- Nội dung infra/nginx/includes/... (Giữ nguyên) ---
const nginxProxyParamsContent = `...`; // (Giống script trước)
const nginxProxyParamsAngularDevContent = `...`; // (Giống script trước)


// --- Nội dung infra/docker/postgres/init-db.sh (Thêm tạo DB landing page) ---
const initDbScriptContent = `
#!/bin/bash
# infra/docker/postgres/init-db.sh
set -e
POSTGRES_USER="\${POSTGRES_USER:-user}"
SHARED_DB="\${SHARED_DATABASE_NAME:-shared_db}"
ACADEMY_DB="\${ACADEMY_DATABASE_NAME:-academy_db}"
COSMETICS_DB="\${COSMETICS_DATABASE_NAME:-cosmetics_db}"
SPA_DB="\${SPA_DATABASE_NAME:-spa_db}"
LANDING_PAGE_DB="\${LANDING_PAGE_DATABASE_NAME:-landing_page_db}" # <<<--- Thêm biến LP DB

echo "--- Initializing Databases (NX Version with LP) ---"
create_db_if_not_exists() {
  local db_name=\$1
  echo "Checking/Creating database '\$db_name'..."
  psql -v ON_ERROR_STOP=1 --username "\$POSTGRES_USER" --dbname "\$POSTGRES_DB" <<-EOSQL
    SELECT 'CREATE DATABASE \$db_name' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '\$db_name')\gexec
EOSQL
  # ... (Error handling giữ nguyên) ...
   if [ \$? -eq 0 ]; then echo "Database '\$db_name' checked/created."; else echo "Error checking/creating database '\$db_name'."; fi;
}

# Tạo các DB cần thiết
create_db_if_not_exists "\$ACADEMY_DB";
create_db_if_not_exists "\$COSMETICS_DB";
create_db_if_not_exists "\$SPA_DB";
create_db_if_not_exists "\$LANDING_PAGE_DB"; # <<<--- Thêm lệnh tạo LP DB

echo "--- Database Initialization Complete (NX Version with LP) ---"
`;


// --- Nội dung Dockerfile Backend/Frontend (Giữ nguyên template multi-stage) ---
const backendDockerfileContent = `...`; // (Giống script trước - Placeholder cần chỉnh sửa sau generate)
const frontendDockerfileContent = `...`; // (Giống script trước - Placeholder cần chỉnh sửa sau generate)


// --- Nội dung Prisma Schema cho Landing Page (Ví dụ cơ bản) ---
const landingPagePrismaContent = `
/// apps/landing-page-builder-api/prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("LANDING_PAGE_DATABASE_URL")
}

generator client {
  provider        = "prisma-client-js"
  output          = "../../../node_modules/.prisma/client-landing-page" // <<<--- Path đến root node_modules
  previewFeatures = ["extendedWhereUnique"]
}

model LandingPage {
  id          String    @id @default(cuid())
  slug        String    @unique // Đường dẫn truy cập trang
  name        String    // Tên quản lý nội bộ
  title       String?   // Thẻ <title> của trang
  description String?   // Meta description
  content     Json      // Cấu trúc JSON của các block tạo nên trang
  isPublished Boolean   @default(false)
  publishedAt DateTime?
  userId      String?   // ID người tạo/sửa cuối cùng (tham chiếu đến User trong shared-core nếu cần)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([isPublished])
  @@map("landing_pages")
}

model BlockType {
  id          String   @id @default(cuid())
  code        String   @unique // Mã định danh loại block (vd: 'hero', 'text-image', 'cta')
  name        String   // Tên hiển thị cho người dùng
  schema      Json     // Cấu trúc JSON định nghĩa các trường của block này
  template    String?  // Template mẫu (HTML/Liquid/...) để render (tùy chọn)
  icon        String?  // Icon hiển thị trong trình builder
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("block_types")
}

// Có thể cần thêm model Asset để quản lý hình ảnh/video dùng chung
// model Asset { ... }

`;


// --- Nội dung các file Prisma Schema khác (Giữ nguyên output path đã sửa) ---
const sharedPrismaContent = `...`; // (Giống script trước)
const academyPrismaContent = `...`; // (Giống script trước)
const cosmeticsPrismaContent = `...`; // (Giống script trước)
const spaPrismaContent = `...`; // (Giống script trước)


// --- Nội dung .env (Thêm biến cho Landing Page DB) ---
const envContent = `
# .env - Environment Variables for Nx Workspace with Landing Page
# Database URLs
SHARED_DATABASE_URL="postgresql://user:password@postgres:5432/shared_db?schema=public"
ACADEMY_DATABASE_URL="postgresql://user:password@postgres:5432/academy_db?schema=public"
COSMETICS_DATABASE_URL="postgresql://user:password@postgres:5432/cosmetics_db?schema=public"
SPA_DATABASE_URL="postgresql://user:password@postgres:5432/spa_db?schema=public"
LANDING_PAGE_DATABASE_URL="postgresql://user:password@postgres:5432/landing_page_db?schema=public" # <<<--- THÊM LP DB URL

# Database Names
SHARED_DATABASE_NAME=shared_db
ACADEMY_DATABASE_NAME=academy_db
COSMETICS_DATABASE_NAME=cosmetics_db
SPA_DATABASE_NAME=spa_db
LANDING_PAGE_DATABASE_NAME=landing_page_db # <<<--- THÊM LP DB Name

# Postgres Credentials
POSTGRES_USER=user
POSTGRES_PASSWORD=password

# PgAdmin Credentials
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin

# Redis
# REDIS_PASSWORD=your_redis_password

# Security
JWT_SECRET=replace_this_with_a_very_strong_random_secret_key_nx_lp
`;

// --- Main Script Logic (Thêm file schema và Dockerfile cho LP) ---
const rootDirPath = path.resolve(__dirname, projectRootDir);

console.log(`\n--- Simulating Nx Workspace Structure Creation (with LandingPage) ---`);
console.log(`Target Directory: ${rootDirPath}`);
console.warn(`\n[!] IMPORTANT: This script ONLY creates directories and config files.`);
console.warn(`You MUST run 'npx create-nx-workspace...' first, then the 'nx generate...' commands provided below.`);

try {
    if (!fs.existsSync(rootDirPath)) {
        console.error(`Error: Root directory ${projectRootDir} does not exist.`);
        console.error(`Please create the Nx workspace first by running:`);
        console.error(`  npx create-nx-workspace@latest ${workspaceName} --preset=ts --nxCloud=skip`);
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
        'infra/nginx/nginx.conf': nginxConfContent,
        'infra/nginx/includes/proxy_params': nginxProxyParamsContent,
        'infra/nginx/includes/proxy_params_angular_dev': nginxProxyParamsAngularDevContent,
        'infra/docker/postgres/init-db.sh': initDbScriptContent,
        // Prisma Schema Files
        'apps/shared-core-api/prisma/schema.prisma': sharedPrismaContent,
        'apps/academy-api/prisma/schema.prisma': academyPrismaContent,
        'apps/cosmetics-api/prisma/schema.prisma': cosmeticsPrismaContent,
        'apps/spa-api/prisma/schema.prisma': spaPrismaContent,
        'apps/landing-page-builder-api/prisma/schema.prisma': landingPagePrismaContent, // <<<--- THÊM Schema LP
         // Dockerfiles
        'apps/shared-core-api/Dockerfile': backendDockerfileContent,
        'apps/academy-api/Dockerfile': backendDockerfileContent,
        'apps/cosmetics-api/Dockerfile': backendDockerfileContent,
        'apps/spa-api/Dockerfile': backendDockerfileContent,
        'apps/landing-page-builder-api/Dockerfile': backendDockerfileContent, // <<<--- THÊM Dockerfile LP API
        'apps/admin-ui/Dockerfile': frontendDockerfileContent,
        'apps/academy-ui/Dockerfile': frontendDockerfileContent,
        'apps/cosmetics-ui/Dockerfile': frontendDockerfileContent,
        'apps/spa-ui/Dockerfile': frontendDockerfileContent,
    };

    for (const [filePath, content] of Object.entries(files)) {
        const fullPath = path.join(rootDirPath, filePath);
        const dirName = path.dirname(fullPath);
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, { recursive: true });
        }
        try {
            // Rút gọn nội dung proxy_params để tránh lỗi dài
            let writeContent = content;
            if (filePath.includes('proxy_params')) {
               writeContent = content.trim() || '# Placeholder for proxy params';
            } else if (filePath.endsWith('Dockerfile')) {
                 writeContent = content.trim() || '# Placeholder Dockerfile';
            } else if (filePath.endsWith('.prisma') && !filePath.includes('landing-page')) {
                 writeContent = content.split('\n').slice(0, 5).join('\n') + '\n// ... (Models defined previously) ...'; // Rút gọn schema cũ
            }

            fs.writeFileSync(fullPath, writeContent.trim());
            console.log(`Created file: ${filePath}`);
            if (filePath.endsWith('init-db.sh')) {
                fs.chmodSync(fullPath, 0o755);
                console.log(`Made ${filePath} executable.`);
            }
        } catch (writeErr) {
            console.error(`Error writing file ${filePath}:`, writeErr);
        }
    }

    console.log('\n--- Simulated Nx Structure and Config Files Created Successfully (with Landing Page)! ---');

    // --- Hướng dẫn các bước tiếp theo ---
    console.log('\n--- [!!!] REQUIRED NEXT STEPS ---');
    console.log(`1. Ensure you are inside the '${workspaceName}' directory.`);
    console.log(`2. Install root dependencies: bun install (or npm install / yarn install)`);
    console.log(`3. Run 'nx generate' commands to create actual applications/libraries:`);
    console.log(`   (Adjust options like --directory, --style as needed)`);
    console.log("\n   # Backend Apps (NestJS):");
    console.log(`   nx generate @nx/nest:application shared-core-api --directory=apps/shared-core-api`);
    console.log(`   nx generate @nx/nest:application academy-api --directory=apps/academy-api`);
    console.log(`   nx generate @nx/nest:application cosmetics-api --directory=apps/cosmetics-api`);
    console.log(`   nx generate @nx/nest:application spa-api --directory=apps/spa-api`);
    console.log(`   nx generate @nx/nest:application landing-page-builder-api --directory=apps/landing-page-builder-api # <<<--- Generate LP API`);
    console.log("\n   # Frontend Apps (Angular):");
    console.log(`   nx generate @nx/angular:application admin-ui --directory=apps/admin-ui --style=scss --routing --prefix=admin`);
    console.log(`   nx generate @nx/angular:application academy-ui --directory=apps/academy-ui --style=scss --routing --prefix=academy`);
    console.log(`   nx generate @nx/angular:application cosmetics-ui --directory=apps/cosmetics-ui --style=scss --routing --prefix=cosmetics`);
    console.log(`   nx generate @nx/angular:application spa-ui --directory=apps/spa-ui --style=scss --routing --prefix=spa`);
    console.log("   # (Landing Page UI is integrated into admin-ui, no separate app needed here)");
    console.log("\n   # Shared Libraries (Example):");
    console.log(`   nx generate @nx/js:library shared/dto --directory=libs/shared/dto --publishable --importPath=@${workspaceName}/shared/dto`);
    console.log(`   nx generate @nx/js:library shared/utils --directory=libs/shared/utils --publishable --importPath=@${workspaceName}/shared/utils`);
    console.log(`   nx generate @nx/js:library landing-page/interfaces --directory=libs/landing-page/interfaces --publishable --importPath=@${workspaceName}/landing-page/interfaces # <<<--- Generate LP Lib (Example)`);
    console.log(`\n4. After generating, COPY contents of Prisma schemas & Dockerfiles from this script`);
    console.log(`   into the corresponding files CREATED BY 'nx generate' commands.`);
    console.log(`5. Review and customize all generated files (especially .env, Dockerfiles, docker-compose.yml, Nginx config).`);
    console.log(`6. Add Prisma dependency to backend apps (including landing-page-builder-api):`);
    console.log(`      cd apps/<backend-app> && bun add prisma @prisma/client`);
    console.log(`   Then run 'npx nx run <backend-app>:prisma-generate' for each backend app.`);
    console.log(`7. Configure 'baseHref' in Angular apps' project.json files.`);
    console.log(`8. Develop the Landing Page module within 'admin-ui' (lazy-loaded).`);
    console.log(`9. Run 'docker-compose up -d --build' in the workspace root.`);


} catch (err) {
    console.error('\n--- Error during script execution: ---', err);
}