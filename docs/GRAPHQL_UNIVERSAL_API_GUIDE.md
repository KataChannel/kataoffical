# 🚀 GraphQL Universal API - Hướng dẫn sử dụng chi tiết

## 📋 Tổng quan

GraphQL Universal API là hệ thống GraphQL tổng quát cho tất cả các model Prisma trong dự án. API này cung cấp:

- ✅ **Auto-generated Types** cho tất cả Prisma models
- ✅ **Universal CRUD Operations** 
- ✅ **Advanced Filtering & Pagination**
- ✅ **Search functionality**
- ✅ **Bulk operations**
- ✅ **Statistics & Analytics**
- ✅ **Type-safe GraphQL schema**

## 🎯 Các tính năng chính

### 1. **Universal CRUD**
- Create, Read, Update, Delete cho mọi model
- Pagination & Sorting tự động
- Filter phức tạp với nhiều điều kiện

### 2. **Advanced Search**
- Full-text search trên multiple fields
- Case-insensitive search
- Custom search criteria

### 3. **Bulk Operations**
- Bulk create, update, delete
- Batch processing với error handling

### 4. **Analytics & Statistics**
- Real-time stats cho từng model
- Growth metrics (daily, weekly)
- Active/Inactive counts

## 🔧 Cấu trúc API

```
/api/src/graphql/
├── types/              # GraphQL type definitions
│   ├── common.types.ts    # Common types (Pagination, Filter, Sort)
│   ├── user.types.ts      # User related types
│   ├── sanpham.types.ts   # Product related types
│   ├── khachhang.types.ts # Customer related types
│   └── index.ts           # Export all types
├── services/           # Business logic
│   └── universal.service.ts # Universal service for all models
├── resolvers/          # GraphQL resolvers
│   └── universal.resolver.ts # Universal resolver
├── enums/              # GraphQL enums
│   └── index.ts           # All enum definitions
└── graphql.module.ts   # Main GraphQL module
```

## 🚀 Khởi động

### 1. **Start Server**
```bash
cd /chikiet/kataoffical/rausachfullstack/api
npm run start:dev
```

### 2. **Access GraphQL Playground**
```
http://localhost:3000/graphql
```

## 📖 Hướng dẫn sử dụng chi tiết

### 🔍 **1. QUERIES (Truy vấn dữ liệu)**

#### **1.1 Get Users với Pagination**
```graphql
query GetUsers {
  users(
    pagination: { page: 1, pageSize: 10 }
    filter: { search: "admin", isActive: true }
    sort: { field: "createdAt", direction: "desc" }
  ) {
    data {
      id
      email
      SDT
      isActive
      createdAt
      profile {
        name
        avatar
        bio
      }
      roles {
        role {
          name
          permissions {
            permission {
              name
              group
            }
          }
        }
      }
    }
    pagination {
      total
      page
      pageSize
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
}
```

#### **1.2 Get Single User**
```graphql
query GetUser {
  user(id: "user-id-here") {
    id
    email
    SDT
    isActive
    profile {
      name
      avatar
    }
    roles {
      role {
        name
      }
    }
  }
}
```

#### **1.3 Get Products (Sanpham)**
```graphql
query GetSanphams {
  sanphams(
    pagination: { page: 1, pageSize: 20 }
    filter: { 
      search: "sách"
      isActive: true
      minPrice: 10000
      maxPrice: 500000
      dvt: "cuốn"
    }
    sort: { field: "giaban", direction: "asc" }
  ) {
    data {
      id
      title
      title2
      masp
      giagoc
      giaban
      dvt
      hinhanh
      soluong
      soluongkho
      isActive
      createdAt
      banggia {
        giaban
        banggia {
          title
          mabanggia
        }
      }
      nhacungcap {
        name
        mancc
      }
    }
    pagination {
      total
      totalPages
      hasNextPage
    }
  }
}
```

