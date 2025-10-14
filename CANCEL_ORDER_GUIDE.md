# Hướng Dẫn Hủy Đơn Hàng - Cancel Order Feature

## 📋 Tổng Quan

Tính năng hủy đơn hàng cho phép:
1. Hủy đơn hàng (Donhang) và đơn đặt hàng (Dathang)
2. Bắt buộc nhập lý do hủy (tối thiểu 10 ký tự)
3. Tự động hoàn trả tồn kho nếu đơn đã xuất/nhập kho

## 🔄 Luồng Xử Lý

### Hủy Đơn Hàng (Donhang)
```
1. Kiểm tra đơn hàng tồn tại
2. Validate lý do hủy (bắt buộc, >= 10 ký tự)
3. Kiểm tra status hiện tại:
   - Nếu đã hủy → Báo lỗi
   - Nếu đã hoàn thành → Báo lỗi
4. Kiểm tra PhieuKho:
   - Có PhieuKho → Hoàn trả tồn kho (tăng tonkho)
   - Xóa PhieuKho
5. Cập nhật status = 'huy', lưu lydohuy
6. Ghi audit log
```

### Hủy Đơn Đặt Hàng (Dathang)
```
1. Kiểm tra đơn đặt hàng tồn tại
2. Validate lý do hủy (bắt buộc, >= 10 ký tự)
3. Kiểm tra status hiện tại:
   - Nếu đã hủy → Báo lỗi
   - Nếu đã hoàn thành → Báo lỗi
4. Kiểm tra PhieuKho:
   - Có PhieuKho → Trừ tồn kho (giảm tonkho)
   - Xóa PhieuKho
5. Cập nhật status = 'huy', lưu lydohuy
6. Ghi audit log
```

## 🚀 Cài Đặt

### 1. Chạy Migration

```bash
cd api
npx prisma migrate dev --name add_lydohuy_to_orders
```

Migration sẽ thêm trường `lydohuy` vào:
- `Donhang.lydohuy` (Text, nullable)
- `Dathang.lydohuy` (Text, nullable)

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Restart Backend

```bash
npm run start:dev
```

## 📡 API Endpoints

### 1. Hủy Đơn Hàng (Donhang)

**POST** `/orders/donhang/:id/cancel`

**Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```

**Body:**
```json
{
  "lydohuy": "Khách hàng yêu cầu hủy do thay đổi nhu cầu"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Đơn hàng đã được hủy và tồn kho đã được hoàn trả",
  "data": {
    "id": "uuid",
    "madonhang": "DH001",
    "status": "huy",
    "lydohuy": "Khách hàng yêu cầu hủy do thay đổi nhu cầu",
    ...
  },
  "restoredInventory": true,
  "oldStatus": "dagiao"
}
```

**Response Error:**
```json
{
  "statusCode": 400,
  "message": "Lý do hủy đơn hàng là bắt buộc",
  "error": "Bad Request"
}
```

### 2. Hủy Đơn Đặt Hàng (Dathang)

**POST** `/orders/dathang/:id/cancel`

**Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```

**Body:**
```json
{
  "lydohuy": "Nhà cung cấp không thể giao hàng đúng hạn"
}
```

**Response:** Tương tự như Donhang

### 3. Lấy Danh Sách Đơn Hàng Đã Hủy

**GET** `/orders/donhang/canceled?skip=0&take=50&startDate=2025-01-01&endDate=2025-12-31`

**Response:**
```json
[
  {
    "id": "uuid",
    "madonhang": "DH001",
    "status": "huy",
    "lydohuy": "Khách hàng yêu cầu hủy...",
    "updatedAt": "2025-10-14T...",
    "khachhang": {...},
    "sanpham": [...]
  }
]
```

### 4. Lấy Danh Sách Đơn Đặt Hàng Đã Hủy

**GET** `/orders/dathang/canceled?skip=0&take=50`

## 💻 Frontend Integration

### Angular Service

```typescript
// donhang.service.ts
async cancelDonhang(donhangId: string, lydohuy: string): Promise<any> {
  const token = this.storageService.getItem('token');
  
  const response = await fetch(`${this.apiUrl}/orders/donhang/${donhangId}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ lydohuy })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
}

