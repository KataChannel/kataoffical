# 🔐 Test Permission and Add to All Roles Script

## 📋 Mô Tả

Script này cho phép bạn:
1. **Tạo permission mới** với thông tin do user nhập
2. **Tự động thêm permission** vào tất cả các role có trong database  
3. **Xác minh việc tạo** và gán permission

## 🚀 Cách Sử Dụng

### 1. **Chạy Script**
```bash
# Từ thư mục gốc của project
node test-permission-and-add-all-role.js

# Hoặc
./test-permission-and-add-all-role.js
```

### 2. **Nhập Thông Tin Permission**

Script sẽ yêu cầu bạn nhập:

```
📝 Enter permission name: [TÊN PERMISSION]
📄 Enter permission description (optional): [MÔ TẢ]  
🏷️  Enter permission group (optional, default: "custom"): [NHÓM]
```

**Ví dụ:**
```
📝 Enter permission name: manage_inventory
📄 Enter permission description (optional): Permission to manage inventory items
🏷️  Enter permission group (optional, default: "custom"): inventory
```

### 3. **Kết Quả**

Script sẽ:
- ✅ Tạo permission với `codeId` tự động
- ✅ Tìm tất cả role active trong database
- ✅ Thêm permission vào từng role
- ✅ Hiển thị báo cáo tổng hợp

## 📊 Output Mẫu

```bash
🚀 PERMISSION CREATION AND ROLE ASSIGNMENT SCRIPT
=================================================

🔐 CREATE NEW PERMISSION
============================
📝 Enter permission name: test_feature
📄 Enter permission description (optional): Test new feature permission
🏷️  Enter permission group (optional, default: "custom"): testing

🔨 Creating permission...
✅ Permission created successfully!
   - ID: 12345678-1234-1234-1234-123456789abc
   - Name: test_feature
   - CodeId: test_feature
   - Description: Test new feature permission
   - Group: testing

🔍 Fetching all existing roles...
✅ Found 3 active roles:
   1. Admin (25 permissions)
   2. Manager (15 permissions)
   3. User (8 permissions)

🔗 Adding permission to all roles...
   ✅ Added to role: Admin
   ✅ Added to role: Manager
   ✅ Added to role: User

🔍 Verifying permission assignments...
✅ Permission "test_feature" is assigned to 3 roles:
   1. Admin (Granted)
   2. Manager (Granted)
   3. User (Granted)

📊 OPERATION SUMMARY
==================
✅ Permission "test_feature" created successfully
✅ Successfully added to 3 roles

🎉 Script completed successfully!
```

## 🔧 Tính Năng

### **1. Tạo Permission Thông Minh**
- **Unique Name**: Tự động tạo tên unique nếu bị trùng
- **Auto CodeId**: Tự động generate codeId từ tên
- **Validation**: Kiểm tra input hợp lệ

### **2. Xử Lý Conflict**
```javascript
// Nếu permission "test_feature" đã tồn tại
// Script sẽ tạo "test_feature_1", "test_feature_2", v.v.
```

### **3. Batch Assignment**
- Thêm permission vào **tất cả role active**
- Skip nếu permission đã tồn tại cho role
- Báo cáo chi tiết success/failure

### **4. Error Handling**
- ✅ Graceful error handling
- ✅ Rollback khi có lỗi
- ✅ Chi tiết lỗi cho từng role

## 📋 Database Schema

Script hoạt động với các bảng:

### **Permission**
```prisma
model Permission {
  id          String  @id @default(cuid())
  name        String  @unique
  codeId      String  @unique
  description String?
  group       String?
  isActive    Boolean @default(true)
  // ... other fields
}
```

### **RolePermission**
```prisma
model RolePermission {
  id           String     @id @default(cuid())
  roleId       String
  permissionId String
  isGranted    Boolean    @default(true)
  grantedBy    String?
  createdAt    DateTime   @default(now())
  // ... other fields
}
```

## ⚠️ Lưu Ý Quan Trọng

### **1. Database Connection**
- Đảm bảo database đang chạy
- Kiểm tra connection string trong `.env`
- Có quyền truy cập bảng `Permission` và `RolePermission`

### **2. Backup Dữ Liệu**
```bash
# Nên backup trước khi chạy script
pg_dump -h localhost -U username -d database_name > backup.sql
```

### **3. Testing Environment**
- **Khuyến nghị** chạy trên môi trường test trước
- **Không chạy** trực tiếp trên production mà chưa test

### **4. Cleanup**
```javascript
// Để xóa permission được tạo (nếu cần)
// DELETE FROM "RolePermission" WHERE "permissionId" = 'permission_id';
// DELETE FROM "Permission" WHERE "id" = 'permission_id';
```

## 🧪 Test Cases

### **Test Case 1: Normal Flow**
```bash
Input: name="read_reports", description="Read reports", group="reports"
Expected: Permission created and added to all roles
```

### **Test Case 2: Duplicate Name**  
```bash
Input: name="existing_permission"
Expected: Creates "existing_permission_1" instead
```

### **Test Case 3: No Roles**
```bash
Scenario: Database has no active roles
Expected: Permission created but warning shown
```

### **Test Case 4: Partial Failure**
```bash
Scenario: Some roles fail to get permission
Expected: Success for valid roles, error details for failed ones
```

## 🔍 Troubleshooting

### **Lỗi Database Connection**
```bash
Error: Can't reach database server
Solution: Check database is running and .env configuration
```

### **Lỗi Permission Creation**
```bash
Error: Unique constraint violation
Solution: Script handles this automatically with unique names
```

### **Lỗi Role Assignment**
```bash
Error: Foreign key constraint
Solution: Check if roles exist and are active
```

## 📁 Files Related

- `test-permission-and-add-all-role.js` - Main script
- `prisma/schema.prisma` - Database schema
- `.env` - Database configuration
- `package.json` - Dependencies

## 🎯 Use Cases

1. **Development**: Tạo permission mới cho tính năng đang phát triển
2. **Testing**: Tạo permission test với quyền truy cập đầy đủ
3. **Migration**: Thêm permission cho tất cả role hiện có
4. **Setup**: Khởi tạo permission cho môi trường mới

---

**Tạo bởi**: Permission Management System  
**Cập nhật**: September 30, 2025