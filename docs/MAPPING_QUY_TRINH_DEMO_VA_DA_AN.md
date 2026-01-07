# Hướng Dẫn Tương Quan Quy Trình & So Sánh Hệ Thống: Demo vs. Rausach ERP

Tài liệu này cung cấp cái nhìn toàn diện về việc di trú các giá trị tinh túy từ bản **Demo (UX/UI & Logic)** sang hệ thống **Rausach ERP** chính thức.

---

## 1. Bảng So Sánh Toàn Diện (Full Comparison)

### **1.1. So Sánh Tính Năng (Functional Comparison)**

| Tính Năng | Hệ Thống Demo | Rausach ERP (Đã nâng cấp) | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Gom Đơn (Grouping)** | Gom SO/PO đơn giản qua giao diện React. | Tích hợp chặt chẽ vào quy trình `AR Document` & `Payment Proposal` (Angular). | ✅ Vượt trội |
| **Thanh Toán 4 Tầng** | Xử lý logic tại Client. | **Transaction Atomic (Backend)**: Đảm bảo tính toàn vẹn 100% khi cập nhật Phiếu -> Chứng từ -> Đơn hàng -> Công nợ. | ✅ Vượt trội |
| **Xác thực chứng từ** | Tùy chọn upload ảnh. | **Bắt buộc upload Bill** cho hình thức Chuyển khoản (Kiểm soát rủi ro). | ✅ Vượt trội |
| **Dashboard** | Static Summary. | **Real-time Financial Stats**: Tự động tính tỷ lệ thu hồi nợ (%), dòng tiền AR/AP tức thời. | ✅ Vượt trội |

### **1.2. Trải Nghiệm UX/UI (UX/UI Experience)**

| Tiêu Chí | Đặc Điểm Demo | App Rausach ERP (Premium Look) | Cải Tiến UX |
| :--- | :--- | :--- | :--- |
| **Thẩm mỹ (Visual)** | Glassmorphism, Gradient xanh/cam. | Phối hợp Design Tokens của Demo vào Angular Material (styles.scss). | Tạo cảm giác chuyên nghiệp, cao cấp. |
| **Tương tác (Interaction)** | Hover effect mạnh, Bo góc lớn. | Sử dụng các lớp `.card-premium`, `.btn-gradient` cho phản hồi thị giác tốt hơn. | Giảm mỏi mắt, tăng sự tập trung vào số liệu. |
| **Bố cục (Layout)** | Master-Detail đơn giản. | **Responsive Design**: Tối ưu hóa cho cả Tablet và Mobile (Mobile-first sidebar). | Dễ dàng kiểm tra công nợ ngay trên điện thoại tại kho. |
| **Thông báo** | Alert Client đơn giản. | Sửa dụng `MatSnackBar` kết hợp với màu sắc trạng thái (Success/Error/Warning). | Thông tin rõ ràng, kịp thời. |

### **1.3. Tối Ưu Hóa (Optimization)**

| Loại Tối Ưu | Kỹ thuật áp dụng | Lợi ích cho doanh nghiệp |
| :--- | :--- | :--- |
| **Dữ liệu (Data)** | `prisma.$transaction` cho Cascade Update. | Không bao giờ xảy ra tình trạng: "Phiếu đã tạo nhưng công nợ khách chưa trừ". |
| **Hiệu suất (Performance)** | GraphQL Generic Query + Aggregation. | Load Dashboard cực nhanh dù dữ liệu lên tới hàng chục nghìn đơn hàng. |
| **Quy trình (Workflow)** | Giảm bước nhập liệu thủ công. | Kế toán chỉ cần "Chọn" -> "Xác nhận", hệ thống tự tính toán toàn bộ số dư. |
| **Bảo mật (Security)** | Role-based Access Control (RBAC). | Phân quyền chi tiết ai được Lập phiếu, ai được Xem báo cáo tài chính. |

---

## 2. Ánh Xạ Quy Trình Nghiệp Vụ (Business Process Mapping)

| Nhóm Menu Demo | Chức năng Demo | Chức năng trong Rausach ERP | Module Tương Ứng |
| :--- | :--- | :--- | :--- |
| **KHÁCH HÀNG** | **Xác nhận Công nợ** | **Chứng từ AR (AR Document)** | `api/ar-document` |
| | **Lập Phiếu Thu** | **Phiếu Thu Chi (Loại: THU)** | `api/phieuthuchi` |
| | **Báo cáo AR** | **Dashboard / Financial Summary** | `frontend/admin/dashboard` |
| **NHÀ CUNG CẤP** | **Xác nhận Công nợ** | **Đề xuất thanh toán** | `api/payment-proposal` |
| | **Lập Phiếu Chi** | **Phiều Thu Chi (Loại: CHI)** | `api/phieuthuchi` |

---

## 3. Hướng Dẫn Thao Tác Step-by-Step cho Kế Toán

### **A. Luồng Bán Hàng & Phải Thu (AR)**

1.  **Giai đoạn Gom Nợ:** Vào module **Chứng từ AR** -> Chọn Khách hàng -> Tích chọn danh sách Đơn hàng (SO) cần thu tiền -> Lưu. Hệ thống tạo ra một "Gốc nợ".
2.  **Giai đoạn Thu Tiền:** Vào module **Phiếu Thu Chi** -> Tạo phiếu **THU** -> Chọn "Chứng từ gốc" là mã AR vừa tạo -> Nhập số tiền -> (Chuyển khoản thì tải Bill) -> Click **Thanh Toán**.
3.  **Kết quả:** Công nợ Khách hàng giảm ngay lập tức, Đơn hàng tự động đổi sang trạng thái `DA_THU_TIEN`.

### **B. Luồng Mua Hàng & Phải Trả (AP)**

1.  **Lập đề xuất:** Vào module **Đề xuất thanh toán** -> Gom các Đơn mua hàng (PO) của NCC -> Xác nhận nợ.
2.  **Chi trả:** Sang module **Phiếu Thu Chi** -> Tạo phiếu **CHI** -> Liên kết đề xuất -> Hoàn tất.

---
*Báo cáo so sánh được thực hiện nhằm mục đích hướng dẫn Kế toán sử dụng hệ thống Rausach ERP theo chuẩn quy trình hiện đại.*
