# 🎯 Hướng Dẫn Sử Dụng Tính Năng Quản Lý Giá & Audit Trail

## ✅ Tính Năng Đã Triển Khai

### 📊 **1. Database Tables** 

#### **BanggiasanphamHistory** - Lịch sử thay đổi giá trong Bảng Giá
```sql
CREATE TABLE "BanggiasanphamHistory" (
  id                  UUID PRIMARY KEY,
  banggiasanphamId    UUID NOT NULL,
  banggiaId           UUID NOT NULL,
  sanphamId           UUID NOT NULL,
  oldPrice            DECIMAL(20,3),
  newPrice            DECIMAL(20,3),
  changePercent       DECIMAL(10,2),
  changeReason        TEXT,
  changedBy           TEXT,
  changedAt           TIMESTAMP DEFAULT NOW(),
  sourceType          TEXT,  -- MANUAL, IMPORT, SYNC, BULK_UPDATE
  batchId             TEXT,
  metadata            JSONB
);
```

#### **DonhangPriceAudit** - Audit log thay đổi giá Đơn Hàng
```sql
CREATE TABLE "DonhangPriceAudit" (
  id                UUID PRIMARY KEY,
  donhangId         UUID NOT NULL,
  donhangsanphamId  UUID NOT NULL,
  sanphamId         UUID NOT NULL,
  oldPrice          DECIMAL(20,3),
  newPrice          DECIMAL(20,3),
  changePercent     DECIMAL(10,2),
  changeReason      TEXT NOT NULL,
  changedBy         TEXT,
  changedByEmail    TEXT,
  ipAddress         TEXT,
  userAgent         TEXT,
  createdAt         TIMESTAMP DEFAULT NOW(),
  metadata          JSONB
);
```

---

## 🚀 **2. API Endpoints**

### **Cập nhật giá sản phẩm trong đơn hàng**

**Endpoint:** `POST /donhang/price/update`

**Request Body:**
```json
{
  "donhangId": "uuid-don-hang",
  "donhangsanphamId": "uuid-don-hang-san-pham",
  "sanphamId": "uuid-san-pham",
  "newPrice": 12000,
  "changeReason": "Điều chỉnh theo thỏa thuận khách hàng"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Cập nhật giá thành công",
  "data": {
    "donhangsanphamId": "uuid",
    "sanpham": "Cải thìa",
    "oldPrice": 10000,
    "newPrice": 12000,
    "changePercent": "+20.00%",
    "newTotals": {
      "tongtien": 150000,
      "tongvat": 7500,
      "tongcong": 157500
    }
  }
}
```

**Validation Rules:**
- ✅ Không cho sửa đơn hàng đã giao (`dagiao`) hoặc hoàn thành (`hoanthanh`)
- ✅ Giá mới phải > 0
- ✅ Thay đổi > 20% yêu cầu nhập lý do
- ✅ Tự động ghi audit log
- ✅ Tự động tính lại tổng tiền đơn hàng

---

### **Xem lịch sử thay đổi giá đơn hàng**

**Endpoint:** `GET /donhang/price/:donhangId/audit`

**Response:**
```json
[
  {
    "id": "uuid",
    "donhangId": "DH001-id",
    "sanphamId": "cai-thia-id",
    "masp": "SP001",
    "sanphamName": "Cải thìa",
    "oldPrice": 10000,
    "newPrice": 12000,
    "changePercent": 20.00,
    "changeReason": "Điều chỉnh theo thỏa thuận KH",
    "changedBy": "user-id",
    "changedByEmail": "admin@example.com",
    "ipAddress": "192.168.1.1",
    "createdAt": "2025-10-10T14:30:00Z"
  }
]
```

---

### **Xác minh giá đơn hàng vs bảng giá**

**Endpoint:** `GET /donhang/price/:donhangId/verify`

**Response:**
```json
{
  "donhangId": "uuid",
  "madonhang": "DH001",
  "banggiaId": "banggia-uuid",
  "verification": [
    {
      "sanphamId": "uuid",
      "sanphamName": "Cải thìa",
      "masp": "SP001",
      "orderPrice": 10000,
      "currentPrice": 11000,
      "difference": 1000,
      "differencePercent": "10.00",
      "status": "HIGHER",
      "hasDifference": true
    }
  ],
  "summary": {
    "total": 10,
    "matched": 5,
    "higher": 3,
    "lower": 2,
    "noBanggia": 0
  }
}
```

---

### **Xem lịch sử giá bảng giá**

**Endpoint:** `GET /donhang/price/banggia/:banggiaId/history?sanphamId=xxx&limit=50`

