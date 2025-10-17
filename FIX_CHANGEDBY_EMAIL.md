# ✅ Fix: changedBy ghi nhận Email thay vì userId

## 🐛 Vấn Đề

Field `changedBy` trong bảng `BanggiasanphamHistory` đang lưu **userId** (UUID), không user-friendly khi hiển thị lịch sử.

**Ví dụ:**
```
changedBy: "550e8400-e29b-41d4-a716-446655440000"  ❌ Khó đọc
```

## ✅ Giải Pháp

Lưu **email** của user vào `changedBy`, và lưu thêm thông tin trong `metadata` để có đủ context.

**Kết quả:**
```
changedBy: "admin@example.com"           ✅ Dễ đọc
metadata: {
  userId: "550e8400-e29b-41d4-a716-446655440000",
  userName: "Admin User",
  ...
}
```

## 🔧 Thay Đổi Code

### 1. Backend: CREATE Case

**Before:**
```typescript
await tx.banggiasanphamHistory.create({
  data: {
    changedBy: userId || 'system',  // ❌ Lưu userId
    metadata: { ... }
  }
});
```

**After:**
```typescript
// ✅ Get user email
let userEmail = 'system';
if (userId && userId !== 'system') {
  const user = await tx.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true }
  });
  userEmail = user?.email || user?.name || userId;
}

await tx.banggiasanphamHistory.create({
  data: {
    changedBy: userEmail,  // ✅ Lưu email
    metadata: {
      userId: userId,      // ✅ Lưu userId vào metadata
      ...
    }
  }
});
```

### 2. Backend: UPDATE Case

**Before:**
```typescript
await tx.banggiasanphamHistory.create({
  data: {
    changedBy: userId || 'system',  // ❌ Lưu userId
    metadata: { ... }
  }
});

console.log(`   Changed by: ${userId || 'system'}`);
```

**After:**
```typescript
// ✅ Get user email and name
let userEmail = 'system';
let userName = 'system';
if (userId && userId !== 'system') {
  const user = await tx.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true }
  });
  userEmail = user?.email || user?.name || userId;
  userName = user?.name || user?.email || userId;
}

await tx.banggiasanphamHistory.create({
  data: {
    changedBy: userEmail,    // ✅ Lưu email
    metadata: {
      userId: userId,        // ✅ Lưu userId
      userName: userName,    // ✅ Lưu userName
      ...
    }
  }
});

console.log(`   Changed by: ${userEmail} (${userName})`);
```

### 3. Backend: getPriceHistory Response

**Before:**
```typescript
return history.map(record => ({
  changedBy: record.changedBy,  // userId
  // ...
}));
```

**After:**
```typescript
return history.map(record => {
  // Extract user info from metadata
  const userName = record.metadata?.['userName'] || record.changedBy;
  const userId = record.metadata?.['userId'] || null;
  
  return {
    changedBy: record.changedBy,     // ✅ Email
    changedByName: userName,          // ✅ Name or Email
    changedByUserId: userId,          // ✅ Original userId
    // ...
  };
});
```

### 4. Frontend: Interface

**Before:**
```typescript
export interface PriceChange {
  changedBy: string;  // Unclear what this is
}
```

**After:**
```typescript
export interface PriceChange {
  changedBy: string;           // ✅ Email của user
  changedByName?: string;      // ✅ Name của user (nếu có)
  changedByUserId?: string;    // ✅ Original userId (nếu có)
}
```

### 5. Frontend: Template Display

**Before:**
```html
<p *ngIf="change.changedBy" class="user">
  <mat-icon>person</mat-icon>
  Người thay đổi: {{ change.changedBy }}  <!-- Shows userId ❌ -->
</p>
```

**After:**
```html
<p *ngIf="change.changedBy" class="user">
  <mat-icon>person</mat-icon>
  Người thay đổi: {{ change.changedByName || change.changedBy }}  <!-- Shows name or email ✅ -->
</p>
```

## 📊 Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER UPDATES PRICE                          │
└─────────────────────────────────────────────────────────────────┘

Frontend sends:
{
  banggiaId: "...",
  sanphamId: "...",
  newPrice: 55000,
  userId: "550e8400-e29b-41d4-a716-446655440000",
  reason: "Update price"
}

Backend processes:
1. Lookup user:
   SELECT email, name FROM "User" WHERE id = '550e8400-e29b-41d4-a716-446655440000'
   
   Result: { email: "admin@example.com", name: "Admin User" }

2. Save to BanggiasanphamHistory:
   INSERT INTO "BanggiasanphamHistory" (
     changedBy,
     metadata,
     ...
   ) VALUES (
     'admin@example.com',                         ✅ Email
     '{"userId": "550e...", "userName": "Admin User", ...}',
     ...
   )

3. Return to frontend:
   {
     changedBy: "admin@example.com",              ✅ Email
     changedByName: "Admin User",                 ✅ Name
     changedByUserId: "550e8400-e29b-41d4-a716-446655440000"
   }

