# Kế hoạch triển khai Tính năng Chuyển kho (Warehouse Transfer)

Dựa trên yêu cầu từ tài liệu [TONG_HOP_FIXBUG_20260408.md](../fixbug/TONG_HOP_FIXBUG_20260408.md) và hình ảnh thiết kế giao diện, dưới đây là danh sách các công việc cần thực hiện để hoàn thiện quy trình **Chuyển kho**.

## 1. Phân tích Dữ liệu & Schema (Backend)

Hệ thống cần lưu trữ thông tin về kho nguồn và kho đích để thực hiện trừ/cộng tồn kho đồng thời.

*   **Model PhieuKho:**
    - Thêm trường `tuKhoId` (ID kho xuất hàng).
    - Thêm trường `denKhoId` (ID kho nhập hàng - hiện tại đang dùng chung `khoId`).
    - Quy định mã phiếu (`maphieu`) có tiền tố là **`PCK`** (Phiếu Chuyển Kho).
*   **Logic Tồn kho (`TonKho`):**
    - Khi `type === 'chuyenkho'`, việc cập nhật tồn kho phải nằm trong một **Prisma Transaction**.
    - **Step 1:** Giảm `slton` tại `tuKhoId`.
    - **Step 2:** Tăng `slton` tại `denKhoId`.

## 2. Giao diện người dùng (Frontend - UI/UX)

Xây dựng component **Tạo Phiếu Chuyển Kho** với các thành phần như hình ảnh thiết kế:

### Header & Thông tin chung
- **Tiêu đề:** "Tạo Phiếu Chuyển Kho".
- **Mã Phiếu:** Hiển thị dạng Read-only (Vd: `PCK-20240527-001`).
- **Ngày:** Ô chọn ngày (`MatDatepicker`).
- **Loại Phiếu:** Dropdown mặc định chọn "Chuyển Kho" (`chuyenkho`).
- **Từ Kho:** Dropdown chọn kho nguồn.
- **Đến Kho:** Dropdown chọn kho đích.
- **Ghi Chú:** Trường nhập văn bản nhiều dòng (`textarea`).

### Danh sách sản phẩm
- **Nút Thêm Sản Phẩm:** Mở dialog hoặc dòng trống để tìm kiếm sản phẩm.
- **Bảng hiển thị (MatTable):**
    - `STT`: Số thứ tự dòng.
    - `Tên Sản Phẩm`: Hiển thị tên + mã.
    - `Đơn Vị`: Đơn vị tính (`dvt`).
    - `Số Lượng Chuyển`: Ô nhập số.
    - `Hành Động`: Nút xóa dòng (icon thùng rác màu đỏ).

### Hành động (Actions)
- **Nút Lưu (Save):** Thực hiện POST dữ liệu về API `/phieukho`.
- **Nút Hủy (Cancel):** Quay lại danh sách phiếu kho.

## 3. Danh sách Công việc chi tiết (Tasklist)

### A. Backend Development
- [x] **DB Migration:** Cập nhật schema `PhieuKho` để hỗ trợ `tuKhoId` và `denKhoId`.
- [x] **API Service:** Cập nhật `PhieukhoService.create()`:
    - Cho phép `type: 'chuyenkho'`.
    - Triển khai logic luân chuyển (trừ kho A, cộng kho B).
    - Tự động sinh mã phiếu theo định dạng `PCK-YYYYMMDD-XXX`.
- [x] **Validation:** Ràng buộc không cho phép chọn kho nguồn trùng kho đích.

### B. Frontend Development
- [x] **Service Update:** Cập nhật `phieukho.service.ts` để gửi dữ liệu chuyển kho (Logic truyền dữ liệu generic).
- [x] **New Component:** Cải thiện `DetailPhieukhoComponent` để hỗ trợ UI chọn kho nguồn/đích.
- [x] **Logic UI:**
    - Xử lý load danh sách kho và sản phẩm.
    - Hiển thị cột Kho Nguồn/Kho Đích tại danh sách Phiếu Kho.
- [x] **Routing:** Thêm route `/admin/chuyenkho/create`.

### C. Testing & Validation
- [ ] Kiểm tra tính toàn vẹn dữ liệu khi chuyển hàng (tránh Race Condition).
- [ ] Kiểm tra hiển thị tại trang **Xuất Nhập Tồn**.
- [ ] Test trường hợp mạng lỗi khi đang thực hiện transaction.

## 4. Báo cáo tiến độ (Progress Report)

| Hạng mục | Tiến độ | Trạng thái |
| :--- | :---: | :--- |
| **A. Backend Development** | 100% | ✅ Hoàn tất |
| **B. Frontend Development** | 100% | ✅ Hoàn tất |
| **C. Testing & Validation** | 0% | 🔄 Chờ triển khai |

**Tổng cộng:** **80%** hoàn thành.

---
*Kế hoạch được cập nhật bởi Antigravity AI - 13/04/2026*
