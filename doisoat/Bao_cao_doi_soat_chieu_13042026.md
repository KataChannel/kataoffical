# Báo Cáo Đối Soát Dữ Liệu Tồn Kho Chiều (13/04/2026)

Báo cáo này phân tích số liệu từ ảnh đối soát **chieu13042026.jpg** so với dữ liệu thực tế trong Database (PostgreSQL `testdata`) tại thời điểm sau phiên chốt kho chiều nay.

---

## 1. Bảng Đối Soát Chi Tiết (Chiều 13/04/2026)

Dưới đây là so sánh giữa dữ liệu từ ảnh chụp màn hình và trạng thái Database hiện tại:

| Mã SP | Tên Sản Phẩm | Hệ Thống (Ảnh) | Thực Tế (Ảnh) | Chênh Lệch | Database (Hiện tại) | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **I100233** | Trứng gà | 196 | 144 | **-52** | 144 | ✅ Đã khớp thực tế |
| **I100479** | Dưa hấu | -18.5 | 18 | **+36.5** | 18 | ✅ Đã khớp thực tế |
| **I100164** | Ớt đà lạt (đỏ) | -4.2 | 3.4 | **+7.6** | 3.4 | ✅ Đã khớp thực tế |
| **I100165** | Ớt đà lạt (vàng) | 23.3 | 17.3 | **-6** | 17.3 | ✅ Đã khớp thực tế |
| **I100166** | Ớt đà lạt (xanh) | 9.3 | 10 | **+0.7** | 10 | ✅ Đã khớp thực tế |
| **I100003** | Bắp cải trắng | 7.3 | 4.6 | **-2.7** | 4.6 | ✅ Đã khớp thực tế |
| **I100002** | Bắp cải tím | 14.7 | 14.7 | **0** | 14.7 | ✅ Khớp hoàn toàn |
| **I100113** | Húng lũi | 6.54 | 1.5 | **-5.04** | 1.5 | ✅ Đã khớp thực tế |
| **I100207** | Xà lách lolo xanh| 5.6 | 0 | **-5.6** | 19.6 | ⚠️ DB đang cao hơn thực tế |
| **I100004** | Bắp chuối bào | 6.3 | 0 | **-6.3** | -4.9 | ⚠️ DB đang báo âm |
| **I100256** | Bún nhỏ | -6 | 0 | **+6** | 11726.14 | ❌ Lỗi Baseline nặng |

---

## 2. Giải Trình Các Trường Hợp Bất Thường

### ⚠️ A. Lỗi Baseline Sản Phẩm "Bún nhỏ" (I100256)
*   **Hiện trạng:** Ảnh báo thực tế 0, nhưng bảng `TonKho` trong DB đang báo **11726.14**.
*   **Nguyên nhân:** Như đã đề cập ở báo cáo ngày 11/04, sản phẩm này chưa có Baseline chuẩn (phiên chốt kho đầu tiên thành công). Các giao dịch ảo hoặc tồn đầu kỳ từ lúc khởi tạo hệ thống vẫn đang "treo" con số hàng vạn kg này.
*   **Hệ quả:** Mặc dù tại chi nhánh HCM bạn đếm là 0, nhưng con số tổng trên hệ thống vẫn bị sai lệch do rác dữ liệu từ quá khứ.

### ⚠️ B. Sai lệch sau chốt "Xà lách lolo xanh" (I100207)
*   **Vấn đề:** Ảnh chụp báo thực tế là **0**, nhưng Database hiện tại đang ghi nhận **19.6**.
*   **Phân tích:** Kiểm tra Log cho thấy phiên chốt gần nhất của sản phẩm này là ngày 11/04 (về 0). Con số 19.6 hiện tại có thể do một phiếu Nhập hàng mới được xác nhận sau khi ảnh được chụp, hoặc lỗi ghi nhận đa kho (hàng nhập kho khác nhưng hiển thị vào tổng tồn).

### ⚠️ C. Số "Hệ Thống" bị âm (Dưa hấu, Ớt đỏ, Bún nhỏ)
*   Trong ảnh, cột "Hệ thống" của Dưa hấu là **-18.5**, Ớt đỏ là **-4.2**, Bún nhỏ là **-6**.
*   **Nguyên nhân:** Đây là dấu hiệu của việc **"Xuất trước, Nhập sau"**. Nhân viên đã xác nhận giao đơn hàng (trừ tồn) trước khi phiếu Nhập hàng từ nhà cung cấp được xác nhận trên hệ thống. 

---

## 3. Kết Luận & Hành Động Đã Thực Hiện

1.  **Đồng bộ dữ liệu:** Tôi đã kiểm tra và xác nhận hầu hết các mặt hàng (8/11 sản phẩm) đã được cập nhật số thực tế vào bảng `TonKho` thông qua phiên chốt lúc **16:57 hôm nay**.
2.  **Xử lý Bún nhỏ:** Tôi kiến nghị quản trị viên chạy lệnh reset `TonKho` cho mã `I100256` về đúng 0 để xóa con số 11 nghìn kg ảo.
3.  **Khuyến nghị:** 
    *   Sử dụng đúng mốc **SNAPSHOT** (Số liệu tính toán từ log) thay vì nhìn vào số tổng tức thời trên UI để đối soát chính xác nhất.
    *   Tăng cường kiểm tra các mã sản phẩm báo âm để truy vết các phiếu Nhập chưa xác nhận.

---

**Người thực hiện:** Antigravity AI  
**Thời gian lập:** 13/04/2026 - 20:45  
**Nguồn dữ liệu:** `doisoatchieu13042026.jpg` & `Context from previous reports`
