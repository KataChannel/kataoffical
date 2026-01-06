# 🚀 KẾ HOẠCH TRIỂN KHAI CHI TIẾT: MODULE KẾ TOÁN ERP (VERSION FINAL)

Tài liệu này là "Kim chỉ nam" cuối cùng để đội ngũ kỹ thuật triển khai toàn bộ hạ tầng Kế toán cho hệ thống Rausach V3.

## 1. 🔄 WORKFLOW & TRẠNG THÁI (STATE MACHINE)

### 1.1. Đơn Mua Hàng NCC (Purchase Order - PO)
*Mục tiêu: Đảm bảo số liệu đối soát kho và giá tiền là chính xác nhất.*
*   **ĐƠN MỚI**: Khởi tạo đơn đặt hàng.
*   **ĐÃ ĐỐI CHIẾU**: Chốt số lượng nhận thực tế và đơn giá cuối cùng. (🔒 Khóa sửa SL/Giá sau bước này).
*   **CHỜ THANH TOÁN**: Đã nằm trong Đề xuất thanh toán được duyệt.
*   **ĐÃ THANH TOÁN**: Tiền đã ra khỏi quỹ/tài khoản.

### 1.2. Đề Xuất Thanh Toán (Payment Proposal - PP)
*Mục tiêu: Một đề xuất có thể chứa nhiều NCC, giúp Giám đốc duyệt chi tập trung.*
*   **ĐX MỚI**: Kế toán lập danh sách các đơn cần thanh toán.
*   **KHÔNG DUYỆT**: Giám đốc từ chối (Bắt buộc nhập Lý do/Comment).
*   **CHỜ THANH TOÁN**: Giám đốc đã Duyệt. (Kích hoạt cho phép tạo Phiếu Chi).
*   **ĐÃ THANH TOÁN**: Toàn bộ các NCC trong đề xuất đã nhận đủ tiền.

### 1.3. Phiếu Chi (Payment Voucher - PV)
*Mục tiêu: Quản lý dòng tiền thực tế và lưu trữ chứng từ.*
*   **Quy tắc hiển thị**: Mặc định theo tháng, cho phép chọn khoảng ngày.
*   **Nguồn chi**: Chỉ hiển thị các Đợt chi từ Đề xuất ở trạng thái `CHỜ THANH TOÁN`.
*   **Ràng buộc Bill**: Hình thức *Chuyển khoản* bắt buộc phải Upload ảnh chứng từ (Bill) mới được hoàn tất.

---

## 2. 🏛️ CẤU TRÚC DỮ LIỆU (DATABASE SCHEMA)

Cần bổ sung/cập nhật các bảng sau vào `prisma.schema`:

```prisma
// 1. Đề xuất thanh toán Master
model PaymentProposal {
  id          String   @id @default(uuid())
  maDeXuat    String   @unique // DXTT-2024-001
  ngayLap     DateTime @default(now())
  status      String   @default("MOI") // MOI, KHONG_DUYET, CHO_THANH_TOAN, DA_THANH_TOAN
  description String?
  totalAmount Decimal  @postgres.Decimal(20, 3)
  comment     String?  // Lý do nếu không duyệt
  tenant_id   String?
  items       PaymentProposalSupplier[]
}

// 2. Chi tiết theo NCC trong Đề xuất
model PaymentProposalSupplier {
  id          String   @id @default(uuid())
  proposalId  String
  supplierId  String
  amount      Decimal  @postgres.Decimal(20, 3)
  status      String   @default("CHO_THANH_TOAN") // CHO_THANH_TOAN, DA_THANH_TOAN
  paymentProposal PaymentProposal @relation(fields: [proposalId], references: [id])
  paymentVoucher  PhieuThuChi?    @relation(fields: [paymentVoucherId], references: [id])
  paymentVoucherId String? @unique
}

// Cập nhật trạng thái cho Dathang (PO)
// Cần audit lại Dathang model để thêm status: MOI, DA_DOI_CHIEU, CHO_THANH_TOAN, DA_THANH_TOAN
```

---

## 3. ⚙️ LOGIC XỬ LÝ CỐT LÕI (SERVICE LAYER)

### 3.1. Cơ chế Cập nhật Ngược (Cascade Update)
Khi Kế toán bấm **ĐÃ THANH TOÁN** trên Phiếu Chi:
1.  **Cập nhật Phiếu Chi**: Trạng thái -> `DA_THANH_TOAN`.
2.  **Cập nhật Đơn Mua (PO)**: Tất cả PO liên quan trong phiếu -> `DA_THANH_TOAN`.
3.  **Cập nhật Đề Xuất (PP)**: 
    *   Line item NCC tương ứng -> `DA_THANH_TOAN`.
    *   Kiểm tra: Nếu *tất cả* line item trong Đề xuất đã xong -> Cập nhật Đề xuất Master -> `DA_THANH_TOAN`.
4.  **Cập nhật Công nợ**: Giảm trừ số dư nợ NCC tương ứng.

### 3.2. Ràng buộc an toàn
*   Backend phải kiểm tra: Nếu `payment_method == 'CHUYEN_KHOAN'` mà `bill_image` rỗng thì trả về lỗi 400.
*   Không cho phép sửa/xóa Đơn Mua Hàng khi đã ở trạng thái `CHỜ THANH TOÁN`.

---

## 4. 💻 GIAO DIỆN & TRẢI NGHIỆM (UI/UX)

*   **Màn hình Đối chiếu PO**: Giao diện dạng bảng, cho phép click vào cột Số lượng/Đơn giá để sửa nhanh (Inline Edit).
*   **Màn hình Duyệt của Giám đốc**: Tối ưu hiển thị danh sách NCC kèm tổng tiền. Nút Duyệt/Không duyệt nổi bật.
*   **Màn hình Phiếu Chi**: 
    *   Cột trạng thái hiển thị màu sắc rõ rệt (Vàng: Chờ chi, Xanh: Đã chi).
    *   Click vào ảnh Bill để phóng to kiểm tra.

---

## 5. ⏱️ THỜI GIAN TRIỂN KHAI (AI-ASSISTED)

| Giai đoạn | Hạng mục | Thời gian (AI) |
| :--- | :--- | :--- |
| **GĐ 1** | Cập nhật Schema & Logic Backend (Transactions) | 3 - 5 Giờ |
| **GĐ 2** | UI Đối chiếu PO & Tạo Đề xuất | 2 - 3 Giờ |
| **GĐ 3** | UI Duyệt (Giám đốc) & Quản lý Phiếu Chi | 3 - 5 Giờ |
| **GĐ 4** | Test luồng nghiệp vụ & Report tài chính | 2 - 3 Giờ |
| **TỔNG** | | **~10 - 16 Giờ** |

---
*Tài liệu được thiết lập để làm base cho quá trình code thực tế.*
