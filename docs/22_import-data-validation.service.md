# Import Data Validation Service

## Tổng quan

Service tập trung để xử lý validation và transformation dữ liệu import. Service này được thiết kế để:
- Kiểm tra trùng lặp dữ liệu
- Chuẩn bị dữ liệu cho import (overwrite hoặc add new)
- Validate format dữ liệu
- Transform dữ liệu trước khi import

## Vị trí file
`/frontend/src/app/shared/services/import-data-validation.service.ts`

## Cách sử dụng

### Import service
```typescript
import { ImportDataValidationService } from '../../../shared/services/import-data-validation.service';
```

### Kiểm tra trùng lặp
```typescript
const duplicates = ImportDataValidationService.checkDuplicates(
  newData,
  existingData,
  'masp' // field để so sánh
);
```

### Chuẩn bị dữ liệu cho import
```typescript
// Sản phẩm
const finalData = ImportDataValidationService.prepareSanphamData(
  data,
  existingData,
  overwrite // true = ghi đè, false = chỉ thêm mới
);

// Khách hàng
const finalData = ImportDataValidationService.prepareKhachhangData(
  data,
  existingData,
  overwrite
);

// Nhà cung cấp
const finalData = ImportDataValidationService.prepareNhacungcapData(
  data,
  existingData,
  overwrite
);

// Bảng giá
const finalData = ImportDataValidationService.prepareBanggiaData(
  data,
  existingData,
  overwrite
);

// Kho
const finalData = ImportDataValidationService.prepareKhoData(
  data,
  existingData,
  overwrite
);

// Generic method cho loại dữ liệu khác
const finalData = ImportDataValidationService.prepareGenericData(
  data,
  existingData,
  'uniqueField',
  overwrite
);
```

### Validate dữ liệu
```typescript
// Validate required fields
const { valid, invalid } = ImportDataValidationService.validateRequiredFields(
  data,
  ['masp', 'title'] // required fields
);

// Validate format theo loại dữ liệu
const { valid, invalid } = ImportDataValidationService.validateDataFormat(
  data,
  'sanpham' // hoặc 'khachhang', 'nhacungcap', etc.
);
```

### Transform dữ liệu
```typescript
// Transform dữ liệu trước khi import
const transformedData = ImportDataValidationService.transformDataForImport(
  data,
  'sanpham' // loại dữ liệu
);
```

### Utility methods
```typescript
// Lấy danh sách required fields theo loại dữ liệu
const requiredFields = ImportDataValidationService.getRequiredFields('sanpham');

// Lấy field unique identifier
const uniqueField = ImportDataValidationService.getUniqueField('sanpham');

// Filter dữ liệu hợp lệ
const validData = ImportDataValidationService.filterValidData(
  data,
  ['masp', 'title']
);

// Tạo summary validation
const summary = ImportDataValidationService.getValidationSummary(
  totalItems,
  validItems,
  invalidItems,
  duplicateItems
);
```

## Loại dữ liệu được hỗ trợ

| Data Type | Unique Field | Required Fields | Transform Method |
|-----------|--------------|-----------------|------------------|
| `sanpham` | `masp` | `['masp', 'title']` | `transformSanphamData` |
| `khachhang` | `makh` | `['makh', 'name']` | `transformKhachhangData` |
| `nhacungcap` | `mancc` | `['mancc', 'name']` | `transformNhacungcapData` |
| `banggia` | `mabanggia` | `['mabanggia', 'title']` | `transformBanggiaData` |
| `kho` | `makho` | `['makho', 'tenkho']` | `transformKhoData` |

## Example Implementation

```typescript
async DoImportData(data: any) {
  // Import Sản phẩm
  if (data.sanpham?.length > 0) {
    // Transform data
    const transformedData = ImportDataValidationService.transformDataForImport(
      data.sanpham,
      'sanpham'
    );
    
    // Filter valid data
    const validData = ImportDataValidationService.filterValidData(
      transformedData,
      ImportDataValidationService.getRequiredFields('sanpham')
    );
    
    // Check duplicates
    const duplicates = ImportDataValidationService.checkDuplicates(
      validData,
      this.existingData,
      ImportDataValidationService.getUniqueField('sanpham')
    );
    
    // Show confirmation dialog
    const result = await this.showImportConfirmDialog(
      'Sản Phẩm',
      this.existingData.length,
      validData.length,
      duplicates
    );
    
    if (!result.confirmed) return;
    
    // Prepare final data
    const finalData = ImportDataValidationService.prepareSanphamData(
      validData,
      this.existingData,
      result.overwrite
    );
    
    // Import
    await this._SanphamService.ImportSanpham(finalData);
  }
}
```

## Best Practices

1. **Luôn validate dữ liệu** trước khi import
2. **Sử dụng transform methods** để chuẩn hóa dữ liệu
3. **Kiểm tra trùng lặp** và cho user lựa chọn
4. **Filter dữ liệu hợp lệ** trước khi xử lý
5. **Sử dụng generic methods** cho các loại dữ liệu tùy chỉnh

## Migration từ duplicate implementations

Nếu bạn có duplicate implementations trong các files khác:

1. **Remove duplicate class definitions**
2. **Import service từ shared location**
3. **Update references** để sử dụng static methods
4. **Test thoroughly** để đảm bảo functionality không bị ảnh hưởng

```typescript
// Before (duplicate implementation)
class ImportDataValidationService {
  static checkDuplicates(...) { ... }
}

// After (use centralized service)
import { ImportDataValidationService } from '../../../shared/services/import-data-validation.service';
```
