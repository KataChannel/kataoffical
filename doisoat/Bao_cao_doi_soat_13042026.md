# Báo Cáo Đối Soát Tồn Kho & Giải Trình Chênh Lệch (13/04/2026)

Báo cáo này được lập dựa trên hình ảnh đối soát `doisoat13042026.jpg` và dữ liệu log hệ thống (PostgreSQL) tính đến ngày **13/04/2026**.

---

## 1. Bảng Tổng Hợp Chênh Lệch
*Dữ liệu trích xuất từ ảnh đối soát:*

| Mã SP | Tên Sản Phẩm | ĐVT | Hệ Thống (Ảnh) | Thực Tế (Ảnh) | Chênh Lệch | Đánh Giá |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **I100233** | Trứng gà | Vỉ | 52 | 95 | **+43** | Thiếu phiếu nhập |
| **I100479** | Dưa hấu | Kg | 461 | 55 | **-406** | Lệch log kho (Nặng) |
| **I100207** | Xà lách lolo xanh | Kg | 14.2 | 0 | **-14.2** | Chưa trừ xuất kho |
| **I100164** | Ớt đà lạt (đỏ) | Kg | -4.3 | 7 | **+11.3** | Nhập chưa xác nhận |
| **I100113** | Húng lũi | Kg | 18.64 | 5.5 | **-13.14** | Sai lệch hao hụt |

*(Các mặt hàng khác như Bún nhỏ, Bắp chuối bào có chênh lệch bằng 0 - Khớp dữ liệu)*

---

## 2. Phân Tích Nguyên Nhân Gốc (Root Cause)

Qua rà soát logic tại `src/chotkho/chotkho.service.ts` và dữ liệu thực tế:

### ⚠️ A. Lỗi dồn tích Log đa kho (Trường hợp Dưa hấu -406kg)
*   **Vấn đề:** Hệ thống tính toán "Số liệu Snapshot" bằng cách lấy: `[Tồn kỳ trước] + [Tổng Nhập] - [Tổng Xuất]`.
*   **Lỗi logic:** Trong code backend, bộ lọc `khoId` đã bị lược bỏ khi tính Nhập/Xuất. 
*   **Hệ quả:** Nếu bạn đang chốt tại **KHO - HCM**, hệ thống lại đi cộng cả hàng nhập vào **KHO SG2** hoặc **LONG AN** vào con số này. Điều này khiến số "Hệ thống" vọt lên **461kg** (tổng toàn chuỗi) trong khi thực tế tại kệ chỉ có **55kg**.

### ⚠️ B. Phiếu Nhập hàng "Treo" (Trường hợp Trứng gà +43 vỉ)
*   Kiểm tra Database cho thấy có các lô hàng Trứng gà mới về.
*   **Nguyên nhân:** Nếu nhân viên nhận hàng nhưng chưa bấm **"Xác nhận đã nhận"** trên hệ thống, log tính toán sẽ không ghi nhận số lượng này vào tồn kho. Thực tế hàng đã về và được đếm (95 vỉ), nhưng hệ thống vẫn giữ số cũ (52 vỉ).

### ⚠️ C. Baseline chưa đồng bộ (Trường hợp Ớt đỏ)
*   Số hệ thống đang báo **âm (-4.3)**. Điều này xảy ra khi các đơn hàng (Xuất) được xác nhận trước khi phiếu Nhập tương ứng được đẩy vào hệ thống.
*   Khi thực hiện chốt kho 11/04, số đã được đưa về 20kg, nhưng có thể các đơn hàng ngày 12-13/04 đã trừ lùi vào mốc tính toán chưa chuẩn xác.

---

## 3. Đề Xuất Hành Động (Action Plan)

1.  **Cập nhật dữ liệu thực tế:** 
    *   Sử dụng con số **Thực tế** trong ảnh để thực hiện lệnh **"Chốt Kho"** ngay trên giao diện. 
    *   Hệ thống sẽ tự động gọi hàm `TonKho.upsert` để ghi đè (Override) toàn bộ các con số ảo này, đưa tồn kho về đúng thực tế (Vd: Dưa hấu về 55kg, Trứng gà về 95kg).

2.  **Chỉnh sửa Code Backend:**
    *   Cần khôi phục bộ lọc `khoId` trong hàm `calculateStockFromLogs` tại `chotkho.service.ts` (Dòng 40 và 53). 
    *   Việc tính Snapshot phải khớp với kho đang thực hiện chốt, không được lấy "Râu ông nọ cắm cằm bà kia" từ các kho khác.

3.  **Quy trình vận hành:**
    *   Yêu cầu bộ phận kho xác nhận Phiếu Nhập ngay khi hàng cập bến để tránh tình trạng tồn kho hệ thống bị âm hoặc thiếu hụt so với kiểm đếm.

---
**Người lập báo cáo:** Antigravity AI  
**Ngày báo cáo:** 13/04/2026  
**Dữ liệu nguồn:** `doisoat13042026.jpg` & `rausachfinal_db`
