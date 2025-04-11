const fs = require('fs');
const path = require('path');

// --- Configuration ---
const projectRootDir = 'multi_service_crm'; // Tên thư mục gốc dự án sẽ được tạo

// --- Directory Structure ---
const directories = [
  'backend/shared-core/prisma',
  'backend/academy/prisma',
  'backend/cosmetics/prisma',
  'backend/spa/prisma',
  'frontend/academy',
  'frontend/cosmetics',
  'frontend/spa',
  'nginx/includes',
];

// --- File Contents ---
// (Sử dụng nội dung từ các câu trả lời trước)

const dockerComposeContent = `
version: '3.8'

services:
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
      - /usr/src/app/node_modules
    ports:
      - "3001:3000"
    depends_on:
      postgres:
          condition: service_healthy
      redis:
          condition: service_healthy
    networks:
      - app-network
    command: npm run start:dev
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
      - /usr/src/app/node_modules
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
    command: npm run start:dev
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
      - /usr/src/app/node_modules
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
    command: npm run start:dev
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
      - /usr/src/app/node_modules
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
    command: npm run start:dev
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
    networks:
      - app-network
    # Đảm bảo script 'start' trong package.json chạy 'ng serve --host 0.0.0.0 --port 4200'
    command: npm run start
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
    networks:
      - app-network
    command: npm run start
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
    networks:
      - app-network
    command: npm run start
    restart: unless-stopped

  nginx:
    image: nginx:1.25-alpine
    container_name: nginx_proxy
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./nginx/includes:/etc/nginx/includes:ro # Mount thư mục includes
    depends_on:
      - shared-core-api
      - academy-api
      - cosmetics-api
      - spa-api
      - academy-ui
      - cosmetics-ui
      - spa-ui
    networks:
      - app-network
    restart: unless-stopped

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

const nginxConfContent = `
# nginx/nginx.conf
upstream shared_api { server shared-core-api:3000; }
upstream academy_api { server academy-api:3000; }
upstream cosmetics_api { server cosmetics-api:3000; }
upstream spa_api { server spa-api:3000; }

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

    # API Routing
    location /api/shared/ {
        proxy_pass http://shared_api/;
        include /etc/nginx/includes/proxy_params;
    }
    location /api/academy/ {
        proxy_pass http://academy_api/;
        include /etc/nginx/includes/proxy_params;
    }
    location /api/cosmetics/ {
        proxy_pass http://cosmetics_api/;
        include /etc/nginx/includes/proxy_params;
    }
     location /api/spa/ {
        proxy_pass http://spa_api/;
        include /etc/nginx/includes/proxy_params;
    }

    # Frontend Routing (Path-based)
    # Nhắc nhở: Angular apps cần --base-href /<app_name>/
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

    # Root Location Redirect
    location = / {
        return 301 /academy/; # Redirect đến app mặc định
    }
}
`;

const nginxProxyParamsContent = `
# nginx/includes/proxy_params
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
`;

const nginxProxyParamsAngularDevContent = `
# nginx/includes/proxy_params_angular_dev
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "Upgrade"; # Cho WebSocket hot-reload
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_read_timeout 86400s; # Tăng timeout cho dev server
proxy_send_timeout 86400s;
`;

const initDbScriptContent = `
#!/bin/bash
# init-db.sh
set -e

POSTGRES_USER="\${POSTGRES_USER:-user}"
SHARED_DB="\${SHARED_DATABASE_NAME:-shared_db}" # DB này thường được tạo tự động
ACADEMY_DB="\${ACADEMY_DATABASE_NAME:-academy_db}"
COSMETICS_DB="\${COSMETICS_DATABASE_NAME:-cosmetics_db}"
SPA_DB="\${SPA_DATABASE_NAME:-spa_db}"

echo "--- Initializing Databases ---"

create_db_if_not_exists() {
  local db_name=\$1
  echo "Checking/Creating database '\$db_name'..."
  psql -v ON_ERROR_STOP=1 --username "\$POSTGRES_USER" --dbname "\$POSTGRES_DB" <<-EOSQL
    SELECT 'CREATE DATABASE \$db_name' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '\$db_name')\gexec
EOSQL
  if [ \$? -eq 0 ]; then echo "Database '\$db_name' checked/created."; else echo "Error for database '\$db_name'."; exit 1; fi
}

