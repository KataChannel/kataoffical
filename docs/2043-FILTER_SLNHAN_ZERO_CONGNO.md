# Update: Lọc bỏ sản phẩm slnhan = 0 trong báo cáo công nợ

**Ngày:** 2025-01-XX  
**Type:** 🔧 Enhancement - Business Logic  
**Status:** ✅ COMPLETED

---

## 📋 Yêu cầu

Báo cáo công nợ khách hàng cần **loại bỏ** các sản phẩm có `slnhan = 0` (số lượng nhận bằng 0).

**Lý do:**
- Sản phẩm có `slnhan = 0` nghĩa là khách hàng chưa nhận hàng
- Không nên tính vào công nợ vì không có giao dịch thực tế
- Tránh làm sai số liệu báo cáo công nợ

---

## 🔍 Các hàm được cập nhật

### 1. **`congnokhachhang()` - API trả về danh sách công nợ**

**Location:** `api/src/donhang/donhang.service.ts` - Line ~310

**Trước khi fix:**
```typescript
// Calculate totals efficiently without parseFloat overhead
for (const item of donhang.sanpham) {
  const slnhan = Number(item.slnhan) || 0;
  const giaban = Number(item.giaban) || 0;
  tong += slnhan * giaban;
  soluong += slnhan;
}
```

**Sau khi fix:**
```typescript
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
```

**Changes:**
- ✅ Thêm điều kiện `if (slnhan === 0) continue;`
- ✅ Chỉ tính toán sản phẩm có `slnhan > 0`
- ✅ Kết quả: `tong` và `soluong` chính xác hơn

---

### 2. **`downloadcongnokhachhang()` - Export Excel báo cáo công nợ**

**Location:** `api/src/donhang/donhang.service.ts` - Line ~389

**Trước khi fix:**
```typescript
const flatItems = donhangs.flatMap((v: any) => {
  return v.sanpham.map((v1: any) => {
    const product = Sanphams.find((sp: any) => sp.id === v1.idSP);
    const giaban = v1.giaban || 0;
    const vat: any = Number(product?.vat) || 0;
    const thanhtiensauvat = v1.slnhan * giaban * (1 + vat);
    
    return {
      // ... product data
      soluong: v1.slnhan,
      dongia: giaban,
      thanhtientruocvat: v1.slnhan * giaban,
      thanhtiensauvat: thanhtiensauvat,
      // ...
    };
  });
});
```

**Sau khi fix:**
```typescript
// 🔥 Loại bỏ sản phẩm có slnhan = 0
const flatItems = donhangs.flatMap((v: any) => {
  return v.sanpham
    .filter((v1: any) => {
      const slnhan = Number(v1.slnhan) || 0;
      return slnhan > 0; // Only include items with received quantity > 0
    })
    .map((v1: any) => {
      const product = Sanphams.find((sp: any) => sp.id === v1.idSP);
      const giaban = v1.giaban || 0;
      const vat: any = Number(product?.vat) || 0;
      const thanhtiensauvat = v1.slnhan * giaban * (1 + vat);
      
      return {
        // ... product data
        soluong: v1.slnhan,
        dongia: giaban,
        thanhtientruocvat: v1.slnhan * giaban,
        thanhtiensauvat: thanhtiensauvat,
        // ...
      };
    });
});
```

**Changes:**
- ✅ Thêm `.filter()` trước `.map()`
- ✅ Điều kiện filter: `slnhan > 0`
- ✅ Kết quả: File Excel chỉ chứa sản phẩm đã nhận

---

## 📊 Impact

### Before:
| Đơn hàng | Sản phẩm | slgiao | slnhan | Hiển thị trong báo cáo? |
|----------|----------|--------|--------|-------------------------|
| DH001 | SP A | 10 | 10 | ✅ Có |
| DH001 | SP B | 5 | 0 | ❌ Có (sai) |
| DH002 | SP C | 8 | 7 | ✅ Có |

**Vấn đề:** SP B có `slnhan = 0` nhưng vẫn xuất hiện trong báo cáo công nợ với số tiền = 0.

---

### After:
| Đơn hàng | Sản phẩm | slgiao | slnhan | Hiển thị trong báo cáo? |
|----------|----------|--------|--------|-------------------------|
| DH001 | SP A | 10 | 10 | ✅ Có |
| DH001 | SP B | 5 | 0 | ✅ Không (đúng) |
| DH002 | SP C | 8 | 7 | ✅ Có |

**Kết quả:** Chỉ SP A và SP C xuất hiện trong báo cáo. SP B bị loại bỏ.

---

## 🧪 Test Cases

