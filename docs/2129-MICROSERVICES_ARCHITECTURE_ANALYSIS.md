# 🏗️ PHÂN TÍCH KIẾN TRÚC MICROSERVICES - DỰ ÁN RAUSACH TRẦN GIA

**Ngày tạo:** 13/12/2025  
**Phiên bản:** 1.0  
**Trạng thái:** Phân tích & Đề xuất

---

## 📋 MỤC LỤC

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Các tính năng hiện có](#2-các-tính-năng-hiện-có)
3. [Phân tích Domain](#3-phân-tích-domain)
4. [Đề xuất phân tách Microservices](#4-đề-xuất-phân-tách-microservices)
5. [Kiến trúc chi tiết](#5-kiến-trúc-chi-tiết)
6. [Kế hoạch Migration](#6-kế-hoạch-migration)
7. [Risks & Mitigation](#7-risks--mitigation)

---

## 1. TỔNG QUAN DỰ ÁN

### 1.1. Thông tin cơ bản

**Tên dự án:** Rau Sạch Trần Gia - Full Stack Management System  
**Tech Stack:**
- **Backend:** NestJS, Prisma ORM, PostgreSQL, GraphQL
- **Frontend:** Angular 18+, Angular Material, Signal-based state
- **Infrastructure:** Docker, PM2, Nginx, Redis, MinIO

**Kiến trúc hiện tại:** Monolithic Application
- Backend API: Single NestJS application
- Frontend: Single Angular SPA
- Database: Single PostgreSQL instance
- Cache: Redis
- Storage: MinIO (S3-compatible)

### 1.2. Thống kê dự án

| Thành phần | Số lượng | Ghi chú |
|------------|----------|---------|
| **Database Models** | 45+ models | Prisma Schema |
| **Backend Modules** | 30+ modules | NestJS Modules |
| **Frontend Components** | 90+ components | Angular Components |
| **API Endpoints** | 200+ endpoints | REST + GraphQL |
| **Business Domains** | 8 major domains | Chi tiết bên dưới |
| **Lines of Code** | ~50,000+ LOC | Backend + Frontend |

---

## 2. CÁC TÍNH NĂNG HIỆN CÓ

### 2.1. Phân loại theo Database Schema

#### 📦 **QUẢN LÝ SẢN PHẨM & GIÁ** (Product & Price Management)

**Database Models:**
```prisma
- Sanpham (Products)
- Banggia (Price Lists)
- Banggiasanpham (Product Prices)
- BanggiasanphamHistory (Price History)
- DonhangPriceAudit (Order Price Audit)
```

**API Modules:**
- `SanphamModule` - Quản lý sản phẩm
- `BanggiaModule` - Quản lý bảng giá

**Frontend Components:**
- ListSanpham, DetailSanpham
- ListBanggia, DetailBanggia
- PriceHistoryDialog
- PriceComparisonComponent
- PriceAnalyticsComponent
- PriceAlertsComponent
- BulkPriceUpdateComponent

**Chức năng:**
- ✅ CRUD sản phẩm với hình ảnh
- ✅ Quản lý đơn vị tính (DVT)
- ✅ Quản lý bảng giá theo thời gian
- ✅ Lịch sử thay đổi giá tự động
- ✅ So sánh giá giữa các bảng giá
- ✅ Cập nhật giá hàng loạt
- ✅ Cảnh báo thay đổi giá
- ✅ Phân tích xu hướng giá

---

#### 👥 **QUẢN LÝ KHÁCH HÀNG** (Customer Relationship Management - CRM)

**Database Models:**
```prisma
- Khachhang (Customers)
- Nhomkhachhang (Customer Groups)
- Donhang (Orders - liên quan)
```

**API Modules:**
- `KhachhangModule`
- `NhomkhachhangModule`

**Frontend Components:**
- ListKhachhang, DetailKhachhang
- ListNhomkhachhang, DetailNhomkhachhang
- SharedKhachhang

**Chức năng:**
- ✅ Quản lý thông tin khách hàng
- ✅ Phân loại khách hàng theo nhóm
- ✅ Gán bảng giá riêng cho từng khách hàng
- ✅ Thiết lập mã chuyến giao hàng
- ✅ Theo dõi công nợ khách hàng
- ✅ Lịch sử giao dịch
- ✅ Import/Export Excel

---

#### 🚚 **QUẢN LÝ ĐƠN HÀNG & GIAO HÀNG** (Order & Delivery Management)

**Database Models:**
```prisma
- Donhang (Customer Orders)
- Donhangsanpham (Order Items)
- DonhangPriceAudit (Price verification)
```

**API Modules:**
- `DonhangModule`
- `DashboardModule` (order statistics)

**Frontend Components:**
- ListDonhang, DetailDonhang
- VandonComponent (Delivery notes)
- ListPhieuchuyen (Delivery trips)
- ListPhieuchiahang (Package distribution)
- ListPhieugiaohang (Delivery receipts)
- PriceVerificationComponent

**Chức năng:**
- ✅ Tạo đơn hàng từ khách hàng
- ✅ Quản lý trạng thái đơn: đã đặt, đã giao, đã nhận, hủy, hoàn thành
- ✅ Xác thực giá tại thời điểm đặt hàng
- ✅ Export/Import Excel vận đơn
- ✅ Phiếu chuyến với Shipper tracking
- ✅ Phiếu chia hàng với nhân viên chia hàng
- ✅ Phiếu giao hàng với ký nhận
- ✅ Quản lý số lượng đặt/giao/nhận/hủy
- ✅ Tính toán tổng tiền, VAT
- ✅ In phiếu giao hàng
- ✅ Hủy đơn hàng với lý do

---

#### 🏪 **QUẢN LÝ NHÀ CUNG CẤP & ĐẶT HÀNG** (Supplier & Purchase Management)

**Database Models:**
```prisma
- Nhacungcap (Suppliers)
- NhomNcc (Supplier Groups)
- Dathang (Purchase Orders)
- Dathangsanpham (Purchase Items)
```

**API Modules:**
- `NhacungcapModule`
- `DathangModule`

**Frontend Components:**
- ListNhacungcap, DetailNhacungcap
- ListNhomncc, DetailNhomncc
- ListDathang, DetailDathang
- Nhucaudathang (Purchase requisition)
- CongnoNcc (Supplier debt)

**Chức năng:**
- ✅ Quản lý thông tin nhà cung cấp
- ✅ Phân loại nhà cung cấp theo nhóm
- ✅ Tạo đơn đặt hàng từ NCC
- ✅ Quản lý trạng thái đơn đặt hàng
- ✅ Nhu cầu đặt hàng tự động
- ✅ Theo dõi công nợ nhà cung cấp
- ✅ Import/Export Excel

---

#### 📦 **QUẢN LÝ KHO & TỒN KHO** (Warehouse & Inventory Management - WMS)

**Database Models:**
```prisma
- Kho (Warehouses)
- Congty (Companies)
- SanphamKho (Product in Warehouse)
- TonKho (Stock Levels)
- PhieuKho (Warehouse Receipts)
- PhieuKhoSanpham (Warehouse Items)
- Chotkho (Stock Take/Inventory Count)
- Chotkhodetail (Stock Take Details)
```

**API Modules:**
- `khoModule`
- `PhieukhoModule`
- `ChotkhoModule`

**Frontend Components:**
- ListKho, DetailKho
- ListPhieukho, DetailPhieukho
- Xuatnhapton (Stock movements)
- LichsuTonkho (Stock history)

**Chức năng:**
- ✅ Quản lý nhiều kho
- ✅ Phiếu nhập kho (từ NCC)
- ✅ Phiếu xuất kho (cho đơn hàng)
- ✅ Theo dõi tồn kho thời gian thực
- ✅ Chốt kho 2 bước:
  - Bước 1: Nhập số lượng thực tế
  - Bước 2: Tạo phiếu kho điều chỉnh
- ✅ Tính toán chênh lệch kho
- ✅ Đồng bộ tồn kho sau giao dịch
- ✅ Lịch sử xuất nhập tồn
- ✅ Báo cáo tồn kho

---

#### 👤 **QUẢN LÝ NHÂN VIÊN & PHÒNG BAN** (Human Resource Management - HRM)

**Database Models:**
```prisma
- Nhanvien (Employees)
- Phongban (Departments)
- User (linked to Nhanvien)
```

**API Modules:**
- `NhanvienModule`
- `PhongbanModule`

**Frontend Components:**
- ListNhanvien, DetailNhanvien, FormNhanvien
- ListPhongban, DetailPhongban, FormPhongban

**Chức năng:**
- ✅ Quản lý hồ sơ nhân viên
  - Thông tin cá nhân (họ tên, giới tính, ngày sinh, CMND)
  - Thông tin liên hệ (SĐT, email, địa chỉ)
  - Thông tin công việc (phòng ban, chức vụ, vị trí, loại hợp đồng)
  - Ngày vào làm, nghỉ việc
  - Trạng thái: đang làm việc, nghỉ phép, thử việc, đã nghỉ
- ✅ Thông tin lương (lương cơ bản, phụ cấp, hệ số lương)
- ✅ Thông tin ngân hàng
- ✅ Liên hệ khẩn cấp
- ✅ Quản lý phòng ban đa cấp
  - Phân cấp phòng ban (parent-child)
  - Trưởng phòng
  - Loại: Phòng ban, Bộ phận, Phòng, Ban, Tổ, Nhóm
- ✅ Liên kết với User account
- ✅ Import/Export Excel

---

#### 🔐 **QUẢN LÝ NGƯỜI DÙNG & QUYỀN** (User & Permission Management - IAM)

**Database Models:**
```prisma
- User (Users)
- Role (Roles)
- Permission (Permissions)
- UserRole (User-Role mapping)
- RolePermission (Role-Permission mapping)
- UserPermission (User-specific permissions)
- Profile (User profiles)
- AuditLog (Audit trail)
```

**API Modules:**
- `UserModule`
- `AuthModule`
- `RoleModule`
- `PermissionModule`
- `UserPermissionModule`
- `AuditLogModule`

**Frontend Components:**
- ListUser, DetailUser
- ListRole, DetailRole
- ListPermission, DetailPermission
- UserPermissionManagement
- UserPermissionOverview
- UserPermissionSummary
- ListAuditlog, DetailAuditlog

**Chức năng:**
- ✅ Đăng ký, đăng nhập (JWT)
- ✅ OAuth2 (Google, Facebook)
- ✅ Quản lý vai trò (Roles)
- ✅ Quản lý quyền hạn (Permissions)
- ✅ Phân quyền theo nhóm (Role-based)
- ✅ Phân quyền cá nhân (User-specific override)
- ✅ Audit log đầy đủ:
  - Theo dõi CREATE, UPDATE, DELETE
  - Lưu oldValues, newValues
  - User, IP, UserAgent
  - Search trong JSON data
- ✅ Export audit log Excel
- ✅ Quản lý profile người dùng

---

#### 📊 **BÁO CÁO & THỐNG KÊ** (Analytics & Reporting)

**API Modules:**
- `DashboardModule`

**Frontend Components:**
- DashboardComponent
- BaocaodoanhtuComponent
- PerformanceComponent
- KhoiluongKhachhang (Customer volume report)

**Chức năng:**
- ✅ Dashboard tổng quan
- ✅ Báo cáo doanh thu
- ✅ Thống kê khối lượng theo khách hàng
- ✅ Thống kê theo thời gian
- ✅ Performance monitoring
- ✅ Export reports Excel

---

#### 🛠️ **HỆ THỐNG HỖ TRỢ** (Support & Utilities)

**Database Models:**
```prisma
- SupportTicket (Support Tickets)
- SupportResponse (Ticket Responses)
- SupportAttachment (Attachments)
- FileManager (File management)
- Menu (Navigation)
- UserguidBlock, UserguidStep (User guides)
- ImportHistory (Import logs)
- ErrorLog (Error tracking)
- PerformanceLog (Performance tracking)
- ChatAIMessage, ChatAIHistory (AI Chatbot)
```

**API Modules:**
- `SupportModule` (Ticketing system)
- `MenuModule`
- `UserguideModule`
- `ImportdataModule`
- `ErrorlogsModule`
- `SharedModule` (Google Drive integration)
- `CacheModule` (Redis)
- `CallbackModule`

**Frontend Components:**
- ListHotro, DetailHotro (Support tickets)
- ListUserguide, DetailUserguide
- ListImportdata, DetailImportdata
- ListQuanlyfile, Listdanhmuc, Listbaiviet (CMS features)
- TestingComponent
- Facecomparison (Face recognition)
- Vantay (Fingerprint - stub)

**Chức năng:**
- ✅ Hệ thống ticket hỗ trợ
  - Tạo ticket với mức độ ưu tiên
  - Phân công kỹ thuật viên
  - Trả lời, đính kèm file
  - Theo dõi trạng thái
- ✅ Import data từ Excel
- ✅ Lưu lịch sử import
- ✅ User guide động
- ✅ Quản lý file với MinIO
- ✅ Menu động
- ✅ Redis cache
- ✅ Error logging
- ✅ Performance logging
- ✅ AI Chatbot integration (stub)
- ✅ Face comparison (stub)

---

## 3. PHÂN TÍCH DOMAIN

### 3.1. Domain Mapping

Dựa trên phân tích trên, hệ thống có thể chia thành **8 domains chính**:

| # | Domain | Độ ưu tiên | Độ phức tạp | Phụ thuộc |
|---|--------|------------|-------------|-----------|
| 1 | **Product Catalog** | ⭐⭐⭐⭐⭐ | Medium | Minimal |
| 2 | **CRM (Customer)** | ⭐⭐⭐⭐⭐ | Medium | Product Catalog |
| 3 | **Order Management** | ⭐⭐⭐⭐⭐ | High | CRM, Product, Inventory |
| 4 | **Supplier Management** | ⭐⭐⭐⭐ | Medium | Product Catalog |
| 5 | **Warehouse (WMS)** | ⭐⭐⭐⭐⭐ | High | Product, Order, Supplier |
| 6 | **HRM** | ⭐⭐⭐ | Medium | IAM |
| 7 | **IAM (Auth & Permission)** | ⭐⭐⭐⭐⭐ | High | None (Core) |
| 8 | **Analytics & Support** | ⭐⭐⭐ | Low | All domains |

### 3.2. Bounded Contexts

```
┌─────────────────────────────────────────────────────────────────┐
│                         IAM Service (Core)                       │
│  - Authentication, Authorization, Users, Roles, Permissions     │
└────────────────────┬────────────────────────────────────────────┘
                     │ (All services depend on IAM)
        ┌────────────┼────────────┬────────────┐
        │            │            │            │
┌───────▼─────┐ ┌───▼──────┐ ┌──▼───────┐ ┌──▼──────────┐
│  Product    │ │   CRM    │ │ Supplier │ │    HRM      │
│  Catalog    │ │ Service  │ │ Service  │ │  Service    │
└──────┬──────┘ └────┬─────┘ └────┬─────┘ └─────────────┘
       │             │             │
       │    ┌────────▼─────────────▼───────┐
       │    │                                │
       │    │     Order Management          │
       │    │  - Orders, Delivery, Pricing  │
       │    │                                │
       │    └──────────┬────────────────────┘
       │               │
       │               │
┌──────▼───────────────▼──────────┐
│    Warehouse/Inventory (WMS)    │
│  - Stock, PhieuKho, Chotkho     │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│  Analytics & Support Service    │
│  - Reports, Dashboard, Tickets  │
└─────────────────────────────────┘
```

---

## 4. ĐỀ XUẤT PHÂN TÁCH MICROSERVICES

### 4.1. Danh sách Microservices

#### 🔐 **SERVICE 1: IAM Service** (Identity & Access Management)

**Mô tả:** Core service quản lý authentication, authorization, users, roles, permissions

**Database Tables:**
- User, Role, Permission
- UserRole, RolePermission, UserPermission
- Profile, AuditLog
- Menu (có thể)

**API Modules:**
- UserModule
- AuthModule
- RoleModule
- PermissionModule
- UserPermissionModule
- AuditLogModule
- MenuModule

**Endpoints:**
- `POST /auth/login`, `/auth/register`
- `GET/POST/PUT/DELETE /users/:id`
- `GET/POST/PUT/DELETE /roles/:id`
- `GET/POST/PUT/DELETE /permissions/:id`
- `GET /audit-logs`

**Technology Stack:**
- NestJS
- Prisma + PostgreSQL
- JWT + Passport
- Redis (session/cache)

**Độ ưu tiên:** ⭐⭐⭐⭐⭐ (Critical - tách đầu tiên)

**Lý do tách:**
- Core service, tất cả services khác phụ thuộc
- Security-critical
- Có thể scale độc lập
- Reusable cho nhiều applications

---

#### 📦 **SERVICE 2: Product Catalog Service**

**Mô tả:** Quản lý sản phẩm, bảng giá, lịch sử giá

**Database Tables:**
- Sanpham
- Banggia
- Banggiasanpham
- BanggiasanphamHistory

**API Modules:**
- SanphamModule
- BanggiaModule

**Endpoints:**
- `GET/POST/PUT/DELETE /products/:id`
- `GET/POST/PUT/DELETE /price-lists/:id`
- `GET /products/:id/price-history`
- `POST /price-lists/:id/bulk-update`

**Technology Stack:**
- NestJS
- Prisma + PostgreSQL
- Redis (cache giá sản phẩm)
- MinIO (hình ảnh sản phẩm)

**Độ ưu tiên:** ⭐⭐⭐⭐⭐ (High)

**Lý do tách:**
- Domain độc lập rõ ràng
- Dữ liệu master data
- Cần cache hiệu quả
- Có thể tích hợp với e-commerce sau này

---

#### 👥 **SERVICE 3: CRM Service** (Customer Relationship Management)

**Mô tả:** Quản lý khách hàng, nhóm khách hàng, công nợ

**Database Tables:**
- Khachhang
- Nhomkhachhang

**API Modules:**
- KhachhangModule
- NhomkhachhangModule

**Endpoints:**
- `GET/POST/PUT/DELETE /customers/:id`
- `GET/POST/PUT/DELETE /customer-groups/:id`
- `GET /customers/:id/orders` (call Order Service)
- `GET /customers/:id/debt`

**Technology Stack:**
- NestJS
- Prisma + PostgreSQL
- Redis (cache)

**Độ ưu tiên:** ⭐⭐⭐⭐ (High)

**Lý do tách:**
- Domain CRM chuẩn
- Có thể mở rộng với marketing automation
- Độc lập về business logic

---

#### 🚚 **SERVICE 4: Order Management Service** (OMS)

**Mô tả:** Quản lý đơn hàng khách hàng, giao hàng, vận đơn

**Database Tables:**
- Donhang
- Donhangsanpham
- DonhangPriceAudit

**API Modules:**
- DonhangModule

**Endpoints:**
- `GET/POST/PUT/DELETE /orders/:id`
- `GET /orders/:id/verify-prices`
- `POST /orders/:id/cancel`
- `GET /orders/delivery-notes`
- `POST /orders/:id/export-excel`

**External Calls:**
- Product Service: Lấy giá sản phẩm
- CRM Service: Thông tin khách hàng
- Warehouse Service: Cập nhật tồn kho

**Technology Stack:**
- NestJS
- Prisma + PostgreSQL
- Redis (cache)
- Event Bus (RabbitMQ/Kafka) cho sync tồn kho

**Độ ưu tiên:** ⭐⭐⭐⭐⭐ (Critical)

**Lý do tách:**
- Core business logic
- Transaction-heavy
- Cần scale độc lập (peak hours)
- Complex business rules

---

#### 🏪 **SERVICE 5: Supplier Management Service**

**Mô tả:** Quản lý nhà cung cấp, đơn đặt hàng, công nợ NCC

**Database Tables:**
- Nhacungcap
- NhomNcc
- Dathang
- Dathangsanpham

**API Modules:**
- NhacungcapModule
- DathangModule

**Endpoints:**
- `GET/POST/PUT/DELETE /suppliers/:id`
- `GET/POST/PUT/DELETE /purchase-orders/:id`
- `GET /suppliers/:id/debt`

**External Calls:**
- Product Service: Thông tin sản phẩm
- Warehouse Service: Nhập kho

**Technology Stack:**
- NestJS
- Prisma + PostgreSQL

**Độ ưu tiên:** ⭐⭐⭐ (Medium)

**Lý do tách:**
- Domain độc lập
- Ít phụ thuộc vào các service khác
- Có thể phát triển tích hợp EDI với NCC

---

#### 📦 **SERVICE 6: Warehouse Management Service** (WMS)

**Mô tả:** Quản lý kho, tồn kho, xuất nhập kho, chốt kho

**Database Tables:**
- Kho, Congty
- SanphamKho
- TonKho
- PhieuKho, PhieuKhoSanpham
- Chotkho, Chotkhodetail

**API Modules:**
- khoModule
- PhieukhoModule
- ChotkhoModule

**Endpoints:**
- `GET/POST/PUT/DELETE /warehouses/:id`
- `POST /warehouse-receipts` (nhập/xuất kho)
- `GET /stock-levels`
- `POST /stock-take` (chốt kho)
- `GET /stock-movements`

**External Calls:**
- Product Service: Thông tin sản phẩm
- Order Service: Thông tin đơn hàng (khi xuất kho)
- Supplier Service: Đơn đặt hàng (khi nhập kho)

**Technology Stack:**
- NestJS
- Prisma + PostgreSQL
- Event Bus (nhận events từ Order/Supplier)

**Độ ưu tiên:** ⭐⭐⭐⭐⭐ (Critical)

**Lý do tách:**
- Complex domain (WMS)
- Real-time stock tracking
- High-frequency operations
- Có thể scale riêng

---

#### 👤 **SERVICE 7: HRM Service** (Human Resource Management)

**Mô tả:** Quản lý nhân viên, phòng ban

**Database Tables:**
- Nhanvien
- Phongban

**API Modules:**
- NhanvienModule
- PhongbanModule

**Endpoints:**
- `GET/POST/PUT/DELETE /employees/:id`
- `GET/POST/PUT/DELETE /departments/:id`
- `GET /departments/:id/employees`

**External Calls:**
- IAM Service: Link với User account

**Technology Stack:**
- NestJS
- Prisma + PostgreSQL

**Độ ưu tiên:** ⭐⭐⭐ (Medium)

**Lý do tách:**
- Domain HRM độc lập
- Có thể mở rộng với Payroll, Timesheet
- Dễ tích hợp với hệ thống HR khác

---

#### 📊 **SERVICE 8: Analytics & Support Service**

**Mô tả:** Dashboard, báo cáo, support tickets, utilities

**Database Tables:**
- SupportTicket, SupportResponse, SupportAttachment
- FileManager
- UserguidBlock, UserguidStep
- ImportHistory
- ErrorLog, PerformanceLog
- ChatAIMessage, ChatAIHistory

**API Modules:**
- DashboardModule
- SupportModule
- UserguideModule
- ImportdataModule
- ErrorlogsModule
- SharedModule

**Endpoints:**
- `GET /dashboard/stats`
- `GET /reports/revenue`
- `GET/POST /support/tickets`
- `POST /import/excel`

**External Calls:**
- ALL services: để lấy dữ liệu báo cáo

**Technology Stack:**
- NestJS
- Prisma + PostgreSQL
- MinIO (file storage)
- Redis (cache reports)

**Độ ưu tiên:** ⭐⭐ (Low - có thể tách sau cùng)

**Lý do tách:**
- Utilities, không critical
- Phụ thuộc vào tất cả services khác
- Có thể dùng API Gateway để aggregate data

---

### 4.2. Tóm tắt phân tách

| Service | Database Size | API Complexity | Dependencies | Tách thứ tự |
|---------|---------------|----------------|--------------|-------------|
| IAM Service | Small (~10 tables) | Medium | None | 1️⃣ |
| Product Catalog | Small (~4 tables) | Low | IAM | 2️⃣ |
| CRM Service | Small (~2 tables) | Low | IAM, Product | 3️⃣ |
| Supplier Service | Medium (~4 tables) | Low | IAM, Product | 4️⃣ |
| Order Service | Medium (~3 tables) | High | IAM, CRM, Product, Warehouse | 5️⃣ |
| Warehouse Service | Large (~10 tables) | High | IAM, Product, Order, Supplier | 6️⃣ |
| HRM Service | Small (~2 tables) | Low | IAM | 7️⃣ |
| Analytics Service | Medium (~8 tables) | Medium | All | 8️⃣ |

---

## 5. KIẾN TRÚC CHI TIẾT

### 5.1. Overall Architecture

```
                          ┌─────────────────────────┐
                          │   Frontend (Angular)    │
                          │  - Single SPA           │
                          └───────────┬─────────────┘
                                      │
                          ┌───────────▼─────────────┐
                          │    API Gateway          │
                          │  - Kong / NGINX         │
                          │  - Auth middleware      │
                          │  - Rate limiting        │
                          └───────────┬─────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │                             │                             │
┌───────▼────────┐          ┌────────▼─────────┐          ┌────────▼────────┐
│  IAM Service   │          │ Product Service  │          │   CRM Service   │
│  Port: 3001    │◄─────────┤  Port: 3002      │◄─────────┤   Port: 3003    │
└────────────────┘          └──────────────────┘          └─────────────────┘
        │                             │                             │
        │                    ┌────────▼─────────┐          ┌────────▼────────┐
        │                    │ Supplier Service │          │  Order Service  │
        │                    │  Port: 3004      │◄─────────┤   Port: 3005    │
        │                    └──────────────────┘          └────────┬────────┘
        │                             │                             │
┌───────▼────────┐          ┌────────▼─────────┐          ┌────────▼────────┐
│  HRM Service   │          │ Warehouse Service│◄─────────┤ Analytics Svc   │
│  Port: 3006    │          │  Port: 3007      │          │   Port: 3008    │
└────────────────┘          └──────────────────┘          └─────────────────┘
        │                             │                             │
        └─────────────────────────────┼─────────────────────────────┘
                                      │
                          ┌───────────▼─────────────┐
                          │   Message Bus (Event)   │
                          │  - RabbitMQ / Kafka     │
                          └─────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         Shared Infrastructure                            │
├─────────────────────────────────────────────────────────────────────────┤
│  - PostgreSQL (per-service databases)                                   │
│  - Redis (shared cache)                                                 │
│  - MinIO (shared storage)                                               │
│  - Elasticsearch (logging)                                              │
│  - Grafana + Prometheus (monitoring)                                    │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2. Communication Patterns

#### Synchronous (REST/GraphQL)
- Frontend → API Gateway → Services
- Service-to-Service: HTTP calls với retry/circuit breaker

#### Asynchronous (Event-Driven)
- Order created → Event → Warehouse Service (reserve stock)
- Order completed → Event → Analytics Service (update stats)
- Stock updated → Event → Order Service (check pending orders)

### 5.3. Data Consistency

**Approach:** Saga Pattern + Event Sourcing

**Example Flow - Order Creation:**

```
1. Order Service: Create order (PENDING status)
   ├─> Publish Event: OrderCreated
   
2. Warehouse Service: Listen OrderCreated
   ├─> Reserve stock
   ├─> If success: Publish StockReserved
   └─> If fail: Publish StockReserveFailed
   
3. Order Service: Listen StockReserved/Failed
   ├─> If StockReserved: Update order (CONFIRMED)
   └─> If Failed: Update order (CANCELLED), Compensate
```

### 5.4. Database Strategy

**Option 1: Database per Service (Recommended)**
- Mỗi service có PostgreSQL instance riêng
- Full autonomy, độc lập scale
- Cần implement data replication/sync

**Option 2: Schema per Service**
- Shared PostgreSQL, mỗi service có schema riêng
- Dễ implement ban đầu
- Vẫn có isolation

**Option 3: Shared Database (Current - Monolith)**
- Tất cả dùng chung DB
- Không khuyến khích cho microservices

**Đề xuất:** Bắt đầu với **Option 2**, migrate dần sang **Option 1**

---

## 6. KẾ HOẠCH MIGRATION

### 6.1. Phương pháp: Strangler Fig Pattern

Không viết lại toàn bộ, mà tách dần từng service ra ngoài.

```
Monolith (Current)
    ↓
Hybrid (During Migration)
    ↓
Full Microservices
```

### 6.2. Migration Roadmap

#### 🔵 **PHASE 0: Preparation** (2-4 tuần)

**Mục tiêu:** Chuẩn bị infrastructure và tooling

**Tasks:**
- [ ] Setup API Gateway (Kong/NGINX)
- [ ] Setup Message Bus (RabbitMQ)
- [ ] Setup Service Discovery (Consul/Eureka)
- [ ] Setup Monitoring (Prometheus + Grafana)
- [ ] Setup Logging (ELK stack)
- [ ] Setup CI/CD pipeline cho multiple services
- [ ] Chuẩn bị Docker/Kubernetes manifests
- [ ] Document API contracts (OpenAPI/Swagger)

**Deliverables:**
- Infrastructure ready
- Tooling setup complete
- CI/CD pipelines tested

---

#### 🟢 **PHASE 1: Extract IAM Service** (3-4 tuần)

**Mục tiêu:** Tách service đầu tiên (IAM) - foundation cho các service khác

**Steps:**

1. **Extract Code** (1 tuần)
   ```bash
   # Tạo project mới
   /microservices
     /iam-service
       /src
         /auth
         /user
         /role
         /permission
         /auditlog
       /prisma
         schema.prisma (chỉ IAM tables)
   ```

2. **Database Migration** (1 tuần)
   - Tạo schema riêng: `iam_schema`
   - Migrate tables: User, Role, Permission, AuditLog, Profile
   - Setup replication nếu cần

3. **Deploy Parallel** (1 tuần)
   - Deploy IAM service song song với monolith
   - API Gateway route `/auth`, `/users`, `/roles` → IAM Service
   - Monolith vẫn xử lý tất cả requests khác

4. **Testing & Validation** (1 tuần)
   - Load testing
   - Security testing
   - Verify authentication flow

**Success Criteria:**
- ✅ IAM service chạy độc lập
- ✅ Frontend authentication hoạt động bình thường
- ✅ Monolith services có thể call IAM service
- ✅ Zero downtime

---

#### 🟢 **PHASE 2: Extract Product Catalog Service** (2-3 tuần)

**Mục tiêu:** Tách master data service

**Steps:**

1. Extract code (SanphamModule, BanggiaModule)
2. Database migration (Sanpham, Banggia tables)
3. Update monolith to call Product Service APIs
4. Deploy & Test

**Success Criteria:**
- ✅ Product operations via Product Service
- ✅ Price history working
- ✅ Frontend listing/editing products

---

#### 🟢 **PHASE 3: Extract CRM Service** (2-3 tuần)

Similar to Phase 2 but for Khachhang, Nhomkhachhang

---

#### 🟢 **PHASE 4: Extract Supplier Service** (2-3 tuần)

Similar to Phase 2 but for Nhacungcap, Dathang

---

#### 🟡 **PHASE 5: Extract Order Service** (4-6 tuần)

**⚠️ Critical Phase - Complex dependencies**

**Challenges:**
- Call Product Service (price validation)
- Call CRM Service (customer info)
- Call Warehouse Service (stock check)
- Distributed transactions (Saga pattern)

**Steps:**

1. **Implement Saga Pattern** (2 tuần)
   - Order Orchestrator
   - Compensation logic
   - Event handlers

2. **Extract Code** (1 tuần)
   - DonhangModule → Order Service

3. **Database Migration** (1 tuần)
   - Donhang, Donhangsanpham tables

4. **Testing** (2 tuần)
   - End-to-end order flow
   - Failure scenarios
   - Compensation testing

---

#### 🟡 **PHASE 6: Extract Warehouse Service** (4-6 tuần)

**⚠️ Most complex service**

Similar complexity to Phase 5, plus:
- Real-time stock tracking
- Chotkho workflow
- Multiple event listeners

---

#### 🟢 **PHASE 7: Extract HRM Service** (2 tuần)

Simple extraction, minimal dependencies

---

#### 🟢 **PHASE 8: Extract Analytics Service** (3-4 tuần)

**Approach:** API Gateway aggregation + CQRS

**Tasks:**
- Implement Read Models
- Aggregate data from all services
- Dashboard API

---

#### 🔵 **PHASE 9: Decommission Monolith** (2 tuần)

**Final step:**
- Verify all traffic routed to microservices
- Backup monolith
- Shut down monolith API
- Celebrate! 🎉

---

### 6.3. Timeline Overview

| Phase | Duration | Start | End | Status |
|-------|----------|-------|-----|--------|
| Phase 0: Preparation | 4 weeks | Week 1 | Week 4 | 🔵 Not Started |
| Phase 1: IAM Service | 4 weeks | Week 5 | Week 8 | 🔵 Not Started |
| Phase 2: Product Service | 3 weeks | Week 9 | Week 11 | 🔵 Not Started |
| Phase 3: CRM Service | 3 weeks | Week 12 | Week 14 | 🔵 Not Started |
| Phase 4: Supplier Service | 3 weeks | Week 15 | Week 17 | 🔵 Not Started |
| Phase 5: Order Service | 6 weeks | Week 18 | Week 23 | 🔵 Not Started |
| Phase 6: Warehouse Service | 6 weeks | Week 24 | Week 29 | 🔵 Not Started |
| Phase 7: HRM Service | 2 weeks | Week 30 | Week 31 | 🔵 Not Started |
| Phase 8: Analytics Service | 4 weeks | Week 32 | Week 35 | 🔵 Not Started |
| Phase 9: Decommission | 2 weeks | Week 36 | Week 37 | 🔵 Not Started |

**Total Duration:** ~37 weeks (~9 months)

**Team Size Recommendation:**
- 1 Solution Architect
- 2-3 Senior Backend Developers
- 1 DevOps Engineer
- 1 QA Engineer
- 1 Frontend Developer (for integration updates)

---

## 7. RISKS & MITIGATION

### 7.1. Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Data consistency issues** | 🔴 High | Medium | - Implement Saga pattern<br>- Use Event Sourcing<br>- Extensive testing |
| **Performance degradation** | 🟡 Medium | Medium | - Implement caching (Redis)<br>- Use async communication<br>- Load testing |
| **Network latency** | 🟡 Medium | Low | - Deploy in same region<br>- Use service mesh (Istio)<br>- Optimize payloads |
| **Service discovery failures** | 🔴 High | Low | - Use robust discovery (Consul)<br>- Implement health checks<br>- Circuit breakers |
| **Database migration failures** | 🔴 High | Medium | - Backup before each phase<br>- Rollback strategy<br>- Test migrations |

### 7.2. Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Downtime during migration** | 🔴 High | Medium | - Strangler pattern (zero downtime)<br>- Blue-green deployment<br>- Off-peak migration |
| **Feature development slowdown** | 🟡 Medium | High | - Run in parallel teams<br>- Freeze non-critical features during migration |
| **Cost increase** | 🟡 Medium | High | - Gradual migration (spread costs)<br>- Use cost-effective cloud services<br>- Monitor resource usage |
| **Team learning curve** | 🟡 Medium | Medium | - Training sessions<br>- Documentation<br>- Gradual onboarding |

### 7.3. Mitigation Strategies

#### Strategy 1: Strangler Fig Pattern
- Zero downtime
- Gradual migration
- Easy rollback

#### Strategy 2: Feature Toggles
- Enable/disable new services
- A/B testing
- Safe rollout

#### Strategy 3: Comprehensive Testing
- Unit tests (80% coverage)
- Integration tests
- E2E tests
- Load tests

#### Strategy 4: Monitoring & Alerting
- Real-time monitoring (Prometheus)
- Distributed tracing (Jaeger)
- Centralized logging (ELK)
- Alerting (PagerDuty/Opsgenie)

---

## 8. BENEFITS & TRADE-OFFS

### 8.1. Benefits of Microservices

✅ **Scalability:**
- Scale services independently
- Order Service có thể chạy 10 instances khi peak
- Product Service chỉ cần 2 instances

✅ **Maintainability:**
- Smaller codebases (~5,000 LOC mỗi service)
- Easier to understand
- Faster onboarding

✅ **Technology Flexibility:**
- Có thể dùng Python cho Analytics Service (ML/AI)
- Dùng Go cho Warehouse Service (performance)
- Mix & match theo yêu cầu

✅ **Fault Isolation:**
- Analytics Service down → Dashboard không hoạt động
- Nhưng Order Service vẫn chạy bình thường

✅ **Team Autonomy:**
- Mỗi team sở hữu 1-2 services
- Deploy độc lập
- Faster iteration

✅ **Business Agility:**
- Thêm tính năng mới nhanh hơn
- Experiment dễ dàng
- Adapt to market changes

### 8.2. Trade-offs (Disadvantages)

❌ **Increased Complexity:**
- Distributed system harder to debug
- Network calls instead of function calls
- More infrastructure to manage

❌ **Operational Overhead:**
- Cần DevOps team
- Monitoring, logging phức tạp hơn
- More services = more deployment pipelines

❌ **Data Consistency Challenges:**
- Eventual consistency thay vì strong consistency
- Distributed transactions phức tạp
- Need compensating transactions

❌ **Testing Complexity:**
- Integration testing harder
- Need contract testing
- E2E tests across services

❌ **Increased Costs:**
- More servers/containers
- More infrastructure (API Gateway, Message Bus)
- Monitoring tools

### 8.3. When to Use Microservices?

✅ **Should use if:**
- Large team (>10 developers)
- Long-term project (>2 years)
- Need to scale parts of system differently
- Multiple teams working independently
- Compliance requirements (data isolation)

❌ **Should NOT use if:**
- Small team (<5 developers)
- Short-term project
- Simple CRUD application
- Limited resources (time/money)
- Startup in MVP phase

### 8.4. Recommendation for Rausach Project

**Current State:** Monolith is FINE for now
- Team size vừa phải
- Business logic đã ổn định
- Performance acceptable

**Future (12-18 months):**
- Nếu team mở rộng → Consider microservices
- Nếu cần scale (>1000 orders/day) → Tách Order + Warehouse
- Nếu thêm nhiều features (B2B, B2C, Mobile) → Microservices

**Hybrid Approach (Recommended):**
- Giữ monolith cho core business
- Tách **IAM Service** trước (có thể reuse cho nhiều apps)
- Tách **Order Service** nếu có performance issues
- Analytics có thể tách thành separate service (less critical)

---

## 9. ALTERNATIVE: MODULAR MONOLITH

### 9.1. What is Modular Monolith?

Giữ single deployment unit, nhưng code được tổ chức theo modules rõ ràng:

```
/src
  /modules
    /iam
    /product
    /crm
    /order
    /warehouse
    /hrm
    /analytics
  /shared
  app.module.ts
```

### 9.2. Benefits

✅ Simpler deployment (1 service)  
✅ Easier development (no distributed system)  
✅ Better performance (in-memory calls)  
✅ Easier testing  
✅ Lower cost  

✅ **Still maintainable** nếu code tổ chức tốt  
✅ **Can migrate to microservices later** (modules → services)

### 9.3. Drawbacks

❌ Scale toàn bộ app (không scale riêng được)  
❌ Deploy toàn bộ (không deploy riêng modules)  
❌ Technology stack cố định  
❌ Single point of failure  

### 9.4. Recommendation

**For Rausach project NOW:**
- ✅ **Adopt Modular Monolith** approach
- Refactor code theo modules rõ ràng
- Define clear boundaries
- Use interfaces giữa modules
- Prepare for future microservices migration

**Benefits:**
- 80% of microservices benefits
- 20% of complexity
- Can migrate later khi cần

---

## 10. KẾT LUẬN & KHUYẾN NGHỊ

### 10.1. Current Assessment

**Dự án hiện tại:**
- ✅ Monolith architecture tốt
- ✅ Code quality ổn định
- ✅ Business logic đầy đủ
- ✅ Performance acceptable
- ⚠️ Code organization có thể cải thiện

**Recommendation:** **CHƯA CẦN** migrate to microservices immediately

### 10.2. Short-term Actions (3-6 months)

1. **Refactor to Modular Monolith**
   - Tổ chức code theo modules
   - Define module boundaries
   - Use dependency injection properly
   - Document module interfaces

2. **Improve Infrastructure**
   - Setup monitoring (Prometheus + Grafana)
   - Implement centralized logging
   - Add health checks
   - Improve CI/CD

3. **Prepare for Future**
   - Document API contracts (OpenAPI)
   - Identify service boundaries
   - Train team on microservices concepts

### 10.3. Mid-term Actions (6-12 months)

**If business grows:**

1. **Extract IAM Service**
   - Can reuse for multiple applications
   - Security benefits
   - Easier to implement SSO

2. **Extract Analytics Service**
   - Less critical, safe to experiment
   - Can use different tech stack (Python, Go)
   - Learn microservices patterns

### 10.4. Long-term Vision (12-24 months)

**If needed:**
- Full microservices architecture
- Follow roadmap in Section 6
- Budget: 9 months, 5-6 engineers

### 10.5. Decision Matrix

| Condition | Action |
|-----------|--------|
| Team < 5 developers | ✅ Stay monolith |
| Team 5-10 developers | ⚠️ Modular monolith |
| Team > 10 developers | ✅ Consider microservices |
| Orders < 100/day | ✅ Stay monolith |
| Orders 100-500/day | ⚠️ Monitor performance |
| Orders > 500/day | ✅ Migrate critical services |
| Adding new channels (B2B, Mobile) | ✅ Extract IAM + API Gateway |
| Need different tech stacks | ✅ Microservices |

---

## 11. APPENDIX

### 11.1. Technology Stack Recommendations

**API Gateway:**
- Kong (feature-rich, plugins)
- NGINX (lightweight, fast)
- AWS API Gateway (managed)

**Message Bus:**
- RabbitMQ (easy to setup, reliable)
- Apache Kafka (high throughput, complex)
- AWS SQS/SNS (managed)

**Service Discovery:**
- Consul (HashiCorp, feature-rich)
- Eureka (Netflix, Spring ecosystem)
- Kubernetes DNS (if using K8s)

**Monitoring:**
- Prometheus + Grafana (industry standard)
- Datadog (managed, expensive)
- New Relic (APM, expensive)

**Logging:**
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Loki + Grafana (lightweight)
- AWS CloudWatch (managed)

**Tracing:**
- Jaeger (CNCF, popular)
- Zipkin (Twitter, mature)
- AWS X-Ray (managed)

### 11.2. References

**Books:**
- "Building Microservices" - Sam Newman
- "Microservices Patterns" - Chris Richardson
- "Domain-Driven Design" - Eric Evans

**Online Resources:**
- microservices.io
- Martin Fowler's blog
- NestJS documentation

**Tools:**
- Prisma documentation
- Docker documentation
- Kubernetes documentation

---

## 12. CONTACT & NEXT STEPS

### Next Steps

1. **Review this document** với team
2. **Discuss** pros/cons của microservices
3. **Decide** direction:
   - Stay monolith?
   - Modular monolith?
   - Full microservices?
4. **Plan** accordingly
5. **Execute** step by step

### Questions to Answer

1. Có kế hoạch mở rộng team không?
2. Có kế hoạch thêm nhiều features không?
3. Performance hiện tại có đủ không?
4. Budget và timeline có cho phép không?
5. Team có sẵn sàng học microservices không?

---

**Document created by:** GitHub Copilot  
**Date:** 13/12/2025  
**Version:** 1.0  
**Status:** Ready for Review

---

**END OF DOCUMENT**