create_db_if_not_exists "\$ACADEMY_DB"
create_db_if_not_exists "\$COSMETICS_DB"
create_db_if_not_exists "\$SPA_DB"

echo "--- Database Initialization Complete ---"
`;

const backendDockerfileContent = `
# Dockerfile (NestJS Backend - Development)
FROM node:18-alpine As development

WORKDIR /usr/src/app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining code
COPY . .

# Generate Prisma Client
# IMPORTANT: Adjust the schema path based on where this Dockerfile is relative to the schema
RUN npx prisma generate --schema=./prisma/schema.prisma # Hoặc shared.prisma, academy.prisma etc.

# Optional: Run build to catch errors early
# RUN npm run build

EXPOSE 3000

# Default command for development with hot-reload
CMD [ "npm", "run", "start:dev" ]
`;

const frontendDockerfileContent = `
# Dockerfile (Angular Frontend - Development)
FROM node:18-alpine As development

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining code
COPY . .

# Expose Angular development server port
EXPOSE 4200

# Command to start dev server, accessible from outside container
# Ensure package.json 'start' script includes '--host 0.0.0.0 --port 4200'
CMD [ "npm", "run", "start" ]
`;

// --- Prisma Schema Files ---
// (Lấy nội dung từ câu trả lời trước, đảm bảo mỗi file có datasource và generator riêng)

const sharedPrismaContent = `
/// prisma/shared.prisma (Shared Core Service)
datasource db { provider = "postgresql"; url = env("SHARED_DATABASE_URL"); }
generator client { provider = "prisma-client-js"; output = "../node_modules/.prisma/client-shared"; previewFeatures = ["extendedWhereUnique"]; }

enum UserStatus { ACTIVE INACTIVE DISABLED }

model User {
  id            String     @id @default(cuid())
  username      String     @unique
  passwordHash  String
  email         String     @unique
  firstName     String?
  lastName      String?
  phone         String?
  role          String     /// Quản lý trong RBAC Module (e.g., "ADMIN", "SPA_MANAGER")
  status        UserStatus @default(ACTIVE)
  lastLogin     DateTime?
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  @@map("users")
}

model Customer {
  id            String   @id @default(cuid())
  firstName     String?
  lastName      String?
  primaryEmail  String?  @unique
  primaryPhone  String?  @unique
  dateOfBirth   DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  @@index([primaryEmail])
  @@index([primaryPhone])
  @@map("customers")
}

// Optional Lookup Tables
model LookupType {
  id          String        @id @default(cuid())
  code        String        @unique
  name        String
  description String?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  values      LookupValue[]
  @@map("lookup_types")
}
model LookupValue {
  id          String      @id @default(cuid())
  typeCode    String
  lookupType  LookupType  @relation(fields: [typeCode], references: [code], onDelete: Cascade)
  code        String
  name        String
  order       Int?
  isActive    Boolean     @default(true)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  @@unique([typeCode, code])
  @@map("lookup_values")
}
`;

const academyPrismaContent = `
/// prisma/academy.prisma (Academy Service)
datasource db { provider = "postgresql"; url = env("ACADEMY_DATABASE_URL"); }
generator client { provider = "prisma-client-js"; output = "../node_modules/.prisma/client-academy"; previewFeatures = ["extendedWhereUnique"]; }

// Enums specific to Academy (or use strings + lookup/config)
enum ApplicationStatus { SUBMITTED UNDER_REVIEW WAITLISTED ACCEPTED REJECTED ENROLLED WITHDRAWN }
enum EnrollmentStatus { ENROLLED IN_PROGRESS COMPLETED WITHDRAWN FAILED AUDITING }
enum CourseMode { ONLINE OFFLINE HYBRID }
enum GradeType { LETTER NUMBER PASS_FAIL }
enum CertificateStatus { PENDING_ISSUANCE ISSUED REVOKED }
// Re-declare shared enums if needed locally or use strings
enum ActivityType { CALL EMAIL MEETING TASK NOTE OTHER }
enum ActivityStatus { OPEN IN_PROGRESS COMPLETED CANCELLED DEFERRED }
enum WorkflowType { ONBOARDING ADMISSION OTHER }
enum WorkflowStatus { PENDING IN_PROGRESS COMPLETED CANCELLED }
enum TaskStatus { TODO IN_PROGRESS DONE SKIPPED WAITING }

