# Rausach Full Stack Application

## 📁 Project Structure

```
rausachfullstack/
├── 🎯 CORE APPLICATION
│   ├── api/                    # Backend NestJS API
│   │   ├── src/               # Source code
│   │   ├── prisma/            # Database schema & migrations
│   │   ├── test/              # Unit & integration tests
│   │   └── dist/              # Compiled output
│   ├── frontend/              # Angular Frontend
│   │   ├── src/               # Source code
│   │   ├── public/            # Static assets
│   │   └── dist/              # Built application
│   ├── beshop/               # Backend shop module
│   └── feshop/               # Frontend shop module
│
├── 📋 CONFIGURATION & SCRIPTS
│   ├── scripts/              # Organized utility scripts
│   │   ├── deploy.sh         # Deployment script
│   │   ├── backup.sh         # Database backup
│   │   └── README.md         # Scripts documentation
│   ├── docker-compose.yml    # Docker configuration
│   ├── package.json          # Root dependencies & scripts
│   ├── run.sh               # Main application runner
│   └── .gitignore           # Git exclusions
│
├── 📚 DOCUMENTATION & DATA
│   ├── docs/                # Project documentation
│   ├── dulieu/              # Data files
│   ├── snippetcode/         # Code snippets
│   └── README.md            # This file
│
├── 🗄️ STORAGE & LOCAL
│   ├── notupload/           # Local files (gitignored)
│   ├── proxy                # Proxy configuration
│   └── storage.rausachtrangia.com/  # Storage directory
│
└── 📦 ARCHIVE (HISTORICAL)
    ├── documentation/       # Historical markdown docs
    ├── test-scripts/        # Old test files
    ├── fixes/              # Fix scripts & patches
    ├── html-demos/         # Demo files
    ├── api-temp/           # Archived API files
    └── frontend-temp/      # Archived frontend files
```

## 🚀 Quick Start

### Development
```bash
# Start the application
./run.sh

# Or manually start each service
cd api && npm run start:dev
cd frontend && ng serve
```

### Production
```bash
# Build and deploy
docker-compose up -d
```

## 📋 Main Components

### Backend (api/)
- **NestJS** API server
- **Prisma** ORM with PostgreSQL
- **GraphQL** universal service
- **JWT** authentication
- **Audit logging**

### Frontend (frontend/)
- **Angular** application
- **Angular Material** UI components
- **Signal-based** reactive state
- **Lazy loading** modules

### Key Features
- **Inventory Management** (Chotkho system)
- **Order Processing** (Donhang/Dathang workflow)
- **Warehouse Operations** (Phieukho management)
- **Real-time Dashboard**
- **Excel Import/Export**

## 🛠️ Recent Updates

- ✅ Complete 2-step chotkho workflow implementation
- ✅ Outstanding order processing automation
- ✅ Inventory adjustment with phieukho creation
- ✅ TonKho synchronization system
- ✅ Backend API enhancements
- ✅ Project structure cleanup and organization

## 📚 Documentation

Historical documentation and implementation notes can be found in `archive/documentation/`.

## 🧪 Testing

Test scripts and debugging tools are located in `archive/test-scripts/`.

---

*Last updated: October 2025*

## 📋 Quy trình Ứng dụng

### 1. Đơn Hàng (Donhang)

| Hành động | Frontend Function | Frontend File | Backend Function | Backend File |
|-----------|------------------|---------------|------------------|--------------|
| **Import** | `ImportDonhang()` | `listdonhang.component.ts` | `ImportDonhang()` | `donhang.controller.ts` |
| **Import Old** | `ImportDonhangOld()` | `listdonhang.component.ts` | `ImportDonhangOld()` | `donhang.controller.ts` |
| **Create** | `CreateDonhang()` | `donhang-graphql.service.ts` | `create()` | `donhang.controller.ts` |
| **Update** | `updateDonhang()` | `donhang-graphql.service.ts` | `updateOne()` | GraphQL Universal |
| **Delete** | `DeleteDonhang()` | `listdonhang.component.ts` | `remove()` | `donhang.controller.ts` |
| **Search** | `searchDonhang()` | `donhang-graphql.service.ts` | `search()` | `donhang.controller.ts` |
| **Export Excel** | `DoExportExcel()` | `listdonhang.component.ts` | - | Client-side |
| **Cancel Order** | `cancelDonhang()` | `donhang-graphql.service.ts` | `cancelDonhang()` | `donhang.controller.ts` |
| **Get All** | `getAllDonhang()` | `donhang-graphql.service.ts` | `findMany()` | GraphQL Universal |
| **Get by ID** | `getDonhangById()` | `donhang-graphql.service.ts` | `findOne()` | GraphQL Universal |

