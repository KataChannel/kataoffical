# Tìm kiếm trong oldValues/newValues - AuditLog

## 📋 Tổng quan

Tính năng cho phép tìm kiếm nội dung bên trong các trường JSON `oldValues` và `newValues` của AuditLog.

## 🎯 Cấu trúc Model

### AuditLog Schema (Prisma)

```prisma
model AuditLog {
  id            String      @id @default(uuid())
  entityName    String?     // Tên module/entity
  entityId      String?     // ID của đối tượng
  action        AuditAction // CREATE, UPDATE, DELETE, etc.
  userId        String?
  userEmail     String?
  oldValues     Json?       // ⭐ Giá trị cũ (JSON)
  newValues     Json?       // ⭐ Giá trị mới (JSON)
  changedFields String[]    // Các trường đã thay đổi
  ipAddress     String?
  userAgent     String?
  sessionId     String?
  metadata      Json?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  status        String      @default("SUCCESS")
  errorDetails  Json?
  user          User?       @relation(fields: [userId], references: [id])

  @@index([entityName, entityId])
  @@index([userId])
  @@index([createdAt])
  @@index([action])
  @@index([status])
}
```

## 🔧 Backend Implementation

### Service Method (auditlog.service.ts)

```typescript
// Search in oldValues or newValues JSON fields
// This uses PostgreSQL's JSON operators
if (where.searchValue) {
  whereClause.OR = [
    {
      oldValues: {
        path: [],
        string_contains: where.searchValue
      }
    },
    {
      newValues: {
        path: [],
        string_contains: where.searchValue
      }
    }
  ];
}
```

### PostgreSQL JSON Search

Prisma sử dụng PostgreSQL JSON operators:
- `string_contains`: Tìm kiếm chuỗi con trong JSON
- Tìm kiếm trong cả `oldValues` OR `newValues`
- Case-sensitive tùy thuộc vào PostgreSQL collation

## 🎨 Frontend Implementation

### HTML Template

```html
<div class="relative w-full lg:w-64">
  <input type="text" 
    placeholder="Tìm trong dữ liệu..." 
    [(ngModel)]="searchValue" 
    (keyup.enter)="applySearch()"
    matTooltip="Tìm kiếm trong oldValues/newValues"
    class="...">
  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <span class="material-symbols-outlined text-gray-500">search</span>
  </div>
</div>
```

### TypeScript Component

```typescript
// Variable
searchValue: string = '';

// Apply search
async applySearch() {
  this.param = {};
  
  if (this.searchValue && this.searchValue.trim()) {
    this.param.searchValue = this.searchValue.trim();
  }
  
  await this._AuditlogService.getAuditlogBy(this.param);
}

// Clear filters
async clearFilters() {
  this.searchValue = '';
  // ... reset other filters
}
```

## 📖 Cách sử dụng

### 1. Tìm kiếm đơn giản

**Ví dụ:** Tìm tất cả logs có chứa "sanpham"

```
Input: "sanpham"
→ Tìm trong oldValues và newValues
→ Trả về tất cả records có "sanpham" trong JSON
```

### 2. Tìm kiếm email

**Ví dụ:** Tìm logs có email cụ thể

```
Input: "user@example.com"
→ Tìm logs có email này trong oldValues/newValues
```

### 3. Tìm kiếm giá trị số

**Ví dụ:** Tìm logs có giá 50000

```
Input: "50000"
→ Tìm logs có số này trong JSON
```

### 4. Tìm kiếm kết hợp với filters

**Ví dụ:** Tìm trong module "donhang" có chứa "khachhang"

```
Module: "donhang"
Tìm trong dữ liệu: "khachhang"
→ Tìm trong donhang logs có "khachhang" trong JSON
```

## 🎯 Use Cases thực tế

### Use Case 1: Tìm thay đổi giá sản phẩm

```
Tình huống: Tìm tất cả logs có thay đổi giá 100000
Input: "100000"
Kết quả: Tất cả logs có giá này trong oldValues hoặc newValues
```

### Use Case 2: Tìm thay đổi trạng thái

```
Tình huống: Tìm logs có thay đổi status thành "hoanthanh"
Input: "hoanthanh"
Action: "UPDATE"
Kết quả: Tất cả UPDATE logs có status "hoanthanh"
```

### Use Case 3: Tìm thay đổi của khách hàng

```
Tình huống: Tìm tất cả thay đổi liên quan đến khách hàng "KH001"
Module: "khachhang"
Input: "KH001"
Kết quả: Tất cả logs khachhang có mã "KH001"
```

### Use Case 4: Audit trail cho đơn hàng

```
Tình huống: Tìm tất cả thay đổi của đơn hàng "DH12345"
Module: "donhang"
Input: "DH12345"
Ngày: 01/11/2025 - 05/11/2025
Kết quả: Lịch sử thay đổi đơn hàng trong khoảng thời gian
```

