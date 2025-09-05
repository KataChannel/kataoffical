# Demo Inline Edit cho Nhucau Dathang Component

## Tính năng mới đã thêm:

### 1. **Inline Edit cho 2 trường:**
- **ghichu**: Trường ghi chú - có thể nhập văn bản
- **xSLDat**: Trường số lượng đặt (Nhà CC) - chỉ nhập số

### 2. **Lưu trữ tạm thời (Temporary Storage):**
- Tự động lưu vào localStorage với key: `nhucau_temp_edits`
- Dữ liệu được lưu ngay khi người dùng nhập xong (Enter hoặc blur)
- Hiển thị số lượng thay đổi tạm thời trên giao diện

### 3. **Các nút quản lý:**
- **Xuất tạm (số)**: Xuất dữ liệu thay đổi tạm thời ra file Excel
- **Áp dụng (số)**: Áp dụng các thay đổi tạm thời vào dữ liệu chính
- **Xóa tạm**: Xóa tất cả dữ liệu tạm thời

## Cách sử dụng:

### Chỉnh sửa inline:
1. Click vào ô `Ghi Chú` hoặc `SL Đặt (Nhà CC)` 
2. Ô sẽ chuyển thành input field
3. Nhập dữ liệu mới
4. Nhấn `Enter` hoặc click ra ngoài để lưu tạm
5. Ô có thay đổi sẽ được đánh dấu màu vàng với icon edit

### Quản lý dữ liệu tạm:
1. **Xuất tạm**: Tải file Excel chứa tất cả thay đổi tạm thời
2. **Áp dụng**: Áp dụng tất cả thay đổi vào dữ liệu chính và xóa storage
3. **Xóa tạm**: Chỉ xóa storage, không áp dụng thay đổi

## Tính năng kỹ thuật:

### TypeScript Methods:
```typescript
// Bắt đầu chỉnh sửa
startEdit(row: any, field: string): void

// Dừng chỉnh sửa  
stopEdit(row: any, field: string): void

// Kiểm tra đang chỉnh sửa
isEditing(row: any, field: string): boolean

// Lưu giá trị tạm thời
saveFieldValue(row: any, field: string, value: any): void

// Lấy giá trị (ưu tiên từ storage)
getFieldValue(row: any, field: string): any

// Kiểm tra có thay đổi tạm
hasFieldChanged(row: any, field: string): boolean

// Xuất Excel dữ liệu tạm
exportTempChanges(): Promise<void>

// Áp dụng thay đổi tạm
applyTempChanges(): Promise<void>

// Xóa storage tạm
clearTempStorage(): void
```

### HTML Structure:
```html
<!-- Buttons quản lý tạm thời -->
<button (click)="exportTempChanges()" [disabled]="getTempChangesCount() === 0">
  Xuất tạm ({{ getTempChangesCount() }})
</button>

<button (click)="applyTempChanges()" [disabled]="getTempChangesCount() === 0">
  Áp dụng ({{ getTempChangesCount() }})
</button>

<button (click)="clearTempStorage()" [disabled]="getTempChangesCount() === 0">
  Xóa tạm
</button>

<!-- Inline edit cho ghichu -->
@case ('ghichu') {
  <div class="max-w-48 relative" (click)="$event.stopPropagation()">
    @if (isEditing(row, 'ghichu')) {
      <input type="text" 
             [value]="getFieldValue(row, 'ghichu')"
             (keydown)="onFieldKeyDown($event, row, 'ghichu')"
             (blur)="onFieldBlur($event, row, 'ghichu')"
             class="w-full px-2 py-1 border border-blue-400 rounded">
    } @else {
      <div (click)="startEdit(row, 'ghichu')" 
           [class.bg-yellow-50]="hasFieldChanged(row, 'ghichu')"
           class="cursor-text px-2 py-1 hover:bg-gray-100">
        {{ getFieldValue(row, 'ghichu') || '---' }}
      </div>
    }
  </div>
}
```

## Lưu ý quan trọng:

1. **Data Persistence**: Dữ liệu tạm được lưu trong localStorage, không mất khi refresh browser
2. **Visual Indicators**: Ô có thay đổi tạm được highlight màu vàng với icon edit
3. **Keyboard Support**: 
   - `Enter`: Lưu và thoát edit mode
   - `Escape`: Thoát edit mode không lưu
4. **Click Handling**: Sử dụng `$event.stopPropagation()` để tránh conflict với row selection
5. **Data Validation**: xSLDat chỉ nhận số, có min="0"

## Test Cases:

### TC1: Basic Inline Edit
1. Click vào ô Ghi Chú của một sản phẩm
2. Nhập "Test ghi chú 1" 
3. Nhấn Enter
4. Verify: Ô chuyển màu vàng, counter tăng lên 1

### TC2: Export Temp Data  
1. Thực hiện vài thay đổi tạm thời
2. Click "Xuất tạm"
3. Verify: File Excel được tải với dữ liệu thay đổi

### TC3: Apply Changes
1. Có một số thay đổi tạm thời
2. Click "Áp dụng" 
3. Verify: Dữ liệu được cập nhật, storage được xóa, counter = 0

### TC4: Clear Storage
1. Có thay đổi tạm thời
2. Click "Xóa tạm"
3. Verify: Tất cả highlight biến mất, counter = 0, dữ liệu gốc không đổi

## Future Enhancements:

1. **Batch Edit**: Chọn nhiều row và edit cùng lúc
2. **Validation Rules**: Thêm validation cho từng field  
3. **Undo/Redo**: Tính năng hoàn tác
4. **Auto-save**: Tự động lưu sau khoảng thời gian nhất định
5. **Conflict Resolution**: Xử lý khi có nhiều user edit cùng lúc
