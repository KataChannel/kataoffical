# Báo Cáo Phân Tích Vận Hành & Lệch Tồn - Ngày 12/05/2026

Báo cáo này tổng hợp tình trạng kho ngay sau phiên chốt Baseline ngày 11/05 và các biến động thực tế trong ca sáng ngày 12/05.

## 1. Trạng Thái Baseline (Từ 11/05 23:59)
- **Master ID:** `fbcbd578-70a0-4970-b2a7-633da79d3df6`
- **Tổng sản phẩm:** 1,024 mã.
- **Mục tiêu:** Làm sạch toàn bộ tồn ảo (`slchogiao`, `slchonhap`) và khớp số liệu thực tế.

## 2. Hoạt Động Vận Hành Ngày 12/05 (Đến 10:00 AM)
Ghi nhận lưu lượng giao dịch thực tế trên hệ thống:

| Chỉ số | Giá trị | Trạng thái |
| :--- | :---: | :--- |
| **Phiếu Nhập kho** | 58 phiếu | Đang nhập hàng từ NCC |
| **Phiếu Xuất kho** | 153 phiếu | Đã dispatch giao hàng |
| **Đơn hàng chưa xử lý (Pending)** | 4 đơn | Cần xử lý trong ca chiều |

## 3. Phân Tích Biến Động & Cảnh Báo Lệch (Audit)
Dựa trên so sánh giữa **Tồn lý thuyết** (Tồn chốt + Nhập - Xuất) và **Tồn thực tế hiện tại**:

### 3.1. Các mã lệch cần kiểm tra ngay:
| Mã SP | Tên Sản phẩm | Tồn Lý thuyết | Tồn Thực tế | Lệch |
| :--- | :--- | :---: | :---: | :---: |
| **I100203** | Xà lách búp mỹ | 4.00 | -6.00 | **-10.00** |
| **I100133** | Lá chanh | 0.00 | -4.00 | **-4.00** |
| **I100101** | Hành tây | -115.00 | -116.00 | **-1.00** |

### 3.2. Top 5 mặt hàng luân chuyển lớn:
- **Bắp mỹ trái (Loại 1)**: Nhập 1,300 - Xuất 239 (Tồn hiện tại ~1,136)
- **Dưa hấu**: Nhập 500 - Xuất 114.7
- **Xà lách lolo xanh**: Nhập 150 - Xuất 120.5
- **Cải thảo**: Nhập 150 - Xuất 140.95
- **Đậu hủ miếng trắng**: Nhập 249 - Xuất 249 (Khớp tuyệt đối)

## 4. Đánh Giá & Kiến Nghị
1. **Duy trì ổn định**: Quy trình nhập xuất sau chốt Baseline đang vận hành tốt, không còn hiện tượng mất liên kết ID phiếu kho.
2. **Xử lý tồn âm**: Mã *Xà lách búp mỹ* lệch 10 đơn vị ngay sau chốt 10 tiếng, cần kiểm tra xem có phiếu xuất nào bị lặp hoặc quên chưa nhập kho không.
3. **Đơn hàng treo**: 4 đơn hàng `dadat` cần được xuất kho trước 14:00 để đảm bảo chỉ số vận hành.

---
*Báo cáo được tổng hợp bởi Antigravity AI - 12/05/2026*
