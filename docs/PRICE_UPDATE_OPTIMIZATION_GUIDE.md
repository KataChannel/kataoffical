# 🚀 Hướng Dẫn Tối Ưu Cập Nhật Giá - Price Update Optimization

**Ngày**: 16/10/2025  
**Version**: 2.0  
**Tính năng mới**: Real-time Price Update + Pagination

---

## 📋 TỔNG QUAN CẢI TIẾN

### ✨ Tính Năng Mới

#### 1. **Pagination cho Table Sản Phẩm**
- ✅ Load giao diện nhanh hơn với pagination
- ✅ Hiển thị mặc định 25 sản phẩm/trang
- ✅ Tùy chọn: 10, 25, 50, 100 items/page
- ✅ Sorting tích hợp với pagination

#### 2. **Real-time Price Update** 
- ✅ Cập nhật giá TỨC THÌ lên server khi nhấn **Enter**
- ✅ Tự động ghi audit trail (lịch sử giá)
- ✅ Loading indicator khi đang update
- ✅ Error handling với revert on failure
- ✅ Success/Error notifications
- ✅ Keyboard navigation (Enter → next field)

---

## 🎯 CÁCH SỬ DỤNG

### 📊 Pagination Table

```typescript
// Frontend tự động load với pagination
// Không cần làm gì thêm!

Mặc định: 25 sản phẩm/trang
Tùy chọn: 10, 25, 50, 100 sản phẩm/trang
```

**UI Controls:**
- **Sorting**: Click vào header column để sort
- **Page size**: Dropdown ở cuối bảng
- **Navigation**: Nút Previous/Next, hoặc First/Last page

---

### ⚡ Real-time Price Update

#### Workflow Mới:

```
1. Click vào ô "Giá Bán"
2. Nhập giá mới (chỉ số, tự động format)
3. Nhấn ENTER
   ├─ ⏳ Loading indicator hiện
   ├─ 🌐 Gọi API cập nhật lên server
   ├─ 📝 Tự động ghi audit trail
   ├─ ✅ Success → Notification "✓ Đã cập nhật giá"
   └─ 🎯 Focus tự động sang sản phẩm tiếp theo

4. Nếu lỗi:
   ├─ ❌ Revert về giá cũ
   └─ 🔔 Error notification
```

#### Ví Dụ Thực Tế:

```
Sản phẩm: Cải thìa
Giá cũ: 20,000 VND
Giá mới: 25,000 VND

[User nhập 25000 → Enter]

⏳ Đang cập nhật...
  ├─ API Call: POST /banggia/bulk-update-prices
  ├─ Payload: {
  │     banggiaId: "bg-xxx",
  │     sanphamId: "sp-xxx",
  │     newPrice: 25000,
  │     reason: "Thay đổi giá +25%" (nếu % > 20%)
  │   }
  ├─ Audit Log: Tự động ghi vào AuditLog table
  └─ Response: Success!

✅ "Đã cập nhật giá: 25,000 VND"
🎯 Focus chuyển sang sản phẩm tiếp theo
```

---

## 🔧 TECHNICAL DETAILS

### 1. API Endpoint

```typescript
POST /banggia/bulk-update-prices

Request Body:
{
  "updates": [
    {
      "banggiaId": "banggia-uuid",
      "sanphamId": "sanpham-uuid",
      "newPrice": 25000,
      "reason": "Thay đổi giá +25%"
    }
  ],
  "userId": "user-uuid"
}

Response:
{
  "success": true,
  "updated": 1,
  "failed": 0,
  "results": [...]
}
```

### 2. Frontend Service

**File**: `price-history.service.ts`

```typescript
async updateSinglePrice(
  banggiaId: string, 
  sanphamId: string, 
  newPrice: number, 
  reason?: string
): Promise<any>
```

### 3. Component Logic

**File**: `detailbanggia.component.ts`

