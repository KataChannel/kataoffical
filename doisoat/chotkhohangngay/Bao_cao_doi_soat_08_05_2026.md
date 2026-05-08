# Báo cáo Đối soát Kho & Luồng Vận hành (08/05/2026)

## 1. Thông tin chung
- **Lần chốt kho gốc:** Chốt kho Base Line 07-05-2026 (2026-05-07T16:59:59.000Z)
- **Thời điểm đối soát:** 2026-05-08T11:37:21.610Z
- **File Excel thực tế:** `Ton-Huy 8-5.xlsx`

## 2. Luồng vận hành trong ngày
| Chỉ số | Số lượng |
| :--- | :--- |
| Đơn hàng bán (Sales Orders) | 169 |
| Đơn đặt hàng NCC (Purchase Orders) | 61 |
| Phiếu kho lẻ (Internal Vouchers) | 231 |

## 3. Phân tích Chênh lệch (Top các mã biến động mạnh)
*Công thức: Expected = Tồn đầu + Nhập NCC + Nhập lẻ - Xuất lẻ - Bán hàng*

| Mã SP | Tên Sản phẩm | Tồn đầu | Nhập | Bán | Hủy (Excel) | **Expected** | **Thực tế (Excel)** | **Lệch** |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| I100275 | Trứng vịt muối | 350 | 300 | 190 | 0 | **270** | **520** | **+250** |
| I100260 | Đậu hủ miếng trắng | 0 | 193 | 193 | 0 | **-193** | **0** | **+193** |
| I100738 | Nấm kim châm gói (200g) | 0 | 0 | 74 | 0 | **-148** | **0** | **+148** |
| I100207 | Xà lách lolo xanh | 64 | 120.15 | 164.7 | 19 | **-145.25** | **0** | **+145.25** |
| I100039 | Cà rốt | 42 | 94 | 131.6 | 2.6 | **-127.2** | **0** | **+127.2** |
| I100051 | Cải thảo | 0 | 157 | 136.20000000000005 | 13 | **-115.4** | **0** | **+115.4** |
| I100101 | Hành tây | 410 | 10 | 136.20000000000002 | 0 | **147.6** | **260** | **+112.4** |
| I100024 | Bông cải xanh | 16 | 51 | 75.69999999999999 | 0 | **-84.4** | **10** | **+94.4** |
| I100003 | Bắp cải trắng | 27 | 87.85 | 102.10000000000001 | 5 | **-89.35** | **3** | **+92.35** |
| I100067 | Củ cải trắng (Loại 1) | 0 | 91.1 | 89.19999999999999 | 0.4 | **-87.3** | **0** | **+87.3** |
| I100263 | Đậu hủ trứng Ichiban | 0 | 91 | 89 | 0 | **-87** | **0** | **+87** |
| I100089 | Dưa leo | 2 | 97.7 | 90.7 | 4 | **-81.7** | **5** | **+86.7** |
| I100098 | Hành lá | 0 | 78.5 | 77.89999999999999 | 0 | **-77.3** | **0** | **+77.3** |
| I100479 | Dưa hấu | 468 | 0 | 76.99999999999999 | 0 | **314** | **390** | **+76** |
| I100008 | Bắp mỹ trái (Loại 1) | 851 | 0 | 213 | 0 | **425** | **490** | **+65** |
| I100060 | Chanh không hạt | 85 | 0 | 66.19999999999999 | 0 | **-47.4** | **15** | **+62.4** |
| I100128 | Khoai Tây DL lớn | 14 | 30 | 42.9 | 2 | **-41.8** | **17** | **+58.8** |
| I100270 | Trứng bắc thảo | 168 | 100 | 58 | 0 | **152** | **210** | **+58** |
| I100209 | Xà lách romain | 2 | 81 | 60.50000000000001 | 0 | **-38** | **19** | **+57** |
| I100016 | Bí ngòi xanh | 21.5 | 60 | 52.65 | 0 | **-23.8** | **30** | **+53.8** |
| I100052 | Cải thìa | 0 | 60 | 55.8 | 1 | **-51.6** | **0** | **+51.6** |
| I100256 | Bún nhỏ | 0 | 51.5 | 51.5 | 0 | **-51.5** | **0** | **+51.5** |
| I100151 | Mướp hương | 6 | 41 | 48.8 | 1.2 | **-50.6** | **0** | **+50.6** |
| I100274 | Trứng vịt | 0 | 50 | 20 | 0 | **10** | **60** | **+50** |
| I100034 | Cà chua | 43 | 60 | 53.9 | 0.7 | **-4.8** | **45** | **+49.8** |
| I100007 | Bắp mỹ kg Lột Vỏ | 0 | 0 | 24.9 | 0 | **-49.8** | **0** | **+49.8** |
| I100216 | Tắc trái | 3 | 50 | 49.5 | 0 | **-46** | **0** | **+46** |
| I100010 | Bầu xanh | 2.5 | 40 | 41.8 | 0 | **-41.1** | **0** | **+41.1** |
| I100241 | Nấm linh chi đen (125g) | 40 | 96 | 48 | 0 | **40** | **80** | **+40** |
| I100075 | Đậu bắp | 1 | 39.28 | 39.69999999999999 | 0.5 | **-39.12** | **0** | **+39.12** |
| I100018 | Bó xôi (Nhà Lồng) | 0 | 45 | 42 | 0 | **-39** | **0** | **+39** |
| I100232 | Tỏi xay | 0 | 0 | 19.3 | 0 | **-38.6** | **0** | **+38.6** |
| I100295 | Bánh phồng tôm | 0 | 40 | 39 | 0 | **-38** | **0** | **+38** |
| I100135 | Lá chuối | 6 | 30 | 36 | 0.5 | **-36** | **0.2** | **+36.2** |
| I100097 | Củ Gừng | 12 | 20 | 28.1 | 0 | **-24.2** | **11** | **+35.2** |
| I100186 | Rau muống lá | 2 | 50 | 39.3 | 4 | **-26.6** | **8** | **+34.6** |
| I100468 | Cam tươi | 16.8 | 30 | 35.2 | 0 | **-23.6** | **11** | **+34.6** |
| I100242 | Nấm linh chi trắng - hộp (125g) | 53 | 96 | 41 | 0 | **67** | **101** | **+34** |
| I100118 | Khổ qua | 9 | 23 | 33 | 0.5 | **-34** | **0** | **+34** |
| I100198 | Sả cây | 2.8 | 40 | 35.800000000000004 | 0 | **-28.8** | **4.2** | **+33** |


