# 📖 Hướng Dẫn Sử Dụng UserPermission System - Chi Tiết

## 🚀 Truy Cập UserPermission System

### Cách 1: Truy Cập Demo
```
URL: http://localhost:4200/admin/user-permission-demo
```
Demo page bao gồm:
- 🎯 **Tổng Quan**: Giải thích hệ thống và thống kê
- ⚙️ **Cách Hoạt Động**: Step-by-step workflow
- 🚀 **Demo Trực Tiếp**: Interface quản lý thực tế
- 📚 **API Reference**: Documentation đầy đủ

### Cách 2: Truy Cập Management Interface
```
URL: http://localhost:4200/admin/user-permission
```
Interface quản lý permissions cho production use.

## 👤 Hướng Dẫn Sử Dụng Từng Tính Năng

### 1. 🔍 Tìm Kiếm và Lọc User

#### Tìm Kiếm User
1. Nhập tên hoặc email user vào ô "Tìm kiếm user..."
2. Hệ thống sẽ tự động filter danh sách
3. Hỗ trợ tìm kiếm partial match và không phân biệt hoa thường

#### Lọc theo Role
1. Click dropdown "Chọn role để lọc"
2. Chọn role muốn xem
3. Chỉ hiển thị users thuộc role đó

```typescript
// Code example: Tìm kiếm user
searchUsers(keyword: string) {
  this.filteredUsers.set(
    this.users().filter(user => 
      user.username.toLowerCase().includes(keyword.toLowerCase()) ||
      user.email.toLowerCase().includes(keyword.toLowerCase())
    )
  );
}
```

### 2. 👥 Quản Lý User Permissions

#### Chọn User
1. Click vào dropdown "Chọn user để quản lý quyền"
2. Tìm kiếm user trong dropdown
3. Click chọn user

#### Xem Permissions Hiện Tại
- **Role Permissions**: Quyền kế thừa từ role (màu xanh)
- **User Granted**: Quyền được cấp riêng (màu xanh lá)
- **User Denied**: Quyền bị từ chối (màu đỏ)

```typescript
// Effective permissions calculation
effectivePermissions = rolePermissions + userGranted - userDenied
```

### 3. ✅ Cấp Quyền Đặc Biệt (GRANTED)

#### Cách Cấp Quyền
1. Chọn user cần cấp quyền
2. Click dropdown "Chọn permission để cấp"
3. Chọn permission từ danh sách
4. Click "Cấp Quyền" (nút xanh lá)

#### Ví Dụ Thực Tế
```
User: john.doe
Role: Editor (có quyền: post.view, post.create)
Cấp thêm: post.delete

=> Kết quả: john.doe có quyền: post.view, post.create, post.delete
```

#### Bulk Grant Permissions
1. Chọn nhiều users từ danh sách
2. Click "Bulk Actions" → "Grant Permissions"
3. Chọn permissions cần cấp
4. Confirm thao tác

### 4. ❌ Từ Chối Quyền (DENIED)

#### Cách Từ Chối Quyền
1. Chọn user
2. Chọn permission từ dropdown
3. Click "Từ Chối" (nút đỏ)

#### Use Case: Override Role Permissions
```
User: jane.admin
Role: Admin (có quyền: user.delete)
Từ chối: user.delete

=> Kết quả: jane.admin KHÔNG có quyền user.delete dù là Admin
```

### 5. 🗂️ Quản Lý Permissions Hàng Loạt

#### Bulk Assign
```typescript
// Example: Assign permissions to multiple users
const assignments = [
  { userId: 1, permissionId: 5, type: 'GRANTED' },
  { userId: 2, permissionId: 5, type: 'GRANTED' },
  { userId: 3, permissionId: 5, type: 'DENIED' }
];

this.userPermissionService.batchAssign(assignments);
```

#### Import/Export Permissions
1. **Export**: Click "Export Permissions" để tải file CSV
2. **Import**: Upload file CSV với format:
   ```csv
   userId,permissionId,type,expiresAt
   1,5,GRANTED,2025-12-31
   2,5,DENIED,
   ```

### 6. 📊 Monitoring và Analytics

#### Permission Statistics
- **Total Users**: Tổng số users trong hệ thống
- **Users with Custom Permissions**: Số users có quyền đặc biệt
- **Active Assignments**: Tổng số assignment đang hoạt động
- **Permission Distribution**: Phân bố permissions theo loại

#### Audit Log
Mọi thay đổi permissions đều được log:
```json
{
  "action": "PERMISSION_ASSIGNED",
  "userId": 123,
  "permissionId": 456,
  "type": "GRANTED",
  "changedBy": 789,
  "timestamp": "2025-09-20T10:30:00Z",
  "details": {
    "previousType": null,
    "newType": "GRANTED"
  }
}
```

## 🔒 Security và Best Practices

### 1. Permission Naming Convention
```
resource.action
- user.view, user.create, user.update, user.delete
- post.view, post.create, post.publish
- admin.view, admin.manage
```

### 2. Hierarchical Permissions
```
admin.* bao gồm tất cả admin permissions
user.* bao gồm tất cả user permissions
```

