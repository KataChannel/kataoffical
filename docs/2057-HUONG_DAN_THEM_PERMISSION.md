# Hướng dẫn thêm Permissions vào Database

## 📋 Tổng quan

Script `add-phongban-nhanvien-permissions.ts` được cập nhật với nhiều tính năng mới:

- ✅ Thêm 8 permissions (phongban + nhanvien)
- ✅ Tự động assign cho admin users
- ✅ Assign cho user cụ thể bằng ID
- ✅ Xóa permissions (rollback)
- ✅ Hiển thị thống kê chi tiết

## 🚀 Cách sử dụng

### 1️⃣ Cách 1: Tự động tìm và assign cho admin users

```bash
cd api
npx ts-node scripts/add-phongban-nhanvien-permissions.ts
```

**Script sẽ:**
- ✅ Tạo 8 permissions
- 🔍 Tìm users có tên/email chứa "admin"
- 🔗 Tự động assign permissions cho những users đó

**Output mẫu:**
```
🚀 Starting to add Phongban & Nhanvien permissions...

📝 Creating permissions...
  ✅ phongban.view - Created
  ✅ phongban.create - Created
  ...

🔍 Finding users for permission assignment...
  Found 2 user(s):
    - Admin User (admin@example.com) [ID: abc123]
    - System Admin (sysadmin@example.com) [ID: def456]

🔗 Assigning permissions...
  Processing: Admin User
    ✅ Assigned: 8 permissions
  
  Processing: System Admin
    ✅ Assigned: 8 permissions

📊 Total: 16 assigned, 0 skipped

============================================================
📊 SUMMARY
============================================================

✅ Permissions in database:
   - Phongban: 4 permissions
   - Nhanvien: 4 permissions
   - Total: 8 permissions

✅ Permission assignments:
   - Total users with access: 2 users
   - Total assignments: 16
```

---

### 2️⃣ Cách 2: Assign cho user cụ thể (by ID)

**Bước 1:** Tìm User ID của bạn

```bash
# Option A: Mở Prisma Studio
cd api
npx prisma studio
# Vào table "User", tìm ID của user bạn

# Option B: Query trực tiếp
# Trong PostgreSQL client:
SELECT id, name, email FROM "User";
```

**Bước 2:** Chạy script với `--user-id`

```bash
cd api
npx ts-node scripts/add-phongban-nhanvien-permissions.ts --user-id=<YOUR_USER_ID>
```

**Ví dụ:**
```bash
npx ts-node scripts/add-phongban-nhanvien-permissions.ts --user-id=cm123abc456def
```

**Output mẫu:**
```
🚀 Starting to add Phongban & Nhanvien permissions...

📝 Creating permissions...
  ⏭️  phongban.view - Already exists (updated description)
  ...

🔍 Finding users for permission assignment...
  ✅ Using specified user: John Doe (john@example.com)

🔗 Assigning permissions...
  Processing: John Doe
    ✅ Assigned: 8 permissions

📊 Total: 8 assigned, 0 skipped

============================================================
📊 SUMMARY
============================================================

✅ Permissions in database:
   - Phongban: 4 permissions
   - Nhanvien: 4 permissions
   - Total: 8 permissions

✅ Permission assignments:
   - Total users with access: 1 users
   - Total assignments: 8
```

---

### 3️⃣ Cách 3: Xóa tất cả permissions (Rollback)

```bash
cd api
npx ts-node scripts/add-phongban-nhanvien-permissions.ts --remove
```

**Script sẽ:**
- 🗑️ Xóa tất cả UserPermission assignments
- 🗑️ Xóa tất cả Permission records

**⚠️ Cảnh báo:** Không thể undo! Chỉ dùng khi cần làm sạch database.

**Output mẫu:**
```
🗑️  Removing Phongban & Nhanvien permissions...

📝 Removing user permission assignments...
  ✅ Removed 16 user permission assignments

📝 Removing permissions...
  ✅ Removed 8 permissions

✅ Done! All Phongban & Nhanvien permissions have been removed.
```

---

## 🎯 Các tình huống sử dụng

### Tình huống 1: Không tìm thấy admin users

```
🔍 Finding users for permission assignment...
  ⚠️  No users found for automatic assignment.

📋 Available assignment methods:
  1. UI: http://localhost:4301/admin/user-permission
  2. CLI: npx ts-node scripts/add-phongban-nhanvien-permissions.ts --user-id=<YOUR_USER_ID>
```

**Giải pháp:**
- **Option A:** Dùng UI để assign (Cách 4 bên dưới)
- **Option B:** Dùng `--user-id` flag (Cách 2 trên đây)
- **Option C:** Dùng SQL trực tiếp (Cách 5 bên dưới)

---

### Tình huống 2: Permissions đã tồn tại

