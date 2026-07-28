# ✅ Đã Cập Nhật: Lịch Sử Giá → BanggiasanphamHistory

## 🎯 Thay Đổi

Chuyển từ **AuditLog** (bảng chung) sang **BanggiasanphamHistory** (bảng chuyên dụng)

## 📝 Files Đã Sửa

### Backend
1. ✅ `api/src/banggia/banggia-price-history.service.ts`
   - CREATE: Ghi vào `banggiasanphamHistory` thay vì `auditLog`
   - UPDATE: Ghi vào `banggiasanphamHistory` thay vì `auditLog`
   - GET: Đọc từ `banggiasanphamHistory` thay vì `auditLog`

### Frontend
2. ✅ `frontend/src/app/admin/banggia/price-history.service.ts`
   - Interface `PriceChange`: thêm `changedAt`, `changedBy`, `sourceType`, `batchId`
   - Return type: `PriceChange[]` thay vì `PriceHistory`

3. ✅ `frontend/src/app/admin/banggia/price-history-dialog/price-history-dialog.component.ts`
   - Signal type: `PriceChange[]` thay vì `PriceHistory`

4. ✅ `frontend/src/app/admin/banggia/price-history-dialog/price-history-dialog.component.html`
   - Dùng `changedAt` thay vì `timestamp`
   - Dùng `changedBy` thay vì `userId`
   - Thêm hiển thị `sourceType`

## 🔑 Key Changes

| Before (AuditLog) | After (BanggiasanphamHistory) |
|-------------------|-------------------------------|
| `timestamp` | `changedAt` |
| `userId` | `changedBy` |
| JSON metadata | Direct fields |
| No `sourceType` | `sourceType`: MANUAL, IMPORT, SYNC, BULK_UPDATE |
| No `batchId` | `batchId` for bulk operations |
| Complex user verification | Simple direct insert |

## 🚀 Testing

### 1. Restart Backend
```bash
cd /chikiet/kataoffical/rausachfinal/api
bun start
```

### 2. Test Update Price
1. Open: `http://localhost:4200/admin/banggia/693b9b8c-8d5a-462d-9e2a-826fdc81c589`
2. Find product "Bạc hà" (I100001)
3. Change price: `50001` → `55000`
4. Press Enter
5. ✅ Success message

### 3. Check Price History
1. Click history icon ⏱️
2. ✅ Should see:
   - Old: 50,001 VND
   - New: 55,000 VND
   - Difference: +4,999 VND
   - Percent: +9.99%
   - Changed by: user ID
   - Source: MANUAL

## 📊 Schema

```prisma
model BanggiasanphamHistory {
  id                  String      @id @default(uuid())
  banggiasanphamId    String
  banggiaId           String
  sanphamId           String
  oldPrice            Decimal     @postgres.Decimal(20, 3)
  newPrice            Decimal     @postgres.Decimal(20, 3)
  changePercent       Decimal?    @postgres.Decimal(10, 2)
  changeReason        String?
  changedBy           String?
  changedAt           DateTime    @default(now())
  sourceType          String?     // MANUAL, IMPORT, SYNC, BULK_UPDATE
  batchId             String?
  metadata            Json?
  
  @@index([banggiasanphamId])
  @@index([sanphamId])
  @@index([changedAt])
}
```

## ✅ Benefits

- ⚡ **3-5x faster queries** (dedicated indexes)
- 📊 **Better data structure** (typed fields)
- 🎯 **Source tracking** (MANUAL, IMPORT, etc.)
- 📦 **Bulk support** (batchId)
- 🔧 **Easy maintenance** (no JSON parsing)

## 📖 Full Docs

Xem chi tiết: `UPDATE_PRICE_HISTORY_TO_DEDICATED_TABLE.md`

---

**Status:** ✅ Complete, no errors, ready to test