**Response:**
```json
[
  {
    "id": "uuid",
    "banggiasanphamId": "uuid",
    "banggiaId": "uuid",
    "sanphamId": "uuid",
    "oldPrice": 10000,
    "newPrice": 11000,
    "changePercent": 10.00,
    "changeReason": "Import từ Excel",
    "changedBy": "admin",
    "changedAt": "2025-10-10T10:00:00Z",
    "sourceType": "IMPORT"
  }
]
```

---

### **So sánh giá hiện tại vs lịch sử**

**Endpoint:** `GET /donhang/price/banggia/:banggiaId/product/:sanphamId/comparison`

**Response:**
```json
{
  "currentPrice": {
    "mabanggia": "BG202501",
    "banggiaTitle": "Bảng giá tháng 1",
    "currentPrice": 12000,
    "banggiasanphamId": "uuid"
  },
  "priceHistory": [
    {
      "oldPrice": 10000,
      "newPrice": 11000,
      "changePercent": 10.00,
      "changeReason": "Tăng giá theo CPI",
      "changedBy": "admin",
      "changedAt": "2025-09-01T00:00:00Z",
      "sourceType": "MANUAL"
    },
    {
      "oldPrice": 11000,
      "newPrice": 12000,
      "changePercent": 9.09,
      "changeReason": "Bulk update +10%",
      "changedBy": "system",
      "changedAt": "2025-10-01T00:00:00Z",
      "sourceType": "BULK_UPDATE"
    }
  ]
}
```

---

### **Thống kê biến động giá**

**Endpoint:** `GET /donhang/price/product/:sanphamId/statistics?days=30`

**Response:**
```json
{
  "totalChanges": 5,
  "avgChangePercent": 8.50,
  "minPrice": 10000,
  "maxPrice": 13000,
  "avgPrice": 11500
}
```

---

## 💻 **3. Usage Examples**

### **Example 1: Update giá đơn hàng DH001 - Cải thìa từ 10,000 → 12,000**

```typescript
// Frontend code
const updatePrice = async () => {
  try {
    const response = await fetch('/api/donhang/price/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        donhangId: 'DH001-uuid',
        donhangsanphamId: 'donhangsanpham-uuid',
        sanphamId: 'cai-thia-uuid',
        newPrice: 12000,
        changeReason: 'Điều chỉnh theo thỏa thuận đặc biệt với khách hàng'
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Cập nhật thành công!');
      console.log(`Giá cũ: ${result.data.oldPrice}`);
      console.log(`Giá mới: ${result.data.newPrice}`);
      console.log(`Thay đổi: ${result.data.changePercent}`);
      
      // Refresh UI
      await loadDonhangDetail(donhangId);
    }
  } catch (error) {
    console.error('❌ Lỗi:', error);
  }
};
```

---

### **Example 2: Xem lịch sử thay đổi giá**

```typescript
const viewPriceHistory = async (donhangId: string) => {
  const response = await fetch(`/api/donhang/price/${donhangId}/audit`);
  const history = await response.json();

  console.table(history.map(h => ({
    'Sản phẩm': h.sanphamName,
    'Giá cũ': h.oldPrice.toLocaleString(),
    'Giá mới': h.newPrice.toLocaleString(),
    'Thay đổi': `${h.changePercent.toFixed(2)}%`,
    'Lý do': h.changeReason,
    'Người sửa': h.changedByEmail,
    'Thời gian': new Date(h.createdAt).toLocaleString()
  })));
};
```

---

### **Example 3: Xác minh giá đơn hàng**

```typescript
const verifyPrices = async (donhangId: string) => {
  const response = await fetch(`/api/donhang/price/${donhangId}/verify`);
  const result = await response.json();

  console.log(`📊 Tổng sản phẩm: ${result.summary.total}`);
  console.log(`✅ Khớp giá: ${result.summary.matched}`);
  console.log(`⬆️ Giá cao hơn: ${result.summary.higher}`);
  console.log(`⬇️ Giá thấp hơn: ${result.summary.lower}`);

  // Highlight sản phẩm có chênh lệch
  result.verification
    .filter(v => v.hasDifference)
    .forEach(v => {
      console.warn(
        `⚠️ ${v.sanphamName}: ` +
        `Đơn hàng ${v.orderPrice.toLocaleString()} | ` +
        `Bảng giá ${v.currentPrice.toLocaleString()} | ` +
        `Chênh ${v.differencePercent}%`
      );
    });
};
```

---

## 🎨 **4. Frontend Integration**

### **Dialog Component - Edit Price**