#### **1.4 Get Customers (Khachhang)**
```graphql
query GetKhachhangs {
  khachhangs(
    pagination: { page: 1, pageSize: 15 }
    filter: {
      search: "nguyễn"
      isActive: true
      loaikh: "retail"
      quan: "Quận 1"
      hiengia: true
    }
  ) {
    data {
      id
      name
      tenkh
      makh
      diachi
      sdt
      email
      loaikh
      quan
      hiengia
      isActive
      banggia {
        title
        mabanggia
      }
      nhomkhachhang {
        name
        description
      }
      donhang {
        id
        madonhang
        ngaygiao
        status
        tongtien
      }
    }
    pagination {
      total
      page
      totalPages
    }
  }
}
```

### ✏️ **2. MUTATIONS (Thay đổi dữ liệu)**

#### **2.1 Create User**
```graphql
mutation CreateUser {
  createUser(input: {
    email: "newuser@example.com"
    SDT: "0123456789"
    password: "securepassword123"
    isActive: true
  }) {
    id
    email
    SDT
    isActive
    createdAt
  }
}
```

#### **2.2 Update User**
```graphql
mutation UpdateUser {
  updateUser(input: {
    id: "user-id-here"
    email: "updated@example.com"
    isActive: false
  }) {
    id
    email
    isActive
    updatedAt
  }
}
```

#### **2.3 Delete User**
```graphql
mutation DeleteUser {
  deleteUser(id: "user-id-here")
}
```

#### **2.4 Create Product**
```graphql
mutation CreateSanpham {
  createSanpham(input: {
    title: "Sách mới"
    title2: "Phụ đề sách"
    masp: "SP001"
    subtitle: "Mô tả ngắn"
    giagoc: 100000
    giaban: 120000
    dvt: "cuốn"
    hinhanh: "https://example.com/image.jpg"
    soluong: 100
    soluongkho: 95
    haohut: 5
    ghichu: "Sách hay"
    isActive: true
  }) {
    id
    title
    masp
    giaban
    createdAt
  }
}
```

#### **2.5 Create Customer**
```graphql
mutation CreateKhachhang {
  createKhachhang(input: {
    name: "Nguyễn Văn A"
    tenkh: "Công ty ABC"
    makh: "KH001"
    diachi: "123 Đường ABC, Quận 1, TP.HCM"
    sdt: "0123456789"
    email: "khachhang@example.com"
    loaikh: "corporate"
    quan: "Quận 1"
    hiengia: true
    isActive: true
    isshowvat: true
  }) {
    id
    name
    makh
    diachi
    createdAt
  }
}
```

### 🔍 **3. ADVANCED SEARCH**

#### **3.1 Universal Search**
```graphql
query UniversalSearch {
  universalSearch(
    model: "sanpham"
    searchTerm: "sách"
    searchFields: ["title", "masp", "subtitle"]
    pagination: { page: 1, pageSize: 10 }
  )
}
```

### 📊 **4. STATISTICS & ANALYTICS**

#### **4.1 Get Model Statistics**
```graphql
query GetStats {
  getModelStats(model: "sanpham")
}
```

**Response sẽ là JSON string chứa:**
```json
{
  "total": 1250,
  "active": 1100,
  "inactive": 150,
  "createdToday": 25,
  "createdThisWeek": 180
}
```

### 🔄 **5. BULK OPERATIONS**

#### **5.1 Bulk Create**
```graphql
mutation BulkCreate {
  bulkCreate(
    model: "sanpham"
    data: "[{\"title\":\"Sách 1\",\"masp\":\"SP001\",\"giaban\":50000},{\"title\":\"Sách 2\",\"masp\":\"SP002\",\"giaban\":60000}]"
  )
}
```

#### **5.2 Bulk Delete**
```graphql
mutation BulkDelete {
  bulkDelete(
    model: "sanpham"
    ids: ["id1", "id2", "id3"]
  )
}
```

## 🔧 **Filter Options Chi tiết**

### **Common Filters (Áp dụng cho tất cả models)**
```graphql
filter: {
  search: "keyword"           # Tìm kiếm trong title, name, description
  startDate: "2025-01-01"     # Từ ngày
  endDate: "2025-12-31"       # Đến ngày  
  ids: ["id1", "id2"]         # List các ID cụ thể
  isActive: true              # Trạng thái active
}
```

### **Sanpham Filters**
```graphql
filter: {
  search: "keyword"
  isActive: true
  dvt: "cuốn"                 # Đơn vị tính
  minPrice: 10000             # Giá tối thiểu
  maxPrice: 500000            # Giá tối đa
}
```

