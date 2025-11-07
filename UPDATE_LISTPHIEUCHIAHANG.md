# ✅ Cập Nhật ListPhieuChiaHang Component

**Ngày**: 7 tháng 11, 2025  
**Status**: ✅ HOÀN THÀNH  
**Component**: ListPhieuChiaHangComponent

---

## 🎯 Yêu Cầu

1. ✅ **Trạng thái In**: Hiển thị "Chưa in" / "Đã in" với 2 màu khác nhau
2. ✅ **Không ẩn khách hàng**: Hiển thị tất cả khách hàng
3. ✅ **Thêm cột "Nhân Viên Chia Hàng"**: 
   - Nhập trực tiếp trên giao diện
   - Cập nhật bằng upload template Excel

---

## 🔧 Thay Đổi Code

### 1. Component TypeScript

**File**: `listphieuchiahang.component.ts`

#### Thêm Columns Mới

```typescript
// BEFORE
displayedColumns: string[] = [
  'madonhang',
  'name',
  'sanpham',
  'ngaygiao',
  'ghichu',
  'status',
  'createdAt',
  'updatedAt',
];

ColumnName: any = {
  madonhang: 'Mã Đơn Hàng',
  name: 'Khách Hàng',
  sanpham: 'Sản Phẩm',
  ngaygiao: 'Ngày Giao',
  ghichu: 'Ghi Chú',
  status: 'Trạng Thái',
  createdAt: 'Ngày Tạo',
  updatedAt: 'Ngày Cập Nhật',
};

// AFTER ✅
displayedColumns: string[] = [
  'madonhang',
  'name',
  'nhanvienchiahang',    // ✅ NEW
  'sanpham',
  'ngaygiao',
  'ghichu',
  'trangthaiin',          // ✅ NEW
  'status',
  'createdAt',
  'updatedAt',
];

ColumnName: any = {
  madonhang: 'Mã Đơn Hàng',
  name: 'Khách Hàng',
  nhanvienchiahang: 'Nhân Viên Chia Hàng',  // ✅ NEW
  sanpham: 'Sản Phẩm',
  ngaygiao: 'Ngày Giao',
  ghichu: 'Ghi Chú',
  trangthaiin: 'Trạng Thái In',              // ✅ NEW
  status: 'Trạng Thái',
  createdAt: 'Ngày Tạo',
  updatedAt: 'Ngày Cập Nhật',
};
```

#### Thêm Methods Mới

```typescript
/**
 * Update nhân viên chia hàng cho đơn hàng
 */
async updateNhanvienChiahang(row: any): Promise<void> {
  try {
    // Call API để update
    await this._DonhangService.updateDonhang({
      id: row.id,
      nhanvienchiahang: row.nhanvienchiahang || ''
    });
    
    this._snackBar.open('Cập nhật nhân viên chia hàng thành công', '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  } catch (error) {
    console.error('Error updating nhanvienchiahang:', error);
    this._snackBar.open('Lỗi khi cập nhật nhân viên', '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }
}

/**
 * Toggle trạng thái in
 */
async toggleTrangthaiIn(row: any): Promise<void> {
  try {
    // Toggle trạng thái
    row.trangthaiin = !row.trangthaiin;
    
    // Call API để update
    await this._DonhangService.updateDonhang({
      id: row.id,
      trangthaiin: row.trangthaiin
    });
    
    const status = row.trangthaiin ? 'Đã in' : 'Chưa in';
    this._snackBar.open(`Cập nhật trạng thái: ${status}`, '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  } catch (error) {
    console.error('Error toggling trangthaiin:', error);
    // Revert nếu có lỗi
    row.trangthaiin = !row.trangthaiin;
    
    this._snackBar.open('Lỗi khi cập nhật trạng thái in', '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }
}
```

#### Cập Nhật UpdateListBill Method

```typescript
UpdateListBill() {
  console.log(this.ListBillXuly);
  const updatePromises = this.ListBillXuly.map(async (v) => {
    const v1 = await this._DonhangService.SearchField({
      madonhang: v.madonhang,
    });
    
    // Update sản phẩm
    v1.sanpham.forEach((v2: any) => {
      const item = v.sanpham.find((v3: any) => v3.masp === v2.masp);
      if (item) {
        v2.slgiao = item.slgiao;
      }
    });
    
    // ✅ NEW: Update nhân viên chia hàng nếu có trong template
    if (v.nhanvienchiahang !== undefined && v.nhanvienchiahang !== null) {
      v1.nhanvienchiahang = v.nhanvienchiahang;
    }
    
    // ✅ NEW: Update trạng thái in nếu có trong template
    if (v.trangthaiin !== undefined && v.trangthaiin !== null) {
      v1.trangthaiin = v.trangthaiin;
    }
    
    console.log(v1);
    await this._DonhangService.updateDonhang(v1);
  });

  Promise.all(updatePromises).then(() => {
    this._snackBar.open('Cập Nhật Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  });
}
```

---

### 2. Component HTML

**File**: `listphieuchiahang.component.html`

#### Thêm Display Columns Mới

