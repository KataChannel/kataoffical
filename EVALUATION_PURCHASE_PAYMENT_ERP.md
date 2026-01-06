# Báo cáo Đánh giá Hệ thống & Kế hoạch Triển khai Module Mua hàng & Thanh toán NCC (ERP)

## 1. Tổng quan
Dựa trên tài liệu yêu cầu `prompt_final_triển_khai_module_mua_hang_thanh_toan_ncc_erp.md`, hệ thống hiện tại của bạn cần được nâng cấp đáng kể để đạt được chuẩn ERP trong quy trình mua hàng và thanh toán.

Hiện tại, hệ thống đã có những bước cơ bản về Quản lý Nhà cung cấp và Đặt hàng, nhưng chưa có quy trình **Đối soát (Reconciliation)**, **Đề xuất thanh toán (Payment Proposals)** và **Duyệt đa cấp** theo đúng chuẩn kế toán Việt Nam.

---

## 2. Phân tích Khoảng cách (Gap Analysis)

### 2.1. Quy trình & Trạng thái (Workflow & States)
*   **Hiện tại:** `Dathang` (Đơn đặt hàng NCC) sử dụng các trạng thái chung của đơn hàng (`dadat`, `dagiao`, `danhan`, `huy`, `hoanthanh`). Không có trạng thái `ĐÃ_ĐỐI_CHIẾU`.
*   **Yêu cầu:** Cần một Workflow chuyên biệt cho Mua hàng: `MỚI → ĐÃ_ĐỐI_CHIẾU → ĐÃ_THANH_TOÁN`. Chỉ đơn `ĐÃ_ĐỐI_CHIẾU` mới được đưa vào công nợ.

### 2.2. Mô hình Dữ liệu (Database Schema)
Đây là phần cần thay đổi nhiều nhất.
*   **Thiếu bảng:**
    *   `PaymentProposal`: Lưu thông tin tổng của một đợt đề xuất thanh toán (Master).
    *   `PaymentProposalSupplier`: Chi tiết các NCC trong một đề xuất.
    *   `PaymentProposalPurchaseOrder` (hoặc link từ line item): Liên kết đề xuất với các đơn mua hàng cụ thể.
    *   `SupplierDebt`: Bảng theo dõi lịch sử công nợ NCC (Balance tracking).
*   **Cải tiến bảng hiện có:**
    *   `PhieuThuChi`: Hiện tại chỉ liên kết với 1 `dathangId`. Cần hỗ trợ liên kết với `PaymentProposalSupplier` để cho phép 1 NCC thanh toán nhiều đơn hàng trong một đợt.
    *   `Nhacungcap`: Cần bổ sung các trường thông tin tài chính, hạn mức nợ.
    *   **Vấn đề SaaS:** Đa số các bảng hiện tại chưa có `tenant_id` (mặc dù đã có `Congty` và `Kho`).

### 2.3. Quy tắc Nghiệp vụ (Business Rules)
*   **Hiện tại:** Chưa có ràng buộc về việc không cho sửa đơn sau khi đối soát hoặc không cho xóa đề xuất sau khi gửi duyệt.
*   **Hiện tại:** `PhieuThuChi` có thể tạo độc lập, không bắt buộc phải từ một Đề xuất được duyệt.

### 2.4. Giao diện (UI/UX)
*   **Hiện tại:** Trang `congnoncc` đang hiển thị danh sách các đơn hàng đã nhận (`danhan`) để tính tổng nợ một cách thủ công.
*   **Yêu cầu:** Cần giao diện tạo Đề xuất thanh toán chọn hàng loạt NCC và đơn hàng, màn hình duyệt của Giám đốc, và Timeline/Audit log cho từng giao dịch.

---

## 3. Đánh giá Khả năng Đáp ứng

| Tiêu chí | Điểm | Nhận xét |
| :--- | :--- | :--- |
| **Quản lý NCC** | 8/10 | Đã ổn định, có phân nhóm. |
| **Đặt hàng NCC** | 7/10 | Đã có quy trình nhận hàng, nhập kho cơ bản. |
| **Công nợ NCC** | 4/10 | Mới dừng lại ở báo cáo cơ bản, chưa có theo dõi truy vết (Audit trail). |
| **Quy trình Duyệt** | 2/10 | Đã có trạng thái `CHO_DUYET` trên Phiếu Chi nhưng chưa có Workflow đề xuất. |
| **SaaS Readiness**| 3/10 | Cần bổ sung `tenant_id` xuyên suốt hệ thống. |

**Đánh giá chung: Cần nâng cấp khoảng 60% hạ tầng backend của module và 80% logic xử lý tại frontend.**

---

## 4. Kế hoạch Triển khai Đề xuất

### Giai đoạn 1: Database & Backend Core (AI : 3-5 giờ)
1.  **Cập nhật Schema:**
    *   Thêm `tenant_id` vào các table liên quan.
    *   Tạo các bảng `PaymentProposal`, `PaymentProposalLine`.
    *   Thêm trạng thái `DOI_CHIEU` cho `Dathang`.
2.  **API Services:**
    *   Triển khai `PaymentProposalService` với logic State Machine.
    *   Cập nhật `PhieuThuChiService` để link với Proposal.
    *   API tính toán công nợ NCC theo Invoice-based.

### Giai đoạn 2: In ấn & Approval (AI : 2-3 giờ)
1.  **Render Service:** Tạo template HTML/PDF cho Đề xuất thanh toán (sử dụng server-side rendering để đảm bảo bảo mật).
2.  **Logic Approval:** Xây dựng hệ thống phân quyền duyệt phiếu.

### Giai đoạn 3: Frontend Modernization (AI : 6-9 giờ)
1.  **Dashboard NCC:** Dashboard riêng cho kế toán mua hàng.
2.  **Proposal UI:** Màn hình tạo đề xuất đa NCC, đa Đơn hàng.
3.  **Approval UI:** Màn hình dành cho Giám đốc với Audit log và Timeline.

---

## 5. Kết luận
Yêu cầu trong file `prompt_final_...erp.md` là hoàn toàn khả thi và cần thiết để nâng cấp hệ thống hiện tại lên mức chuyên nghiệp. Tuy nhiên, thay vì chỉ là một module "thêm vào", đây là một quá trình **"refactor logic tài chính"** để đảm bảo tính chính xác và truy vết.

**Hành động tiếp theo:** Bạn có muốn tôi bắt đầu bằng việc cập nhật `schema.prisma` để hỗ trợ các bảng đề xuất thanh toán này không?
