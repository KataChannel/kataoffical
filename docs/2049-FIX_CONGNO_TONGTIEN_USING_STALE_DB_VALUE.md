# Bug Fix: Công Nợ Khách Hàng Using Stale tongtien from Database

## 📋 Tóm tắt

Fixed bug where "Công Nợ Khách Hàng" (customer debt) report displayed incorrect `tongtien` because it fetched the value directly from the database instead of recalculating from current `slnhan` values.

## 🐛 Vấn đề

User báo cáo: "kiểm tra và fix đơn hàng có mã TG-AA10771 sửa slnhan bất kỳ tontien donhang bên công nợ khách hàng vẫn về giá trị 2,213,505 là bị sao?"

### Root Cause Analysis

API `congnokhachhang()` có **inconsistency** trong cách tính toán:

**Line 323-326** - Tính `tong` từ `slnhan` hiện tại (ĐÚNG):
```typescript
for (const item of donhang.sanpham) {
  const slnhan = Number(item.slnhan) || 0;
  if (slnhan === 0) continue;
  
  const giaban = Number(item.giaban) || 0;
  tong += slnhan * giaban;  // ✅ Tính từ slnhan hiện tại
  soluong += slnhan;
}
```

**Line 336-337** - Lấy `tongtien` từ database (SAI):
```typescript
return {
  tong: tong.toFixed(3),           // ✅ Tính từ slnhan
  tongtien: donhang.tongtien,      // ❌ Lấy từ DB (có thể cũ)
  tongvat: donhang.tongvat,        // ❌ Lấy từ DB (có thể cũ)
};
```

### Kịch bản Bug

```
1. Đơn hàng TG-AA10771 có tongtien = 2,213,505 trong DB
2. User update slnhan → tong được tính lại → giả sử = 2,500,000
3. Nhưng tongtien vẫn hiển thị = 2,213,505 (giá trị cũ từ DB)
4. Frontend hiển thị tongtien (2,213,505), không phải tong (2,500,000)
```

### Ví dụ Cụ thể

**Trạng thái ban đầu:**
```
Sản phẩm A: slnhan=10, giaban=100,000 → ttnhan=1,000,000
Sản phẩm B: slnhan=20, giaban=60,000  → ttnhan=1,200,000
VAT = 5%

tong = 2,200,000
tongvat = 110,000
tongtien = 2,310,000 (lưu trong DB)
```

**User update slnhan của Sản phẩm A từ 10 → 5:**
```
Backend update():
- donhangsanpham.slnhan = 5
- donhangsanpham.ttnhan = 500,000
- Nhưng CHƯA update donhang.tongtien (do bug trước đó)

Backend congnokhachhang():
- Tính tong = 500,000 + 1,200,000 = 1,700,000 ✅
- Trả về tongtien = 2,310,000 (từ DB) ❌

Frontend hiển thị: 2,310,000 (SAI!)
```

## ✅ Giải pháp

Tính lại `tongvat` và `tongtien` từ `tong` (đã được tính từ `slnhan` hiện tại) thay vì lấy từ database.

### File: `/api/src/donhang/donhang.service.ts`

#### 1. Added `vat` to Select Query

**Location:** Line ~289-310

**Before:**
```typescript
const donhangs = await this.prisma.donhang.findMany({
  where: whereConditions,
  select: {
    id: true,
    madonhang: true,
    ngaygiao: true,
    tongtien: true,
    tongvat: true,
    // vat not selected
    khachhang: { ... },
    sanpham: { ... },
  },
});
```

**After:**
```typescript
const donhangs = await this.prisma.donhang.findMany({
  where: whereConditions,
  select: {
    id: true,
    madonhang: true,
    ngaygiao: true,
    tongtien: true,
    tongvat: true,
    vat: true, // 🔥 Thêm vat để tính lại tongtien từ tong
    khachhang: { ... },
    sanpham: { ... },
  },
});
```

#### 2. Recalculate tongvat and tongtien from tong

**Location:** Line ~314-345

**Before:**
```typescript
// Process results efficiently
const result = donhangs.map((donhang) => {
  let tong = 0;
  let soluong = 0;

  // Calculate totals efficiently without parseFloat overhead
  // 🔥 Loại bỏ sản phẩm có slnhan = 0
  for (const item of donhang.sanpham) {
    const slnhan = Number(item.slnhan) || 0;
    
    // Skip items with zero received quantity
    if (slnhan === 0) continue;
    
    const giaban = Number(item.giaban) || 0;
    tong += slnhan * giaban;
    soluong += slnhan;
  }

  return {
    id: donhang.id,
    madonhang: donhang.madonhang,
    ngaygiao: donhang.ngaygiao,
    tong: tong.toFixed(3),
    soluong: soluong.toFixed(3),
    tongtien: donhang.tongtien,  // ❌ Lấy từ DB
    tongvat: donhang.tongvat,    // ❌ Lấy từ DB
    name: donhang.khachhang?.name,
    makh: donhang.khachhang?.makh,
  };
});
```