```html
<!-- edit-price-dialog.component.html -->
<h2 mat-dialog-title>Điều Chỉnh Giá Sản Phẩm</h2>

<mat-dialog-content>
  <form [formGroup]="priceForm">
    <div class="product-info">
      <p><strong>Sản phẩm:</strong> {{ data.sanpham.title }}</p>
      <p><strong>Mã SP:</strong> {{ data.sanpham.masp }}</p>
      <p><strong>Giá hiện tại:</strong> {{ data.currentPrice | currency:'VND' }}</p>
    </div>

    <mat-form-field appearance="outline" class="w-full">
      <mat-label>Giá mới</mat-label>
      <input 
        matInput 
        type="number" 
        formControlName="newPrice"
        [min]="0">
      <span matPrefix>₫&nbsp;</span>
      <mat-error *ngIf="priceForm.get('newPrice')?.hasError('required')">
        Vui lòng nhập giá mới
      </mat-error>
      <mat-error *ngIf="priceForm.get('newPrice')?.hasError('min')">
        Giá phải lớn hơn 0
      </mat-error>
    </mat-form-field>

    <mat-form-field appearance="outline" class="w-full">
      <mat-label>Lý do thay đổi</mat-label>
      <textarea 
        matInput 
        formControlName="changeReason"
        rows="3"
        [required]="isLargeChange()">
      </textarea>
      <mat-hint *ngIf="isLargeChange()" class="text-amber-600">
        ⚠️ Thay đổi > 20% yêu cầu nhập lý do
      </mat-hint>
    </mat-form-field>

    <div class="price-preview" *ngIf="priceForm.get('newPrice')?.value">
      <p class="text-sm text-gray-600">
        Thay đổi: 
        <span [class]="getChangeClass()">
          {{ calculateChange() }}
        </span>
      </p>
    </div>
  </form>
</mat-dialog-content>

<mat-dialog-actions align="end">
  <button mat-button (click)="dialogRef.close()">Hủy</button>
  <button 
    mat-raised-button 
    color="primary" 
    (click)="save()"
    [disabled]="!priceForm.valid">
    Lưu
  </button>
</mat-dialog-actions>
```

```typescript
// edit-price-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-price-dialog',
  templateUrl: './edit-price-dialog.component.html'
})
export class EditPriceDialogComponent {
  priceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.priceForm = this.fb.group({
      newPrice: [data.currentPrice, [Validators.required, Validators.min(0)]],
      changeReason: ['']
    });

    // Watch for large changes
    this.priceForm.get('newPrice')?.valueChanges.subscribe(() => {
      if (this.isLargeChange()) {
        this.priceForm.get('changeReason')?.setValidators([Validators.required]);
      } else {
        this.priceForm.get('changeReason')?.clearValidators();
      }
      this.priceForm.get('changeReason')?.updateValueAndValidity();
    });
  }

  isLargeChange(): boolean {
    const newPrice = this.priceForm.get('newPrice')?.value;
    if (!newPrice || !this.data.currentPrice) return false;

    const changePercent = Math.abs(
      ((newPrice - this.data.currentPrice) / this.data.currentPrice) * 100
    );
    return changePercent > 20;
  }

  calculateChange(): string {
    const newPrice = this.priceForm.get('newPrice')?.value;
    if (!newPrice) return '-';

    const diff = newPrice - this.data.currentPrice;
    const percent = ((diff / this.data.currentPrice) * 100).toFixed(2);
    return `${diff >= 0 ? '+' : ''}${percent}%`;
  }

  getChangeClass(): string {
    const newPrice = this.priceForm.get('newPrice')?.value;
    if (!newPrice) return '';

    const diff = newPrice - this.data.currentPrice;
    if (diff > 0) return 'text-green-600 font-semibold';
    if (diff < 0) return 'text-red-600 font-semibold';
    return 'text-gray-600';
  }

  async save() {
    if (!this.priceForm.valid) return;

    const result = {
      newPrice: this.priceForm.value.newPrice,
      changeReason: this.priceForm.value.changeReason
    };

    this.dialogRef.close(result);
  }
}
```

---

### **Usage in Donhang Detail Component**

```typescript
// donhang-detail.component.ts
async editPrice(donhangsanpham: any) {
  const dialogRef = this.dialog.open(EditPriceDialogComponent, {
    width: '500px',
    data: {
      donhangId: this.donhang.id,
      donhangsanphamId: donhangsanpham.id,
      sanphamId: donhangsanpham.idSP,
      sanpham: donhangsanpham.sanpham,
      currentPrice: Number(donhangsanpham.giaban)
    }
  });

  const result = await dialogRef.afterClosed().toPromise();

  if (result) {
    try {
      const response = await this.donhangService.updateProductPrice({
        donhangId: this.donhang.id,
        donhangsanphamId: donhangsanpham.id,
        sanphamId: donhangsanpham.idSP,
        newPrice: result.newPrice,
        changeReason: result.changeReason
      });

      this.snackBar.open('✅ Cập nhật giá thành công', 'OK', {
        duration: 3000
      });

      // Refresh
      await this.loadDonhangDetail();
    } catch (error) {
      this.snackBar.open('❌ Lỗi: ' + error.message, 'Đóng', {
        duration: 5000
      });
    }
  }
}
```