## 4. Nguyên nhân chênh lệch tiêu biểu
- **Chưa ghi nhận Nhập hàng:** Các mã như Trứng vịt muối, Đậu hủ miếng trắng, Nấm kim châm gói (200g), Xà lách lolo xanh, Cà rốt, Cải thảo, Hành tây, Bông cải xanh, Bắp cải trắng, Củ cải trắng (Loại 1), Đậu hủ trứng Ichiban, Dưa leo, Hành lá, Dưa hấu, Bắp mỹ trái (Loại 1), Chanh không hạt, Khoai Tây DL lớn, Trứng bắc thảo, Xà lách romain, Bí ngòi xanh, Cải thìa, Bún nhỏ, Mướp hương có tồn thực tế cao hơn hệ thống. Có thể hàng đã về kho nhưng kế toán/kho chưa xác nhận phiếu nhập.

## 5. Kiến nghị vận hành
1. **Cập nhật phiếu Hủy:** Toàn bộ số lượng trong cột "HỦY" của file Excel cần được nhập vào hệ thống ngay lập tức.
2. **Xác nhận Nhập hàng:** Kiểm tra lại các mã có Lệch dương (+) để xem có phiếu nhập nào đang ở trạng thái "Chờ" không.
3. **Mãng cầu xiêm:** Mã này không xuất hiện trong file kiểm kho hôm nay nhưng hệ thống vẫn báo tồn. Cần xác minh xem mã này còn hàng thực tế không.

## 6. Phụ lục: Audit Đơn hàng (Phát hiện bất thường)

### 6.1. Đơn hàng có dấu hiệu trùng lặp
Phát hiện **4 nhóm** đơn hàng có cùng Khách hàng, Ngày giao và Tổng tiền. Phân tích Audit Log cho thấy đây là **Lỗi con người (Human Error)**:

- **Nhà hàng Hoa Lộc Vừng (28/11/2025):** `TG-AA14740` và `TG-AA14741` (65,520đ).
    - **Người thực hiện:** **Võ Thị Bích Dung** (`dv949723@gmail.com`).
    - **Phân tích:** Đơn thứ nhất tạo lúc 09:03, đơn thứ hai tạo lúc 09:16 (**cách nhau 12 phút**).
- **Hoàng Yến Vietnamese Cuisine - PMH (12/10/2025):** `TG-AA06936` và `TG-AA06940` (33,600đ).
    - **Phân tích:** Hai đơn tạo cách nhau **1 giờ 48 phút**.
- **Hồng Kông Hội Quán (29/09/2025):** `TG-AA04832` và `TG-AA04833` (3,800đ).
    - **Phân tích:** Hai đơn tạo cách nhau **10 phút**.
- **LONGWANG 3 (24/09/2025):** `TG-AA04024` và `TG-AA04026` (230,000đ).
    - **Phân tích:** Hai đơn tạo cách nhau **30 phút**.

**Kết luận:** Khoảng cách thời gian lớn (từ 10 phút đến gần 2 tiếng) và nội dung giống hệt nhau khẳng định nhân viên đã thao tác nhập trùng thủ công, không phải lỗi hệ thống (click đúp). Các đơn này đều đang ở trạng thái `danhan`, cần được xử lý hủy đơn ảo để khớp tồn kho.

### 6.2. Đơn hàng có "Mã lệch" (Sai logic trạng thái)
Phát hiện **18 đơn hàng** đã bị Hủy (`status: huy`) nhưng vẫn đang được đánh dấu là `isActive: true`. Điều này gây sai lệch khi tính toán tồn kho "chờ giao".
- Các mã tiêu biểu: `TG-AA40898`, `TG-AA22139`, `TG-AA13257`, `TG-AA09048`, `TG-AA10493`, `TG-AA12383`, `TG-AA15780`, `TG-AA08892`, `TG-AA08893`, `TG-AA16993`, `TG-AA16994`...

---
*Báo cáo được tổng hợp tự động bởi hệ thống Audit Kho.*
