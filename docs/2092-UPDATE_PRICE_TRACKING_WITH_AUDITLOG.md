# Update: Price Tracking với AuditLog (Không dùng ghichu)

## Context

Ban đầu tôi hiểu sai ý bạn, đã implement lưu `priceMetadata` vào field `ghichu` của `Donhangsanpham`. Nhưng thực tế bạn muốn:

- ✅ Cập nhật giá sản phẩm khi tạo đơn hàng
- ✅ Tracking thay đổi giá vào **AuditLog**
- ❌ KHÔNG lưu metadata vào `ghichu` 
- ✅ Giữ `ghichu` cho user note gốc

## Changes Made

### 1. Cleanup Initial Product Creation

**File**: `api/src/donhang/donhang.service.ts` - Lines ~1795-1810

**Before (WRONG):**
```typescript
return sanphamArray.map((sp) => {
  // ✅ Prepare price tracking metadata
  const priceMetadata = {
    banggiaId: dto.banggiaId || khachhang.banggiaId || DEFAUL_BANGGIA_ID,
    sanphamId: sp.idSP || sp.id,
    capturedAt: new Date().toISOString(),
    priceSource: 'banggia',
    userNote: sp.ghichu || ''
  };
  
  return {
    idSP: sp.idSP || sp.id,
    giaban: parseFloat((sp.giaban || 0).toString()),
    ghichu: sp.ghichu || '', // ✅ Store price metadata as JSON
    // ghichu: JSON.stringify(priceMetadata), // Commented
    sldat: parseFloat((sp.sldat ?? 0).toString()),
    // ...
  };
});
```

**After (CORRECT):**
```typescript
return sanphamArray.map((sp) => {
  return {
    idSP: sp.idSP || sp.id,
    giaban: parseFloat((sp.giaban || 0).toString()),
    ghichu: sp.ghichu || '', // Keep original user note
    sldat: parseFloat((sp.sldat ?? 0).toString()),
    // ...
  };
});
```

**Changes:**
- ❌ Removed `priceMetadata` object creation
- ✅ `ghichu` giữ nguyên note của user
- ✅ Clean, simple code

### 2. Update Price Logic với AuditLog

**File**: `api/src/donhang/donhang.service.ts` - Lines ~1875-1920

**Before (WRONG):**
```typescript
if (updatedSanpham.length > 0) {
  await Promise.all(
    updatedSanpham.map(async (sp) => {
      // ✅ Enhanced price metadata with actual price used
      const enhancedMetadata = {
        banggiaId: dto.banggiaId || khachhang.banggiaId || DEFAUL_BANGGIA_ID,
        sanphamId: sp.idSP || sp.id,
        capturedAt: new Date().toISOString(),
        priceSource: 'banggia',
        actualPrice: sp.giaban,
        userNote: sp.ghichu || ''
      };
      
      await prisma.donhangsanpham.updateMany({
        where: { 
          donhangId: newDonhang.id,
          idSP: sp.idSP || sp.id 
        },
        data: {
          giaban: sp.giaban,
          ttdat: sp.ttdat,
          ttgiao: sp.ttgiao,
          ttnhan: sp.ttnhan,
          ttsauvat: sp.ttsauvat,
          ghichu: JSON.stringify(enhancedMetadata), // ❌ OVERWRITES user note!
        },
      });
    })
  );
}
```

**After (CORRECT):**
```typescript
if (updatedSanpham.length > 0) {
  await Promise.all(
    updatedSanpham.map(async (sp) => {
      const originalProduct = dto.sanpham.find(p => (p.idSP || p.id) === (sp.idSP || sp.id));
      const originalPrice = originalProduct ? parseFloat((originalProduct.giaban || 0).toString()) : 0;
      
      // Update price
      await prisma.donhangsanpham.updateMany({
        where: { 
          donhangId: newDonhang.id,
          idSP: sp.idSP || sp.id 
        },
        data: {
          giaban: sp.giaban,
          ttdat: sp.ttdat,
          ttgiao: sp.ttgiao,
          ttnhan: sp.ttnhan,
          ttsauvat: sp.ttsauvat,
          // Keep original ghichu - DON'T overwrite with metadata
        },
      });
      
      // Create audit log if price changed
      if (sp.giaban !== originalPrice) {
        try {
          await prisma.auditLog.create({
            data: {
              entityName: 'Donhangsanpham',
              entityId: `${newDonhang.id}-${sp.idSP || sp.id}`,
              action: 'UPDATE',
              userId: dto.userId || null,
              oldValues: { giaban: originalPrice },
              newValues: { giaban: sp.giaban },
              changedFields: ['giaban'],
              metadata: {
                donhangId: newDonhang.id,
                madonhang: newDonhang.madonhang,
                sanphamId: sp.idSP || sp.id,
                banggiaId: dto.banggiaId || khachhang.banggiaId || DEFAUL_BANGGIA_ID,
                capturedAt: new Date().toISOString(),
                priceSource: 'banggia',
                priceChange: {
                  from: originalPrice,
                  to: sp.giaban,
                  difference: sp.giaban - originalPrice,
                  percentChange: originalPrice > 0 ? ((sp.giaban - originalPrice) / originalPrice * 100) : 0
                },
                userNote: sp.ghichu || ''
              }
            }
          });
        } catch (auditError) {
          // Don't fail order creation if audit log fails
          console.error('Failed to create price audit log:', auditError);
        }
      }
    })
  );
}
```