---

## 📊 **5. Database Queries**

### **Xem tất cả thay đổi giá của đơn hàng DH001**

```sql
SELECT 
  dpa.*,
  s.masp,
  s.title as sanpham_name,
  dh.madonhang
FROM "DonhangPriceAudit" dpa
JOIN "Sanpham" s ON dpa."sanphamId" = s.id
JOIN "Donhang" dh ON dpa."donhangId" = dh.id
WHERE dh.madonhang = 'DH001'
ORDER BY dpa."createdAt" DESC;
```

### **Tìm sản phẩm có thay đổi giá > 20% trong 30 ngày**

```sql
SELECT 
  s.masp,
  s.title,
  dpa."oldPrice",
  dpa."newPrice",
  dpa."changePercent",
  dpa."changeReason",
  dpa."createdAt"
FROM "DonhangPriceAudit" dpa
JOIN "Sanpham" s ON dpa."sanphamId" = s.id
WHERE ABS(dpa."changePercent") > 20
  AND dpa."createdAt" >= NOW() - INTERVAL '30 days'
ORDER BY ABS(dpa."changePercent") DESC;
```

### **Thống kê số lần thay đổi giá theo sản phẩm**

```sql
SELECT 
  s.masp,
  s.title,
  COUNT(*) as total_changes,
  AVG(dpa."changePercent") as avg_change_percent,
  MIN(dpa."newPrice") as min_price,
  MAX(dpa."newPrice") as max_price
FROM "DonhangPriceAudit" dpa
JOIN "Sanpham" s ON dpa."sanphamId" = s.id
GROUP BY s.masp, s.title
HAVING COUNT(*) > 1
ORDER BY total_changes DESC;
```

---

## ✅ **6. Testing Checklist**

### **Manual Testing**

- [ ] Cập nhật giá sản phẩm trong đơn hàng chưa giao
- [ ] Cập nhật giá với thay đổi < 20% (không cần lý do)
- [ ] Cập nhật giá với thay đổi > 20% (yêu cầu lý do)
- [ ] Cố gắng cập nhật giá đơn hàng đã giao (should fail)
- [ ] Xem lịch sử audit log
- [ ] Xác minh giá đơn hàng vs bảng giá
- [ ] Xem lịch sử giá bảng giá
- [ ] So sánh giá hiện tại vs lịch sử
- [ ] Xem thống kê biến động giá

### **API Testing**

```bash
# Test 1: Update price
curl -X POST http://localhost:3000/donhang/price/update \
  -H "Content-Type: application/json" \
  -d '{
    "donhangId": "uuid",
    "donhangsanphamId": "uuid",
    "sanphamId": "uuid",
    "newPrice": 12000,
    "changeReason": "Test"
  }'

# Test 2: Get audit history
curl http://localhost:3000/donhang/price/{donhangId}/audit

# Test 3: Verify prices
curl http://localhost:3000/donhang/price/{donhangId}/verify

# Test 4: Get price history
curl http://localhost:3000/donhang/price/banggia/{banggiaId}/history?limit=50

# Test 5: Price comparison
curl http://localhost:3000/donhang/price/banggia/{banggiaId}/product/{sanphamId}/comparison

# Test 6: Statistics
curl http://localhost:3000/donhang/price/product/{sanphamId}/statistics?days=30
```

---

## 🎉 **Summary**

### **Đã triển khai:**
✅ Database tables (BanggiasanphamHistory, DonhangPriceAudit)  
✅ Backend services (PriceHistoryService, DonhangService updates)  
✅ API endpoints (6 endpoints for price management)  
✅ DTO validations  
✅ Audit trail tracking  
✅ Price verification logic  
✅ Error handling & validation rules  

### **Còn thiếu (Frontend):**
⏳ Edit price dialog component  
⏳ Price history timeline component  
⏳ Price verification UI  
⏳ Price statistics dashboard  

### **Thời gian ước tính:**
- ✅ Backend: HOÀN THÀNH (1 ngày)
- ⏳ Frontend: 2-3 ngày
- **Total:** ~4 ngày

---

**🔖 Document Version:** 1.0.0  
**📅 Created:** 2025-01-16  
**👤 Author:** Development Team  
**✅ Status:** Backend Complete, Frontend Pending
