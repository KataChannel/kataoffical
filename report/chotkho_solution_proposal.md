# Đề Xuất Phương Án Tối Ưu Giải Quyết Hệ Luỵ Cập Nhật Tồn Kho

Dựa trên phân tích rủi ro tại file `chotkho_analysis.md`, dưới đây là phương án kỹ thuật tốt nhất để chuẩn hoá quy trình cập nhật tồn kho qua file Excel, đảm bảo an toàn dữ liệu và tính nhất quán cho hệ thống.

## 1. Thay Đổi Tư Duy Xử Lý: "Điều Chỉnh" thay vì "Ghi Đè"

**❌ Hiện tại (Rủi ro):** Đọc file Excel -> Xoá trắng số liệu cũ -> Ghi đè số mới vào Database. 
*Hệ quả:* Mất dấu vết biến động, rủi ro mất dữ liệu nếu file Excel thiếu dòng.

**✅ Đề xuất (An toàn):** So sánh (Excel vs Hệ thống) -> Tính toán chênh lệch -> Tạo **Phiếu Kho** tự động.
*Lợi ích:* Luôn giữ được lịch sử (Ai sửa, sửa lúc nào, vì sao tăng/giảm), bảo vệ các sản phẩm không có trong file Excel.

---

## 2. Giải Pháp Kỹ Thuật Chi Tiết

### Bước 1: Bảo vệ sản phẩm không có trong file (Safe Guard)
*   Thay vì duyệt toàn bộ `allTonkho` (danh sách hệ thống), chúng ta chỉ duyệt các dòng **thực sự có trong file Excel**.
*   Nếu sản phẩm A có tồn 100 trên hệ thống nhưng lỡ bị xoá khỏi file Excel -> Hệ thống sẽ **bỏ qua**, không reset về 0 như hiện tại.

### Bước 2: Chuyển đổi sang nghiệp vụ Phiếu Kho (Audit Trail)
Thay vì sử dụng lệnh `updateOne('tonkho')` trực tiếp, mã nguồn sẽ thực hiện:
1.  Tính toán: `Chênh lệch = Số trong Excel - Số hiện tại`.
2.  Nếu `Chênh lệch > 0`: Tự động tạo một **Phiếu Nhập** với số lượng là phần dư.
3.  Nếu `Chênh lệch < 0`: Tự động tạo một **Phiếu Xuất** với số lượng là phần thiếu.
4.  Ghi chú phiếu: "Điều chỉnh tồn kho tự động qua Excel - [Ngày/Giờ]".

### Bước 3: Đồng bộ hoá Logic giữa các màn hình
*   Sử dụng chung logic "Xử lý chênh lệch" đã có bản mẫu tại màn hình `Xuất Nhập Tồn` (Component `Xuatnhapton`).
*   Việc này giúp dữ liệu Tồn kho (`slton`) được cập nhật một cách tự nhiên thông qua các giao dịch kho, bảo vệ tính toàn vẹn của logic "Tồn thực tế" (`sltontt`) đã phân tích ở Mục 1.

### 2.4. Xử lý sai sót do "Quên chứng từ" (Nhập 10, Xuất 110 nhưng quên lên đơn)

Trong tình huống thực tế: Sản phẩm A tồn 100, có nhập 10 và xuất 110 nhưng nhân viên quên lên Đơn hàng/Đặt hàng trên hệ thống, sau đó vẫn upload file Excel báo tồn bằng 0.

**Giải pháp đề xuất:**
*   **Cảnh báo chênh lệch lớn:** Hệ thống sẽ tính toán tổng biến động. Nếu phát hiện chênh lệch giữa Excel và Hệ thống vượt quá một ngưỡng nhất định (ví dụ > 50%), hệ thống sẽ yêu cầu người dùng xác nhận lại hoặc ghi chú bắt buộc.
*   **Gắn lỗi "Quên chứng từ" vào ghi chú:** Phiếu điều chỉnh tự động sẽ ghi rõ: *"Điều chỉnh tồn về 0 - Phát hiện chênh lệch 100 đơn vị so với sổ sách (Nghi vấn thiếu chứng từ Nhập/Xuất chưa lên hệ thống)"*.
*   **Thông báo xác nhận và Lưu vết (Confirmation & Logging):** Thay vì treo số liệu, hệ thống sẽ hiển thị một bảng tóm tắt các sai lệch lớn và yêu cầu người dùng xác nhận nội dung: *"Tôi đã kiểm tra các chứng từ nhập/xuất liên quan và xác nhận số liệu này là đúng"*. Thông tin về người xác nhận, thời gian và nội dung cam kết sẽ được lưu trữ kèm theo Phiếu Kho điều chỉnh để phục vụ hậu kiểm.

---

## 3. So Sánh Trước và Sau Khi Cải Tiến

| Đặc điểm | Hiện tại (Rủi ro) | Đề xuất (Tối ưu) |
| :--- | :--- | :--- |
| **Sản phẩm thiếu trong file** | Bị reset về 0 (Mất hàng) | Giữ nguyên (An toàn) |
| **Lịch sử biến động** | Không có (Mất dấu vết) | Có Phiếu Nhập/Xuất (Rõ ràng) |
| **Tính nhất quán** | Đè trực tiếp vào lõi DB | Đi qua quy trình nghiệp vụ |
| **Giá trị 0 trong file** | Ghi nhận là 0 | Ghi nhận là 0 (Đúng ý đồ người dùng) |

---

## 4. Kế Hoạch Thực Hiện (Dự kiến)

1.  **Cập nhật `nhucaudathang.component.ts`**: Thay thế vòng lặp update trực tiếp bằng logic lọc và tính toán chênh lệch.
2.  **Tích hợp `PhieukhoService`**: Gọi hàm tạo phiếu tự động thay vì update từng dòng tonkho.
3.  **Cải tiến UI**: Hiển thị bảng tổng hợp (Ví dụ: "Có 5 sản phẩm tăng, 3 sản phẩm giảm, 10 sản phẩm giữ nguyên") trước khi bấm Xác nhận/Lưu.

> **Trạng thái:** Đây mới là đề xuất giải pháp. Mã nguồn hiện tại **chưa được thay đổi** để đảm bảo an toàn cho dữ liệu đang vận hành.
