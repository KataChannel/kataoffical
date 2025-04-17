const fs = require('fs');
const path = require('path');

// --- Configuration ---
const projectRootDir = 'tazagroup'; // Tên thư mục gốc dự án

// --- Directory Structure (Thêm frontend/admin) ---
const directories = [
  'backend/shared-core/prisma',
  'backend/academy/prisma',
  'backend/cosmetics/prisma',
  'backend/spa/prisma',
  'frontend/academy',
  'frontend/cosmetics',
  'frontend/spa',
  'frontend/admin', // <--- Thêm thư mục cho Admin Portal UI
  'nginx/includes',
];

// --- File Contents ---

// --- Nội dung docker-compose.yml (Cập nhật: Thêm admin-ui, sửa ports frontend khác) ---
const dockerComposeContent = `
version: '3.8'

services:
  # --- Database and Cache Services ---
  postgres:
    image: postgres:15-alpine
    container_name: postgres_db
    environment:
      POSTGRES_USER: \${POSTGRES_USER:-user}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD:-password}
      POSTGRES_DB: \${SHARED_DATABASE_NAME:-shared_db}
      ACADEMY_DATABASE_NAME: \${ACADEMY_DATABASE_NAME:-academy_db}
      COSMETICS_DATABASE_NAME: \${COSMETICS_DATABASE_NAME:-cosmetics_db}
      SPA_DATABASE_NAME: \${SPA_DATABASE_NAME:-spa_db}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-db.sh:/docker-entrypoint-initdb.d/init-db.sh
    ports:
      - "5432:5432"
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER:-user} -d \${SHARED_DATABASE_NAME:-shared_db}"]
      interval: 10s
      timeout: 5s
      retries: 5

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: pgadmin_gui
    environment:
      PGADMIN_DEFAULT_EMAIL: \${PGADMIN_EMAIL:-admin@example.com}
      PGADMIN_DEFAULT_PASSWORD: \${PGADMIN_PASSWORD:-admin}
    volumes:
      - pgadmin_data:/var/lib/pgadmin
    ports:
      - "5050:80"
    networks:
      - app-network
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: redis_cache
    command: redis-server --save 60 1 --loglevel warning
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # --- Backend Services ---
  shared-core-api:
    build:
      context: ./backend/shared-core
      dockerfile: Dockerfile
    container_name: shared_core_api
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
    volumes:
      - ./backend/shared-core:/usr/src/app
    ports:
      - "3001:3000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - app-network
    command: bun run start:dev
    restart: unless-stopped

  academy-api:
    build:
      context: ./backend/academy
      dockerfile: Dockerfile
    container_name: academy_api
    environment:
      NODE_ENV: development
      PORT: 3000
      DATABASE_URL: \${ACADEMY_DATABASE_URL}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      SHARED_CORE_API_URL: http://shared-core-api:3000
      JWT_SECRET: \${JWT_SECRET}
    volumes:
      - ./backend/academy:/usr/src/app
    ports:
      - "3002:3000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      shared-core-api:
        condition: service_started
    networks:
      - app-network
    command: bun run start:dev
    restart: unless-stopped

  cosmetics-api:
    build:
      context: ./backend/cosmetics
      dockerfile: Dockerfile
    container_name: cosmetics_api
    environment:
      NODE_ENV: development
      PORT: 3000
      DATABASE_URL: \${COSMETICS_DATABASE_URL}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      SHARED_CORE_API_URL: http://shared-core-api:3000
      JWT_SECRET: \${JWT_SECRET}
    volumes:
      - ./backend/cosmetics:/usr/src/app
    ports:
      - "3003:3000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      shared-core-api:
        condition: service_started
    networks:
      - app-network
    command: bun run start:dev
    restart: unless-stopped

  spa-api:
    build:
      context: ./backend/spa
      dockerfile: Dockerfile
    container_name: spa_api
    environment:
      NODE_ENV: development
      PORT: 3000
      DATABASE_URL: \${SPA_DATABASE_URL}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      SHARED_CORE_API_URL: http://shared-core-api:3000
      JWT_SECRET: \${JWT_SECRET}
    volumes:
      - ./backend/spa:/usr/src/app
    ports:
      - "3004:3000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      shared-core-api:
        condition: service_started
    networks:
      - app-network
    command: bun run start:dev
    restart: unless-stopped

  # --- Frontend Services ---
  admin-ui:
    build:
      context: ./frontend/admin
      dockerfile: Dockerfile
    container_name: admin_ui_app
    volumes:
      - ./frontend/admin:/usr/src/app
      - /usr/src/app/node_modules
    ports:
      - "4200:4200"
    depends_on:
      shared-core-api:
        condition: service_started
    networks:
      - app-network
    command: ng serve --host 0.0.0.0 --port 4200
    restart: unless-stopped

  academy-ui:
    build:
      context: ./frontend/academy
      dockerfile: Dockerfile
    container_name: academy_ui_app
    volumes:
      - ./frontend/academy:/usr/src/app
      - /usr/src/app/node_modules
    ports:
      - "4201:4200"
    depends_on:
      academy-api:
        condition: service_started
      shared-core-api:
        condition: service_started
    networks:
      - app-network
    command: ng serve --host 0.0.0.0 --port 4200
    restart: unless-stopped

  cosmetics-ui:
    build:
      context: ./frontend/cosmetics
      dockerfile: Dockerfile
    container_name: cosmetics_ui_app
    volumes:
      - ./frontend/cosmetics:/usr/src/app
      - /usr/src/app/node_modules
    ports:
      - "4202:4200"
    depends_on:
      cosmetics-api:
        condition: service_started
      shared-core-api:
        condition: service_started
    networks:
      - app-network
    command: ng serve --host 0.0.0.0 --port 4200
    restart: unless-stopped

  spa-ui:
    build:
      context: ./frontend/spa
      dockerfile: Dockerfile
    container_name: spa_ui_app
    volumes:
      - ./frontend/spa:/usr/src/app
      - /usr/src/app/node_modules
    ports:
      - "4203:4200"
    depends_on:
      spa-api:
        condition: service_started
      shared-core-api:
        condition: service_started
    networks:
      - app-network
    command: ng serve --host 0.0.0.0 --port 4200
    restart: unless-stopped

  # --- Nginx Reverse Proxy ---
  nginx:
    image: nginx:1.25-alpine
    container_name: nginx_proxy
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./nginx/includes:/etc/nginx/includes:ro
    depends_on:
      - shared-core-api
      - academy-api
      - cosmetics-api
      - spa-api
      - admin-ui
      - academy-ui
      - cosmetics-ui
      - spa-ui
    networks:
      - app-network
    restart: unless-stopped

# --- Volumes and Networks ---
volumes:
  postgres_data:
    driver: local
  pgadmin_data:
    driver: local
  redis_data:
    driver: local

networks:
  app-network:
    driver: bridge
`;

