# 2050 - Mã Chuyến (machuyen) Feature Implementation

**Date**: 2025-01-XX  
**Status**: ✅ COMPLETE  
**Type**: Feature Addition  
**Priority**: High  

---

## 📋 Overview

Successfully implemented the **Mã Chuyến** (machuyen) field to track delivery route codes for customers. This field is stored in the `Khachhang` (Customer) model and is displayed/editable through:
- Customer detail forms
- Phiếu Chuyển (Delivery Sheet) export/import
- Direct customer creation/update

---

## 🎯 Business Requirements

### Problem
The business needed to track which delivery route (chuyến) each customer belongs to for efficient logistics and delivery planning.

### Solution
Added `machuyen` field to the Khachhang model with:
- Direct editing in customer forms
- Export in Phiếu Chuyến Excel sheets
- Import back from edited Excel files
- Automatic association through Donhang → Khachhang relationship

---

## 🏗️ Architecture

### Data Model
```
Khachhang (Customer)
├── id: String (uuid)
├── makh: String (unique)
├── name: String
├── diachi: String
├── machuyen: String ← NEW FIELD
└── donhang: Donhang[] (relation)

Donhang (Order)
├── id: String
├── madonhang: String
├── khachhangId: String
└── khachhang: Khachhang (relation)
```

### Data Flow
```
1. Direct Entry:
   Customer Form → updateMachuyen() → GraphQL updateOne → Database

2. Import Flow:
   Excel (Phiếu Chuyến) → Import → 
   Donhang.madonhang → Find Khachhang → 
   Update machuyen on Khachhang

3. Export Flow:
   Donhang → Include Khachhang → 
   Get machuyen → Excel Column
```

---

## 📁 Files Modified

### 1. Database Schema
**File**: `api/prisma/schema.prisma`

```prisma
model Khachhang {
  id            String   @id @default(uuid())
  makh          String   @unique
  name          String?
  diachi        String?
  sdt           String?
  gionhanhang   String?
  machuyen      String?  // ✅ NEW: Mã chuyến giao hàng
  // ... other fields
  donhang       Donhang[]
  banggia       Banggia?
}
```

**Migration Command**:
```bash
npx prisma db push
```

---

### 2. Backend Service
**File**: `api/src/donhang/donhang.service.ts`

**Method**: `phieuchuyen()` (Line 1286-1336)

Already returns `machuyen` from the related `khachhang` object:

```typescript
async phieuchuyen(params: any) {
  const result = await this.prisma.donhang.findMany({
    include: {
      khachhang: { 
        include: { 
          banggia: { 
            include: { sanpham: true } 
          } 
        } 
      }
    }
  });
  
  return result.map(({ khachhang, sanpham, ...donhang }) => ({
    ...donhang,
    name: khachhang?.name,
    diachi: khachhang?.diachi,
    machuyen: khachhang?.machuyen,  // ✅ Returns from khachhang
    shipper: donhang.shipper,
    phieuve: donhang.phieuve,
    giodi: donhang.giodi,
    giove: donhang.giove,
    kynhan: donhang.kynhan,
    // ... other fields
  }));
}
```

**Status**: ✅ No changes needed - already implemented

---

### 3. Frontend Export Service
**File**: `frontend/src/app/admin/donhang/donhang-graphql.service.ts`

**Method**: `ExportPhieuchuyen()` (Line 440-498)

```typescript
const phieuchuyenExcelData = phieuchuyenData.map((item, index) => ({
  'STT': index + 1,
  'Mã Đơn Hàng': item.madonhang || '',
  'Mã Chuyến': item.machuyen || '',        // ✅ Exported to Excel
  'Tên Khách Hàng': item.name || '',
  'Địa Chỉ': item.diachi || '',
  'Shipper': item.shipper || '',
  'Phiếu Về': item.phieuve || '',
  'Giờ Đi': item.giodi || '',
  'Giờ Về': item.giove || '',
  'Ký Nhận': item.kynhan || '',
  'Trạng Thái': item.trangthai || ''
}));

await writeExcelFileSheets(
  [{ data: phieuchuyenExcelData, sheetName: 'Phiếu Chuyển' }],
  `PhieuChuyen_${today}`
);
```

**Status**: ✅ Already includes 'Mã Chuyến' column

---

### 4. Frontend Import Service
**File**: `frontend/src/app/admin/donhang/donhang-graphql.service.ts`

