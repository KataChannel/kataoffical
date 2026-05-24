# Báo Cáo Chốt Baseline Tồn Kho - Ngày 24/05/2026

## 1. Thông Tin Chung
- **Thời gian thực hiện:** 21:38:42 24/5/2026 (Giờ hệ thống)
- **File nguồn:** `doisoat/Ton-Huy 24-5.xlsx`
- **Kho thực hiện:** KHO - HCM (ID: `4cc01811-61f5-4bdc-83de-a493764e9258`)
- **Mục tiêu:** Thiết lập lại Baseline cho ngày 24/05/2026.
- **Thời điểm cut-off:** 17:00:00 24/5/2026 (Giao dịch trước 17h cùng ngày)

## 2. Kết Quả Thực Hiện

| Chỉ số | Kết quả | Ghi chú |
| :--- | :--- | :--- |
| **Tổng số sản phẩm trong DB** | **1024** | Tất cả sản phẩm đều được xử lý |
| **Sản phẩm cập nhật từ Excel** | **161** | Lấy số lượng `slton` và `slhuy` từ file Excel đối soát |
| **Sản phẩm reset về 0** | **863** | Các mã sản phẩm không xuất hiện trong file Excel |
| **Đơn hàng chuyển về 'choxuly' (Đơn hàng)** | **3** | Các đơn hàng tồn đọng có trạng thái `dadat` hoặc `dagiao` trước 17:00 ngày 24/05 |
| **Đơn hàng chuyển về 'choxuly' (Đặt hàng)** | **0** | Các phiếu đặt hàng tồn đọng tương tự |
| **Trạng thái giao dịch** | ✅ Thành công | Đã commit vào database thông qua Transaction |

## 3. Chi Tiết Kỹ Thuật
- **Master Record ID:** `1f26d811-1228-48b4-b286-f7d454f1895e`
- **Code ID:** `BASELINE_FULL_24052026_1779633512043`
- **Các bảng dữ liệu đã cập nhật:**
    1.  `Chotkho`: Tạo phiên chốt mới cho ngày 24/05/2026.
    2.  `Chotkhodetail`: Lưu chi tiết chênh lệch và hủy của toàn bộ sản phẩm.
    3.  `SanphamKho`: Đồng bộ số lượng tồn thực tế cho Kho HCM.
    4.  `TonKho`: Cập nhật `slton`, `sltontt` cho toàn hệ thống.

## 4. Ghi Chú Vận Hành
- Phiên chốt này giúp loại bỏ "Ghost Reservations" và đưa hệ thống về trạng thái tồn kho thực tế chính xác nhất để chuẩn bị cho các đơn hàng tiếp theo.
- Hệ thống đã sẵn sàng vận hành ổn định trên dữ liệu Baseline sạch của ngày 24/05/2026.

---
*Báo cáo được thực hiện tự động bởi Antigravity AI - 24/05/2026*