// --- Nội dung nginx.conf (Cập nhật: thêm upstream/location cho admin, sửa root location) ---
const nginxConfContent = `
# nginx/nginx.conf

# Backend Upstreams
upstream shared_api { server shared-core-api:3000; }
upstream academy_api { server academy-api:3000; }
upstream cosmetics_api { server cosmetics-api:3000; }
upstream spa_api { server spa-api:3000; }

# Frontend Upstreams
upstream admin_fe_app { server admin-ui:4200; } # <<<--- Upstream MỚI
upstream academy_fe_app { server academy-ui:4200; }
upstream cosmetics_fe_app { server cosmetics-ui:4200; }
upstream spa_fe_app { server spa-ui:4200; }

server {
    listen 80;
    server_name localhost;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;

    # API Routing (Giữ nguyên)
    location /api/shared/ { proxy_pass http://shared_api/; include /etc/nginx/includes/proxy_params; }
    location /api/academy/ { proxy_pass http://academy_api/; include /etc/nginx/includes/proxy_params; }
    location /api/cosmetics/ { proxy_pass http://cosmetics_api/; include /etc/nginx/includes/proxy_params; }
    location /api/spa/ { proxy_pass http://spa_api/; include /etc/nginx/includes/proxy_params; }

    # Frontend Routing (Thêm /admin/)
    # QUAN TRỌNG: Đảm bảo cấu hình baseHref đúng trong từng Angular app

    location /admin/ { # <<<--- Location MỚI cho Admin Portal
        proxy_pass http://admin_fe_app/;
        include /etc/nginx/includes/proxy_params_angular_dev;
    }
    location /academy/ {
        proxy_pass http://academy_fe_app/;
        include /etc/nginx/includes/proxy_params_angular_dev;
    }
    location /cosmetics/ {
        proxy_pass http://cosmetics_fe_app/;
        include /etc/nginx/includes/proxy_params_angular_dev;
    }
    location /spa/ {
        proxy_pass http://spa_fe_app/;
        include /etc/nginx/includes/proxy_params_angular_dev;
    }

    # Root Location (Sửa lại để trỏ đến Admin Portal làm mặc định)
    location = / {
        return 301 /admin/; # <<<--- Redirect đến Admin Portal
        # Hoặc bạn có thể phục vụ một trang login tĩnh chung ở đây
    }
}
`;