// Models: Application, Student, Program, Course, CourseOffering, Faculty, Enrollment, Certificate, Activity (Academy specific), Workflows
// IMPORTANT: Add Foreign Key fields referencing shared_db logically

model Student {
  id            String    @id @default(cuid())
  customerId    String    @unique /// FK to shared_db.customers.id (Logical)
  studentCode   String?   @unique
  firstName     String    // Synced/Specific
  lastName      String    // Synced/Specific
  // ... other academy specific fields
  admissionDate DateTime?
  graduationDate DateTime?
  studentStatus String    @default("Active")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  applications  Application[]
  enrollments   Enrollment[]
  certificates  Certificate[]
  activities    Activity[] @relation("ActivityStudents")
  workflows     StudentWorkflow[]
  @@map("students")
}

model Application {
  id                String            @id @default(cuid())
  applicationCode   String?           @unique
  studentId         String?           /// FK to academy_db.students.id
  student           Student?          @relation(fields: [studentId], references: [id], onDelete: SetNull)
  programId         String?
  program           Program?          @relation(fields: [programId], references: [id], onDelete: SetNull)
  courseId          String?
  course            Course?           @relation(fields: [courseId], references: [id], onDelete: SetNull)
  applicationDate   DateTime          @default(now())
  status            ApplicationStatus @default(SUBMITTED) // Or String
  notes             String?
  documents         Json?
  assignedToId      String?           /// FK to shared_db.users.id (Logical)
  originatingLeadId String?           @unique /// FK to academy_db.leads.id (Logical, if Lead model is here)
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
  activities        Activity[]        @relation("ActivityApplications")
  workflows         StudentWorkflow[]
  @@index([studentId])
  @@index([programId])
  @@index([courseId])
  @@index([status])
  @@index([assignedToId])
  @@map("applications")
}

// ... Rest of Academy Models (Program, Course, Offering, Faculty, Enrollment, Certificate, Activity, Workflows) ...
// Ensure FKs like Faculty.userId, Activity.ownerId, WorkflowTask.assigneeId are defined as String?
// Example Activity:
model Activity {
  id            String         @id @default(cuid())
  subject       String
  type          ActivityType   // Or String
  status        ActivityStatus @default(OPEN) // Or String
  dueDate       DateTime?
  description   String?
  ownerId       String         /// FK to shared_db.users.id (Logical)
  applicationId String?
  application   Application?   @relation("ActivityApplications", fields: [applicationId], references: [id], onDelete: Cascade)
  studentId     String?
  student       Student?       @relation("ActivityStudents", fields: [studentId], references: [id], onDelete: Cascade)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  @@index([ownerId])
  @@index([applicationId])
  @@index([studentId])
  @@map("activities")
}

