# 📝 UPDATE - Price Validation Logic Change

**Ngày**: 16/10/2025  
**Thay đổi**: Từ "Reject" → "Log & Allow"  
**Status**: ✅ UPDATED

---

## 🔄 THAY ĐỔI LOGIC

### Trước (Reject)
```typescript
// Throw error nếu thay đổi giá > 20% và không có lý do
if (priceChange > 0.2 && !hasValidReason) {
  throw new BadRequestException(
    `Thay đổi giá quá lớn (${priceChange * 100}%). Vui lòng nhập lý do.`
  );
}

// ❌ Chặn cập nhật giá
```

### Sau (Log & Allow)
```typescript
// Chỉ ghi log cảnh báo nhưng VẪN CHO PHÉP cập nhật
if (priceChange > 0.2) {
  if (hasValidReason) {
    console.log(`⚠️ Large price change with reason`);
  } else {
    console.warn(`⚠️ Large price change WITHOUT reason`);
  }
}

// ✅ Vẫn cho phép cập nhật giá
```

---

## 🎯 MỤC ĐÍCH

### Business Requirements
```
Yêu cầu mới:
- Cho phép cập nhật giá BẤT KỲ giá trị nào
- Không chặn user khi thay đổi giá lớn
- Chỉ ghi log để audit/tracking
- Trust user input
```

### Use Cases

#### Case 1: Thay Đổi Giá Lớn Có Lý Do
```typescript
Input:
  oldPrice: 5
  newPrice: 20
  reason: "Thay đổi giá +300%"

Behavior:
  ⚠️ Log: "Large price change with reason"
  ✅ Update: 5 → 20
  📝 Audit log: Saved with reason
```

#### Case 2: Thay Đổi Giá Lớn KHÔNG Có Lý Do
```typescript
Input:
  oldPrice: 5
  newPrice: 20
  reason: "" (empty)

Behavior:
  ⚠️ Warn: "Large price change WITHOUT reason"
  ✅ Update: 5 → 20 (VẪN CHO PHÉP!)
  📝 Audit log: Saved without reason
  💡 Note: "Consider adding reason for audit purposes"
```

#### Case 3: Thay Đổi Giá Nhỏ
```typescript
Input:
  oldPrice: 100
  newPrice: 110
  reason: ""

Behavior:
  (Không log gì - thay đổi < 20%)
  ✅ Update: 100 → 110
  📝 Audit log: Normal update
```

---

## 📝 CODE CHANGES

### File: `banggia-price-history.service.ts`

**Dòng 95-110**:

```typescript
// Calculate price change percentage
const priceChange = Math.abs((newPrice - oldPrice) / oldPrice);

// Note: Log warning for large price changes (>20%)
// Frontend auto-generates reason when change > 20%
// But still allow the update to proceed
const hasValidReason = reason && reason.trim().length > 0;

if (priceChange > 0.2) {
  if (hasValidReason) {
    console.log(`⚠️  [PRICE-UPDATE] Large price change with reason:`, {
      oldPrice,
      newPrice,
      priceChange: (priceChange * 100).toFixed(1) + '%',
      reason
    });
  } else {
    console.warn(`⚠️  [PRICE-UPDATE] Large price change WITHOUT reason:`, {
      oldPrice,
      newPrice,
      priceChange: (priceChange * 100).toFixed(1) + '%',
      note: 'Consider adding reason for audit purposes'
    });
  }
}

// Continue to update (no throw error)
```

---

## 🧪 TESTING

### Test 1: Giá +300% Có Lý Do

**Input**:
```json
{
  "banggiaId": "...",
  "sanphamId": "...",
  "oldPrice": 5,
  "newPrice": 20,
  "reason": "Thay đổi giá +300%"
}
```

**Console Output**:
```
⚠️  [PRICE-UPDATE] Large price change with reason: {
  oldPrice: 5,
  newPrice: 20,
  priceChange: '300.0%',
  reason: 'Thay đổi giá +300%'
}
✅ Updated price: I100002 in GIABAN: 5 → 20
```

**Result**: ✅ **SUCCESS** - Updated

---

### Test 2: Giá +300% KHÔNG Có Lý Do

**Input**:
```json
{
  "banggiaId": "...",
  "sanphamId": "...",
  "oldPrice": 5,
  "newPrice": 20,
  "reason": ""
}
```

**Console Output**:
```
⚠️  [PRICE-UPDATE] Large price change WITHOUT reason: {
  oldPrice: 5,
  newPrice: 20,
  priceChange: '300.0%',
  note: 'Consider adding reason for audit purposes'
}
✅ Updated price: I100002 in GIABAN: 5 → 20
```

**Result**: ✅ **SUCCESS** - Updated (with warning)

---

### Test 3: Giá +10% Không Lý Do

**Input**:
```json
{
  "banggiaId": "...",
  "sanphamId": "...",
  "oldPrice": 100,
  "newPrice": 110,
  "reason": ""
}
```

**Console Output**:
```
✅ Updated price: I100002 in GIABAN: 100 → 110
```

**Result**: ✅ **SUCCESS** - Updated (no warning)

---

## 📊 BEHAVIOR SUMMARY

| Price Change | Has Reason? | Console Log | Update? |
|--------------|-------------|-------------|---------|
| ≤ 20% | No | None | ✅ Yes |
| ≤ 20% | Yes | None | ✅ Yes |
| > 20% | No | ⚠️ WARN | ✅ Yes |
| > 20% | Yes | ⚠️ LOG | ✅ Yes |
| > 100% | No | ⚠️ WARN | ✅ Yes |
| > 100% | Yes | ⚠️ LOG | ✅ Yes |