### **Khachhang Filters**
```graphql
filter: {
  search: "keyword"
  isActive: true
  loaikh: "retail"            # Loại khách hàng
  quan: "Quận 1"              # Quận/huyện
  hiengia: true               # Hiện giá hay không
}
```

### **User Filters**
```graphql
filter: {
  search: "keyword"
  isActive: true
  provider: "google"          # Provider đăng nhập
}
```

## 📋 **Sort Options**

```graphql
sort: {
  field: "createdAt"          # Field để sort
  direction: "desc"           # "asc" hoặc "desc"
}
```

**Common sort fields:**
- `createdAt` - Ngày tạo
- `updatedAt` - Ngày cập nhật  
- `name` - Tên
- `title` - Tiêu đề
- `order` - Thứ tự

**Sanpham sort fields:**
- `giaban` - Giá bán
- `giagoc` - Giá gốc
- `soluong` - Số lượng
- `masp` - Mã sản phẩm

**Khachhang sort fields:**
- `makh` - Mã khách hàng
- `tenkh` - Tên khách hàng

## 🔐 **Authentication**

Tất cả GraphQL operations đều yêu cầu JWT token:

```javascript
// Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

## ⚡ **Performance Tips**

### 1. **Pagination**
- Luôn sử dụng pagination cho large datasets
- Khuyến nghị pageSize <= 50

### 2. **Field Selection**
- Chỉ request các fields cần thiết
- Tránh deep nested queries không cần thiết

### 3. **Filtering**
- Sử dụng specific filters thay vì search tổng quát
- Combine multiple filters cho kết quả tối ưu

### 4. **Caching**
- Client nên implement caching cho frequently accessed data
- Use cache-first policies where appropriate

## 🚨 **Error Handling**

API sẽ trả về các loại errors:

### **GraphQL Errors**
```json
{
  "errors": [
    {
      "message": "User with ID abc not found",
      "extensions": {
        "code": "NOT_FOUND"
      }
    }
  ]
}
```

### **Validation Errors**
```json
{
  "errors": [
    {
      "message": "Error creating sanpham: masp already exists",
      "extensions": {
        "code": "BAD_REQUEST"
      }
    }
  ]
}
```

## 🧪 **Testing Examples**

### **Test Connection**
```graphql
query TestConnection {
  users(pagination: { page: 1, pageSize: 1 }) {
    pagination {
      total
    }
  }
}
```

### **Test Create & Update Flow**
```graphql
# 1. Create
mutation {
  createSanpham(input: {
    title: "Test Product"
    masp: "TEST001"
    giaban: 50000
  }) {
    id
    title
    masp
  }
}

# 2. Update (use ID from step 1)
mutation {
  updateSanpham(input: {
    id: "ID_FROM_STEP_1"
    title: "Updated Test Product"
    giaban: 60000
  }) {
    id
    title
    giaban
    updatedAt
  }
}

# 3. Delete
mutation {
  deleteSanpham(id: "ID_FROM_STEP_1")
}
```

## 📚 **More Examples**

### **Complex Query với Multiple Relations**
```graphql
query ComplexQuery {
  khachhangs(
    pagination: { page: 1, pageSize: 5 }
    filter: { isActive: true }
  ) {
    data {
      id
      name
      makh
      banggia {
        title
        sanpham {
          sanpham {
            title
            giaban
          }
        }
      }
      donhang {
        id
        madonhang
        tongtien
        sanpham {
          sldat
          ttgiao
          sanpham {
            title
          }
        }
      }
    }
  }
}
```

## 🎯 **Best Practices**

1. **Always use pagination** cho large datasets
2. **Implement proper error handling** trong client
3. **Use specific filters** thay vì broad search
4. **Cache frequently accessed data**
5. **Monitor query performance** và optimize khi cần
6. **Use field selection** để giảm payload size
7. **Implement rate limiting** cho production

## 🔗 **Resources**

- **GraphQL Playground**: `http://localhost:3000/graphql`
- **Schema Documentation**: Auto-generated trong playground
- **API Status**: `http://localhost:3000/health`

---

**🎉 GraphQL Universal API sẵn sàng sử dụng! Happy coding! 🚀**