### 2. Phiếu Giao Hàng (PhieuGiaohang)

| Hành động | Frontend Function | Frontend File | Backend Function | Backend File |
|-----------|------------------|---------------|------------------|--------------|
| **Create** | `CreatePhieugiaohang()` | `phieugiaohang.component.ts` | Từ Donhang | Auto-generated |
| **Update** | `updatePhieugiaohang()` | `phieugiaohang.component.ts` | `updateOne()` | GraphQL Universal |
| **Delete** | `DeletePhieugiaohang()` | `listphieugiaohang.component.ts` | `delete()` | Via Donhang |
| **Export Excel** | `DoExportExcel()` | `listphieugiaohang.component.ts` | - | Client-side |
| **Print** | `DoPrint()` | `listphieugiaohang.component.ts` | - | Client-side |
| **Get All** | `getAllPhieugiaohang()` | `phieugiaohang.component.ts` | `findMany()` | GraphQL Universal |
| **Filter by Date** | `filterByDate()` | `listphieugiaohang.component.ts` | `search()` | Via Donhang |

### 3. Đặt Hàng NCC (Dathang)

| Hành động | Frontend Function | Frontend File | Backend Function | Backend File |
|-----------|------------------|---------------|------------------|--------------|
| **Import** | `ImportDathang()` | `listdathang.component.ts` | `ImportDathang()` | `dathang.controller.ts` |
| **Create** | `CreateDathang()` | `dathang.service.ts` | `create()` | `dathang.controller.ts` |
| **Update** | `updateDathang()` | `dathang.service.ts` | `update()` | `dathang.controller.ts` |
| **Delete** | `DeleteDathang()` | `listdathang.component.ts` | `remove()` | `dathang.controller.ts` |
| **Export Excel** | `DoExportExcel()` | `listdathang.component.ts` | - | Client-side |
| **Nhu cầu đặt hàng** | `nhucauDathang()` | `nhucaudathang.component.ts` | `nhucauDathang()` | `dathang.controller.ts` |
| **Confirm** | `confirmDathang()` | `dathang.service.ts` | `confirm()` | `dathang.controller.ts` |
| **Get All** | `getAllDathang()` | `dathang.service.ts` | `findAll()` | `dathang.controller.ts` |

### 4. Phiếu Kho (Phieukho)

| Hành động | Frontend Function | Frontend File | Backend Function | Backend File |
|-----------|------------------|---------------|------------------|--------------|
| **Create** | `CreatePhieukho()` | `phieukho.service.ts` | `create()` | `phieukho.controller.ts` |
| **Update** | `updatePhieukho()` | `phieukho.service.ts` | `update()` | `phieukho.controller.ts` |
| **Delete** | `DeletePhieukho()` | `listphieukho.component.ts` | `remove()` | `phieukho.controller.ts` |
| **Xuất nhập tồn** | `xuatnhapton()` | `xuatnhapton.component.ts` | `xuatnhapton()` | `phieukho.controller.ts` |
| **Adjustment** | `createAdjustment()` | `phieukho.service.ts` | `createAdjustment()` | `phieukho.controller.ts` |
| **Get All** | `getAllPhieukho()` | `phieukho.service.ts` | `findAll()` | `phieukho.controller.ts` |
| **Get by ID** | `getPhieukhoById()` | `phieukho.service.ts` | `findOne()` | `phieukho.controller.ts` |