model Program { id String @id @default(cuid()); name String @unique; @@map("programs"); courses Course[] @relation("ProgramCourses"); applications Application[]; certificates Certificate[]; } // Simplified
model Course { id String @id @default(cuid()); courseCode String @unique; name String; @@map("courses"); programs Program[] @relation("ProgramCourses"); offerings CourseOffering[]; applications Application[]; certificates Certificate[]; } // Simplified
model CourseOffering { id String @id @default(cuid()); offeringCode String @unique; courseId String; course Course @relation(fields: [courseId], references: [id]); facultyId String?; /* faculty Faculty? @relation(...) */ startDate DateTime; endDate DateTime; mode CourseMode; @@map("course_offerings"); enrollments Enrollment[]; } // Simplified
model Faculty { id String @id @default(cuid()); email String @unique; userId String? @unique; /// FK to shared_db.users.id; @@map("faculty"); /* courseOfferings CourseOffering[] */} // Simplified
model Enrollment { id String @id @default(cuid()); studentId String; student Student @relation(fields: [studentId], references: [id]); courseOfferingId String; courseOffering CourseOffering @relation(fields: [courseOfferingId], references: [id]); status EnrollmentStatus @default(ENROLLED); @@unique([studentId, courseOfferingId]); @@map("enrollments"); } // Simplified
model Certificate { id String @id @default(cuid()); studentId String; student Student @relation(fields: [studentId], references: [id]); certificateNumber String @unique; @@map("certificates"); programId String?; program Program? @relation(fields: [programId], references: [id]); courseId String?; course Course? @relation(fields: [courseId], references: [id]); } // Simplified
model WorkflowTemplate {id String @id @default(cuid()); name String @unique; type WorkflowType; @@map("workflow_templates"); taskTemplates WorkflowTaskTemplate[]; workflows StudentWorkflow[]; } // Simplified
model WorkflowTaskTemplate {id String @id @default(cuid()); templateId String; template WorkflowTemplate @relation(fields: [templateId], references: [id]); name String; @@map("workflow_task_templates"); studentTasks StudentWorkflowTask[]; } // Simplified
model StudentWorkflow { id String @id @default(cuid()); studentId String?; student Student? @relation(fields: [studentId], references: [id]); templateId String; template WorkflowTemplate @relation(fields: [templateId], references: [id]); status WorkflowStatus @default(PENDING); @@map("student_workflows"); tasks StudentWorkflowTask[]; applicationId String? @unique; application Application? @relation(fields: [applicationId], references: [id]);} // Simplified
model StudentWorkflowTask { id String @id @default(cuid()); workflowId String; workflow StudentWorkflow @relation(fields: [workflowId], references: [id]); taskTemplateId String; taskTemplate WorkflowTaskTemplate @relation(fields: [taskTemplateId], references: [id]); status TaskStatus @default(TODO); assigneeId String?; /// FK to shared_db.users.id; @@map("student_workflow_tasks"); } // Simplified

`; // Added simplified versions for brevity

const cosmeticsPrismaContent = `
/// prisma/cosmetics.prisma (Cosmetics Service)
datasource db { provider = "postgresql"; url = env("COSMETICS_DATABASE_URL"); }
generator client { provider = "prisma-client-js"; output = "../node_modules/.prisma/client-cosmetics"; previewFeatures = ["extendedWhereUnique"]; }

// Enums or use strings + lookup/config
enum OrderStatus { PENDING_PAYMENT PROCESSING SHIPPED DELIVERED CANCELLED RETURNED }

// Models: Customer, Product, InventoryItem, SalesOrder, OrderItem, Activity (Cosmetics specific)
// IMPORTANT: Add Foreign Key fields referencing shared_db logically

model Customer { // Cosmetics specific data
  id            String   @id @default(cuid())
  customerId    String   @unique /// FK to shared_db.customers.id (Logical)
  loyaltyPoints Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  orders        SalesOrder[]
  activities    Activity[] @relation("ActivityCustomers")
  @@map("customers")
}

model Product {
  id          String    @id @default(cuid())
  name        String    @unique
  sku         String    @unique
  description String?
  price       Decimal
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  inventoryItems InventoryItem[]
  orderItems  OrderItem[]
  @@map("products")
}

model InventoryItem {
  id        String   @id @default(cuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  location  String?  @default("default")
  quantity  Int
  lastUpdated DateTime @updatedAt
  @@unique([productId, location])
  @@map("inventory_items")
}

model SalesOrder {
  id           String      @id @default(cuid())
  orderNumber  String      @unique
  customerId   String      /// FK to cosmetics_db.customers.id (Logical)
  customer     Customer    @relation(fields: [customerId], references: [id], onDelete: Restrict)
  orderDate    DateTime    @default(now())
  status       OrderStatus // Or String
  totalAmount  Decimal
  currency     String      @default("VND")
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
  items        OrderItem[]
  activities   Activity[] @relation("ActivityOrders")
  @@index([customerId])
  @@index([status])
  @@map("sales_orders")
}

model OrderItem {
  id          String     @id @default(cuid())
  orderId     String
  order       SalesOrder @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId   String
  product     Product    @relation(fields: [productId], references: [id], onDelete: Restrict)
  quantity    Int
  unitPrice   Decimal
  totalPrice  Decimal
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  @@index([orderId])
  @@index([productId])
  @@map("order_items")
}

model Activity {
  id          String     @id @default(cuid())
  subject     String
  type        String     /// Defined via config/lookup
  status      String     @default("OPEN") /// Defined via config/lookup
  dueDate     DateTime?
  description String?
  ownerId     String     /// FK to shared_db.users.id (Logical)

  customerId  String?    /// FK to cosmetics_db.customers.id
  customer    Customer?  @relation("ActivityCustomers", fields: [customerId], references: [id], onDelete: Cascade)
  orderId     String?    /// FK to cosmetics_db.sales_orders.id
  order       SalesOrder? @relation("ActivityOrders", fields: [orderId], references: [id], onDelete: Cascade)

  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  @@index([ownerId])
  @@index([customerId])
  @@index([orderId])
  @@map("activities")
}
`;

const spaPrismaContent = `
/// prisma/spa.prisma (Spa Service)
datasource db { provider = "postgresql"; url = env("SPA_DATABASE_URL"); }
generator client { provider = "prisma-client-js"; output = "../node_modules/.prisma/client-spa"; previewFeatures = ["extendedWhereUnique"]; }

// Enums or use strings + lookup/config
enum AppointmentStatus { SCHEDULED CONFIRMED CHECKED_IN COMPLETED CANCELLED NO_SHOW }
enum PaymentStatus { UNPAID PAID PARTIALLY_PAID REFUNDED }

// Models: Client, SpaService, Therapist, Appointment, AppointmentService, Membership, Activity (Spa specific)
// IMPORTANT: Add Foreign Key fields referencing shared_db logically

model Client { // Spa specific data
  id            String   @id @default(cuid())
  customerId    String   @unique /// FK to shared_db.customers.id (Logical)
  preferences   String?
  allergies     String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  appointments  Appointment[]
  memberships   Membership[]
  activities    Activity[] @relation("ActivityClients")
  @@map("clients")
}

model SpaService {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  durationMin Int
  price       Decimal
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  appointments AppointmentService[]
  @@map("spa_services")
}

model Therapist {
  id          String   @id @default(cuid())
  employeeId  String?  @unique /// FK to central HRM Employee ID or User ID (Logical)
  firstName   String
  lastName    String
  specialties String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  appointments Appointment[]
  @@map("therapists")
}

model Appointment {
  id           String            @id @default(cuid())
  clientId     String            /// FK to spa_db.clients.id (Logical)
  client       Client            @relation(fields: [clientId], references: [id], onDelete: Restrict)
  startTime    DateTime
  endTime      DateTime
  therapistId  String?
  therapist    Therapist?        @relation(fields: [therapistId], references: [id], onDelete: SetNull)
  status       AppointmentStatus @default(SCHEDULED) // Or String
  notes        String?
  totalAmount  Decimal?
  paymentStatus PaymentStatus?   @default(UNPAID) // Or String
  createdAt    DateTime          @default(now())
  updatedAt    DateTime          @updatedAt
  services     AppointmentService[]
  activities   Activity[]        @relation("ActivityAppointments")
  @@index([clientId])
  @@index([therapistId])
  @@index([startTime])
  @@map("appointments")
}

model AppointmentService {
  appointmentId String
  appointment   Appointment @relation(fields: [appointmentId], references: [id], onDelete: Cascade)
  serviceId     String
  service       SpaService  @relation(fields: [serviceId], references: [id], onDelete: Restrict)
  @@id([appointmentId, serviceId])
  @@map("appointment_services")
}

model Membership {
  id          String    @id @default(cuid())
  clientId    String    /// FK to spa_db.clients.id (Logical)
  client      Client    @relation(fields: [clientId], references: [id], onDelete: Cascade)
  packageName String
  startDate   DateTime
  endDate     DateTime?
  // status      String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  @@index([clientId])
  @@map("memberships")
}

model Activity {
  id          String     @id @default(cuid())
  subject     String
  type        String     /// Defined via config/lookup
  status      String     @default("OPEN") /// Defined via config/lookup
  dueDate     DateTime?
  description String?
  ownerId     String     /// FK to shared_db.users.id (Logical)

  clientId      String?    /// FK to spa_db.clients.id
  client        Client?    @relation("ActivityClients", fields: [clientId], references: [id], onDelete: Cascade)
  appointmentId String?    /// FK to spa_db.appointments.id
  appointment   Appointment? @relation("ActivityAppointments", fields: [appointmentId], references: [id], onDelete: Cascade)

  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  @@index([ownerId])
  @@index([clientId])
  @@index([appointmentId])
  @@map("activities")
}
`;

const envContent = `
# .env - Mẫu các biến môi trường cần thiết
# Thay thế bằng các giá trị thực tế của bạn

# Database URLs (Point to your running PostgreSQL container)
# Assumes user 'user', password 'password', host 'postgres', port '5432'
# Change user/password if you modified them in docker-compose.yml
SHARED_DATABASE_URL="postgresql://user:password@postgres:5432/shared_db?schema=public"
ACADEMY_DATABASE_URL="postgresql://user:password@postgres:5432/academy_db?schema=public"
COSMETICS_DATABASE_URL="postgresql://user:password@postgres:5432/cosmetics_db?schema=public"
SPA_DATABASE_URL="postgresql://user:password@postgres:5432/spa_db?schema=public"

# Database Names (Used by init-db.sh)
SHARED_DATABASE_NAME=shared_db
ACADEMY_DATABASE_NAME=academy_db
COSMETICS_DATABASE_NAME=cosmetics_db
SPA_DATABASE_NAME=spa_db

# PostgreSQL Credentials (Used by docker-compose and init-db.sh)
POSTGRES_USER=user
POSTGRES_PASSWORD=password

# PgAdmin Credentials
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin

# Redis (Nếu có mật khẩu)
# REDIS_PASSWORD=your_redis_password

# JWT Secret (QUAN TRỌNG: Thay bằng một chuỗi bí mật mạnh và dài)
JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY_CHANGE_THIS

# Add other necessary environment variables for your services
# e.g., API Keys, third-party service URLs, etc.
`;

// --- Main Script Logic ---
const rootDirPath = path.resolve(__dirname, projectRootDir);

console.log(`Creating project structure at: ${rootDirPath}`);

try {
  // Create root directory
  if (!fs.existsSync(rootDirPath)) {
    fs.mkdirSync(rootDirPath);
    console.log(`Created directory: ${projectRootDir}`);
  } else {
    console.log(`Directory ${projectRootDir} already exists.`);
  }

  // Create subdirectories
  directories.forEach(dir => {
    const dirPath = path.join(rootDirPath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });

  // Define files and their content
  const files = {
    'docker-compose.yml': dockerComposeContent,
    '.env': envContent,
    'nginx/nginx.conf': nginxConfContent,
    'nginx/includes/proxy_params': nginxProxyParamsContent,
    'nginx/includes/proxy_params_angular_dev': nginxProxyParamsAngularDevContent,
    'init-db.sh': initDbScriptContent,
    // Backend Dockerfiles (use the same template)
    'backend/shared-core/Dockerfile': backendDockerfileContent,
    'backend/academy/Dockerfile': backendDockerfileContent,
    'backend/cosmetics/Dockerfile': backendDockerfileContent,
    'backend/spa/Dockerfile': backendDockerfileContent,
    // Frontend Dockerfiles (use the same template)
    'frontend/academy/Dockerfile': frontendDockerfileContent,
    'frontend/cosmetics/Dockerfile': frontendDockerfileContent,
    'frontend/spa/Dockerfile': frontendDockerfileContent,
    // Prisma Schema Files
    'backend/shared-core/prisma/shared.prisma': sharedPrismaContent,
    'backend/academy/prisma/academy.prisma': academyPrismaContent,
    'backend/cosmetics/prisma/cosmetics.prisma': cosmeticsPrismaContent,
    'backend/spa/prisma/spa.prisma': spaPrismaContent,
    // Add placeholder files for apps if desired (e.g., main.ts, app.module.ts)
    // 'backend/shared-core/src/main.ts': '// Shared Core Main',
    // 'frontend/academy/src/main.ts': '// Academy Frontend Main',
  };

  // Write files
  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(rootDirPath, filePath);
    // Ensure parent directory exists before writing file
    const dirName = path.dirname(fullPath);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
    }
    try {
      fs.writeFileSync(fullPath, content.trim()); // Use trim() to remove leading/trailing whitespace
      console.log(`Created file: ${filePath}`);

      // Make init-db.sh executable
      if (filePath === 'init-db.sh') {
        fs.chmodSync(fullPath, 0o755); // rwxr-xr-x
        console.log(`Made init-db.sh executable.`);
      }
    } catch (writeErr) {
      console.error(`Error writing file ${filePath}:`, writeErr);
    }
  }

  console.log('\nProject structure created successfully!');
  console.log('Next steps:');
  console.log(`1. Navigate to the backend and frontend subdirectories (e.g., ${path.join(projectRootDir, 'backend/shared-core')}) and run 'npm install' (or yarn/pnpm).`);
  console.log(`2. Review and customize the generated files, especially '.env', Dockerfiles, and Prisma schemas.`);
  console.log(`3. Run 'docker-compose up -d --build' in the '${projectRootDir}' directory to start the development environment.`);

} catch (err) {
  console.error('Error creating project structure:', err);
}