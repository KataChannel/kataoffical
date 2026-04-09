# Báo Cáo Giải Trình Chênh Lệch Tồn Kho - Bắp Cải Tím (I100002)
**Ngày ghi nhận:** 09/04/2026

## 1. Thông tin sự việc
*   **Thời điểm chốt kho:** 17:03:40 09/04/2026
*   **Mã sản phẩm:** I100002
*   **Tên sản phẩm:** Bắp cải tím
*   **Dữ liệu quan sát:**
    *   Log chốt kho: Hệ thống: **11**, Thực tế: **18**.
    *   Báo cáo khác: Hệ thống: **22.5**.

## 2. Phân tích dữ liệu hệ thống (Trace Log)

Dưới đây là diễn biến số tồn của sản phẩm trong ngày 09/04/2026 tính đến thời điểm chốt kho:

| Thời gian | Loại giao dịch | Thay đổi | Số tồn | Tham chiếu | Ghi chú |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **08/04 16:45**| **Chốt kho** | | **10.42** | | Kết thúc ngày 08/04 |
| Sáng 09/04 | Xuất kho (15 đơn) | -17.12 | **-6.70** | Nhiều đơn | Các đơn hàng đi sớm |
| 14:17 09/04 | Nhập kho | +20.00 | **13.30** | TGNCC-TH00036 | NCC ANH VĂN L2.1 |
| Chiều 09/04 | Xuất kho (2 đơn) | -2.30 | **11.00** | TG-AA36234... | |
| **17:03 09/04**| **Chốt kho** | **+7.00** | **18.00** | CHOTKHO_...82 | **Hệ thống ghi nhận 11** |

**=> Kết luận:** Con số **11** tại thời điểm chốt kho là khớp với logic trừ tồn và nhập kho thực tế trong ngày.

## 3. Giải thích con số 22.5
Con số **22.5** mà người dùng nhìn thấy có khả năng cao là do sự nhầm lẫn hoặc lỗi cộng dồn trong báo cáo:
*   **Cộng dồn phiên chốt:** Lúc 16:44 ngày **08/04**, số tồn hệ thống là **11.5**.
*   `11.5 (Hệ thống 08/04) + 11.0 (Hệ thống 09/04) = 22.5`.
*   **Trùng hợp lịch sử:** Vào ngày **01/04/2026**, hệ thống cũng từng ghi nhận số tồn đúng bằng **22.5** trước khi chốt kho.

## 4. Tình trạng hiện tại
Số tồn của sản phẩm **Bắp cải tím (I100002)** hiện đã được cập nhật chính xác về mức **18.0 kg** (theo số lượng thực tế kiểm kê).

---
**Người thực hiện:** Antigravity AI
**Tài liệu tham chiếu:** [thay_doi_sl_san_pham_20260408_13h.md](file:///chikiet/kata2025/rausachfinal/docs/fixbug/thay_doi_sl_san_pham_20260408_13h.md)
