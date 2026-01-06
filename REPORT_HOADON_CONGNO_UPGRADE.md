# BÁO CÁO CẢI TIẾN HỆ THỐNG QUẢN LÝ CÔNG NỢ & HÓA ĐƠN

## 1. Tình trạng trước khi nâng cấp

Hệ thống Rausach V3 được đánh giá có nền tảng quản lý công nợ tốt (8.5/10) dựa trên cơ chế đối soát theo từng đơn hàng (`Invoice-based`). Tuy nhiên, qua quá trình rà soát, chúng tôi phát hiện một "điểm nghẽn" lớn khi vận hành thực tế:

*   **Ràng buộc cứng nhắc**: Hóa đơn điện tử (`HoaDonDienTu`) luôn bị buộc phải khớp 100% với Đơn hàng (`Donhang`).
*   **Xung đột nghiệp vụ**: Khi đối tác yêu cầu xuất hóa đơn lệch so với thực tế giao hàng (ví dụ mua 100kg nhưng chỉ muốn xuất HD 1kg hoặc ngược lại), kế toán buộc phải sửa số liệu trên Đơn hàng.
*   **Hệ lụy**: Việc sửa đơn hàng để "chiều" theo hóa đơn làm **sai lệch hoàn toàn báo cáo Công nợ** (mất tiền nợ thực) và **sai lệch Tồn kho** (không khớp số lượng xuất kho thực tế).

---

## 2. Giải pháp đã triển khai (Decoupling Architecture)

Để giải quyết vấn đề trên, chúng tôi đã tiến hành nâng cấp hệ thống theo hướng **tách biệt luồng Vận hành và luồng Tài chính**.

### A. Thay đổi cấu trúc dữ liệu (Schema)
*   **Model mới `HoaDonDienTuDetail`**: Lưu trữ chi tiết các mặt hàng xuất hiện trên hóa đơn một cách độc lập. Các trường thông tin bao gồm: `tenSanPham`, `maSanPham`, `soluong`, `dongia`, `vat`, `thanhtien`.
*   **Cơ chế Snapshot**: Lưu lại toàn bộ thông tin sản phẩm tại thời điểm xuất hóa đơn, tránh việc hóa đơn bị thay đổi khi danh mục sản phẩm được cập nhật sau này.

### B. Nâng cấp Logic nghiệp vụ (Service)
*   **Chế độ linh hoạt**: API tạo hóa đơn giờ đây chấp nhận tham số `details`. Nếu kế toán truyền vào danh sách sản phẩm tùy chỉnh, hệ thống sẽ ưu tiên dùng số liệu này để in hóa đơn.
*   **Tính toán tổng tiền riêng**: Tổng tiền hóa đơn được tính toán dựa trên chi tiết hóa đơn thực xuất, không còn lấy trực tiếp từ tổng đơn hàng.
*   **Bảo toàn công nợ**: Giá trị thực tế của đơn hàng (dùng để thu tiền khách) và trừ kho vẫn giữ nguyên theo biên bản giao nhận, không bị ảnh hưởng bởi số liệu trên hóa đơn.

---

## 3. Kết quả xử lý các tình huống thực tế

Dựa trên yêu cầu của đối tác, hệ thống mới xử lý như sau:

| Tình huống | Dữ liệu Đơn hàng (Kho & Công nợ) | Dữ liệu Hóa đơn (Thuế/Đối tác) | Kết quả |
| :--- | :--- | :--- | :--- |
| **Giao 100kg - Xuất HD 1kg** | Ghi nhận xuất 100kg, khách nợ tiền 100kg. | Hiển thị 1kg, tổng tiền tương ứng 1kg. | **Thành công**: Công nợ đúng, Hóa đơn đúng ý khách. |
| **Giao 10kg - Xuất HD 50kg** | Ghi nhận xuất 10kg, khách nợ tiền 10kg. | Hiển thị 50kg, tổng tiền tương ứng 50kg. | **Thành công**: Không làm ảo tồn kho, không gây nợ ảo. |
| **Thay đổi đơn giá HD** | Tính nợ theo giá bán thực tế. | Xuất hóa đơn theo giá thỏa thuận riêng. | **Thành công**: Linh hoạt trong đàm phán giá với đối tác. |

---

## 4. Các tệp tin đã cập nhật

1.  `api/prisma/schema.prisma`: Thêm model `HoaDonDienTuDetail` và các mối quan hệ.
2.  `api/src/hoadon/dto/hoadon.dto.ts`: Cập nhật DTO để hỗ trợ truyền chi tiết hóa đơn tùy chỉnh.
3.  `api/src/hoadon/hoadon.service.ts`: Nâng cấp logic tạo, tìm kiếm và duyệt hóa đơn với cơ chế tách biệt số liệu.

---
**Kết luận**: Hệ thống hiện tại đã sẵn sàng để đáp ứng mọi yêu cầu khắt khe từ đối tác về việc xuất hóa đơn mà vẫn đảm bảo tính chính xác tuyệt đối của số liệu Công nợ và Tồn kho của công ty.
