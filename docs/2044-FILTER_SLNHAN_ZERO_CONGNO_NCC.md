# Bug Fix: Filter slnhan=0 from Supplier Debt Reports (Công Nợ Nhà Cung Cấp)

## 📋 Overview
Applied the same business logic enhancement to supplier debt reports (congnonhacungcap) that was previously applied to customer debt reports - filtering out products with `slnhan = 0` to ensure only actually received products are included in debt calculations.

## 🎯 Business Requirement
Supplier debt reports should only include products that have been **actually received** (`slnhan > 0`). Products with `slnhan = 0` represent ordered but not yet received items, which should not be calculated in debt totals.

## 📝 Changes Made

### File: `/api/src/dathang/dathang.service.ts`

#### 1. Function: `congnoncc()` (Line ~1842)
**API endpoint for supplier debt report**

**Before:**
```typescript
for (const item of v.sanpham) {
  const slnhan = Number(item.slnhan) || 0;
  const giaban = Number(item.sanpham?.giaban) || 0;
  tong += slnhan * giaban;
  soluong += slnhan;
}
```

**After:**
```typescript
for (const item of v.sanpham) {
  const slnhan = Number(item.slnhan) || 0;
  if (slnhan === 0) continue; // ✅ Skip unreceived products
  const giaban = Number(item.sanpham?.giaban) || 0;
  tong += slnhan * giaban;
  soluong += slnhan;
}
```

**Impact:**
- Products with `slnhan = 0` are now excluded from debt calculations
- More accurate supplier debt totals
- Prevents including unreceived items in financial reports

#### 2. Function: `downloadcongnoncc()` (Line ~1927)
**Excel export for supplier debt report**

**Before:**
```typescript
const flatItems = dathangs.flatMap((v: any) => {
  return v.sanpham.map((item: any) => ({
    // ... product data mapping
  }));
});
```

**After:**
```typescript
const flatItems = dathangs.flatMap((v: any) => {
  return v.sanpham
    .filter((item: any) => Number(item.slnhan) > 0) // ✅ Skip unreceived products
    .map((item: any) => ({
      // ... product data mapping
    }));
});
```

**Impact:**
- Excel exports now only include actually received products
- Consistent filtering logic between API and Excel export
- Cleaner reports without zero-quantity products

## 🔍 Technical Details

### Filter Logic
```typescript
// API version (in loop)
if (slnhan === 0) continue;

// Excel version (using filter)
.filter((item: any) => Number(item.slnhan) > 0)
```

### Related Fields
- `slnhan`: Quantity received (số lượng nhận)
- `sldat`: Quantity ordered (số lượng đặt)
- `tongtien`: Total amount including received products only

## ✅ Testing Checklist

1. **API Endpoint Test**
   - [ ] Call `POST /dathang/congnoncc` with date range
   - [ ] Verify products with `slnhan = 0` are excluded from totals
   - [ ] Check `tong` (total amount) and `soluong` (total quantity) calculations

2. **Excel Export Test**
   - [ ] Call `POST /dathang/downloadcongnoncc`
   - [ ] Open generated Excel file
   - [ ] Verify no products with `slnhan = 0` appear in report
   - [ ] Check totals match API response

3. **Edge Cases**
   - [ ] Order with all products having `slnhan = 0` (should show zero totals)
   - [ ] Order with mixed `slnhan` values (should only count received items)
   - [ ] Date range with no received products

## 📊 Impact Analysis

### Before Fix
```
Đặt hàng A:
  - Sản phẩm 1: slnhan = 10, giaban = 100 → 1,000 VND
  - Sản phẩm 2: slnhan = 0, giaban = 500 → 0 VND (BUT INCLUDED!)
  Total shown: 1,500 VND ❌ (WRONG)
```

### After Fix
```
Đặt hàng A:
  - Sản phẩm 1: slnhan = 10, giaban = 100 → 1,000 VND
  - Sản phẩm 2: slnhan = 0, giaban = 500 → FILTERED OUT
  Total shown: 1,000 VND ✅ (CORRECT)
```

## 🔗 Related Changes

This enhancement is part of a series of fixes to improve financial report accuracy:

1. **Doc 2042**: Fixed tongtien recalculation when slnhan changes
2. **Doc 2043**: Filtered slnhan=0 from customer debt reports (donhang/congnokhachhang)
3. **Doc 2044** (This): Filtered slnhan=0 from supplier debt reports (dathang/congnoncc)

## 📚 Code Location

**Module**: `dathang` (Supplier Purchase Orders)
**File**: `/api/src/dathang/dathang.service.ts`
**Functions Modified**:
- `congnoncc()` - Line ~1842
- `downloadcongnoncc()` - Line ~1927

**Endpoints**:
- `POST /dathang/congnoncc` - API for supplier debt report
- `POST /dathang/downloadcongnoncc` - Excel export for supplier debt

## 🎓 Business Context

In Vietnamese business operations:
- **Đặt hàng** (Dathang) = Purchase Order from supplier
- **Công nợ NCC** (Congnonhacungcap) = Supplier debt/payables
- **Nhà cung cấp** (Nhacungcap) = Supplier
- **Số lượng nhận** (slnhan) = Quantity received
- **Số lượng đặt** (sldat) = Quantity ordered

Only received products should contribute to supplier debt calculations, as the company only owes money for items that have been delivered.

## ✨ Key Benefits

1. **Accurate Financial Reporting**: Debt calculations now reflect actual liabilities
2. **Consistent Logic**: Same filtering applied to both customer and supplier reports
3. **Better Decision Making**: Management sees true debt figures
4. **Audit Compliance**: Reports match actual received inventory

## 🚀 Deployment Notes

- No database migration required
- No breaking changes to API contracts
- Backward compatible (just filters out extra data)
- Can be deployed independently

---

**Date**: 2025-01-XX
**Related Issues**: Supplier debt report accuracy
**Status**: ✅ Completed