## 🔍 Ví dụ dữ liệu

### Ví dụ 1: UPDATE Sản phẩm

```json
{
  "id": "uuid-123",
  "entityName": "sanpham",
  "entityId": "sp-001",
  "action": "UPDATE",
  "oldValues": {
    "title": "Sản phẩm A",
    "giaban": 50000,
    "isActive": true
  },
  "newValues": {
    "title": "Sản phẩm A",
    "giaban": 60000,
    "isActive": true
  },
  "changedFields": ["giaban"]
}
```

**Tìm kiếm:**
- Input: `"50000"` → Found in oldValues ✓
- Input: `"60000"` → Found in newValues ✓
- Input: `"Sản phẩm A"` → Found in both ✓
- Input: `"giaban"` → Not found (changedFields không được search)

### Ví dụ 2: CREATE Đơn hàng

```json
{
  "id": "uuid-456",
  "entityName": "donhang",
  "entityId": "dh-001",
  "action": "CREATE",
  "oldValues": null,
  "newValues": {
    "madonhang": "DH12345",
    "khachhangId": "kh-001",
    "tongtien": 500000,
    "status": "dadat"
  }
}
```

**Tìm kiếm:**
- Input: `"DH12345"` → Found in newValues ✓
- Input: `"kh-001"` → Found in newValues ✓
- Input: `"500000"` → Found in newValues ✓
- Input: `"dadat"` → Found in newValues ✓

## ⚡ Performance

### Tối ưu hóa

1. **Index trên createdAt**: Giúp lọc theo ngày nhanh hơn
2. **Kết hợp filters**: Sử dụng module + action để giảm số records scan
3. **Limit search term**: Tìm kiếm term ngắn gọn, cụ thể
4. **Date range**: Luôn sử dụng khoảng ngày khi có thể

### Best Practices

```typescript
// ✅ GOOD: Specific search with filters
{
  entityName: "donhang",
  action: "UPDATE", 
  searchValue: "DH12345",
  createdAtFrom: "2025-11-01",
  createdAtTo: "2025-11-05"
}

// ❌ BAD: Too broad
{
  searchValue: "a"  // Too short, returns too many results
}

// ❌ BAD: No date range on large dataset
{
  searchValue: "giaban"  // Scans entire table
}
```

## 🧪 Testing

### Test với curl

```bash
curl -X POST http://localhost:3000/auditlog/findby \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "searchValue": "sanpham",
    "pageSize": 20,
    "page": 1
  }'
```

### Test với TypeScript

```bash
cd /mnt/chikiet/kataoffical/rausachfinal/api
bun run test-json-search.ts YOUR_TOKEN
```

## 📊 API Response

```json
{
  "data": [
    {
      "id": "uuid",
      "entityName": "sanpham",
      "action": "UPDATE",
      "oldValues": { "giaban": 50000 },
      "newValues": { "giaban": 60000 },
      "createdAt": "2025-11-05T10:30:00.000Z",
      "user": {
        "email": "user@example.com"
      }
    }
  ],
  "page": 1,
  "pageSize": 20,
  "total": 45,
  "pageCount": 3
}
```

## 🎯 Kết hợp Filters

### Ví dụ search request hoàn chỉnh

```json
{
  "entityName": "donhang",          // Module filter
  "action": "UPDATE",               // Action filter
  "searchValue": "khachhang",       // JSON search
  "createdAtFrom": "2025-11-01",    // Date from
  "createdAtTo": "2025-11-05",      // Date to
  "page": 1,
  "pageSize": 50
}
```

Điều kiện WHERE được tạo:
```sql
WHERE 
  entityName ILIKE '%donhang%'
  AND action ILIKE '%UPDATE%'
  AND (
    oldValues::text ILIKE '%khachhang%' 
    OR newValues::text ILIKE '%khachhang%'
  )
  AND createdAt >= '2025-11-01 00:00:00'
  AND createdAt <= '2025-11-05 23:59:59.999'
```

## 💡 Tips & Tricks

1. **Tìm kiếm ID**: Dùng ID đầy đủ, không dùng partial
2. **Tìm kiếm email**: Tìm theo domain (@gmail.com) hoặc full email
3. **Tìm kiếm số**: Tìm chính xác giá trị số
4. **Tìm kiếm text**: Case-insensitive, có thể dùng partial
5. **Xuất Excel**: Kết quả search có thể xuất Excel để phân tích

## ⚠️ Lưu ý

1. **PostgreSQL JSON**: Chỉ hoạt động với PostgreSQL database
2. **Performance**: Search trong JSON chậm hơn indexed columns
3. **Case sensitivity**: Tùy PostgreSQL collation setting
4. **Null values**: oldValues/newValues có thể null (CREATE/DELETE)
5. **Large JSON**: JSON lớn có thể làm chậm query

---

**Version:** 1.0.0  
**Last Updated:** 2025-11-05  
**Author:** AuditLog Team
