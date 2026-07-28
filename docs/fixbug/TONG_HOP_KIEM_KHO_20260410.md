# Tổng Hợp Kết Quả Kiểm Kho & Giải Trình Chênh Lệch (10/04/2026)

Dựa trên bảng kiểm kê thực thực tế ngày 10/04/2026 (hình ảnh `solieu10042026.jpg`) và dữ liệu Trace Log hệ thống từ phiên chốt kho lúc **19:35:58 10/04/2026**, chúng tôi đã thực hiện đối soát cho 11 sản phẩm được yêu cầu.

## 1. Kết quả "Khớp số thực tế" (9 sản phẩm)
Toàn bộ 9 sản phẩm sau đây có số lượng **Thực tế** được ghi nhận trong phiên chốt kho (lúc 19:35) khớp hoàn toàn với số lượng ghi trong ảnh của người dùng.

| Mã SP | Tên Sản Phẩm | Thực tế (Ảnh) | Thực tế (DB) | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| I100233 | Trứng gà | 137 | 137 | ✅ Khớp |
| I100479 | Dưa hấu | 25 | 25 | ✅ Khớp |
| I100207 | Xà lách lolo xanh | 10.5 | 10.5 | ✅ Khớp |
| I100003 | Bắp cải trắng | 22 | 22 | ✅ Khớp |
| I100002 | Bắp cải tím | 18.5 | 18.5 | ✅ Khớp |
| I100164 | Ớt đà lạt (đỏ) | 4.5 | 4.5 | ✅ Khớp |
| I100165 | Ớt đà lạt (vàng) | 4.4 | 4.4 | ✅ Khớp |
| I100166 | Ớt đà lạt (xanh) | 12.5 | 12.5 | ✅ Khớp |
| I100113 | Húng lũi | 1.8 | 1.8 | ✅ Khớp |

## 2. Kết quả "Sản phẩm bị bỏ sót" (2 sản phẩm)
Hai sản phẩm này có mặt trong ảnh kiểm kê của người dùng nhưng **không được đưa vào** phiên chốt kho tự động (Excel) lúc 19:35. Do đó, tồn kho thực tế của chúng vẫn chưa được hệ thống cập nhật.

| Mã SP | Tên Sản Phẩm | Thực tế (Ảnh) | Tồn kho (DB) | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| I100004 | Bắp chuối bào | 0 | -4.7 | ❌ Bỏ sót |
| I100256 | Bún nhỏ | 0 | 11719.18 | ❌ Bỏ sót (Lỗi nặng) |

## 3. Phân tích "Lệch số hệ thống"
Có sự sai lệch lớn giữa con số **"Tồn Kho Hệ Thống"** trong ảnh so với con số **"Hệ Thống (Log)"** mà phần mềm tính toán được tại thời điểm chốt kho.

| Mã SP | Tên Sản Phẩm | Hệ thống (Ảnh) | Hệ thống (DB Log) | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| I100233 | Trứng gà | 186 | 39 | Lệch 147 đơn vị |
| I100479 | Dưa hấu | -91.3 | 80.6 | Sai lệch logic cộng dồn |
| I100113 | Húng lũi | 9.05 | -4.75 | |

**Nguyên nhân chính:** 
1. **Lệch baseline:** Số "Hệ thống" trong ảnh có vẻ dựa trên một báo cáo cũ hoặc báo cáo bên thứ ba chưa đồng bộ với các phiên chốt kho gần nhất.
2. **Trace Log Standardization:** Hệ thống hiện tại đang tự động tính toán lại và chuẩn hóa số lượng hệ thống dựa trên nhật ký giao dịch (Log) để làm căn cứ tính chênh lệch. Nếu số Log này âm (như trường hợp Húng lủi -4.75), điều đó có nghĩa là các phiếu xuất kho đã vượt quá lượng nhập thực tế đã ghi nhận.

## 4. Đề xuất phương án xử lý (Fixbug)
1. **Xử lý Bún nhỏ (I100256):** Tồn kho hiện tại đang ở mức bất thường (11719.18 kg). Cần tiến hành một phiên chốt kho bổ sung để đưa về 0 (theo thực tế ảnh).
2. **Xử lý Bắp chuối bào (I100004):** Thực hiện chốt kho bổ sung để đưa về 0.
3. **Đồng bộ báo cáo:** Chuyển đổi toàn bộ báo cáo hiển thị sang sử dụng Logic tính toán từ Trace Log (như `ChotkhoService` đang làm) để đảm bảo số liệu "Hệ thống" người dùng nhìn thấy luôn khớp với con số dùng để chốt kho.
4. **Kiểm tra nhập kho Húng lũi:** Đã tìm thấy một phiếu nhập 15kg vào 04:33 sáng ngày 10/04, nhưng dường như vẫn không đủ bù đắp các phiếu xuất dự kiến, dẫn đến số Log âm.

---
**Người thực hiện:** Antigravity AI
**Danh sách chi tiết:** [Thư mục fixbug](file:///chikiet/kata2025/rausachfinal/docs/fixbug/)