// --- Nội dung nginx/includes/proxy_params (Giữ nguyên) ---
const nginxProxyParamsContent = `
# nginx/includes/proxy_params
proxy_http_version 1.1;
proxy_set_header Upgrade \$http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host \$host;
proxy_cache_bypass \$http_upgrade;
proxy_set_header X-Real-IP \$remote_addr;
proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto \$scheme;
`;

// --- Nội dung nginx/includes/proxy_params_angular_dev (Giữ nguyên) ---
const nginxProxyParamsAngularDevContent = `
# nginx/includes/proxy_params_angular_dev
proxy_http_version 1.1;
proxy_set_header Upgrade \$http_upgrade;
proxy_set_header Connection "Upgrade";
proxy_set_header Host \$host;
proxy_set_header X-Real-IP \$remote_addr;
proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto \$scheme;
proxy_read_timeout 86400s;
proxy_send_timeout 86400s;
`;

// --- Nội dung init-db.sh (Giữ nguyên) ---
const initDbScriptContent = `
#!/bin/bash
# init-db.sh
set -e
POSTGRES_USER="\${POSTGRES_USER:-user}"
SHARED_DB="\${SHARED_DATABASE_NAME:-shared_db}"
ACADEMY_DB="\${ACADEMY_DATABASE_NAME:-academy_db}"
COSMETICS_DB="\${COSMETICS_DATABASE_NAME:-cosmetics_db}"
SPA_DB="\${SPA_DATABASE_NAME:-spa_db}"
echo "--- Initializing Databases ---"
create_db_if_not_exists() { local db_name=\$1; echo "Checking/Creating database '\$db_name'..."; psql -v ON_ERROR_STOP=1 --username "\$POSTGRES_USER" --dbname "\$POSTGRES_DB" <<-EOSQL
SELECT 'CREATE DATABASE \$db_name' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '\$db_name')\gexec
EOSQL; if [ \$? -eq 0 ]; then echo "Database '\$db_name' checked/created."; else echo "Error for database '\$db_name'."; exit 1; fi; }
create_db_if_not_exists "\$ACADEMY_DB"; create_db_if_not_exists "\$COSMETICS_DB"; create_db_if_not_exists "\$SPA_DB";
echo "--- Database Initialization Complete ---"
`;

// --- Nội dung Dockerfile cho Backend NestJS/Bun (Giữ nguyên) ---
const backendDockerfileContent = `
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
`;

// --- Nội dung Dockerfile cho Frontend Angular (Giữ nguyên) ---
const frontendDockerfileContent = `
# Dockerfile (Angular Frontend - Development)
FROM node:18-alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD [ "npm", "run", "start" ] # Ensure start script uses '--host 0.0.0.0 --port 4200'
`;

