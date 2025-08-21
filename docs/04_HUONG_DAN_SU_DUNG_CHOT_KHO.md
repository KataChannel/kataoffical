# 📋 HƯỚNG DẪN SỬ DỤNG NGHIỆP VỤ CHỐT KHO

## 🎯 Tổng quan nghiệp vụ Chốt Kho

Chốt kho là quy trình quan trọng trong quản lý tồn kho, giúp:
- Xác định chính xác số lượng hàng tồn kho tại một thời điểm
- Đối chiếu số liệu thực tế với số liệu hệ thống
- Tạo báo cáo tồn kho chính thức cho kế toán
- Phát hiện chênh lệch và điều chỉnh kịp thời

## 🚀 Truy cập chức năng

### Đường dẫn truy cập:
```
Admin Panel → Quản lý Kho → Chốt Kho
URL: /admin/chotkho
```

### Quyền truy cập:
- Quản lý kho
- Kế toán kho
- Quản trị viên

## 📊 Giao diện chính - Danh sách Chốt Kho

### Các cột hiển thị:
- **STT (#)**: Số thứ tự
- **Code**: Mã chốt kho (tự động tạo)
- **Tiêu đề**: Tên đợt chốt kho
- **Mô tả**: Mô tả chi tiết
- **Trạng thái**: Trạng thái hiện tại
- **Thứ tự**: Thứ tự sắp xếp
- **Ngày tạo**: Thời gian tạo phiếu

### Chức năng tìm kiếm và lọc:
```typescript
// Tìm kiếm theo từ khóa
searchParam = {
  keyword: 'string',     // Tìm theo tên, mã
  status: 'string',      // Lọc theo trạng thái
  dateFrom: 'date',      // Từ ngày
  dateTo: 'date'         // Đến ngày
}
```

### Tùy chỉnh hiển thị cột:
```typescript
// Cấu hình cột hiển thị
ColumnName = {
  stt: '#',
  codeId: 'Code',
  title: 'Tiêu Đề',
  description: 'Mô Tả',
  status: 'Trạng Thái',
  order: 'Thứ Tự',
  createdAt: 'Ngày Tạo'
};

// Ẩn/hiện cột theo nhu cầu
toggleColumn(item: any): void {
  const column = this.FilterColumns.find((v) => v.key === item.key);
  if (column) {
    column.isShow = !column.isShow;
  }
}
```

## ➕ Tạo mới Chốt Kho

### Bước 1: Nhấn nút "Tạo mới"
```typescript
create(): void {
  this.drawer.open();
  this._router.navigate(['admin/chotkho', 'new']);
}
```

### Bước 2: Điền thông tin cơ bản
```json
{
  "title": "Chốt kho tháng 12/2024",
  "description": "Chốt kho cuối năm, kiểm tra toàn bộ hàng tồn",
  "status": "draft",
  "ngayChot": "2024-12-31"
}
```

### Bước 3: Chọn sản phẩm cần chốt
- Tất cả sản phẩm (mặc định)
- Theo danh mục
- Theo kho cụ thể
- Chọn từng sản phẩm

### Bước 4: Xác nhận và lưu

## 📝 Quy trình Chốt Kho chi tiết

### Giai đoạn 1: Chuẩn bị (Draft)
```
- Tạo phiếu chốt kho
- Chọn sản phẩm cần kiểm tra
- Phân công nhân viên kiểm kho
```

### Giai đoạn 2: Kiểm kho (In Progress)
```
- In phiếu kiểm kho
- Nhân viên kiểm đếm thực tế
- Nhập số liệu thực tế vào hệ thống
```

### Giai đoạn 3: Đối chiếu (Review)
```
- So sánh số liệu thực tế vs hệ thống
- Xác định chênh lệch
- Điều tra nguyên nhân chênh lệch
```

### Giai đoạn 4: Hoàn thiện (Completed)
```
- Điều chỉnh tồn kho
- Tạo báo cáo chính thức
- Lưu trữ hồ sơ
```

## 🔧 Các chức năng chính

### 1. Quản lý danh sách
```typescript
// Xem chi tiết chốt kho
goToDetail(item: any): void {
  this.drawer.open();
  this._ChotkhoService.setChotkhoId(item.id);
  this._router.navigate(['admin/chotkho', item.id]);
}

// Chọn nhiều item để xử lý
AddToEdit(item: any): void {
  const existingItem = this.EditList.find((v: any) => v.id === item.id);
  if (existingItem) {
    this.EditList = this.EditList.filter((v: any) => v.id !== item.id);
  } else {
    this.EditList.push(item);
  }
}
```

### 2. Xử lý hàng loạt
```typescript
// Xóa nhiều chốt kho cùng lúc
DeleteListItem(): void {
  this.EditList.forEach((item: any) => {
    this._ChotkhoService.DeleteChotkho(item);
  });
  this.EditList = [];
  this._snackBar.open('Xóa Thành Công', '', {
    duration: 1000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: ['snackbar-success'],
  });
}
```

### 3. Phân trang và sắp xếp
```typescript
// Điều khiển phân trang
onPageSizeChange(size: number, menuHienthi: any) {
  if (size > this.total()) {
    this._snackBar.open(`Số lượng tối đa ${this.total()}`, '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
    size = this.total();
  }
  this._ChotkhoService.page.set(1);
  this._ChotkhoService.getAllChotkho(this.searchParam);
  menuHienthi.closeMenu();
}

// Chuyển trang
onPreviousPage(): void {
  if (this.page() > 1) {
    this._ChotkhoService.page.set(this.page() - 1);
    this._ChotkhoService.getAllChotkho(this.searchParam);
  }
}

onNextPage(): void {
  if (this.page() < this.totalPages()) {
    this._ChotkhoService.page.set(this.page() + 1);
    this._ChotkhoService.getAllChotkho(this.searchParam);
  }
}
```

### 4. Tìm kiếm và lọc dữ liệu
```typescript
// Tìm kiếm real-time với debounce
@Debounce(500)
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

// Lọc theo cột
onOutFilter(event: any) {
  this.dataSource.data = event;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}
```

## 📋 Dữ liệu Demo

### Demo 1: Chốt kho hàng ngày
```json
{
  "id": "CK001",
  "codeId": "CK-2024-001",
  "title": "Chốt kho ngày 25/12/2024",
  "description": "Kiểm kho hàng ngày - ca sáng",
  "status": "completed",
  "ngayChot": "2024-12-25T08:00:00Z",
  "soLuongSanPham": 150,
  "tongGiaTri": 2500000,
  "chenhLech": -50000,
  "order": 1,
  "createdAt": "2024-12-25T07:30:00Z"
}
```

### Demo 2: Chốt kho định kỳ
```json
{
  "id": "CK002", 
  "codeId": "CK-2024-002",
  "title": "Chốt kho tuần 51/2024",
  "description": "Kiểm kho định kỳ hàng tuần - kho chính",
  "status": "in_progress",
  "ngayChot": "2024-12-22T00:00:00Z",
  "soLuongSanPham": 850,
  "tongGiaTri": 15600000,
  "chenhLech": 0,
  "order": 2,
  "createdAt": "2024-12-22T09:00:00Z"
}
```

### Demo 3: Chốt kho cuối tháng
```json
{
  "id": "CK003",
  "codeId": "CK-2024-003", 
  "title": "Chốt kho tháng 12/2024",
  "description": "Chốt kho cuối tháng - toàn bộ chi nhánh",
  "status": "review",
  "ngayChot": "2024-12-31T23:59:59Z",
  "soLuongSanPham": 2150,
  "tongGiaTri": 45800000,
  "chenhLech": 150000,
  "order": 3,
  "createdAt": "2024-12-31T10:00:00Z"
}
```

## 🎮 Script tạo dữ liệu Demo

```sql
-- Tạo dữ liệu demo cho bảng ChotKho
INSERT INTO "ChotKho" (
    id, "codeId", title, description, status, "ngayChot", 
    "soLuongSanPham", "tongGiaTri", "chenhLech", "order", 
    "createdAt", "updatedAt"
) VALUES 
-- Chốt kho hàng ngày
('ck-demo-001', 'CK-2024-001', 'Chốt kho ngày 25/12/2024', 
 'Kiểm kho hàng ngày - ca sáng', 'completed', 
 '2024-12-25 08:00:00', 150, 2500000, -50000, 1,
 '2024-12-25 07:30:00', '2024-12-25 09:00:00'),

-- Chốt kho định kỳ
('ck-demo-002', 'CK-2024-002', 'Chốt kho tuần 51/2024',
 'Kiểm kho định kỳ hàng tuần - kho chính', 'in_progress',
 '2024-12-22 00:00:00', 850, 15600000, 0, 2,
 '2024-12-22 09:00:00', '2024-12-22 09:30:00'),

-- Chốt kho cuối tháng  
('ck-demo-003', 'CK-2024-003', 'Chốt kho tháng 12/2024',
 'Chốt kho cuối tháng - toàn bộ chi nhánh', 'review',
 '2024-12-31 23:59:59', 2150, 45800000, 150000, 3,
 '2024-12-31 10:00:00', '2024-12-31 11:00:00'),

-- Chốt kho quý
('ck-demo-004', 'CK-2024-004', 'Chốt kho quý IV/2024',
 'Chốt kho cuối quý - kiểm tra toàn diện', 'draft',
 '2024-12-31 23:59:59', 3200, 78500000, 0, 4,
 '2024-12-30 14:00:00', '2024-12-30 14:00:00'),

-- Chốt kho đột xuất
('ck-demo-005', 'CK-2024-005', 'Chốt kho đột xuất - Audit',
 'Kiểm tra đột xuất theo yêu cầu ban giám đốc', 'cancelled',
 '2024-12-20 16:00:00', 500, 8900000, -200000, 5,
 '2024-12-20 15:00:00', '2024-12-20 17:00:00');
```

## 📊 Chi tiết sản phẩm trong chốt kho

```sql
-- Tạo chi tiết chốt kho cho từng sản phẩm
INSERT INTO "ChotKhoSanpham" (
    id, "chotKhoId", "sanphamId", "slHeThong", "slThucTe", 
    "chenhLech", "giaTri", "ghiChu", "nguoiKiem", 
    "createdAt", "updatedAt"
) VALUES
-- Chi tiết cho CK-2024-001
('cksp-001', 'ck-demo-001', 'sp-001', 100, 98, -2, 196000, 'Thiếu 2 sp do hỏng', 'NV001', 
 '2024-12-25 08:30:00', '2024-12-25 08:30:00'),
('cksp-002', 'ck-demo-001', 'sp-002', 50, 52, 2, 104000, 'Thừa 2 sp', 'NV001',
 '2024-12-25 08:35:00', '2024-12-25 08:35:00'),

-- Chi tiết cho CK-2024-002  
('cksp-003', 'ck-demo-002', 'sp-001', 300, 300, 0, 588000, 'Khớp', 'NV002',
 '2024-12-22 10:00:00', '2024-12-22 10:00:00'),
('cksp-004', 'ck-demo-002', 'sp-003', 200, 195, -5, 390000, 'Thiếu 5 sp', 'NV002',
 '2024-12-22 10:15:00', '2024-12-22 10:15:00');
```

## 🎯 Các tình huống sử dụng thực tế

### Tình huống 1: Chốt kho cuối ngày
```
Mục đích: Kiểm tra tồn kho sau một ngày hoạt động
Tần suất: Hàng ngày
Thời gian: 30 phút
Người thực hiện: Nhân viên kho
```

### Tình huống 2: Chốt kho định kỳ  
```
Mục đích: Kiểm tra định kỳ theo quy định
Tần suất: Hàng tuần/tháng
Thời gian: 2-4 giờ
Người thực hiện: Tổ kiểm kho
```

### Tình huống 3: Chốt kho đột xuất
```
Mục đích: Kiểm tra khi có nghi ngờ sai lệch
Tần suất: Theo yêu cầu
Thời gian: 1-2 ngày
Người thực hiện: Ban kiểm soát
```

## 🔍 Hướng dẫn xử lý chênh lệch

### Bước 1: Phát hiện chênh lệch
```typescript
if (slThucTe !== slHeThong) {
  chenhLech = slThucTe - slHeThong;
  status = 'requires_review';
}
```

### Bước 2: Điều tra nguyên nhân
```
✅ Kiểm tra lại số đếm
✅ Xem lại phiếu xuất/nhập gần nhất  
✅ Kiểm tra hàng hỏng/mất
✅ Xác minh với nhân viên liên quan
```

### Bước 3: Xử lý điều chỉnh
```
📝 Lập biên bản chênh lệch
💾 Cập nhật tồn kho trong hệ thống
📊 Ghi nhận vào báo cáo
🔄 Thông báo cho các bộ phận liên quan
```

## 🎨 Tính năng giao diện

### 1. Responsive Design
```typescript
private setupDrawer(): void {
  this._breakpointObserver
    .observe([Breakpoints.Handset])
    .subscribe((result) => {
      if (result.matches) {
        this.drawer.mode = 'over';
      } else {
        this.drawer.mode = 'over';
      }
    });
}
```

### 2. Tùy chỉnh cột hiển thị
```typescript
// Ẩn/hiện cột theo nhu cầu
updateDisplayedColumns(): void {
  this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
  this.ColumnName = this.FilterColumns.reduce((obj, item) => {
    if (item.isShow) obj[item.key] = item.value;
    return obj;
  }, {} as Record<string, string>);
  localStorage.setItem('ChotkhoColFilter', JSON.stringify(this.FilterColumns));
}
```

### 3. Thông báo và feedback
```typescript
// Hiển thị thông báo thành công
this._snackBar.open('Xóa Thành Công', '', {
  duration: 1000,
  horizontalPosition: 'end',
  verticalPosition: 'top',
  panelClass: ['snackbar-success'],
});
```

## 💡 Mẹo sử dụng hiệu quả

### 1. Chuẩn bị trước chốt kho
```
☑️ Dừng hoạt động xuất/nhập kho
☑️ Sắp xếp hàng hóa gọn gàng
☑️ Chuẩn bị phiếu kiểm và bút
☑️ Phân công nhân viên rõ ràng
```

### 2. Trong quá trình chốt
```
☑️ Kiểm đếm từng sản phẩm cẩn thận
☑️ Ghi chép ngay kết quả
☑️ Báo cáo chênh lệch lớn ngay lập tức
☑️ Chụp ảnh minh chứng nếu cần
```

### 3. Sau khi chốt kho
```
☑️ Đối chiếu với hệ thống ngay
☑️ Xử lý chênh lệch trong 24h
☑️ Lưu trữ hồ sơ đầy đủ
☑️ Rút kinh nghiệm để cải thiện
```

### 4. Tối ưu hiệu suất
```typescript
// Sử dụng trackBy để tối ưu rendering
trackByFn(index: number, item: any): any {
  return item.id;
}

// Sử dụng memoization cho tính toán phức tạp
@memoize()
FilterHederColumn(list: any, column: any) {
  const uniqueList = list.filter((obj: any, index: number, self: any) => 
    index === self.findIndex((t: any) => t[column] === obj[column])
  );
  return uniqueList;
}
```

## ⚠️ Lưu ý quan trọng

### Quyền hạn
```
- Chỉ người có quyền mới được tạo/sửa chốt kho
- Phải có ít nhất 2 người xác nhận kết quả
- Không được chỉnh sửa sau khi hoàn thành
```

### Bảo mật
```
- Dữ liệu chốt kho được backup tự động
- Lịch sử thay đổi được ghi nhận đầy đủ  
- Chỉ admin mới xóa được dữ liệu
```

### Hiệu suất
```
- Nên chốt kho vào thời gian ít hoạt động
- Chia nhỏ khu vực để chốt nhanh hơn
- Sử dụng mã vạch để giảm sai sót
- Tận dụng tính năng real-time update
```

## 🔧 Troubleshooting

### Lỗi thường gặp

**1. Không load được danh sách chốt kho:**
```typescript
// Kiểm tra kết nối service
await this._ChotkhoService.getAllChotkho(this.searchParam);
```

**2. Phân trang không hoạt động:**
```typescript
// Đảm bảo paginator được khởi tạo đúng
if (this.paginator) {
  this.paginator.pageIndex = this.page() - 1;
  this.paginator.pageSize = this.pageSize();
  this.paginator.length = this.total();
}
```

**3. Tìm kiếm không chính xác:**
```typescript
// Kiểm tra debounce và filter
@Debounce(500)
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
```

## 📞 Hỗ trợ

**Liên hệ hỗ trợ kỹ thuật:**
- Email: support@company.com
- Phone: (024) 1234-5678
- Thời gian: 8:00 - 17:00 (T2-T6)

**Hướng dẫn video:** [Link to training videos]

**Tài liệu tham khảo:** [Link to documentation]

---

*Tài liệu này được cập nhật lần cuối: 25/12/2024*
*Phiên bản: 1.0.0*