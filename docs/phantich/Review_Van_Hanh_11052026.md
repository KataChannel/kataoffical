# Báo Cáo Đánh Giá Hoạt Động Kho (Sau Chốt Kho 10/05/2026)

## 1. Thông Tin Tổng Quan
- **Lần chốt kho gần nhất:** `Chốt kho Base Line 10-05-2026 (FULL CLEANUP)`
- **Thời điểm chốt:** 10/05/2026 16:59:59 (Dựa trên log hệ thống)
- **Mục tiêu chốt:** Reset toàn bộ tồn kho để làm sạch dữ liệu và thiết lập Baseline mới.
- **Thời gian đánh giá:** Từ 17:00 ngày 10/05 đến 17:50 ngày 11/05 (Khoảng 25 giờ hoạt động).

## 2. Thống Kê Giao Dịch Phát Sinh
Hệ thống ghi nhận lưu lượng giao dịch rất lớn ngay sau khi reset Baseline:

| Loại giao dịch | Số lượng | Trạng thái |
| :--- | :--- | :--- |
| **Phiếu kho (Nhập/Xuất)** | **214** | Hoạt động liên tục |
| **Đơn hàng bán (Sales Orders)** | **155** | Các đơn đã giao/hoàn thành |
| **Đơn hàng mua (Purchase Orders)** | **58** | Các đơn đã nhận hàng |

## 3. Phân Tích & Đánh Giá Chi Tiết

### 3.1. Hiện tượng Tồn Kho Âm (Critical 🚨)
Kiểm tra thực tế ghi nhận **31 mã sản phẩm** đang bị âm kho. 
**Nguyên nhân:** Các đơn hàng bán (Sales Orders) được xử lý rất nhanh ngay sau khi reset Baseline về 0, trong khi các phiếu nhập hàng tương ứng (để bù lại số thực tế) có thể chưa được đẩy lên hệ thống kịp thời hoặc chưa được duyệt.

**Các mã cần xử lý gấp:**
- `I100837 - Hành tím bắc bào`: -20 Kg
- `I100220 - Thơm trái xanh`: -5 Trái
- `I100043 - Cải bẹ xanh có gốc`: -7.5 Kg
- `I100051 - Cải thảo`: -4.8 Kg

### 3.2. Lỗi Toàn Vẹn Dữ Liệu (Technical Audit)
Phân tích sâu vào các Phiếu Kho (PhieuKho) phát hiện một vấn đề hệ thống:
- Rất nhiều **Phiếu Xuất Kho (PX)** không được liên kết với mã đơn hàng tương ứng (`madonhang` bị null).
- **Hệ quả:** Khi chạy các kịch bản đối soát tự động, hệ thống sẽ tính trừ kho 2 lần cho cùng một đợt xuất hàng (1 lần từ logic đơn hàng, 1 lần từ logic phiếu kho độc lập).
- Đây là lý do chính gây ra sự chênh lệch (Discrepancy) lớn trong các báo cáo vận hành.

### 3.3. Đánh giá tính ổn định
- **Tích cực:** Quy trình chốt kho "FULL CLEANUP" đã giải quyết được các vấn đề "tồn ảo" (Ghost Reservations) cũ.
- **Tiêu cực:** Việc reset về 0 mà không có dữ liệu nhập bù (Opening Balance) ngay lập tức gây ra tình trạng âm kho ảo trên hệ thống, ảnh hưởng đến việc ra quyết định điều phối.

## 4. Đề Xuất Hành Động (Action Plan)

1.  **Cân bằng kho ngay lập tức:** Đối với 31 mã âm, cần kiểm tra thực tế và tạo phiếu nhập điều chỉnh để đưa tồn kho về mức dương chính xác.
2.  **Rà soát logic tạo phiếu:** Cần kiểm tra mã nguồn hoặc quy trình vận hành để đảm bảo `madonhang` luôn được đính kèm vào Phiếu Kho khi xuất từ đơn hàng.
3.  **Hậu kiểm:** Thực hiện một đợt "Adjustment Chotkho" cho các mã có độ lệch (diff) cao sau khi đã chuẩn hóa dữ liệu.

---
*Báo cáo được tổng hợp tự động bởi Antigravity AI - 11/05/2026*
