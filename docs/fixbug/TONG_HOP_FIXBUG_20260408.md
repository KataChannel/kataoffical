# Tổng hợp Nội dung Fix Bug & Nâng cấp Hệ thống (08/04/2026)

Dựa trên các tài liệu quét tay ngày 08/04/2026, dưới đây là tổng hợp các yêu cầu về thay đổi logic, giao diện và quy trình quản lý kho/siêu thị.

## I. Phân hệ Siêu thị (Supermarket Module)

### 1. Cấu trúc Menu & Form
*   **Menu mới:** Triển khai thêm menu dành riêng cho bộ phận Siêu thị.
*   **Hàng Siêu thị:** Thực hiện thay đổi/đổi mới Form (Đổi form hàng siêu thị) để phù hợp với quy trình mới.

### 2. Logic Tính toán Hao hụt
Quản lý tồn kho tại siêu thị dựa trên 3 chỉ số chính:
*   **(1) Tồn Kho ST:** Số lượng hàng được chuyển từ kho tổng về.
*   **(2) Tồn Thực tế ST:** Cập nhật thông qua việc upload file Excel sau khi đã sơ chế.
*   **(3) Hàng Hủy:** Cập nhật thông qua việc upload file Excel sau khi đã sơ chế.

**Công thức tính toán:**
> **Hao Hụt = (1) - [(2) + (3)]**

---

## II. Phân hệ Quản lý Kho (Warehouse Management)

### 1. Quy trình Phiếu Kho (Chuyển kho)
*   **Loại phiếu:** Tạo mới phiếu với loại **"Chuyển Kho"**.
*   **Thông tin phiếu:** Phải bao gồm Ngày tháng và có Mã phiếu để theo dõi.
*   **Luồng luân chuyển:**
    *   **Từ (Kho Đi):** Hệ thống tự động đẩy trả số lượng đã chuyển (Logic tự động).
    *   **Đến (Kho Nhận):** Cập nhật trực tiếp vào Tồn kho Siêu thị.
*   **Giao diện nhập liệu:** Sử dụng giao diện tương tự như "Giao diện lên đơn" để chọn sản phẩm và nhập số lượng.

### 2. Chốt Kho & Hệ thống Snapshot
*   **Menu Chốt kho:** Hiển thị menu chức năng chốt kho trên giao diện.
*   **Snapshot dữ liệu:** Hệ thống phải thực hiện Snapshot và hiển thị trạng thái chốt kho ngay tại thời điểm người dùng thực hiện Up file.
*   **Triển khai:** Hoàn thiện logic và giao diện kho để đưa vào vận hành chính thức.

---

## III. Xử lý Dữ liệu & Excel

*   **Logic Cập nhật:** Chốt quy trình cập nhật Tồn kho và Hàng hủy, sau đó thực hiện chuyển ngược dữ liệu về Tồn kho tổng.
*   **Cấu trúc File:** Chuyển đổi dữ liệu từ cấu trúc `Sheet tổng` sang cấu trúc `Sheet order`.
*   **Trình bày & Xác nhận:**
    *   Tạo bảng tổng hợp dữ liệu để phục vụ bước xác nhận cuối cùng.
    *   Yêu cầu kẻ ô (Border) cho toàn bộ vùng dữ liệu để đảm bảo tính thẩm mỹ và dễ đọc.
*   **Ghi chú bổ sung:** Rà soát lại phần ghi chú để loại bỏ các bước thanh toán/thao tác thừa không cần thiết.

---
*Tài liệu này được tổng hợp từ dữ liệu quét tay: `Đã quét_20260408-1226.pdf` và `Đã quét_20260408-1433.pdf`.*
