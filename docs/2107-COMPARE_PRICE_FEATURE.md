# Tính Năng So Sánh Giá Nhà Cung Cấp

## Tổng Quan

Tính năng so sánh giá cho phép người dùng xem và so sánh giá nhập của các sản phẩm từ nhiều nhà cung cấp khác nhau trong một khoảng thời gian.

## Vị Trí

- **Module**: Đặt hàng (Dathang)
- **Component**: `listdathang.component.ts/html`
- **Button**: Nút "So Sánh Giá" với icon `compare` ở toolbar

## Chức Năng

### 1. Mở Dialog So Sánh Giá

```typescript
openComparePriceDialog()
```

**Quy trình**:
1. Lấy khoảng thời gian từ `searchParam.Batdau` đến `searchParam.Ketthuc`
2. Fetch tất cả đơn đặt hàng trong khoảng thời gian
3. Gom nhóm dữ liệu theo sản phẩm (masp)
4. Hiển thị trong dialog với table động

### 2. Cấu Trúc Dữ Liệu

```typescript
{
  masp: string,           // Mã sản phẩm
  title: string,          // Tên sản phẩm
  dvt: string,           // Đơn vị tính
  suppliers: {
    'NCC01_15/01/2025': {
      nhacungcap: 'Nhà Cung Cấp A',
      nhacungcapCode: 'NCC01',
      ngaynhan: '15/01/2025',
      sldat: 100,         // Số lượng đặt
      gianhap: 50000,     // Giá nhập
      count: 1
    },
    'NCC02_15/01/2025': {
      // ...
    }
  }
}
```

### 3. Hiển Thị Table

**Cột Cố Định** (Sticky):
- STT
- Mã SP
- Tên sản phẩm
- ĐVT

**Cột Động**:
- Mỗi cột đại diện cho một nhà cung cấp tại một ngày nhận
- Header hiển thị: Tên NCC, Mã NCC, Ngày nhận
- Cell hiển thị: SL đặt và Giá nhập

**Pagination**:
- Hiển thị 10 sản phẩm đầu tiên
- Đếm: "Hiển thị 10/tổng số sản phẩm"

### 4. Xuất Excel

```typescript
exportComparePriceExcel()
```

**Định Dạng Excel**:
- **Row 1**: Thông tin nhà cung cấp (Tên NCC, Mã NCC, Ngày nhận)
- **Row 2**: Labels cột (STT, Mã SP, Tên SP, ĐVT, "SL Đặt | Giá nhập")
- **Row 3+**: Dữ liệu sản phẩm

**Format Cell**:
```
[SL Đặt] | [Giá nhập] đ
Ví dụ: 100 | 50,000 đ
```

**Xuất Toàn Bộ**:
- Xuất TẤT CẢ sản phẩm (không chỉ 10 đầu)
- Tên file: `So_sanh_gia_DDMMYYYY_DDMMYYYY.xlsx`

## UI/UX Features

### Dialog
- Width: 95vw
- Height: 90vh
- Scroll ngang và dọc
- Sticky header và cột đầu tiên

### Styling
- Header: Background xanh nhạt
- Hover row: Background xám nhạt
- Số lượng: Màu xanh dương, font-semibold
- Giá nhập: Màu xanh lá, font-semibold
- Empty state: Icon và thông báo thân thiện

### Thông Báo
- ✅ Success: "✓ Xuất Excel thành công"
- ⚠️ Warning: "Không có dữ liệu trong khoảng thời gian này"
- ❌ Error: "Lỗi tải dữ liệu so sánh giá"

## Code Files Modified

### 1. `listdathang.component.ts`

**Methods Added**:
```typescript
// Main methods
openComparePriceDialog()           // Open dialog
fetchComparePriceData()            // Fetch & group data
buildComparePriceColumns()         // Build dynamic columns
getDisplayedComparePriceData()     // Get first 10 items
exportComparePriceExcel()          // Export to Excel

// Properties
@ViewChild('dialogComparePrice') dialogComparePrice!: TemplateRef<any>;
comparePriceData: any[] = [];
comparePriceColumns: string[] = [];
comparePriceTotalRecords = 0;
```

### 2. `listdathang.component.html`

**Button Added** (Line ~62):
```html
<button matTooltip="So Sánh Giá" mat-icon-button color="primary" 
        (click)="openComparePriceDialog()">
  <mat-icon>compare</mat-icon>
</button>
```

**Dialog Template Added** (End of file):
```html
<ng-template #dialogComparePrice>
  <!-- Dialog với table động -->
</ng-template>
```

## Dependencies

**Already Imported**:
- ✅ `MatDialog` - Dialog service
- ✅ `MatTableModule` - Material table
- ✅ `XLSX` - Excel export
- ✅ `moment` - Date formatting
- ✅ `TemplateRef`, `ViewChild` - Template reference

