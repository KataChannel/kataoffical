# Permission Creation and Role Assignment Script

## Tổng quan
Script này cho phép tạo permissions mới và tự động thêm chúng vào tất cả roles hiện có trong hệ thống.

## Các tính năng chính
1. **Tạo permissions từ JSON file**: Load danh sách permissions từ file JSON
2. **Tạo permissions từ user input**: Nhập thông tin permission thủ công
3. **Tự động thêm vào tất cả roles**: Sau khi tạo, permissions sẽ được thêm vào tất cả roles
4. **Xác thực và báo cáo**: Kiểm tra kết quả và hiển thị báo cáo chi tiết

## Cách sử dụng

### 1. Chạy script
```bash
cd /path/to/api
node scripts/test-permission-and-add-all-role.js
```

### 2. Chọn nguồn dữ liệu
Script sẽ hiển thị menu lựa chọn:
```
📊 DATA SOURCE SELECTION
========================
Choose data source for permission creation:
1. Load from JSON file (test-permission-and-add-all-role.json)
2. Manual input from user
3. Exit
```

### 3. Tùy chọn 1: Load từ JSON file
- Script sẽ tự động load permissions từ file `test-permission-and-add-all-role.json`
- Tất cả permissions trong file sẽ được tạo một lần
- Định dạng file JSON:
```json
[
    {
        "name": "permission.name",
        "description": "Permission description",
        "group": "custom"
    },
    {
        "name": "another.permission",
        "description": "Another permission description", 
        "group": "admin"
    }
]
```

### 4. Tùy chọn 2: Manual input
- Script sẽ hỏi thông tin từng field:
  - **Name**: Tên permission (ví dụ: `user.create`)
  - **Description**: Mô tả permission
  - **Group**: Nhóm permission (mặc định: `custom`)

## Cấu trúc file JSON

### Các trường bắt buộc:
- `name`: Tên unique của permission
- `description`: Mô tả permission

### Các trường tùy chọn:
- `group`: Nhóm permission (mặc định: `custom`)

### Ví dụ file JSON:
```json
[
    {
        "name": "phieugiaohang.sldat",
        "description": "Permission for phieugiaohang.sldat",
        "group": "custom"
    },
    {
        "name": "phieugiaohang.slgiao", 
        "description": "Permission for phieugiaohang.slgiao",
        "group": "custom"
    },
    {
        "name": "dathang.sldat",
        "description": "Permission for dathang.sldat",
        "group": "custom"
    }
]
```

## Kết quả mong đợi

### Thành công:
```
📊 OPERATION SUMMARY
==================
✅ Successfully created 7 permissions
✅ Successfully added 7 permissions to 49 role assignments

🎉 Script completed successfully!
```

### Báo cáo chi tiết:
- Số permissions được tạo thành công
- Số permissions tạo thất bại (nếu có)
- Số role assignments thành công
- Chi tiết lỗi (nếu có)

## Lưu ý quan trọng

1. **Unique names**: Permission names phải unique trong hệ thống
2. **Auto-generated CodeId**: Script tự động tạo codeId theo format `PEM00XXX`
3. **Default grant**: Permissions được thêm vào roles với trạng thái `isGranted: false` (denied)
4. **Batch processing**: JSON mode hỗ trợ tạo nhiều permissions cùng lúc
5. **Error handling**: Script sẽ tiếp tục chạy ngay cả khi một số permissions thất bại

## Troubleshooting

### Lỗi thường gặp:
1. **JSON file not found**: Đảm bảo file `test-permission-and-add-all-role.json` tồn tại
2. **Duplicate permission name**: Permission name đã tồn tại trong database
3. **Database connection error**: Kiểm tra kết nối database
4. **Invalid JSON format**: Kiểm tra syntax JSON file

### Kiểm tra database:
```sql
-- Xem permissions vừa tạo
SELECT * FROM Permission WHERE "group" = 'custom' ORDER BY "createdAt" DESC;

-- Xem role assignments
SELECT r.name as role_name, p.name as permission_name, rp."isGranted"
FROM RolePermission rp
JOIN Role r ON rp."roleId" = r.id  
JOIN Permission p ON rp."permissionId" = p.id
WHERE p."group" = 'custom'
ORDER BY r.name, p.name;
```

## Module exports
Script cũng export các functions để sử dụng programmatically:
- `createPermission(permissionData)`
- `getAllRoles()`
- `addPermissionToAllRoles(permission, roles)`
- `verifyPermissionAssignments(permission)`
- `loadPermissionsFromJSON()`
- `processMultiplePermissions(permissions)`