// --- Nội dung các file Prisma Schema (Giữ nguyên) ---
const sharedPrismaContent = `
/// prisma/shared.prisma (Shared Core Service)
datasource db { provider = "postgresql"; url = env("SHARED_DATABASE_URL"); }
generator client { provider = "prisma-client-js"; output = "../node_modules/.prisma/client-shared"; previewFeatures = ["extendedWhereUnique"]; }
enum UserStatus { ACTIVE INACTIVE DISABLED }
model User { id String @id @default(uuid()); username String @unique; passwordHash String; email String @unique; firstName String?; lastName String?; phone String?; role String; status UserStatus @default(ACTIVE); lastLogin DateTime?; createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; @@map("users"); }
model Customer { id String @id @default(uuid()); firstName String?; lastName String?; primaryEmail String? @unique; primaryPhone String? @unique; dateOfBirth DateTime?; createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; @@index([primaryEmail]); @@index([primaryPhone]); @@map("customers"); }
model LookupType { id String @id @default(uuid()); code String @unique; name String; description String?; createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; values LookupValue[]; @@map("lookup_types"); }
model LookupValue { id String @id @default(uuid()); typeCode String; lookupType LookupType @relation(fields: [typeCode], references: [code], onDelete: Cascade); code String; name String; order Int?; isActive Boolean @default(true); createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; @@unique([typeCode, code]); @@map("lookup_values"); }
`; // Simplified

