# Cải tiến chức năng Import Data với xác nhận ghi đè

## Tổng quan
Đã cập nhật chức năng import data để hỏi xác nhận người dùng khi phát hiện dữ liệu trùng lặp, giúp tránh việc ghi đè dữ liệu quan trọng một cách không mong muốn.

## Tính năng mới

### 1. Dialog xác nhận import
- **Phát hiện trùng lặp tự động**: Hệ thống tự động kiểm tra và hiển thị danh sách các mục trùng lặp
- **Lựa chọn linh hoạt**: Người dùng có thể chọn ghi đè hoặc chỉ thêm mới
- **Thông tin chi tiết**: Hiển thị số lượng dữ liệu hiện tại, dữ liệu mới và số lượng trùng lặp

### 2. Các loại dữ liệu được hỗ trợ
- ✅ **Sản phẩm** (kiểm tra theo `masp`)
- ✅ **Khách hàng** (kiểm tra theo `makh`) 
- ✅ **Nhà cung cấp** (kiểm tra theo `mancc`)
- ✅ **Bảng giá** (kiểm tra theo `mabanggia`)
- 🔄 **Đơn hàng, Đặt hàng** (giữ nguyên logic cũ)

### 3. Cách hoạt động

#### Khi không có trùng lặp:
```
✅ Không có dữ liệu trùng lặp. Tất cả sẽ được thêm mới.
[Hủy bỏ] [Import]
```

#### Khi có trùng lặp:
```
⚠️ Phát hiện 5 mục trùng lặp:
• SP001 - Sản phẩm A
• SP002 - Sản phẩm B
...và 3 mục khác

☐ Ghi đè lên dữ liệu cũ (các mục trùng lặp sẽ được cập nhật)

ℹ️ Chỉ thêm mới các mục chưa tồn tại, bỏ qua các mục trùng lặp

[Hủy bỏ] [Import & Bỏ qua trùng lặp]
```

#### Khi chọn ghi đè:
```
☑️ Ghi đè lên dữ liệu cũ (các mục trùng lặp sẽ được cập nhật)

⚠️ Dữ liệu cũ sẽ bị thay thế bởi dữ liệu mới

[Hủy bỏ] [Import & Ghi đè]
```

## Files được thay đổi

### 1. Import Confirmation Dialog
**File:** `/frontend/src/app/admin/importdata/import-confirmation-dialog.component.ts`
- Component dialog hiển thị thông tin xác nhận
- Interface `ImportConfirmationData` để truyền dữ liệu
- Logic hiển thị tên mục phù hợp theo từng loại dữ liệu

### 2. Import Data Service Updates  
**File:** `/frontend/src/app/admin/importdata/listimportdata/listimportdata.component.ts`
- Class `ImportDataValidationService` với các method:
  - `checkDuplicates()`: Kiểm tra trùng lặp
  - `prepareSanphamData()`: Xử lý dữ liệu sản phẩm
  - `prepareKhachhangData()`: Xử lý dữ liệu khách hàng
  - `prepareNhacungcapData()`: Xử lý dữ liệu nhà cung cấp
  - `prepareBanggiaData()`: Xử lý dữ liệu bảng giá
- Method `showImportConfirmDialog()`: Hiển thị dialog xác nhận
- Cập nhật logic import cho các loại dữ liệu chính

## Cách sử dụng

### Để thêm xác nhận cho loại dữ liệu mới:

1. **Thêm method prepare mới:**
```typescript
static prepareNewDataType(data: any[], existingData: any[], overwrite: boolean) {
  if (overwrite) {
    return data;
  } else {
    const existingKeys = new Set(existingData.map(item => item.uniqueField));
    return data.filter(item => !existingKeys.has(item.uniqueField));
  }
}
```

2. **Cập nhật dialog để hiển thị tên phù hợp:**
```typescript
getItemDisplayName(item: any): string {
  switch (this.data.dataType) {
    case 'Data Type Mới':
      return `${item.uniqueField} - ${item.displayName}`;
    // ...existing cases
  }
}
```

3. **Thêm logic import mới:**
```typescript
if(data.newtype && data.newtype.length > 0 && this.ListEdit().some((item: any) => item.value === 'newtype')) {
  // Prepare data
  const newData = (data.newtype || []).map(/* mapping logic */);
  
  // Check duplicates
  const duplicates = ImportDataValidationService.checkDuplicates(newData, this.existingData, 'uniqueField');
  const result = await this.showImportConfirmDialog('Data Type Mới', this.existingData.length, newData.length, duplicates);
  
  if (!result.confirmed) return;
  
  // Process final data
  const finalData = ImportDataValidationService.prepareNewDataType(newData, this.existingData, result.overwrite);
  
  // Import logic...
}
```

## Lợi ích

### 👥 **Cho người dùng**
- **An toàn dữ liệu**: Tránh mất dữ liệu quan trọng do ghi đè nhầm
- **Linh hoạt**: Có thể chọn ghi đè hoặc chỉ thêm mới tùy tình huống
- **Thông tin rõ ràng**: Biết chính xác những gì sẽ bị thay đổi

### 👨‍💻 **Cho developer**
- **Code sạch hơn**: Logic xử lý trùng lặp được tập trung
- **Dễ mở rộng**: Thêm loại dữ liệu mới chỉ cần vài bước
- **Maintainable**: Code có cấu trúc rõ ràng, dễ bảo trì

### 🏢 **Cho doanh nghiệp**
- **Giảm rủi ro**: Tránh mất dữ liệu quan trọng
- **Tăng hiệu quả**: Người dùng tự tin hơn khi import dữ liệu
- **Chuyên nghiệp**: Trải nghiệm người dùng như các phần mềm enterprise

## Example Usage

```typescript
// Trước khi có cải tiến (rủi ro cao)
await this._SanphamService.ImportSanpham(data); // Ghi đè tất cả không hỏi

// Sau khi có cải tiến (an toàn)
const duplicates = ImportDataValidationService.checkDuplicates(data, existing, 'masp');
const result = await this.showImportConfirmDialog('Sản Phẩm', existing.length, data.length, duplicates);

if (result.confirmed) {
  const finalData = ImportDataValidationService.prepareSanphamData(data, existing, result.overwrite);
  await this._SanphamService.ImportSanpham(finalData);
}
```

## Best Practices

1. **Luôn kiểm tra trùng lặp** trước khi import dữ liệu quan trọng
2. **Hiển thị thông tin chi tiết** để người dùng đưa ra quyết định chính xác
3. **Cung cấp tùy chọn linh hoạt** giữa ghi đè và thêm mới
4. **Feedback rõ ràng** về kết quả import (số lượng, loại thao tác)
5. **Error handling** đầy đủ với thông báo phù hợp

Cải tiến này giúp ứng dụng trở nên professional hơn và giảm thiểu rủi ro trong quá trình import dữ liệu hàng loạt.
