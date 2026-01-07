# 📑 PHÂN TÍCH NGHIỆP VỤ & TÍNH NĂNG: MUA HÀNG - ĐỀ XUẤT - THANH TOÁN (ERP)

Tài liệu này chi tiết hóa quy trình kiểm soát dòng tiền mua hàng, từ khâu nhận hàng đến khi hoàn tất thanh toán, đảm bảo tính chặt chẽ và minh bạch trong kế toán.

---

## 1. VÒNG ĐỜI & TRẠNG THÁI THỰC THỂ

### 1.1. Đơn Mua Hàng NCC (Purchase Order - PO)
*Mã hiệu model: `Dathang`*

| Trạng thái | Ý nghĩa & Hành động |
| :--- | :--- |
| **ĐƠN MỚI** | Vừa tạo, thông tin dự kiến từ NCC. |
| **ĐÃ ĐỐI CHIẾU** | **Quan trọng:** Kế toán/Kho cập nhật lại **Số lượng thực nhận** và **Đơn giá thực tế**. Đây là con số cuối cùng để tính công nợ. |
| **CHỜ THANH TOÁN** | Đơn đã được đưa vào một *Đề xuất thanh toán* đã được duyệt. |
| **ĐÃ THANH TOÁN** | Tiền đã thực chi từ quỹ/ngân hàng, công nợ đơn hàng bằng 0. |

### 1.2. Đề Xuất Thanh Toán (Payment Proposal - PP)
*Thực thể mới dùng để gom nhiều đơn hàng/NCC để trình duyệt.*

*   **Luồng A (Thành công):** `ĐX MỚI` → `DUYỆT` → `CHỜ THANH TOÁN` → `ĐÃ THANH TOÁN`.
*   **Luồng B (Từ chối):** `ĐX MỚI` → `KHÔNG DUYỆT` (Bắt buộc nhập lý do/comment).

> **Logic:** 1 Đề xuất (Master) chứa nhiều NCC. Mỗi NCC trong đề xuất đó có trạng thái riêng. Trạng thái Master chỉ chuyển sang `ĐÃ THANH TOÁN` khi toàn bộ các NCC bên trong đã hoàn tất phiếu chi.

### 1.3. Phiếu Chi (Payment Voucher - PV)
*Mã hiệu model: `PhieuThuChi` (Loai: CHI)*

*   **Bộ lọc mặc định:** Hiển thị theo tháng hiện tại, cho phép tùy chỉnh khoảng ngày (`fromDate` - `toDate`).
*   **Nguồn dữ liệu:** Chỉ hiển thị các dòng NCC từ Đề xuất thanh toán có trạng thái `CHỜ THANH TOÁN`.
*   **Ràng buộc:** 1 Đề xuất → Tách thành N Phiếu chi (1 Phiếu chi tương ứng duy nhất 1 NCC).
*   **Hành động bắt buộc:** Khi chọn hình thức *Chuyển khoản*, hệ thống bắt buộc nhân viên phải **Upload Bill (hình ảnh chứng từ)** trước khi cho phép bấm nút `ĐÃ THANH TOÁN`.

---

## 2. LUỒNG ĐIỀU HƯỚNG DỮ LIỆU (DATA FLOW)

1.  **Bước 1 (Kho/Kế toán):** Chốt đơn mua hàng (`PO`) -> Chuyển sang `ĐÃ ĐỐI CHIẾU`.
2.  **Bước 2 (Kế toán tổng hợp):** Chọn các đơn `ĐÃ ĐỐI CHIẾU` -> Tạo `Đề xuất thanh toán`.
3.  **Bước 3 (Giám đốc):** Review danh sách NCC và số tiền -> `DUYỆT`. Hệ thống tự động chuyển trạng thái các đơn PO con sang `CHỜ THANH TOÁN`.
4.  **Bước 4 (Thủ quỹ/Kế toán thanh toán):** Mở màn hình Phiếu Chi -> Thấy các Đề xuất đang chờ chi -> Thực hiện lệnh chuyển tiền -> Upload Bill -> Bấm `ĐÃ THANH TOÁN`.
5.  **Bước 5 (Tự động):** Hệ thống cập nhật ngược lại:
    *   Trạng thái PO liên quan -> `ĐÃ THANH TOÁN`.
    *   Trạng thái line item trong Đề xuất -> `ĐÃ THANH TOÁN`.
    *   Giảm số dư công nợ NCC.

---

## 3. ĐỀ XUẤT PHƯƠNG ÁN TRIỂN KHAI TỐI ƯU (BEST PRACTICE)

### 3.1. Về Database (Backend)
*   **State Machine Pattern:** Triển khai logic chuyển trạng thái tập trung tại Service để đảm bảo không có trạng thái "ma" (ví dụ: không thể chi nếu proposal chưa duyệt).
*   **Atomic Transactions:** Sử dụng `Prisma.$transaction` khi cập nhật trạng thái `ĐÃ THANH TOÁN` để đảm bảo: *Phiếu chi thành công AND Trạng thái PO đổi AND Công nợ giảm* diễn ra đồng thời.
*   **Storage:** Sử dụng thư mục `/uploads/bills` (hoặc Minio) để lưu trữ chứng từ thanh toán, link trực tiếp với ID Phiếu chi.

### 3.2. Về Giao diện (Frontend)
*   **Smart Filter:** Màn hình Phiếu chi sẽ có tab "Theo Đề Xuất" và "Chi Tự Do". Tab "Theo Đề Xuất" sẽ tự động gom nhóm theo NCC để kế toán dễ xử lý.
*   **Timeline UI**: Hiển thị quá trình từ lúc lập PO -> Đối chiếu -> Đề xuất -> Chi tiền ở bên phải màn hình chi tiết để dễ dàng truy vết (Audit Trail).

### 3.3. Các ràng buộc an toàn (Security & Integrity)
*   **Locking Data:** Khi đơn PO đã ở trạng thái `CHỜ THANH TOÁN` (nằm trong đề xuất đã duyệt), cấm tuyệt đối việc sửa số lượng/đơn giá trừ khi hủy bỏ đề xuất đó.
*   **PDF Versioning:** File in Đề xuất thanh toán phải có mã QR/Hash để đối soát giữa bản cứng và bản mềm trên hệ thống.

---
*Tài liệu này là cơ sở để cập nhật Schema Prisma và xây dựng API.*
