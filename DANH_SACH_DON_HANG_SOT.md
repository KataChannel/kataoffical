# BÁO CÁO TOÀN DIỆN VỀ ĐƠN HÀNG SÓT ĐỐI SOÁT (INVISIBLE ORDERS)

**Phạm vi:** Các khách hàng thuộc nhóm Bò Tơ, LongWang, và các chuỗi hiện có trong file đối soát.
**Thời gian:** 01/01/2026 - 25/01/2026
**Kết quả phát hiện:**
- Tổng số đơn hàng trong DB: **759**
- Tổng số đơn hàng đã đưa vào Excel: **364**
- **Số đơn hàng đã hoàn thành nhưng bị BỎ SÓT:** **395**
- **Giá trị thất thoát (tạm tính):** **757.864.125 VNĐ**

## 1. PHÂN TÍCH THEO KHÁCH HÀNG (SỐ TIỀN SÓT LỚN NHẤT)

| Tên Khách Hàng | Tổng tiền sót | Số đơn sót |
| :--- | :--- | :--- |
| LONGWANG 7 | 99.740.256 | 38 |
| Bò Tơ Bếp Trung Tâm | 83.651.175 | 13 |
| TIANLONG 01 | 79.903.865 | 28 |
| LONGWANG 18 | 73.286.612,5 | 45 |
| LONGWANG 1 | 60.753.140 | 21 |
| TIANLONG 08 | 44.584.500 | 11 |
| BÒ TƠ Q3 | 44.340.435 | 17 |
| LONGWANG 3 | 39.915.340 | 16 |
| LONGWANG 11 | 32.484.040 | 13 |
| BÒ TƠ Q7 | 31.250.935 | 18 |
| TIANLONG 06 | 31.131.780 | 14 |
| BÒ TƠ BÌNH THẠNH | 27.613.541,5 | 20 |
| TIANLONG 09 | 26.373.980 | 13 |
| TIANLONG 07 | 25.573.060 | 13 |
| G-MASTER NƯỚNG | 19.074.140 | 13 |
| BÒ TƠ Q10 | 17.917.950 | 14 |
| Cơm niêu Hải Sư 2 | 4.042.200 | 11 |
| BÒ TƠ Q7 (BAR) | 3.740.700 | 11 |
| Cơm niêu Hải Sư 3 | 2.441.345 | 13 |
| BÒ TƠ Q7 (NV) | 2.309.720 | 10 |
| BÒ TƠ Q10 (BAR) | 2.282.900 | 10 |
| BÒ TƠ BÌNH THẠNH (BAR) | 1.962.600 | 10 |
| BÒ TƠ Q3 (NV) | 1.671.300 | 9 |
| BÒ TƠ BÌNH THẠNH (NV) | 1.054.060 | 7 |
| BÒ TƠ Q10 (NV) | 764.550 | 7 |

## 2. DANH SÁCH CHI TIẾT CÁC ĐƠN HÀNG SÓT (Top 20)

| Mã đơn hàng | Ngày giao | Khách hàng | Tổng tiền | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| TG-AA24755 | 24/1/2026 | Bò Tơ Bếp Trung Tâm | 17.501.000 | danhan |
| TG-AA23357 | 16/1/2026 | Bò Tơ Bếp Trung Tâm | 11.406.150 | danhan |
| TG-AA20969 | 3/1/2026 | LONGWANG 7 | 8.937.075 | danhan |
| TG-AA24209 | 21/1/2026 | Bò Tơ Bếp Trung Tâm | 8.889.000 | danhan |
| TG-AA24432 | 22/1/2026 | Bò Tơ Bếp Trung Tâm | 8.805.500 | danhan |
| TG-AA23981 | 20/1/2026 | Bò Tơ Bếp Trung Tâm | 8.758.000 | danhan |
| TG-AA20841 | 2/1/2026 | LONGWANG 7 | 7.913.300 | danhan |
| TG-AA24530 | 23/1/2026 | Bò Tơ Bếp Trung Tâm | 7.864.000 | danhan |
| TG-AA22309 | 10/1/2026 | LONGWANG 7 | 6.939.700 | danhan |
| TG-AA23758 | 18/1/2026 | LONGWANG 7 | 6.903.200 | danhan |
| TG-AA25100 | 26/1/2026 | Bò Tơ Bếp Trung Tâm | 6.706.000 | danhan |
| TG-AA24759 | 24/1/2026 | LONGWANG 1 | 6.460.200 | danhan |
| TG-AA24887 | 25/1/2026 | LONGWANG 7 | 6.353.300 | danhan |
| TG-AA23819 | 19/1/2026 | Bò Tơ Bếp Trung Tâm | 5.986.600 | danhan |
| TG-AA23389 | 16/1/2026 | LONGWANG 1 | 5.849.200 | danhan |
| TG-AA24904 | 25/1/2026 | LONGWANG 1 | 5.736.900 | danhan |
| TG-AA23491 | 17/1/2026 | LONGWANG 1 | 5.692.050 | danhan |
| TG-AA23476 | 17/1/2026 | LONGWANG 7 | 5.674.200 | danhan |
| TG-AA23756 | 18/1/2026 | LONGWANG 1 | 5.509.700 | danhan |
| TG-AA24761 | 24/1/2026 | LONGWANG 7 | 5.477.650 | danhan |

... (và 375 đơn hàng khác)

## 3. ĐỀ XUẤT PHƯƠNG ÁN CHỐNG THẤT THOÁT

### 3.1. Về mặt Công nghệ (Hệ thống)
- **Số hóa quy trình chốt nợ:** Thay thế hoàn toàn file Excel thủ công bằng Module "Chốt công nợ" trên hệ thống. Chỉ cho phép chốt khi hệ thống xác nhận 100% đơn hàng trong kỳ đã được đưa vào bảng kê.
- **Cảnh báo đơn "Lơ lửng":** Hệ thống tự động gửi thông báo cho Kế toán trưởng mỗi sáng nếu có đơn hàng giao quá 24h mà chưa chuyển sang trạng thái `hoanthanh` hoặc chưa được gán vào một kỳ đối soát.
- **Gắn nhãn Đối soát:** Mỗi đơn hàng khi được đưa vào file đối soát phải có 1 cờ `isReconciled = true`. Hệ thống sẽ có báo cáo lọc nhanh tất cả đơn `isReconciled = false` để xử lý ngay.

### 3.2. Về mặt Quy trình (Con người)
- **Đối chiếu chéo (Cross-check):** Hàng tuần, kế toán phải chạy báo cáo "Tổng doanh thu DB" so với "Tổng doanh thu đã chốt nợ". Nếu lệch > 0.1%, phải dừng lại truy vết ngay.
- **Quy trình 4 mắt:** Nhân viên Sales/Giao hàng xác nhận đơn -> Kế toán bán hàng kiểm tra -> Kế toán công nợ chốt số -> Kế toán trưởng phê duyệt kỳ đối soát.
