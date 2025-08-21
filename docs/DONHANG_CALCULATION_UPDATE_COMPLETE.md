# Cập Nhật Tính Toán Tổng Tiền Đơn Hàng - COMPLETE

## Tổng Quan
Đã cập nhật hệ thống tính toán `tongvat` và `tongtien` cho đơn hàng theo công thức mới:
- **tong** = sum(sanpham.giaban * sanpham.slnhan)
- **tongvat** = tong * donhang.vat
- **tongtien** = tong + tongvat

## Chi Tiết Thay Đổi

### 1. Cập Nhật Helper Methods
**File:** `/frontend/src/app/admin/donhang/detaildonhang/detaildonhang.component.ts`

#### Thêm Method `calculateTotal()`
```typescript
private calculateTotal(): number {
  // tong = sum (sanpham.giaban * sanpham.slnhan)
  return this.DetailDonhang().sanpham?.reduce((total: number, sp: any) => {
    const giaban = parseFloat(sp.giaban?.toString() || '0');
    const slnhan = parseFloat(sp.slnhan?.toString() || '0');
    return total + (giaban * slnhan);
  }, 0) || 0;
}
```

#### Cập Nhật `calculateTotalVat()`
```typescript
private calculateTotalVat(): number {
  // tongvat = tong * donhang.vat
  const tong = this.calculateTotal();
  const vatRate = parseFloat(this.DetailDonhang().vat?.toString() || '0.1'); // Default 10% if not set
  return tong * vatRate;
}
```

#### Cập Nhật `calculateTotalAmount()`
```typescript
private calculateTotalAmount(): number {
  // tongtien = tong + tongvat
  const tong = this.calculateTotal();
  const tongvat = this.calculateTotalVat();
  return tong + tongvat;
}
```

### 2. Auto-calculation Methods

#### Thêm `updateTotals()`
```typescript
private updateTotals(): void {
  this.DetailDonhang.update((v: any) => ({
    ...v,
    tongvat: this.calculateTotalVat(),
    tongtien: this.calculateTotalAmount()
  }));
}
```

#### Thêm `updateVatRate()`
```typescript
updateVatRate(newVatRate: number): void {
  this.DetailDonhang.update((v: any) => ({
    ...v,
    vat: newVatRate
  }));
  this.updateTotals();
}
```

### 3. Khởi Tạo Đơn Hàng Mới
Cập nhật phần khởi tạo đơn hàng mới để có VAT rate mặc định:
```typescript
if (id === 'new') {
  this.DetailDonhang.set({
    title: 'Đơn Hàng' + moment().format('DD_MM_YYYY'),
    ngaygiao: moment().add(1, 'days').format('YYYY-MM-DD'),
    type: 'donsi',
    status: 'dadat',
    isshowvat: false,
    isActive: true,
    printCount: 0,
    vat: 0.1, // Default 10% VAT rate
    tongvat: 0,
    tongtien: 0,
    sanpham: []
  });
}
```

### 4. Auto-calculation Triggers
Đã thêm auto-calculation khi các sự kiện sau xảy ra:

#### Khi Update Giá hoặc Số Lượng
- `updateValue()`: Tự động tính lại khi `giaban` hoặc `slnhan` thay đổi
- `updateBlurValue()`: Tự động tính lại khi `giaban` hoặc `slnhan` thay đổi (blur event)

#### Khi Thêm/Xóa Sản Phẩm
- `ApplyFilterColum()`: Tự động tính lại khi áp dụng danh sách sản phẩm
- `RemoveSanpham()`: Tự động tính lại khi xóa sản phẩm
- `DoImportData()`: Tự động tính lại khi import dữ liệu

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
- VAT rate = 10% (0.1)

**Tính toán:**
1. tong = (100,000 × 2) + (50,000 × 3) = 200,000 + 150,000 = 350,000
2. tongvat = 350,000 × 0.1 = 35,000
3. tongtien = 350,000 + 35,000 = 385,000

## Lợi Ích
1. **Tính toán chính xác:** Dựa trên số lượng nhận thực tế và giá bán
2. **Tự động cập nhật:** Không cần tính toán thủ công
3. **Linh hoạt VAT:** Có thể thay đổi tỷ lệ VAT cho từng đơn hàng
4. **Đồng bộ realtime:** Tổng tiền được cập nhật ngay khi thay đổi dữ liệu

## Kiểm Tra
✅ Build frontend thành công
✅ Tất cả methods được implement
✅ Auto-calculation hoạt động khi:
  - Thay đổi giaban/slnhan
  - Thêm/xóa sản phẩm  
  - Import dữ liệu
  - Áp dụng filter sản phẩm

## Status: COMPLETE
Hệ thống tính toán tổng tiền đơn hàng đã được cập nhật hoàn chỉnh theo yêu cầu.
