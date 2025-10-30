# Script Chuyển Khách Hàng Giữa Bảng Giá

## 📝 Mô Tả
Script chuyển khách hàng từ bảng giá `BG24_2` sang bảng giá `BG24` bằng cách:
1. Ngắt kết nối tất cả khách hàng khỏi BG24_2
2. Kết nối các khách hàng vào BG24
3. Xác nhận kết quả migrate

---

## 🚀 Cách Chạy

### Cách 1: Chạy trực tiếp từ Node.js
```bash
cd /mnt/chikiet/kataoffical/rausachfinal/api

# Chạy script
node scripts/capnhatbanggia.js
```

### Cách 2: Chạy với ts-node (nếu cần)
```bash
cd /mnt/chikiet/kataoffical/rausachfinal/api

# Chạy script TypeScript
npx ts-node scripts/capnhatbanggia.js
```

---

## 📋 Output Mẫu

```
🔍 [MIGRATE] Bắt đầu migrate khách hàng từ BG24_2 sang BG24
═══════════════════════════════════════════════════════════

1️⃣ [SEARCH] Tìm kiếm banggia BG24_2...
✅ [FOUND] Tìm thấy banggia BG24_2
   ID: 693b9b8c-8d5a-462d-9e2a-826fdc81c589
   Title: Bảng Giá 24_2
   Số lượng khách hàng: 17

📋 [LIST] Danh sách khách hàng trong BG24_2:
   1. [KH001] Công Ty ABC | Email: abc@example.com | SĐT: 0123456789
   2. [KH002] Công Ty XYZ | Email: xyz@example.com | SĐT: 0987654321
   ...

2️⃣ [SEARCH] Tìm kiếm banggia BG24...
✅ [FOUND] Tìm thấy banggia BG24
   ID: 550e8400-e29b-41d4-a716-446655440000
   Title: Bảng Giá 24
   Số lượng khách hàng hiện tại: 5

3️⃣ [PREPARE] Chuẩn bị chuyển 17 khách hàng...

4️⃣ [DISCONNECT] Ngắt kết nối khách hàng khỏi BG24_2...
✅ [SUCCESS] Đã ngắt kết nối 17 khách hàng

5️⃣ [CONNECT] Kết nối khách hàng vào BG24...
✅ [SUCCESS] Đã kết nối 17 khách hàng

6️⃣ [VERIFY] Kiểm tra kết quả migrate...

═══════════════════════════════════════════════════════════
📊 [RESULT] KẾT QUẢ MIGRATE:
═══════════════════════════════════════════════════════════

📌 BG24_2 - Số khách hàng sau migrate: 0
   ✓ Không còn khách hàng (đã chuyển hết)

📌 BG24 - Số khách hàng sau migrate: 22
   Danh sách khách hàng:
   1. [KH001] Công Ty ABC
   2. [KH002] Công Ty XYZ
   ...
   22. [KH017] Công Ty QRS

═══════════════════════════════════════════════════════════
✅ ✅ ✅ MIGRATE HOÀN TẤT THÀNH CÔNG! ✅ ✅ ✅
═══════════════════════════════════════════════════════════
```

---

## ✅ Tính Năng

- ✅ Tìm kiếm bảng giá theo mabanggia
- ✅ Hiển thị danh sách khách hàng trước migrate
- ✅ Ngắt kết nối từ BG24_2
- ✅ Kết nối vào BG24
- ✅ Xác nhận kết quả (verify)
- ✅ Logging chi tiết từng bước
- ✅ Xử lý lỗi và báo cáo

---

## 🔍 Kiểm Tra Thủ Công

Nếu muốn kiểm tra thủ công bằng GraphQL:

```graphql
# Query BG24_2
query {
  findUnique(modelName: "banggia", where: { mabanggia: "BG24_2" }) {
    id
    mabanggia
    khachhang {
      id
      name
      makh
    }
  }
}

# Query BG24
query {
  findUnique(modelName: "banggia", where: { mabanggia: "BG24" }) {
    id
    mabanggia
    khachhang {
      id
      name
      makh
    }
  }
}
```

---

## ⚠️ Lưu Ý

1. **Backup trước**: Nên backup database trước khi chạy
2. **Kiểm tra tên**: Đảm bảo mabanggia chính xác (BG24_2 và BG24)
3. **Permissions**: Cần quyền truy cập database
4. **Reversible**: Nếu lỗi, có thể chạy ngược lại

---

## 🛠️ Troubleshooting

### Không tìm thấy BG24_2
```
❌ [ERROR] Không tìm thấy banggia với mabanggia = BG24_2
```
**Giải pháp**: Kiểm tra tên bảng giá trong database
```bash
# Query tất cả banggia
query { findMany(modelName: "banggia") { mabanggia } }
```

### Không tìm thấy BG24
Tương tự, kiểm tra xem BG24 có tồn tại không

### Connection Error
Đảm bảo:
- Database đang chạy
- `.env` có DATABASE_URL chính xác
- Prisma client khả dụng

---

**File**: `/api/scripts/capnhatbanggia.js`
**Created**: 2025-10-23
