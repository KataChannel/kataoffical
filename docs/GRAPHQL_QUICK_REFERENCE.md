# 🚀 GraphQL Universal API - Quick Reference

## 🔗 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **GraphQL Playground** | `http://localhost:3000/graphql` | Interactive GraphQL IDE |
| **GraphQL API** | `http://localhost:3000/graphql` | GraphQL endpoint |
| **Schema Download** | `http://localhost:3000/graphql?sdl` | Download schema |

## 📋 Available Models

| Model | GraphQL Type | Description |
|-------|--------------|-------------|
| `user` | `User` | Người dùng hệ thống |
| `sanpham` | `Sanpham` | Sản phẩm |
| `khachhang` | `Khachhang` | Khách hàng |
| `donhang` | `Donhang` | Đơn hàng |
| `dathang` | `Dathang` | Đặt hàng |
| `nhacungcap` | `Nhacungcap` | Nhà cung cấp |
| `kho` | `Kho` | Kho hàng |
| `phieukho` | `PhieuKho` | Phiếu kho |
| `role` | `Role` | Vai trò |
| `permission` | `Permission` | Quyền hạn |

## ⚡ Quick Queries

### Get All Items
```graphql
query {
  users { data { id email } pagination { total } }
  sanphams { data { id title masp giaban } pagination { total } }
  khachhangs { data { id name makh } pagination { total } }
}
```

### Search
```graphql
query {
  universalSearch(
    model: "sanpham" 
    searchTerm: "sách"
    searchFields: ["title", "masp"]
  )
}
```

### Statistics
```graphql
query {
  getModelStats(model: "sanpham")
  getModelStats(model: "khachhang")
  getModelStats(model: "user")
}
```

## 🔧 Common Operations

### Create
```graphql
mutation {
  createSanpham(input: {
    title: "New Product"
    masp: "SP001" 
    giaban: 50000
  }) { id title }
}
```

### Update
```graphql
mutation {
  updateSanpham(input: {
    id: "product-id"
    title: "Updated Product"
  }) { id title updatedAt }
}
```

### Delete
```graphql
mutation {
  deleteSanpham(id: "product-id")
}
```

### Bulk Delete
```graphql
mutation {
  bulkDelete(model: "sanpham", ids: ["id1", "id2"])
}
```

## 🔍 Filter Examples

```graphql
# Basic filter
filter: { search: "keyword", isActive: true }

# Date range
filter: { 
  startDate: "2025-01-01"
  endDate: "2025-12-31" 
}

# Product filters
filter: { 
  minPrice: 10000
  maxPrice: 500000
  dvt: "cuốn"
}

# Customer filters  
filter: {
  loaikh: "retail"
  quan: "Quận 1"
  hiengia: true
}
```

## 📊 Pagination

```graphql
pagination: { page: 1, pageSize: 20 }
sort: { field: "createdAt", direction: "desc" }
```

## 🔐 Authentication

All requests require JWT token:
```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📱 Quick Test

```bash
# Start server
npm run start:dev

# Open playground  
http://localhost:3000/graphql

# Test query
query { users(pagination: {page: 1, pageSize: 1}) { pagination { total } } }
```

## 🚨 Common Error Codes

| Code | Description |
|------|-------------|
| `NOT_FOUND` | Record not found |
| `BAD_REQUEST` | Invalid input data |
| `UNAUTHORIZED` | Missing/invalid JWT token |
| `FORBIDDEN` | Insufficient permissions |

## 💡 Tips

- Always use pagination for large datasets
- Select only needed fields
- Use specific filters for better performance  
- Cache frequently accessed data
- Monitor query complexity

---
🎯 **For detailed documentation**: See `GRAPHQL_UNIVERSAL_API_GUIDE.md`
