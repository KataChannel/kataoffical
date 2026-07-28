# ⚡ Hướng Dẫn Nhanh - Price History System

## 🚀 Bắt Đầu Trong 5 Phút

### Bước 1: Cài Đặt (1 phút)
```bash
cd frontend
npm install xlsx
```

### Bước 2: Cấu Hình API (1 phút)
Mở `frontend/src/environments/environment.ts`:
```typescript
export const environment = {
  apiUrl: 'http://localhost:3000/api',  // ← Sửa URL này
};
```

### Bước 3: Thêm Routes (2 phút)
Mở `app-routing.module.ts` hoặc `app.routes.ts`:
```typescript
export const routes: Routes = [
  {
    path: 'admin',
    children: [
      // Copy 4 routes này vào:
      { path: 'bulk-price-update', loadComponent: () => import('./admin/banggia/bulk-price-update/bulk-price-update.component').then(m => m.BulkPriceUpdateComponent) },
      { path: 'price-alerts', loadComponent: () => import('./admin/banggia/price-alerts/price-alerts.component').then(m => m.PriceAlertsComponent) },
      { path: 'price-analytics', loadComponent: () => import('./admin/banggia/price-analytics/price-analytics.component').then(m => m.PriceAnalyticsComponent) },
      { path: 'price-comparison', loadComponent: () => import('./admin/banggia/price-comparison/price-comparison.component').then(m => m.PriceComparisonComponent) }
    ]
  }
];
```

### Bước 4: Thêm Menu (1 phút)
Mở file sidebar/menu component và thêm:
```html
<a mat-list-item routerLink="/admin/bulk-price-update">
  <mat-icon>upload</mat-icon>Cập nhật hàng loạt
</a>
<a mat-list-item routerLink="/admin/price-alerts">
  <mat-icon>notifications_active</mat-icon>Cảnh báo giá
</a>
<a mat-list-item routerLink="/admin/price-analytics">
  <mat-icon>analytics</mat-icon>Phân tích giá
</a>
<a mat-list-item routerLink="/admin/price-comparison">
  <mat-icon>compare</mat-icon>So sánh giá
</a>
```

### Bước 5: Chạy & Test
```bash
ng serve
# Truy cập: http://localhost:4200/admin/bulk-price-update
```

---

## 📋 Checklist Cơ Bản

### Trước Khi Bắt Đầu
- [ ] Node.js đã cài (v16+)
- [ ] Angular CLI đã cài
- [ ] Backend API đang chạy

### Tích Hợp
- [ ] `npm install xlsx` thành công
- [ ] Environment.ts có API URL đúng
- [ ] Routes đã thêm vào
- [ ] Menu đã cập nhật
- [ ] `ng serve` không có lỗi

### Kiểm Tra
- [ ] Vào được trang /admin/bulk-price-update
- [ ] Vào được trang /admin/price-alerts
- [ ] Vào được trang /admin/price-analytics
- [ ] Vào được trang /admin/price-comparison
- [ ] Không có console errors

---

## 🎯 Các Tính Năng Chính

### 1. 📜 Xem Lịch Sử Giá
**Vị trí**: Bảng giá → Click nút History bên cạnh sản phẩm

**Hiển thị**:
- Timeline thay đổi giá
- % tăng/giảm
- Lý do thay đổi
- Người thay đổi

### 2. ✅ Xác Minh Giá Đơn Hàng
**Vị trí**: Đơn hàng → Tab "Xác minh giá"

**Chức năng**:
- So sánh giá đặt hàng vs giá hiện tại
- Highlight sản phẩm có chênh lệch lớn
- Đưa ra khuyến nghị

### 3. ⬆️ Cập Nhật Giá Hàng Loạt
**URL**: /admin/bulk-price-update

**3 cách cập nhật**:
1. **Import Excel**: Tải mẫu → Điền → Upload
2. **Thủ công**: Thêm từng dòng
3. **Hàng loạt**: Tăng/giảm theo % hoặc số tiền

### 4. 🔔 Cảnh Báo Giá
**URL**: /admin/price-alerts

**Tạo cảnh báo**:
- Chọn loại: Tăng/Giảm/Thay đổi/Ngưỡng
- Chọn kênh: In-app/Email/SMS
- Quản lý ON/OFF

