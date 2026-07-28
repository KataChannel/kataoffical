# Báo cáo Đối soát Dữ liệu Kho - 16/04/2026

Dưới đây là bảng tổng hợp đối soát dữ liệu từ tệp hình ảnh `solieu16042026.jpg`.

## 1. Bảng dữ liệu chi tiết

| Mã Sản Phẩm | Tên Sản Phẩm | Tồn Hệ Thống | Tồn Thực Tế (Chốt Kho) | Snapshot | Chênh Lệch |
| :--- | :--- | :--- | :--- | :--- | :--- |
| I100233 | Trứng gà | 112 | 112 | 87 | -25 |
| I100479 | Dưa hấu | 0 | 0 | -72.3 | -72.3 |
| I100164 | Ớt đà lạt (đỏ) | 3.2 | 3.2 | -21.8 | -25 |
| I100165 | Ớt đà lạt (vàng) | 9 | 9 | -1.6 | -10.6 |
| I100166 | Ớt đà lạt (xanh) | 9.6 | 9.6 | -11.98 | -21.58 |
| I100003 | Bắp cải trắng | 9.5 | 9.5 | -126.2 | -135.7 |
| I100002 | Bắp cải tím | 11 | 11 | 3.95 | -7.05 |
| I100113 | Húng lũi | 0 | 0 | -11.01 | -11.01 |
| I100207 | Xà lách lolo xanh | 0 | 0 | -248.06 | -248.06 |
| I100004 | Bắp chuối bào | -4.9 | 0 | 0.4 | 0.4 |
| I100256 | Bún nhỏ | 11726.14 | 0 | 0 | 0 |

## 2. Nhận xét và Phân tích Cơ bản

- **Tổng chênh lệch âm:** -555.9 đơn vị (Snapshot < Thực tế). Điều này cho thấy hệ thống đang ghi nhận việc xuất hàng nhiều hơn số lượng "sổ sách" hiện có.
- **Chênh lệch lớn nhất:** Sản phẩm **Xà lách lolo xanh (I100207)** có chênh lệch âm -248.06.
- **Dữ liệu Snapshot âm:** 8/11 sản phẩm có Snapshot âm. Đây là dấu hiệu của việc "Xuất trước - Nhập sau".
- **Bún nhỏ (I100256):** Sai lệch cực lớn giữa "Tồn Hệ Thống" (11,726.14) và thực tế (0).

---

## 3. Kiểm tra Chuyên sâu: Đối chiếu Quy trình (Deep Check)

Dựa trên tài liệu [Quy trình Ghi nhận tồn kho](file:///mnt/chikiet/kata2025/rausachfinal/doisoat/Quy_trinh_ghi_nhan_ton_kho.md), các sai lệch trên được phân loại như sau:

| Mã SP | Tình trạng | Loại lỗi (Trường hợp) | Giải thích chi tiết |
| :--- | :--- | :--- | :--- |
| **I100256** | Bún nhỏ | **TH4: Baseline chưa khởi tạo** | Con số 11,726.14 trong hệ thống không được Snapshot ghi nhận vì sản phẩm chưa bao giờ được "Chốt Kho" để xác lập điểm chuẩn (Baseline). |
| **I100207** | Xà lách lolo xanh | **TH2 + TH4** | Snapshot âm nặng (-248.06) do liên tục xuất hàng mà không có mốc chốt kho ban đầu để bù trừ. |
| **I100479** | Dưa hấu | **TH2: Xuất trước - Nhập sau** | Snapshot -72.3 trong khi kho thực tế bằng 0. Có thể phiếu nhập hàng chưa được bấm "Đã nhận" trên app. |
| **I100233** | Trứng gà | **TH3: Hao hụt/Sai sót vận hành** | Thực tế có 112 nhưng snapshot chỉ tính ra 87. Có thể có 25 đơn vị đã bán nhưng chưa tạo đơn trên hệ thống. |

---

## 4. Hành động Khẩn cấp (Action Plan)

1. **Khởi tạo lại Baseline (Reset):** Cần bấm "Lưu Chốt Kho" ngay lập tức cho 11 mã hàng này để đồng bộ Thực tế -> Hệ thống.
2. **Kiểm tra Phiếu Nhập trễ:** Rà soát lại các phiếu nhập của nhóm sản phẩm Ớt và Bắp cải để xác nhận tình trạng "Đã nhận".
3. **Xử lý số liệu "Ma" (Ghost Stock):** Đối với mã **I100256**, việc chốt kho về 0 sẽ giúp xóa sạch con số 11k ảo trên hệ thống, tránh gây nhầm lẫn khi làm báo cáo tài chính.

## 5. Kết luận
Dữ liệu từ ảnh chụp cho thấy kho đang gặp vấn đề nghiêm trọng về **vận hành (trễ chứng từ)** và **khởi tạo dữ liệu (Baseline)**. Việc thực hiện đối soát và chốt kho thực tế như trong hình là bước đi đúng đắn để "Self-Healing" cho hệ thống.