const academyPrismaContent = `
/// prisma/academy.prisma (Academy Service)
datasource db { provider = "postgresql"; url = env("ACADEMY_DATABASE_URL"); }
generator client { provider = "prisma-client-js"; output = "../node_modules/.prisma/client-academy"; previewFeatures = ["extendedWhereUnique"]; }
enum ApplicationStatus { SUBMITTED UNDER_REVIEW WAITLISTED ACCEPTED REJECTED ENROLLED WITHDRAWN } enum EnrollmentStatus { ENROLLED IN_PROGRESS COMPLETED WITHDRAWN FAILED AUDITING } enum CourseMode { ONLINE OFFLINE HYBRID } enum GradeType { LETTER NUMBER PASS_FAIL } enum CertificateStatus { PENDING_ISSUANCE ISSUED REVOKED } enum ActivityType { CALL EMAIL MEETING TASK NOTE OTHER } enum ActivityStatus { OPEN IN_PROGRESS COMPLETED CANCELLED DEFERRED } enum WorkflowType { ONBOARDING ADMISSION OTHER } enum WorkflowStatus { PENDING IN_PROGRESS COMPLETED CANCELLED } enum TaskStatus { TODO IN_PROGRESS DONE SKIPPED WAITING }
model Student { id String @id @default(uuid()); customerId String @unique; studentCode String? @unique; firstName String; lastName String; admissionDate DateTime?; graduationDate DateTime?; studentStatus String @default("Active"); createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; applications Application[]; enrollments Enrollment[]; certificates Certificate[]; activities Activity[] @relation("ActivityStudents"); workflows StudentWorkflow[]; @@map("students"); }
model Application { id String @id @default(uuid()); applicationCode String? @unique; studentId String?; student Student? @relation(fields: [studentId], references: [id], onDelete: SetNull); programId String?; /* program Program? @relation(...) */ courseId String?; /* course Course? @relation(...) */ applicationDate DateTime @default(now()); status ApplicationStatus @default(SUBMITTED); notes String?; documents Json?; assignedToId String?; originatingLeadId String? @unique; createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; activities Activity[] @relation("ActivityApplications"); workflows StudentWorkflow[]; @@index([studentId]); @@index([programId]); @@index([courseId]); @@index([status]); @@index([assignedToId]); @@map("applications"); }
model Activity { id String @id @default(uuid()); subject String; type ActivityType; status ActivityStatus @default(OPEN); dueDate DateTime?; description String?; ownerId String; applicationId String?; application Application? @relation("ActivityApplications", fields: [applicationId], references: [id], onDelete: Cascade); studentId String?; student Student? @relation("ActivityStudents", fields: [studentId], references: [id], onDelete: Cascade); createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; @@index([ownerId]); @@index([applicationId]); @@index([studentId]); @@map("activities"); }
// ... Other simplified Academy models (Program, Course, Offering, Faculty, Enrollment, Certificate, Workflows) ...
model Program { id String @id @default(uuid()); name String @unique; @@map("programs"); courses Course[] @relation("ProgramCourses"); applications Application[]; certificates Certificate[]; }
model Course { id String @id @default(uuid()); courseCode String @unique; name String; @@map("courses"); programs Program[] @relation("ProgramCourses"); offerings CourseOffering[]; applications Application[]; certificates Certificate[]; }
model CourseOffering { id String @id @default(uuid()); offeringCode String @unique; courseId String; course Course @relation(fields: [courseId], references: [id]); facultyId String?; startDate DateTime; endDate DateTime; mode CourseMode; @@map("course_offerings"); enrollments Enrollment[]; }
model Faculty { id String @id @default(uuid()); email String @unique; userId String? @unique; @@map("faculty"); courseOfferings CourseOffering[]; }
model Enrollment { id String @id @default(uuid()); studentId String; student Student @relation(fields: [studentId], references: [id]); courseOfferingId String; courseOffering CourseOffering @relation(fields: [courseOfferingId], references: [id]); status EnrollmentStatus @default(ENROLLED); @@unique([studentId, courseOfferingId]); @@map("enrollments"); }
model Certificate { id String @id @default(uuid()); studentId String; student Student @relation(fields: [studentId], references: [id]); certificateNumber String @unique; @@map("certificates"); programId String?; /* program Program? @relation(...) */ courseId String?; /* course Course? @relation(...) */ }
model WorkflowTemplate {id String @id @default(uuid()); name String @unique; type WorkflowType; @@map("workflow_templates"); taskTemplates WorkflowTaskTemplate[]; workflows StudentWorkflow[]; }
model WorkflowTaskTemplate {id String @id @default(uuid()); templateId String; template WorkflowTemplate @relation(fields: [templateId], references: [id]); name String; @@map("workflow_task_templates"); studentTasks StudentWorkflowTask[]; }
model StudentWorkflow { id String @id @default(uuid()); studentId String?; student Student? @relation(fields: [studentId], references: [id]); templateId String; template WorkflowTemplate @relation(fields: [templateId], references: [id]); status WorkflowStatus @default(PENDING); @@map("student_workflows"); tasks StudentWorkflowTask[]; applicationId String? @unique; /* application Application? @relation(...) */}
model StudentWorkflowTask { id String @id @default(uuid()); workflowId String; workflow StudentWorkflow @relation(fields: [workflowId], references: [id]); taskTemplateId String; taskTemplate WorkflowTaskTemplate @relation(fields: [taskTemplateId], references: [id]); status TaskStatus @default(TODO); assigneeId String?; @@map("student_workflow_tasks"); }
`; // Simplified

