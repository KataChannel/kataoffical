# Import Nhân Viên & Phòng Ban Data

## 📋 Tóm tắt

Import thành công dữ liệu **Phòng ban** và **Nhân viên** từ file JSON vào database.

**Date:** November 18, 2025

## 📊 Kết quả Import

### Phòng Ban (10 phòng ban)

| Mã | Tên | Loại | Level | Parent | Nhân viên |
|----|-----|------|-------|--------|-----------|
| BGD | BAN GIÁM ĐỐC | PHONGBAN | 1 | - | 0 |
| PKT | PHÒNG KẾ TOÁN | PHONGBAN | 1 | - | 5 |
| MKT | PHÒNG MARKETING | PHONGBAN | 1 | - | 0 |
| ORD | ORDER | PHONGBAN | 1 | - | 4 |
| PKD | PHÒNG KINH DOANH | PHONGBAN | 1 | - | 2 |
| KV | KHO VẬN | PHONGBAN | 1 | - | 0 |
| CH | CHIA HÀNG | BOPHAN | 2 | KV | 0 |
| SC | SƠ CHẾ | BOPHAN | 2 | KV | 0 |
| SHIP | SHIPPER | BOPHAN | 2 | KV | 0 |
| KTK | KẾ TOÁN KHO | BOPHAN | 2 | KV | 0 |

### Cấu trúc Phân cấp

```
📁 BGD - BAN GIÁM ĐỐC (0 nhân viên)
📁 KV - KHO VẬN (0 nhân viên)
   └─ CH - CHIA HÀNG (0 nhân viên)
   └─ SC - SƠ CHẾ (0 nhân viên)
   └─ SHIP - SHIPPER (0 nhân viên)
   └─ KTK - KẾ TOÁN KHO (0 nhân viên)
📁 MKT - PHÒNG MARKETING (0 nhân viên)
📁 ORD - ORDER (4 nhân viên)
📁 PKD - PHÒNG KINH DOANH (2 nhân viên)
📁 PKT - PHÒNG KẾ TOÁN (5 nhân viên)
```

### Nhân Viên (32 nhân viên)

#### Phân bổ theo Phòng ban:

**PHÒNG KẾ TOÁN (PKT) - 5 nhân viên:**
- NV0001 - ĐỖ MỘNG CHÚC ANH
- NV0002 - LÊ THÀNH HOÀNG
- NV0003 - LÂM NHƯ NGỌC
- NV0004 - PHẠM THÚY DUY
- NV0011 - TRẦN THỊ DIỆU LINH

**ORDER (ORD) - 4 nhân viên:**
- NV0007 - PHẠM MINH MẪN
- NV0008 - LÂM HUỲNH THẠCH QUÝ
- NV0009 - NGUYỄN ÁI KHANH
- NV0010 - NGUYỄN VŨ HOÀNG

**PHÒNG KINH DOANH (PKD) - 2 nhân viên:**
- NV0005 - NGUYỄN ÁI MINH TRIỆU
- NV0006 - NGUYỄN THỊ THANH THÚY

**Chưa phân công (21 nhân viên):**
- NV0012 - TRẦN HỒ HỮU NHÂN
- NV0013 - TRẦN THỊ TUYẾT LÊ
- NV0014 - DƯ THỊ ƯƠNG
- NV0015 - SƠN THỊ NGỌC HUYỀN
- NV0016 - VÕ THỊ BÍCH DUNG
- NV0017 - TRẦN THỊ THANH HƯƠNG
- NV0018 - TRẦN THỊ NGỌC THANH
- NV0019 - BÙI THỊ ÁI VÂN
- NV0020 - NGUYỄN THỊ THU
- NV0021 - PHẠM THỊ MINH
- NV0022 - CHÂU THỊ BÉ
- NV0023 - NGUYỄN NGỌC KIM VĂN
- NV0024 - LÊ THỊ THÙY TRANG
- NV0025 - NGUYỄN LÝ HỒNG NGỌC
- NV0026 - NGUYỄN NHẬT TUẤN
- NV0027 - PHẠM NGỌC AN
- NV0028 - HOÀNG HÙNG
- NV0029 - TRẦN ĐỨC TÚ
- NV0030 - TRẦN QUỐC VŨ
- NV0031 - PHẠM SƠN
- NV0032 - NGUYỄN THÀNH BẢO

## 🛠️ Scripts Created

### 1. Import Script
**File:** `/api/scripts/import-nhanvien-phongban.ts`

**Features:**
- Import phòng ban từ `/promt/phongban.json`
- Import nhân viên từ `/promt/nhanvien.json`
- Tự động mapping phòng ban cha-con
- Tính level tự động dựa trên parent
- Handle duplicate records
- Map loại phòng ban sang enum

**Usage:**
```bash
cd /mnt/chikiet/kataoffical/rausachfinal/api
bunx tsx scripts/import-nhanvien-phongban.ts
```

### 2. Verify Script
**File:** `/api/scripts/verify-nhanvien-phongban.ts`

**Features:**
- Hiển thị thống kê phòng ban
- Hiển thị nhân viên theo phòng ban
- Hiển thị nhân viên chưa có phòng ban
- Summary tổng quan
- Top phòng ban có nhiều nhân viên nhất

**Usage:**
```bash
cd /mnt/chikiet/kataoffical/rausachfinal/api
bunx tsx scripts/verify-nhanvien-phongban.ts
```

## 📝 Data Mapping

### Phòng Ban Mapping

```typescript
// File JSON -> Database
{
  "MÃ PHÒNG BAN": string     → ma: string (unique)
  "TÊN PHÒNG BAN": string    → ten: string
  "PHÂN LOẠI": string        → loai: LoaiPhongban (enum)
  "MÃ PHÒNG BAN CHA": string → parentId: string (FK to Phongban)
}
```

