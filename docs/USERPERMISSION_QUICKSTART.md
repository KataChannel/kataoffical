# ⚡ UserPermission System - Quick Start Guide

## 🏃‍♂️ Khởi Động Nhanh (5 phút)

### 1. Start Servers
```bash
# Backend
cd api && npm start

# Frontend  
cd frontend && npm start
```

### 2. Truy Cập Demo
```
🎯 Demo Page: http://localhost:4200/admin/user-permission-demo
🔧 Management: http://localhost:4200/admin/user-permission
```

## 🔥 Tính Năng Chính

| Tính Năng | Mô Tả | URL |
|-----------|--------|-----|
| **Permission Management** | Quản lý quyền user | `/admin/user-permission` |
| **Demo & Docs** | Hướng dẫn và demo | `/admin/user-permission-demo` |
| **API Playground** | Test GraphQL | `http://localhost:3331/graphql` |

## ⚡ Cách Sử Dụng Cơ Bản

### Cấp Quyền Cho User
```typescript
// 1. Select user từ dropdown
// 2. Select permission từ dropdown  
// 3. Click "Cấp Quyền" (xanh lá)
```

### Từ Chối Quyền
```typescript
// 1. Select user
// 2. Select permission
// 3. Click "Từ Chối" (đỏ)
```

### Kiểm Tra Quyền
```typescript
// Quyền cuối cùng = Role + Granted - Denied
effectivePermissions = rolePermissions + userGranted - userDenied
```

## 🎯 Use Cases Phổ Biến

### Case 1: Cấp Quyền Đặc Biệt
```
User: john.editor (Role: Editor)
Cần thêm: post.delete
Action: Grant "post.delete" → john có thể xóa bài viết
```

### Case 2: Giới Hạn Quyền  
```
User: jane.admin (Role: Admin) 
Không cho: user.delete
Action: Deny "user.delete" → jane không thể xóa user dù là admin
```

### Case 3: Quyền Tạm Thời
```
User: temp.user
Cần: finance.view trong 30 ngày
Action: Grant với expires_at = +30 days
```

## 🔧 API Quick Reference

### REST Endpoints
```bash
# Assign permission
POST /user-permissions/assign
{
  "userId": 123,
  "permissionId": 456, 
  "type": "GRANTED"
}

# Get user permissions
GET /user-permissions/user/123

# Bulk assign
POST /user-permissions/batch-assign
{
  "assignments": [...]
}
```

### GraphQL
```graphql
# Query permissions
query {
  getUserPermissions(userId: 123) {
    id
    type
    permission { name }
  }
}

# Assign permission  
mutation {
  assignUserPermission(input: {
    userId: 123
    permissionId: 456
    type: GRANTED
  }) {
    id
  }
}
```

## 🚨 Troubleshooting

| Vấn Đề | Nguyên Nhân | Giải Pháp |
|--------|-------------|-----------|
| Permission không hoạt động | JWT chưa refresh | Đăng xuất/nhập lại |
| UI không cập nhật | Cache cũ | Refresh trang |
| API lỗi 401 | Token expired | Login lại |

## 📞 Liên Hệ Hỗ Trợ

- 📧 Email: it@tazagroup.vn
- 📱 Demo: http://localhost:4200/admin/user-permission-demo
- 📚 Docs: /USERPERMISSION_FRONTEND_GUIDE.md

---
**⏰ Setup Time**: 5 phút | **📈 Learning Curve**: Dễ | **🔒 Security**: Enterprise-grade