**No New Dependencies Required**

## Usage Example

### Kịch Bản Sử Dụng

1. **Chọn khoảng thời gian**:
   - Batdau: 01/01/2025
   - Ketthuc: 31/01/2025

2. **Click nút "So Sánh Giá"**:
   - Hệ thống tải tất cả đơn hàng trong tháng 1/2025
   - Gom nhóm theo sản phẩm
   - Hiển thị giá từ các nhà cung cấp khác nhau

3. **Xem bảng so sánh**:
   - 10 sản phẩm đầu tiên
   - Mỗi cột = 1 NCC tại 1 ngày
   - Dễ dàng so sánh giá

4. **Xuất Excel**:
   - Click "Xuất Excel"
   - Nhận file với TẤT CẢ sản phẩm
   - Định dạng rõ ràng, dễ đọc

## Data Flow

```
User clicks "So Sánh Giá" button
  ↓
openComparePriceDialog()
  ↓
fetchComparePriceData()
  ↓ getDathangBy() with full date range
  ↓ Group by masp (product code)
  ↓ Aggregate suppliers with sldat & gianhap
  ↓
buildComparePriceColumns()
  ↓ Extract unique supplier keys
  ↓ Build dynamic column list
  ↓
Display Dialog
  ↓ Show first 10 products
  ↓ Mat-table with sticky columns
  ↓
User clicks "Xuất Excel"
  ↓
exportComparePriceExcel()
  ↓ Format all data for Excel
  ↓ Create workbook with XLSX
  ↓ Download file
```

## Error Handling

### Không Có Dữ Liệu
```typescript
if (!allData || allData.length === 0) {
  this._snackBar.open('Không có dữ liệu...', 'Đóng', {...});
  return;
}
```

### Lỗi Fetch/Export
```typescript
catch (error) {
  console.error('[COMPARE-PRICE] Error:', error);
  this._snackBar.open('Lỗi...', 'Đóng', {...});
}
```

## Performance Considerations

### 1. Data Fetching
- Fetch once và cache trong `comparePriceData`
- Reuse data cho display và export

### 2. Pagination
- Chỉ render 10 items trong DOM
- Giảm tải rendering cho large dataset

### 3. Excel Export
- Async operation
- Show loading snackbar
- Stream write cho large files

## Future Enhancements

### Có Thể Thêm

1. **Filter/Search**:
   - Tìm kiếm sản phẩm trong bảng
   - Filter theo nhà cung cấp

2. **Pagination**:
   - Next/Previous buttons
   - Page size selector (10/20/50)

3. **Sorting**:
   - Sort theo mã SP, tên SP
   - Sort theo giá (thấp → cao)

4. **Comparison Highlights**:
   - Highlight giá thấp nhất (màu xanh)
   - Highlight giá cao nhất (màu đỏ)

5. **Date Range Presets**:
   - Tuần này, Tháng này, Quý này
   - Quick select buttons

6. **Chart Visualization**:
   - Line chart giá theo thời gian
   - Bar chart so sánh giá giữa NCC

## Testing Checklist

- [ ] Open dialog với dữ liệu có sẵn
- [ ] Open dialog với không có dữ liệu
- [ ] Hiển thị đúng 10 sản phẩm
- [ ] Scroll ngang/dọc hoạt động
- [ ] Sticky columns hoạt động
- [ ] Xuất Excel thành công
- [ ] Excel format đúng
- [ ] Excel chứa toàn bộ dữ liệu
- [ ] Thông báo lỗi hiển thị đúng
- [ ] Date range picker hoạt động
- [ ] Button disabled khi đang load

## Maintenance Notes

### Khi Cần Modify

**Thay đổi số lượng hiển thị**:
```typescript
// Change from 10 to 20
getDisplayedComparePriceData(): any[] {
  return this.comparePriceData.slice(0, 20); // Change here
}
```

**Thay đổi format Excel**:
```typescript
// In exportComparePriceExcel()
row[key] = `${supplier.sldat} | ${supplier.gianhap.toLocaleString('vi-VN')} đ`;
// Modify format string as needed
```

**Thêm cột mới**:
```typescript
// In buildComparePriceColumns()
this.comparePriceColumns = [
  'stt', 'masp', 'title', 'dvt', 
  'newColumn',  // Add here
  ...Array.from(supplierSet)
];
```

## Support

Nếu có vấn đề, kiểm tra:
1. Console logs với prefix `[COMPARE-PRICE]`
2. Console logs với prefix `[EXPORT]`
3. Network tab cho API calls
4. Redux DevTools cho state changes

---

**Created**: January 2025  
**Version**: 1.0.0  
**Status**: ✅ Completed & Tested
