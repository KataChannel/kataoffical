# 📊 Báo Cáo Đối Soát Hoạt Động Vận Hành (07/06/2026)

Báo cáo này được lập dựa trên quy trình đối soát chéo hàng ngày tại [huong_dan_doi_soat_quy_trinh.md](file:///home/kata/Coding/rausachfinal/doisoat/hangngay/huong_dan_doi_soat_quy_trinh.md) và số liệu thực tế được truy vấn từ cơ sở dữ liệu `rausachfinal` vào ngày **08/06/2026**.

---

## ⚙️ 1. Thông Tin Phiên Chốt Kho Ngày 07/06/2026

* **Mã chốt kho**: `CHOTKHO_BASELINE_0706_1780835046201`
* **Tiêu đề**: `Chốt kho Base Line 07-06-2026`
* **Kho thực hiện**: **KHO - HCM** (TG-HCM)
* **Thời gian bấm chốt**: **19:24:06 (VN)** (UTC: 12:24:06)
* **Người thực hiện**: **Hệ thống** (Tự động chạy qua kịch bản baseline)
* **Ghi chú phiên chốt**: `Chốt kho Baseline chuẩn theo file Ton-Huy 07-6.xlsx - Cập nhật số tồn chuẩn và dọn dẹp đơn cũ`

---

## 📈 2. Kết Quả Đối Soát Chéo (Reconciliation Results)

Theo quy định, tất cả chứng từ Mua hàng (Đặt hàng NCC) và Bán hàng (Đơn khách hàng) của ngày 07/06/2026 phải được hoàn tất và khớp số liệu **TRƯỚC** thời điểm chốt kho (**19:24:06 VN**). Bất kỳ đơn hàng nào cập nhật sau mốc này đều vi phạm quy trình vận hành.

### 2.1. Bộ Phận Mua Hàng (Đặt Hàng NCC - Dathang)
* **Trạng thái**: **Khớp hoàn toàn** ✅
* **Kết quả**: Không phát hiện đơn đặt hàng NCC (`Dathang`) nào cập nhật số lượng trễ hơn giờ chốt kho ngày 07/06/2026.

### 2.2. Bộ Phận Bán Hàng (Đơn Khách Hàng - Donhang)
* **Trạng thái**: **Phát hiện 01 trường hợp vi phạm quy trình** 🔴 (Cập nhật sau giờ chốt kho).

| Mã Đơn Bán | Khách Hàng / Đơn | Tên Đơn Bán | Giờ Chốt Kho (VN) | Giờ Cập Nhật Đơn (VN) | Thời Gian Trễ | Phân Tích Chi Tiết |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TG-AA45875** | Hệ thống tự động | Import xoimemcl - 20260606_163346 | 19:24:06 | 08/06/2026 08:13:55 | **12 giờ 49 phút 49 giây** 🔴 | Đơn hàng được tự động cập nhật trễ trạng thái/số lượng giao sau giờ chốt kho, ghi nhận chênh lệch ở mặt hàng Củ sắn (Xem chi tiết bên dưới). |

---

## 🔍 3. Chi Tiết Lệch Lượng Các Đơn Sửa Trễ

### ⚠️ Đơn hàng `TG-AA45875` (Hệ thống tự động)
Đơn hàng này được cập nhật hoàn thành lúc **08:13:55** ngày 08/06/2026 (trễ 12 giờ 49 phút 49 giây sau chốt). Chi tiết chênh lệch số lượng đặt (`sldat`), giao (`slgiao`) và nhận thực tế (`slnhan`):
* **Củ sắn** (Mã SP: `I100073`):
  * Số lượng đặt (`sldat`): **3.0**
  * Số lượng giao (`slgiao`): **2.6** (Giảm **-0.4**)
  * Số lượng nhận thực tế (`slnhan`): **2.6** (Giảm **-0.4**)

---

## 🩺 4. Chỉ Số Sức Khỏe Tồn Kho (Kho Sandbox Diagnostics)

Tại thời điểm đối soát, hệ thống ghi nhận các chỉ số tổng quan như sau:

* **Số lượng sản phẩm bị lệch tồn kho (giữa SanphamKho và TonKho)**: **0** sản phẩm bị lệch (Dữ liệu khớp hoàn toàn giữa các bảng tồn kho) ✅.
* **Số lượng sản phẩm bị lệch thực tế so với hệ thống (Chênh lệch kiểm kho)**:
  * **129** sản phẩm được cập nhật chuẩn từ file Excel kiểm kho (Số tồn khớp hệ thống và thực tế) ✅.
  * **70** sản phẩm bị lệch thực tế so với hệ thống và tự động reset về 0 (Không xuất hiện trong Excel kiểm kho) 🔴.
* **Số lượng sản phẩm bị âm kho thực tế tại KHO - HCM**: **0** sản phẩm (Hệ thống đã dọn dẹp và reset tồn kho âm về 0) ✅.
* **Số lượng sản phẩm bị âm kho toàn cục (Global Inventory)**: **0** sản phẩm ✅.
* **Số lượng sản phẩm chưa cấu hình giá gốc (Base Price = 0)**: **421** sản phẩm.
* **Số lượng sản phẩm chưa cấu hình giá bán (Sell Price = 0)**: **1011** sản phẩm.

---

## 📋 5. Đề Xuất Cho Quản Lý (Manager Action Items)

1. **Rà soát quy trình hoàn tất đơn hàng tự động/bán lẻ**:
   * Đơn bán hàng `TG-AA45875` được hệ thống hoàn thành muộn vào sáng hôm sau (08/06/2026) và sửa số lượng giao nhận thực tế của Củ sắn từ 3.0 về 2.6. Cần nhắc nhở bộ phận đóng gói/giao nhận cập nhật chính xác số giao trước mốc chốt kho hàng ngày.
2. **Khắc phục các sản phẩm tự động reset về 0**:
   * 70 sản phẩm không nằm trong Excel kiểm kho ngày 07/06 đã bị reset về 0. Cần kiểm tra chéo xem đây có phải các mặt hàng đã đứt mẫu hoặc đã bán hết sạch hay không.
3. **Cấu hình bổ sung thông tin giá sản phẩm**:
   * Tiếp tục theo dõi và yêu cầu bộ phận danh mục hoàn thiện cấu hình giá bán (1011 sản phẩm) và giá gốc (421 sản phẩm) để hệ thống tính toán doanh thu/lợi nhuận chính xác.

---
**Người lập báo cáo**: Antigravity AI  
**Thời gian lập**: 08/06/2026 (Giờ Việt Nam)  
**Nguồn dữ liệu**: Cơ sở dữ liệu Sandbox `rausachfinal`
