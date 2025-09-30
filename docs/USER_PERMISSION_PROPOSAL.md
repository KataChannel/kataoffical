# 🚀 PHƯƠNG ÁN ĐỀ XUẤT CHO USER-SPECIFIC PERMISSIONS

## Phân tích hiện trạng dự án:

### Cấu trúc hiện tại:
```
User ──> UserRole ──> Role ──> RolePermission ──> Permission
```

### Vấn đề: 
- User được gán role, role có permissions cố định
- **KHÔNG thể** thêm permission đặc biệt cho user cụ thể trong cùng role
- **KHÔNG có** bảng `UserPermission` để gán trực tiếp

---

## 🎯 PHƯƠNG ÁN 1: THÊM BẢNG UserPermission (KHUYẾN NGHỊ)

### ✅ Ưu điểm:
- **Linh hoạt cao**: User có thể có permission bổ sung/loại trừ
- **Tách biệt logic**: Không ảnh hưởng role system hiện tại  
- **Audit trail**: Theo dõi ai cấp quyền, khi nào, lý do gì
- **Tạm thời**: Có thể set thời hạn cho permission

### Schema Changes:

#### Thêm model UserPermission:
```prisma
model UserPermission {
  id           String     @id @default(uuid())
  userId       String
  permissionId String
  isGranted    Boolean    @default(true)  // true = granted, false = denied
  grantedBy    String?    // User ID của người cấp quyền
  grantedAt    DateTime   @default(now())
  expiresAt    DateTime?  // Có thể set thời hạn cho permission
  reason       String?    // Lý do cấp/thu hồi quyền
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  
  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  permission   Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)
  
  @@unique([userId, permissionId])
  @@index([userId])
  @@index([permissionId])
}
```

#### Cập nhật models khác:
```prisma
model User {
  // ... existing fields ...
  roles            UserRole[]
  userPermissions  UserPermission[]  // NEW
}

model Permission {
  // ... existing fields ...  
  roles            RolePermission[]
  userPermissions  UserPermission[]  // NEW
}
```

### Implementation:

#### Backend API Methods:
```typescript
// UserService
async assignPermissionToUser(data: {
  userId: string;
  permissionId: string;
  grantedBy: string;
  reason?: string;
  expiresAt?: Date;
}) {
  return this.prisma.userPermission.create({
    data: {
      userId: data.userId,
      permissionId: data.permissionId,
      isGranted: true,
      grantedBy: data.grantedBy,
      reason: data.reason,
      expiresAt: data.expiresAt
    }
  });
}

async denyPermissionToUser(data: {
  userId: string;
  permissionId: string;
  grantedBy: string;
  reason?: string;
}) {
  return this.prisma.userPermission.upsert({
    where: { userId_permissionId: { userId: data.userId, permissionId: data.permissionId } },
    update: { isGranted: false, grantedBy: data.grantedBy, reason: data.reason },
    create: { ...data, isGranted: false }
  });
}

// AuthService - Enhanced permission check
async hasPermission(userId: string, permissionName: string): Promise<boolean> {
  // 1. Check user-specific permissions first
  const userPermission = await this.prisma.userPermission.findFirst({
    where: {
      userId,
      permission: { name: permissionName },
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } }
      ]
    },
    include: { permission: true }
  });
  
  // If explicitly denied, return false
  if (userPermission && !userPermission.isGranted) {
    return false;
  }
  
  // If explicitly granted, return true
  if (userPermission && userPermission.isGranted) {
    return true;
  }
  
  // 2. Fall back to role-based permissions
  const roles = await this.getUserRoles(userId);
  return roles.some((userRole) =>
    userRole.role.permissions.some((rp) => rp.permission.name === permissionName),
  );
}
```

#### Frontend Components:
```typescript
// User Detail Component - Permission Management Section
interface UserPermissionData {
  id?: string;
  userId: string;
  permissionId: string;
  isGranted: boolean;
  grantedBy?: string;
  grantedAt?: Date;
  expiresAt?: Date;
  reason?: string;
}

// UserService methods
async assignSpecialPermission(data: UserPermissionData): Promise<boolean> {
  return this.graphqlService.createOne('UserPermission', data);
}

async getUserPermissions(userId: string): Promise<UserPermissionData[]> {
  return this.graphqlService.findMany('UserPermission', {
    where: { userId },
    include: { permission: true, user: true }
  });
}
```

---

## 🎯 PHƯƠNG ÁN 2: DYNAMIC ROLE SYSTEM

### Concept:
- Tạo **sub-roles** hoặc **role variants** cho user cụ thể
- Ví dụ: `Manager` → `Manager_UserA_Enhanced` 

### ✅ Ưu điểm:
- Không cần thay đổi database schema
- Tương thích với hệ thống hiện tại

### ❌ Nhược điểm:  
- Tạo nhiều role duplicate
- Khó quản lý và maintain
- Không tối ưu về performance

---

## 🎯 PHƯƠNG ÁN 3: PERMISSION CONTEXT SYSTEM

### Concept:
- Thêm field `context` vào bảng `RolePermission`
- Context có thể là userId, projectId, etc.

### Schema:
```prisma
model RolePermission {
  // ... existing fields ...
  context      Json?     // { userId: "xxx", projectId: "yyy" }
  isActive     Boolean   @default(true)
}
```

### ❌ Nhược điểm:
- Phức tạp trong query và logic
- Khó kiểm soát và audit

---

## 🏆 KHUYẾN NGHỊ CUỐI CÙNG: PHƯƠNG ÁN 1

### Lý do chọn Phương án 1:
1. **Rõ ràng và dễ hiểu**: Logic phân quyền được tách biệt rõ ràng
2. **Linh hoạt**: Có thể grant/deny permission cho user cụ thể
3. **Audit-friendly**: Theo dõi được lịch sử thay đổi quyền
4. **Future-proof**: Dễ mở rộng thêm tính năng như permission groups, temporary permissions
5. **Best Practice**: Tuân thủ pattern RBAC + ABAC hybrid

### Các bước triển khai:
1. **Update Prisma Schema** → Migrate database
2. **Update Backend Services** → Add UserPermission CRUD
3. **Update AuthService** → Enhanced permission checking logic  
4. **Update Frontend** → User detail page với permission management
5. **Testing** → Unit test + Integration test

### Estimated Time: 2-3 days

Bạn muốn tôi triển khai phương án nào? Tôi có thể bắt đầu với việc cập nhật schema và tạo migration files.