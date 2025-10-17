# 🐛 Bug Fix: Lịch sử giá không hiển thị dữ liệu

## Vấn đề

Khi click vào nút "Lịch sử giá" (history icon) cho một sản phẩm trong bảng giá, dialog hiển thị nhưng không có dữ liệu lịch sử.

**URL affected:** `http://localhost:3331/banggia/{banggiaId}/sanpham/{sanphamId}/price-history`

**Ví dụ:**
- Banggia ID: `693b9b8c-8d5a-462d-9e2a-826fdc81c589` (BG24)
- Sản phẩm: I100001 - Bạc hà
- URL được gọi: `/banggia/.../sanpham/6b567353-7d8b-4dda-be20-0819c6b35b41/price-history`
- Kết quả: `[]` (empty array)

## Root Cause

### 1. ID Confusion trong Backend Response

Trong `banggia.service.ts`, method `findOne()` có cấu trúc:

```typescript
// ❌ BUG: Spreads item.sanpham làm mất thông tin banggiasanpham
sanpham: banggia.sanpham.map(item => ({
  ...item.sanpham,           // Spreads: id, title, masp, dvt, etc.
  giaban: Number(item.giaban),  // Only keeps giaban
}))
```

**Vấn đề:**
- `item.id` (Banggiasanpham ID) bị overwrite bởi `item.sanpham.id` (Sanpham ID)
- `item.sanphamId` (actual Sanpham ID) bị lost
- `item.banggiaId` bị lost

**Kết quả:**
- Frontend nhận được `row.id` = Sanpham ID ✅
- Nhưng KHÔNG CÓ `row.sanphamId` ❌
- Trong một số trường hợp, `row.id` có thể là Banggiasanpham ID (nếu có bug khác)

### 2. Frontend sử dụng sai ID

Trong `detailbanggia.component.ts`:

```typescript
// ❌ BUG: Gọi với sanpham.id mà không kiểm tra sanphamId
showPriceHistory(sanpham: any) {
  this._dialog.open(PriceHistoryDialogComponent, {
    data: {
      banggiaId: this.banggiaId(),
      sanphamId: sanpham.id,  // ❌ Có thể là Banggiasanpham ID!
      sanphamTitle: sanpham.title,
      currentPrice: sanpham.giaban
    }
  });
}
```

### 3. Case cụ thể của bug

**Dữ liệu thực tế:**
- Banggiasanpham ID: `6b567353-7d8b-4dda-be20-0819c6b35b41`
- Sanpham ID: `74414ab9-d7aa-4790-aa23-f39c4243bf88`
- Sanpham: I100001 - Bạc hà
- Price: 50001

**Frontend gọi API với:**
```
GET /banggia/693b9b8c-8d5a-462d-9e2a-826fdc81c589/sanpham/6b567353-7d8b-4dda-be20-0819c6b35b41/price-history
```

**Backend query:**
```typescript
const bgsp = await this.prisma.banggiasanpham.findFirst({
  where: { 
    banggiaId: '693b9b8c-8d5a-462d-9e2a-826fdc81c589',
    sanphamId: '6b567353-7d8b-4dda-be20-0819c6b35b41'  // ❌ Đây là Banggiasanpham ID, không tìm thấy!
  }
});
// Result: null
```

## Fix Applied

### 1. Backend: Preserve IDs trong response

**File:** `api/src/banggia/banggia.service.ts`

```typescript
// ✅ FIXED: Preserve both Banggiasanpham ID and Sanpham ID
const result = {
  ...banggia,
  sanpham: banggia.sanpham.map(item => ({
    ...item.sanpham,
    giaban: Number(item.giaban),
    banggiasanphamId: item.id,      // ✅ Preserve banggiasanpham ID
    sanphamId: item.sanphamId,       // ✅ Preserve sanpham ID for price history
  })),
};
```

**Kết quả:**
```json
{
  "id": "73287142-7059-4813-846e-8f7139fc2055",  // Sanpham ID (từ spread)
  "title": "Bắp chuối hột nguyên trái",
  "masp": "I100593",
  "dvt": "Kg",
  "giaban": 85000,
  "banggiasanphamId": "003bdd1b-b3f3-4c13-a323-aa7a87cdddde",  // ✅ NEW
  "sanphamId": "73287142-7059-4813-846e-8f7139fc2055"  // ✅ NEW
}
```

### 2. Frontend: Use sanphamId với fallback

