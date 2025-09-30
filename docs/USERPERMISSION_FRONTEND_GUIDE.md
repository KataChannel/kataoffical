# 🔐 Hướng Dẫn Áp Dụng UserPermission System cho Frontend

## Tổng Quan

UserPermission System đã được implement đầy đủ trên frontend Angular với các tính năng:
- ✅ Quản lý quyền đặc biệt cho từng user
- ✅ Override quyền từ role
- ✅ UI hiện đại với Angular Material
- ✅ GraphQL integration với real-time updates
- ✅ Signal-based state management

## 📁 Cấu Trúc Files

```
frontend/src/app/admin/user-permission/
├── user-permission-management.component.ts (568 dòng)
├── user-permission-graphql.service.ts (561 dòng)
```

## 🚀 Cách Tích Hợp UserPermission

### 1. Thêm Route cho UserPermission Management

Cần thêm route trong `app.routes.ts`:

```typescript
{
  path: 'user-permission',
  canActivate: [PermissionGuard],
  data: { permission: 'user-permission.view' },
  loadComponent: () =>
    import('./admin/user-permission/user-permission-management.component').then(
      (c) => c.UserPermissionManagementComponent
    ),
}
```

### 2. Thêm Menu Navigation

Thêm menu item cho UserPermission trong navigation:

```typescript
// Menu item cho UserPermission
{
  title: 'Quyền Đặc Biệt',
  icon: 'security',
  route: '/admin/user-permission',
  permission: 'user-permission.view'
}
```

### 3. Sử Dụng UserPermission Service

```typescript
import { UserPermissionGraphQLService } from './admin/user-permission/user-permission-graphql.service';

constructor(private userPermissionService: UserPermissionGraphQLService) {}

// Lấy permissions của user
getUserPermissions(userId: number) {
  return this.userPermissionService.getUserPermissions(userId);
}

// Assign permission cho user
assignPermission(userId: number, permissionId: number, type: 'GRANTED' | 'DENIED') {
  return this.userPermissionService.assignPermission({
    userId,
    permissionId,
    type
  });
}
```

## 📱 Hướng Dẫn Sử Dụng UI Component

### 1. Hiển Thị UserPermission Management Component

```typescript
// Trong template
<app-user-permission-management></app-user-permission-management>
```

### 2. Các Tính Năng Chính

1. **Tìm Kiếm User**: 
   - Tìm kiếm theo tên, email
   - Filter theo role

2. **Quản Lý Permissions**:
   - **GRANTED**: Cấp quyền đặc biệt (override role)
   - **DENIED**: Từ chối quyền (override role)
   - **INHERITED**: Kế thừa từ role

3. **Bulk Operations**:
   - Assign/Revoke permissions hàng loạt
   - Import/Export permissions

4. **Real-time Updates**:
   - Sử dụng Angular Signals
   - Auto-refresh khi có thay đổi

### 3. Permission Logic

```typescript
// Logic tính toán permission cuối cùng
effectivePermissions = rolePermissions + userGrantedPermissions - userDeniedPermissions

// Ví dụ:
// Role có: ['user.view', 'user.create']
// User granted: ['user.delete']  
// User denied: ['user.create']
// => Effective: ['user.view', 'user.delete']
```

## 🔧 Integration với Authentication

### 1. JWT Token Enhancement

Backend đã được update để include user permissions trong JWT:

```typescript
// JWT payload structure
{
  userId: number,
  username: string,
  roles: Role[],
  userPermissions: UserPermission[], // ⭐ NEW
  iat: number,
  exp: number
}
```

### 2. Permission Guard Update

```typescript
// Permission guard sẽ check both role permissions và user permissions
canActivate(route: ActivatedRouteSnapshot): boolean {
  const requiredPermission = route.data['permission'];
  const user = this.authService.getCurrentUser();
  
  // Check role permissions
  const hasRolePermission = user.roles.some(role => 
    role.permissions.some(p => p.name === requiredPermission)
  );
  
  // Check user-specific permissions  
  const userGranted = user.userPermissions
    .filter(up => up.type === 'GRANTED')
    .some(up => up.permission.name === requiredPermission);
    
  const userDenied = user.userPermissions
    .filter(up => up.type === 'DENIED')
    .some(up => up.permission.name === requiredPermission);
  
  // Final permission calculation
  return (hasRolePermission || userGranted) && !userDenied;
}
```

## 🎨 UI Components và Styling

### 1. Material Design Integration

Component sử dụng Angular Material:
- `MatTable` cho data grid
- `MatPaginator` cho phân trang
- `MatSelect` cho dropdowns
- `MatCheckbox` cho permission toggles
- `MatSnackBar` cho notifications