**Method**: `ImportPhieuchuyen()` (Line 500-656)

```typescript
// Find donhang with khachhang relation
const donhang = await this._GraphqlService.findFirst('donhang', {
  where: { madonhang },
  include: {
    khachhang: { select: { id: true, makh: true } }
  }
});

// Update donhang fields (shipper, phieuve, giodi, giove, kynhan)
const updateData: any = {};
if (row['Shipper']) updateData.shipper = row['Shipper'].toString().trim();
if (row['Phiếu Về']) updateData.phieuve = row['Phiếu Về'].toString().trim();
if (row['Giờ Đi']) updateData.giodi = row['Giờ Đi'].toString().trim();
if (row['Giờ Về']) updateData.giove = row['Giờ Về'].toString().trim();
if (row['Ký Nhận']) updateData.kynhan = row['Ký Nhận'].toString().trim();

if (Object.keys(updateData).length > 0) {
  await this._GraphqlService.updateOne('donhang', { id: donhang.id }, updateData);
}

// ✅ NEW: Update machuyen to khachhang
if (row['Mã Chuyến'] && donhang.khachhang?.id) {
  const machuyen = row['Mã Chuyến'].toString().trim();
  await this._GraphqlService.updateOne('khachhang', 
    { id: donhang.khachhang.id }, 
    { machuyen }
  );
  console.log(`[IMPORT] Updated machuyen for ${madonhang}: ${machuyen} → customer ${donhang.khachhang.makh}`);
}
```

**Status**: ✅ Imports machuyen and updates Khachhang table

---

### 5. Frontend Customer Form (HTML)
**File**: `frontend/src/app/admin/khachhang/detailkhachhang/detailkhachhang.component.html`

**Location**: After "Giờ Nhận Hàng" field (Line 73-84)

```html
<!-- Existing field -->
<mat-form-field appearance="outline" subscriptSizing="dynamic">
  <mat-label>Giờ Nhận Hàng</mat-label>
  <input matInput [value]="DetailKhachhang()?.gionhanhang || ''" 
         (input)="updateGionhanhang($event)" 
         [disabled]="!isEdit()"/>
</mat-form-field>

<!-- ✅ NEW FIELD -->
<mat-form-field appearance="outline" subscriptSizing="dynamic">
  <mat-label>Mã Chuyến</mat-label>
  <input matInput [value]="DetailKhachhang()?.machuyen || ''" 
         (input)="updateMachuyen($event)" 
         [disabled]="!isEdit()" 
         placeholder="Vui lòng nhập Mã Chuyến"/>
</mat-form-field>
```

**Status**: ✅ UI field added with proper bindings

---

### 6. Frontend Customer Form (TypeScript)
**File**: `frontend/src/app/admin/khachhang/detailkhachhang/detailkhachhang.component.ts`

**Method**: `updateMachuyen()` (Line 340-352)

```typescript
updateGionhanhang(event: any) {
  this.DetailKhachhang.update((v: any) => ({
    ...v,
    gionhanhang: event.target.value
  }));
}

// ✅ NEW METHOD
updateMachuyen(event: any) {
  this.DetailKhachhang.update((v: any) => ({
    ...v,
    machuyen: event.target.value
  }));
}
```

**Status**: ✅ Signal update method added

---

### 7. Customer GraphQL Service - Create
**File**: `frontend/src/app/admin/khachhang/khachhang-graphql.service.ts`

**Method**: `createKhachhang()` (Line 187-240)

```typescript
const createData = {
  makh: dulieu.makh || await this.generateMaKhachHang(dulieu.loaikh),
  subtitle: dulieu.subtitle || '',
  tenfile: dulieu.tenfile || '',
  name: dulieu.name,
  diachi: dulieu.diachi || '',
  quan: dulieu.quan || '',
  email: dulieu.email || '',
  sdt: dulieu.sdt || '',
  mst: dulieu.mst || '',
  gionhanhang: dulieu.gionhanhang || '',
  machuyen: dulieu.machuyen || '',        // ✅ ADDED
  loaikh: dulieu.loaikh || 'banle',
  ghichu: dulieu.ghichu || '',
  isActive: dulieu.isActive !== false,
  isshowvat: dulieu.isshowvat,
  hiengia: dulieu.hiengia,
  istitle2: dulieu.istitle2,
  banggiaId: dulieu.banggiaId || null
};
```

