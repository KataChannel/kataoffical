# Báo Cáo Chốt Baseline Tồn Kho - Ngày 21/05/2026

## 1. Thông Tin Chung
- **Thời gian thực hiện:** 21:10:11 21/5/2026 (Giờ hệ thống)
- **File nguồn:** `doisoat/Ton-Huy 21-5.xlsx`
- **Kho thực hiện:** KHO - HCM (ID: `4cc01811-61f5-4bdc-83de-a493764e9258`)
- **Mục tiêu:** Thiết lập lại Baseline cho ngày 21/05/2026.

## 2. Kết Quả Thực Hiện

| Chỉ số | Kết quả | Ghi chú |
| :--- | :--- | :--- |
| **Tổng số sản phẩm trong DB** | **1024** | Tất cả sản phẩm đều được xử lý |
| **Sản phẩm cập nhật từ Excel** | **142** | Lấy số liệu `slton` và `slhuy` từ file |
| **Sản phẩm reset về 0** | **882** | Các mã không có trong file Excel đối soát |
| **Đơn hàng chuyển về 'choxuly'** | **0** | Đơn hàng tồn đọng/quá hạn tính đến hết ngày 21/05 |
| **Trạng thái giao dịch** | ✅ Thành công | Đã commit vào database |

## 3. Chi Tiết Kỹ Thuật
- **Master Record ID:** `24968ffb-feec-4f6f-957b-a5024e964579`
- **Code ID:** `CHOTKHO_BASELINE_2105_1779372609473`
- **Các bảng dữ liệu đã cập nhật:**
    1.  `Chotkho`: Tạo phiên chốt mới cho ngày 21/05.
    2.  `Chotkhodetail`: Lưu chi tiết chênh lệch cho các sản phẩm.
    3.  `SanphamKho`: Cập nhật số lượng tồn thực tế.
    4.  `TonKho`: Cập nhật `slton`, `sltontt` và tính toán lại `slchogiao`, `slchonhap` dựa trên các đơn hàng tương lai (ngày 22/05 trở đi).

## 4. Ghi Chú Vận Hành
- Phiên chốt này đã giải quyết các vấn đề "Ghost Reservations" và các đơn hàng cũ quá hạn trước ngày 22/05.
- Hệ thống hiện đã ở trạng thái Baseline sạch cho ngày mới 22/05/2026.

---
*Báo cáo được thực hiện tự động bởi Antigravity AI - 21/05/2026*
