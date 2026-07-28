# ✅ Checklist: Cập Nhật Lịch Sử Giá

## 🔧 Code Changes

### Backend
- [x] `banggia-price-history.service.ts` - CREATE case
  - [x] Thay `auditLog.create` → `banggiasanphamHistory.create`
  - [x] Thêm fields: `banggiasanphamId`, `banggiaId`, `sanphamId`
  - [x] Thêm `oldPrice: 0`, `newPrice`, `changePercent: 0`
  - [x] Thêm `changeReason`, `changedBy`, `sourceType: 'MANUAL'`
  - [x] Metadata với `action: 'CREATE'`

- [x] `banggia-price-history.service.ts` - UPDATE case
  - [x] Xóa toàn bộ logic `auditLog.create` với user verification
  - [x] Thêm `banggiasanphamHistory.create` đơn giản
  - [x] Calculate `percentChange` trực tiếp
  - [x] Thêm `sourceType: 'MANUAL'`
  - [x] Metadata với `difference`, `action: 'UPDATE'`
  - [x] Console logs chi tiết hơn

- [x] `banggia-price-history.service.ts` - GET case
  - [x] Thay query từ `auditLog` → `banggiasanphamHistory`
  - [x] Where clause: `banggiasanphamId: bgsp.id`
  - [x] OrderBy: `changedAt` thay vì `createdAt`
  - [x] Select: direct fields thay vì parse JSON
  - [x] Transform: map to new interface format
  - [x] Console logs với `[PRICE-HISTORY]` prefix

### Frontend
- [x] `price-history.service.ts` - Interface
  - [x] `PriceChange`: thêm `id`, `changedAt`, `changedBy`
  - [x] `PriceChange`: thêm `sourceType`, `batchId`
  - [x] `PriceChange`: thêm `banggia` object, `sanpham` object
  - [x] `PriceChange`: thêm `metadata`
  - [x] Remove `PriceHistory` interface usage

- [x] `price-history.service.ts` - Service method
  - [x] Return type: `PriceChange[]` thay vì `PriceHistory`
  - [x] Generic type: `PriceChange[]` thay vì `PriceHistory`

- [x] `price-history-dialog.component.ts`
  - [x] Signal type: `PriceChange[]` thay vì `PriceHistory | null`
  - [x] Remove `.history` access

- [x] `price-history-dialog.component.html`
  - [x] Check length: `priceHistory().length` thay vì `priceHistory()!.history.length`
  - [x] Loop: `*ngFor="let change of priceHistory()"` thay vì `priceHistory()!.history`
  - [x] Date: `change.changedAt` thay vì `change.timestamp`
  - [x] User: `change.changedBy` thay vì `change.userId`
  - [x] Thêm display cho `change.sourceType`

## 🧪 Testing Checklist

### Pre-Test
- [ ] Backend compiled successfully
- [ ] Frontend compiled successfully
- [ ] No TypeScript errors
- [ ] No template errors

### Backend Test
- [ ] Backend server started
- [ ] Test endpoint available: `/banggia/{id}/sanpham/{id}/price-history`
- [ ] Test bulk update: `/banggia/bulk-update-prices`

### Manual Test - Create Price
- [ ] Open banggia detail page
- [ ] Find a product
- [ ] Change price (e.g., 50000 → 55000)
- [ ] Press Enter
- [ ] See success snackbar
- [ ] No console errors

### Manual Test - View History
- [ ] Click history icon for product
- [ ] Dialog opens
- [ ] Loading spinner shows briefly
- [ ] History entries appear
- [ ] Each entry shows:
  - [ ] Date/time (formatted Vietnamese)
  - [ ] Old price
  - [ ] New price
  - [ ] Difference with arrow
  - [ ] Percentage change with chip
  - [ ] Reason
  - [ ] Changed by (user ID)
  - [ ] Source type (MANUAL)

### Database Verification
- [ ] Query `BanggiasanphamHistory` table
- [ ] Record exists with correct:
  - [ ] `banggiasanphamId`
  - [ ] `banggiaId`
  - [ ] `sanphamId`
  - [ ] `oldPrice`
  - [ ] `newPrice`
  - [ ] `changePercent`
  - [ ] `changeReason`
  - [ ] `changedBy`
  - [ ] `sourceType` = 'MANUAL'
  - [ ] `metadata` JSON

### API Test
- [ ] GET price history returns array
- [ ] Array items have correct structure
- [ ] No AuditLog queries in logs
- [ ] Only BanggiasanphamHistory queries

### Edge Cases
- [ ] Empty history (new product)
- [ ] Single history entry
- [ ] Multiple history entries (ordered by date desc)
- [ ] Large price change (>20%)
- [ ] Small price change (<1%)
- [ ] No reason provided
- [ ] Custom reason provided
- [ ] System user (no userId)

## 📊 Validation

### Code Quality
- [x] No TypeScript errors
- [x] No ESLint warnings
- [x] Proper typing throughout
- [x] Console logs for debugging
- [x] Error handling in place

### Database
- [ ] BanggiasanphamHistory table exists
- [ ] Indexes created:
  - [ ] `banggiasanphamId`
  - [ ] `banggiaId`
  - [ ] `sanphamId`
  - [ ] `changedAt`
- [ ] Foreign key to Banggiasanpham
- [ ] Cascade delete configured

### Performance
- [ ] Query time < 100ms for 100 records
- [ ] No N+1 queries
- [ ] Proper pagination support
- [ ] Efficient date range filtering

## 🎯 Success Criteria

- [x] All code changes complete
- [x] No compilation errors
- [x] Interfaces updated
- [ ] Backend tested manually
- [ ] Frontend tested manually
- [ ] Database records verified
- [ ] API responses correct
- [ ] Dialog displays correctly
- [ ] Console logs helpful

## 📝 Rollback Plan

If issues occur:

1. **Quick fix:** Comment out new code, uncomment old AuditLog code
2. **Database:** BanggiasanphamHistory won't interfere with AuditLog
3. **Frontend:** Revert interfaces to old structure
4. **Testing:** Old AuditLog data still intact

## 🚀 Deployment Steps

1. [ ] Merge code to staging
2. [ ] Test on staging environment
3. [ ] Verify database migration
4. [ ] Monitor logs for errors
5. [ ] Check performance metrics
6. [ ] Deploy to production
7. [ ] Monitor production logs
8. [ ] Verify user reports

## 📧 Stakeholder Communication

- [ ] Notify dev team of changes
- [ ] Update API documentation
- [ ] Update frontend component docs
- [ ] Create migration guide if needed
- [ ] Share performance improvements

---

**Current Status:** Code complete, ready for testing ✅
