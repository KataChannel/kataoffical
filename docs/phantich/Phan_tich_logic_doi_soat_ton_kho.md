# Báo Cáo Phân Tích Logic Đối Soát & Giải Pháp Chốt Kho (Cập nhật 13/04/2026)

## 1. Tổng Quan Tình Trạng
Hệ thống ghi nhận các sai lệch nghiêm trọng giữa số liệu Snapshot (Hệ thống) và thực tế kệ hàng do lỗi logic dồn tích đa kho và độ trễ trong vận hành.

---

## 2. Phân Tích Nguyên Nhân Gốc (Root Cause)

### A. Lỗi Kỹ Thuật: Dồn tích đa kho (Location Error)
- **Vấn đề:** Thiếu bộ lọc `khoId` khi tính toán lịch sử Nhập/Xuất.
- **Hệ quả:** Số liệu chốt kho bị cộng dồn từ tất cả chi nhánh, gây sai lệch lớn (Vd: Dưa hấu lệch -406kg do tính cả kho Long An vào kho HCM).
- **Trạng thái:** **Đã sửa lỗi** bằng cách ép lọc `khoId` trong logic service.

### B. Lỗi Vận Hành: Độ trễ quy trình (Process Lag)
- **Vấn đề:** Nhân viên chưa kịp chuyển trạng thái "Đã nhận" trên hệ thống dù hàng đã về kệ.
- **Quy tắc công ty:** "Đã đặt hàng là chắc chắn nhận" (Mặc định đơn đặt sẽ về trừ khi có lệnh hủy).

---

## 3. Rủi Ro Thừa Hàng & Giải Pháp Logic (Update)

### 3.1. Rủi ro "Cộng dồn 2 lần" (Double Counting)
Khi áp dụng quy tắc "Chắc chắn nhận", một sản phẩm có thể bị tính 2 lần vào tồn kho:
1.  **Lần 1:** Qua việc đếm thực tế khi Chốt kho (Baseline mới đã bao gồm hàng vừa về).
2.  **Lần 2:** Khi nhân viên hậu kỳ bấm nút "Xác nhận đã nhận" cho đơn đặt hàng cũ.
- **Kết quả:** Tồn kho hệ thống sẽ lớn gấp đôi thực tế ngay sau khi bấm xác nhận đơn cũ.

### 3.2. Giải pháp: Cơ chế "Dọn dẹp tự động" (Auto-Consolidation)
Để số liệu **Gợi ý đặt hàng** tin cậy nhất, hệ thống thực hiện:
- **Tự động đóng đơn cũ:** Khi Chốt kho thành công, hệ thống tự động tìm và đóng (Completed/Consolidated) các Đơn đặt hàng của sản phẩm đó có ngày phát sinh trước ngày chốt.
- **Lý do:** Vì số thực tế chốt đã là "phán quyết cuối cùng", nó đã bao gồm tất cả các đợt nhập hàng trước đó. Việc giữ lại các đơn cũ ở trạng thái "Sắp về" sẽ làm sai lệch dự báo.

---

## 4. Công Thức Tồn Kho Dự Báo (Virtual Inventory)

Gợi ý đặt hàng được tính dựa trên con số tin cậy nhất:
> **Tồn dự báo = (Số thực tế vừa chốt) + (Các đơn nhập MỚI sau ngày chốt) - (Các đơn bán chưa giao)**

### Lợi ích:
- Tránh đặt dư hàng (Over-ordering).
- Loại bỏ gánh nặng thủ tục cho nhân viên (Không phải đi xác nhận lại các phiếu cũ đã lạc hậu).
- Đảm bảo "điểm tựa" của hệ thống luôn là thực tế kệ hàng.

---
**Người tổng hợp:** Antigravity AI  
**Ngày thực hiện:** 13/04/2026  
**Lưu trữ tại:** `/docs/phantich/Phan_tich_logic_doi_soat_ton_kho.md`