Frontend displays:
"Người thay đổi: Admin User"                      ✅ User-friendly
```

## 🎯 Logic Priority

### For changedBy field:
1. **First:** `user.email` (most preferred)
2. **Fallback:** `user.name` (if email null)
3. **Last resort:** `userId` (if both null)
4. **Default:** `'system'` (if no userId)

### For display in frontend:
1. **First:** `changedByName` (name)
2. **Fallback:** `changedBy` (email)

### Example scenarios:

| User Data | changedBy | changedByName | Display |
|-----------|-----------|---------------|---------|
| email: "admin@ex.com"<br>name: "Admin" | "admin@ex.com" | "Admin" | "Admin" ✅ |
| email: "user@ex.com"<br>name: null | "user@ex.com" | "user@ex.com" | "user@ex.com" ✅ |
| email: null<br>name: "John" | "John" | "John" | "John" ✅ |
| email: null<br>name: null | "550e8400-..." | "550e8400-..." | "550e8400-..." ⚠️ |
| userId: null | "system" | "system" | "system" ✅ |

## 📁 Files Changed

1. ✅ `api/src/banggia/banggia-price-history.service.ts`
   - Line 51-72: CREATE case - lookup user, save email
   - Line 131-147: UPDATE case - lookup user, save email + name
   - Line 232-244: getPriceHistory - extract userName from metadata

2. ✅ `frontend/src/app/admin/banggia/price-history.service.ts`
   - Line 11-13: Add `changedByName`, `changedByUserId` to interface

3. ✅ `frontend/src/app/admin/banggia/price-history-dialog/price-history-dialog.component.html`
   - Line 98: Display `changedByName || changedBy`

## 🧪 Testing

### Test 1: Create New Price

```bash
curl -X POST http://localhost:3331/banggia/bulk-update-prices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "updates": [{
      "banggiaId": "693b9b8c-8d5a-462d-9e2a-826fdc81c589",
      "sanphamId": "74414ab9-d7aa-4790-aa23-f39c4243bf88",
      "newPrice": 60000,
      "reason": "Test email storage"
    }],
    "userId": "your-user-id"
  }'
```

**Expected Database:**
```sql
SELECT changedBy, metadata FROM "BanggiasanphamHistory" 
ORDER BY "changedAt" DESC LIMIT 1;

-- Result:
changedBy: "admin@example.com"
metadata: {
  "userId": "your-user-id",
  "userName": "Admin User",
  "action": "CREATE",
  ...
}
```

### Test 2: Get Price History

```bash
curl -X GET "http://localhost:3331/banggia/.../sanpham/.../price-history" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
[
  {
    "id": "...",
    "oldPrice": 55000,
    "newPrice": 60000,
    "changedBy": "admin@example.com",
    "changedByName": "Admin User",
    "changedByUserId": "550e8400-e29b-41d4-a716-446655440000",
    "changedAt": "2025-10-18T...",
    ...
  }
]
```

### Test 3: Frontend Display

1. Open banggia detail page
2. Update product price
3. Click history icon
4. **Expected:** See "Người thay đổi: Admin User" (not UUID)

### Test 4: System User (no userId)

```typescript
await updatePrice({
  banggiaId: "...",
  sanphamId: "...",
  newPrice: 50000,
  userId: null  // or 'system'
});
```

**Expected:**
```
changedBy: "system"
changedByName: "system"
```

## ✅ Benefits

| Before | After |
|--------|-------|
| ❌ `changedBy: "550e8400-e29b-41d4-a716-446655440000"` | ✅ `changedBy: "admin@example.com"` |
| ❌ Khó đọc, cần lookup user | ✅ Dễ đọc ngay |
| ❌ Display shows UUID | ✅ Display shows name |
| ❌ Không có name info | ✅ Có cả name và email |
| ❌ Lost userId if needed | ✅ Preserved in metadata |

## 📝 Notes

- ✅ **Backward compatible:** userId vẫn được lưu trong metadata
- ✅ **Graceful fallback:** Nếu email null, dùng name hoặc userId
- ✅ **Better UX:** User thấy tên người sửa, không phải UUID
- ✅ **No breaking changes:** Existing code vẫn hoạt động
- ✅ **Enhanced logging:** Console logs show email + name

## 🎯 Success Criteria

- [x] Backend queries user email/name
- [x] changedBy stores email (not userId)
- [x] metadata stores userId, userName
- [x] Frontend receives changedByName
- [x] Template displays name (fallback email)
- [x] Console logs show email + name
- [x] No TypeScript errors
- [x] Graceful fallback for missing data

## 🚀 Next Steps

1. ⏳ Restart backend server
2. ⏳ Test price update
3. ⏳ Check database `changedBy` field
4. ⏳ Verify frontend displays name
5. ⏳ Test with user without name
6. ⏳ Test with system user

---

**Status:** ✅ Implementation complete, ready for testing
