# Hướng dẫn Quản lý Cron Jobs

## Tổng quan

Tính năng Quản lý Cron Jobs cho phép admin:
- Xem danh sách tất cả các tác vụ định kỳ (cron jobs)
- Kích hoạt thủ công các tác vụ khi cần
- Theo dõi lịch sử thực thi

## Truy cập

1. Đăng nhập vào hệ thống với tài khoản có quyền `admin.view`
2. Truy cập URL: `/admin/cron-management`

## Danh sách Cron Jobs

### 1. Đồng bộ Database
- **ID**: `database-sync`
- **Lịch chạy**: 7:00 sáng và 17:00 chiều (giờ VN)
- **Mô tả**: Đồng bộ dữ liệu từ hệ thống khác về database chính
- **Category**: Database

### 2. Tự động hoàn thành đơn hàng
- **ID**: `auto-complete-orders`
- **Lịch chạy**: 13:00 hàng ngày (giờ VN)
- **Mô tả**: Chuyển trạng thái đơn hàng từ "Đã giao" sang "Đã nhận"
- **Category**: Đơn hàng

### 3. Hoàn thành đơn theo ngày
- **ID**: `manual-auto-complete`
- **Lịch chạy**: Thủ công
- **Mô tả**: Chạy hoàn thành đơn hàng với ngày cụ thể
- **Category**: Đơn hàng
- **Tham số**: Cần chọn ngày trước khi chạy

## Cách sử dụng

### Xem danh sách jobs
- Danh sách jobs hiển thị theo nhóm (Database, Đơn hàng, System)
- Mỗi job hiển thị: tên, mô tả, lịch chạy, thời gian chạy tiếp theo

### Kích hoạt job thủ công
1. Tìm job cần chạy
2. Click nút **"Chạy ngay"**
3. Chờ job hoàn thành
4. Xem kết quả trong thông báo toast

### Với job "Hoàn thành đơn theo ngày"
1. Chọn ngày trong date picker
2. Click **"Chạy ngay"**

### Xem lịch sử thực thi
1. Click nút **"Xem logs"** ở header
2. Panel logs hiển thị ở dưới
3. Logs hiển thị: tên job, thời gian, trạng thái, thời lượng

## API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/cron-management/jobs` | Lấy danh sách cron jobs |
| POST | `/cron-management/trigger/database-sync` | Kích hoạt đồng bộ database |
| POST | `/cron-management/trigger/auto-complete-orders` | Kích hoạt hoàn thành đơn tự động |
| POST | `/cron-management/trigger/manual-auto-complete` | Hoàn thành đơn theo ngày |

## Thêm vào Menu

Để thêm tính năng vào sidebar menu:

1. Vào **Admin → Menu**
2. Tạo menu item mới:
   - **Tên**: Quản lý Cron Jobs
   - **Slug**: `cron-management`
   - **Icon**: ⏰ hoặc settings
   - **Parent**: Hệ thống (hoặc category phù hợp)
   - **Permission**: `admin.view`
3. Lưu và refresh trang

## Lưu ý

- Chỉ user có quyền `admin.view` mới truy cập được
- Không nên chạy đồng bộ database quá thường xuyên
- Job đang chạy sẽ hiển thị icon loading và không thể chạy lại
- Logs chỉ lưu trong session, sẽ mất khi refresh trang