### Test 1: API `congnokhachhang()`
```typescript
// Given: Đơn hàng có 3 sản phẩm
const order = {
  sanpham: [
    { slnhan: 10, giaban: 100 }, // SP A: nhận đủ
    { slnhan: 0, giaban: 50 },   // SP B: chưa nhận
    { slnhan: 5, giaban: 200 }   // SP C: nhận 1 phần
  ]
};

// When: Gọi API congnokhachhang
const result = await donhangService.congnokhachhang(params);

// Then: Chỉ tính SP A và SP C
expect(result[0].tong).toBe((10 * 100 + 5 * 200).toFixed(3)); // 2000
expect(result[0].soluong).toBe((10 + 5).toFixed(3));           // 15
// SP B (slnhan = 0) bị loại bỏ
```

### Test 2: Export Excel
```typescript
// Given: Đơn hàng tương tự
const params = { Batdau: '2025-01-01', Ketthuc: '2025-01-31' };

// When: Download báo cáo
const excelBuffer = await donhangService.downloadcongnokhachhang(params);

// Then: File Excel chỉ có 2 rows (SP A và SP C)
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.load(excelBuffer);
const worksheet = workbook.getWorksheet('Công Nợ Khách Hàng');

// Count data rows (excluding headers)
const dataRows = worksheet.rowCount - headerRowCount;
expect(dataRows).toBe(2); // Only SP A and SP C
```

### Test 3: Edge case - Tất cả sản phẩm slnhan = 0
```typescript
// Given: Đơn hàng với tất cả sản phẩm chưa nhận
const order = {
  sanpham: [
    { slnhan: 0, giaban: 100 },
    { slnhan: 0, giaban: 50 }
  ]
};

// When: Gọi API
const result = await donhangService.congnokhachhang(params);

// Then: tong = 0, soluong = 0
expect(result[0].tong).toBe('0.000');
expect(result[0].soluong).toBe('0.000');

// Excel: Đơn hàng này không có dòng sản phẩm nào
```

---

## 📈 Business Logic

### Khi nào sản phẩm có `slnhan = 0`?

1. **Trạng thái `dadat` hoặc `dagiao`:**
   - Đơn hàng đã đặt nhưng chưa giao/chưa nhận
   - `slnhan = 0` là default

2. **Trạng thái `danhan` với thiếu hàng:**
   - Khách đặt 10, nhận 7 → `slnhan = 7`
   - Một số sản phẩm khác trong đơn có thể `slnhan = 0` (không nhận)

3. **Hủy một phần sản phẩm:**
   - Sản phẩm bị hủy → `slnhan = 0`

### Tại sao phải loại bỏ `slnhan = 0` khỏi công nợ?

**Công nợ** = Tiền khách hàng **thực tế nợ** dựa trên hàng **đã nhận**.

- Nếu `slnhan = 0` → Khách chưa nhận hàng
- Không có giao dịch thực tế → Không có công nợ
- Chỉ tính công nợ cho `slnhan > 0`

**Công thức tính công nợ:**
```typescript
Công nợ = SUM(slnhan * giaban) // chỉ với slnhan > 0
```

---

## 🔗 Related

### Trường dữ liệu liên quan:
- `sldat` - Số lượng đặt
- `slgiao` - Số lượng giao
- `slnhan` - **Số lượng nhận** (dùng để tính công nợ)
- `slhuy` - Số lượng hủy

### Trạng thái đơn hàng:
- `dadat` - Đã đặt (slnhan thường = 0)
- `dagiao` - Đã giao (slnhan thường = 0)
- `danhan` - **Đã nhận** (slnhan > 0, sử dụng trong công nợ)
- `hoanthanh` - Hoàn tất
- `huy` - Hủy

### API Endpoints affected:
- `POST /donhang/congnokhachhang` - Danh sách công nợ
- `POST /donhang/downloadcongnokhachhang` - Export Excel

---

## ✅ Verification

### Manual Test:
1. Tạo đơn hàng với 3 sản phẩm
2. Chuyển sang `danhan` với:
   - SP A: slnhan = 10
   - SP B: slnhan = 0 (không nhận)
   - SP C: slnhan = 5
3. Gọi API `congnokhachhang`
4. Kiểm tra: Chỉ SP A và SP C trong kết quả
5. Download Excel
6. Verify: File chỉ có 2 rows sản phẩm

### Automated Test:
```bash
# Run unit tests
npm test -- donhang.service.spec.ts

# Run integration tests
npm run test:e2e -- congno
```

---

## 🎯 Acceptance Criteria

- [x] API `congnokhachhang()` loại bỏ sản phẩm `slnhan = 0`
- [x] Excel export loại bỏ sản phẩm `slnhan = 0`
- [x] Tổng tiền tính đúng (chỉ với `slnhan > 0`)
- [x] Không có compile errors
- [x] Business logic: Công nợ = tiền hàng đã nhận

---

**Author:** AI Assistant  
**Reviewed by:** [Pending]  
**Version:** 1.0.0  
**Last Updated:** 2025-01-XX
