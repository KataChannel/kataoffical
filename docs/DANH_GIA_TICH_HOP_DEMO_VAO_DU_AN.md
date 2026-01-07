# Đánh Giá & Kế Hoạch Tích Hợp Giao Diện & Chức Năng Demo vào Dự Án Rausach ERP

## 1. Tóm Lược (Executive Summary)
Việc chuyển giao 100% từ hệ thống Demo (`demo/`) vào dự án hiện tại không chỉ dừng lại ở giao diện (UI) mà còn bao gồm cả các logic nghiệp vụ cao cấp (Functional). Đây là bước đi chiến lược nhằm nâng cấp Rausach ERP thành một hệ thống quản trị chuyên nghiệp, minh bạch và có tính tự động hóa cao.

---

## 2. Phân Tích So Sánh (Demo vs. Dự Án Hiện Tại)

| Đặc điểm | Hệ thống Demo (React/Vite) | Dự án Chính (Angular/NestJS) |
| :--- | :--- | :--- |
| **Thẩm mỹ (Aesthetics)** | Cao cấp, Glassmorphism, Gradient, Bo góc lớn (12-16px). | Truyền thống Angular Material, table-centric. |
| **Nghiệp vụ (Functional)** | Gom đơn (Grouping), Cập nhật 4 tầng (Cascade), Real-time Summary. | Xử lý đơn lẻ, các bước cập nhật tài chính còn rời rạc. |
| **Tương tác (UX)** | Master-Detail trực quan, giảm thiểu click, thông báo realtime. | Sử dụng nhiều Dialog/Form truyền thống, tốn nhiều bước thao tác. |

---

## 3. Các Thành Phần Thiết Kế Cần Chuyển Giao 100%

### **3.1. Hệ Thống Token & Màu Sắc**
- Chuyển toàn bộ các biến CSS (`--bg-card`, `--bg-input`, `--border-color`) vào `:root` của `styles.scss`.
- Áp dụng các Gradient hiện đại cho các nút hành động và trạng thái Active.

### **3.2. Form Phiếu Thu Chi (PhieuThuChiForm.jsx)**
- **Header:** Tách biệt rõ thông tin đối tác và thông tin chứng từ gốc.
- **Body:** Danh sách đơn hàng đối soát được trình bày dạng thẻ (Cards) tối ưu cho cả Web và Mobile.
- **Validation:** Hiển thị cảnh báo màu sắc (Alerts) trực tiếp trên Form thay vì chỉ dùng SnackBar.

---

## 4. Đặc Đặc Điểm Chức Năng Cần Di Trú (Functional Migration)

### **4.1. Cơ Chế Gom Đơn (Order Grouping Logic)**
- **Từ Demo:** Chức năng cho phép gom nhiều đơn hàng (PO/SO) đã đối chiếu thành một chứng từ gốc (`ARDocument`/`PaymentProposal`).
- **Tích hợp:** Sử dụng `MatSelectionList` của Angular để người dùng chọn nhanh các đơn hàng cần thanh toán theo đối tác.

### **4.2. Giao Dịch "Cascade Update" (4 Tầng Cập Nhật)**
Đây là logic cốt lõi đảm bảo số liệu kế toán:
1.  **Tạo Phiếu Thu/Chi** (Ghi nhận dòng tiền).
2.  **Cập nhật Chứng từ gốc** (Xác nhận trạng thái thanh toán tổng).
3.  **Cập nhật từng Đơn hàng** (Khóa đơn hàng, chuyển trạng thái "Đã Thanh Toán").
4.  **Khấu trừ công nợ đối tác** (Cập nhật số dư nợ tức thời).
- **Kỹ thuật:** Sử dụng `prisma.$transaction` để đảm bảo tính toàn vẹn dữ liệu.

### **4.3. Hệ Thống Báo Cáo Tài Chính Real-time**
- Tự động hóa việc tính toán các chỉ số: Doanh số tạm tính, Công nợ thực tế, Số tiền đã thu/chi và Dư nợ còn lại.
- Hiển thị qua hệ thống **Summary Cards** (Xanh dương, Xanh lá, Đỏ) ở đầu các trang quản lý công nợ.

---

## 5. Kế Hoạch Triển Khai Kỹ Thuật (Không sửa code ngay)

### **Bước 1: Hạ tầng & Style Base**
- Tích hợp Design Tokens từ Demo vào dự án Angular.
- Xây dựng bộ thư viện CSS tiện ích (`.card-premium`, `.btn-gradient`).

### **Bước 2: Backend Service Logic**
- Xây dựng method `createWithCascade` trong `PhieuThuChiService`.
- Bổ sung các trường dữ liệu cần thiết vào Prisma Schema để hỗ trợ theo dõi thanh toán chi tiết.

### **Bước 3: Frontend Component Migration**
- Chuyển đổi `GeneralDashboard.jsx` -> `DashboardComponent` (Angular).
- Chuyển đổi `PhieuThuChiForm.jsx` -> `PhieuThuChiDialog` (Angular).
- Tích hợp logic upload chứng từ bắt buộc khi thanh toán chuyển khoản.

---

## 6. Thách Thức & Đề Xuất

### **Thách thức:**
- Đảm bảo tính nhất quán dữ liệu khi thực hiện cập nhật đa tầng.
- Tùy chỉnh sâu CSS Angular Material để khớp với thiết kế hiện đại của Demo.

### **Đề xuất:**
**Ưu tiên triển khai theo thứ tự:**
1.  **Logics Cascade Update** (Ưu tiên tính chính xác số liệu).
2.  **Hệ thống Style & Summary Cards** (Tạo hiệu ứng hình ảnh chuyên nghiệp ngay lập tức).
3.  **Form Master-Detail & Cơ chế Gom đơn**.

---
*Báo cáo được thực hiện bởi Antigravity AI Assistant - 07/01/2026.*
