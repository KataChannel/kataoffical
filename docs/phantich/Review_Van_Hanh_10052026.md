# Báo Cáo Đánh Giá Vận Hành Kho (Sau Chốt Kho 09/05/2026)

**Ngày thực hiện:** 10/05/2026 (12:45)
**Phạm vi:** Đối soát dữ liệu từ lần chốt kho gần nhất (**09/05/2026 23:59**) đến hiện tại.
**Mục tiêu:** Đánh giá độ ổn định của hệ thống sau khi Baseline và phát hiện các lỗi phát sinh trong ngày.

---

## 1. Tóm Lược Hoạt Động (Executive Summary)

Trong nửa ngày vận hành (từ 00h00 đến 12h45 ngày 10/05), hệ thống ghi nhận các chỉ số sau:

| Loại hình | Số lượng | Trạng thái |
| :--- | :---: | :--- |
| **Đơn hàng bán ra (Out)** | 157 | Đã xác nhận/Đã giao |
| **Đơn nhập hàng (In)** | 60 | Đã nhận |
| **Phiếu kho phát sinh** | 217 | Bao gồm cả phiếu xuất tự động |
| **Sản phẩm có biến động** | 285 | ~28% danh mục sản phẩm |

---

## 2. Các Vấn Đề Kỹ Thuật Phát Hiện

### 2.1. Lỗi Mất Liên Kết Dữ Liệu (Traceability Gap)
Hệ thống phát hiện **157 đơn hàng** mặc dù đã hoàn thành nhưng trường liên kết `madonhang` trong bảng `PhieuKho` bị để trống (`null`).
- **Dấu hiệu:** Cột `maphieu` có dữ liệu (Ví dụ: `PX-TG-AA41235`) nhưng không truy vấn được bằng mã đơn hàng.
- **Nguyên nhân:** Lỗi logic trong hàm tạo phiếu xuất tự động khi chuyển trạng thái đơn hàng.
- **Hệ quả:** Gây khó khăn cho việc đối soát tự động và kiểm tra lịch sử biến động của từng đơn hàng.

### 2.2. Tình Trạng Tồn Kho Âm (Negative Stock)
Hiện có **27 mã sản phẩm** đã rơi vào tình trạng âm tồn ngay sau khi Baseline 12 giờ:
- **Top 3 mã âm lớn nhất:**
    - **Húng quế (I100114):** -5.5 kg
    - **Lá chuối (I100135):** -2.3 kg
    - **Lá sen tươi (I100141):** -2.0 kg
- **Nhận định:** Tốc độ xuất kho đang nhanh hơn tốc độ ghi nhận nhập kho thực tế, hoặc định mức hao hụt chưa được tính toán đúng.

---

## 3. Rủi Ro Hệ Thống: Lạm Phát Dự Phòng (Ghost Reservations)

Vấn đề dự phòng hàng (`slchogiao`) đang có xu hướng tăng phi mã, gây nghẽn luồng đặt hàng của khách:

| Tên Sản Phẩm | Tồn Thực Tế (A) | Đang Chờ Giao (B) | Tồn Khả Dụng (A-B) |
| :--- | :---: | :---: | :---: |
| **Trứng vịt muối** | 650 | **1,750** | **-1,100** |
| **Bắp mỹ trái (Loại 1)** | 200 | **1,559.9** | **-1,359.9** |
| **Đậu hủ miếng trắng** | 0 | **1,100** | **-1,100** |
| **Xà lách lolo xanh** | 55.7 | **1,088.2** | **-1,032.5** |

**Hệ quả:** Khách hàng sẽ thấy báo "Hết hàng" trên App cho các sản phẩm trên mặc dù thực tế trong kho vẫn còn hàng (như Trứng vịt muối còn 650 quả).

---

## 4. Đề Xuất Hành Động Khắc Phục

1.  **Về Dữ Liệu:** 
    - Chạy script cập nhật lại trường `madonhang` cho các phiếu kho dựa trên mã `PX-TG-AA` trong `maphieu`.
    - Chạy script `fix_warehouse_data.js` để tính toán lại `slchogiao` dựa trên các đơn hàng `dadat` thực tế còn hiệu lực.
2.  **Về Quy Trình:**
    - Kiểm tra lại hàm `Capnhattonkho` hoặc Service xử lý trạng thái đơn hàng để fix lỗi `null` madonhang.
    - Thực hiện "Self-check" tồn kho 2 lần/ngày (Sáng - Tối) để phát hiện sớm các mã âm bất thường.

---
**Người báo cáo:** Antigravity AI Assistant  
**Ngày báo cáo:** 10/05/2026  
**Lưu trữ:** `docs/phantich/Review_Van_Hanh_10052026.md`