### 5. Sản Phẩm (Sanpham)

| Hành động | Frontend Function | Frontend File | Backend Function | Backend File |
|-----------|------------------|---------------|------------------|--------------|
| **Import** | `ImportSanpham()` | `listsanpham.component.ts` | `ImportSanpham()` | `sanpham.controller.ts` |
| **Create** | `CreateSanpham()` | `sanpham.service.ts` | `create()` | `sanpham.controller.ts` |
| **Update** | `updateSanpham()` | `sanpham.service.ts` | `update()` | `sanpham.controller.ts` |
| **Delete** | `DeleteSanpham()` | `listsanpham.component.ts` | `remove()` | `sanpham.controller.ts` |
| **Export Excel** | `DoExportExcel()` | `listsanpham.component.ts` | - | Client-side |
| **Get All** | `getAllSanpham()` | `sanpham.service.ts` | `findAll()` | `sanpham.controller.ts` |
| **Search** | `searchSanpham()` | `sanpham.service.ts` | `search()` | `sanpham.controller.ts` |

### 6. Khách Hàng (Khachhang)

| Hành động | Frontend Function | Frontend File | Backend Function | Backend File |
|-----------|------------------|---------------|------------------|--------------|
| **Import** | `ImportKhachhang()` | `listkhachhang.component.ts` | `ImportKhachhang()` | `khachhang.controller.ts` |
| **Create** | `CreateKhachhang()` | `khachhang.service.ts` | `create()` | `khachhang.controller.ts` |
| **Update** | `updateKhachhang()` | `khachhang.service.ts` | `update()` | `khachhang.controller.ts` |
| **Delete** | `DeleteKhachhang()` | `listkhachhang.component.ts` | `remove()` | `khachhang.controller.ts` |
| **Export Excel** | `DoExportExcel()` | `listkhachhang.component.ts` | - | Client-side |
| **Get All** | `getAllKhachhang()` | `khachhang.service.ts` | `findAll()` | `khachhang.controller.ts` |
| **Công nợ** | `getCongno()` | `listcongnokhachhang.component.ts` | `congnokhachhang()` | `donhang.controller.ts` |

### 7. Nhà Cung Cấp (Nhacungcap)

| Hành động | Frontend Function | Frontend File | Backend Function | Backend File |
|-----------|------------------|---------------|------------------|--------------|
| **Import** | `ImportNhacungcap()` | `listnhacungcap.component.ts` | `ImportNhacungcap()` | `nhacungcap.controller.ts` |
| **Create** | `CreateNhacungcap()` | `nhacungcap.service.ts` | `create()` | `nhacungcap.controller.ts` |
| **Update** | `updateNhacungcap()` | `nhacungcap.service.ts` | `update()` | `nhacungcap.controller.ts` |
| **Delete** | `DeleteNhacungcap()` | `listnhacungcap.component.ts` | `remove()` | `nhacungcap.controller.ts` |
| **Get All** | `getAllNhacungcap()` | `nhacungcap.service.ts` | `findAll()` | `nhacungcap.controller.ts` |

### 8. Bảng Giá (Banggia)

| Hành động | Frontend Function | Frontend File | Backend Function | Backend File |
|-----------|------------------|---------------|------------------|--------------|
| **Import** | `ImportBanggia()` | `listbanggia.component.ts` | Via GraphQL | `enhanced-universal.service.ts` |
| **Create** | `CreateBanggia()` | `banggia-graphql.service.ts` | `createOne()` | GraphQL Universal |
| **Update** | `updateBanggia()` | `banggia-graphql.service.ts` | `updateOne()` | GraphQL Universal |
| **Delete** | `DeleteBanggia()` | `listbanggia.component.ts` | `deleteOne()` | GraphQL Universal |
| **Export Excel** | `DoExportExcel()` | `listbanggia.component.ts` | - | Client-side |
| **Get All** | `getAllBanggia()` | `banggia-graphql.service.ts` | `findMany()` | GraphQL Universal |
| **Check Exists** | `checkBanggiaExists()` | `banggia-graphql.service.ts` | `findMany()` | GraphQL Universal |

