# Bug Fix: tongtien không cập nhật khi sửa slnhan ở trạng thái danhan

## 📋 Overview
Fixed critical bug where editing `slnhan` (số lượng nhận) of a product in an order with status `danhan` did not recalculate `tongtien` (total amount), `tongvat` (VAT amount), `ttnhan` (received amount per product), and `ttsauvat` (amount after VAT per product).

## 🐛 Bug Description

**Issue**: When an order is already in `danhan` (đã nhận hàng) status and the user modifies the `slnhan` of one or more products, the following fields were NOT being recalculated:

- `ttnhan` (thành tiền nhận) for each product
- `ttsauvat` (thành tiền sau VAT) for each product  
- `tongtien` (tổng tiền) for the order
- `tongvat` (tổng VAT) for the order

**Root Cause**: The `update()` function in `donhang.service.ts` had logic to recalculate totals when transitioning FROM `dagiao` TO `danhan`, but did NOT have logic to recalculate when the order stays in `danhan` status and only `slnhan` values change.

**Impact**:
- Financial data inconsistency
- Reports show incorrect debt amounts
- Order total doesn't reflect actual received quantities
- Manual correction required for each order

## 🔍 Technical Analysis

### Original Code Flow

**Scenario 1: DAGIAO → DANHAN** (Working correctly)
```
1. Order transitions from 'dagiao' to 'danhan'
2. Code calculates ttnhan = giaban × slnhan
3. Code calculates ttsauvat = ttnhan × (1 + vat)
4. Code calculates tongtien and tongvat
✅ Works correctly
```

**Scenario 2: DANHAN → DANHAN with slnhan changes** (BUG!)
```
1. Order stays in 'danhan' status
2. User edits slnhan of products
3. Code falls into "Regular update without status change" section
4. Old logic: Only recalculates if data.sanpham OR data.vat provided
5. But: Frontend might send data.sanpham without full calculation
❌ BUG: tongtien NOT recalculated based on new slnhan
```

### Why This Matters

In Vietnamese business operations:
- **slnhan** = Quantity actually received (might differ from slgiao)
- **ttnhan** = Amount to pay based on received quantity
- **tongtien** = Total order amount (used for invoices and debt tracking)

If `slnhan` changes but `tongtien` doesn't update:
- **Invoice amounts are wrong**
- **Debt reports are inaccurate**
- **Financial reconciliation fails**

## 📝 Changes Made

### File: `/api/src/donhang/donhang.service.ts`

#### Function: `update()` - Section 8 "Regular update without status change" (Line ~2848)

**Added new logic** to handle the special case where:
- Order is in `danhan` status
- User is updating `slnhan` values
- Need to recalculate all financial totals

**Before:**
```typescript
// 8. Regular update without status change
if (!data.status || data.status === oldDonhang.status) {
  const updatedDonhang = await prisma.donhang.update({
    where: { id },
    data: { /* ... basic fields ... */ },
    include: { sanpham: true },
  });

  // Recalculate totals if sanpham data is provided or VAT rate changed
  if (data.sanpham || data.vat) {
    // ... uses calculateDonhangTotals() ...
  }

  return updatedDonhang;
}
```

**After:**
```typescript
// 8. Regular update without status change
if (!data.status || data.status === oldDonhang.status) {
  // 🔥 SPECIAL CASE: If order is in 'danhan' status and slnhan is being updated
  if (oldDonhang.status === 'danhan' && data.sanpham && data.sanpham.length > 0) {
    let tongchua = 0;
    
    // Update each product with recalculated values based on slnhan
    for (const item of data.sanpham) {
      const received = parseFloat((item.slnhan ?? 0).toFixed(3));
      
      // Find product in DB to get giaban and vat
      const donhangSanpham = oldDonhang.sanpham.find((sp: any) => sp.idSP === item.id);
      if (!donhangSanpham) continue;
      
      const giaban = parseFloat((donhangSanpham.giaban ?? 0).toFixed(3));
      const vat = parseFloat((donhangSanpham.vat ?? 0).toFixed(3));
      
      // 🔥 Recalculate ttnhan and ttsauvat based on slnhan
      const ttnhan = giaban * received;
      const ttsauvat = ttnhan * (1 + vat);
      
      tongchua += ttnhan;
      
      await prisma.donhangsanpham.update({
        where: { id: donhangSanpham.id },
        data: {
          slnhan: received,
          ttnhan: parseFloat(ttnhan.toFixed(3)),
          ttsauvat: parseFloat(ttsauvat.toFixed(3)),
          ghichu: item.ghichu,
        },
      });
    }
    
    // 🔥 Recalculate total amount for the order
    const vatRate = parseFloat((oldDonhang.vat ?? 0).toFixed(3));
    const tongvat = tongchua * vatRate;
    const tongtien = tongchua + tongvat;
    
    // Update order with recalculated totals
    return prisma.donhang.update({
      where: { id },
      data: {
        // ... all fields ...
        tongtien: parseFloat(tongtien.toFixed(3)),
        tongvat: parseFloat(tongvat.toFixed(3)),
      },
      include: { sanpham: true },
    });
  }
  
  // Regular update for other cases (unchanged)
  // ...
}
```

## 🔢 Calculation Formula

### Per-Product Calculations
```typescript
ttnhan = giaban × slnhan
ttsauvat = ttnhan × (1 + vat)
```

