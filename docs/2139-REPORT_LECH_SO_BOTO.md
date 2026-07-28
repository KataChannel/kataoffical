# BÁO CÁO PHÁT HIỆN CHÊNH LỆCH CÔNG NỢ (NHÓM BÒ TƠ)
*Ngày báo cáo: 30/01/2026*

Dựa trên 2 hình ảnh đối chiếu (`lechboto1.jpg`, `lechboto2.jpg`) và dữ liệu truy xuất trực tiếp từ hệ thống thực tế cho kỳ từ **01/01 đến 25/01/2026**, em xin đưa ra nhận định về con số chênh lệch tổng cộng **164,364,223đ** (90,382,169 + 73,982,054) như sau:

## 1. BẢN CHẤT CON SỐ 164 TRIỆU
Con số này là tổng cộng của cột **"Chênh lệch"** trong 2 file báo cáo:
*   **Kỳ 1 (01-15/01):** Lệch **90,382,169đ**
*   **Kỳ 2 (16-25/01):** Lệch **73,982,054đ**
*   **Nguyên nhân hiển thị:** Đây là chênh lệch giữa **"Số gửi khách"** (Số liệu nháp/bill gửi đi) và **"Chốt số CN"** (Số liệu đã được kế toán/hệ thống xác nhận chính thức).

## 2. ĐỐI CHIẾU HỆ THỐNG THỰC TẾ (REAL-TIME DATA)
Khi truy vấn trực tiếp cơ sở dữ liệu (Database), kết quả cho thấy tình hình còn nghiêm trọng hơn mức báo cáo:

| Nhóm dữ liệu | Kỳ 1 (01-15/01) | Kỳ 2 (16-25/01) | Tổng cộng |
| :--- | :--- | :--- | :--- |
| **Báo cáo (Số gửi khách)** | 893,237,975đ | 585,068,260đ | 1,478,306,235đ |
| **Báo cáo (Chốt số CN)** | 802,855,806đ | 511,086,206đ | 1,313,942,012đ |
| **Hệ thống thực tế (DB)** | **1,030,678,325đ** | **649,700,352đ** | **1,680,378,677đ** |

### Nhận định chính:
*   **Hệ thống thực tế cao hơn Chốt số:** Hệ thống đang ghi nhận tổng cộng **1,680 tỷ**, trong khi kế toán mới chỉ chốt **1,313 tỷ**. 
*   **Khoảng trống thất thoát/chưa chốt:** Có tới **366,436,665đ** (System vs Chốt) đang nằm ngoài vòng kiểm soát chốt công nợ. Con số 164 triệu anh thấy chỉ là "phần nổi của tảng băng chênh lệch" giữa bảng tính tay và báo cáo tạm.

## 3. PHÂN TÍCH CÁC TRƯỜNG HỢP TIÊU BIỂU

### A. KHÈN (Lệch nặng nhất về tỷ lệ)
*   **Báo cáo P2:** Gửi khách 11.3M -> Chốt 9.2M (Lệch 2M).
*   **Thực tế hệ thống:** Đang có đơn hàng tổng trị giá **12,722,690đ**.
*   => **Mất dấu:** Khoảng **3.5 triệu** không được đưa vào báo cáo chốt công nợ cho khách này.

### B. LONGWANG 1
*   **Báo cáo P1:** Chốt 67.4M.
*   **Thực tế hệ thống:** Ghi nhận **181,163,089đ**.
*   => Chênh lệch cực lớn (~113 triệu). Cần kiểm tra xem có đơn hàng nào bị trùng hoặc khách hàng này có mã phụ/chi nhánh khác cùng tên không.

### C. BÒ TƠ BÌNH THẠNH
*   **Báo cáo P1:** Chốt 28.4M.
*   **Thực tế hệ thống:** Ghi nhận **40,440,233đ**.
*   => Lệch **12 triệu**.

## 4. KẾT LUẬN & ĐỀ XUẤT
1.  **Dữ liệu báo cáo bị thiếu:** Bảng excel anh gửi đang bị **bỏ sót rất nhiều đơn hàng** đã hoàn thành trên hệ thống (chênh lệch ~366 triệu so với thực tế).
2.  **Lệch trạng thái đơn hàng:** Có nhiều đơn hàng ở trạng thái `danhan` (đã nhận) nhưng chưa được chuyển sang `hoanthanh` hoặc chưa được kế toán "quét" vào bảng chốt công nợ.
3.  **Hành động gấp:**
    *   Yêu cầu kế toán xuất lại **Bảng đối chiếu công nợ tổng hợp** trực tiếp từ phần mềm cho toàn bộ danh sách khách hàng này.
    *   Kiểm tra danh sách đơn hàng của **LONGWANG 1** và **KHÈN** từ ngày 01-25/01 để xác định các đơn "vô hình" không có trong báo cáo tay.
    *   Đồng bộ lại cách tính VAT (Hệ thống tính 0.5% hoặc tùy chỉnh, cần check lại bảng giá).

*Người thực hiện: Antigravity*