// dathang.service.ts
async cancelDathang(dathangId: string, lydohuy: string): Promise<any> {
  const token = this.storageService.getItem('token');
  
  const response = await fetch(`${this.apiUrl}/orders/dathang/${dathangId}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ lydohuy })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
}
```

### Component Example

```typescript
async onCancelOrder(orderId: string) {
  // Show dialog để nhập lý do hủy
  const dialogRef = this.dialog.open(CancelReasonDialogComponent, {
    width: '500px'
  });

  const lydohuy = await firstValueFrom(dialogRef.afterClosed());
  
  if (!lydohuy) {
    return; // User cancelled
  }

  try {
    const result = await this.donhangService.cancelDonhang(orderId, lydohuy);
    
    this.snackBar.open(result.message, 'Đóng', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });

    // Reload data
    this.loadOrders();
  } catch (error) {
    this.snackBar.open(error.message, 'Đóng', {
      duration: 5000,
      panelClass: ['snackbar-error']
    });
  }
}
```

### Dialog Component (CancelReasonDialog)

```typescript
@Component({
  selector: 'app-cancel-reason-dialog',
  template: `
    <h2 mat-dialog-title>Hủy Đơn Hàng</h2>
    <mat-dialog-content>
      <mat-form-field class="w-full">
        <mat-label>Lý do hủy</mat-label>
        <textarea 
          matInput 
          [(ngModel)]="lydohuy" 
          rows="4"
          placeholder="Nhập lý do hủy đơn hàng (tối thiểu 10 ký tự)"
          required>
        </textarea>
        <mat-hint>{{ lydohuy.length }}/10 ký tự</mat-hint>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Hủy</button>
      <button 
        mat-raised-button 
        color="warn" 
        [disabled]="lydohuy.length < 10"
        (click)="onConfirm()">
        Xác Nhận Hủy
      </button>
    </mat-dialog-actions>
  `
})
export class CancelReasonDialogComponent {
  lydohuy = '';

  constructor(
    public dialogRef: MatDialogRef<CancelReasonDialogComponent>
  ) {}

  onCancel() {
    this.dialogRef.close(null);
  }

  onConfirm() {
    if (this.lydohuy.trim().length >= 10) {
      this.dialogRef.close(this.lydohuy.trim());
    }
  }
}
```

## ✅ Validation Rules

### Lý Do Hủy
- **Bắt buộc**: Không được để trống
- **Độ dài tối thiểu**: 10 ký tự
- **Loại**: Text (không giới hạn độ dài)

### Status Constraints
- Không thể hủy đơn đã hủy (`status = 'huy'`)
- Không thể hủy đơn đã hoàn thành (`status = 'hoanthanh'`)
- Các status khác có thể hủy: `dadat`, `dagiao`, `danhan`

## 🔍 Business Logic

### Hoàn Trả Tồn Kho (Donhang)

Khi hủy đơn hàng **ĐÃ CÓ PhieuKho** (đã xuất kho):
```typescript
// Với mỗi sản phẩm trong đơn hàng
for (const item of donhang.sanpham) {
  // Tăng lại tồn kho
  await prisma.sanpham.update({
    where: { id: item.sanphamId },
    data: {
      tonkho: { increment: item.slgiao }
    }
  });
}

// Xóa PhieuKho
await prisma.phieuKho.deleteMany({
  where: { donhangId: orderId }
});
```

### Điều Chỉnh Tồn Kho (Dathang)

Khi hủy đơn đặt hàng **ĐÃ CÓ PhieuKho** (đã nhập kho):
```typescript
// Với mỗi sản phẩm trong đơn đặt hàng
for (const item of dathang.sanpham) {
  // Trừ lại tồn kho (không cho âm)
  const newTonkho = Math.max(0, currentTonkho - item.slnhan);
  
  await prisma.sanpham.update({
    where: { id: item.sanphamId },
    data: { tonkho: newTonkho }
  });
}

// Xóa PhieuKho
await prisma.phieuKho.deleteMany({
  where: { dathangId: orderId }
});
```

## 🔐 Security

- ✅ Yêu cầu authentication (JWT)
- ✅ Ghi audit log mọi thao tác hủy
- ✅ Transaction đảm bảo tính toàn vẹn dữ liệu
- ✅ Validate input để tránh lỗi

## 📊 Audit Log

Mỗi lần hủy đơn sẽ ghi log:
```json
{
  "userId": "user-uuid",
  "action": "UPDATE",
  "entity": "Donhang", // hoặc "Dathang"
  "entityId": "order-uuid",
  "changes": {
    "before": { "status": "dagiao" },
    "after": { 
      "status": "huy", 
      "lydohuy": "Lý do hủy..." 
    },
    "restoredInventory": true
  }
}
```

## 🧪 Testing

### Test Case 1: Hủy Đơn Hàng Chưa Xuất Kho
```
Input:
- orderId: valid
- lydohuy: "Khách hàng đổi ý"
- PhieuKho: []

Expected:
- status = 'huy'
- lydohuy được lưu
- Tồn kho KHÔNG thay đổi
- restoredInventory = false
```

### Test Case 2: Hủy Đơn Hàng Đã Xuất Kho
```
Input:
- orderId: valid
- lydohuy: "Giao sai địa chỉ"
- PhieuKho: [{ sanphamId, slgiao: 10 }]

Expected:
- status = 'huy'
- lydohuy được lưu
- Tồn kho TĂNG 10
- PhieuKho bị xóa
- restoredInventory = true
```

### Test Case 3: Validate Lý Do Hủy
```
Input:
- lydohuy: "" (empty)

Expected:
- Error: "Lý do hủy đơn hàng là bắt buộc"

Input:
- lydohuy: "Hủy" (< 10 ký tự)

Expected:
- Error: "Lý do hủy phải có ít nhất 10 ký tự"
```

### Test Case 4: Không Thể Hủy Đơn Đã Hủy
```
Input:
- orderId: valid (status = 'huy')

Expected:
- Error: "Đơn hàng đã được hủy trước đó"
```

## 📝 Notes

1. **Transaction Safety**: Mọi thao tác đều trong transaction để đảm bảo atomicity
2. **Inventory Accuracy**: Tồn kho luôn được cập nhật chính xác khi hủy đơn
3. **Audit Trail**: Có thể truy vết lại lịch sử hủy đơn qua audit log
4. **User Experience**: Frontend cần có dialog xác nhận và nhập lý do rõ ràng

## 🔗 Related Files

- Backend:
  - `/api/prisma/schema.prisma` - Database schema
  - `/api/src/donhang/cancel-order.service.ts` - Business logic
  - `/api/src/donhang/cancel-order.controller.ts` - API endpoints
  - `/api/src/donhang/donhang.module.ts` - Module configuration

- Frontend (cần implement):
  - `/frontend/src/app/admin/donhang/donhang.service.ts` - Service calls
  - `/frontend/src/app/admin/dathang/dathang.service.ts` - Service calls
  - Dialog components cho nhập lý do hủy

---

**Version:** 1.0.0  
**Last Updated:** 14/10/2025  
**Author:** GitHub Copilot
