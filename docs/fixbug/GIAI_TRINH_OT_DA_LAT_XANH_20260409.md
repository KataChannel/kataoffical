# Báo Cáo Giải Trình Chênh Lệch Tồn Kho - Ớt đà lạt xanh (I100166)
**Ngày ghi nhận:** 10/04/2026

## 1. Thông tin sự việc
*   **Thời điểm chốt kho:** 17:03:40 09/04/2026
*   **Mã sản phẩm:** I100166
*   **Tên sản phẩm:** Ớt đà lạt (xanh)
*   **Dữ liệu quan sát:**
    *   Log chốt kho: Hệ thống: **10.2**, Thực tế: **8.3**.
    *   Bảng kiểm kê (Ảnh): Hệ thống: **4.3**, Thực tế: **8.3**.

## 2. Phân tích dữ liệu hệ thống (Trace Log)

| Thời gian | Loại giao dịch | Thay đổi | Số tồn | Tham chiếu | Ghi chú |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **08/04 16:45**| **Chốt kho** | | **15.98** | | Tồn cuối ngày 08/04 |
| 06:00 09/04 | Nhập kho | +10.0 | **25.98** | TGNCC-TH00201 | NCC: TIẾN ỚT CHUÔNG ĐL |
| 09/04 (Nhiều đơn)| Xuất kho | -15.78 | **10.2** | Nhiều đơn | |
| **17:03 09/04**| **Chốt kho** | **-1.9** | **8.3** | CHOTKHO_...82 | **Hệ thống ghi nhận 10.2** |

**=> Kết luận:** Hệ thống khớp con số **10.2**.

## 3. Đánh giá chênh lệch
*   Chênh lệch thực tế là **-1.9 kg**.
*   Người dùng ghi nhận hệ thống là **4.3**, trong khi log là **10.2**. Có thể báo cáo người dùng chưa cập nhật phiếu nhập 10kg sáng sớm hoặc bị lệch do các phiên chốt trước.

## 4. Tình trạng hiện tại
Số tồn đã cập nhật về **8.3 kg**.

---
**Người thực hiện:** Antigravity AI
**Tài liệu tham chiếu:** [thay_doi_sl_san_pham_20260408_13h.md](file:///chikiet/kata2025/rausachfinal/docs/fixbug/thay_doi_sl_san_pham_20260408_13h.md)