### 3. Temporary Permissions
```typescript
// Cấp quyền có thời hạn
{
  userId: 123,
  permissionId: 456,
  type: 'GRANTED',
  expiresAt: '2025-12-31T23:59:59Z'
}
```

### 4. Permission Validation
```typescript
// Frontend validation (UX only)
canAccess(permission: string): boolean {
  return this.authService.hasPermission(permission);
}

// Backend validation (Security)
@UseGuards(PermissionGuard)
@RequirePermission('user.delete')
deleteUser(@Param('id') id: number) {
  return this.userService.delete(id);
}
```

## 🛠️ Troubleshooting

### 1. Permission Không Hoạt Động
**Nguyên Nhân Có Thể:**
- JWT token chưa được refresh
- Cache chưa được clear
- Permission bị DENIED override

**Cách Khắc Phục:**
```typescript
// Refresh user session
this.authService.refreshToken();

// Clear permission cache  
this.permissionService.clearCache();

// Check for DENIED permissions
this.userPermissionService.checkDeniedPermissions(userId);
```

### 2. UI Không Cập Nhật
**Nguyên Nhân:**
- Signal không được trigger
- Component không subscribe đúng

**Cách Khắc Phục:**
```typescript
// Force signal update
this.userPermissions.set([...newPermissions]);

// Re-subscribe to changes
this.userPermissionService.getUserPermissions(userId).subscribe();
```

### 3. Performance Issues
**Tối Ưu:**
```typescript
// Use OnPush change detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Lazy load permissions
@Input() 
set userId(value: number) {
  if (value && value !== this._previousUserId) {
    this.loadPermissions(value);
    this._previousUserId = value;
  }
}

// Use virtual scrolling for large lists
<cdk-virtual-scroll-viewport itemSize="50">
  <div *cdkVirtualFor="let user of users">
    {{ user.username }}
  </div>
</cdk-virtual-scroll-viewport>
```

## 📱 Mobile Responsive

### Tablet View
- Collapse filters vào sidebar
- Stack tables vertically
- Larger touch targets

### Mobile View  
- Single column layout
- Bottom sheet for actions
- Swipe gestures for quick actions

```scss
@media (max-width: 768px) {
  .user-permission-management {
    .filters-section {
      flex-direction: column;
    }
    
    .mat-table {
      font-size: 12px;
      
      .mat-column-actions {
        width: 60px;
      }
    }
    
    .bulk-actions {
      position: fixed;
      bottom: 16px;
      right: 16px;
    }
  }
}
```

## 🧪 Testing Guidelines

### Unit Tests
```typescript
describe('UserPermissionService', () => {
  it('should calculate effective permissions correctly', () => {
    const rolePerms = ['user.view', 'user.create'];
    const granted = ['user.delete'];
    const denied = ['user.create'];
    
    const effective = service.calculateEffective(rolePerms, granted, denied);
    
    expect(effective).toEqual(['user.view', 'user.delete']);
  });
});
```

### Integration Tests
```typescript
describe('Permission Assignment Flow', () => {
  it('should assign permission and update UI', async () => {
    const user = await createTestUser();
    const permission = await createTestPermission();
    
    await component.assignPermission(user.id, permission.id, 'GRANTED');
    
    expect(component.userPermissions()).toContain(
      jasmine.objectContaining({
        userId: user.id,
        permissionId: permission.id,
        type: 'GRANTED'
      })
    );
  });
});
```

### E2E Tests
```typescript
test('User can assign permissions', async ({ page }) => {
  await page.goto('/admin/user-permission');
  
  await page.selectOption('[data-testid=user-select]', '1');
  await page.selectOption('[data-testid=permission-select]', '5');
  await page.click('[data-testid=grant-button]');
  
  await expect(page.locator('[data-testid=success-message]'))
    .toContainText('Permission đã được cấp');
});
```

## 🔄 Workflow Examples

### Scenario 1: Cấp Quyền Tạm Thời
```
1. HR cần quyền xem báo cáo tài chính trong 1 tháng
2. Admin vào UserPermission management
3. Chọn HR user
4. Cấp permission "finance.view" 
5. Set expires_at = +30 days
6. System tự động revoke sau 30 ngày
```

### Scenario 2: Override Role Permission
```
1. Manager role có quyền "employee.delete"
2. Manager A không được phép xóa nhân viên
3. Admin vào UserPermission
4. Chọn Manager A
5. DENY permission "employee.delete"
6. Manager A không thể xóa nhân viên dù có role Manager
```

### Scenario 3: Bulk Permission Assignment
```
1. 50 users mới join company
2. Tất cả cần quyền "office.access"
3. Admin export user list
4. Thêm column permission assignments
5. Import lại file
6. System tự động assign permissions cho 50 users
```

---

## 📞 Hỗ Trợ

### Documentation Links
- [Backend API Docs]: `http://localhost:3331/graphql` (GraphQL Playground)  
- [Frontend Components]: `/admin/user-permission-demo`
- [System Architecture]: `/USERPERMISSION_SYSTEM_COMPLETE.md`

### Contact
- **Technical Lead**: Phạm Chí Kiệt - it@tazagroup.vn
- **Support Channel**: #userpermission-support

---
**Version**: 1.0.0  
**Last Updated**: September 20, 2025  
**Status**: ✅ Production Ready