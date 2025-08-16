# Cập Nhật Tính Toán Tổng Tiền Đơn Hàng (Backend) - COMPLETE

## Tổng Quan
Đã cập nhật backend để tính toán `tongvat` và `tongtien` cho đơn hàng theo công thức mới:
- **tong** = sum(sanpham.giaban * sanpham.slnhan)
- **tongvat** = tong * donhang.vat  
- **tongtien** = tong + tongvat

## Chi Tiết Thay Đổi

### 1. Helper Method Mới
**File:** `/api/src/donhang/donhang.service.ts`

#### Thêm `calculateDonhangTotals()`
```typescript
private calculateDonhangTotals(sanpham: any[], vatRate: number = 0.05) {
  // tong = sum(sanpham.giaban * sanpham.slnhan)
  const tong = sanpham.reduce((total, sp) => {
    const giaban = parseFloat((sp.giaban || 0).toString());
    const slnhan = parseFloat((sp.slnhan || 0).toString());
    return total + (giaban * slnhan);
  }, 0);

  // tongvat = tong * donhang.vat
  const tongvat = tong * vatRate;

  // tongtien = tong + tongvat
  const tongtien = tong + tongvat;

  return { tong, tongvat, tongtien };
}
```

### 2. Cập Nhật Method `create()`

#### Trước:
- Không có tính toán tổng tiền
- Chỉ tạo đơn hàng với sản phẩm

#### Sau:
```typescript
// Calculate totals using new formula and helper method
const vatRate = parseFloat((dto.vat || 0.05).toString());
const { tongvat, tongtien } = this.calculateDonhangTotals(dto.sanpham || [], vatRate);

// Update donhang with calculated totals
await prisma.donhang.update({
  where: { id: newDonhang.id },
  data: {
    tongvat: tongvat,
    tongtien: tongtien,
  },
});
```

### 3. Cập Nhật Method `update()`

#### Cải tiến:
- Thêm hỗ trợ cập nhật `banggiaId` và `vat` rate
- Tự động tính lại tổng khi có thay đổi sản phẩm hoặc VAT
- Sử dụng helper method để đảm bảo tính nhất quán

```typescript
// Recalculate totals if sanpham data is provided or VAT rate changed
if (data.sanpham || data.vat) {
  const sanphamForCalculation = data.sanpham || updatedDonhang.sanpham.map(sp => ({
    giaban: sp.giaban,
    slnhan: sp.slnhan
  }));
  
  const vatRate = data.vat ? parseFloat(data.vat.toString()) : parseFloat(updatedDonhang.vat.toString());
  const { tongvat, tongtien } = this.calculateDonhangTotals(sanphamForCalculation, vatRate);

  await prisma.donhang.update({
    where: { id },
    data: {
      tongvat,
      tongtien,
    },
  });
}
```

### 4. Cập Nhật Method `dongbogia()`

#### Trước:
```typescript
// Tính toán thủ công trong vòng lặp
const tongCoBan = donhang.sanpham.reduce((total, sp) => {
  // Logic phức tạp...
}, 0);
const tongVat = tongCoBan * vatRate;
const tongTien = tongCoBan + tongVat;
```

#### Sau:
```typescript
// Sử dụng helper method
const sanphamForCalculation = donhang.sanpham.map(sp => {
  const giaSanpham = donhang.khachhang?.banggia?.sanpham.find(
    (gsp) => gsp.sanphamId === sp.idSP,
  );
  return {
    giaban: giaSanpham ? giaSanpham.giaban : parseFloat(sp.giaban.toString()),
    slnhan: parseFloat(sp.slnhan.toString()),
  };
});

const vatRate = parseFloat(donhang.vat.toString()) || 0.05;
const { tongvat, tongtien } = this.calculateDonhangTotals(sanphamForCalculation, vatRate);
```

## Công Thức Tính Toán

### Bước 1: Tính Tổng Cơ Bản
```
tong = Σ(giaban × slnhan)
```
Với mỗi sản phẩm trong đơn hàng, nhân `giaban` với `slnhan` rồi cộng tất cả lại.

### Bước 2: Tính VAT
```
tongvat = tong × vat_rate
```
Nhân tổng cơ bản với tỷ lệ VAT của đơn hàng.

### Bước 3: Tính Tổng Cuối
```
tongtien = tong + tongvat
```
Tổng cuối cùng bằng tổng cơ bản cộng với VAT.

## Ví Dụ Tính Toán

Giả sử đơn hàng có:
- Sản phẩm A: giaban = 100,000, slnhan = 2
- Sản phẩm B: giaban = 50,000, slnhan = 3  
- VAT rate = 5% (0.05)

**Tính toán:**
1. tong = (100,000 × 2) + (50,000 × 3) = 200,000 + 150,000 = 350,000
2. tongvat = 350,000 × 0.05 = 17,500
3. tongtien = 350,000 + 17,500 = 367,500

## Các Trường Hợp Sử Dụng

### 1. Tạo Đơn Hàng Mới
- Tự động tính tổng khi tạo đơn hàng
- Sử dụng VAT rate từ input hoặc mặc định 5%

### 2. Cập Nhật Đơn Hàng  
- Tính lại tổng khi thay đổi sản phẩm
- Tính lại tổng khi thay đổi VAT rate
- Hỗ trợ tất cả các trạng thái đơn hàng

### 3. Đồng Bộ Giá
- Tự động tính lại tổng sau khi cập nhật giá từ bảng giá
- Áp dụng cho hàng loạt đơn hàng

## Lợi Ích

1. **Tính toán chính xác:** Công thức nhất quán trên toàn hệ thống
2. **Hiệu suất tốt:** Helper method tái sử dụng, giảm code trùng lặp
3. **Bảo trì dễ dàng:** Logic tập trung trong một method
4. **Linh hoạt:** Hỗ trợ VAT rate động cho từng đơn hàng
5. **An toàn:** Parse số an toàn, xử lý null/undefined

## Kiểm Tra
✅ TypeScript compilation thành công
✅ Helper method hoạt động trong tất cả methods
✅ Backward compatibility được đảm bảo
✅ Tất cả trường hợp update được xử lý

## Status: COMPLETE
Backend đã được cập nhật hoàn chỉnh để tính toán tổng tiền đơn hàng theo công thức mới, đồng bộ với frontend.
