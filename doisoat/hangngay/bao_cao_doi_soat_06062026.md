# 📊 Báo Cáo Đối Soát Hoạt Động Vận Hành (06/06/2026)

Báo cáo này được lập dựa trên quy trình đối soát chéo hàng ngày tại [huong_dan_doi_soat_quy_trinh.md](file:///home/kata/Coding/rausachfinal/doisoat/hangngay/huong_dan_doi_soat_quy_trinh.md) và số liệu thực tế được truy vấn từ cơ sở dữ liệu `rausachfinal` vào ngày **08/06/2026**.

---

## ⚙️ 1. Thông Tin Phiên Chốt Kho Ngày 06/06/2026

* **Mã chốt kho**: `CHOTKHO_BASELINE_0606_1780759474866`
* **Tiêu đề**: `Chốt kho Base Line 06-06-2026`
* **Kho thực hiện**: **KHO - HCM** (TG-HCM)
* **Thời gian bấm chốt**: **22:24:35 (VN)** (UTC: 15:24:35)
* **Người thực hiện**: **Hệ thống** (Tự động chạy qua kịch bản baseline)
* **Ghi chú phiên chốt**: `Chốt kho Baseline chuẩn theo file Ton-Huy 06-6 (1).xlsx - Cập nhật số tồn chuẩn và dọn dẹp đơn cũ`

---

## 📈 2. Kết Quả Đối Soát Chéo (Reconciliation Results)

Theo quy định, tất cả chứng từ Mua hàng (Đặt hàng NCC) và Bán hàng (Đơn khách hàng) của ngày 06/06/2026 phải được hoàn tất và khớp số liệu **TRƯỚC** thời điểm chốt kho (**22:24:35 VN**). Bất kỳ đơn hàng nào cập nhật sau mốc này đều vi phạm quy trình vận hành.

### 2.1. Bộ Phận Mua Hàng (Đặt Hàng NCC - Dathang)
* **Trạng thái**: **Phát hiện 01 trường hợp vi phạm quy trình** 🔴 (Cập nhật sau giờ chốt kho).

| Mã Đơn Đặt | Nhà Cung Cấp | Tên Đơn | Giờ Chốt Kho (VN) | Giờ Cập Nhật Đơn (VN) | Thời Gian Trễ | Phân Tích Chi Tiết |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TGNCC-YG00009** | VŨ MUA (TG-NCC00234) | Import 20260605_174030 | 22:24:35 | 07/06/2026 10:39:16 | **12 giờ 14 phút 41 giây** 🔴 | Đơn hàng cập nhật số lượng giao nhận thực tế trễ sau giờ chốt kho, có chênh lệch ở nhiều mặt hàng rau quả như Bí ngòi xanh, Bó xôi (Nhà Lồng), Đậu hủ trứng CP 220gr, v.v. (Xem chi tiết bên dưới). |

### 2.2. Bộ Phận Bán Hàng (Đơn Khách Hàng - Donhang)
* **Trạng thái**: **Phát hiện 02 trường hợp vi phạm quy trình** 🔴 (Cập nhật trạng thái tự động trễ).

| Mã Đơn Bán | Khách Hàng / Đơn | Tên Đơn Bán | Giờ Chốt Kho (VN) | Giờ Cập Nhật Đơn (VN) | Thời Gian Trễ | Phân Tích Chi Tiết |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TG-AA45700** | Hệ thống tự động | Import fruitaurevecn2 - 20260605_165144 | 22:24:35 | 08/06/2026 07:41:11 | **1 ngày 9 giờ 16 phút 36 giây** 🔴 | Đơn hàng được hệ thống tự động hoàn thành muộn. Không có chênh lệch số lượng giao nhận thực tế so với số lượng đặt (khớp hoàn toàn). |
| **TG-AA45699** | Hệ thống tự động | Import fruitaurevecn1 - 20260605_165144 | 22:24:35 | 08/06/2026 07:40:44 | **1 ngày 9 giờ 16 phút 9 giây** 🔴 | Đơn hàng được hệ thống tự động hoàn thành muộn. Không có chênh lệch số lượng giao nhận thực tế so với số lượng đặt (khớp hoàn toàn). |

---

## 🔍 3. Chi Tiết Lệch Lượng Các Đơn Sửa Trễ

### ⚠️ Đơn hàng `TGNCC-YG00009` (VŨ MUA)
Đơn hàng này được cập nhật hoàn thành lúc **10:39:16** ngày 07/06/2026 (trễ 12 giờ 14 phút 41 giây sau chốt). Chi tiết chênh lệch số lượng đặt (`sldat`) và nhận thực tế (`slnhan`):
* **Bí ngòi xanh** (Mã SP: `I100016`):
  * Số lượng đặt (`sldat`): **40.0**
  * Số lượng nhận thực tế (`slnhan`): **0.0** (Giảm **-40.0** về 0)
* **Bó xôi (Nhà Lồng)** (Mã SP: `I100018`):
  * Số lượng đặt (`sldat`): **11.6**
  * Số lượng nhận thực tế (`slnhan`): **0.0** (Giảm **-11.6** về 0)
* **Đậu hủ trứng CP 220gr** (Mã SP: `I100883`):
  * Số lượng đặt (`sldat`): **46.0**
  * Số lượng nhận thực tế (`slnhan`): **0.0** (Giảm **-46.0** về 0)
* **Bông hẹ** (Mã SP: `I100028`):
  * Số lượng đặt (`sldat`): **0.2**
  * Số lượng nhận thực tế (`slnhan`): **1.0** (Tăng **+0.8**)
* **Cam vàng** (Mã SP: `I100469`):
  * Số lượng đặt (`sldat`): **10.0**
  * Số lượng nhận thực tế (`slnhan`): **12.0** (Tăng **+2.0**)
* **Chanh vàng** (Mã SP: `I100062`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **2.0** (Tăng **+1.0**)
* **Lá bạc hà** (Mã SP: `I100561`):
  * Số lượng đặt (`sldat`): **0.1**
  * Số lượng nhận thực tế (`slnhan`): **0.0** (Giảm **-0.1** về 0)
* **Lá cây nhíp (lá mè)** (Mã SP: `I100132`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **4.0** (Tăng **+3.0**)
* **Lá chanh** (Mã SP: `I100133`):
  * Số lượng đặt (`sldat`): **0.8**
  * Số lượng nhận thực tế (`slnhan`): **1.5** (Tăng **+0.7**)
* **Lá sen tươi** (Mã SP: `I100141`):
  * Số lượng đặt (`sldat`): **16.0**
  * Số lượng nhận thực tế (`slnhan`): **20.0** (Tăng **+4.0**)
* **Nấm mối đen** (Mã SP: `I100970`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **0.0** (Giảm **-1.0** về 0)
* **Táo xanh VN** (Mã SP: `I100506`):
  * Số lượng đặt (`sldat`): **1.9**
  * Số lượng nhận thực tế (`slnhan`): **2.0** (Tăng **+0.1**)
* **Xà lách lolo tím** (Mã SP: `I100206`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **2.0** (Tăng **+1.0**)
* **Xà lách Radichio** (Mã SP: `I100208`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **3.0** (Tăng **+2.0**)
* **Xoài chín** (Mã SP: `I100509`):
  * Số lượng đặt (`sldat`): **1.2**
  * Số lượng nhận thực tế (`slnhan`): **1.8** (Tăng **+0.6**)
* **Xoài thái** (Mã SP: `I100510`):
  * Số lượng đặt (`sldat`): **4.0**
  * Số lượng nhận thực tế (`slnhan`): **4.3** (Tăng **+0.3**)

### ⚠️ Đơn hàng `TG-AA45700` & `TG-AA45699` (Hệ thống tự động)
* Không ghi nhận chênh lệch số lượng đặt (`sldat`) và giao nhận thực tế (`slgiao`, `slnhan`). Số liệu khớp hoàn toàn ✅.

---

## 🩺 4. Chỉ Số Sức Khỏe Tồn Kho (Kho Sandbox Diagnostics)

Tại thời điểm đối soát, hệ thống ghi nhận các chỉ số tổng quan như sau:

* **Số lượng sản phẩm bị lệch tồn kho (giữa SanphamKho và TonKho)**: **0** sản phẩm bị lệch (Dữ liệu khớp hoàn toàn giữa các bảng tồn kho) ✅.
* **Số lượng sản phẩm bị lệch thực tế so với hệ thống (Chênh lệch kiểm kho)**:
  * **113** sản phẩm được cập nhật chuẩn từ file Excel kiểm kho (Số tồn khớp hệ thống và thực tế) ✅.
  * **120** sản phẩm bị lệch thực tế so với hệ thống và tự động reset về 0 (Không xuất hiện trong Excel kiểm kho) 🔴.
* **Số lượng sản phẩm bị âm kho thực tế tại KHO - HCM**: **0** sản phẩm (Hệ thống đã dọn dẹp và reset tồn kho âm về 0) ✅.
* **Số lượng sản phẩm bị âm kho toàn cục (Global Inventory)**: **0** sản phẩm ✅.
* **Số lượng sản phẩm chưa cấu hình giá gốc (Base Price = 0)**: **421** sản phẩm.
* **Số lượng sản phẩm chưa cấu hình giá bán (Sell Price = 0)**: **1011** sản phẩm.

---

## 📋 5. Đề Xuất Cho Quản Lý (Manager Action Items)

1. **Rà soát lại quy trình đối chiếu và cập nhật đơn đặt hàng NCC**:
   * Đơn hàng `TGNCC-YG00009` bị cập nhật trễ rất muộn (sáng hôm sau) với nhiều thay đổi lớn về số lượng (hủy nhận 40 Bí ngòi xanh, 46 Đậu hủ trứng, 11.6 Bó xôi). Cần yêu cầu kế toán mua hàng và thủ kho làm rõ vì sao biên bản giao nhận thực tế không được chốt sớm trước 22:24.
2. **Khắc phục các sản phẩm tự động reset về 0**:
   * 120 sản phẩm không nằm trong Excel kiểm kho đã bị reset về 0. Cần kiểm tra xem các mặt hàng này có thực tế còn tồn tại kho hay không hay đã hết hẳn để cập nhật lại hệ thống nếu cần.
3. **Cấu hình bổ sung thông tin giá sản phẩm**:
   * Vẫn còn số lượng lớn sản phẩm chưa được cấu hình giá bán (1011 sản phẩm) và giá gốc (421 sản phẩm). Cần đề xuất bộ phận mua hàng và bán hàng hoàn tất thông tin giá sản phẩm.

---
**Người lập báo cáo**: Antigravity AI  
**Thời gian lập**: 08/06/2026 (Giờ Việt Nam)  
**Nguồn dữ liệu**: Cơ sở dữ liệu Sandbox `rausachfinal`
