# Tính Năng "Cấp Quyền Mới" - Demo và Hướng Dẫn

## 🎯 Tổng Quan Tính Năng

Đã hoàn thiện tính năng "Cấp Quyền Mới" cho phép admin cấp/từ chối quyền cụ thể cho từng user, override quyền role-based.

## ✅ Các Component Đã Hoàn Thành

### 1. UserPermissionOverviewComponent
**File:** `frontend/src/app/admin/user-permission/user-permission-overview.component.ts`
- Giao diện tổng quan permissions với tabs
- Hiển thị thống kê và danh sách permissions
- Nút "Cấp Quyền Mới" để mở dialog

### 2. PermissionSelectorDialogComponent  
**File:** `frontend/src/app/admin/user-permission/permission-selector-dialog.component.ts`
- Dialog chọn permissions với tính năng:
  - Tìm kiếm permissions theo tên/mô tả
  - Nhóm permissions theo category
  - Chọn cấp/từ chối quyền
  - Thêm lý do và thời gian hết hạn

### 3. UserPermissionGraphQLService Updates
- Method `assignPermissionToUser()` để tạo user permission mới
- Interface `UserPermissionCreateData` với đầy đủ fields

## 🚀 Workflow Hoàn Chỉnh

### Bước 1: Mở Dialog Cấp Quyền
```typescript
// Trong UserPermissionOverviewComponent
async openPermissionSelector(): Promise<void> {
  const availablePermissions = await this.loadAvailablePermissions();
  
  const dialogRef = this.dialog.open(PermissionSelectorDialogComponent, {
    width: '800px',
    maxHeight: '90vh',
    data: {
      permissions: availablePermissions,
      userId: this.userId(),
      userName: this.userName() || 'User'
    }
  });
  
  const result = await dialogRef.afterClosed().toPromise();
  if (result) {
    await this.processPermissionChanges(result);
  }
}
```

### Bước 2: Chọn Permissions trong Dialog
```typescript
// PermissionSelectorDialogComponent features:
- Search: Tìm kiếm theo tên permission
- Filter: Lọc theo nhóm permissions
- Selection: Multi-select permissions
- Grant Type: Chọn cấp/từ chối quyền
- Reason: Thêm lý do (optional)
- Expiry: Thời gian hết hạn (optional)
```

### Bước 3: Xử Lý Kết Quả
```typescript
private async processPermissionChanges(result: PermissionSelectorResult) {
  for (const permission of result.selectedPermissions) {
    if (existingUserPerm) {
      // Update existing permission
      await this.userPermissionGraphQLService.updateUserPermission(/*...*/);
    } else {
      // Create new user permission
      await this.userPermissionGraphQLService.assignPermissionToUser({
        userId: userId,
        permissionId: permission.id,
        isGranted: result.grantType === 'grant',
        grantedBy: 'admin',
        reason: result.reason
      });
    }
  }
}
```

## 📋 Data Structure

### PermissionSelectorResult
```typescript
interface PermissionSelectorResult {
  selectedPermissions: Permission[];
  grantType: 'grant' | 'deny';
  reason?: string;
  expiresAt?: Date;
}
```

### UserPermissionCreateData
```typescript
interface UserPermissionCreateData {
  userId: string;
  permissionId: string;
  isGranted: boolean;
  grantedBy: string;
  reason?: string;
  expiresAt?: Date;
}
```

## 🎨 UI Features

### Permission Dialog UI
```html
<!-- Search & Filter -->
<mat-form-field>
  <mat-label>Tìm kiếm quyền...</mat-label>
  <input matInput [(ngModel)]="searchTerm">
</mat-form-field>

<mat-form-field>
  <mat-label>Nhóm quyền</mat-label>
  <mat-select [(value)]="selectedGroup">
    <mat-option *ngFor="let group of permissionGroups" [value]="group">
      {{group}}
    </mat-option>
  </mat-select>
</mat-form-field>

<!-- Permission List with Selection -->
<div class="permission-group" *ngFor="let group of groupedPermissions | keyvalue">
  <h4>{{group.key}}</h4>
  <mat-selection-list #permissionList>
    <mat-list-option 
      *ngFor="let permission of group.value" 
      [value]="permission"
      [selected]="isSelected(permission)">
      <div class="permission-item">
        <div class="permission-name">{{permission.name}}</div>
        <div class="permission-desc">{{permission.description}}</div>
      </div>
    </mat-list-option>
  </mat-selection-list>
</div>

<!-- Grant/Deny Options -->
<mat-radio-group [(ngModel)]="grantType">
  <mat-radio-button value="grant">Cấp quyền</mat-radio-button>
  <mat-radio-button value="deny">Từ chối quyền</mat-radio-button>
</mat-radio-group>
```

## 🔄 Integration Points

### 1. Với UserRolesInfoComponent
- Hiển thị permissions từ role + user-specific overrides
- Phân biệt quyền từ role vs user-granted

### 2. Với Permission Management
- Load danh sách permissions có sẵn
- Kiểm tra permissions user đã có
- Update permissions real-time

### 3. Với GraphQL Backend
- Mutation: `assignPermissionToUser`
- Mutation: `updateUserPermission`
- Query: Load permissions và user permissions

## 📝 Test Scenarios

### Test Case 1: Cấp Quyền Mới
1. Mở user permission overview
2. Click "Cấp Quyền Mới"
3. Chọn permissions từ dialog
4. Chọn "Cấp quyền" 
5. Thêm lý do (optional)
6. Submit → Verify success message

### Test Case 2: Từ Chối Quyền
1. Mở dialog cấp quyền
2. Chọn permissions
3. Chọn "Từ chối quyền"
4. Submit → Verify deny permissions created

### Test Case 3: Override Role Permission
1. User có quyền từ role
2. Cấp quyền deny cho permission đó
3. Verify user permission override role permission

## 🎯 Key Benefits

1. **Granular Control**: Cấp/từ chối quyền cụ thể cho từng user
2. **Role Override**: Override quyền role-based khi cần
3. **Audit Trail**: Lưu lý do và người cấp quyền
4. **Expiry Support**: Hỗ trợ quyền có thời hạn
5. **User-Friendly**: Dialog intuitive với search/filter

## ✅ Status: COMPLETED

- ✅ Schema alignment với Prisma models
- ✅ UserRolesInfoComponent bug fix  
- ✅ Permission selector dialog
- ✅ Complete grant/deny workflow
- ✅ GraphQL integration
- ✅ Build verification passed

Tính năng "Cấp Quyền Mới" đã hoàn thiện và sẵn sàng sử dụng!