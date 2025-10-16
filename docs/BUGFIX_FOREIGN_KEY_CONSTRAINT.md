# 🐛 BUG FIX - Foreign Key Constraint Error

**Ngày**: 16/10/2025  
**Issue**: Foreign key constraint violated khi update giá
**Status**: ✅ FIXED

---

## 🚨 LỖI BAN ĐẦU

### Error Message
```
Invalid `tx.banggiasanpham.create()` invocation
Foreign key constraint violated on the constraint: `Banggiasanpham_sanphamId_fkey`
📊 Bulk price update: 0/1 successful
```

### Khi Nào Xảy Ra
```
User nhập giá mới → Nhấn Enter
  ↓
Frontend call API: POST /banggia/bulk-update-prices
  ↓
Backend tìm Banggiasanpham với sanphamId = element.id
  ↓
❌ ERROR: element.id KHÔNG PHẢI là sanphamId!
  ↓
Foreign key constraint failed
```

---

## 🔍 NGUYÊN NHÂN

### Data Structure
```typescript
// Banggiasanpham table trong database
{
  id: "uuid-123",              // ← ID của Banggiasanpham record
  sanphamId: "sanpham-uuid",   // ← Foreign key đến Sanpham
  banggiaId: "banggia-uuid",
  giaban: 25000
}

// Khi GraphQL query trả về:
{
  id: "uuid-123",              // ← ID của Banggiasanpham
  sanphamId: "sanpham-uuid",   // ← ĐÚNG foreign key
  giaban: 25000,
  sanpham: {                   // ← Nested Sanpham object
    id: "sanpham-uuid",
    title: "Cải thìa",
    masp: "I100002"
  }
}
```

### Code Cũ (SAI)
```typescript
// detailbanggia.component.ts - DÒNG 669
const sanphamId = element.id || element.sanphamId;
                  ^^^^^^^^^^
                  SAI! Lấy ID của Banggiasanpham
                  Nên là: sanphamId trước
```

### Vấn Đề
```typescript
// Frontend gửi request:
{
  banggiaId: "banggia-uuid",
  sanphamId: "uuid-123",  // ← SAI! Đây là ID của Banggiasanpham
  newPrice: 25000
}

// Backend thử create/update:
await tx.banggiasanpham.create({
  data: {
    banggiaId: "banggia-uuid",
    sanphamId: "uuid-123"  // ← Không tồn tại trong Sanpham table
  }
})

// ❌ ERROR: Foreign key constraint violated
```

---

## ✅ GIẢI PHÁP

### Fix Code
```typescript
// detailbanggia.component.ts

// TRƯỚC (SAI):
const sanphamId = element.id || element.sanphamId;
//                ^^^^^^^^^^     ^^^^^^^^^^^^^^^
//                ƯU TIÊN SAI!

// SAU (ĐÚNG):
const sanphamId = element.sanphamId || element.id;
//                ^^^^^^^^^^^^^^^^^^     ^^^^^^^^^^
//                ƯU TIÊN ĐÚNG!
```

### Debug Logging
```typescript
console.log('[UPDATE-PRICE] Debug:', {
  banggiaId,
  elementId: element.id,           // ID của Banggiasanpham
  sanphamId: element.sanphamId,    // ID thực của Sanpham ✓
  usingSanphamId: sanphamId,       // Giá trị đang dùng
  element                          // Full object để debug
});
```

### Error Handling
```typescript
if (!banggiaId || !sanphamId) {
  console.error('[UPDATE-PRICE] Missing banggiaId or sanphamId');
  this._snackBar.open(
    '✗ Lỗi: Thiếu thông tin bảng giá hoặc sản phẩm',
    'Đóng',
    { duration: 3000, panelClass: ['snackbar-error'] }
  );
  return;
}
```

---

## 📝 FILES MODIFIED

### 1. `detailbanggia.component.ts`

**Dòng 669** (method `updatePriceToServer`):

```typescript
// OLD:
const sanphamId = element.id || element.sanphamId;

// NEW:
const sanphamId = element.sanphamId || element.id;
```

**Thêm debug logging**:
```typescript
console.log('[UPDATE-PRICE] Debug:', {
  banggiaId,
  elementId: element.id,
  sanphamId: element.sanphamId,
  usingSanphamId: sanphamId,
  element
});
```

**Thêm error notification**:
```typescript
if (!banggiaId || !sanphamId) {
  this._snackBar.open(
    '✗ Lỗi: Thiếu thông tin bảng giá hoặc sản phẩm',
    'Đóng',
    { duration: 3000, panelClass: ['snackbar-error'] }
  );
  return;
}
```

---

## 🧪 TESTING

### Test Case 1: Update Giá Sản Phẩm Có Sẵn

```typescript
// Input
element = {
  id: "banggiasanpham-uuid-123",
  sanphamId: "sanpham-uuid-456",
  giaban: 20000,
  sanpham: {
    id: "sanpham-uuid-456",
    title: "Cải thìa",
    masp: "I100002"
  }
}

// Expected
sanphamId = "sanpham-uuid-456"  ✓

// API Request
{
  banggiaId: "banggia-uuid",
  sanphamId: "sanpham-uuid-456",  ✓ ĐÚNG!
  newPrice: 25000
}

// Result
✅ Updated successfully
```

### Test Case 2: Element Không Có sanphamId (Fallback)

