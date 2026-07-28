# Hướng dẫn sử dụng tính năng Xuất Excel trong AuditLog

## 📊 Tính năng Xuất Excel

Tính năng xuất Excel cho phép bạn xuất dữ liệu audit log ra file Excel với các tùy chọn linh hoạt.

### 🎯 Các tính năng chính:

1. **Xuất trang hiện tại**: Xuất dữ liệu đang hiển thị trên trang hiện tại
2. **Xuất tất cả**: Xuất toàn bộ dữ liệu theo bộ lọc hiện tại

### 📋 Cột dữ liệu được xuất:

| Tên Cột | Mô tả |
|---------|-------|
| STT | Số thứ tự |
| Module | Tên module/entity (entityName) |
| ID Đối Tượng | ID của đối tượng bị thay đổi |
| Hành Động | Loại hành động (CREATE, UPDATE, DELETE, etc.) |
| Trạng Thái | Trạng thái thực thi (SUCCESS, ERROR, WARNING) |
| Người Dùng | Email người dùng |
| SĐT | Số điện thoại người dùng |
| Địa Chỉ IP | IP address của request |
| User Agent | Thông tin browser/client |
| Session ID | ID của session |
| Các Trường Thay Đổi | Danh sách các field bị thay đổi |
| Giá Trị Cũ | Giá trị trước khi thay đổi (JSON) |
| Giá Trị Mới | Giá trị sau khi thay đổi (JSON) |
| Chi Tiết Lỗi | Thông tin lỗi nếu có (JSON) |
| Metadata | Dữ liệu bổ sung (JSON) |
| Ngày Tạo | Thời gian tạo log (HH:mm:ss dd/MM/yyyy) |
| Ngày Cập Nhật | Thời gian cập nhật (HH:mm:ss dd/MM/yyyy) |

### 🔧 Cách sử dụng:

#### 1. Xuất trang hiện tại
```
1. Nhấn vào icon "file_download" (màu accent)
2. Chọn "Xuất trang hiện tại (X bản ghi)"
3. File Excel sẽ được tải xuống tự động
```

**Tên file mẫu:** `AuditLog_Trang1_2025-11-05.xlsx`

#### 2. Xuất tất cả
```
1. Nhấn vào icon "file_download" (màu accent)
2. Chọn "Xuất tất cả (X bản ghi)"
3. Hệ thống sẽ tải toàn bộ dữ liệu theo bộ lọc
4. File Excel sẽ được tải xuống tự động
```

**Tên file mẫu:** `AuditLog_ToanBo_2025-11-05.xlsx`

#### 3. Xuất với bộ lọc
```
1. Nhập các điều kiện tìm kiếm:
   - Module: "sanpham"
   - Hành động: "CREATE"
   - Từ ngày: "2025-10-27"
   - Đến ngày: "2025-10-28"
2. Nhấn nút "Tìm kiếm"
3. Nhấn icon "file_download"
4. Chọn "Xuất tất cả" hoặc "Xuất trang hiện tại"
```

**Tên file mẫu:** `AuditLog_ToanBo_sanpham_CREATE_2025-10-27_2025-10-28_2025-11-05.xlsx`

### 📝 Quy tắc đặt tên file:

Format: `AuditLog_[Loại]_[Module]_[Action]_[DateRange]_[ExportDate].xlsx`

- **Loại**: `ToanBo` hoặc `TrangX` (X là số trang)
- **Module**: Tên module nếu có bộ lọc
- **Action**: Tên action nếu có bộ lọc
- **DateRange**: Khoảng ngày nếu có bộ lọc (format: YYYY-MM-DD_YYYY-MM-DD)
- **ExportDate**: Ngày xuất file (format: YYYY-MM-DD)

### 🚀 Ví dụ thực tế:

#### Ví dụ 1: Xuất tất cả log của module "donhang"
```
1. Nhập "donhang" vào ô "Tìm kiếm module..."
2. Nhấn nút "Tìm kiếm"
3. Nhấn icon "file_download" → "Xuất tất cả"
```
➡️ File: `AuditLog_ToanBo_donhang_2025-11-05.xlsx`

#### Ví dụ 2: Xuất log CREATE của tháng 10
```
1. Nhập "CREATE" vào ô "Tìm kiếm hành động..."
2. Chọn "Từ ngày": 2025-10-01
3. Chọn "Đến ngày": 2025-10-31
4. Nhấn nút "Tìm kiếm"
5. Nhấn icon "file_download" → "Xuất tất cả"
```
➡️ File: `AuditLog_ToanBo_CREATE_2025-10-01_2025-10-31_2025-11-05.xlsx`

#### Ví dụ 3: Xuất trang hiện tại
```
1. Nhấn icon "file_download" → "Xuất trang hiện tại"
```
➡️ File: `AuditLog_Trang1_2025-11-05.xlsx`

### ⚠️ Lưu ý:

1. **Nút xuất Excel bị disable** khi không có dữ liệu
2. **Xuất tất cả** sẽ gọi API để lấy toàn bộ dữ liệu (có thể mất thời gian nếu nhiều records)
3. **Xuất trang hiện tại** chỉ xuất dữ liệu đang hiển thị trên màn hình
4. Dữ liệu JSON (oldValues, newValues, metadata) sẽ được stringify
5. Định dạng ngày giờ: `HH:mm:ss dd/MM/yyyy` (ví dụ: 14:30:25 05/11/2025)

### 🎨 Giao diện:

- **Icon**: `file_download` (màu accent - thường là màu hồng/tím)
- **Menu**: Click vào icon sẽ hiện menu với 2 options
- **Tooltip**: "Xuất Excel"
- **Disabled state**: Nút bị mờ khi không có dữ liệu

### 🔄 Luồng xử lý:

```
User clicks export button
    ↓
Select export type (current/all)
    ↓
[If ALL]
    ↓
Show loading indicator
    ↓
Fetch all data from API with filters
    ↓
[If CURRENT]
    ↓
Use current page data
    ↓
Format data for Excel
    ↓
Generate filename with filters
    ↓
Download Excel file
    ↓
Show success notification
```

### 🛠️ Technical Details:

**Dependencies:**
- `writeExcelFile()` từ `shared/utils/exceldrive.utils`
- `StorageService` để lấy authentication token
- `environment.APIURL` để call API

**API Endpoint:**
```
POST /auditlog/findby
Headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <token>'
}
Body: {
  ...filters,
  page: 1,
  pageSize: total
}
```

### ✅ Testing:

1. Test xuất trang trống
2. Test xuất trang có dữ liệu
3. Test xuất với filters
4. Test xuất tất cả với số lượng lớn
5. Test tên file được generate đúng
6. Test format dữ liệu trong Excel
7. Test error handling khi API fail

---

**Version:** 1.0.0  
**Last Updated:** 2025-11-05  
**Author:** AuditLog Team