**Status**: ✅ Added to createData object

---

### 8. Customer GraphQL Service - Update
**File**: `frontend/src/app/admin/khachhang/khachhang-graphql.service.ts`

**Method**: `updateKhachhang()` (Line 242-320)

```typescript
const updateData = {
  makh: dulieu.makh,
  subtitle: dulieu.subtitle,
  tenfile: dulieu.tenfile,
  name: dulieu.name,
  diachi: dulieu.diachi,
  quan: dulieu.quan,
  email: dulieu.email,
  sdt: dulieu.sdt,
  mst: dulieu.mst,
  gionhanhang: dulieu.gionhanhang,
  machuyen: dulieu.machuyen,              // ✅ ADDED
  loaikh: dulieu.loaikh,
  ghichu: dulieu.ghichu,
  isActive: dulieu.isActive,
  isshowvat: dulieu.isshowvat,
  hiengia: dulieu.hiengia,
  istitle2: dulieu.istitle2,
  banggiaId: dulieu.banggiaId
};
```

**Status**: ✅ Added to updateData object

---

### 9. Customer GraphQL Service - Import
**File**: `frontend/src/app/admin/khachhang/khachhang-graphql.service.ts`

**Method**: `importKhachhang()` (Line 366-430)

```typescript
const batchData = customersWithIndex.map((item) => ({
  makh: item.makh || generatedCodeMap[item.index] || `FALLBACK-${item.index}-${Date.now()}`,
  name: item.name,
  diachi: item.diachi || '',
  quan: item.quan || '',
  email: item.email || '',
  sdt: item.sdt || '',
  mst: item.mst || '',
  gionhanhang: item.gionhanhang || '',
  machuyen: item.machuyen || '',          // ✅ ADDED
  loaikh: item.loaikh || 'banle',
  ghichu: item.ghichu || '',
  isActive: item.isActive !== false,
  banggiaId: item.banggiaId || null
}));
```

**Status**: ✅ Added to batch import data

---

## ✅ Validation Checklist

- [x] **Database Schema**: machuyen field added to Khachhang model
- [x] **Migration**: Database updated with `npx prisma db push`
- [x] **Backend API**: phieuchuyen() returns machuyen from khachhang
- [x] **Frontend Export**: ExportPhieuchuyen includes 'Mã Chuyến' column
- [x] **Frontend Import**: ImportPhieuchuyen updates machuyen to khachhang
- [x] **UI Form**: Input field added to customer detail form
- [x] **Component Method**: updateMachuyen() signal update method
- [x] **Create Operation**: createKhachhang() includes machuyen
- [x] **Update Operation**: updateKhachhang() includes machuyen
- [x] **Batch Import**: importKhachhang() includes machuyen
- [x] **Compilation**: No TypeScript errors

---

## 🧪 Testing Guide

### Test 1: Create Customer with Mã Chuyến
```
1. Navigate to Khách Hàng (Customers)
2. Click "Thêm Mới" (Add New)
3. Fill in customer details
4. Enter "CH-01" in "Mã Chuyến" field
5. Click "Lưu" (Save)
6. Verify machuyen saved correctly
```

### Test 2: Update Existing Customer
```
1. Open an existing customer
2. Click "Sửa" (Edit)
3. Change "Mã Chuyến" to "CH-02"
4. Click "Lưu" (Save)
5. Verify update successful
```

### Test 3: Export Phiếu Chuyển
```
1. Navigate to Đơn Hàng (Orders)
2. Click "Xuất Phiếu Chuyển" button
3. Open exported Excel file
4. Verify "Mã Chuyến" column exists
5. Verify values match customer's machuyen
```

### Test 4: Import Phiếu Chuyển
```
1. Export Phiếu Chuyển Excel
2. Edit "Mã Chuyến" values (e.g., CH-01 → CH-03)
3. Save Excel file
4. Click "Nhập Phiếu Chuyển" (Import)
5. Select edited file
6. Wait for import completion
7. Navigate to customer record
8. Verify machuyen updated to new value (CH-03)
```

### Test 5: Batch Import Customers
```
1. Prepare Excel with customer data including machuyen column
2. Use customer import feature
3. Verify all customers created with correct machuyen
```

---

## 🔄 Integration Points

