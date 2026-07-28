# 📊 Báo Cáo Đối Soát Hoạt Động Vận Hành (05/06/2026)

Báo cáo này được lập dựa trên quy trình đối soát chéo hàng ngày tại [huong_dan_doi_soat_quy_trinh.md](file:///home/kata/Coding/rausachfinal/doisoat/hangngay/huong_dan_doi_soat_quy_trinh.md) và số liệu thực tế được truy vấn từ cơ sở dữ liệu `rausachfinal` vào ngày **05/06/2026**.

---

## ⚙️ 1. Thông Tin Phiên Chốt Kho Ngày 05/06/2026

* **Mã chốt kho**: `CHOTKHO_1780648802077`
* **Tiêu đề**: `ĐIỀU CHỈNH CHỐT KHO TỰ ĐỘNG [EXCEL]`
* **Kho thực hiện**: **KHO - HCM** (TG-HCM)
* **Thời gian bấm chốt**: **15:40:02 (VN)** (UTC: 08:40:02)
* **Người thực hiện**: **Võ Thị Bích Dung** (`dv949723@gmail.com`)
* **Ghi chú phiên chốt**: `Chốt kho từ Excel (70 tăng, 91 giảm)`

---

## 📈 2. Kết Quả Đối Soát Chéo (Reconciliation Results)

Theo quy định, tất cả chứng từ Mua hàng (Đặt hàng NCC) và Bán hàng (Đơn khách hàng) của ngày 05/06/2026 phải được hoàn tất và khớp số liệu **TRƯỚC** thời điểm chốt kho (**15:40:02 VN**). Bất kỳ đơn hàng nào cập nhật sau mốc này đều vi phạm quy trình vận hành.

### 2.1. Bộ Phận Mua Hàng (Đặt Hàng NCC - Dathang)
* **Trạng thái**: **Phát hiện 03 trường hợp vi phạm quy trình** 🔴 (Cập nhật sau giờ chốt kho).

| Mã Đơn Đặt | Nhà Cung Cấp | Tên Đơn | Giờ Chốt Kho (VN) | Giờ Cập Nhật Đơn (VN) | Thời Gian Trễ | Phân Tích Chi Tiết |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TGNCC-YD00006** | Phạm Ngọc An Thu mua (TG) (TG-NCC0218) | Import 20260604_173322 | 15:40:02 | 17:05:35 | **1 giờ 25 phút 33 giây** 🔴 | Đơn hàng cập nhật số lượng giao nhận thực tế trễ sau giờ chốt kho, có chênh lệch ở các mặt hàng Bông sen và Ổi Ruột Đỏ (Xem chi tiết bên dưới). |
| **TGNCC-YD00097** | VŨ MUA (TG-NCC00234) | Import 20260604_173322 | 15:40:02 | 16:52:10 | **1 giờ 12 phút 8 giây** 🔴 | Đơn hàng cập nhật số lượng giao nhận thực tế trễ sau giờ chốt kho, có chênh lệch lớn ở nhiều mặt hàng rau quả (Xem chi tiết bên dưới). |
| **TGNCC-YD00007** | QUẢNG VỰA ỚT (TG-NCC0057) | Import 20260604_173322 | 15:40:02 | 16:37:07 | **57 phút 5 giây** 🔴 | Đơn hàng cập nhật số lượng giao nhận thực tế trễ sau giờ chốt kho, ghi nhận hủy nhận một số mặt hàng (Xem chi tiết bên dưới). |

### 2.2. Bộ Phận Bán Hàng (Đơn Khách Hàng - Donhang)
* **Trạng thái**: **Khớp hoàn toàn** ✅
* **Kết quả**: Không phát hiện đơn khách hàng (`Donhang`) nào cập nhật số lượng trễ hơn giờ chốt kho ngày 05/06/2026.

---

## 🔍 3. Chi Tiết Lệch Lượng Các Đơn Sửa Trễ

> [!IMPORTANT]
> **PHÁT HIỆN DẤU HIỆU LỆCH PHÁP/NHẬP CHÉO NCC (Cross-Supplier Discrepancies):**
> Có sự trùng khớp kỳ lạ về mặt số lượng chênh lệch giữa các đơn hàng của các NCC khác nhau, gợi ý nhân viên kho có thể đã giao nhầm xe hoặc nhập nhầm số liệu thực nhận từ nhà cung cấp này sang nhà cung cấp khác:
> - **Lá cây nhíp (lá mè)**: Đơn `TGNCC-YD00007` (QUẢNG VỰA ỚT) đặt 9.0 nhận 0.0 (Giảm **-9.0**), trong khi đơn `TGNCC-YD00097` (VŨ MUA) đặt 1.0 nhận 9.0 (Tăng **+8.0**).
> - **Xà lách búp mỹ**: Đơn `TGNCC-YD00007` (QUẢNG VỰA ỚT) đặt 5.3 nhận 0.0 (Giảm **-5.3**), trong khi đơn `TGNCC-YD00097` (VŨ MUA) đặt 1.0 nhận 5.3 (Tăng **+4.3**).
> - **Bông sen**: Đơn `TGNCC-YD00097` (VŨ MUA) đặt 5.0 nhận 0.0 (Giảm **-5.0**), trong khi đơn `TGNCC-YD00006` (Phạm Ngọc An) đặt 1.0 nhận 5.0 (Tăng **+4.0**).

### ⚠️ Đơn hàng `TGNCC-YD00006` (Phạm Ngọc An Thu mua (TG))
Đơn hàng này được cập nhật hoàn thành lúc **17:05:35** (trễ 1 giờ 25 phút 33 giây sau chốt). Chi tiết chênh lệch số lượng đặt (`sldat`) và nhận thực tế (`slnhan`):
* **Bông sen** (Mã SP: `I100455`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **5.0** (Tăng **+4.0**)
* **ỔI Ruột Đỏ** (Mã SP: `I100499`):
  * Số lượng đặt (`sldat`): **0.5**
  * Số lượng nhận thực tế (`slnhan`): **1.0** (Tăng **+0.5**)

### ⚠️ Đơn hàng `TGNCC-YD00007` (QUẢNG VỰA ỚT)
Đơn hàng này được cập nhật hoàn thành lúc **16:37:07** (trễ 57 phút 5 giây sau chốt). Chi tiết chênh lệch số lượng đặt (`sldat`) và nhận thực tế (`slnhan`):
* **Lá cây nhíp (lá mè)** (Mã SP: `I100132`):
  * Số lượng đặt (`sldat`): **9.0**
  * Số lượng nhận thực tế (`slnhan`): **0.0** (Giảm **-9.0** về 0)
* **Xà lách búp mỹ** (Mã SP: `I100203`):
  * Số lượng đặt (`sldat`): **5.3**
  * Số lượng nhận thực tế (`slnhan`): **0.0** (Giảm **-5.3** về 0)

### ⚠️ Đơn hàng `TGNCC-YD00097` (VŨ MUA)
Đơn hàng này được cập nhật hoàn thành lúc **16:52:10** (trễ 1 giờ 12 phút 8 giây sau chốt). Chi tiết chênh lệch số lượng đặt (`sldat`) và nhận thực tế (`slnhan`):
* **Lá sen tươi** (Mã SP: `I100141`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **10.0** (Tăng **+9.0**)
* **Lá cây nhíp (lá mè)** (Mã SP: `I100132`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **9.0** (Tăng **+8.0**)
* **Xà lách búp mỹ** (Mã SP: `I100203`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **5.3** (Tăng **+4.3**)
* **Cam vàng** (Mã SP: `I100469`):
  * Số lượng đặt (`sldat`): **8.5**
  * Số lượng nhận thực tế (`slnhan`): **10.0** (Tăng **+1.5**)
* **Khế xanh** (Mã SP: `I100116`):
  * Số lượng đặt (`sldat`): **4.5**
  * Số lượng nhận thực tế (`slnhan`): **5.0** (Tăng **+0.5**)
* **Khoai lang tím** (Mã SP: `I100122`):
  * Số lượng đặt (`sldat`): **1.5**
  * Số lượng nhận thực tế (`slnhan`): **2.0** (Tăng **+0.5**)
* **Xoài thái** (Mã SP: `I100510`):
  * Số lượng đặt (`sldat`): **0.3**
  * Số lượng nhận thực tế (`slnhan`): **0.8** (Tăng **+0.5**)
* **Lá chanh** (Mã SP: `I100133`):
  * Số lượng đặt (`sldat`): **1.3**
  * Số lượng nhận thực tế (`slnhan`): **1.5** (Tăng **+0.2**)
* **Chuối cau** (Mã SP: `I100471`):
  * Số lượng đặt (`sldat`): **4.0**
  * Số lượng nhận thực tế (`slnhan`): **4.2** (Tăng **+0.2**)
* **Táo xanh VN** (Mã SP: `I100506`):
  * Số lượng đặt (`sldat`): **5.9**
  * Số lượng nhận thực tế (`slnhan`): **6.0** (Tăng **+0.1**)
* **Dưa hấu không hạt** (Mã SP: `I100480`):
  * Số lượng đặt (`sldat`): **3.8**
  * Số lượng nhận thực tế (`slnhan`): **3.5** (Giảm **-0.3**)
* **Đậu hủ trứng CP 220gr** (Mã SP: `I100883`):
  * Số lượng đặt (`sldat`): **2.0**
  * Số lượng nhận thực tế (`slnhan`): **0.0** (Giảm **-2.0** về 0)
* **Khoai tây (lỡ)** (Mã SP: `I100350`):
  * Số lượng đặt (`sldat`): **5.0**
  * Số lượng nhận thực tế (`slnhan`): **1.5** (Giảm **-3.5**)
* **Bông sen** (Mã SP: `I100455`):
  * Số lượng đặt (`sldat`): **5.0**
  * Số lượng nhận thực tế (`slnhan`): **0.0** (Giảm **-5.0** về 0)
* **Hoa décor (Hoa trang trí 12g)** (Mã SP: `I100815`):
  * Số lượng đặt (`sldat`): **6.0**
  * Số lượng nhận thực tế (`slnhan`): **0.0** (Giảm **-6.0** về 0)

---

## 🩺 4. Chỉ Số Sức Khỏe Tồn Kho (Kho Sandbox Diagnostics)

Tại thời điểm đối soát, hệ thống ghi nhận các chỉ số tổng quan như sau:

* **Số lượng sản phẩm bị lệch tồn kho (giữa SanphamKho và TonKho)**: **0** sản phẩm bị lệch (Dữ liệu khớp hoàn toàn giữa các bảng tồn kho) ✅.
* **Số lượng sản phẩm bị âm kho thực tế tại KHO - HCM**: **21** sản phẩm 🔴.
* **Số lượng sản phẩm bị âm kho toàn cục (Global Inventory)**: **0** sản phẩm.
* **Số lượng sản phẩm chưa cấu hình giá gốc (Base Price = 0)**: **421** sản phẩm.
* **Số lượng sản phẩm chưa cấu hình giá bán (Sell Price = 0)**: **1011** sản phẩm.

---

## 📋 5. Đề Xuất Cho Quản Lý (Manager Action Items)

1. **Yêu cầu giải trình bộ phận Mua hàng & Thủ kho về nghi vấn giao nhầm/nhập nhầm NCC**:
   * Kiểm tra chéo ngay lập tức 3 đơn hàng `TGNCC-YD00006`, `TGNCC-YD00007`, và `TGNCC-YD00097` vì có dấu hiệu rất rõ của việc nhập nhầm hàng thực nhận giữa các NCC (như đã nêu trong mục 3).
   * Làm rõ vì sao các đơn hàng này đều được cập nhật hoàn thành muộn sau giờ chốt kho (từ 57 phút đến 1 giờ 25 phút).
2. **Kỷ luật vận hành**:
   * Nghiêm túc chấn chỉnh quy trình rà soát và đối chiếu biên bản giao nhận. Toàn bộ số lượng thực tế phải được khớp và cập nhật trước mốc chốt kho (15:40:02 VN).
3. **Xử lý âm kho & Dọn dẹp dữ liệu**:
   * Chạy kịch bản tối ưu hóa dữ liệu tồn kho để khắc phục 21 sản phẩm bị âm kho thực tế tại HCM.

---
**Người lập báo cáo**: Antigravity AI  
**Thời gian lập**: 05/06/2026 (Giờ Việt Nam)  
**Nguồn dữ liệu**: Cơ sở dữ liệu Sandbox `rausachfinal`
