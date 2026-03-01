# Báo Cáo Phân Tích Nhu Cầu Đặt Hàng - Mã I100207 (Xà lách lolo xanh)
**Ngày báo cáo:** 01/03/2026  
**Mã sản phẩm:** I100207  
**Tên sản phẩm:** Xà lách lolo xanh  
**Trạng thái:** DƯ TỒN KHO HỆ THỐNG

---

## 1. Tóm tắt số liệu từ hình ảnh
Dựa trên phân tích hình ảnh và đối soát mã nguồn (`nhucaudathang.component.ts`), kết quả ghi nhận như sau:

| Chỉ số | Giá trị | Giải trình chi tiết cho Quản lý kho |
| :--- | :--- | :--- |
| **Nợ phiếu (Lũy kế)** | **-250** | Tổng lượng hàng đã xuất nhưng chưa có phiếu nhập đối ứng (từ quá khứ dồn lại). |
| **Bán trong phiên (`khachgiao`)** | **274** | Tổng lượng hàng đã giao thực tế trong khoảng thời gian đang xem. |
| **Tồn/Nhập ban đầu (`tongkho`)** | **220** | Hàng hiện có tại các kho nhánh (140 + 80) dùng để xuất bán. |
| **Đúng thực tế (Phiên)** | **-54** | Tính bằng: `Hàng có (220) - Bán (274)`. Phản ánh đúng số lượng thực tế kho đang "nợ" khách của riêng phiên này. |
| **Gợi ý đặt hàng (`goiy`)** | **(220)** | Kết quả nhu cầu: `-220`. Cảnh báo DƯ HÀNG do cộng thêm tỉ lệ hao hụt. |

---

## 2. Giải trình theo yêu cầu của Quản lý Kho
Hệ thống hiện đã tách minh bạch hai con số để anh quản lý dễ theo dõi:

1.  **Con số -250 (Nợ phiếu - Lũy kế):** Đây là con số "nợ" dồn từ quá khứ do quy trình nhập liệu chưa khớp (xuất nhiều hơn nhập trên máy).
2.  **Con số -54 (Đúng thực tế - Phiên):** Đây là số liệu chu chuyển trong phiên làm việc hiện tại. 
    *   *Công thức:* `Hàng khả dụng đầu phiên (220) - Hàng đã xuất bán (274) = -54`.
    *   Con số này giúp anh xác nhận nhanh: Nếu hiện tại anh chưa nhập thêm hàng từ nguồn nào khác, thì thực tế kho đang âm 54kg so với thời điểm bắt đầu phiên.
3.  **Real-time:** Mọi thao tác xuất bán đều được trừ ngay lập tức vào cả hai con số này để đảm bảo dữ liệu luôn mới nhất tại thời điểm anh xem.

### Tại sao hiển thị màu cam kèm dấu ngoặc (220)?
Theo mã nguồn tại dòng 392-399 (file `.html`), khi giá trị gợi ý âm quá 100 đơn vị (`goiy < -100`), hệ thống sẽ kích hoạt trạng thái **Cảnh báo tồn kho quá cao**. Mục đích là để người quản lý biết rằng lượng hàng dư thừa đang vượt mức an toàn, tránh đặt thêm hàng gây lãng phí.

---

## 3. Đánh giá sự sai lệch hệ thống
Trong hình ảnh có xuất hiện số liệu âm tại cột **Tồn Hệ Thống (-250)** và **Chênh lệch (-249.6)**:
- **Nguyên nhân:** Có thể do lỗi đồng bộ dữ liệu tự động hoặc quy trình nhập/xuất trước đó chưa chuẩn.
- **Xử lý:** Logic code hiện tại (danh mục `loadDonhangWithRelations` trong Service) đã **chủ động loại bỏ** con số -250 này để không làm sai lệch dự báo. Hệ thống chỉ sử dụng số **Tồn chốt thực tế (0)** và **Kho nhánh (220)** làm căn cứ tính toán.

---

## 4. Kết luận và Kiến nghị
1. **Số liệu hiển thị là CHÍNH XÁC** theo logic vận hành của phần mềm.
2. **Khuyến nghị:** Tuyệt đối không đặt thêm mã hàng **I100207** tại thời điểm này vì đang dư 220 đơn vị.
3. **Ghi chú:** Cần kiểm tra lại các giao dịch cũ dẫn đến con số âm -250 ở "Tồn hệ thống" để chuẩn hóa lại dữ liệu (tuy nhiên logic gợi ý đặt hàng hiện tại đã an toàn vì không dựa trên số liệu này).

---
*Tài liệu được khởi tạo tự động bởi hệ thống phân tích Antigravity.*