### With Existing Features
1. **Phiếu Chuyển Export**: machuyen appears as column in Excel
2. **Phiếu Chuyển Import**: Updates khachhang.machuyen via donhang relationship
3. **Customer CRUD**: Full support in create/update/import operations
4. **GraphQL Service**: Universal service handles machuyen transparently

### Cache Invalidation
No special cache handling needed as:
- Customer updates already invalidate `khachhang:*` cache
- Order updates invalidate `donhang:*` cache
- Phiếu Chuyển import triggers proper cache refresh

---

## 📊 Database Impact

### Schema Change
```sql
ALTER TABLE "Khachhang" ADD COLUMN "machuyen" TEXT;
```

### Performance Impact
- ✅ Minimal: Single indexed lookup via donhang → khachhang
- ✅ No new queries: Uses existing relationships
- ✅ Import speed: ~1 extra updateOne per row with machuyen

---

## 🎓 User Guide

### For Warehouse Staff

#### Editing Mã Chuyến Directly
1. Go to **Quản Lý** → **Khách Hàng**
2. Click on customer name to open details
3. Click **Sửa** (Edit button - top right)
4. Scroll to find **Mã Chuyến** field
5. Enter delivery route code (e.g., "CH-01", "CH-A", "TUYEN-1")
6. Click **Lưu** (Save)

#### Bulk Update via Phiếu Chuyến
1. Go to **Quản Lý** → **Đơn Hàng**
2. Click **Xuất Phiếu Chuyển** to export current data
3. Open Excel file
4. Edit **Mã Chuyến** column for customers as needed
5. Save Excel file
6. Click **Nhập Phiếu Chuyển** 
7. Select the edited file
8. Wait for "Import thành công" message
9. Customer records now have updated Mã Chuyến

---

## 🐛 Troubleshooting

### Issue: Mã Chuyến Not Saving
**Solution**: 
- Ensure you clicked "Sửa" (Edit) button first
- Field must NOT be disabled
- Click "Lưu" (Save) after editing

### Issue: Import Doesn't Update Mã Chuyến
**Solution**:
- Verify Excel column name is exactly "Mã Chuyến"
- Ensure "Mã Đơn Hàng" column has valid order codes
- Check console logs for "[IMPORT] Updated machuyen" messages

### Issue: Mã Chuyến Shows Empty in Export
**Solution**:
- Check if customer has machuyen set in database
- Verify donhang is linked to correct khachhang
- Re-run export after confirming data

---

## 📈 Future Enhancements

### Potential Improvements
1. **Dropdown List**: Create master list of route codes for selection
2. **Auto-Assignment**: Automatically assign machuyen based on địa chỉ (address)
3. **Route Planning**: Integration with delivery route optimization
4. **Statistics**: Report on orders per route (machuyen)
5. **Validation**: Prevent invalid route codes

### Related Features
- Link with Shipper management
- Route capacity planning
- Delivery time estimation by route

---

## 📝 Notes

### Implementation Decisions

**Why store in Khachhang instead of Donhang?**
- Route assignment is customer-based, not order-based
- Customer always belongs to same route
- Reduces data duplication across orders
- Easier to update route assignment

**Why update via Phiếu Chuyển import?**
- Users naturally work with delivery sheets
- Batch update multiple customers efficiently
- Consistent with existing workflow
- No need for separate UI for bulk route assignment

**Why no export for Khachhang?**
- Phiếu Chuyển already provides customer export with machuyen
- Avoids duplicate functionality
- Users prefer working with delivery context

---

## 🎉 Summary

Successfully implemented **Mã Chuyến** field with:
- ✅ Full CRUD support (Create, Read, Update)
- ✅ UI integration in customer forms
- ✅ Export in Phiếu Chuyển Excel
- ✅ Import from Phiếu Chuyển Excel
- ✅ Proper data relationships (Donhang → Khachhang)
- ✅ Signal-based reactivity
- ✅ No compilation errors
- ✅ Backward compatible

**Completion Date**: 2025-01-XX  
**Status**: ✅ PRODUCTION READY

---

## 📚 Related Documents

- [2022-CANCEL_ORDER_GUIDE.md](2022-CANCEL_ORDER_GUIDE.md) - Cancel order implementation
- [2042-PHASE2_README.md](2042-PHASE2_README.md) - Price history feature
- [2048-HUONG_DAN_CO_HINH.md](2048-HUONG_DAN_CO_HINH.md) - User guide with screenshots

---

**End of Document**
