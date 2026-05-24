# Báo Cáo Chốt Baseline Tồn Kho - Ngày 17/05/2026

## 1. Thông Tin Chung
- **Thời gian thực hiện:** 21:38:10 17/5/2026 (Giờ hệ thống)
- **File nguồn:** `doisoat/Ton-Huy 17-5.xlsx`
- **Kho thực hiện:** KHO - HCM (ID: `4cc01811-61f5-4bdc-83de-a493764e9258`)
- **Mục tiêu:** Thiết lập lại Baseline cho ngày 17/05/2026.

## 2. Kết Quả Thực Hiện

| Chỉ số | Kết quả | Ghi chú |
| :--- | :--- | :--- |
| **Tổng số sản phẩm trong DB** | **1024** | Tất cả sản phẩm đều được xử lý |
| **Sản phẩm cập nhật từ Excel** | **162** | Lấy số liệu `slton` và `slhuy` từ file |
| **Sản phẩm reset về 0** | **862** | Các mã không có trong file Excel đối soát |
| **Đơn hàng chuyển về 'choxuly'** | **0** | Đơn hàng tồn đọng/quá hạn tính đến hết ngày 17/05 |
| **Trạng thái giao dịch** | ✅ Thành công | Đã commit vào database |

## 3. Chi Tiết Kỹ Thuật
- **Master Record ID:** `f73befb0-d58f-4513-89ac-8f6ee4dd1c31`
- **Code ID:** `CHOTKHO_BASELINE_1705_1779028673084`
- **Các bảng dữ liệu đã cập nhật:**
    1.  `Chotkho`: Tạo phiên chốt mới cho ngày 17/05.
    2.  `Chotkhodetail`: Lưu chi tiết chênh lệch cho các sản phẩm.
    3.  `SanphamKho`: Cập nhật số lượng tồn thực tế.
    4.  `TonKho`: Cập nhật `slton`, `sltontt` và tính toán lại `slchogiao`, `slchonhap` dựa trên các đơn hàng tương lai (ngày 18/05 trở đi).

## 4. Ghi Chú Vận Hành
- Phiên chốt này đã giải quyết triệt để các vấn đề "Ghost Reservations" (tồn ảo dự phòng) và các đơn hàng cũ quá hạn.
- Hệ thống hiện đã ở trạng thái Baseline sạch cho ngày mới 18/05/2026.

---
*Báo cáo được thực hiện tự động bởi Antigravity AI - 17/05/2026*
