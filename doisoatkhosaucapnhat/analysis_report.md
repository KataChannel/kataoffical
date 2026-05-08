# Báo Cáo Phân Tích & Đối Soát Vận Hành Kho
**Thời gian lập báo cáo:** 2026-05-07 10:25
**Phạm vi đối soát:** Từ lần chốt kho gần nhất (2026-05-06 10:16) đến hiện tại.

---

## 1. Tóm Lược Tình Hình (Executive Summary)
Qua rà soát dữ liệu vận hành từ cơ sở dữ liệu (PostgreSQL), hệ thống đang gặp tình trạng **sai lệch dữ liệu kho nghiêm trọng** giữa số lượng hàng hóa thực tế đã giao và số lượng hàng tồn được ghi nhận trong bảng `TonKho`.

*   **Tỷ lệ sai lệch:** **94%** sản phẩm có phát sinh giao dịch bị lệch số liệu (295/314 sản phẩm).
*   **Vấn đề cốt lõi:** Các đơn hàng bán ra ở trạng thái "Đã giao" (dagiao) nhưng **không thực hiện trừ kho vật lý** (`sltontt`), dẫn đến tồn kho ảo trên hệ thống cao hơn thực tế.

---

## 2. Thông Tin Chốt Kho Gần Nhất
*   **Mã chốt kho:** `CHOTKHO_1778062591267`
*   **Thời gian:** 10:16:30 ngày 06/05/2026
*   **Tiêu đề:** ĐIỀU CHỈNH CHỐT KHO TỰ ĐỘNG [EXCEL]
*   **Ghi chú:** Chốt kho từ Excel (80 tăng, 94 giảm).

---

## 3. Thống Kê Sai Lệch Chi Tiết
Dưới đây là danh sách các sản phẩm có sai lệch lớn nhất (Đơn vị: Kg/Gói):

| Mã SP | Tên Sản Phẩm | Tồn Chốt (A) | Nhập/Xuất (B) | Đơn Giao (C) | Tồn Lý Thuyết (A+B-C) | Tồn Hệ Thống | Chênh Lệch |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| I100067 | Dưa leo | 0 | +1.5 | 29.9 | **-28.4** | 0.6 | **+29.0** |
| I100186 | Rau muống lá | 0 | +6.0 | 34.0 | **-28.0** | 0.5 | **+28.5** |
| I100043 | Cải bẹ xanh có gốc | 17.0 | -9.3 | 19.3 | **-11.6** | 16.7 | **+28.3** |
| I100014 | Bí đỏ tròn | 50.0 | -12.0 | 12.0 | **26.0** | 53.0 | **+27.0** |
| I100791 | Đậu trắng đà lạt | 0 | -8.0 | 8.0 | **-16.0** | 0 | **+16.0** |

> [!CAUTION]
> **Nhận xét:** Đa số các sản phẩm có "Tồn lý thuyết" bị âm (do đã bán hết) nhưng "Tồn hệ thống" vẫn dương. Điều này khẳng định việc trừ kho tự động khi giao hàng đang bị gián đoạn.

---

## 4. Các Bất Thường Kỹ Thuật (Anomalies)

### 4.1. Đơn hàng thiếu Phiếu Kho (Missing Slips)
Hơn **100 đơn hàng** được ghi nhận trạng thái `dagiao` hoặc `hoanthanh` kể từ sau lần chốt kho nhưng **không có Phiếu Xuất Kho (PX)** tương ứng trong hệ thống. Theo logic nghiệp vụ, mỗi đơn hàng đã giao bắt buộc phải đi kèm một phiếu xuất để ghi nhận biến động kho.

### 4.2. Tồn kho dự phòng (Reservations) bất hợp lý
Chỉ số `slchogiao` (hàng đang chờ giao/đang giữ chỗ) cực lớn, thậm chí vượt xa cả tồn kho thực tế.
*   Ví dụ: **Rau muống lá** đang bị treo dự phòng **354.5 kg**, trong khi thực tế kho chỉ còn **0.5 kg**.
*   **Nguyên nhân:** Các đơn hàng ở trạng thái `dadat` không được giải phóng sau khi giao hàng hoặc sau khi hủy đơn.

---

## 5. Phân Tích Nguyên Nguyên Gốc Rễ (Root Cause Analysis)
Qua rà soát mã nguồn `DonhangService.ts` và `tonkho-manager.service.ts`, có 3 kịch bản gây lỗi:
1.  **Lỗi Logic Transaction:** Trong hàm `update`, việc gọi `tonkhoManager.updateTonkhoAtomic` và `prisma.phieuKho.upsert` được thực hiện tuần tự. Nếu có bất kỳ lỗi nào xảy ra ở bước tạo phiếu, toàn bộ giao dịch có thể bị rollback (nếu dùng transaction) hoặc bị treo dữ liệu.
2.  **Bulk Update bypass:** Hàm `updateBulk` (cập nhật hàng loạt) có logic trừ kho khác biệt so với cập nhật đơn lẻ, có khả năng không kích hoạt đúng các trigger trừ `sltontt`.
3.  **Tác động ngoại vi:** Có dấu hiệu dữ liệu trạng thái đơn hàng bị thay đổi trực tiếp từ database hoặc qua các service khác mà không thông qua `DonhangService`, dẫn đến việc không chạy logic trừ kho.

---

## 6. Đề Xuất Hành Động (Proposed Plan)

### Bước 1: Khắc phục dữ liệu tức thời
*   [ ] Thực hiện **Recalculate TonKho**: Chạy script tính toán lại toàn bộ `slchogiao`, `slchonhap` dựa trên các đơn hàng hiện có để giải phóng "tồn kho ảo".
*   [ ] Đồng bộ `slton` và `sltontt` về giá trị tin cậy nhất dựa trên (Tồn chốt + Nhập - Xuất thực tế).

### Bước 2: Sửa lỗi hệ thống (Cần USER phê duyệt trước khi thực hiện)
*   [ ] Kiểm tra lại logic `updateBulk` để đảm bảo luôn tạo Phiếu Kho cho mọi đơn hàng thành công.
*   [ ] Bổ sung cơ chế **Stock Integrity Check**: Tự động cảnh báo Admin khi có đơn hàng `dagiao` mà thiếu phiếu kho sau 5 phút.

---
**Người báo cáo:** Antigravity AI Assistant
**Trạng thái:** Chờ phê duyệt hành động.
