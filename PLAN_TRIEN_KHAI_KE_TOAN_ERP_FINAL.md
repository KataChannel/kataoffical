# 🚀 KẾ HOẠCH TRIỂN KHAI CHI TIẾT: MODULE KẾ TOÁN ERP - ✅ FULLY COMPLETED

Tài liệu này tổng hợp kết quả triển khai hạ tầng Kế toán ERP cho hệ thống Rausach V3, bao gồm cả cấu hình Navigation và Phân quyền Admin.

## 1. 🔄 WORKFLOW & TRẠNG THÁI (STATE MACHINE)

### 1.1. Đơn Mua Hàng NCC (Purchase Order - PO)
*   **MOI**: Cho phép sửa SL/Giá.
*   **DA_DOI_CHIEU**: Đã chốt thực tế. 🔒 Khóa dữ liệu.
*   **CHO_THANH_TOAN**: Đã nằm trong Đề xuất thanh toán.
*   **DA_THANH_TOAN**: Đã chi tiền & có chứng từ.

### 1.2. Đề Xuất Thanh Toán (Payment Proposal - PP)
*   **MOI**: Kế toán lập đề xuất.
*   **KHONG_DUYET**: Giám đốc từ chối kèm lý do.
*   **CHO_THANH_TOAN**: Đã duyệt, cho phép chi tiền.
*   **DA_THANH_TOAN**: Hoàn tất tất cả các khoản chi trong đề xuất.

---

## 2. 🔑 NAVIGATION & PHÂN QUYỀN (RBAC) - ✅ MỚI BỔ SUNG

Hệ thống đã được cấu hình Menu và Quyền truy cập tự động:

*   **Menu mới**: `Kế toán` > `Đề xuất thanh toán` (Icon: `list_alt`).
*   **Quyền Admin/Kế toán (Permissions)**:
    *   `payment-proposal.view`: Xem danh sách đề xuất.
    *   `payment-proposal.create`: Lập đề xuất từ Công nợ.
    *   `payment-proposal.review`: Duyệt hoặc từ chối đề xuất.
    *   `payment-proposal.delete`: Xóa đề xuất (khi ở trạng thái Mới).

---

## 3. 📖 HƯỚNG DẪN SỬ DỤNG CHI TIẾT (UX/UI GUIDE)

### Bước 1: Đối chiếu đơn hàng (Hủy tính trạng lộn xộn kho)
1.  Vào **Kho Vận** hoặc **Mua Hàng** > Chọn Đơn đặt hàng.
2.  Kiểm tra số lượng hàng thực tế nhận được.
3.  Bấm nút **"Đối chiếu"** > Nhập SL thực tế và đơn giá cuối cùng > **Xác nhận**.
4.  Đơn hàng sẽ chuyển sang trạng thái **"Đã đối chiếu"**.

### Bước 2: Lập Đề xuất thanh toán (Gom đơn chi trả)
1.  Vào **Mua Hàng** > **Công nợ Nhà cung cấp**.
2.  Sử dụng Filter để tìm các đơn có trạng thái ERP là **"Đã đối chiếu"**.
3.  Tích chọn các đơn hàng của cùng một NCC (hoặc nhiều NCC) > Bấm **"Lập đề xuất"**.
4.  Hệ thống sẽ chuyển bạn sang màn hình tạo Đề xuất với danh sách đơn đã chọn. Kiểm tra tổng tiền và bấm **"Gửi đề xuất"**.

### Bước 3: Phê duyệt (Dành cho Giám đốc/Quản lý)
1.  Vào **Kế toán** > **Đề xuất thanh toán**.
2.  Chọn đề xuất ở trạng thái **"Mới"**.
3.  Xem chi tiết các đơn hàng bên trong.
4.  Bấm **"Duyệt"** (chuyển sang Chờ thanh toán) hoặc **"Không duyệt"** (phải nhập lý do).

### Bước 4: Thanh toán & Chứng từ (Cash Out)
1.  Sau khi đề xuất được duyệt, Kế toán vào **Phiếu Thu Chi** > Tạo phiếu mới.
2.  Chọn đối tượng là **Nhà cung cấp** > Hệ thống sẽ gợi ý các **Đợt thanh toán từ Đề xuất**.
3.  Chọn đợt thanh toán tương ứng > Hệ thống tự đổ số tiền và thông tin liên quan.
4.  **QUAN TRỌNG**: Nếu chọn *Chuyển khoản*, bạn **PHẢI** Upload ảnh Bill thanh toán (ảnh chụp màn hình App ngân hàng).
5.  Bấm **"Xác nhận đã thanh toán"**. 
6.  💎 **Kết quả**: Phiếu chi thành công, Đề xuất hoàn tất, và tất cả PO liên quan tự động chuyển sang **"Đã thanh toán"**.

---

## 4. ⚙️ HỆ THỐNG KỸ THUẬT
*   **Backend**: NestJS + Prisma (Transaction handling).
*   **Frontend**: Angular Signal-based state + Material UI.
*   **Setup**: Chạy `npx ts-node api/scripts/setup-erp-auth.ts` để đồng bộ menu & quyền.

---
*Tài liệu được cập nhật hoàn chỉnh. Hệ thống đã sẵn sàng vận hành.*
