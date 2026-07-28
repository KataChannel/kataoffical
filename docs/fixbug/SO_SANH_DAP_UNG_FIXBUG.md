# Báo cáo So sánh & Đánh giá mức độ đáp ứng yêu cầu Fix Bug (08/04/2026)

Tài liệu này so sánh các yêu cầu từ tài liệu quét tay ngày 08/04/2026 với trạng thái hiện tại của mã nguồn dự án.

## 1. Bảng So sánh Mức độ Đáp ứng

| Hạng mục yêu cầu | Trạng thái | Chi tiết kỹ thuật & Đánh giá |
| :--- | :---: | :--- |
| **I. Phân hệ Siêu thị** | ⚠️ Một phần | Có dữ liệu lọc `sieuThiOrders` trong `donhang-graphql.service.ts` nhưng chưa có module UI riêng biệt. |
| **Công thức Hao hụt** | ✅ Đã có | Logic `calculateChenhLech` trong `chotkho.service.ts` khớp 100% với công thức trong PDF. |
| **Đổi Form hàng Siêu thị** | ❌ Chưa có | Chưa tìm thấy Form chuyên biệt dành riêng cho quy trình sơ chế của Siêu thị. |
| **II. Quản lý Kho** | ⚠️ Một phần | Đã có `/admin/phieukho` nhưng chỉ hỗ trợ loại `nhap` và `xuat`. |
| **Loại phiếu "Chuyển Kho"** | ❌ Thiếu | Backend `phieukho.service.ts` đang hardcode kiểm tra chỉ cho phép `nhap` hoặc `xuat`. |
| **Logic Kho Đi -> Kho Nhận** | ❌ Thiếu | Chưa có transaction xử lý đồng thời giảm kho đi và tăng kho nhận trong một phiếu kho. |
| **Snapshot thời điểm Up file** | ✅ Đã có | Backend đã hỗ trợ `isChotkho` và `useAbsoluteTarget` để snapshot số liệu thực tế từ Excel. |
| **III. Dữ liệu & Excel** | ⚠️ Một phần | Có worker xử lý Excel nhưng thiếu các yêu cầu về trình bày. |
| **Sheet tổng -> Sheet order** | ⚠️ Một phần | Đã có logic tạo AOAs cho hàng Siêu thị nhưng chưa đóng gói thành quy trình chuyển đổi snapshot. |
| **Kẻ ô (Border) toàn bộ dữ liệu** | ❌ Thiếu | `exceldrive.utils.ts` sử dụng `xlsx-js-style` nhưng chưa cấu hình Border mặc định cho toàn bộ vùng dữ liệu. |

---

## 2. Route & Vị trí Logic Hiện tại

Dưới đây là sơ đồ các route liên quan đang hiện hữu trong dự án:

| Tính năng | Route Frontend | File Logic Backend |
| :--- | :--- | :--- |
| **Quản lý Kho Tổng** | `/admin/kho` | `api/src/kho/` |
| **Phiếu Nhập/Xuất** | `/admin/phieukho` | `api/src/phieukho/phieukho.service.ts` |
| **Chốt Kho (Snapshot)** | `/admin/chotkho` | `api/src/chotkho/` |
| **Lịch sử Tồn kho** | `/admin/lichsu-tonkho` | `api/src/lichsu-tonkho/` |
| **Xử lý Excel** | *(Utility)* | `frontend/src/app/shared/utils/exceldrive.utils.ts` |
| **Dữ liệu Siêu thị** | *(Nằm trong Đơn hàng)* | `frontend/src/app/admin/donhang/donhang-graphql.service.ts` |

---

## 3. Khoảng cách (Gaps) & Đề xuất thực hiện

### 1. Bổ sung loại phiếu "Chuyển Kho"
*   **Vấn đề:** Hiện tại `PhieukhoService.create` chỉ cho phép `nhap` và `xuat`.
*   **Đề xuất:** Cập nhật enum `PhieuKhoType` (nếu có) hoặc nới lỏng validation. Bổ sung logic transaction: nếu type là `chuyenkho`, hệ thống sẽ tự động tạo một record "Xuất" tại `Kho Đi` và một record "Nhập" tại `Kho Nhận`.

### 2. Số hóa Phân hệ Siêu thị
*   **Vấn đề:** Quy trình sơ chế và cập nhật tồn thực tế đang dùng Excel rời rạc.
*   **Đề xuất:** Tạo module `/admin/sieuthi`. Tích hợp logic upload file Excel sơ chế vào đây, tự động gọi `calculateChenhLech` để hiển thị **Hao hụt** ngay trên giao diện trước khi lưu.

### 3. Snapshot & Automation
*   **Vấn đề:** PDF yêu cầu snapshot tại thời điểm up file. 
*   **Đề xuất:** Tận dụng flag `useAbsoluteTarget` đã có trong backend. Khi người dùng upload file Excel sau sơ chế, frontend sẽ gửi flag này để backend ghi đè số liệu thực tế, reset lịch sử tồn âm (nếu có) về số thực.

### 4. Cải tiến Xuất file Excel
*   **Vấn đề:** Thiếu Border và định dạng Sheet Order.
*   **Đề xuất:** Cập nhật `writeExcelFile` trong `exceldrive.utils.ts` để thêm style:
    ```javascript
    border: {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    ```

---
*Báo cáo được tạo dựa trên phân tích mã nguồn thực tế ngày 08/04/2026.*
