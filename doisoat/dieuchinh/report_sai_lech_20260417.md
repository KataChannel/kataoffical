
# BÁO CÁO XỬ LÝ SAI LỆCH DỮ LIỆU NHU CẦU ĐẶT HÀNG
**Ngày thực hiện:** 2026-04-17
**Trạng thái:** Đã xử lý (Cập nhật logic Frontend)

## 1. Mô tả sự cố
- **Sản phẩm tiêu biểu:** Bông điên điển (Mã SP: I100027)
- **Hiện tượng:** 
    - Cột **TỔNG ĐẶT (KHÁCH)** hiển thị: **11.500 kg**.
    - Khi nhấn xem chi tiết (Dialog), danh sách đơn hàng chỉ tổng cộng: **1.500 kg**.
    - Người dùng nghi ngờ tính toán sai lệch hoặc mất dữ liệu đơn hàng.

## 2. Kết quả chẩn đoán (Investigated by Bun/Prisma)
Sau khi truy vấn trực tiếp vào database, chúng tôi phát hiện 11.5kg này được cấu thành từ:
1. **Đơn hàng nợ (Backlog) từ tháng 01/2026:**
    - Mã đơn `TG-AA22241` (09/01/2026): 5.0 kg
    - Mã đơn `TG-AA24722` (23/01/2026): 5.0 kg
    - *Trạng thái:* `dadat` (Chưa giao).
2. **Đơn hàng mới (Hôm nay - 17/04/2026):**
    - Tổng cộng: 1.5 kg (Bao gồm cả đơn `dadat` và đơn `dagiao` một phần).

## 3. Nguyên nhân gốc rễ
Sự sai lệch xuất phát từ **Logic lọc ngày không đồng nhất**:
- **Backend (getNhuCauDatHang):** Sử dụng điều kiện `ngaygiao <= endDate`. Do đó, nó cộng dồn tất cả các đơn hàng chưa hoàn chỉnh từ quá khứ (Nợ cũ).
- **Frontend (loadDonhangData):** Trước đây sử dụng điều kiện `ngaygiao >= startDate AND ngaygiao <= endDate`. Vì người dùng đang lọc theo ngày "Hôm nay", hệ thống đã bỏ qua 10kg nợ cũ của tháng 1 trong bảng chi tiết.

## 4. Hành động khắc phục
- **File chỉnh sửa:** `frontend/src/app/admin/dathang/nhucaudathang/nhucaudathang.component.ts`
- **Nội dung:** Thay đổi logic lọc trong hàm `loadDonhangData`. Chuyển từ lọc `gte-lte` sang lọc `lte: endDate` đối với các đơn hàng có trạng thái `dadat` hoặc `dagiao`.
- **Kết quả:** Danh sách chi tiết hiện đã hiển thị đủ các đơn hàng nợ cũ, tổng số khớp hoàn toàn với con số 11.5 ở bảng ngoài.

## 5. Kiến nghị
- Các đơn hàng từ tháng 1/2026 (Ms. Hai) vẫn đang ở trạng thái `dadat` nhưng thực tế có thể đã bị bỏ quên hoặc đã giao ngoài hệ thống.
- Cần bộ phận vận hành kiểm tra lại: Nếu không giao nữa, nên chuyển trạng thái sang **Hủy** để không làm sai lệch dự báo thu mua hàng ngày.
