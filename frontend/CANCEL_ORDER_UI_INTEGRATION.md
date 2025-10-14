# Hướng dẫn tích hợp nút Hủy Đơn Hàng vào UI

## 1. Import CancelOrderService vào component

```typescript
import { CancelOrderService } from '../../../shared/services/cancel-order.service';

export class ListdonhangComponent {
  private cancelOrderService = inject(CancelOrderService);
  
  // ... existing code
}
```

## 2. Thêm nút Hủy Đơn vào template HTML

### Trong bảng danh sách đơn hàng:

```html
<!-- Action column trong table -->
<td>
  <button 
    mat-icon-button
    [disabled]="!cancelOrderService.canCancelOrder(order)"
    [matTooltip]="cancelOrderService.getCancelButtonTooltip(order)"
    (click)="handleCancelOrder(order)"
    class="text-red-600 hover:text-red-800">
    <mat-icon>cancel</mat-icon>
  </button>
</td>
```

### Hoặc nút đầy đủ:

```html
<button 
  mat-raised-button
  color="warn"
  [disabled]="!cancelOrderService.canCancelOrder(order)"
  [matTooltip]="cancelOrderService.getCancelButtonTooltip(order)"
  (click)="handleCancelOrder(order)">
  <mat-icon>cancel</mat-icon>
  Hủy Đơn
</button>
```

## 3. Thêm method xử lý trong component

```typescript
/**
 * Xử lý hủy đơn hàng
 */
async handleCancelOrder(order: any) {
  const success = await this.cancelOrderService.cancelDonhang(order);
  
  if (success) {
    // Optional: Thực hiện các hành động bổ sung sau khi hủy thành công
    // Ví dụ: refresh danh sách, điều hướng, etc.
    console.log('Đơn hàng đã được hủy thành công');
  }
}
```

### Đối với đơn đặt hàng (Dathang):

```typescript
async handleCancelDathang(order: any) {
  const success = await this.cancelOrderService.cancelDathang(order);
  
  if (success) {
    console.log('Đơn đặt hàng đã được hủy thành công');
  }
}
```

## 4. Hiển thị lý do hủy trong chi tiết đơn hàng

### Trong template chi tiết đơn:

```html
<!-- Hiển thị lý do hủy nếu đơn hàng đã bị hủy -->
<div *ngIf="order.status === 'huy' && order.lydohuy" class="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
  <div class="flex items-start gap-2">
    <mat-icon class="text-red-600">info</mat-icon>
    <div class="flex-1">
      <h4 class="font-semibold text-red-800 mb-1">Đơn hàng đã bị hủy</h4>
      <p class="text-sm text-red-700">
        <strong>Lý do:</strong> {{ order.lydohuy }}
      </p>
    </div>
  </div>
</div>
```

## 5. Thêm badge status "huy" vào danh sách

```html
<!-- Status badge với màu sắc theo status -->
<span 
  [ngClass]="{
    'bg-green-100 text-green-800': order.status === 'hoanthanh',
    'bg-blue-100 text-blue-800': order.status === 'dangxuly',
    'bg-yellow-100 text-yellow-800': order.status === 'choxuly',
    'bg-red-100 text-red-800': order.status === 'huy'
  }"
  class="px-2 py-1 rounded-full text-xs font-semibold">
  {{ getStatusLabel(order.status) }}
</span>
```

```typescript
getStatusLabel(status: string): string {
  const labels: { [key: string]: string } = {
    'choxuly': 'Chờ xử lý',
    'dangxuly': 'Đang xử lý',
    'hoanthanh': 'Hoàn thành',
    'huy': 'Đã hủy'
  };
  return labels[status] || status;
}
```

## 6. Thêm filter cho đơn hàng đã hủy

```typescript
// Filter options
filterOptions = [
  { value: 'all', label: 'Tất cả' },
  { value: 'choxuly', label: 'Chờ xử lý' },
  { value: 'dangxuly', label: 'Đang xử lý' },
  { value: 'hoanthanh', label: 'Hoàn thành' },
  { value: 'huy', label: 'Đã hủy' }
];

currentFilter = 'all';

get filteredOrders() {
  if (this.currentFilter === 'all') {
    return this.orders;
  }
  return this.orders.filter(order => order.status === this.currentFilter);
}
```

## 7. Required imports cho component

```typescript
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { CancelOrderService } from '../../../shared/services/cancel-order.service';
```