### 5. 📊 Phân Tích Giá
**URL**: /admin/price-analytics

**3 bảng phân tích**:
- Độ biến động giá
- Đơn hàng bị ảnh hưởng
- Ảnh hưởng doanh thu

### 6. ⚖️ So Sánh Giá
**URL**: /admin/price-comparison

**2 tabs**:
- So sánh giá đa bảng giá
- Dự đoán xu hướng 30/60/90 ngày

---

## 🔧 Code Snippets Hay Dùng

### Mở Dialog Lịch Sử Giá
```typescript
import { MatDialog } from '@angular/material/dialog';
import { PriceHistoryDialogComponent } from './price-history-dialog/price-history-dialog.component';

constructor(private dialog: MatDialog) {}

showHistory() {
  this.dialog.open(PriceHistoryDialogComponent, {
    width: '800px',
    data: {
      banggiaId: 'bg-123',
      sanphamId: 'sp-456'
    }
  });
}
```

### Xác Minh Giá Programmatically
```typescript
import { PriceHistoryService } from './price-history.service';

constructor(private priceService: PriceHistoryService) {}

async verify() {
  const result = await this.priceService.verifyOrderPrices('dh-123');
  if (result.hasDiscrepancies) {
    alert('Có vấn đề về giá!');
  }
}
```

### Thêm Widget vào Dashboard
```html
<app-price-alerts-widget></app-price-alerts-widget>
```

---

## 🐛 Fix Lỗi Nhanh

### Lỗi: Cannot find module 'xlsx'
```bash
npm install xlsx
```

### Lỗi: API 404
Kiểm tra:
1. Backend đang chạy?
2. URL trong environment.ts đúng?
3. CORS enabled?

### Lỗi: Template not found
Các file đã được tạo, chạy lại:
```bash
ng serve
```

---

## 📱 Test Nhanh

### 1. Test Bulk Update
1. Vào `/admin/bulk-price-update`
2. Click "Tải mẫu Excel"
3. Upload file
4. Xem preview
5. Apply

### 2. Test Price Alerts
1. Vào `/admin/price-alerts`
2. Tạo alert mới
3. Check notification hiển thị
4. Toggle ON/OFF

### 3. Test Analytics
1. Vào `/admin/price-analytics`
2. Chọn filter
3. Xem 3 bảng phân tích
4. Export Excel

---

## 💡 Tips & Tricks

### Performance
```typescript
// Lazy load components
loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
```

### Cache API
```typescript
// Cache 5 phút
private cache = new Map();
private cacheDuration = 5 * 60 * 1000;
```

### Error Handling
```typescript
try {
  await this.service.update();
} catch (error) {
  this.snackBar.open(error.message, 'Đóng', { duration: 3000 });
}
```

---

## 🎨 Tùy Chỉnh

### Đổi màu
File: `*.component.scss`
```scss
$price-increase: #f44336;  // Đỏ
$price-decrease: #4caf50;  // Xanh lá
```

### Đổi ngôn ngữ
File: `*.component.ts`
```typescript
formatCurrency(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);
}
```

---

## 📞 Cần Giúp Đỡ?

1. **Console Errors**: Mở F12 → Console tab
2. **Network Issues**: F12 → Network tab → Xem API response
3. **Documentation**: Đọc [HUONG_DAN_TICH_HOP_PRICE_HISTORY.md](./HUONG_DAN_TICH_HOP_PRICE_HISTORY.md)

---

## ✅ Next Steps

Sau khi tích hợp xong:

1. **Implement Backend APIs**
   - [ ] GET /api/banggia/price-history/:banggiaId/:sanphamId
   - [ ] POST /api/banggia/bulk-update
   - [ ] GET /api/donhang/verify-prices/:donhangId

2. **Test với Data Thật**
   - [ ] Load price history từ database
   - [ ] Bulk update thực tế
   - [ ] Verify real orders

3. **Production Deployment**
   - [ ] Build: `ng build --configuration production`
   - [ ] Deploy dist/ folder
   - [ ] Update API URLs

---

**Hoàn tất! Bạn đã sẵn sàng sử dụng Price History System! 🎉**

Xem hướng dẫn đầy đủ tại: [HUONG_DAN_TICH_HOP_PRICE_HISTORY.md](./HUONG_DAN_TICH_HOP_PRICE_HISTORY.md)