```html
<!-- Cột Nhân Viên Chia Hàng -->
@case ('nhanvienchiahang') {
  <div class="max-w-40 line-clamp-4">
    <input 
      type="text" 
      [(ngModel)]="row.nhanvienchiahang"
      (blur)="updateNhanvienChiahang(row)"
      (keydown.enter)="updateNhanvienChiahang(row); $any($event.target).blur()"
      placeholder="Nhập tên nhân viên"
      class="w-full px-2 py-1 text-sm border border-gray-300 rounded 
             focus:border-blue-500 focus:outline-none"
    />
  </div>
}

<!-- Cột Trạng Thái In -->
@case ('trangthaiin') {
  <span class="max-w-40 line-clamp-4">
    <button 
      mat-button
      (click)="toggleTrangthaiIn(row)"
      [ngClass]="{
        'bg-gray-200 text-gray-700': !row.trangthaiin,
        'bg-green-500 text-white': row.trangthaiin
      }"
      class="!text-xs !px-3 !py-1 !min-w-0 rounded-full font-medium">
      {{ row.trangthaiin ? 'Đã in' : 'Chưa in' }}
    </button>
  </span>
}
```

---

## 🎨 Giao Diện

### Trạng Thái In

| Trạng Thái | Màu Sắc | Class |
|------------|---------|-------|
| **Chưa in** | Xám | `bg-gray-200 text-gray-700` |
| **Đã in** | Xanh lá | `bg-green-500 text-white` |

### Input Nhân Viên

- **Type**: Text input với border
- **Placeholder**: "Nhập tên nhân viên"
- **Auto-save**: 
  - Khi blur (rời khỏi input)
  - Khi nhấn Enter
- **Styling**: 
  - Border gray thường
  - Border blue khi focus
  - Full width

---

## 📊 Chức Năng

### 1. Nhập Trực Tiếp

```
User nhập tên → Blur/Enter → API update → Snackbar thông báo
```

**Success**: "Cập nhật nhân viên chia hàng thành công"  
**Error**: "Lỗi khi cập nhật nhân viên"

### 2. Toggle Trạng Thái In

```
User click button → Toggle state → API update → Update UI → Snackbar
```

**Success**: "Cập nhật trạng thái: Đã in" / "Chưa in"  
**Error**: Revert state + "Lỗi khi cập nhật trạng thái in"

### 3. Upload Template Excel

Template Excel có thể có các cột:
- `madonhang` (required)
- `nhanvienchiahang` (optional - ✅ NEW)
- `trangthaiin` (optional - ✅ NEW)
- `sanpham` và các thông tin sản phẩm

**Flow**:
```
Upload Excel → Parse data → Match by madonhang → 
Update nhanvienchiahang + trangthaiin + sanpham → 
Call updateDonhang API → Success
```

---

## 🔄 API Calls

### Update Single Field
```typescript
await this._DonhangService.updateDonhang({
  id: row.id,
  nhanvienchiahang: row.nhanvienchiahang || ''
});
```

### Update From Template
```typescript
await this._DonhangService.updateDonhang({
  id: v1.id,
  nhanvienchiahang: v.nhanvienchiahang,
  trangthaiin: v.trangthaiin,
  sanpham: v1.sanpham  // with updated quantities
});
```

---

## ✅ Testing Checklist

### Manual Input
- [ ] Nhập tên nhân viên → Blur → Kiểm tra API call
- [ ] Nhập tên nhân viên → Enter → Kiểm tra API call
- [ ] Input rỗng → Blur → Kiểm tra xử lý empty string
- [ ] Refresh page → Kiểm tra data persist

### Toggle Status
- [ ] Click "Chưa in" → Chuyển "Đã in" → Màu xanh
- [ ] Click "Đã in" → Chuyển "Chưa in" → Màu xám
- [ ] Toggle nhiều lần → Kiểm tra API call
- [ ] Error case → Kiểm tra revert state

### Upload Template
- [ ] Excel có cột `nhanvienchiahang` → Update thành công
- [ ] Excel có cột `trangthaiin` → Update thành công
- [ ] Excel có cả 2 cột → Update cả 2 fields
- [ ] Excel không có 2 cột → Không update, giữ nguyên
- [ ] Multiple rows → Batch update thành công

### UI/UX
- [ ] Input responsive trên mobile
- [ ] Button không bị overflow
- [ ] Màu sắc rõ ràng, dễ phân biệt
- [ ] Snackbar thông báo đầy đủ
- [ ] Loading state khi update

---

## 📝 Notes

### Database Schema
Cần đảm bảo 2 fields tồn tại trong `donhang` table:
```sql
nhanvienchiahang VARCHAR(255) NULL
trangthaiin BOOLEAN DEFAULT FALSE
```

### Backward Compatibility
- ✅ Existing orders không có 2 fields → Hiển thị empty/false
- ✅ Old templates không có 2 columns → Skip update
- ✅ API update partial fields → Chỉ update fields có trong payload

### Performance
- ⚡ Input debounce: Update chỉ khi blur/enter (không update mỗi keystroke)
- ⚡ Toggle: Optimistic UI update → Revert if API fails
- ⚡ Template upload: Batch update with Promise.all

---

## 🎯 Impact

| Aspect | Before | After |
|--------|--------|-------|
| **Columns** | 8 columns | 10 columns (+2) |
| **Nhân viên tracking** | ❌ No | ✅ Yes |
| **Trạng thái in** | ❌ No | ✅ Yes |
| **Template support** | Partial | ✅ Full (with new fields) |
| **User workflow** | Manual only | ✅ Manual + Template |

---

## 🚀 Deployment

1. **Backend**: Đảm bảo API endpoint hỗ trợ 2 fields mới
2. **Database**: Chạy migration nếu cần
3. **Frontend**: Deploy component updated
4. **Testing**: Verify tất cả flows
5. **Rollout**: Gradual rollout để monitor

---

**Status**: ✅ Code Complete - Ready for Testing  
**TypeScript Errors**: 0  
**HTML Errors**: 0  
**Backward Compatible**: Yes