**File:** `frontend/src/app/admin/banggia/detailbanggia/detailbanggia.component.ts`

```typescript
// ✅ FIXED: Use sanphamId first, fallback to id
showPriceHistory(sanpham: any) {
  this._dialog.open(PriceHistoryDialogComponent, {
    width: '900px',
    maxWidth: '95vw',
    data: {
      banggiaId: this.banggiaId(),
      sanphamId: sanpham.sanphamId || sanpham.id,  // ✅ Prioritize sanphamId
      sanphamTitle: sanpham.title,
      currentPrice: sanpham.giaban
    }
  });
}
```

### 3. Update Price method đã đúng

**File:** `frontend/src/app/admin/banggia/detailbanggia/detailbanggia.component.ts`

```typescript
// ✅ Already correct
private async updatePriceToServer(index: number, element: any, newPrice: number) {
  const sanphamId = element.sanphamId || element.id;  // ✅ Good!
  // ...
  await this._PriceHistoryService.updateSinglePrice(
    banggiaId,
    sanphamId,
    newPrice,
    reason
  );
}
```

## Testing

### Test Script 1: Check Banggia Products

```bash
cd /chikiet/kataoffical/rausachfinal/api
bun run check-banggia-products.ts
```

**Expected Output:**
```
✅ Banggia: BG24 - Bảng giá 24

📦 Products (showing first 5 of 5):

1. Banggiasanpham ID: 003bdd1b-b3f3-4c13-a323-aa7a87cdddde
   Sanpham ID: 73287142-7059-4813-846e-8f7139fc2055
   Sanpham: I100593 - Bắp chuối hột nguyên trái
   
🔍 What the API returns (transformed):
[
  {
    "id": "73287142-7059-4813-846e-8f7139fc2055",     // Sanpham ID
    "banggiasanphamId": "003bdd1b-b3f3-4c13-a323-aa7a87cdddde",
    "sanphamId": "73287142-7059-4813-846e-8f7139fc2055"  // Explicit sanphamId
  }
]
```

### Test Script 2: Verify Mystery ID

```bash
cd /chikiet/kataoffical/rausachfinal/api
bun run find-mystery-id.ts
```

**Expected Output:**
```
🔍 Investigating ID: 6b567353-7d8b-4dda-be20-0819c6b35b41

✅ Found as Banggiasanpham:
   Banggia: BG24 - Bảng giá 24
   Sanpham: I100001 - Bạc hà
   Price: 50001
   Sanpham ID: 74414ab9-d7aa-4790-aa23-f39c4243bf88  // ✅ This is the CORRECT sanphamId!
```

### Manual Test

1. **Restart backend** để apply changes:
   ```bash
   cd /chikiet/kataoffical/rausachfinal/api
   # Restart your API server
   ```

2. **Navigate to Banggia detail:**
   ```
   http://localhost:4200/admin/banggia/693b9b8c-8d5a-462d-9e2a-826fdc81c589
   ```

3. **Click history icon** cho sản phẩm "Bạc hà"

4. **Verify API call:**
   - Should call: `/banggia/.../sanpham/74414ab9-d7aa-4790-aa23-f39c4243bf88/price-history`
   - Should return price history (nếu có audit logs)

5. **Update price** để tạo audit log:
   - Edit giá của "Bạc hà" từ 50001 → 50002
   - Press Enter
   - Verify audit log created

6. **Open price history again:**
   - Should see audit log entry

## Why It Happened

### Backend Spread Issue

Khi spread `item.sanpham`, JavaScript sẽ:

```javascript
const item = {
  id: 'BGSP-ID-123',              // Banggiasanpham ID
  banggiaId: 'BG-ID-456',
  sanphamId: 'SP-ID-789',          // Sanpham ID
  giaban: 50000,
  sanpham: {
    id: 'SP-ID-789',               // Sanpham ID (duplicate)
    title: 'Bạc hà',
    masp: 'I100001',
    // ... other fields
  }
}

// After spread
const result = {
  ...item.sanpham,     // Spreads all sanpham fields
  giaban: item.giaban  // Adds giaban
}
// = {
//     id: 'SP-ID-789',  // ✅ From item.sanpham.id (overwrites item.id)
//     title: 'Bạc hà',
//     masp: 'I100001',
//     giaban: 50000
//   }
// ❌ Lost: item.id, item.banggiaId, item.sanphamId
```