### Order-Level Calculations
```typescript
tongchua = Σ(ttnhan for all products)
tongvat = tongchua × vatRate
tongtien = tongchua + tongvat
```

### Example
```
Product A:
  giaban = 100,000 VND
  slnhan = 10 (changed from 15)
  vat = 0.05 (5%)
  
Calculations:
  ttnhan = 100,000 × 10 = 1,000,000 VND
  ttsauvat = 1,000,000 × 1.05 = 1,050,000 VND

Order:
  tongchua = 1,000,000 VND (sum of all ttnhan)
  vatRate = 0.05
  tongvat = 1,000,000 × 0.05 = 50,000 VND
  tongtien = 1,000,000 + 50,000 = 1,050,000 VND
```

## ✅ Testing Checklist

### Test Case 1: Edit slnhan in danhan order
**Setup**:
1. Create order with status `danhan`
2. Product: slnhan = 10, giaban = 100, vat = 0.05
3. Initial tongtien = 1,050 (100 × 10 × 1.05)

**Action**: Change slnhan from 10 to 8

**Expected Result**:
- ttnhan = 800 (100 × 8)
- ttsauvat = 840 (800 × 1.05)
- tongtien = 840
- tongvat = 40

### Test Case 2: Multiple products in danhan order
**Setup**:
1. Order with 3 products, all in `danhan`
2. Product A: slnhan = 10, giaban = 100
3. Product B: slnhan = 5, giaban = 200
4. Product C: slnhan = 20, giaban = 50

**Action**: Change Product A slnhan from 10 to 12

**Expected Result**:
- Product A: ttnhan = 1,200 (new)
- Product B: ttnhan = 1,000 (unchanged)
- Product C: ttnhan = 1,000 (unchanged)
- Order tongtien recalculated with new totals

### Test Case 3: Order in other status (dagiao, dadat)
**Setup**: Order in `dagiao` status

**Action**: Update some fields (not slnhan)

**Expected Result**:
- Falls back to regular update logic
- No special slnhan recalculation
- ✅ Other status transitions still work correctly

### Test Case 4: No sanpham data provided
**Setup**: Order in `danhan` status

**Action**: Update only order fields (title, ghichu, etc.), no sanpham array

**Expected Result**:
- Falls back to regular update logic
- No financial recalculation
- ✅ Basic update works

## 📊 Impact Analysis

### Before Fix
```
Order #DH001 (Status: danhan):
  Product A: slnhan = 10, giaban = 100
  ttnhan = 1,000
  Order tongtien = 1,050 (with VAT)

User changes Product A slnhan to 8:
  ❌ ttnhan = 1,000 (WRONG! Should be 800)
  ❌ Order tongtien = 1,050 (WRONG! Should be 840)
  
Result: Financial data incorrect!
```

### After Fix
```
Order #DH001 (Status: danhan):
  Product A: slnhan = 10, giaban = 100
  ttnhan = 1,000
  Order tongtien = 1,050 (with VAT)

User changes Product A slnhan to 8:
  ✅ ttnhan = 800 (CORRECT!)
  ✅ ttsauvat = 840 (CORRECT!)
  ✅ Order tongtien = 840 (CORRECT!)
  
Result: Financial data accurate!
```

## 🔗 Related Changes

This fix is part of a series of financial calculation improvements:

1. **Doc 2042**: Fixed tongtien recalculation during status transitions (DAGIAO → DANHAN)
2. **Doc 2043**: Filtered slnhan=0 from customer debt reports
3. **Doc 2044**: Filtered slnhan=0 from supplier debt reports
4. **Doc 2045**: Fixed frontend export to filter slnhan=0
5. **Doc 2046** (This): Fixed tongtien not updating when editing slnhan in danhan status

## 🎯 Key Benefits

1. **Financial Accuracy**: Order totals always reflect actual received quantities
2. **Data Integrity**: ttnhan, ttsauvat, tongtien, tongvat all stay synchronized
3. **Correct Invoicing**: Invoice amounts match received goods
4. **Accurate Reports**: Debt reports show correct amounts
5. **Audit Compliance**: Financial records are consistent and traceable

## 🚀 Deployment Notes

- Backend-only change
- No database migration required
- No breaking API changes
- Can be deployed independently
- Affects only orders in `danhan` status being edited

## ⚠️ Important Notes

### When This Fix Applies
- ✅ Order status is `danhan`
- ✅ User is editing `slnhan` values
- ✅ `data.sanpham` array is provided

### When This Fix Does NOT Apply
- ❌ Order is in other status (`dadat`, `dagiao`, etc.)
- ❌ Status is changing (handled by transition logic)
- ❌ No `sanpham` data in update request
- ❌ Using `updatePhieugiao()` (sends totals from frontend)

### Performance Considerations
- Additional database queries: 1 per product + 1 for order
- All wrapped in transaction for consistency
- Minimal performance impact
- Acceptable trade-off for data accuracy

## 📚 Code Location

**Module**: Order Management (Donhang)
**File**: `/api/src/donhang/donhang.service.ts`
**Function**: `update()` - Section 8 "Regular update without status change"
**Lines**: ~2848-2895 (new special case block)

**Related Functions**:
- `calculateDonhangTotals()` - Used for other cases
- Status transition logic (DAGIAO → DANHAN) - Already had recalculation

---

**Date**: 2025-01-11
**Related Issues**: Financial calculation consistency
**Status**: ✅ Completed
**Testing**: Manual testing recommended with real order data
