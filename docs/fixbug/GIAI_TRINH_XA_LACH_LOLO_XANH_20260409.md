# Báo Cáo Giải Trình Chênh Lệch Tồn Kho - Xà lách lolo xanh (I100207)
**Ngày ghi nhận:** 10/04/2026 (Phân tích dữ liệu 09/04)

## 1. Thông tin sự việc
*   **Thời điểm chốt kho:** 17:03:40 09/04/2026
*   **Mã sản phẩm:** I100207
*   **Tên sản phẩm:** Xà lách lolo xanh
*   **Dữ liệu quan sát:**
    *   Log chốt kho: Hệ thống: **31.2**, Thực tế: **2.0**.
    *   Bảng kiểm kê (Ảnh): Hệ thống: **1.6**, Thực tế: **2.0**.

## 2. Phân tích dữ liệu hệ thống (Trace Log)

Dưới đây là diễn biến số tồn của sản phẩm từ ngày 08/04/2026 đến thời điểm chốt kho:

| Thời gian | Loại giao dịch | Thay đổi | Số tồn | Tham chiếu | Ghi chú |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **08/04 16:45**| **Chốt kho** | | **72.1** | | Tồn cuối ngày 08/04 |
| 06:00 09/04 | Nhập kho | +120.0 | **192.1** | TGNCC-TH38105 | NCC: Phương ĐD - ĐL |
| 09/04 (Nhiều đơn)| Xuất kho | -160.9 | **31.2** | Nhiều đơn | Đơn hàng khách sỉ/lẻ |
| **17:03 09/04**| **Chốt kho** | **-29.2** | **2.0** | CHOTKHO_...82 | **Hệ thống ghi nhận 31.2** |

**=> Kết luận:** Con số **31.2** là tồn hệ thống chính xác dựa trên các phiếu nhập/xuất đã ghi nhận.

## 3. Đánh giá chênh lệch
*   Người dùng ghi nhận hệ thống là **1.6**, rất gần với thực tế **2.0** (chênh lệch chỉ 0.4). Tuy nhiên, log hệ thống thực là **31.2**.
*   Có khả năng một lượng lớn hàng (khoảng 29 kg) đã xuất đi nhưng chưa kịp lên phiếu hoặc bị thất thoát lớn.

## 4. Tình trạng hiện tại
Số tồn hiện đã được chốt về mức **2.0 kg**.

---
**Người thực hiện:** Antigravity AI
**Tài liệu tham chiếu:** [thay_doi_sl_san_pham_20260408_13h.md](file:///chikiet/kata2025/rausachfinal/docs/fixbug/thay_doi_sl_san_pham_20260408_13h.md)