Thêm vào imports array của standalone component:

```typescript
@Component({
  selector: 'app-listdonhang',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    // ... other imports
  ],
  // ...
})
```

## 8. Kiểm tra permissions (Optional)

Nếu muốn kiểm tra quyền trước khi hiển thị nút hủy:

```typescript
import { AuthService } from '../../../shared/services/auth.service';

private authService = inject(AuthService);

canUserCancelOrder(): boolean {
  return this.authService.hasPermission('cancel_order');
}
```

```html
<button 
  *ngIf="canUserCancelOrder()"
  mat-icon-button
  [disabled]="!cancelOrderService.canCancelOrder(order)"
  (click)="handleCancelOrder(order)">
  <mat-icon>cancel</mat-icon>
</button>
```

## 9. Ví dụ đầy đủ trong một component

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CancelOrderService } from '../../../shared/services/cancel-order.service';
import { DonhangService } from '../donhang.service';

@Component({
  selector: 'app-listdonhang',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  template: `
    <div class="p-4">
      <table class="w-full">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of donhangService.ListDonhang()">
            <td>{{ order.code }}</td>
            <td>{{ order.khachhang?.ten }}</td>
            <td>
              <span 
                [ngClass]="getStatusClass(order.status)"
                class="px-2 py-1 rounded-full text-xs font-semibold">
                {{ getStatusLabel(order.status) }}
              </span>
            </td>
            <td>
              <button 
                mat-icon-button
                [disabled]="!cancelOrderService.canCancelOrder(order)"
                [matTooltip]="cancelOrderService.getCancelButtonTooltip(order)"
                (click)="handleCancelOrder(order)"
                class="text-red-600">
                <mat-icon>cancel</mat-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ListdonhangComponent {
  cancelOrderService = inject(CancelOrderService);
  donhangService = inject(DonhangService);

  async handleCancelOrder(order: any) {
    const success = await this.cancelOrderService.cancelDonhang(order);
    if (success) {
      console.log('Order cancelled successfully');
    }
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'hoanthanh': 'bg-green-100 text-green-800',
      'dangxuly': 'bg-blue-100 text-blue-800',
      'choxuly': 'bg-yellow-100 text-yellow-800',
      'huy': 'bg-red-100 text-red-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'choxuly': 'Chờ xử lý',
      'dangxuly': 'Đang xử lý',
      'hoanthanh': 'Hoàn thành',
      'huy': 'Đã hủy'
    };
    return labels[status] || status;
  }
}
```

## 10. Testing

Để test chức năng:

1. Chọn một đơn hàng có status khác 'huy' và 'hoanthanh'
2. Click nút "Hủy Đơn"
3. Nhập lý do hủy (tối thiểu 10 ký tự)
4. Xác nhận hủy
5. Kiểm tra:
   - Snackbar hiển thị thành công
   - Status đơn hàng chuyển thành 'huy'
   - Lý do hủy được lưu vào field 'lydohuy'
   - Tồn kho được phục hồi (nếu có PhieuKho)
   - Danh sách đơn hàng được refresh

## 11. Custom styling (Optional)

Thêm vào global styles hoặc component styles:

```scss
// Custom snackbar styles
::ng-deep {
  .success-snackbar {
    background-color: #10b981 !important;
    color: white !important;
  }
  
  .error-snackbar {
    background-color: #ef4444 !important;
    color: white !important;
  }
}

// Cancel button hover effect
.cancel-button {
  &:hover:not(:disabled) {
    background-color: rgba(239, 68, 68, 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

---

## Tóm tắt các bước tích hợp:

1. ✅ Import `CancelOrderService` vào component
2. ✅ Thêm nút "Hủy Đơn" với `[disabled]` binding
3. ✅ Gọi `cancelOrderService.cancelDonhang(order)` hoặc `cancelDathang(order)`
4. ✅ Hiển thị `lydohuy` trong chi tiết đơn nếu status = 'huy'
5. ✅ Thêm badge cho status 'huy' với màu đỏ
6. ✅ Optional: Thêm filter để xem đơn hàng đã hủy

**Lưu ý:** Service tự động xử lý:
- Validation status (không cho hủy đơn đã hủy hoặc hoàn thành)
- Mở dialog nhập lý do
- Validation lý do (tối thiểu 10 ký tự)
- Gọi API backend
- Hiển thị snackbar thông báo
- Refresh danh sách đơn hàng