### 9. Chốt Kho (Chotkho)

| Hành động | Frontend Function | Frontend File | Backend Function | Backend File |
|-----------|------------------|---------------|------------------|--------------|
| **Create** | `CreateChotkho()` | `chotkho.service.ts` | `create()` | `chotkho.controller.ts` |
| **Update** | `updateChotkho()` | `chotkho.service.ts` | `update()` | `chotkho.controller.ts` |
| **Delete** | `DeleteChotkho()` | `listchotkho.component.ts` | `remove()` | `chotkho.controller.ts` |
| **Process** | `processChotkho()` | `chotkho.service.ts` | `processChotkho()` | `chotkho.controller.ts` |
| **Get Outstanding** | `getOutstanding()` | `chotkho.service.ts` | `getOutstanding()` | `chotkho.controller.ts` |
| **Get All** | `getAllChotkho()` | `chotkho.service.ts` | `findAll()` | `chotkho.controller.ts` |

### 10. Tồn Kho (Tonkho)

| Hành động | Frontend Function | Frontend File | Backend Function | Backend File |
|-----------|------------------|---------------|------------------|--------------|
| **Sync** | `syncTonkho()` | `tonkho.service.ts` | `syncTonkho()` | `tonkho.controller.ts` |
| **Get All** | `getAllTonkho()` | `tonkho.service.ts` | `findAll()` | `tonkho.controller.ts` |
| **Get by Sanpham** | `getTonkhoBySanpham()` | `tonkho.service.ts` | `findBySanpham()` | `tonkho.controller.ts` |
| **Update** | `updateTonkho()` | `tonkho.service.ts` | `update()` | `tonkho.controller.ts` |

### 11. User & Permissions

| Hành động | Frontend Function | Frontend File | Backend Function | Backend File |
|-----------|------------------|---------------|------------------|--------------|
| **Create User** | `CreateUser()` | `user.service.ts` | `create()` | `user.controller.ts` |
| **Update User** | `updateUser()` | `user.service.ts` | `update()` | `user.controller.ts` |
| **Delete User** | `DeleteUser()` | `listuser.component.ts` | `remove()` | `user.controller.ts` |
| **Assign Role** | `assignRole()` | `user.service.ts` | `assignRole()` | `user.controller.ts` |
| **Assign Permission** | `assignPermission()` | `user-permission.service.ts` | `assignPermission()` | `user-permission.controller.ts` |
| **Get All Users** | `getAllUsers()` | `user.service.ts` | `findAll()` | `user.controller.ts` |

### 12. Support Ticket System

| Hành động | Frontend Function | Frontend File | Backend Function | Backend File |
|-----------|------------------|---------------|------------------|--------------|
| **Create Ticket** | `createTicket()` | `support.service.ts` | `createTicket()` | GraphQL Resolver |
| **Update Ticket** | `updateTicket()` | `support.service.ts` | `updateTicket()` | GraphQL Resolver |
| **Add Response** | `addResponse()` | `support.service.ts` | `addResponse()` | GraphQL Resolver |
| **Upload Attachment** | `uploadAttachment()` | `support.service.ts` | `uploadFile()` | `support-upload.controller.ts` |
| **Get All Tickets** | `getAllTickets()` | `support.service.ts` | `tickets()` | GraphQL Resolver |
| **Assign Technician** | `assignTechnician()` | `support.service.ts` | `updateTicket()` | GraphQL Resolver |

### 13. Import Data System

| Hành động | Frontend Function | Frontend File | Backend Function | Backend File |
|-----------|------------------|---------------|------------------|--------------|
| **Import Generic** | `ImportData()` | `listimportdata.component.ts` | `create()` | `importdata.controller.ts` |
| **Get History** | `getImportHistory()` | `listimportdata.component.ts` | `findAll()` | `importdata.controller.ts` |
| **Delete Import** | `DeleteImport()` | `listimportdata.component.ts` | `remove()` | `importdata.controller.ts` |