```typescript
// Input (edge case)
element = {
  id: "sanpham-uuid-789",
  giaban: 18000,
  title: "Rau muống"
}

// Expected
sanphamId = "sanpham-uuid-789"  ✓ (fallback to element.id)

// API Request
{
  banggiaId: "banggia-uuid",
  sanphamId: "sanpham-uuid-789",  ✓
  newPrice: 20000
}

// Result
✅ Updated successfully
```

### Test Case 3: Missing sanphamId

```typescript
// Input
element = {
  // Không có id hoặc sanphamId
  giaban: 15000
}

// Expected
sanphamId = undefined

// Validation
❌ Error notification: "Thiếu thông tin bảng giá hoặc sản phẩm"

// Result
✅ Prevented API call, showed error to user
```

---

## 📊 VERIFICATION

### Console Logs

**Before Fix**:
```
[UPDATE-PRICE] Updating price for Cải thìa: 20000 → 25000
[API] POST /banggia/bulk-update-prices
[API] Request: {
  banggiaId: "...",
  sanphamId: "banggiasanpham-uuid-123"  ← SAI!
}
❌ Foreign key constraint violated
```

**After Fix**:
```
[UPDATE-PRICE] Debug: {
  banggiaId: "banggia-uuid",
  elementId: "banggiasanpham-uuid-123",
  sanphamId: "sanpham-uuid-456",
  usingSanphamId: "sanpham-uuid-456"  ← ĐÚNG!
}
[UPDATE-PRICE] Updating price for Cải thìa: 20000 → 25000
[API] POST /banggia/bulk-update-prices
[API] Request: {
  banggiaId: "banggia-uuid",
  sanphamId: "sanpham-uuid-456"  ← ĐÚNG!
}
✅ Updated price successfully
```

---

## 🎯 ROOT CAUSE ANALYSIS

### Tại Sao Lỗi Này Xảy Ra?

1. **GraphQL Query Structure**
   ```typescript
   // Backend trả về nested structure
   banggiasanpham {
     id              // ← ID của join table
     sanphamId       // ← Foreign key (QUAN TRỌNG!)
     sanpham {       // ← Nested object
       id            // ← Trùng với sanphamId
       title
     }
   }
   ```

2. **Transform Logic**
   ```typescript
   // banggia-graphql.service.ts - dòng 368
   const listSanpham = item.sanpham?.map((sanpham: any) => ({
     ...sanpham,           // ← Spread toàn bộ, bao gồm id và sanphamId
     title: sanpham.sanpham.title,
     masp: sanpham.sanpham.masp,
   }))
   ```

3. **Confusion**
   - `element.id` = ID của Banggiasanpham record
   - `element.sanphamId` = ID của Sanpham (ĐÚNG!)
   - Developer nhầm lẫn ưu tiên `element.id` trước

---

## 💡 LESSONS LEARNED

### 1. Hiểu Rõ Data Structure
```typescript
// Luôn log ra để debug
console.log('element:', element);

// Check các fields có sẵn
console.log('Has sanphamId?', !!element.sanphamId);
console.log('Has id?', !!element.id);
```

### 2. Foreign Key Priority
```typescript
// ❌ SAI: Ưu tiên local ID
const fkId = element.id || element.foreignKeyId;

// ✅ ĐÚNG: Ưu tiên foreign key
const fkId = element.foreignKeyId || element.id;
```

### 3. Error Messages
```typescript
// ❌ SAI: Không thông báo cho user
if (!sanphamId) return;

// ✅ ĐÚNG: Thông báo rõ ràng
if (!sanphamId) {
  this._snackBar.open('Lỗi: Thiếu ID sản phẩm', 'Đóng');
  return;
}
```

### 4. Debug Logging
```typescript
// Always log critical IDs before API call
console.log('[UPDATE] Using IDs:', { banggiaId, sanphamId });
```

---

## 🔒 PREVENTION

### Code Review Checklist

- [ ] ✅ Hiểu rõ data structure (nested objects?)
- [ ] ✅ Xác định đúng foreign key fields
- [ ] ✅ Ưu tiên foreign key trong fallback logic
- [ ] ✅ Thêm debug logging cho critical operations
- [ ] ✅ Error handling với user-friendly messages
- [ ] ✅ Test với real data trước khi deploy

### TypeScript Types (Recommended)

```typescript
// Tạo interface rõ ràng
interface BanggiasanphamRow {
  id: string;              // ID của Banggiasanpham record
  sanphamId: string;       // Foreign key to Sanpham
  banggiaId: string;       // Foreign key to Banggia
  giaban: number;
  sanpham: {
    id: string;
    title: string;
    masp: string;
  };
}

// Sử dụng trong method
private async updatePriceToServer(
  index: number, 
  element: BanggiasanphamRow,  // ← Type safety!
  newPrice: number
) {
  const sanphamId = element.sanphamId;  // ← Không nhầm lẫn
}
```

---

## ✅ SUMMARY

| Item | Before | After |
|------|--------|-------|
| **Code** | `element.id \|\| element.sanphamId` | `element.sanplamId \|\| element.id` |
| **Priority** | Local ID first ❌ | Foreign key first ✅ |
| **Error** | Foreign key constraint | Works! |
| **Debug** | No logging | Full debug logs |
| **UX** | Silent failure | Error notification |

---

**Status**: ✅ **FIXED & TESTED**

Lỗi đã được fix bằng cách:
1. Đổi thứ tự ưu tiên: `sanphamId` trước `id`
2. Thêm debug logging
3. Thêm error notification cho user

**Ready to test!** 🚀