const cosmeticsPrismaContent = `
/// prisma/cosmetics.prisma (Cosmetics Service)
datasource db { provider = "postgresql"; url = env("COSMETICS_DATABASE_URL"); }
generator client { provider = "prisma-client-js"; output = "../node_modules/.prisma/client-cosmetics"; previewFeatures = ["extendedWhereUnique"]; }
enum OrderStatus { PENDING_PAYMENT PROCESSING SHIPPED DELIVERED CANCELLED RETURNED }
model Customer { id String @id @default(uuid()); customerId String @unique; loyaltyPoints Int @default(0); createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; orders SalesOrder[]; activities Activity[] @relation("ActivityCustomers"); @@map("customers"); }
model Product { id String @id @default(uuid()); name String @unique; sku String @unique; price Decimal; isActive Boolean @default(true); createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; inventoryItems InventoryItem[]; orderItems OrderItem[]; @@map("products"); }
model InventoryItem { id String @id @default(uuid()); productId String; product Product @relation(fields: [productId], references: [id], onDelete: Cascade); location String? @default("default"); quantity Int; lastUpdated DateTime @updatedAt; @@unique([productId, location]); @@map("inventory_items"); }
model SalesOrder { id String @id @default(uuid()); orderNumber String @unique; customerId String; customer Customer @relation(fields: [customerId], references: [id], onDelete: Restrict); orderDate DateTime @default(now()); status OrderStatus; totalAmount Decimal; currency String @default("VND"); createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; items OrderItem[]; activities Activity[] @relation("ActivityOrders"); @@index([customerId]); @@index([status]); @@map("sales_orders"); }
model OrderItem { id String @id @default(uuid()); orderId String; order SalesOrder @relation(fields: [orderId], references: [id], onDelete: Cascade); productId String; product Product @relation(fields: [productId], references: [id], onDelete: Restrict); quantity Int; unitPrice Decimal; totalPrice Decimal; createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; @@index([orderId]); @@index([productId]); @@map("order_items"); }
model Activity { id String @id @default(uuid()); subject String; type String; status String @default("OPEN"); dueDate DateTime?; description String?; ownerId String; customerId String?; customer Customer? @relation("ActivityCustomers", fields: [customerId], references: [id], onDelete: Cascade); orderId String?; order SalesOrder? @relation("ActivityOrders", fields: [orderId], references: [id], onDelete: Cascade); createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; @@index([ownerId]); @@index([customerId]); @@index([orderId]); @@map("activities"); }
`; // Simplified

const spaPrismaContent = `
/// prisma/spa.prisma (Spa Service)
datasource db { provider = "postgresql"; url = env("SPA_DATABASE_URL"); }
generator client { provider = "prisma-client-js"; output = "../node_modules/.prisma/client-spa"; previewFeatures = ["extendedWhereUnique"]; }
enum AppointmentStatus { SCHEDULED CONFIRMED CHECKED_IN COMPLETED CANCELLED NO_SHOW } enum PaymentStatus { UNPAID PAID PARTIALLY_PAID REFUNDED }
model Client { id String @id @default(uuid()); customerId String @unique; preferences String?; allergies String?; createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; appointments Appointment[]; memberships Membership[]; activities Activity[] @relation("ActivityClients"); @@map("clients"); }
model SpaService { id String @id @default(uuid()); name String @unique; durationMin Int; price Decimal; isActive Boolean @default(true); createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; appointments AppointmentService[]; @@map("spa_services"); }
model Therapist { id String @id @default(uuid()); employeeId String? @unique; firstName String; lastName String; isActive Boolean @default(true); createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; appointments Appointment[]; @@map("therapists"); }
model Appointment { id String @id @default(uuid()); clientId String; client Client @relation(fields: [clientId], references: [id], onDelete: Restrict); startTime DateTime; endTime DateTime; therapistId String?; therapist Therapist? @relation(fields: [therapistId], references: [id], onDelete: SetNull); status AppointmentStatus @default(SCHEDULED); totalAmount Decimal?; paymentStatus PaymentStatus? @default(UNPAID); createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; services AppointmentService[]; activities Activity[] @relation("ActivityAppointments"); @@index([clientId]); @@index([therapistId]); @@index([startTime]); @@map("appointments"); }
model AppointmentService { appointmentId String; appointment Appointment @relation(fields: [appointmentId], references: [id], onDelete: Cascade); serviceId String; service SpaService @relation(fields: [serviceId], references: [id], onDelete: Restrict); @@id([appointmentId, serviceId]); @@map("appointment_services"); }
model Membership { id String @id @default(uuid()); clientId String; client Client @relation(fields: [clientId], references: [id], onDelete: Cascade); packageName String; startDate DateTime; endDate DateTime?; createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; @@index([clientId]); @@map("memberships"); }
model Activity { id String @id @default(uuid()); subject String; type String; status String @default("OPEN"); dueDate DateTime?; description String?; ownerId String; clientId String?; client Client? @relation("ActivityClients", fields: [clientId], references: [id], onDelete: Cascade); appointmentId String?; appointment Appointment? @relation("ActivityAppointments", fields: [appointmentId], references: [id], onDelete: Cascade); createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; @@index([ownerId]); @@index([clientId]); @@index([appointmentId]); @@map("activities"); }
`; // Simplified