```
📝 Creating permissions...
  ⏭️  phongban.view - Already exists (updated description)
  ⏭️  phongban.create - Already exists (updated description)
```

**Kết quả:** Script sẽ cập nhật description và tiếp tục assign

---

### Tình huống 3: User đã có permissions

```
🔗 Assigning permissions...
  Processing: Admin User
    ⏭️  Skipped: 8 (already assigned)
```

**Kết quả:** Script sẽ bỏ qua (không tạo duplicate)

---

## 4️⃣ Cách 4: Assign qua giao diện UI

**Bước 1:** Truy cập User Permission Management

```
http://localhost:4301/admin/user-permission
```

**Bước 2:** Tìm user cần cấp quyền

**Bước 3:** Click "Edit Permissions"

**Bước 4:** Chọn các permissions:
- ✅ phongban.view
- ✅ phongban.create
- ✅ phongban.edit
- ✅ phongban.delete
- ✅ nhanvien.view
- ✅ nhanvien.create
- ✅ nhanvien.edit
- ✅ nhanvien.delete

**Bước 5:** Click "Save"

---

## 5️⃣ Cách 5: Assign bằng SQL (Manual)

**Bước 1:** Tìm Permission IDs

```sql
SELECT id, name, description 
FROM "Permission" 
WHERE name LIKE 'phongban.%' OR name LIKE 'nhanvien.%';
```

**Bước 2:** Tìm User ID của bạn

```sql
SELECT id, name, email FROM "User";
```

**Bước 3:** Insert vào UserPermission table

```sql
-- Thay <USER_ID> bằng ID thực tế của bạn
-- Thay <PERMISSION_ID> bằng ID của từng permission

INSERT INTO "UserPermission" ("userId", "permissionId", "createdAt", "updatedAt")
VALUES 
  ('<USER_ID>', (SELECT id FROM "Permission" WHERE name = 'phongban.view'), NOW(), NOW()),
  ('<USER_ID>', (SELECT id FROM "Permission" WHERE name = 'phongban.create'), NOW(), NOW()),
  ('<USER_ID>', (SELECT id FROM "Permission" WHERE name = 'phongban.edit'), NOW(), NOW()),
  ('<USER_ID>', (SELECT id FROM "Permission" WHERE name = 'phongban.delete'), NOW(), NOW()),
  ('<USER_ID>', (SELECT id FROM "Permission" WHERE name = 'nhanvien.view'), NOW(), NOW()),
  ('<USER_ID>', (SELECT id FROM "Permission" WHERE name = 'nhanvien.create'), NOW(), NOW()),
  ('<USER_ID>', (SELECT id FROM "Permission" WHERE name = 'nhanvien.edit'), NOW(), NOW()),
  ('<USER_ID>', (SELECT id FROM "Permission" WHERE name = 'nhanvien.delete'), NOW(), NOW())
ON CONFLICT DO NOTHING;
```

**Hoặc dùng script SQL có sẵn:**

```bash
# File: api/sql/add-phongban-nhanvien-permissions.sql
# Edit file này, thay <USER_ID> bằng ID thực tế
# Sau đó chạy:
psql -h 116.118.49.243 -p 55432 -U your_user -d your_database -f api/sql/add-phongban-nhanvien-permissions.sql
```

---

## 🔧 Troubleshooting

### Lỗi 1: Cannot find name 'main'

**Nguyên nhân:** TypeScript compile error

**Giải pháp:** Script đã được fix, pull code mới nhất

---

### Lỗi 2: Cannot find module '@prisma/client'

**Nguyên nhân:** Dependencies chưa cài

**Giải pháp:**
```bash
cd api
npm install
# hoặc
bun install
```

---

### Lỗi 3: Connection timeout

**Nguyên nhân:** Không kết nối được database

**Giải pháp:** Kiểm tra `.env` file:
```env
DATABASE_URL="postgresql://user:password@116.118.49.243:55432/database?schema=public"
```

---

## ✅ Kiểm tra kết quả

### Cách 1: Query trực tiếp

```sql
-- Xem tất cả permissions
SELECT * FROM "Permission" 
WHERE name LIKE 'phongban.%' OR name LIKE 'nhanvien.%';

-- Xem user nào có permissions
SELECT 
  u.name AS user_name,
  u.email,
  p.name AS permission_name,
  p.description
FROM "UserPermission" up
JOIN "User" u ON up."userId" = u.id
JOIN "Permission" p ON up."permissionId" = p.id
WHERE p.name LIKE 'phongban.%' OR p.name LIKE 'nhanvien.%'
ORDER BY u.name, p.name;
```

---

### Cách 2: Test truy cập

**Bước 1:** Đảm bảo frontend đang chạy
```bash
cd frontend
bun dev
# Mở http://localhost:4301
```

