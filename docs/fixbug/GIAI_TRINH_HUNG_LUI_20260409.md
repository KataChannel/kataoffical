# Báo Cáo Giải Trình Chênh Lệch Tồn Kho - Húng lủi (I100113)
**Ngày ghi nhận:** 10/04/2026

## 1. Thông tin sự việc
*   **Thời điểm chốt kho:** 17:03:40 09/04/2026
*   **Mã sản phẩm:** I100113
*   **Tên sản phẩm:** Húng lủi
*   **Dữ liệu quan sát:**
    *   Log chốt kho: Hệ thống: **5.3**, Thực tế: **2.9**.
    *   Bảng kiểm kê (Ảnh): Hệ thống: **6.34**, Thực tế: **2.9**.

## 2. Phân tích dữ liệu hệ thống (Trace Log)

| Thời gian | Loại giao dịch | Thay đổi | Số tồn | Tham chiếu | Ghi chú |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **08/04 16:45**| **Chốt kho** | | **2.86** | | Tồn cuối ngày 08/04 |
| 06:00 09/04 | Nhập kho | +10.0 | **12.86** | TGNCC-TH00924 | NCC: Hương ĐL |
| 09/04 (35 đơn)| Xuất kho | -7.56 | **5.30** | Nhiều đơn | |
| **17:03 09/04**| **Chốt kho** | **-2.4** | **2.9** | CHOTKHO_...82 | **Hệ thống ghi nhận 5.3** |

**=> Kết luận:** Logic hệ thống khớp con số **5.3**.

## 3. Đánh giá chênh lệch
*   Chênh lệch thực tế là **-2.4 kg**.
*   Con số **6.34** trong báo cáo người dùng thực chất là số tồn "Trước" khi chốt kho của phiên ngày 08/04 (**-6.34**), cho thấy báo cáo người dùng có thể đang lấy dữ liệu cũ hoặc bị nhầm lẫn giá trị tuyệt đối.

## 4. Tình trạng hiện tại
Số tồn đã về **2.9 kg**.

---
**Người thực hiện:** Antigravity AI
**Tài liệu tham chiếu:** [thay_doi_sl_san_pham_20260408_13h.md](file:///chikiet/kata2025/rausachfinal/docs/fixbug/thay_doi_sl_san_pham_20260408_13h.md)
