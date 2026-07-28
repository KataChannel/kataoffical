# Fix Bug: Lịch Sử Giá Không Hiển Thị Dữ Liệu

## 🐛 Vấn Đề

Khi click nút "Lịch sử giá" (history icon) trong bảng giá detail, dialog mở nhưng không có dữ liệu.

**URL bị lỗi:**
```
http://localhost:3331/banggia/693b9b8c-8d5a-462d-9e2a-826fdc81c589/sanpham/6b567353-7d8b-4dda-be20-0819c6b35b41/price-history
```

**Kết quả:** `[]` (empty array)

## 🔍 Root Cause

ID `6b567353-7d8b-4dda-be20-0819c6b35b41` là **Banggiasanpham ID**, KHÔNG phải Sanpham ID!

**Sanpham ID thực sự:** `74414ab9-d7aa-4790-aa23-f39c4243bf88`

### Nguyên nhân

1. **Backend `findOne()` method** spread `item.sanpham` làm mất `sanphamId`:
   ```typescript
   // ❌ BUG
   sanpham: banggia.sanpham.map(item => ({
     ...item.sanpham,  // Spreads sanpham fields, overwrite item.id
     giaban: Number(item.giaban),
     // ❌ Lost: item.sanphamId, item.id (banggiasanpham)
   }))
   ```

2. **Frontend** gọi API với `sanpham.id` có thể là sai ID:
   ```typescript
   // ❌ BUG
   showPriceHistory(sanpham: any) {
     data: {
       sanphamId: sanpham.id,  // Có thể là Banggiasanpham ID!
     }
   }
   ```

## ✅ Fix Applied

### 1. Backend: Preserve IDs

**File:** `api/src/banggia/banggia.service.ts`

```typescript
// ✅ FIXED
const result = {
  ...banggia,
  sanpham: banggia.sanpham.map(item => ({
    ...item.sanpham,
    giaban: Number(item.giaban),
    banggiasanphamId: item.id,      // ✅ NEW: Preserve banggiasanpham ID
    sanphamId: item.sanphamId,       // ✅ NEW: Explicit sanpham ID
  })),
};
```

### 2. Frontend: Prioritize sanphamId

**File:** `frontend/src/app/admin/banggia/detailbanggia/detailbanggia.component.ts`

```typescript
// ✅ FIXED
showPriceHistory(sanpham: any) {
  this._dialog.open(PriceHistoryDialogComponent, {
    data: {
      banggiaId: this.banggiaId(),
      sanphamId: sanpham.sanphamId || sanpham.id,  // ✅ Prioritize sanphamId
      sanphamTitle: sanpham.title,
      currentPrice: sanpham.giaban
    }
  });
}
```

## 🧪 Testing

### 1. Restart Backend
```bash
cd /chikiet/kataoffical/rausachfinal/api
# Restart your backend server to apply changes
```

### 2. Test Price History

1. Mở: `http://localhost:4200/admin/banggia/693b9b8c-8d5a-462d-9e2a-826fdc81c589`
2. Tìm sản phẩm "Bạc hà" (I100001)
3. Click nút history icon
4. **Expected:** Dialog hiển thị với audit logs (nếu có)

### 3. Create Audit Log (nếu chưa có dữ liệu)

1. Sửa giá sản phẩm: `50001` → `50002`
2. Press Enter
3. Verify success message
4. Click history icon again
5. **Expected:** Thấy 1 audit log entry

## 📊 Impact

| Before | After |
|--------|-------|
| ❌ Price history luôn empty `[]` | ✅ Hiển thị audit logs |
| ❌ ID confusion | ✅ Rõ ràng: `id`, `banggiasanphamId`, `sanphamId` |
| ❌ Audit logs tạo nhưng không query được | ✅ Query đúng với sanphamId |

## 📝 Files Changed

1. ✅ `api/src/banggia/banggia.service.ts` - Line 557-561
2. ✅ `frontend/src/app/admin/banggia/detailbanggia/detailbanggia.component.ts` - Line 1109

## 🎯 Verification Script

```bash
# Check banggia products structure
cd /chikiet/kataoffical/rausachfinal/api
bun run check-banggia-products.ts

# Find mystery ID
bun run find-mystery-id.ts
```

**Expected Output:**
```
✅ Found as Banggiasanpham:
   Banggia: BG24 - Bảng giá 24
   Sanpham: I100001 - Bạc hà
   Sanpham ID: 74414ab9-d7aa-4790-aa23-f39c4243bf88  ✅ Correct ID!
```

## 🚀 Next Steps

1. ✅ Backend fix applied
2. ✅ Frontend fix applied
3. ⏳ Restart backend server
4. ⏳ Test manually
5. ⏳ Verify audit logs appear

---

**Status:** ✅ Fix complete, ready for testing
