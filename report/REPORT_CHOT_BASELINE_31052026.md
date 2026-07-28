# Báo Cáo Chốt Baseline Tồn Kho - Ngày 31/05/2026

## 1. Thông Tin Chung
- **Thời gian thực hiện:** 22:20:14 31/05/2026 (Giờ hệ thống)
- **File nguồn:** `doisoat/Ton-Huy 31-5.xlsx`
- **Kho thực hiện:** KHO - HCM (ID: `4cc01811-61f5-4bdc-83de-a493764e9258`)
- **Mục tiêu:** Thiết lập lại Baseline tồn kho sạch cho ngày 31/05/2026.
- **Thời điểm cut-off:** 23:59:59 31/05/2026

## 2. Kết Quả Thực Hiện

| Chỉ số | Kết quả | Ghi chú |
| :--- | :--- | :--- |
| **Tổng số sản phẩm trong DB** | **1024** | Tất cả sản phẩm đều được xử lý |
| **Sản phẩm cập nhật từ Excel** | **138** | Lấy số lượng `slton` và `slhuy` từ file Excel đối soát |
| **Sản phẩm reset về 0** | **886** | Các mã sản phẩm không xuất hiện trong file Excel |
| **Đơn hàng chuyển về 'choxuly' (Đơn hàng)** | **0** | Các đơn hàng tồn đọng có trạng thái `dadat` hoặc `dagiao` trước thời điểm chốt |
| **Đơn hàng chuyển về 'choxuly' (Đặt hàng)** | **0** | Các phiếu đặt hàng tồn đọng tương tự |
| **Số phiên chốt kho cũ bị xóa** | **1** | Phiên chốt tự động lúc 21:43:06 bị xóa để ghi đè Baseline mới |
| **Số phiếu đối soát cũ bị xóa** | **0** | Không tìm thấy phiếu đối soát ảo trùng lặp |
| **Trạng thái giao dịch** | ✅ Thành công | Đã commit vào database `rausachfinal` thông qua Transaction |

## 3. Chi Tiết Kỹ Thuật
- **Master Record ID:** `40abdf07-fc7e-4b23-bd94-ccf2db4d3ec9`
- **Code ID:** `CHOTKHO_BASELINE_3105_1780240814557`

## 4. Ghi Chú Vận Hành
- Số lượng chờ giao (`slchogiao`) và chờ nhận (`slchonhap`) đối với các đơn hàng phát sinh cho ngày tiếp theo (`2026-06-01` trở đi) đã được tính toán lại chính xác và giữ nguyên nhằm bảo toàn các đơn hàng tương lai.
- Quy trình đã thiết lập thành công số dư đầu kỳ chuẩn, giúp đảm bảo số liệu ngày 01/06/2026 hoàn toàn chính xác.

---
*Báo cáo được thực hiện tự động bởi Antigravity AI - 31/05/2026*
