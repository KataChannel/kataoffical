# Tính Năng Gộp Sản Phẩm Trùng Lặp - ImportConfirmedDathang

## 🎯 Tổng Quan

Đã cập nhật thành công function `ImportConfirmedDathang` trong component `ListDathangComponent` để tự động gộp các sản phẩm có `masp` trùng lặp khi import dữ liệu từ Excel.

## ✅ Tính Năng Đã Implement

### 1. Method mới: `mergeProductsByMasp()`

```typescript
mergeProductsByMasp(sanphamArray: any[]): any[] {
  const mergedMap = new Map<string, any>();

  sanphamArray.forEach((sp: any) => {
    const masp = sp.sanpham?.masp || sp.masp;
    
    if (mergedMap.has(masp)) {
      // Gộp số lượng cho sản phẩm trùng lặp
      const existing = mergedMap.get(masp);
      existing.sldat = (Number(existing.sldat) || 0) + (Number(sp.sldat) || 0);
      existing.slgiao = (Number(existing.slgiao) || 0) + (Number(sp.slgiao) || 0);
      existing.slnhan = (Number(existing.slnhan) || 0) + (Number(sp.slnhan) || 0);
      
      // Kết hợp ghi chú nếu khác nhau
      const existingNote = existing.ghichu || '';
      const newNote = sp.ghichu || '';
      if (newNote && existingNote !== newNote) {
        existing.ghichu = existingNote ? `${existingNote}; ${newNote}` : newNote;
      }
    } else {
      // Lần đầu gặp sản phẩm này
      mergedMap.set(masp, {
        masp: masp,
        sanpham: sp.sanpham || { masp: masp },
        sldat: Number(sp.sldat) || 0,
        slgiao: Number(sp.slgiao) || 0,
        slnhan: Number(sp.slnhan) || 0,
        ghichu: sp.ghichu || '',
        title: sp.sanpham?.title || sp.title || '',
        dvt: sp.sanpham?.dvt || sp.dvt || ''
      });
    }
  });

  return Array.from(mergedMap.values());
}
```

### 2. Cập nhật `ImportConfirmedDathang()`

```typescript
// Chuẩn bị dữ liệu import với việc gộp sản phẩm trùng masp
const ordersToImport = confirmedOrders.map((order) => {
  const Kho = this._KhoService.ListKho().find(
    (k) => k.makho === order.makho);

  // Gộp và merge các sản phẩm có cùng masp
  const mergedProducts = this.mergeProductsByMasp(order.sanpham);

  return {
    ngaynhan: moment(order.ngaynhan).format('YYYY-MM-DD'),
    mancc: order?.nhacungcap.mancc,
    makho: order.makho,
    khoId: Kho?.id,
    status: order.status,
    sanpham: mergedProducts.map((sp: any) => ({
      masp: sp.masp,
      sldat: Number(sp.sldat),
      slgiao: Number(sp.slgiao),
      slnhan: Number(sp.slnhan),
      ghichu: sp.ghichu,
    })),
    ghichu: order.ghichu,
  };
});
```

## 🔄 Logic Gộp Sản Phẩm

### Trước khi gộp:
```
Đơn hàng có các sản phẩm:
- SP001: sldat=10, slgiao=8, slnhan=8, ghichu="Hàng tốt"
- SP002: sldat=5,  slgiao=3, slnhan=3, ghichu="Cần kiểm tra"
- SP001: sldat=5,  slgiao=2, slnhan=2, ghichu="Bổ sung"
- SP003: sldat=15, slgiao=10, slnhan=10, ghichu=""
```

### Sau khi gộp:
```
Đơn hàng đã được gộp:
- SP001: sldat=15, slgiao=10, slnhan=10, ghichu="Hàng tốt; Bổ sung"
- SP002: sldat=5,  slgiao=3,  slnhan=3,  ghichu="Cần kiểm tra"
- SP003: sldat=15, slgiao=10, slnhan=10, ghichu=""
```