## 🧪 Testing Dashboard

### Automated Testing Component

**Route:** `/admin/testing`

**Purpose:** Comprehensive testing dashboard để kiểm tra tất cả 13 modules khi có thay đổi code.

**Files:**
- `frontend/src/app/admin/testing/testing.component.ts` (604 lines)
- `frontend/src/app/admin/testing/testing.component.html`
- `frontend/src/app/admin/testing/testing.component.scss`

**Features:**
- ✅ **13 Module Test Suites** với 61+ test cases
- ✅ **Real-time Progress Tracking** với progress bar
- ✅ **Statistics Dashboard** (Total, Completed, Success, Failed)
- ✅ **Status Indicators** (Pending, Running, Success, Failed)
- ✅ **Error Reporting** với error messages
- ✅ **Module-level Execution** - Run tests by module
- ✅ **Full Suite Execution** - Run all tests at once
- ✅ **Signal-based Architecture** - OnPush change detection

**Test Coverage:**
1. Đơn Hàng (8 tests) - CRUD + Search + Export + Cancel
2. Phiếu Giao Hàng (3 tests) - CRUD operations
3. Đặt Hàng NCC (6 tests) - CRUD + Approval + Nhu cầu
4. Phiếu Kho (7 tests) - CRUD + Excel + Xuất nhập tồn
5. Sản Phẩm (6 tests) - CRUD + Import + Search
6. Khách Hàng (5 tests) - CRUD + Import + Công nợ
7. Nhà Cung Cấp (4 tests) - CRUD + Import
8. Bảng Giá (5 tests) - CRUD + Import + Check Exists
9. Chốt Kho (4 tests) - CRUD + Process
10. Tồn Kho (3 tests) - View + Search + Sync
11. User & Permissions (5 tests) - User/Role management
12. Support Tickets (3 tests) - CRUD operations
13. Import Data (2 tests) - Import + History

**Usage:**
```bash
# Navigate to testing dashboard
http://localhost:4200/admin/testing

# Actions:
- Click "Run All Tests" để test toàn bộ system
- Expand module và click "Run Module Tests" để test riêng
- Click "Reset All" để clear results
```

**Documentation:** See `TESTING_COMPONENT_COMPLETE.md` for detailed implementation guide.

## 🔄 GraphQL Universal Service

Nhiều operations sử dụng **GraphQL Universal Service** thay vì REST endpoints:

- **Enhanced Universal Resolver**: `/api/src/graphql/enhanced-universal.resolver.ts`
- **Enhanced Universal Service**: `/api/src/graphql/enhanced-universal.service.ts`

**Supported Operations:**
- `findMany()` - Get list with pagination
- `findOne()` - Get single record
- `createOne()` - Create new record
- `updateOne()` - Update existing record
- `deleteOne()` - Delete record

**Models hỗ trợ:**
- Banggia, Sanpham, Khachhang, Nhacungcap
- Donhang, Dathang, Phieukho
- User, Role, Permission
- Support Tickets
- và các models khác...

## 📊 Data Flow Pattern

```
Frontend Component
    ↓ (gọi method)
Frontend Service (*.service.ts)
    ↓ (HTTP/GraphQL request)
Backend Controller (*.controller.ts)
    ↓ (business logic)
Backend Service (*.service.ts)
    ↓ (database operations)
Prisma ORM
    ↓
PostgreSQL Database
```

## 🔐 Security & Caching

- **Authentication**: JWT với `JwtAuthGuard`
- **Audit Logging**: `@Audit()` decorator tự động log các actions
- **Caching**: Redis cache với `@Cache()` và `@SmartCache()` decorators
- **Cache Invalidation**: `@CacheInvalidate()` tự động xóa cache khi update

## 📝 Notes

- Frontend sử dụng **Angular Signals** cho reactive state management
- Backend sử dụng **NestJS** với **Prisma ORM**
- **GraphQL** được ưu tiên cho các operations mới
- **Excel Import/Export** được xử lý client-side với `xlsx` library
- **Real-time updates** qua WebSocket cho một số features

---






