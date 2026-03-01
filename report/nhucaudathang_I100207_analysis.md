# Báo Cáo Phân Tích Nhu Cầu Đặt Hàng - Mã I100207 (Xà lách lolo xanh)
**Ngày báo cáo:** 01/03/2026  
**Mã sản phẩm:** I100207  
**Tên sản phẩm:** Xà lách lolo xanh  
**Trạng thái:** DƯ TỒN KHO HỆ THỐNG

---

## 1. Tóm tắt số liệu từ hình ảnh
Dựa trên phân tích hình ảnh và đối soát mã nguồn (`nhucaudathang.component.ts`), kết quả ghi nhận như sau:

| Chỉ số | Giá trị | Giải trình ý nghĩa |
| :--- | :--- | :--- |
| **Bán chưa giao (`khachdat`)** | **0** | Không có đơn hàng nào từ khách đang chờ xử lý. |
| **Tồn Chốt Kho (`sltontt`)** | **0** | Số lượng thực tế tại kho chính sau lần kiểm kê cuối. |
| **Kho Nhánh (`kho1 & kho3`)** | **220** | Số lượng tồn tại các kho TG-LONG AN (140) và TG-ĐÀ LẠT (80). |
| **Tổng tồn (`tongkho`)** | **220** | Tính bằng: `Sltontt (0) + Tổng tồn các kho nhánh (220)`. |
| **Tỉ lệ Hao hụt (`haohut`)** | **20%** | Phần trăm hao hụt dự kiến khi nhập/lưu kho. |
| **Gợi ý đặt hàng (`goiy`)** | **(220)** | Kết quả tính toán: `-220`. Hiển thị màu cam cảnh báo dư hàng. |

---

## 2. Phân tích logic tính toán
Hệ thống sử dụng công thức sau để đưa ra gợi ý đặt hàng:
> **Gợi ý = (Nhu cầu khách + SL Hao hụt) - Tổng tồn**

**Áp dụng cho I100207:**
- Nhu cầu khách = 0
- SL Hao hụt = 0 (do không có nhu cầu khách: 0 * 20% = 0)
- Tổng tồn = 220
- **Kết quả:** `(0 + 0) - 220 = -220`

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