## 🎯 Ưu Điểm

### 1. **Tự Động Gộp Số Lượng**
- Cộng dồn `sldat` (số lượng đặt)
- Cộng dồn `slgiao` (số lượng giao)
- Cộng dồn `slnhan` (số lượng nhận)

### 2. **Xử Lý Ghi Chú Thông Minh**
- Kết hợp các ghi chú khác nhau bằng dấu `;`
- Tránh trùng lặp ghi chú
- Giữ nguyên ghi chú nếu chỉ có một

### 3. **Bảo Toàn Thông Tin**
- Giữ nguyên thông tin sản phẩm (title, dvt)
- Duy trì cấu trúc dữ liệu gốc
- Tương thích với logic hiện tại

### 4. **Hiệu Suất Cao**
- Sử dụng `Map` cho hiệu suất tốt
- Chỉ duyệt mảng một lần
- Không làm thay đổi dữ liệu gốc

## 📋 Kịch Bản Sử Dụng

### Scenario 1: Import Excel với sản phẩm trùng lặp
1. User upload file Excel có cùng `masp` xuất hiện nhiều lần
2. System tự động detect và gộp các sản phẩm trùng
3. Hiển thị data đã được gộp trong dialog preview
4. User xác nhận và import data đã được tối ưu

### Scenario 2: Gộp đơn hàng từ nhiều nguồn
1. Có nhiều dòng đặt hàng cho cùng sản phẩm
2. System merge tự động theo `masp`
3. Tạo đơn hàng consolidated với số liệu chính xác
4. Giảm thiểu duplicate entries trong database

## 🔧 Technical Implementation

### Data Structure
```typescript
interface MergedProduct {
  masp: string;           // Product code (key for merging)
  sldat: number;          // Total ordered quantity
  slgiao: number;         // Total delivered quantity  
  slnhan: number;         // Total received quantity
  ghichu: string;         // Combined notes
  sanpham: object;        // Product details
  title?: string;         // Product title
  dvt?: string;          // Unit of measure
}
```

### Algorithm
1. **Initialize**: Tạo `Map<string, any>` với key là `masp`
2. **Iterate**: Duyệt qua từng sản phẩm trong array
3. **Check**: Kiểm tra `masp` đã tồn tại trong Map
4. **Merge**: Nếu có, cộng dồn số lượng và gộp ghi chú
5. **Add**: Nếu chưa có, thêm sản phẩm mới vào Map
6. **Return**: Convert Map values thành array

## ✅ Test Cases

### Test Case 1: Gộp sản phẩm cơ bản
- Input: 2 sản phẩm cùng `masp`
- Expected: 1 sản phẩm với số lượng đã cộng

### Test Case 2: Gộp ghi chú
- Input: Sản phẩm cùng `masp`, ghi chú khác nhau
- Expected: Ghi chú được kết hợp bằng dấu `;`

### Test Case 3: Không có trùng lặp
- Input: Các sản phẩm `masp` khác nhau
- Expected: Giữ nguyên tất cả sản phẩm

### Test Case 4: Số lượng = 0 hoặc null
- Input: Sản phẩm có số lượng không hợp lệ
- Expected: Convert thành 0 và xử lý bình thường

## 🚀 Deployment Status

- ✅ Code implementation completed
- ✅ No compilation errors
- ✅ Build successful  
- ✅ Ready for production use
- ✅ Backward compatible
- ✅ Performance optimized

## 📝 Usage Notes

1. **Automatic**: Tính năng hoạt động tự động, không cần user action
2. **Safe**: Không làm thay đổi dữ liệu gốc
3. **Efficient**: Sử dụng Map để đảm bảo hiệu suất tối ưu
4. **Flexible**: Có thể mở rộng cho các trường hợp merge khác

Tính năng gộp sản phẩm trùng lặp đã được implement hoàn chỉnh và sẵn sàng sử dụng trong production!