// --- Nội dung .env (Giữ nguyên) ---
const envContent = `
# .env - Environment Variables
SHARED_DATABASE_URL="postgresql://user:password@postgres:5432/shared_db?schema=public"
ACADEMY_DATABASE_URL="postgresql://user:password@postgres:5432/academy_db?schema=public"
COSMETICS_DATABASE_URL="postgresql://user:password@postgres:5432/cosmetics_db?schema=public"
SPA_DATABASE_URL="postgresql://user:password@postgres:5432/spa_db?schema=public"
SHARED_DATABASE_NAME=shared_db
ACADEMY_DATABASE_NAME=academy_db
COSMETICS_DATABASE_NAME=cosmetics_db
SPA_DATABASE_NAME=spa_db
POSTGRES_USER=user
POSTGRES_PASSWORD=password
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin
# REDIS_PASSWORD=your_redis_password
JWT_SECRET=replace_this_with_a_very_strong_random_secret_key
`;

// --- Main Script Logic (Thêm frontend/admin vào files) ---
const rootDirPath = path.resolve(__dirname, projectRootDir);

console.log(`Creating project structure at: ${rootDirPath}`);

try {
  if (!fs.existsSync(rootDirPath)) {
    fs.mkdirSync(rootDirPath);
    console.log(`Created directory: ${projectRootDir}`);
  } else {
    console.log(`Directory ${projectRootDir} already exists.`);
  }

  directories.forEach(dir => {
    const dirPath = path.join(rootDirPath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });

  const files = {
    'docker-compose.yml': dockerComposeContent,
    '.env': envContent,
    'nginx/nginx.conf': nginxConfContent,
    'nginx/includes/proxy_params': nginxProxyParamsContent,
    'nginx/includes/proxy_params_angular_dev': nginxProxyParamsAngularDevContent,
    'init-db.sh': initDbScriptContent,
    // Backend Dockerfiles
    'backend/shared-core/Dockerfile': backendDockerfileContent,
    'backend/academy/Dockerfile': backendDockerfileContent,
    'backend/cosmetics/Dockerfile': backendDockerfileContent,
    'backend/spa/Dockerfile': backendDockerfileContent,
    // Frontend Dockerfiles
    'frontend/admin/Dockerfile': frontendDockerfileContent, // <<<--- Thêm Dockerfile cho admin
    'frontend/academy/Dockerfile': frontendDockerfileContent,
    'frontend/cosmetics/Dockerfile': frontendDockerfileContent,
    'frontend/spa/Dockerfile': frontendDockerfileContent,
    // Prisma Schema Files
    'backend/shared-core/prisma/shared.prisma': sharedPrismaContent,
    'backend/academy/prisma/academy.prisma': academyPrismaContent,
    'backend/cosmetics/prisma/cosmetics.prisma': cosmeticsPrismaContent,
    'backend/spa/prisma/spa.prisma': spaPrismaContent,
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
      if (filePath === 'init-db.sh') {
        fs.chmodSync(fullPath, 0o755);
        console.log(`Made init-db.sh executable.`);
      }
    } catch (writeErr) {
      console.error(`Error writing file ${filePath}:`, writeErr);
    }
  }

  console.log('\nProject structure with Admin Portal created successfully!');
  console.log('Next steps:');
  console.log(`1. Navigate into each backend and frontend subdirectory and run 'bun install' or 'npm install'.`);
  console.log(`2. Review and customize the generated files (.env, Dockerfiles, Prisma schemas, Nginx config).`);
  console.log(`3. Ensure NestJS 'start:dev' scripts use 'nest start --watch' and Angular 'start' scripts use 'ng serve --host 0.0.0.0 --port 4200'.`);
  console.log(`4. IMPORTANT: Configure Angular apps with correct baseHref ('/admin/', '/academy/', etc.) for Nginx path routing.`);
  console.log(`5. Run 'docker-compose up -d --build' in the '${projectRootDir}' directory.`);

} catch (err) {
  console.error('Error creating project structure:', err);
}