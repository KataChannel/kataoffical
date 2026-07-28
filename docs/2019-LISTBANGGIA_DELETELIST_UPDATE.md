# Cập nhật ListBanggia Component - DeleteListItem

## Mục đích
Cập nhật code cho `listbanggia.component.ts` để có chức năng xóa nhiều bảng giá (bulk delete) giống như `listdonhang.component.ts`.

## Thay đổi

### File: `frontend/src/app/admin/banggia/listbanggia/listbanggia.component.ts`

#### 1. Thêm Imports
```typescript
import { MatDialog } from '@angular/material/dialog';
import { signal } from '@angular/core';
```

#### 2. Thêm Properties
```typescript
export class ListBanggiaComponent {
  // ... existing properties ...
  
  // New properties for EditList functionality
  EditList: any[] = [];
  isLoading = signal<boolean>(false);
  dialog = inject(MatDialog);
```

#### 3. Thêm Methods mới

##### a. `ToggleAll()` - Chọn/Bỏ chọn tất cả
```typescript
/**
 * Toggle all items selection
 */
ToggleAll(): void {
  if (this.EditList.length === this.dataSource.filteredData.length) {
    this.EditList = [];
  } else {
    this.EditList = [...this.dataSource.filteredData];
  }
}
```

##### b. `AddToEdit(item)` - Thêm/Xóa item khỏi danh sách chọn
```typescript
/**
 * Add item to edit list
 */
AddToEdit(item: any): void {
  const existingItem = this.EditList.find((v: any) => v.id === item.id);
  if (existingItem) {
    this.EditList = this.EditList.filter((v: any) => v.id !== item.id);
  } else {
    this.EditList.push(item);
  }
}
```

##### c. `CheckItemInEdit(item)` - Kiểm tra item đã được chọn
```typescript
/**
 * Check if item is in edit list
 */
CheckItemInEdit(item: any): boolean {
  return this.EditList.some((v: any) => v.id === item.id);
}
```

##### d. `openDeleteDialog(template)` - Mở dialog xác nhận xóa
```typescript
/**
 * Open delete confirmation dialog
 */
openDeleteDialog(template: any) {
  const dialogDeleteRef = this.dialog.open(template, {
    hasBackdrop: true,
    disableClose: true,
  });
  dialogDeleteRef.afterClosed().subscribe((result) => {
    if (result == 'true') {
      this.DeleteListItem();
    }
  });
}
```

##### e. `DeleteListItem()` - Xóa các items đã chọn
```typescript
/**
 * Delete selected items
 */
async DeleteListItem(): Promise<void> {
  if (!this.EditList?.length) {
    this._snackBar.open('Không có mục nào được chọn để xóa', '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-warning'],
    });
    return;
  }

  this.isLoading.set(true);
  try {
    let successCount = 0;
    let failCount = 0;

    // Delete each banggia one by one
    for (const item of this.EditList) {
      try {
        await this._BanggiaGraphqlService.DeleteBanggia(item);
        successCount++;
      } catch (error) {
        console.error(`Error deleting banggia ${item.id}:`, error);
        failCount++;
      }
    }

    this._snackBar.open(
      `Xóa thành công ${successCount} bảng giá${failCount > 0 ? `, ${failCount} lỗi` : ''}`,
      '',
      {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      }
    );
    
    this.EditList = [];
    await this.ngOnInit();
  } catch (error: any) {
    console.error('Error deleting items:', error);
    this._snackBar.open(`Lỗi khi xóa: ${error.message}`, '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  } finally {
    this.isLoading.set(false);
  }
}
```

## Tính năng mới

### 1. Chọn nhiều bảng giá
- Sử dụng checkbox để chọn từng bảng giá
- Nút "Chọn tất cả" để chọn/bỏ chọn tất cả bảng giá trong danh sách

### 2. Xóa hàng loạt (Bulk Delete)
- Chọn nhiều bảng giá cần xóa
- Hiển thị dialog xác nhận trước khi xóa
- Xử lý từng bảng giá một, đếm số lượng thành công/thất bại
- Hiển thị loading indicator trong quá trình xóa
- Refresh danh sách sau khi xóa xong

### 3. Thông báo chi tiết
- Cảnh báo nếu không có item nào được chọn
- Thông báo số lượng xóa thành công và thất bại
- Hiển thị lỗi cụ thể nếu có

## Sử dụng trong HTML Template

Để sử dụng các tính năng này trong template HTML, cần thêm:

```html
<!-- Checkbox chọn tất cả -->
<mat-checkbox 
  (change)="ToggleAll()" 
  [checked]="EditList.length === dataSource.filteredData.length && EditList.length > 0">
</mat-checkbox>

<!-- Checkbox cho từng item -->
<mat-checkbox 
  (change)="AddToEdit(item)" 
  [checked]="CheckItemInEdit(item)">
</mat-checkbox>

<!-- Nút xóa -->
<button mat-raised-button 
  color="warn" 
  (click)="openDeleteDialog(deleteConfirmTemplate)"
  [disabled]="EditList.length === 0">
  Xóa đã chọn ({{EditList.length}})
</button>

<!-- Dialog xác nhận xóa -->
<ng-template #deleteConfirmTemplate>
  <h2 mat-dialog-title>Xác nhận xóa</h2>
  <mat-dialog-content>
    Bạn có chắc chắn muốn xóa {{EditList.length}} bảng giá đã chọn?
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button [mat-dialog-close]="'false'">Hủy</button>
    <button mat-raised-button color="warn" [mat-dialog-close]="'true'">Xóa</button>
  </mat-dialog-actions>
</ng-template>

<!-- Loading overlay -->
<div *ngIf="isLoading()" class="loading-overlay">
  <mat-spinner></mat-spinner>
</div>
```

## So sánh với ListDonhang

| Tính năng | ListDonhang | ListBanggia | Ghi chú |
|-----------|-------------|-------------|---------|
| EditList property | ✅ | ✅ | Giống nhau |
| isLoading signal | ✅ | ✅ | Giống nhau |
| ToggleAll() | ✅ | ✅ | Giống nhau |
| AddToEdit() | ✅ | ✅ | Giống nhau |
| CheckItemInEdit() | ✅ | ✅ | Giống nhau |
| openDeleteDialog() | ✅ | ✅ | Giống nhau |
| DeleteListItem() | ✅ | ✅ | Khác: Banggia dùng loop, Donhang dùng DeleteBulkDonhang |

## Lưu ý

1. **Service method**: ListBanggia không có method `DeleteBulkBanggia` nên phải xóa từng item một trong loop
2. **Error handling**: Mỗi item được xóa trong try-catch riêng để đếm chính xác số lượng thành công/thất bại
3. **Refresh data**: Sau khi xóa xong, gọi `ngOnInit()` để reload toàn bộ danh sách
4. **Loading state**: Sử dụng signal để reactive UI cập nhật loading state

## Testing

Test các trường hợp:
1. ✅ Chọn 1 bảng giá và xóa
2. ✅ Chọn nhiều bảng giá và xóa
3. ✅ Chọn tất cả và xóa
4. ✅ Click xóa khi chưa chọn item nào
5. ✅ Hủy dialog xác nhận
6. ✅ Xóa thành công một số, thất bại một số (test error handling)

## Kết quả

Bây giờ `listbanggia.component.ts` đã có đầy đủ chức năng xóa hàng loạt giống như `listdonhang.component.ts`.
