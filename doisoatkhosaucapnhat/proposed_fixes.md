# Kế Hoạch Khắc Phục Lỗi Vận Hành Kho
**Ngày lập:** 2026-05-07
**Trạng thái:** Chờ xác nhận thực thi trên `testdata`

---

## 1. Mục Tiêu
1.  Khắc phục sai lệch tồn kho trên môi trường thử nghiệm (`testdata`).
2.  Sửa lỗi mã nguồn để ngăn chặn tình trạng lệch kho tái diễn khi cập nhật trạng thái đơn hàng.

---

## 2. Các Bước Khắc Phục Dữ Liệu (Trên `testdata`)
Tôi đã chuẩn bị script `scripts/fix_warehouse_data.js` để thực hiện các công việc sau:

### 2.1. Khôi phục Phiếu Xuất Kho (PX)
*   **Vấn đề:** Nhiều đơn hàng `dagiao` nhưng thiếu phiếu xuất, dẫn đến kho không bị trừ.
*   **Giải pháp:** Quét toàn bộ đơn hàng thành công từ sau lần chốt kho (06/05 10:16) và tự động tạo phiếu `PX-madonhang` tương ứng.

### 2.2. Tính toán lại Tồn kho (Recalculate)
*   **Vấn đề:** Các chỉ số `slton`, `sltontt`, `slchogiao` bị sai lệch do lỗi logic code.
*   **Giải pháp:** 
    *   Tính lại `slchogiao` dựa trên các đơn hàng đang ở trạng thái `dadat`.
    *   Tính lại `sltontt` theo công thức: `Tồn chốt + Tổng Nhập (Phiếu Nhập) - Tổng Xuất (Phiếu Xuất)`.
    *   Đồng bộ `slton` (tồn khả dụng) về giá trị thực tế sau khi đã trừ hàng giữ chỗ.

---

## 3. Các Bước Sửa Lỗi Mã Nguồn (Source Code)

### 3.1. Cải tiến `DonhangService.updateBulk`
*   **Lỗi hiện tại:** Chỉ hỗ trợ trạng thái `danhan`, không trừ tồn kho vật lý (`sltontt`), sử dụng sai hằng số Kho.
*   **Sửa đổi:** 
    *   Mở rộng hỗ trợ mọi trạng thái (`dagiao`, `hoanthanh`, `huy`).
    *   Đảm bảo gọi `tonkhoManager.updateTonkhoAtomic` cho cả `slton` và `sltontt`.
    *   Đảm bảo luôn tạo Phiếu Kho đồng bộ với trạng thái đơn hàng.

### 3.2. Củng cố tính nhất quán (Consistency)
*   Tối ưu hóa các hàm cập nhật để đảm bảo việc thay đổi trạng thái và thay đổi kho luôn nằm trong cùng một Transaction an toàn.

---

## 4. Cam Kết An Toàn
*   Mọi thao tác thay đổi dữ liệu **chỉ thực hiện trên database `testdata`**.
*   Không thay đổi dữ liệu sản xuất (`rausachfinal`) khi chưa có chỉ thị tiếp theo.

---
**Người thực hiện:** Antigravity AI Assistant
