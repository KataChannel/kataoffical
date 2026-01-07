# HƯỚNG DẪN QUY TRÌNH MUA HÀNG VÀ THANH TOÁN NCC TRÊN HỆ THỐNG ERP

Dựa trên tài liệu **"QUY ĐỊNH VỀ QUY TRÌNH KIỂM SOÁT VÀ THANH TOÁN TRÊN HỆ THỐNG ERP"**, dưới đây là các bước thao tác chi tiết trên hệ thống hiện tại.

---

## Bước 1: KÊ TOÁN KHO - ORDER (Khởi tạo Đơn Mua Hàng)
**Mục tiêu:** Ghi nhận nhu cầu nhập hàng từ Nhà cung cấp (NCC).

1.  **Truy cập:** Menu `Quản trị` -> `Đơn đặt hàng` (Đường dẫn: `/admin/dathang`).
2.  **Thao tác:**
    *   Nhấn nút **Thêm mới** hoặc sử dụng tính năng **Import** từ Excel/Drive.
    *   Chọn **Nhà cung cấp** và **Kho nhận hàng**.
    *   Thêm danh sách sản phẩm, nhập **Số lượng dự kiến (SL Đặt)**.
    *   Nhấn **Lưu (Save)**.
3.  **Trạng thái hệ thống:** Đơn hàng ở trạng thái **MỚI** (Màu xanh dương).
    *   *Giai đoạn này dữ liệu được phép chỉnh sửa tự do.*

---

## Bước 2: KẾ TOÁN MUA HÀNG (Đối chiếu & Lập Đề xuất)
**Mục tiêu:** Chốt số liệu thực tế và chuẩn bị danh sách chi tiền.

### 2A. Đối chiếu Đơn hàng (Reconciliation)
1.  **Truy cập:** Chọn Đơn hàng vừa nhập ở Bước 1 trong danh sách Đơn đặt hàng.
2.  **Thao tác:**
    *   Nhấn nút **Đối chiếu PO** (Biểu tượng `fact_check` màu xanh Teal).
    *   Cập nhật **Số lượng thực nhận (SL Nhận)** và **Đơn giá cuối cùng (Giá nhập)** dựa trên thực tế kho nhận.
    *   Nhấn xác nhận đối chiếu.
3.  **Hệ quả:** Trạng thái chuyển sang **ĐÃ ĐỐI CHIẾU**. Hệ thống sẽ **tự động khóa** không cho sửa Số lượng và Giá.

### 2B. Lập Đề xuất thanh toán (Payment Proposal)
1.  **Truy cập:** Menu `Quản trị` -> `Công nợ NCC` (Đường dẫn: `/admin/congnoncc`).
2.  **Thao tác:**
    *   Lọc các hóa đơn ở trạng thái **Đã đối chiếu** (Mẫu màu xanh Teal).
    *   Tích chọn các đơn hàng muốn thanh toán.
    *   Nhấn nút **Lập đề xuất** (Biểu tượng `send` - Gửi duyệt).
3.  **Hệ quả:** Hệ thống tạo một mã Đề xuất mới (PP) ở trạng thái **ĐX MỚI**.

---

## Bước 3: QUẢN LÝ CẤP CAO (Phê duyệt Đề xuất)
**Mục tiêu:** Kiểm soát dòng tiền và cho phép giải ngân.

1.  **Truy cập:** Menu `Quản trị` -> `Đề xuất thanh toán` (Đường dẫn: `/admin/payment-proposal`).
2.  **Thao tác:**
    *   Mở chi tiết Đề xuất đang ở trạng thái **MỚI**.
    *   Kiểm tra danh sách NCC và tổng số tiền.
    *   **Duyệt:** Nhấn nút **Duyệt**. Trạng thái chuyển sang **CHỜ THANH TOÁN**.
    *   **Từ chối:** Nhấn nút **Từ chối** và **bắt buộc nhập lý do**. Trạng thái chuyển sang **KHÔNG DUYỆT**.
3.  **Hệ quả:** Khi được duyệt, tất cả PO liên quan bị **Khóa hoàn toàn** (Không cho phép sửa/xóa) và Thủ quỹ được quyền lập Phiếu chi.

---

## Bước 4: THỦ QUỸ (Thực hiện chi & Hoàn tất)
**Mục tiêu:** Xuất tiền và đồng bộ công nợ.

1.  **Truy cập:** Menu `Quản trị` -> `Phiếu thu chi` (Đường dẫn: `/admin/phieuthuchi`).
2.  **Thao tác:**
    *   Chọn các phiếu chi được tạo tự động từ Đề xuất ở trạng thái **CHỜ THANH TOÁN** (Hiển thị màu Vàng).
    *   Nhấn nút **Thanh toán**.
    *   **Nếu Chuyển khoản:** Bắt buộc phải nhấn vào biểu tượng đính kèm để **Tải ảnh Bill/Chuyển khoản**.
    *   Nhấn **Hoàn tất thanh toán**.
3.  **Hệ quả (Cập nhật tự động - Cascade Update):**
    *   Phiếu chi chuyển sang **ĐÃ THANH TOÁN** (Màu Xanh lá).
    *   Tất cả PO và Đề xuất liên quan tự động chuyển sang trạng thái "Đã thanh toán".
    *   **Số dư nợ Nhà cung cấp tự động giảm trừ** trên hệ thống.

---

## DANH SÁCH LỖI VÀ XỬ LÝ NHANH
*   **Không sửa được đơn hàng:** Kiểm tra xem trạng thái có phải là `ĐÃ ĐỐI CHIẾU` hoặc `CHỜ THANH TOÁN` không. Nếu có, phải hạ trạng thái về `MỚI` (nếu chưa nằm trong đề xuất).
*   **Không thấy PO trong danh sách lập Đề xuất:** Chỉ những PO đã hoàn thành bước **Đối chiếu** mới xuất hiện tại màn hình Công nợ NCC.
*   **Không lưu được Phiếu Chi:** Kiểm tra xem đã upload ảnh Bill chưa (đối với thanh toán chuyển khoản).

---
*Tài liệu này được soạn thảo dựa trên file quy trình PDF và cấu trúc ERP thực tế của hệ thống.*