**After:**
```typescript
// Process results efficiently
const result = donhangs.map((donhang) => {
  let tong = 0;
  let soluong = 0;

  // Calculate totals efficiently without parseFloat overhead
  // 🔥 Loại bỏ sản phẩm có slnhan = 0
  for (const item of donhang.sanpham) {
    const slnhan = Number(item.slnhan) || 0;
    
    // Skip items with zero received quantity
    if (slnhan === 0) continue;
    
    const giaban = Number(item.giaban) || 0;
    tong += slnhan * giaban;
    soluong += slnhan;
  }

  // 🔥 BUGFIX: Tính lại tongvat và tongtien từ tong (đã tính từ slnhan)
  // Thay vì lấy trực tiếp từ DB (có thể cũ)
  const vatRate = Number(donhang.vat) || 0;
  const tongvat = tong * vatRate;
  const tongtien = tong + tongvat;

  return {
    id: donhang.id,
    madonhang: donhang.madonhang,
    ngaygiao: donhang.ngaygiao,
    tong: tong.toFixed(3),
    soluong: soluong.toFixed(3),
    tongtien: parseFloat(tongtien.toFixed(3)),  // ✅ Tính từ tong
    tongvat: parseFloat(tongvat.toFixed(3)),    // ✅ Tính từ tong
    name: donhang.khachhang?.name,
    makh: donhang.khachhang?.makh,
  };
});
```

## 🔍 Công thức tính

```typescript
// Step 1: Tính tong từ slnhan hiện tại (loại bỏ slnhan = 0)
tong = sum(giaban × slnhan) where slnhan > 0

// Step 2: Tính tongvat từ tong
tongvat = tong × vatRate

// Step 3: Tính tongtien
tongtien = tong + tongvat
```

## 📊 Impact

### Before Fix
- ❌ `tongtien` hiển thị giá trị cũ từ database
- ❌ `tongvat` hiển thị giá trị cũ từ database
- ❌ Không nhất quán với `tong` (đã được tính từ slnhan hiện tại)
- ❌ User thấy số liệu không đúng trong báo cáo công nợ

### After Fix
- ✅ `tongtien` được tính lại từ `slnhan` hiện tại
- ✅ `tongvat` được tính lại từ `slnhan` hiện tại
- ✅ Nhất quán với `tong`
- ✅ Báo cáo công nợ hiển thị số liệu chính xác

## 🧪 Test Scenarios

### Scenario 1: Đơn hàng có DB tongtien cũ

**Setup:**
```
DB: tongtien = 2,213,505 (cũ)
Actual: slnhan đã thay đổi → tong = 2,500,000
```

**Before fix:**
```
API trả về: tongtien = 2,213,505 (từ DB)
Frontend hiển thị: 2,213,505 ❌
```

**After fix:**
```
API trả về: tongtien = 2,625,000 (2,500,000 + 5% VAT)
Frontend hiển thị: 2,625,000 ✅
```

### Scenario 2: Loại bỏ sản phẩm slnhan = 0

**Setup:**
```
Sản phẩm A: slnhan=10, giaban=100,000
Sản phẩm B: slnhan=0, giaban=50,000 (bỏ qua)
VAT = 5%
```

**Result:**
```
tong = 1,000,000 (chỉ tính A)
tongvat = 50,000
tongtien = 1,050,000 ✅
```

## 🔗 Related Issues

- Doc 2043: Filter slnhan=0 from congnokhachhang reports
- Doc 2046: Fix tongtien update for danhan status
- Doc 2048: Fix tongtien using stale slnhan data

## 🎯 Why This Fix is Important

1. **Data Consistency:** Đảm bảo `tong`, `tongvat`, `tongtien` đều được tính từ cùng một nguồn (`slnhan` hiện tại)

2. **Accurate Reporting:** Báo cáo công nợ hiển thị số liệu chính xác, không bị ảnh hưởng bởi giá trị cũ trong DB

3. **Real-time Reflection:** Mọi thay đổi về `slnhan` đều được phản ánh ngay lập tức trong báo cáo

4. **No DB Sync Required:** Không cần đợi DB được cập nhật (qua update/dongbogia), báo cáo luôn đúng

## ✨ Summary

**Bug:** Báo cáo công nợ khách hàng hiển thị `tongtien` cũ từ database thay vì tính từ `slnhan` hiện tại.

**Root Cause:** API tính `tong` từ `slnhan` nhưng lại trả về `tongtien` từ DB (không nhất quán).

**Fix:** Tính lại `tongvat` và `tongtien` từ `tong` (đã tính từ `slnhan`) để đảm bảo tính nhất quán.

**Impact:** Báo cáo công nợ giờ luôn hiển thị số liệu chính xác dựa trên `slnhan` hiện tại.
