# Báo Cáo Giải Trình Chênh Lệch Tồn Kho - Trứng gà (I100233)
**Ngày ghi nhận:** 10/04/2026 (Phân tích dữ liệu 09/04)

## 1. Thông tin sự việc
*   **Thời điểm chốt kho:** 17:03:40 09/04/2026
*   **Mã sản phẩm:** I100233
*   **Tên sản phẩm:** Trứng gà
*   **Dữ liệu quan sát:**
    *   Log chốt kho: Hệ thống: **111**, Thực tế: **72**.
    *   Bảng kiểm kê (Ảnh): Hệ thống: **49**, Thực tế: **72**.

## 2. Phân tích dữ liệu hệ thống (Trace Log)

Dưới đây là diễn biến số tồn của sản phẩm từ ngày 08/04/2026 đến thời điểm chốt kho:

| Thời gian | Loại giao dịch | Thay đổi | Số tồn | Tham chiếu | Ghi chú |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **08/04 16:45**| **Chốt kho** | | **106** | | Tồn cuối ngày 08/04 |
| 09:32 09/04 | Nhập kho | +30 | **136** | TGNCC-TF00560 | NCC: TRỨNG VĨNH THÀNH |
| 09/04 (08 đơn)| Xuất kho | -25 | **111** | Nhiều đơn | Các đơn hàng khách sỉ/lẻ |
| **17:03 09/04**| **Chốt kho** | **-39** | **72** | CHOTKHO_...82 | **Hệ thống ghi nhận 111** |

**=> Kết luận:** Con số **111** tại thời điểm chốt kho là khớp với logic tồn cuối ngày trước cộng nhập và trừ xuất trong ngày.

## 3. Đánh giá chênh lệch
*   Con số **49** trong bảng kiểm kê của người dùng chưa rõ nguồn gốc từ báo cáo nào, vì log hệ thống sạch ghi nhận là 111.
*   Chênh lệch thực tế là **-39 vỉ** (thực tế ít hơn hệ thống), có thể do hao hụt hoặc chưa ghi nhận phiếu xuất.

## 4. Tình trạng hiện tại
Số tồn của sản phẩm **Trứng gà (I100233)** hiện đã được cập nhật chính xác về mức **72 vỉ** theo số lượng thực tế kiểm kê.

---
**Người thực hiện:** Antigravity AI
**Tài liệu tham chiếu:** [thay_doi_sl_san_pham_20260408_13h.md](file:///chikiet/kata2025/rausachfinal/docs/fixbug/thay_doi_sl_san_pham_20260408_13h.md)
