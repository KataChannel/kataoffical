# Báo Cáo Đánh Giá Vận Hành Kho (Sau Chốt Kho 08/05/2026)

**Ngày thực hiện:** 09/05/2026  
**Phạm vi:** Đối soát dữ liệu từ lần chốt kho gần nhất (**08/05/2026 15:03**) đến hiện tại.  
**Mục tiêu:** Kiểm tra tính nhất quán của dữ liệu kho và đánh giá hiệu quả của các bản vá lỗi trước đó.

---

## 1. Tóm Lược Hoạt Động (Executive Summary)

Kể từ lần chốt kho ngày 08/05, hệ thống vận hành tương đối ổn định với lưu lượng giao dịch như sau:

| Loại hình | Số lượng | Trạng thái |
| :--- | :---: | :--- |
| **Đơn hàng bán ra (Out)** | 143 | Đã giao/Hoàn thành |
| **Đơn nhập hàng (In)** | 74 | Đã nhận/Đã nhập |
| **Phiếu kho phát sinh** | 226 | Bao gồm cả phiếu tự động từ đơn hàng |
| **Sản phẩm có biến động** | 298 | ~95% danh mục sản phẩm |

---

## 2. Kết Quả Đối Soát Chi Tiết

### 2.1. Tính Nhất Quán Giữa Đơn Hàng & Phiếu Kho
Một cải thiện đáng kể so với báo cáo ngày 07/05 (từng thiếu >100 phiếu). Hiện tại hệ thống chỉ ghi nhận **02 đơn hàng** bị lỗi không tự động tạo Phiếu Xuất Kho khi chuyển trạng thái `dagiao`:
- **Đơn hàng lỗi:** `TG-AA37654`, `TG-AA41053`.
- **Phân tích:** Các đơn hàng này đã giao nhưng chưa trừ kho vật lý (`sltontt`), dẫn đến sai lệch tồn kho nhẹ tại các mã hàng liên quan.

### 2.2. Tình Trạng Tồn Kho Âm (Negative Stock)
Hệ thống phát hiện **43 mã sản phẩm** có tồn kho thực tế bị âm.
- **Top 3 mã âm lớn nhất:**
    - **Củ cải trắng (I100067):** -1.15 kg
    - **Khổ qua (I100118):** -1.1 kg
    - **Tỏi xay (I100232):** -0.8 kg
- **Nguyên nhân:** Nhân viên thực hiện xuất bán trước khi làm phiếu nhập kho trên hệ thống, hoặc nhập kho thiếu số lượng thực tế.

---

## 3. Rủi Ro Nghiêm Trọng: Tồn Kho Dự Phòng (Ghost Reservations)

Vấn đề lớn nhất hiện tại là chỉ số **`slchogiao`** (hàng đang được giữ chỗ cho đơn đặt) đang bị treo ở mức bất thường tại một số mã hàng chủ lực.

| Tên Sản Phẩm | Tồn Thực Tế (A) | Đang Chờ Giao (B) | Tồn Khả Dụng (A-B) |
| :--- | :---: | :---: | :---: |
| **Trứng vịt muối** | 520 | **1,380** | **-860** |
| **Bắp mỹ trái (Loại 1)** | 490 | **962** | **-472** |
| **Xà lách lolo xanh** | 36.6 | **670** | **-633.4** |
| **Đậu hủ miếng trắng** | 40 | **639** | **-599** |

**Hệ quả:** Mặc dù kho vẫn còn hàng (`slton` dương), nhưng vì số lượng chờ giao quá lớn, khách hàng đặt hàng qua Website/App sẽ thấy báo **"Hết hàng"**. Đây là hiện tượng "Tồn ảo âm" do không dọn dẹp các đơn hàng treo hoặc đơn hàng đã hủy nhưng chưa giải phóng dự phòng.

---

## 4. Hành Động Khắc Phục (Action Plan)

### A. Xử lý tức thời (Immediate)
1.  **Bù phiếu thiếu:** Tạo thủ công Phiếu Xuất cho 2 đơn hàng `TG-AA37654` và `TG-AA41053`.
2.  **Dọn dẹp dự phòng:** Chạy script rà soát và Reset `slchogiao` cho các đơn hàng `dadat` đã quá hạn 24h mà chưa giao.

### B. Vận hành định kỳ (Maintenance)
1.  **Re-baseline:** Tiến hành chốt kho (Inventory Adjustment) cho 43 mã bị âm vào cuối ngày để đưa số liệu về 0 hoặc số thực tế.
2.  **Giám sát:** Cấu hình cảnh báo tự động khi phát hiện đơn hàng `dagiao` mà không có `madonhang` trong bảng `PhieuKho` sau 15 phút.

---
**Người báo cáo:** Antigravity AI Assistant  
**Ngày báo cáo:** 09/05/2026  
**Lưu trữ:** `docs/phantich/Bao_cao_van_hanh_kho_sau_chot_09052026.md`