```typescript
// Trigger khi nhấn Enter
updateValue(event, index, element, 'giaban', 'number')
  ↓
updatePriceToServer(index, element, newPrice)
  ↓
this._PriceHistoryService.updateSinglePrice(...)
  ↓
Success: Update UI + Notification
Error: Revert + Error Notification
```

### 4. UI Components

```html
<!-- Price Input với Loading Indicator -->
<div 
  [contentEditable]="true"
  (keydown.enter)="updateValue($event, idx, row, 'giaban', 'number')"
  [class.opacity-50]="updatingPriceForRow() === idx"
  [attr.contenteditable]="updatingPriceForRow() === idx ? 'false' : 'true'">
  
  {{ row.giaban | number:'1.0-2' }}
  
  <!-- Loading Spinner -->
  <mat-icon 
    *ngIf="updatingPriceForRow() === idx" 
    class="animate-spin">
    sync
  </mat-icon>
</div>

<!-- Pagination -->
<mat-paginator 
  [pageSizeOptions]="[10, 25, 50, 100]" 
  [pageSize]="25"
  showFirstLastButtons>
</mat-paginator>
```

---

## ⚙️ CONFIGURATION

### Pagination Settings

```typescript
// detailbanggia.component.ts

// Mặc định
pageSize: 25

// Tùy chọn
pageSizeOptions: [10, 25, 50, 100]
```

### Auto-reason Generation

