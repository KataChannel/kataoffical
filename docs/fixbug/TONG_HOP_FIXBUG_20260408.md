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
*   **(4) Số lượng Bán:** Dữ liệu bán hàng thực tế (Cột K) trong ngày.

**Công thức tính toán:**
> **Hao Hụt = (1) - [(2) + (3) + (4)]**

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

### 1. Logic Cập nhật Chênh lệch
*   Chốt quy trình cập nhật Tồn kho và Hàng hủy, sau đó thực hiện chuyển ngược dữ liệu về Tồn kho tổng.

### 2. Cấu trúc File & Snapshot
*   Chuyển đổi dữ liệu từ cấu trúc `Sheet tổng` sang cấu trúc `Sheet order`.

### 3. Trình bày & Xác nhận Đối soát
*   Tạo bảng tổng hợp dữ liệu để phục vụ bước xác nhận cuối cùng.
*   Yêu cầu kẻ ô (Border) cho toàn bộ vùng dữ liệu để đảm bảo tính thẩm mỹ và dễ đọc.

### 4. Ghi chú & Rà soát
*   Rà soát lại phần ghi chú để loại bỏ các bước thanh toán/thao tác thừa không cần thiết.

---

## IV. Danh mục Sản phẩm Trọng điểm (Audit List)

Để đảm bảo tính chính xác, 11 mã sản phẩm dưới đây đã được đưa vào danh sách theo dõi Trace Log và đối soát dữ liệu hàng ngày:

1.  **I100233:** Trứng gà
2.  **I100479:** Dưa hấu
3.  **I100207:** Xà lách lolo xanh
4.  **I100003:** Bắp cải trắng
5.  **I100002:** Bắp cải tím
6.  **I100164:** Ớt đà lạt (đỏ)
7.  **I100165:** Ớt đà lạt (vàng)
8.  **I100166:** Ớt đà lạt (xanh)
9.  **I100004:** Bắp chuối bào
10. **I100256:** Bún nhỏ
11. **I100113:** Húng lũi

---
*Tài liệu này được tổng hợp từ dữ liệu quét tay: `Đã quét_20260408-1226.pdf` và `Đã quét_20260408-1433.pdf`.*
