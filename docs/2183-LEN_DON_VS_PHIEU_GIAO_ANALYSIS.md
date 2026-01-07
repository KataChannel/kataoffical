# Phân tích Hệ thống Lên Đơn và Phiếu Giao Hàng

## 1. Tổng quan dữ liệu (Data Level)
Hai module **Lên Đơn** và **Phiếu Giao** thực chất là hai cách tiếp cận khác nhau trên cùng một thực thể dữ liệu trong hệ thống.

*   **Model chung**: Cả hai sử dụng model `Donhang` và `Donhangsanpham` trong Prisma schema.
*   **Service chung**: Đều sử dụng `DonhangService` ở Frontend để giao tiếp với API.
*   **Cấu trúc bảng `Donhangsanpham`**: Đã được thiết kế sẵn để lưu trữ vòng đời của một đơn hàng thông qua các trường:
    *   `sldat`: Số lượng khách đặt ban đầu (Sales context).
    *   `slgiao`: Số lượng thực tế kho đóng gói/xuất xưởng (Logistics context).
    *   `slnhan`: Số lượng khách hàng thực nhận sau đối soát (Accounting/Audit context).

## 2. So sánh chi tiết

| Đặc điểm | Lên Đơn (Order Entry) | Phiếu Giao (Delivery Note) |
| :--- | :--- | :--- |
| **Mục đích chính** | Thiết lập thỏa thuận thương mại. | Ghi nhận luồng vận chuyển hàng hóa thực tế. |
| **Đối tượng sử dụng** | Nhân viên Kinh doanh, Admin. | Thủ kho, Shipper, Kế toán kho. |
| **Trọng tâm UI** | Tìm kiếm sản phẩm, áp dụng bảng giá, chọn khách hàng. | Chỉnh sửa số lượng thực giao, ghi chú trạng thái nhận hàng. |
| **Quy tắc tính toán** | `Tổng dự kiến = sldat * giaban` | `Tổng thực tế = slgiao * giaban` hoặc `slnhan * giaban` |
| **Trạng thái (Status)** | Thường ở trạng thái `Mới` hoặc `Đã đặt`. | Thường ở trạng thái `Đang giao`, `Đã nhận`. |

## 3. Tại sao hệ thống tách biệt hai Module?

Việc tách biệt giao diện mặc dù dùng chung dữ liệu mang lại các lợi ích sau:

1.  **Chuyên môn hóa giao diện (UX Optimization)**:
    *   Màn hình **Lên Đơn** cần hiển thị các công cụ bổ trợ cho bán lẻ/sỉ (Lịch sử giá, tồn kho dự kiến).
    *   Màn hình **Phiếu Giao** cần tối ưu cho việc kiểm đếm nhanh (Fast entry), hiển thị thông tin vận chuyển.
2.  **Bảo mật và Phân quyền (Security)**:
    *   Shipper chỉ cần quyền sửa `slnhan` (Số lượng thực nhận) mà không được phép sửa `giaban` (Giá bán) hoặc xóa sản phẩm khỏi đơn gốc.
3.  **Quản lý Thất thoát (Loss Management)**:
    *   Duy trì cả `sldat` và `slgiao` giúp hệ thống báo cáo được tỷ lệ đáp ứng đơn hàng và các sai lệch giữa đơn hàng lý thuyết và thực tế giao vận.

## 4. Đánh giá và Đề xuất

### Có nên gộp lại không?
**Không nên gộp hoàn toàn.** Việc gộp lại sẽ làm màn hình chi tiết trở nên quá tải thông tin (quá nhiều cột số lượng) và khó phân quyền chặt chẽ cho các bộ phận khác nhau.

### Hướng tối ưu hóa
Thay vì gộp, có thể cải thiện sự liên kết giữa hai module:
1.  **Workflow Switching**: Trong màn hình chi tiết Đơn hàng, thêm nút chuyển đổi nhanh (Toggle) giữa "Chế độ Kinh doanh" và "Chế độ Giao nhận" để người quản lý tổng thể dễ dàng xem cả hai mà không cần đổi trang.
2.  **Audit Trail Clear**: Hiển thị rõ ràng ai là người cập nhật `sldat` và ai là người xác nhận `slgiao`/`slnhan` để tăng tính minh bạch.
3.  **Tự động hóa**: Khi đơn hàng chuyển sang trạng thái "Đã nhận", tự động khóa các cột `sldat` và `giaban` để bảo vệ dữ liệu kế toán.

---
*Báo cáo được khởi tạo ngày: 07/01/2026*
*Người thực hiện: Antigravity AI Assistant*
