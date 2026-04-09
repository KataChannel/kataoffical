# Báo Cáo Giải Trình Chênh Lệch Tồn Kho - Dưa hấu (I100479)
**Ngày ghi nhận:** 10/04/2026 (Phân tích dữ liệu 09/04)

## 1. Thông tin sự việc
*   **Thời điểm chốt kho:** 17:03:40 09/04/2026
*   **Mã sản phẩm:** I100479
*   **Tên sản phẩm:** Dưa hấu
*   **Dữ liệu quan sát:**
    *   Log chốt kho: Hệ thống: **301**, Thực tế: **204**.
    *   Bảng kiểm kê (Ảnh): Hệ thống: **111**, Thực tế: **204**.

## 2. Phân tích dữ liệu hệ thống (Trace Log)

Dưới đây là diễn biến số tồn của sản phẩm từ ngày 08/04/2026 đến thời điểm chốt kho:

| Thời gian | Loại giao dịch | Thay đổi | Số tồn | Tham chiếu | Ghi chú |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **08/04 16:45**| **Chốt kho** | | **397.9**| | Tồn cuối ngày 08/04 |
| 09/04 (16 đơn)| Xuất kho | -96.9 | **301.0**| Nhiều đơn | Các đơn hàng khách sỉ |
| **17:03 09/04**| **Chốt kho** | **-97.0**| **204.0**| CHOTKHO_...82 | **Hệ thống ghi nhận 301** |

**=> Kết luận:** Tồn hệ thống **301 kg** là con số chính xác theo logic trừ tồn các phiếu xuất trong ngày.

## 3. Đánh giá chênh lệch
*   Con số **111** trong bảng kiểm kê của người dùng có sự sai khác lớn với log hệ thống (301).
*   Chênh lệch điều chỉnh thực tế là **-97 kg**. Đây là mặt hàng hoa quả có trọng lượng lớn mỗi đơn vị, cần kiểm tra lại việc cân hàng hoặc ghi nhận phiếu xuất sỉ.

## 4. Tình trạng hiện tại
Số tồn của sản phẩm **Dưa hấu (I100479)** hiện đã được cập nhật về mức **204.0 kg**.

---
**Người thực hiện:** Antigravity AI
**Tài liệu tham chiếu:** [thay_doi_sl_san_pham_20260408_13h.md](file:///chikiet/kata2025/rausachfinal/docs/fixbug/thay_doi_sl_san_pham_20260408_13h.md)