**Bước 2:** Login với user đã được cấp quyền

**Bước 3:** Truy cập URLs:
- http://localhost:4301/admin/phongban/list
- http://localhost:4301/admin/nhanvien/list

**Bước 4:** Nếu vẫn báo "no access":
- Kiểm tra PermissionGuard có đang enabled không
- Xem file: `frontend/src/app/app.routes.ts`
- Nếu thấy comment `// canActivate: [PermissionGuard]` → Uncomment để enable

---

## 📊 Permissions được tạo

| Permission Name | Description | Module |
|----------------|-------------|--------|
| phongban.view | Xem danh sách phòng ban | Phongban |
| phongban.create | Tạo phòng ban mới | Phongban |
| phongban.edit | Chỉnh sửa phòng ban | Phongban |
| phongban.delete | Xóa phòng ban | Phongban |
| nhanvien.view | Xem danh sách nhân viên | Nhanvien |
| nhanvien.create | Tạo nhân viên mới | Nhanvien |
| nhanvien.edit | Chỉnh sửa nhân viên | Nhanvien |
| nhanvien.delete | Xóa nhân viên | Nhanvien |

---

## 🔐 Bước cuối: Bật lại PermissionGuard

Sau khi đã assign permissions cho user, bật lại guard để bảo mật:

**File:** `frontend/src/app/app.routes.ts`

```typescript
{
  path: 'phongban',
  canActivate: [PermissionGuard],  // ✅ Uncomment dòng này
  data: { permission: 'phongban.view' },
  loadChildren: () => import('./admin/phongban/phongban.route').then(m => m.phongbanRoutes)
},
{
  path: 'nhanvien',
  canActivate: [PermissionGuard],  // ✅ Uncomment dòng này
  data: { permission: 'nhanvien.view' },
  loadChildren: () => import('./admin/nhanvien/nhanvien.route').then(m => m.nhanvienRoutes)
}
```

---

## 📝 Tóm tắt các cách thêm permissions

| Cách | Lệnh/Hành động | Ưu điểm | Nhược điểm |
|------|----------------|---------|------------|
| **1. Auto-assign** | `npx ts-node scripts/...` | Nhanh, tự động | Cần có user "admin" |
| **2. By User ID** | `npx ts-node scripts/... --user-id=<ID>` | Chính xác, linh hoạt | Cần biết User ID |
| **3. Rollback** | `npx ts-node scripts/... --remove` | Làm sạch database | Không undo được |
| **4. UI** | http://localhost:4301/admin/user-permission | Trực quan, dễ dùng | Cần login admin |
| **5. SQL** | `INSERT INTO "UserPermission"...` | Kiểm soát tối đa | Phức tạp, dễ lỗi |

---

## 💡 Khuyến nghị

**Môi trường Development:**
- ✅ Dùng Cách 1 hoặc 2 (Script)
- ✅ Tạm tắt PermissionGuard khi dev
- ✅ Bật lại guard khi cần test authorization

**Môi trường Production:**
- ✅ Dùng Cách 4 (UI) để quản lý
- ✅ Luôn bật PermissionGuard
- ✅ Assign permissions theo vai trò cụ thể

---

## 🎓 Mở rộng

### Thêm permissions mới cho module khác

**Bước 1:** Edit file `add-phongban-nhanvien-permissions.ts`

```typescript
const PERMISSIONS = [
  // ... existing permissions
  
  // New module permissions
  { name: 'kho.view', description: 'Xem kho', module: 'kho' },
  { name: 'kho.create', description: 'Tạo kho mới', module: 'kho' },
  // ...
];
```

**Bước 2:** Update filter queries
```typescript
// In removePermissions()
where: {
  OR: [
    { name: { startsWith: 'phongban.' } },
    { name: { startsWith: 'nhanvien.' } },
    { name: { startsWith: 'kho.' } },  // ← Add this
  ]
}
```

**Bước 3:** Run script
```bash
npx ts-node scripts/add-phongban-nhanvien-permissions.ts
```

---

## 📚 Tài liệu liên quan

- [2056-HUONG_DAN_TRUY_CAP_PHONGBAN_NHANVIEN.md](./2056-HUONG_DAN_TRUY_CAP_PHONGBAN_NHANVIEN.md) - Hướng dẫn truy cập
- [app.routes.ts](../frontend/src/app/app.routes.ts) - Route configuration
- [add-phongban-nhanvien-permissions.ts](../api/scripts/add-phongban-nhanvien-permissions.ts) - Permission script
- [add-phongban-nhanvien-permissions.sql](../api/sql/add-phongban-nhanvien-permissions.sql) - SQL alternative

---

**Ngày tạo:** November 18, 2025  
**Tác giả:** GitHub Copilot  
**Version:** 2.0 (Enhanced with multiple assignment methods)
