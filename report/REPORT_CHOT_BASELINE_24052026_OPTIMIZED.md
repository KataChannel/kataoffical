# Báo Cáo Chốt Baseline Tồn Kho Tối Ưu - Ngày 24/05/2026 (Thời Điểm Hiện Tại)

## 1. Thông Tin Chung
- **Thời gian thực hiện:** 22:32:48 24/5/2026 (Giờ hệ thống)
- **File nguồn:** `doisoat/Ton-Huy 24-5.xlsx`
- **Kho thực hiện:** KHO - HCM (ID: `4cc01811-61f5-4bdc-83de-a493764e9258`)
- **Mục tiêu:** Thiết lập lại Baseline cho ngày 24/05/2026 (Thời điểm hiện tại - Chế độ tối ưu hóa tốc độ).
- **Thời điểm cut-off:** 22:32:47 24/5/2026

## 2. Kết Quả Thực Hiện

| Chỉ số | Kết quả | Ghi chú |
| :--- | :--- | :--- |
| **Tổng số sản phẩm trong DB** | **1024** | Tất cả sản phẩm đều được xử lý |
| **Sản phẩm cập nhật từ Excel** | **161** | Lấy số lượng `slton` và `slhuy` từ file Excel đối soát |
| **Sản phẩm reset về 0** | **863** | Các mã sản phẩm không xuất hiện trong file Excel |
| **Đơn hàng chuyển về 'choxuly' (Đơn hàng)** | **15** | Các đơn hàng tồn đọng có trạng thái `dadat` hoặc `dagiao` trước 22:32:47 |
| **Đơn hàng chuyển về 'choxuly' (Đặt hàng)** | **27** | Các phiếu đặt hàng tồn đọng tương tự |
| **Số bản ghi SanphamKho thực cập nhật** | **1** | Chỉ cập nhật những bản ghi có giá trị thay đổi |
| **Số bản ghi TonKho thực cập nhật** | **5** | Chỉ cập nhật những bản ghi có giá trị thay đổi |
| **Trạng thái giao dịch** | ✅ Thành công | Đã commit vào database thông qua Transaction |

## 3. Chi Tiết Kỹ Thuật
- **Master Record ID:** `2d1f05ee-0751-4748-8fa2-5f725766851e`
- **Code ID:** `BASELINE_OPTIMIZED_24052026_1779636768037`

## 4. Ghi Chú Vận Hành
- Phiên chốt này sử dụng giải pháp **Selective Updates** (Chỉ cập nhật khi giá trị thay đổi) giúp giảm số lượng truy vấn mạng từ 2048 xuống còn **6** truy vấn, loại bỏ hoàn toàn nguy cơ timeout trên kết nối mạng từ xa.
- Khắc phục triệt để vấn đề ghi đè đè nén (concurrency race condition) từ tiến trình điều chỉnh tồn kho tự động trước đó.

---
*Báo cáo được thực hiện tự động bởi Antigravity AI - 24/05/2026*