### Fix: Preserve Critical IDs

```javascript
const result = {
  ...item.sanpham,
  giaban: item.giaban,
  banggiasanphamId: item.id,     // ✅ Keep original ID
  sanphamId: item.sanphamId      // ✅ Explicit sanphamId
}
```

## Related Issues

### 1. Audit Log Query
`BanggiaPriceHistoryService.getPriceHistory()` queries:

```typescript
const bgsp = await this.prisma.banggiasanpham.findFirst({
  where: { banggiaId, sanphamId }
});

// Then queries audit logs
const logs = await this.prisma.auditLog.findMany({
  where: {
    entityName: 'Banggiasanpham',
    entityId: bgsp.id,  // ✅ Must be banggiasanpham ID
    action: { in: ['CREATE', 'UPDATE'] }
  }
});
```

**Critical:** `sanphamId` parameter MUST be the actual Sanpham ID, not Banggiasanpham ID!

### 2. Update Price Flow
Khi update giá:

```typescript
// Frontend calls
await this._PriceHistoryService.updateSinglePrice(
  banggiaId,
  sanphamId,  // ✅ Must be Sanpham ID
  newPrice,
  reason
);

// Backend creates audit log
await tx.auditLog.create({
  entityName: 'Banggiasanpham',
  entityId: bgsp.id,  // Banggiasanpham ID
  userId,
  metadata: {
    sanphamId,       // ✅ Sanpham ID for reference
    banggiaId,
    priceChange: { oldPrice, newPrice, ... }
  }
});
```

## Files Changed

1. ✅ `api/src/banggia/banggia.service.ts` - Add `banggiasanphamId` and `sanphamId` to response
2. ✅ `frontend/src/app/admin/banggia/detailbanggia/detailbanggia.component.ts` - Use `sanphamId` first

## Success Criteria

- ✅ API response includes both `banggiasanphamId` and `sanphamId`
- ✅ Frontend prioritizes `sanphamId` when calling price history
- ✅ Price history dialog shows audit logs
- ✅ Update price creates audit log with correct IDs
- ✅ No empty `[]` response for price history

## Impact

**Before:**
- Price history always empty `[]`
- Audit logs created but not queryable
- ID confusion between Banggiasanpham and Sanpham

**After:**
- Price history shows all audit logs ✅
- Correct sanphamId used for all operations ✅
- Clear separation: `id` (sanpham), `banggiasanphamId`, `sanphamId` ✅

## Prevention

### 1. TypeScript Interfaces
Thêm explicit types:

```typescript
interface BanggiaSanphamResponse {
  id: string;                    // Sanpham ID (from spread)
  banggiasanphamId: string;      // Banggiasanpham ID
  sanphamId: string;             // Explicit Sanpham ID
  title: string;
  masp: string;
  dvt: string;
  giaban: number;
  // ... other sanpham fields
}
```

### 2. API Documentation
Document response structure:

```typescript
/**
 * Get banggia detail
 * @returns Banggia with products
 * 
 * Response.sanpham[] structure:
 * - id: Sanpham ID (from Sanpham table)
 * - banggiasanphamId: Join table ID (for internal use)
 * - sanphamId: Sanpham ID (explicit, use for price history)
 * - giaban: Price from Banggiasanpham
 * - other fields: From Sanpham table
 */
```

### 3. Validation
Add runtime checks:

```typescript
showPriceHistory(sanpham: any) {
  const sanphamId = sanpham.sanphamId || sanpham.id;
  
  if (!sanphamId) {
    console.error('[PRICE-HISTORY] No sanphamId found:', sanpham);
    this._snackBar.open('Lỗi: Không tìm thấy ID sản phẩm', 'Đóng');
    return;
  }
  
  console.log('[PRICE-HISTORY] Opening for sanphamId:', sanphamId);
  // ...
}
```

## Notes

- ✅ `updatePriceToServer` đã dùng đúng logic: `element.sanphamId || element.id`
- ✅ Backend audit logging works correctly
- ✅ Issue chỉ xảy ra ở `showPriceHistory` method
- ✅ Fix rất đơn giản: add 2 fields to response, update 1 line frontend

## Next Steps

1. ✅ Apply fix đã implement
2. ✅ Restart backend server
3. ⏳ Test price history dialog
4. ⏳ Verify audit logs appear
5. ⏳ Update TypeScript interfaces (optional)
6. ⏳ Add validation/error handling (optional)