**Kết luận**: LUÔN CHO PHÉP cập nhật giá!

---

## 🔍 AUDIT TRAIL

### Vẫn Ghi Đầy Đủ Audit Log

```typescript
// Audit log LUÔN được ghi, bất kể có lý do hay không
await tx.auditLog.create({
  data: {
    entityName: 'Banggiasanpham',
    entityId: currentBgsp.id,
    action: 'UPDATE',
    userId,
    oldValues: { giaban: oldPrice },
    newValues: { giaban: newPrice },
    changedFields: ['giaban'],
    metadata: {
      banggiaId,
      sanphamId,
      priceChange: {
        oldPrice,
        newPrice,
        difference: newPrice - oldPrice,
        percentChange: priceChange * 100
      },
      reason: reason || `Cập nhật giá: ${oldPrice} → ${newPrice}`,  // Auto-generate if empty
      timestamp: new Date().toISOString()
    }
  }
});
```

### Query Audit Logs

```sql
-- Tìm các thay đổi giá lớn KHÔNG có lý do
SELECT 
  al."createdAt",
  al."metadata"->>'sanphamTitle' as product,
  (al."oldValues"->>'giaban')::numeric as old_price,
  (al."newValues"->>'giaban')::numeric as new_price,
  ((al."metadata"->'priceChange'->>'percentChange')::numeric) as percent_change,
  al."metadata"->'priceChange'->>'reason' as reason
FROM "AuditLog" al
WHERE al."entityName" = 'Banggiasanpham'
  AND al."action" = 'UPDATE'
  AND ((al."metadata"->'priceChange'->>'percentChange')::numeric) > 20
  AND (
    al."metadata"->'priceChange'->>'reason' LIKE 'Cập nhật giá:%'
    OR al."metadata"->'priceChange'->>'reason' IS NULL
  )
ORDER BY al."createdAt" DESC;
```

---

## 💡 WHY THIS CHANGE?

### 1. User Experience
```
❌ Before: User blocked → Frustration
✅ After:  Update allowed → Smooth workflow
```

### 2. Trust User
```
Business decision:
- Trust staff to update prices correctly
- Don't block workflow with validation
- Use audit trail for tracking, not prevention
```

### 3. Flexibility
```
Edge cases:
- Flash sale: Giảm giá 90% trong 1 giờ
- Liquidation: Thanh lý hàng giá rẻ
- Correction: Sửa lỗi giá nhập sai

→ Không nên chặn các trường hợp này
```

---

## 🎯 MONITORING

### Console Logs

**Production logs sẽ show:**
```bash
# Normal updates (< 20%)
✅ Updated price: I100002 in GIABAN: 100 → 110

# Large updates with reason (> 20%)
⚠️  [PRICE-UPDATE] Large price change with reason:
    oldPrice: 5
    newPrice: 20
    priceChange: 300.0%
    reason: Thay đổi giá +300%
✅ Updated price: I100002 in GIABAN: 5 → 20

# Large updates WITHOUT reason (> 20%)
⚠️  [PRICE-UPDATE] Large price change WITHOUT reason:
    oldPrice: 5
    newPrice: 20
    priceChange: 300.0%
    note: Consider adding reason for audit purposes
✅ Updated price: I100002 in GIABAN: 5 → 20
```

### Dashboard Query

```sql
-- Daily report: Large price changes
SELECT 
  DATE(al."createdAt") as date,
  COUNT(*) as total_large_changes,
  COUNT(CASE 
    WHEN al."metadata"->'priceChange'->>'reason' LIKE 'Thay đổi giá%' 
    THEN 1 
  END) as with_reason,
  COUNT(CASE 
    WHEN al."metadata"->'priceChange'->>'reason' LIKE 'Cập nhật giá:%' 
    THEN 1 
  END) as without_reason
FROM "AuditLog" al
WHERE al."entityName" = 'Banggiasanpham'
  AND ((al."metadata"->'priceChange'->>'percentChange')::numeric) > 20
  AND al."createdAt" >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(al."createdAt")
ORDER BY date DESC;
```

---

## 🔒 SECURITY CONSIDERATIONS

### Vẫn Có Kiểm Soát

```typescript
// 1. Giá không được âm
if (newPrice < 0) {
  throw new BadRequestException('Giá không thể âm');
}

// 2. Audit log đầy đủ
// → Có thể trace back mọi thay đổi

// 3. User authentication required
// → userId được lưu trong audit log

// 4. Console warnings
// → Dễ dàng monitor các thay đổi bất thường
```

---

## ✅ SUMMARY

| Item | Before | After |
|------|--------|-------|
| **Validation** | Throw error if > 50% | Log warning only |
| **Threshold** | 50% | 20% (for logging) |
| **Behavior** | Block update | Allow update |
| **User Impact** | Frustrated | Happy |
| **Audit** | Full tracking | Full tracking |
| **Security** | Same | Same |

---

**Status**: ✅ **UPDATED**

Changes:
1. ✅ Removed validation throw
2. ✅ Added warning logs
3. ✅ Always allow price update
4. ✅ Full audit trail maintained

**Ready to use!** 🚀

Giờ user có thể cập nhật giá BẤT KỲ giá trị nào, hệ thống chỉ ghi log để tracking! ✅
