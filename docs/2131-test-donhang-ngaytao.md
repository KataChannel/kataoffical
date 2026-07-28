# Kiểm tra Ngày Tạo Đơn Hàng

## 📋 Tóm tắt:

Khi tạo đơn hàng mới trong hệ thống, **KHÔNG CÓ** trường `ngayTao` riêng biệt.

## 🗓️ Các trường ngày tháng trong Donhang:

### 1. **`createdAt`** (Ngày tạo đơn - TỰ ĐỘNG)
- **Type:** `DateTime`
- **Default:** `@default(now())`
- **Giá trị:** Thời điểm tạo record trong database
- **Nguồn:** Database tự động set = server time hiện tại
- **Timezone:** UTC (mặc định của PostgreSQL)

### 2. **`ngaygiao`** (Ngày giao hàng - DO USER NHẬP)
- **Type:** `DateTime?` (nullable)
- **Default:** Không có
- **Giá trị:** Do người dùng chọn khi tạo đơn
- **Nguồn:** Frontend truyền vào qua DTO

### 3. **`updatedAt`** (Ngày cập nhật - TỰ ĐỘNG)
- **Type:** `DateTime`
- **Default:** `@updatedAt`
- **Giá trị:** Thời điểm update record
- **Nguồn:** Database tự động update

---

## 💻 Code Implementation:

### Backend (API) - `donhang.service.ts`:

```typescript
async create(dto: any) {
  return this.prisma.$transaction(async (prisma) => {
    const newDonhang = await prisma.donhang.create({
      data: {
        title: dto.title,
        type: dto.type || 'donsi',
        madonhang: madonhang,
        ngaygiao: new Date(dto.ngaygiao), // ← User input (delivery date)
        khachhangId: dto.khachhangId,
        // ... other fields
        // createdAt: NOT SPECIFIED - auto set by DB to NOW()
      },
    });
    
    return newDonhang;
  });
}
```

**Lưu ý:** 
- Không truyền `createdAt` vào `data` object
- Database tự động set `createdAt = NOW()` tại thời điểm insert

---

## ⏰ Về Timezone:

### Prisma + PostgreSQL behavior:
1. **Khi INSERT:**
   ```sql
   INSERT INTO "Donhang" (..., "createdAt") 
   VALUES (..., NOW()); -- NOW() = current timestamp in UTC
   ```

2. **Khi Query:**
   ```typescript
   const donhang = await prisma.donhang.findUnique({ where: { id } });
   console.log(donhang.createdAt); // JavaScript Date object (UTC)
   ```

3. **Frontend display:**
   - Nếu hiển thị trực tiếp: Sẽ convert sang local timezone của browser
   - Nếu format: Cần specify timezone explicitly

---

## 🔍 Kiểm tra thực tế:

### Test query để xem giá trị `createdAt`:

```sql
SELECT 
  madonhang,
  ngaygiao,
  "createdAt",
  "updatedAt",
  "createdAt" AT TIME ZONE 'Asia/Ho_Chi_Minh' as createdAt_VN
FROM "Donhang"
ORDER BY "createdAt" DESC
LIMIT 5;
```

### Expected result:
```
madonhang | ngaygiao   | createdAt           | createdAt_VN
----------|------------|---------------------|---------------------
DH0001    | 2025-01-20 | 2025-01-18 03:30:00 | 2025-01-18 10:30:00
          |            | (UTC)               | (GMT+7)
```

---

## ✅ Kết luận:

**Khi tạo đơn hàng mới:**

1. **`ngaygiao`** = Ngày user chọn (ví dụ: "2025-01-20")
2. **`createdAt`** = Server time hiện tại tại thời điểm tạo đơn (UTC)
   - Nếu server ở VN và time = 10:30 AM (GMT+7)
   - Database lưu = 03:30 AM (UTC)
   - Frontend hiển thị = 10:30 AM (browser timezone)

3. **KHÔNG CÓ** trường `ngayTao` riêng

---

## 🛠️ Nếu muốn thêm trường `ngayTao`:

### Option 1: Dùng `createdAt` (recommended)
```typescript
// Đã có sẵn, không cần làm gì
const donhang = await prisma.donhang.findUnique({ where: { id } });
const ngayTao = donhang.createdAt; // Already available
```

### Option 2: Thêm field mới `ngayTao` (not recommended)
```prisma
model Donhang {
  // ... existing fields
  ngayTao   DateTime  @default(now())  // ← Duplicate of createdAt
  createdAt DateTime  @default(now())  // ← Already have this
}
```

**❌ Không nên:** Vì đã có `createdAt` rồi, tạo thêm `ngayTao` là duplicate data.

---

## 📊 So sánh:

| Trường      | Mục đích                 | Giá trị                    | Nguồn         |
|-------------|--------------------------|----------------------------|---------------|
| `ngaygiao`  | Ngày giao hàng (kế hoạch)| User chọn (future date)    | Frontend      |
| `createdAt` | Ngày tạo đơn (thực tế)   | Server time (now)          | Database auto |
| `updatedAt` | Ngày sửa đổi cuối        | Last modified time         | Database auto |

---

## 🎯 Recommendation:

**Sử dụng `createdAt` cho "ngày tạo đơn"** vì:
- ✅ Đã có sẵn trong schema
- ✅ Tự động set bởi database
- ✅ Không thể sửa đổi (immutable)
- ✅ Standard convention (Prisma/TypeORM đều dùng `createdAt`)

Nếu cần hiển thị trên UI:
```typescript
// Frontend
formatNgayTao(donhang: any): string {
  return new Date(donhang.createdAt).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}
```