**Changes:**
- ✅ KHÔNG update `ghichu` field
- ✅ Tạo AuditLog entry khi giá thay đổi
- ✅ So sánh `originalPrice` vs `updatedPrice`
- ✅ Lưu đầy đủ metadata vào AuditLog
- ✅ Graceful error handling - không fail order nếu audit log lỗi

## Data Flow

### Scenario: Tạo đơn hàng với giá từ bảng giá

```
1. User tạo đơn hàng
   - Product A: giaban input = 10,000
   - Product A: ghichu = "Giao gấp"

2. Hệ thống lấy giá từ Banggia
   - Banggia có giá = 12,000

3. Update Donhangsanpham
   - giaban = 12,000 (từ banggia)
   - ghichu = "Giao gấp" (GIỮ NGUYÊN user note)

4. Tạo AuditLog
   - entityName: 'Donhangsanpham'
   - action: 'UPDATE'
   - oldValues: { giaban: 10,000 }
   - newValues: { giaban: 12,000 }
   - metadata: {
       donhangId, madonhang, sanphamId,
       banggiaId, priceSource: 'banggia',
       priceChange: { from: 10000, to: 12000, difference: 2000, percentChange: 20 },
       userNote: "Giao gấp"
     }
```

### Data Separation

| Field | Purpose | Example Value |
|-------|---------|---------------|
| `Donhangsanpham.giaban` | Actual price used | 12,000 |
| `Donhangsanpham.ghichu` | User's note | "Giao gấp" |
| `AuditLog.metadata` | Price tracking info | Full price change details |
| `AuditLog.oldValues` | Original price | { giaban: 10,000 } |
| `AuditLog.newValues` | Updated price | { giaban: 12,000 } |

## Benefits

### 1. Clean Data Model
```typescript
// Donhangsanpham
{
  id: "abc-123",
  giaban: 12000,
  ghichu: "Giao gấp",  // ✅ Human-readable
  // NOT: ghichu: '{"banggiaId":"xyz","capturedAt":"..."}'  // ❌ Machine data
}
```

### 2. Proper Audit Trail
```typescript
// AuditLog
{
  entityName: 'Donhangsanpham',
  action: 'UPDATE',
  oldValues: { giaban: 10000 },
  newValues: { giaban: 12000 },
  metadata: {
    donhangId: "abc-123",
    madonhang: "DH001",
    priceSource: "banggia",
    priceChange: {
      from: 10000,
      to: 12000,
      difference: 2000,
      percentChange: 20
    }
  }
}
```

### 3. Query Price Changes
```typescript
// Get all price changes for a product in orders
const priceChanges = await prisma.auditLog.findMany({
  where: {
    entityName: 'Donhangsanpham',
    action: 'UPDATE',
    changedFields: { has: 'giaban' }
  },
  orderBy: { createdAt: 'desc' }
});

// Analyze price trends
priceChanges.forEach(log => {
  console.log(`${log.metadata.madonhang}: ${log.oldValues.giaban} → ${log.newValues.giaban}`);
});
```

## Use Cases

### 1. Price Discrepancy Analysis
```sql
-- Find orders with price differences > 10%
SELECT 
  al."entityId",
  al."metadata"->>'madonhang' as donhang,
  (al."metadata"->'priceChange'->>'percentChange')::numeric as percent_change
FROM "AuditLog" al
WHERE al."entityName" = 'Donhangsanpham'
  AND al."action" = 'UPDATE'
  AND (al."metadata"->'priceChange'->>'percentChange')::numeric > 10;
```

### 2. Price History Timeline
```typescript
async getPriceHistory(sanphamId: string) {
  return await prisma.auditLog.findMany({
    where: {
      entityName: 'Donhangsanpham',
      metadata: {
        path: ['sanphamId'],
        equals: sanphamId
      }
    },
    orderBy: { createdAt: 'desc' },
    select: {
      createdAt: true,
      oldValues: true,
      newValues: true,
      metadata: true
    }
  });
}
```

### 3. Order Price Verification
```typescript
async verifyOrderPrices(donhangId: string) {
  const auditLogs = await prisma.auditLog.findMany({
    where: {
      entityName: 'Donhangsanpham',
      metadata: {
        path: ['donhangId'],
        equals: donhangId
      }
    }
  });
  
  return auditLogs.map(log => ({
    sanphamId: log.metadata.sanphamId,
    originalPrice: log.oldValues.giaban,
    actualPrice: log.newValues.giaban,
    difference: log.metadata.priceChange.difference,
    percentChange: log.metadata.priceChange.percentChange
  }));
}
```