```typescript
// Tự động tạo lý do thay đổi giá

const percentChange = ((newPrice - oldPrice) / oldPrice) * 100;

if (percentChange > 20 || percentChange < -20) {
  reason = `Thay đổi giá ${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%`;
} else {
  reason = 'Cập nhật giá từ bảng giá';
}
```

---

## 🎨 UX IMPROVEMENTS

### 1. Loading States

```
⏳ Đang cập nhật:
  - Opacity 50% trên input
  - Disable contentEditable
  - Spinning sync icon
  - Prevent concurrent updates
```

### 2. Error Handling

```
❌ Lỗi xảy ra:
  - Revert về giá cũ (rollback)
  - Show error notification
  - Log error to console
  - Allow retry
```

### 3. Success Feedback

```
✅ Thành công:
  - Update local state
  - Show success notification
  - Auto focus next input
  - Clear from pending changes
```

### 4. Keyboard Navigation

```
Enter     → Save & move to next
Tab       → Move to next field
Esc       → Cancel edit (coming soon)
Arrows    → Navigate in text
```

---

## 📊 PERFORMANCE METRICS

### Before Optimization:
```
⚠️ Old Workflow:
1. Edit nhiều giá
2. Click "Save" button
3. Update all at once
4. Slow feedback
5. No individual error handling
```

### After Optimization:
```
✅ New Workflow:
1. Edit 1 giá → Enter → Saved ✓
2. Edit 1 giá → Enter → Saved ✓
3. Immediate feedback
4. Individual error handling
5. Faster perceived performance
```

### Table Performance:
```
✅ With Pagination (25 items):
- Initial render: ~100ms (fast!)
- Scroll: Smooth
- Sorting: Instant

⚠️ Without Pagination (1000+ items):
- Initial render: ~2000ms (slow)
- Scroll: Laggy
- Sorting: Slow
```

---

## 🔍 AUDIT TRAIL

### Tự Động Ghi Audit Log

```sql
-- Mỗi lần cập nhật giá, tự động ghi vào AuditLog

INSERT INTO "AuditLog" (
  "entityName",
  "entityId",
  "action",
  "oldValues",
  "newValues",
  "metadata",
  "userId",
  "createdAt"
) VALUES (
  'Banggiasanpham',
  'banggia-sanpham-id',
  'UPDATE',
  '{"giaban": 20000}',
  '{"giaban": 25000}',
  '{
    "banggiaCode": "GIABAN",
    "sanphamCode": "I100002",
    "sanphamTitle": "Cải thìa",
    "priceChange": {
      "difference": 5000,
      "percentChange": 25,
      "reason": "Thay đổi giá +25%"
    }
  }',
  'user-uuid',
  NOW()
);
```

### Xem Lịch Sử Giá

```typescript
// Click nút "Lịch sử giá" bên cạnh sản phẩm

Timeline hiển thị:
├─ 16/10/2025 10:30 - Giá: 25,000 (+25%) ✅
├─ 15/10/2025 09:00 - Giá: 20,000 (0%)
└─ 10/10/2025 08:00 - Giá: 20,000 (Tạo mới)
```

---

## 🚨 ERROR SCENARIOS

### 1. Network Error
```
Lỗi: Không kết nối được server
Hành động:
  ✅ Revert về giá cũ
  ✅ Show: "✗ Lỗi cập nhật giá: Network error"
  ✅ Retry available
```

### 2. Validation Error
```
Lỗi: Giá không hợp lệ (< 0 hoặc quá lớn)
Hành động:
  ✅ Revert về giá cũ
  ✅ Show: "✗ Lỗi cập nhật giá: Invalid price"
  ✅ Highlight input
```

### 3. Permission Error
```
Lỗi: Không có quyền cập nhật
Hành động:
  ✅ Revert về giá cũ
  ✅ Show: "✗ Lỗi cập nhật giá: Unauthorized"
  ✅ Redirect to login (nếu cần)
```

### 4. Concurrent Update
```
Lỗi: Đang update row khác
Hành động:
  ✅ Prevent concurrent updates
  ✅ Queue the update
  ✅ Process sequentially
```

---

## 💡 BEST PRACTICES

### 1. **Khi Sửa Giá Hàng Loạt**

```
❌ KHÔNG NÊN:
- Sửa nhiều giá → Click Save → Chờ lâu

✅ NÊN:
- Sửa 1 giá → Enter → Saved
- Sửa 1 giá → Enter → Saved
- Immediate feedback từng sản phẩm
```

### 2. **Khi Có Lỗi**

```
❌ KHÔNG NÊN:
- Bỏ qua thông báo lỗi
- Tiếp tục sửa giá khác

✅ NÊN:
- Đọc error message
- Fix lỗi (kiểm tra mạng, quyền, giá trị)
- Retry update
```

### 3. **Khi Cần Thay Đổi Lớn**

```
❌ KHÔNG NÊN:
- Sửa thủ công từng sản phẩm

✅ NÊN:
- Dùng Bulk Price Update (Excel upload)
- Hoặc: Price Analytics → Adjust by %
```

---

## 📈 MONITORING

### Check Performance

```typescript
// Console logs tự động
[UPDATE-PRICE] Updating price for Cải thìa: 20000 → 25000
[UPDATE-PRICE] Success
[PAGINATION] Paginator initialized
```

### Database Queries

```sql
-- Check recent price updates
SELECT 
  al."createdAt",
  al."metadata"->>'sanphamTitle' as product,
  (al."oldValues"->>'giaban')::numeric as old_price,
  (al."newValues"->>'giaban')::numeric as new_price,
  al."metadata"->'priceChange'->>'reason' as reason
FROM "AuditLog" al
WHERE al."entityName" = 'Banggiasanpham'
  AND al."action" = 'UPDATE'
  AND al."createdAt" >= NOW() - INTERVAL '1 day'
ORDER BY al."createdAt" DESC;
```

---

## 🎯 ROADMAP

### Completed ✅
- [x] Pagination table
- [x] Real-time price update
- [x] Loading indicators
- [x] Error handling
- [x] Auto-reason generation
- [x] Audit trail integration
- [x] Keyboard navigation

### Coming Soon 🚀
- [ ] Undo/Redo price changes
- [ ] Batch update with validation preview
- [ ] Price change approval workflow
- [ ] Export price change history to Excel
- [ ] Mobile-optimized price update

---

## 📞 SUPPORT

Nếu gặp vấn đề:
1. Kiểm tra Console logs
2. Kiểm tra Network tab (F12)
3. Kiểm tra AuditLog table
4. Liên hệ dev team

---

**🎉 Happy Price Updating!**
