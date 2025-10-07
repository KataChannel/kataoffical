# Fix: Foreign Key Constraint Violation on Sanpham Delete

## Issue
When deleting a product (`Sanpham`), the system threw a foreign key constraint error:
```
Foreign key constraint violated on the constraint: `PhieuKhoSanpham_sanphamId_fkey`
```

## Root Cause
The `remove()` method in `sanpham.service.ts` was not deleting all related records before attempting to delete the main `Sanpham` record. Missing deletions for:
- ❌ `PhieuKhoSanpham` (warehouse inventory movements)
- ❌ `SanphamKho` (product-warehouse relationships)
- ❌ `Chotkhodetail` (inventory audit details)
- ❌ `TonKho` (inventory balance)

## Solution
Updated the `remove()` method to perform cascading deletes in the correct order within a transaction:

### Deletion Order
1. Disconnect `Nhacungcap` (supplier) many-to-many relations
2. Delete `Donhangsanpham` (order items)
3. Delete `Dathangsanpham` (purchase order items)
4. Delete `Banggiasanpham` (price list items)
5. **NEW**: Delete `PhieuKhoSanpham` (warehouse movement items)
6. **NEW**: Delete `SanphamKho` (product-warehouse inventory)
7. **NEW**: Delete `Chotkhodetail` (inventory audit details)
8. **NEW**: Delete `TonKho` (inventory balance record)
9. Finally delete the `Sanpham` record
10. Send socket update notification

## Code Changes

### File: `api/src/sanpham/sanpham.service.ts`

**Before:**
```typescript
async remove(id: string) {
  return this.prisma.$transaction(async (tx) => {
    await tx.sanpham.update({
      where: { id },
      data: { Nhacungcap: { set: [] } },
    });
    await tx.donhangsanpham.deleteMany({ where: { sanpham: { id } } });
    await tx.dathangsanpham.deleteMany({ where: { sanpham: { id } } });
    await tx.banggiasanpham.deleteMany({ where: { sanphamId: id } });
    // ❌ Missing PhieuKhoSanpham, SanphamKho, Chotkhodetail, TonKho
    const deletedSanpham = await tx.sanpham.delete({ where: { id } });
    return deletedSanpham;
  });
}
```

**After:**
```typescript
async remove(id: string) {
  return this.prisma.$transaction(async (tx) => {
    await tx.sanpham.update({
      where: { id },
      data: { Nhacungcap: { set: [] } },
    });
    await tx.donhangsanpham.deleteMany({ where: { sanpham: { id } } });
    await tx.dathangsanpham.deleteMany({ where: { sanpham: { id } } });
    await tx.banggiasanpham.deleteMany({ where: { sanphamId: id } });
    // ✅ Added missing deletions
    await tx.phieuKhoSanpham.deleteMany({ where: { sanphamId: id } });
    await tx.sanphamKho.deleteMany({ where: { sanphamId: id } });
    await tx.chotkhodetail.deleteMany({ where: { sanphamId: id } });
    await tx.tonKho.deleteMany({ where: { sanphamId: id } });
    const deletedSanpham = await tx.sanpham.delete({ where: { id } });
    this._SocketGateway.sendSanphamUpdate();
    return deletedSanpham;
  });
}
```

## Database Schema Relationships

All `Sanpham` foreign key relationships:
```prisma
model Sanpham {
  banggia         Banggiasanpham[]   // ✅ Already deleted
  chotkhodetail   Chotkhodetail[]    // ✅ Now deleted
  Dathangsanpham  Dathangsanpham[]   // ✅ Already deleted
  Donhangsanpham  Donhangsanpham[]   // ✅ Already deleted
  PhieuKhoSanpham PhieuKhoSanpham[]  // ✅ Now deleted
  SanphamKho      SanphamKho[]       // ✅ Now deleted
  TonKho          TonKho?            // ✅ Now deleted
  Nhacungcap      Nhacungcap[]       // ✅ Already disconnected
}
```

## Testing
Test the fix by:
```bash
# Try deleting a product that has inventory records
curl -X DELETE http://localhost:3331/sanpham/{id} \
  -H "Authorization: Bearer {token}"
```

Expected result:
- ✅ Status 200
- ✅ Product deleted successfully
- ✅ All related records cascaded properly
- ✅ No foreign key constraint errors

## Impact
- **Data Integrity**: Ensures complete cleanup of all product-related data
- **Inventory**: Cleans up warehouse inventory, movements, and balances
- **Audit Trail**: Removes inventory audit records
- **Price Lists**: Existing deletion maintained
- **Orders**: Existing deletion maintained

## Notes
- All deletions wrapped in transaction for atomicity
- Order of deletions matters to avoid foreign key violations
- Socket notification sent after successful deletion
- Consider soft delete pattern for audit requirements in the future
