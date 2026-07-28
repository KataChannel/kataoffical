-- Thêm bảng UserPermission vào schema.prisma

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
  
  @@unique([userId, permissionId]) // Mỗi user chỉ có 1 record cho 1 permission
  @@index([userId])
  @@index([permissionId])
}

-- Cập nhật model User
model User {
  id               String            @id @default(uuid())
  // ... existing fields ...
  roles            UserRole[]
  userPermissions  UserPermission[]  // Thêm relation này
}

-- Cập nhật model Permission  
model Permission {
  id               String            @id @default(uuid())
  // ... existing fields ...
  roles            RolePermission[]
  userPermissions  UserPermission[]  // Thêm relation này
}