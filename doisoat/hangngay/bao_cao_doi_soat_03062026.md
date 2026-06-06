# 📊 Báo Cáo Đối Soát Hoạt Động Vận Hành (03/06/2026)

Báo cáo này được lập dựa trên quy trình đối soát chéo hàng ngày tại [huong_dan_doi_soat_quy_trinh.md](file:///home/kata/Coding/rausachfinal/doisoat/hangngay/huong_dan_doi_soat_quy_trinh.md) và số liệu thực tế được truy vấn từ cơ sở dữ liệu `rausachfinal` vào ngày **03/06/2026**.

---

## ⚙️ 1. Thông Tin Phiên Chốt Kho Ngày 03/06/2026

* **Mã chốt kho**: `CHOTKHO_1780471905314`
* **Tiêu đề**: `ĐIỀU CHỈNH CHỐT KHO TỰ ĐỘNG [EXCEL]`
* **Kho thực hiện**: **KHO - HCM** (TG-HCM)
* **Thời gian bấm chốt**: **14:31:45 (VN)** (UTC: 07:31:45)
* **Người thực hiện**: **Võ Thị Bích Dung** (`dv949723@gmail.com`)
* **Ghi chú phiên chốt**: `Chốt kho từ Excel (104 tăng, 88 giảm)`

---

## 📈 2. Kết Quả Đối Soát Chéo (Reconciliation Results)

Theo quy định, tất cả chứng từ Mua hàng (Đặt hàng NCC) và Bán hàng (Đơn khách hàng) của ngày 03/06/2026 phải được hoàn tất và khớp số liệu **TRƯỚC** thời điểm chốt kho (**14:31:45 VN**). Bất kỳ đơn hàng nào cập nhật sau mốc này đều vi phạm quy trình vận hành.

### 2.1. Bộ Phận Mua Hàng (Đặt Hàng NCC - Dathang)
* **Trạng thái**: **Khớp hoàn toàn** ✅
* **Kết quả**: Không phát hiện đơn Đặt hàng nhà cung cấp (`Dathang`) nào cập nhật số lượng trễ hơn giờ chốt kho ngày 03/06/2026.

### 2.2. Bộ Phận Bán Hàng (Đơn Khách Hàng - Donhang)
* **Trạng thái**: **Phát hiện 02 trường hợp vi phạm quy trình** 🔴 (Cập nhật sau giờ chốt kho).

| Mã Đơn Bán | Khách Hàng | Tên Đơn Bán | Giờ Chốt Kho (VN) | Giờ Cập Nhật Đơn (VN) | Thời Gian Trễ | Phân Tích Chi Tiết |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TG-AA45265** | YAKIMONO (PXL) | Đơn Hàng03_06_2026 | 14:31:45 | 14:54:35 | **22 phút 50 giây** 🟡 | Đơn hàng được tạo mới lúc **14:52:19** và hoàn tất lúc **14:54:35** (sau giờ chốt kho). |
| **TG-AA45112** | Palsaik Korean BBQ | Import palsaik - 20260602_162721 | 14:31:45 | 14:55:06 | **23 phút 21 giây** 🟡 | Đơn hàng được hệ thống **[AUTOCOMPLETE]** tự động hoàn thành muộn. Tuy nhiên, đơn hàng ghi nhận sự điều chỉnh lớn về lượng giao nhận thực tế (Xem chi tiết bên dưới). |

---

## 🔍 3. Chi Tiết Lệch Lượng Các Đơn Sửa Trễ

### ⚠️ Đơn hàng `TG-AA45112` (Palsaik Korean BBQ)
Đơn hàng này được cập nhật hoàn thành lúc **14:55:06** (trễ 23 phút sau chốt). Khi đối chiếu số lượng đặt và giao nhận thực tế, phát hiện chênh lệch cực kỳ lớn ở mặt hàng **Dưa hấu**:

* **Dưa hấu** (Mã SP: `I100479`):
  * Số lượng đặt (`sldat`): **8.0 Kg**
  * Số lượng giao thực tế (`slgiao`): **95.0 Kg** (Tăng vọt **+87.0 Kg** so với đơn đặt)
  * Số lượng nhận thực tế (`slnhan`): **95.0 Kg**
* **Chanh không hạt** (Mã SP: `I100060`):
  * Số lượng đặt (`sldat`): **0.3 Kg**
  * Số lượng giao/nhận (`slgiao`/`slnhan`): **0.5 Kg**
* **Xà lách lolo tím** (Mã SP: `I100206`):
  * Số lượng đặt (`sldat`): **0.3 Kg**
  * Số lượng giao/nhận (`slgiao`/`slnhan`): **0.4 Kg**

> [!WARNING]
> Việc cập nhật số lượng giao nhận thực tế của mặt hàng Dưa hấu tăng vọt từ 8.0 Kg lên 95.0 Kg sau khi kho đã chốt số (14:31:45) cho thấy số liệu chốt kho Excel lúc 14:31 có thể chưa phản ánh đúng lượng xuất kho thực tế của đơn hàng này, hoặc nhân viên đã xuất hàng trước nhưng hoàn thiện chứng từ sau khi chốt.

### ⚠️ Đơn hàng `TG-AA45265` (YAKIMONO (PXL))
Đơn này được tạo hoàn toàn mới và hoàn tất lúc **14:54:35** (sau giờ chốt kho).
* **Xà lách lolo xanh** (Mã SP: `I100207`): Số lượng giao nhận thực tế là **4.16 Kg**.

---

## 🩺 4. Chỉ Số Sức Khỏe Tồn Kho (Kho Sandbox Diagnostics)

Tại thời điểm đối soát, hệ thống ghi nhận các chỉ số tổng quan như sau:

* **Số lượng sản phẩm bị lệch tồn kho (giữa SanphamKho và TonKho)**: **0** sản phẩm bị lệch (Dữ liệu khớp hoàn toàn giữa các bảng tồn kho) ✅.
* **Số lượng sản phẩm bị âm kho thực tế tại KHO - HCM**: **24** sản phẩm 🔴.
* **Số lượng sản phẩm bị âm kho toàn cục (Global Inventory)**: **1** sản phẩm.
* **Số lượng sản phẩm chưa cấu hình giá gốc (Base Price = 0)**: **421** sản phẩm.
* **Số lượng sản phẩm chưa cấu hình giá bán (Sell Price = 0)**: **1011** sản phẩm.

---

## 📋 5. Đề Xuất Cho Quản Lý (Manager Action Items)

1. **Yêu cầu giải trình bộ phận Bán hàng / CSKH**:
   * Làm rõ vì sao đơn hàng `TG-AA45265` (Yakimono PXL) lại được tạo mới và hoàn thành sau giờ chốt kho của ngày giao hàng.
   * Xác minh lý do lượng Dưa hấu tại đơn `TG-AA45112` (Palsaik) tăng đột biến từ 8 Kg lên 95 Kg và vì sao tiến trình [AUTOCOMPLETE] lại cập nhật muộn sau giờ chốt kho.
2. **Kỷ luật chốt kho**:
   * Nhắc nhở nhân viên vận hành và nhập liệu kiểm tra tất cả các đơn hàng sỉ (đặc biệt là đơn import tự động) trước 14:15 hàng ngày để đảm bảo hoàn tất cập nhật trước giờ chốt kho (14:30).
3. **Xử lý âm kho & Giá bán bằng 0**:
   * Sử dụng menu chức năng quản trị (Lựa chọn 6 trong `run_dev.sh` trên hệ thống Sandbox) để tiến hành tối ưu hóa, làm sạch các sản phẩm bị âm kho và chuẩn hóa lại giá bán/giá gốc bị thiếu.

---
**Người lập báo cáo**: Antigravity AI  
**Thời gian lập**: 04/06/2026 (Giờ Việt Nam)  
**Nguồn dữ liệu**: Cơ sở dữ liệu Sandbox `rausachfinal`