### 2. Responsive Design

```scss
// Component responsive cho mobile
.user-permission-management {
  @media (max-width: 768px) {
    .mat-table {
      font-size: 12px;
    }
    
    .action-buttons {
      flex-direction: column;
    }
  }
}
```

## 📊 Monitoring và Analytics

### 1. Permission Statistics

```typescript
// Lấy thống kê permissions
getPermissionStats() {
  return this.userPermissionService.getStats().pipe(
    map(stats => ({
      totalUsers: stats.totalUsers,
      usersWithCustomPermissions: stats.usersWithCustomPermissions,
      mostGrantedPermissions: stats.mostGrantedPermissions,
      mostDeniedPermissions: stats.mostDeniedPermissions
    }))
  );
}
```

### 2. Audit Log Integration

```typescript
// Track permission changes
onPermissionChange(change: PermissionChange) {
  this.auditLogService.log({
    action: 'PERMISSION_CHANGE',
    details: {
      userId: change.userId,
      permissionId: change.permissionId,
      oldType: change.oldType,
      newType: change.newType,
      changedBy: this.authService.getCurrentUser().id
    }
  });
}
```

## 🚨 Error Handling

### 1. GraphQL Error Handling

```typescript
// Service error handling
assignPermission(data: AssignPermissionInput) {
  return this.apollo.mutate({
    mutation: ASSIGN_PERMISSION_MUTATION,
    variables: { input: data }
  }).pipe(
    catchError(error => {
      if (error.graphQLErrors?.[0]?.extensions?.code === 'PERMISSION_ALREADY_EXISTS') {
        this.snackBar.open('Permission đã tồn tại', 'Đóng', { duration: 3000 });
      } else {
        this.snackBar.open('Lỗi khi cấp quyền', 'Đóng', { duration: 3000 });
      }
      return throwError(error);
    })
  );
}
```

### 2. Loading States

```typescript
// Loading states với signals
loading = signal(false);
error = signal<string | null>(null);

async loadUserPermissions() {
  this.loading.set(true);
  this.error.set(null);
  
  try {
    const result = await this.userPermissionService.getUserPermissions(this.userId());
    this.userPermissions.set(result);
  } catch (error) {
    this.error.set('Không thể tải permissions');
  } finally {
    this.loading.set(false);
  }
}
```

## 🔄 Real-time Updates

### 1. WebSocket Integration

```typescript
// Listen for permission changes
this.webSocketService.on('permission-changed', (data) => {
  if (data.userId === this.currentUserId()) {
    this.refreshUserPermissions();
  }
});
```

### 2. Cache Invalidation

```typescript
// Invalidate cache when permissions change
onPermissionUpdated() {
  this.apollo.client.cache.evict({ 
    fieldName: 'getUserPermissions' 
  });
  this.apollo.client.cache.gc();
}
```

## 📝 Best Practices

### 1. Performance Optimization

```typescript
// Use OnPush change detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Lazy load permissions
@Input() 
set userId(value: number) {
  if (value) {
    this.loadUserPermissions(value);
  }
}
```

### 2. Security Considerations

```typescript
// Always validate permissions on backend
// Frontend permissions are for UX only
private validatePermission(action: string): boolean {
  // Client-side validation for UX
  const hasPermission = this.checkUserPermission(action);
  
  if (!hasPermission) {
    this.router.navigate(['/unauthorized']);
    return false;
  }
  
  return true;
}
```

## 🧪 Testing

### 1. Unit Tests

```typescript
// Test permission calculations
it('should calculate effective permissions correctly', () => {
  const rolePermissions = ['user.view', 'user.create'];
  const userGranted = ['user.delete'];
  const userDenied = ['user.create'];
  
  const effective = calculateEffectivePermissions(
    rolePermissions, userGranted, userDenied
  );
  
  expect(effective).toEqual(['user.view', 'user.delete']);
});
```

### 2. E2E Tests

```typescript
// Test permission assignment flow
it('should assign permission to user', async () => {
  await page.goto('/admin/user-permission');
  await page.selectOption('[data-testid=user-select]', '1');
  await page.selectOption('[data-testid=permission-select]', '1');
  await page.click('[data-testid=grant-button]');
  
  expect(await page.textContent('[data-testid=success-message]'))
    .toContain('Permission đã được cấp');
});
```

---

**Trạng thái**: ✅ UserPermission System đã sẵn sàng sử dụng trên frontend
**Yêu cầu**: Chỉ cần add routing và navigation để truy cập UI