## Comparison: Before vs After

### Before (WRONG Approach)

**Donhangsanpham table:**
```json
{
  "id": "abc-123",
  "giaban": 12000,
  "ghichu": "{\"banggiaId\":\"xyz\",\"capturedAt\":\"2025-10-16T10:00:00Z\",\"priceSource\":\"banggia\",\"actualPrice\":12000,\"userNote\":\"Giao gấp\"}"
}
```

**Problems:**
- ❌ `ghichu` chứa JSON string, khó đọc
- ❌ Mất note gốc của user
- ❌ Không có proper audit trail
- ❌ Khó query price changes
- ❌ Không track oldPrice → newPrice

### After (CORRECT Approach)

**Donhangsanpham table:**
```json
{
  "id": "abc-123",
  "giaban": 12000,
  "ghichu": "Giao gấp"
}
```

**AuditLog table:**
```json
{
  "id": "audit-789",
  "entityName": "Donhangsanpham",
  "entityId": "donhang-123-sanpham-456",
  "action": "UPDATE",
  "oldValues": { "giaban": 10000 },
  "newValues": { "giaban": 12000 },
  "changedFields": ["giaban"],
  "metadata": {
    "donhangId": "donhang-123",
    "madonhang": "DH001",
    "sanphamId": "sanpham-456",
    "banggiaId": "banggia-xyz",
    "priceSource": "banggia",
    "priceChange": {
      "from": 10000,
      "to": 12000,
      "difference": 2000,
      "percentChange": 20
    },
    "userNote": "Giao gấp"
  }
}
```

**Benefits:**
- ✅ Clean, readable data
- ✅ User note preserved
- ✅ Full audit trail
- ✅ Easy to query
- ✅ Track price changes over time

## Error Handling

### Graceful Degradation
```typescript
try {
  await prisma.auditLog.create({ ... });
} catch (auditError) {
  // Don't fail order creation if audit log fails
  console.error('Failed to create price audit log:', auditError);
}
```

**Philosophy:**
- Order creation is **CRITICAL** → Must succeed
- Audit log is **NICE TO HAVE** → Can fail gracefully
- Log error but continue with order

## Testing

### Test Case 1: Price Updated from Banggia
```typescript
// Create order with product price = 10,000
// Banggia has price = 12,000

// Expected:
// - Donhangsanpham.giaban = 12,000
// - AuditLog created with oldValues.giaban = 10,000, newValues.giaban = 12,000
// - Donhangsanpham.ghichu = original user note
```

### Test Case 2: Price Unchanged
```typescript
// Create order with product price = 10,000
// Banggia also has price = 10,000

// Expected:
// - Donhangsanpham.giaban = 10,000
// - NO AuditLog created (price unchanged)
```

### Test Case 3: AuditLog Creation Fails
```typescript
// Simulate audit log error (e.g., userId invalid)

// Expected:
// - Donhangsanpham still created ✅
// - Order creation succeeds ✅
// - Error logged in console
```

## Query Examples

### 1. Get all price changes for an order
```typescript
const orderPriceChanges = await prisma.auditLog.findMany({
  where: {
    entityName: 'Donhangsanpham',
    metadata: {
      path: ['donhangId'],
      equals: orderId
    }
  }
});
```

### 2. Find products with frequent price changes
```sql
SELECT 
  al."metadata"->>'sanphamId' as sanpham_id,
  COUNT(*) as change_count,
  AVG((al."metadata"->'priceChange'->>'percentChange')::numeric) as avg_percent_change
FROM "AuditLog" al
WHERE al."entityName" = 'Donhangsanpham'
  AND al."action" = 'UPDATE'
GROUP BY al."metadata"->>'sanphamId'
HAVING COUNT(*) > 5
ORDER BY change_count DESC;
```

### 3. Price change timeline
```typescript
const timeline = await prisma.auditLog.findMany({
  where: {
    entityName: 'Donhangsanpham',
    metadata: {
      path: ['sanphamId'],
      equals: productId
    }
  },
  orderBy: { createdAt: 'asc' },
  select: {
    createdAt: true,
    metadata: {
      select: {
        madonhang: true,
        priceChange: true
      }
    }
  }
});
```

## Summary

✅ **Clean separation**: User notes ≠ System metadata  
✅ **Proper audit trail**: AuditLog cho tracking  
✅ **Queryable**: Dễ dàng analyze price changes  
✅ **Graceful**: Không fail order nếu audit log lỗi  
✅ **Compliant**: Đúng database design patterns

**Key principle**: 
> User-facing data (ghichu) và system tracking data (AuditLog) phải tách biệt rõ ràng.
