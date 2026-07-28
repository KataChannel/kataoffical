# Báo Cáo Điều Tra Biến Động Tồn Kho

**Ngày báo cáo:** 08/03/2026
**Đối tượng điều tra:** Sản phẩm **Khoai Tây DL lớn (I100128)**
**Vấn đề:** Xác định nguyên nhân và người thực hiện cập nhật tồn kho về giá trị **78** vào lúc **09:08**.

---

## 1. Kết Luận Chính
Giá trị tồn kho **78** của sản phẩm I100128 là giá trị **Tồn Hệ Thống (Tồn HT)** được tính toán tự động sau một loạt giao dịch trong sáng ngày 08/03/2026. Biến động cuối cùng dẫn đến con số này xảy ra vào lúc **09:08:01**.

- **Người thực hiện:** Hệ thống tự động (Audit Log ghi nhận `User: null`).
- **Nguyên nhân:** Cập nhật trạng thái vận đơn/phiếu giao hàng mã **`TG-AA31072`**.
- **Nguồn dữ liệu:** Dữ liệu được đẩy từ hệ thống đối tác **Daiichi** (Tiêu đề: `Import daiichi - 20260307_160618`).

---

## 2. Chi Tiết Lịch Sử Biến Động (Sáng 08/03/2026)

Dựa trên truy vấn thực tế từ Database, lịch sử phiếu kho của sản phẩm I100128 trong sáng nay như sau:

| Thời gian | Mã Phiếu | Loại | Số lượng | Tồn HT Sau | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **09:08:01** | **PX-TG-AA31072** | **Xuất** | **3.0** | **78.0** | **Đã giao (Hệ thống cập nhật)** |
| 08:23:58 | PX-TG-AA31099 | Xuất | 2.0 | 81.0 | Đã giao |
| 07:46:47 | PX-TG-AA31161 | Xuất | 0.7 | 83.0 | Đã giao |
| 06:29:47 | PX-TG-AA31146 | Xuất | 2.0 | 83.7 | Đã giao |
| 05:19:04 | PX-TG-AA31147 | Xuất | 3.2 | 85.7 | Đã giao |
| 05:09:17 | PX-TG-AA31089 | Xuất | 2.6 | 88.9 | Đã giao |
| 05:06:29 | PX-TG-AA31058 | Xuất | 4.3 | 91.5 | Đã giao |
| 04:48:37 | PX-TG-AA31110 | Xuất | 1.0 | 95.8 | Đã giao |
| 04:48:14 | PX-TG-AA31109 | Xuất | 1.0 | 96.8 | Đã giao |
| **00:00:00** | **TỒN ĐẦU NGÀY** | **-** | **-** | **97.8** | **Bắt đầu ngày 08/03** |

---

## 3. Nhật Ký Hệ Thống & Truy Vết Gốc (Baseline)

### A. Nguồn gốc con số 97.8 (Đầu ngày 08/03)
Truy vết ngược lại dữ liệu lịch sử, con số 97.8 được hình thành từ các đợt nhập hàng và điều chỉnh trước đó:
- **06/03/2026 - 16:08:** Hệ thống thực hiện lệnh **NHẬP ĐIỀU CHỈNH [EXCEL] (PKNAA00015)** cộng thêm **30** đơn vị.
- Từ sau thời điểm này đến nay, sản phẩm I100128 chỉ có các lệnh **Xuất** (bán hàng phát sinh từ Import Daiichi), dẫn đến số tồn giảm dần từ ~144 về 78 như hiện tại.

### B. Nhật ký Audit Log lúc 09:08:03
Khi kiểm tra nhật ký thay đổi tại mốc thời gian **09:08:03**, hệ thống ghi nhận các cập nhật sau:
- **Thực thể:** `Phieugiao` (Mã `25e90e31-7dea-4632-9c57-5ddc2c5a7a55`)
- **Hành động:** `UPDATE` trạng thái sang `dadat` (Đã đặt/Đã giao).
- **Người dùng:** Không có (`null`) - Xác nhận đây là tiến trình tự động xử lý file Import từ đối tác Daiichi.
- **Tác động:** Khi đơn hàng `TG-AA31072` được xác nhận thành công, hệ thống tự động trừ **3.0** vào tồn kho HT của mã I100128, đưa số từ **81.0** về **78**.

---

## 4. Kiểm Tra Các Hoạt Động Của Tài Khoản `ekr2411z@gmail.com`

Vào lúc **00:00:31**, tài khoản này có thực hiện lệnh chốt kho hàng loạt qua file Excel:
- Qua phân tích Audit Log, các sản phẩm được chốt bao gồm: *Nấm linh chi, Đậu hủ trứng, Khoai tây bi, Rau củ hỗn hợp...*
- **Sản phẩm I100128 (Khoai Tây DL lớn) KHÔNG nằm trong danh sách chốt thủ công của tài khoản này.** 
- Việc mặt hàng này hiện có số tồn 78 hoàn toàn là ngẫu nhiên do kết quả trừ kho từ các đơn hàng thực tế sáng nay.

---

## 5. Đề Xuất Xử Lý

Con số **78** hiện tại là con số **Hợp lệ về mặt logic hệ thống** (đúng theo toán học dựa trên các đơn hàng đã xuất). 

Nếu thực tế kiểm kho tại bãi không khớp với con số 78 này (ví dụ: thực tế chỉ còn 70 hoặc vẫn còn 85), nguyên nhân có thể là:
1. Có đơn hàng xuất kho nhưng thực tế chưa bốc hàng đi.
2. Có đợt nhập hàng thủ công nhưng chưa được nhập vào phần mềm.

**Hướng xử lý:** 
- Thủ kho nên thực hiện lệnh **"Chốt kho thủ công"** ngay lập tức với số lượng thực tế đếm được để hệ thống bắt đầu một chu kỳ tính toán mới chính xác hơn.

---
*Báo cáo được tổng hợp bởi trợ lý AI Antigravity dựa trên phân tích trực tiếp từ Cơ sở dữ liệu và Nhật ký hệ thống.*
