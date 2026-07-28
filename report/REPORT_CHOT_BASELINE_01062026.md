# Báo Cáo Chốt Baseline Tồn Kho - Ngày 01/06/2026

## 1. Thông Tin Chung
- **Thời gian thực hiện:** 22:39:57 01/06/2026 (Giờ hệ thống)
- **File nguồn:** `doisoat/Ton-Huy 01-6.xlsx`
- **Kho thực hiện:** KHO - HCM (ID: `4cc01811-61f5-4bdc-83de-a493764e9258`)
- **Mục tiêu:** Thiết lập lại Baseline tồn kho sạch cho ngày 01/06/2026.
- **Thời điểm cut-off:** 23:59:59 01/06/2026

## 2. Kết Quả Thực Hiện

| Chỉ số | Kết quả | Ghi chú |
| :--- | :--- | :--- |
| **Tổng số sản phẩm trong DB** | **1024** | Tất cả sản phẩm đều được xử lý |
| **Sản phẩm cập nhật từ Excel** | **155** | Lấy số lượng `slton` và `slhuy` từ file Excel đối soát |
| **Sản phẩm reset về 0** | **869** | Các mã sản phẩm không xuất hiện trong file Excel |
| **Đơn hàng chuyển về 'choxuly' (Đơn hàng)** | **0** | Không có đơn bán hàng tồn đọng cần hoàn trả trạng thái |
| **Đơn đặt hàng chuyển về 'choxuly' (Đặt hàng)** | **1** | 1 phiếu đặt hàng tồn đọng trước ngày chốt được đưa về 'choxuly' |
| **Số phiên chốt kho cũ bị xóa** | **2** | Phiên chốt tự động/thủ công cũ trong ngày bị xóa để ghi đè Baseline mới |
| **Số phiếu đối soát cũ bị xóa** | **0** | Không có đối soát voucher ảo nào từ trước |
| **Trạng thái giao dịch** | ✅ Thành công | Đã commit vào database `rausachfinal` thông qua Transaction |

## 3. Chi Tiết Kỹ Thuật
- **Master Record ID:** `53815324-302d-4dbb-8729-29a8d689d1a6`
- **Code ID:** `CHOTKHO_BASELINE_0106_1780328397577`

## 4. Ghi Chú Vận Hành
- Số lượng chờ giao (`slchogiao`) và chờ nhận (`slchonhap`) đối với các đơn hàng phát sinh cho ngày tiếp theo (`2026-06-02` trở đi) đã được tính toán lại chính xác và giữ nguyên nhằm bảo toàn các giao dịch tương lai.
- Số dư đầu kỳ của ngày 02/06/2026 đã được đồng bộ chuẩn xác và khớp tuyệt đối với thực tế kiểm đếm trên kệ kho.

---
*Báo cáo được thực hiện tự động bởi Antigravity AI - 01/06/2026*
