# Tổng Hợp Kết Quả Kiểm Kho & Giải Trình Chênh Lệch (09/04/2026)

Dựa trên bảng kiểm kê thực tế ngày 09/04/2026 và dữ liệu Trace Log hệ thống, chúng tôi đã thực hiện đối soát cho toàn bộ 11 sản phẩm.

## 1. Danh sách sản phẩm "Khớp số thực tế"
Tất cả sản phẩm trong danh sách đều có số lượng **Thực tế** được ghi nhận trong bảng kiểm kê khớp hoàn toàn với số lượng **Thực tế** được hệ thống chốt tại phiên lúc 17:03:40 09/04/2026.

| Mã SP | Tên Sản Phẩm | Thực tế (Ảnh) | Thực tế (Log) | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| I100233 | Trứng gà | 72 | 72 | ✅ Khớp |
| I100479 | Dưa hấu | 204 | 204 | ✅ Khớp |
| I100207 | Xà lách lolo xanh | 2 | 2 | ✅ Khớp |
| I100003 | Bắp cải trắng | 9 | 9 | ✅ Khớp |
| I100002 | Bắp cải tím | 18 | 18 | ✅ Khớp |
| I100164 | Ớt đà lạt (đỏ) | 0.8 | 0.8 | ✅ Khớp |
| I100165 | Ớt đà lạt (vàng) | 3.18 | 3.18 | ✅ Khớp |
| I100166 | Ớt đà lạt (xanh) | 8.3 | 8.3 | ✅ Khớp |
| I100004 | Bắp chuối bào | 0 | 0 | ✅ Khớp |
| I100256 | Bún nhỏ | 0 | 0 | ✅ Khớp |
| I100113 | Húng lũi | 2.9 | 2.9 | ✅ Khớp |

## 2. Danh sách sản phẩm "Lệch số hệ thống"
Toàn bộ sản phẩm đều có sự sai lệch giữa con số **Hệ thống** mà người dùng nhìn thấy trên báo cáo (trong ảnh) so với con số **Hệ thống** thực tế ghi nhận trong log giao dịch.

| Mã SP | Tên Sản Phẩm | Hệ thống (Ảnh) | Hệ thống (Log) | Chênh lệch (Thực - Hệ Log) |
| :--- | :--- | :--- | :--- | :--- |
| I100233 | Trứng gà | 49 | 111 | -39 |
| I100479 | Dưa hấu | 111 | 301 | -97 |
| I100207 | Xà lách lolo xanh | 1.6 | 31.2 | -29.2 |
| I100003 | Bắp cải trắng | -2.5 | 30.5 | -21.5 |
| I100002 | Bắp cải tím | 22.5 | 11 | +7 |
| I100164 | Ớt đà lạt (đỏ) | -6.4 | 11 | -10.2 |
| I100165 | Ớt đà lạt (vàng) | -0.12 | 3.6 | -0.42 |
| I100166 | Ớt đà lạt (xanh) | 4.3 | 10.2 | -1.9 |
| I100004 | Bắp chuối bào | 8.3 | 7.8 | -7.8 |
| I100256 | Bún nhỏ | 36.5 | 38.5 | -38.5 |
| I100113 | Húng lũi | 6.34 | 5.3 | -2.4 |

## 3. Tổng kết nguyên nhân
1.  **Chênh lệch hệ thống:** Các con số "Hệ thống" trong bảng ảnh của người dùng thường bị lệch do:
    *   Lấy nhầm dữ liệu từ các phiên chốt kho cũ (ví dụ: Húng lủi lấy số 6.34 từ 08/04).
    *   Báo cáo chưa cộng dồn kịp các phiếu nhập kho sáng sớm hoặc xuất kho chiều muộn.
    *   Lỗi hiển thị giá trị tuyệt đối hoặc sai lệch logic cộng dồn của báo cáo bên thứ ba.
2.  **Khớp số thực tế:** Toàn bộ dữ liệu kiểm kê thực tế đã được cập nhật chính xác vào hệ thống thông qua phiên chốt kho lúc 17:03 ngày 09/04.

---
**Người thực hiện:** Antigravity AI
**Danh sách chi tiết:** [Thư mục fixbug](file:///chikiet/kata2025/rausachfinal/docs/fixbug/)