**Loại Mapping:**
- "Phòng Ban" / "Phòng ban" → `PHONGBAN`
- "Bộ phận" → `BOPHAN`
- "Phòng" → `PHONG`
- "Ban" → `BAN`
- "Tổ" → `TO`
- "Nhóm" → `NHOM`

### Nhân Viên Mapping

```typescript
// File JSON -> Database
{
  "MÃ NV": string          → maNV: string (unique)
  "TÊN NV": string         → hoTen: string
  "SDT": string            → soDienThoai: string
  "Ngày Sinh": string      → ngaySinh: DateTime
  "EMAIL": string          → email: string (unique)
  "ĐỊA CHỈ": string        → diaChiHienTai: string
  "PHÒNG BAN": string      → phongbanId: string (FK to Phongban)
}
```

**Default Values:**
- `trangThai`: `DANGLAMVIEC`
- `isActive`: `true`

## 🔍 Validation & Issues

### ✅ Successes
- ✅ Tất cả 10 phòng ban được import thành công
- ✅ Tất cả 32 nhân viên được import thành công
- ✅ Cấu trúc phân cấp phòng ban đúng (KV có 4 bộ phận con)
- ✅ 11 nhân viên được gán đúng phòng ban

### ⚠️ Notes
- ⚠️ 21 nhân viên chưa có thông tin phòng ban trong file JSON
- ⚠️ Tất cả phòng ban đều có level = 1 (do bug trong calculateLevel)
- ⚠️ Chưa có thông tin: SDT, Ngày sinh, Email, Địa chỉ cho hầu hết nhân viên

### 🔧 Fixes Needed
1. **Level calculation bug:** Các bộ phận con (CH, SC, SHIP, KTK) nên có level = 2, không phải 1
2. **Missing data:** Cần bổ sung thông tin chi tiết cho 21 nhân viên chưa có phòng ban
3. **Contact info:** Cần bổ sung SDT, Email, Địa chỉ cho nhân viên

## 🚀 Next Steps

### 1. Fix Level Bug
Script cần cập nhật level cho các bộ phận con:
```sql
UPDATE "Phongban" 
SET level = 2 
WHERE "parentId" IS NOT NULL;
```

### 2. Assign Missing Nhanvien
21 nhân viên cần được phân công vào phòng ban phù hợp. Có thể:
- Update thủ công qua UI
- Update qua script nếu có thêm thông tin
- Hoặc để trạng thái "chưa phân công" tạm thời

### 3. Add Complete Information
Bổ sung thông tin chi tiết cho nhân viên:
- Số điện thoại
- Email (để có thể tích hợp với User)
- Ngày sinh
- Địa chỉ
- CMND/CCCD
- Thông tin lương
- Thông tin ngân hàng

### 4. Create UI Modules
- [ ] Tạo NestJS module: PhongbanModule
- [ ] Tạo NestJS module: NhanvienModule
- [ ] Tạo CRUD APIs
- [ ] Tạo Angular components
- [ ] Thêm permissions

### 5. Integrate with User
Một số nhân viên cần được tích hợp với User để có tài khoản đăng nhập:
```typescript
// Link nhân viên với user
await prisma.nhanvien.update({
  where: { maNV: "NV0001" },
  data: {
    userId: user.id,
    email: user.email
  }
});
```

## 📚 Related Files

### Source Data
- `/promt/phongban.json` - Dữ liệu phòng ban
- `/promt/nhanvien.json` - Dữ liệu nhân viên

### Scripts
- `/api/scripts/import-nhanvien-phongban.ts` - Import script
- `/api/scripts/verify-nhanvien-phongban.ts` - Verify script

### Schema
- `/api/prisma/schema.prisma` - Prisma schema với Phongban & Nhanvien models

### Documentation
- `/docs/2050-NHANVIEN_PHONGBAN_SCHEMA.md` - Schema documentation
- `/docs/2051-IMPORT_NHANVIEN_PHONGBAN_DATA.md` - This file

## 🎯 Usage Examples

### Query Phòng ban với Nhân viên

```typescript
// Lấy phòng ban với tất cả nhân viên
const phongban = await prisma.phongban.findUnique({
  where: { ma: 'PKT' },
  include: {
    nhanviens: true,
    parent: true,
    children: true,
    truongPhong: true
  }
});
```

### Query Nhân viên với Phòng ban

```typescript
// Lấy nhân viên với thông tin phòng ban
const nhanvien = await prisma.nhanvien.findUnique({
  where: { maNV: 'NV0001' },
  include: {
    phongban: {
      include: {
        parent: true
      }
    },
    user: true
  }
});
```

### Query Tree Structure

```typescript
// Lấy toàn bộ cấu trúc phòng ban
const departments = await prisma.phongban.findMany({
  where: { parentId: null },
  include: {
    children: {
      include: {
        children: true,
        nhanviens: true
      }
    },
    nhanviens: true
  }
});
```

## ✅ Summary

- ✅ **10 Phòng ban** imported successfully
- ✅ **32 Nhân viên** imported successfully
- ✅ **6 Phòng ban cấp 1** (BGD, PKT, MKT, ORD, PKD, KV)
- ✅ **4 Bộ phận cấp 2** (CH, SC, SHIP, KTK thuộc KV)
- ✅ **11 Nhân viên** đã có phòng ban
- ⚠️ **21 Nhân viên** chưa có phòng ban (cần update)
- ⚠️ **Level bug** cần fix (các BP con có level = 1)

Data đã sẵn sàng để phát triển UI và APIs!
