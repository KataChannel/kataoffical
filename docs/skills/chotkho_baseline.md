# Skill: Chốt Kho Baseline (Rausach)

## Định nghĩa
**Chốt kho Baseline** là quy trình thiết lập lại toàn bộ số liệu tồn kho của hệ thống về một "Điểm chuẩn" (Baseline) dựa trên kết quả kiểm kê thực tế từ file Excel.

## Các quy tắc thực hiện
1.  **Số liệu thực tế**: Cập nhật tồn thực tế (`sltonthucte`) cho các sản phẩm có tên trong file Excel.
2.  **Reset sản phẩm thiếu**: Tất cả các sản phẩm **không có** trong file Excel phải được reset số tồn về **0**.
3.  **Xử lý đơn hàng treo**:
    *   Kiểm tra các đơn hàng (`Donhang`) và đơn đặt hàng (`Dathang`) được tạo trước thời điểm chốt kho.
    *   Nếu các đơn này đang ở trạng thái "treo" (chưa hoàn thành nhưng đang ảnh hưởng đến tồn kho), phải chuyển trạng thái về **Chờ Xử Lý** (`choxuly`).
4.  **Thời điểm chốt (Cut-off)**:
    *   Mặc định chốt cho toàn bộ phiên giao dịch **trước 17:00** của ngày thực hiện.
    *   Số liệu sau 17:00 sẽ được tính vào phiên làm việc tiếp theo và không bị ảnh hưởng bởi Baseline này.
5.  **Mục tiêu**: Đảm bảo số dư đầu kỳ của ngày hôm sau hoàn toàn sạch và khớp với thực tế kiểm kê.
6.  **Cơ sở dữ liệu**: Quy trình chốt Baseline phải luôn được thực hiện trên database chính **`rausachfinal`**. Kiểm tra kỹ file `.env` trước khi chạy script.

---
*Cập nhật lần cuối: 2026-05-15*
