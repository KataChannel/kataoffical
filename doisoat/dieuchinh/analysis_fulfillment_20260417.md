# BÁO CÁO PHÂN TÍCH CHUYÊN SÂU PHỤC VỤ 164 ĐƠN HÀNG (2026-04-17)

## 1. Tổng quan
*   **Số lượng đơn hàng:** 164 (100% Trạng thái: **Đã Nhận**)
*   **Trình trạng thực tế:** Hàng hóa ĐÃ được giao đến tay khách hàng thành công.
*   **Thời điểm đối soát:** 00:30 Ngày 18/04/2026
*   **Nguyên tắc tính:** `Tồn đầu (Chốt 16/04)` + `Nhập NCC (17/04)` - `Khách đặt (17/04)`.

## 2. Top 20 mặt hàng THIẾU HỤT (Shortage)

| Mã SP | Tên Sản Phẩm | ĐVT | Tồn Đầu | Nhập NCC | Khả dụng | Khách Đặt | **Thiếu** |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| I100738 | Nấm kim châm gói (200g) | Gói | 0 | 0 | 0 | 61 | **-61.000** |
| I100785 | Nấm đông cô gói | Gói | 0 | 0 | 0 | 40 | **-40.000** |
| I100730 | Hành tím bắc lột | Kg | 0 | 0 | 0 | 37.1 | **-37.100** |
| I100232 | Tỏi xay | Kg | 0 | 0 | 0 | 18.3 | **-18.300** |
| I100600 | Thơm trái hườm | Trái | 0 | 0 | 0 | 18 | **-18.000** |
| I100007 | Bắp mỹ kg Lột Vỏ | Kg | 0 | 0 | 0 | 15.7 | **-15.700** |
| I100102 | Hành tây tím | Kg | 0 | 0 | 0 | 9 | **-9.000** |
| I100192 | Rau thơm các loại | Kg | 0 | 0 | 0 | 6.5 | **-6.500** |
| I101129 | Thơm chín (kg) | Kg | 0 | 0 | 0 | 6 | **-6.000** |
| I100891 | Thơm chín | Trái | 0 | 0 | 0 | 5 | **-5.000** |
| I100043 | Cải bẹ xanh có gốc | Kg | 2.1 | 42.8 | 44.9 | 49.199999999999996 | **-4.300** |
| I100006 | Bắp mỹ hạt | Kg | 0 | 0 | 0 | 4 | **-4.000** |
| I100238 | Nấm hải sản | Gói | 0 | 0 | 0 | 4 | **-4.000** |
| I100151 | Mướp hương | Kg | 14 | 49.6 | 63.6 | 67.3 | **-3.700** |
| I100662 | Tỏi lột sạch (cắt đầu) | Kg | 0 | 0 | 0 | 3.5 | **-3.500** |
| I100503 | Táo đỏ trái | Kg | 0 | 7 | 7 | 10.5 | **-3.500** |
| I100072 | Củ riềng | Kg | 0 | 4.6 | 4.6 | 7.099999999999999 | **-2.500** |
| I100115 | Kèo nèo | Kg | 0 | 0.96 | 0.96 | 3 | **-2.040** |
| I100635 | Nấm linh chi nâu (kg) | Kg | 0 | 0 | 0 | 2 | **-2.000** |
| I100271 | Trứng cút | Vỉ | 0 | 6 | 6 | 8 | **-2.000** |

## 3. Top 10 mặt hàng DƯ THỪA (Excess)

| Mã SP | Tên Sản Phẩm | ĐVT | Khả dụng | Khách Đặt | **Dư** |
| :--- | :--- | :--- | :---: | :---: | :---: |
| I100101 | Hành tây | Kg | 880 | 134 | **746.000** |
| I100275 | Trứng vịt muối | Quả | 790 | 260 | **530.000** |
| I100479 | Dưa hấu | Kg | 566 | 70 | **496.000** |
| I100008 | Bắp mỹ trái (Loại 1) | Trái | 490 | 262 | **228.000** |
| I100270 | Trứng bắc thảo | Quả | 255 | 46 | **209.000** |
| I100220 | Thơm trái xanh | Trái | 192 | 27 | **165.000** |
| I100233 | Trứng gà | Vỉ | 190 | 26 | **164.000** |
| I100883 | Đậu hủ trứng CP 220gr | Cây | 182 | 47 | **135.000** |
| I100242 | Nấm linh chi trắng - hộp (125g) | Hộp | 194 | 60 | **134.000** |
| I100241 | Nấm linh chi đen (125g) | Hộp | 153 | 54 | **99.000** |

## 4. Phân tích nguyên nhân (Root Cause)

*   **Kết luận:** Hệ thống báo thiếu hụt **43/311** mã hàng, nhưng thực tế **164/164** đơn hàng đã giao thành công (`status: danhan`).
*   **Lý do "Thiếu" (Data Gap):**
    1.  **Chưa nhập dữ liệu NCC:** Hàng thực tế đã về kho và giao đi, nhưng nhân viên chưa kịp tạo hoặc chưa bấm "Đã Nhận" cho các Phiếu Đặt Hàng NCC (Ví dụ: 61 gói Nấm Kim Châm, 40 gói Nấm Đông Cô).
    2.  **SOP sai lệch:** Nhân viên kho có xu hướng giao hàng trước rồi mới cập nhật hệ thống sau, dẫn đến tình trạng "Âm kho ảo" tại thời điểm đối soát.
*   **Hậu quả từ "Dư" (Over-ordering):** Một số mã như Hành tây (dư 746kg), Dưa hấu (dư 496kg) bị đặt thừa do hệ thống trước đó báo thiếu ảo (Ghost Stock).
*   **Hành động khẩn cấp:** Yêu cầu bộ phận mua hàng và kho rà soát ngay các hoá đơn NCC chưa nhập để khớp số liệu trước khi chốt sổ ngày 18/04.
