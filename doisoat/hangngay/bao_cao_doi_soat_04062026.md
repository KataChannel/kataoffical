# 📊 Báo Cáo Đối Soát Hoạt Động Vận Hành (04/06/2026)

Báo cáo này được lập dựa trên quy trình đối soát chéo hàng ngày tại [huong_dan_doi_soat_quy_trinh.md](file:///home/kata/Coding/rausachfinal/doisoat/hangngay/huong_dan_doi_soat_quy_trinh.md) và số liệu thực tế được truy vấn từ cơ sở dữ liệu `rausachfinal` vào ngày **04/06/2026**.

---

## ⚙️ 1. Thông Tin Phiên Chốt Kho Ngày 04/06/2026

* **Mã chốt kho**: `CHOTKHO_1780565161223`
* **Tiêu đề**: `ĐIỀU CHỈNH CHỐT KHO TỰ ĐỘNG [EXCEL]`
* **Kho thực hiện**: **KHO - HCM** (TG-HCM)
* **Thời gian bấm chốt**: **16:26:01 (VN)** (UTC: 09:26:01)
* **Người thực hiện**: **Võ Thị Bích Dung** (`dv949723@gmail.com`)
* **Ghi chú phiên chốt**: `Chốt kho từ Excel (90 tăng, 93 giảm)`

---

## 📈 2. Kết Quả Đối Soát Chéo (Reconciliation Results)

Theo quy định, tất cả chứng từ Mua hàng (Đặt hàng NCC) và Bán hàng (Đơn khách hàng) của ngày 04/06/2026 phải được hoàn tất và khớp số liệu **TRƯỚC** thời điểm chốt kho (**16:26:01 VN**). Bất kỳ đơn hàng nào cập nhật sau mốc này đều vi phạm quy trình vận hành.

### 2.1. Bộ Phận Mua Hàng (Đặt Hàng NCC - Dathang)
* **Trạng thái**: **Phát hiện 01 trường hợp vi phạm quy trình** 🔴 (Cập nhật sau giờ chốt kho).

| Mã Đơn Đặt | Nhà Cung Cấp | Tên Đơn | Giờ Chốt Kho (VN) | Giờ Cập Nhật Đơn (VN) | Thời Gian Trễ | Phân Tích Chi Tiết |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TGNCC-YB00046** | VŨ MUA (TG-NCC00234) | Import 20260603_173932 | 16:26:01 | 17:11:57 | **45 phút 56 giây** 🔴 | Đơn hàng cập nhật số lượng giao nhận thực tế trễ sau giờ chốt kho, ghi nhận nhiều sai lệch lớn giữa lượng đặt và lượng nhận thực tế (Xem chi tiết bên dưới). |

### 2.2. Bộ Phận Bán Hàng (Đơn Khách Hàng - Donhang)
* **Trạng thái**: **Khớp hoàn toàn** ✅
* **Kết quả**: Không phát hiện đơn khách hàng (`Donhang`) nào cập nhật số lượng trễ hơn giờ chốt kho ngày 04/06/2026.

---

## 🔍 3. Chi Tiết Lệch Lượng Các Đơn Sửa Trễ

### ⚠️ Đơn hàng `TGNCC-YB00046` (VŨ MUA)
Đơn hàng này được cập nhật hoàn thành lúc **17:11:57** (trễ 45 phút 56 giây sau chốt). Khi đối chiếu số lượng đặt (`sldat`) và nhận thực tế (`slnhan`), phát hiện nhiều chênh lệch đáng kể:

* **Bông cải xanh Baby** (Mã SP: `I100025`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **5.0** (Tăng **+4.0**)
* **Tần ô** (Mã SP: `I100217`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **8.4** (Tăng **+7.4**)
* **Xà lách lolo tím** (Mã SP: `I100206`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **4.3** (Tăng **+3.3**)
* **Cải rổ** (Mã SP: `I100049`):
  * Số lượng đặt (`sldat`): **0.9**
  * Số lượng nhận thực tế (`slnhan`): **10.0** (Tăng **+9.1**)
* **Lá sen tươi** (Mã SP: `I100141`):
  * Số lượng đặt (`sldat`): **5.0**
  * Số lượng nhận thực tế (`slnhan`): **10.0** (Tăng **+5.0**)
* **Lá chanh** (Mã SP: `I100133`):
  * Số lượng đặt (`sldat`): **0.2**
  * Số lượng nhận thực tế (`slnhan`): **1.0** (Tăng **+0.8**)
* **Lá cây nhíp (lá mè)** (Mã SP: `I100132`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **2.0** (Tăng **+1.0**)
* **Chuối cau** (Mã SP: `I100471`):
  * Số lượng đặt (`sldat`): **4.0**
  * Số lượng nhận thực tế (`slnhan`): **5.2** (Tăng **+1.2**)
* **Táo đỏ trái** (Mã SP: `I100503`):
  * Số lượng đặt (`sldat`): **3.5**
  * Số lượng nhận thực tế (`slnhan`): **4.0** (Tăng **+0.5**)
* **Xoài thái** (Mã SP: `I100510`):
  * Số lượng đặt (`sldat`): **2.5**
  * Số lượng nhận thực tế (`slnhan`): **3.0** (Tăng **+0.5**)
* **Xoài chín** (Mã SP: `I100509`):
  * Số lượng đặt (`sldat`): **2.5**
  * Số lượng nhận thực tế (`slnhan`): **3.0** (Tăng **+0.5**)
* **Khế xanh** (Mã SP: `I100116`):
  * Số lượng đặt (`sldat`): **0.9**
  * Số lượng nhận thực tế (`slnhan`): **1.0** (Tăng **+0.1**)
* **CỦ HỦ DỪA THÂN** (Mã SP: `I100748`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **1.2** (Tăng **+0.2**)
* **Xà lách Big Frisse** (Mã SP: `I100201`):
  * Số lượng đặt (`sldat`): **1.0**
  * Số lượng nhận thực tế (`slnhan`): **0.5** (Giảm **-0.5**)
* **Hoa décor (Hoa trang trí 12g)** (Mã SP: `I100815`):
  * Số lượng đặt (`sldat`): **2.0**
  * Số lượng nhận thực tế (`slnhan`): **0.0** (Giảm **-2.0** về 0)

> [!WARNING]
> Việc cập nhật số lượng của đơn hàng `TGNCC-YB00046` với các thay đổi lớn về số lượng thực nhận (như cải rổ từ 0.9kg lên 10kg, tần ô từ 1kg lên 8.4kg) sau khi đã chốt kho (16:26:01) làm sai lệch số liệu tồn kho thực tế chốt lúc 16:26. Điều này cho thấy bộ phận kiểm hàng/kho chưa đối chiếu biên bản giao nhận kỹ lưỡng trước khi thực hiện chốt kho.

---

## 🩺 4. Chỉ Số Sức Khỏe Tồn Kho (Kho Sandbox Diagnostics)

Tại thời điểm đối soát, hệ thống ghi nhận các chỉ số tổng quan như sau:

* **Số lượng sản phẩm bị lệch tồn kho (giữa SanphamKho và TonKho)**: **0** sản phẩm bị lệch (Dữ liệu khớp hoàn toàn giữa các bảng tồn kho) ✅.
* **Số lượng sản phẩm bị âm kho thực tế tại KHO - HCM**: **22** sản phẩm 🔴.
* **Số lượng sản phẩm bị âm kho toàn cục (Global Inventory)**: **0** sản phẩm.
* **Số lượng sản phẩm chưa cấu hình giá gốc (Base Price = 0)**: **421** sản phẩm.
* **Số lượng sản phẩm chưa cấu hình giá bán (Sell Price = 0)**: **1011** sản phẩm.

---

## 📋 5. Đề Xuất Cho Quản Lý (Manager Action Items)

1. **Yêu cầu giải trình bộ phận Mua hàng & Thủ kho**:
   * Làm rõ vì sao đơn hàng `TGNCC-YB00046` (VŨ MUA) lại được cập nhật số lượng giao nhận thực tế muộn lúc 17:11:57 (sau giờ chốt kho 45 phút).
   * Yêu cầu kiểm tra chênh lệch số lượng lớn ở các mặt hàng như **Cải rổ** (tăng vọt lên 10kg), **Tần ô** (lên 8.4kg), và **Bông cải xanh Baby** (lên 5kg) so với đơn đặt ban đầu.
2. **Kỷ luật vận hành**:
   * Đảm bảo mọi chứng từ giao nhận nhà cung cấp trong ngày được kiểm đếm và cập nhật hoàn tất trước mốc chốt kho hàng ngày (thông thường khoảng 16:00 - 16:30).
3. **Xử lý âm kho & Dọn dẹp dữ liệu**:
   * Tiếp tục duy trì và chạy tối ưu hóa dữ liệu tồn kho (Lựa chọn 6 trong `run_dev.sh` trên môi trường Sandbox) để tự động sửa các sản phẩm bị âm kho thực tế tại HCM.

---
**Người lập báo cáo**: Antigravity AI  
**Thời gian lập**: 04/06/2026 (Giờ Việt Nam)  
**Nguồn dữ liệu**: Cơ sở dữ liệu Sandbox `rausachfinal`
