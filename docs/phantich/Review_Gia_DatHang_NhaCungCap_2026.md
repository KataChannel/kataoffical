# BÁO CÁO REVIEW TOÀN BỘ ĐẶT HÀNG NHÀ CUNG CẤP (01/01/2026 - NAY)
**Ngày thực hiện báo cáo**: 30/07/2026  
**Đơn vị đối soát**: Hệ thống Quản lý Rau Sạch (Trần Gia)  
**Phạm vi dữ liệu**: Toàn bộ Đặt hàng Nhà cung cấp (`Dathang` & `Dathangsanpham`) từ `01/01/2026` đến `30/07/2026`.

---

## I. TỔNG QUAN VÀ KẾT QUẢ ĐỐI SOÁT GIÁ

### 1. Đã cập nhật giá đến ngày nào?
* **Ngày cập nhật đầy đủ chính thức**: **28/07/2026** (Đạt tỷ lệ cập nhật giá ~85% - 90% các đơn trong ngày).
* **Tình trạng các ngày từ 29/07/2026 đến 31/07/2026**:
  * **Ngày 29/07/2026**: Đã cập nhật **95 / 156** mặt hàng (**60.9%** có giá, **39.1%** còn 0đ - Cập nhật dở dang).
  * **Ngày 30/07/2026**: Có 34 đơn hàng / 145 mặt hàng → **0%** có giá (**100%** còn 0đ - CHƯA cập nhật).
  * **Ngày 31/07/2026**: Có 2 đơn hàng / 3 mặt hàng → **0%** có giá (**100%** còn 0đ - CHƯA cập nhật).

### 2. Thống kê tổng hợp từ 01/01/2026 đến nay:
* **Tổng số đơn đặt hàng NCC (`Dathang`)**: **13,150 đơn hàng**
* **Tổng số lượt sản phẩm đặt (`Dathangsanpham`)**: **63,563 lượt**
* **Số lượt sản phẩm đã có giá (`gianhap > 0`)**: **59,661 lượt (93.86%)**
* **Số lượt sản phẩm chưa có giá (`gianhap = 0` hoặc NULL)**: **3,902 lượt (6.14%)**
* **Tổng giá trị tiền hàng thực nhận đã ghi nhận**: **20,821,430,686.85 VNĐ**

---

## II. BẢNG THỐNG KÊ CHI TIẾT THEO TỪNG THÁNG (NĂM 2026)

| Tháng | Số đơn NCC | Tổng sản phẩm đặt | Đã có giá nhập (`> 0`) | Chưa có giá (`= 0`) | Tỷ lệ hoàn thành (%) | Tổng thành tiền nhận (`ttnhan` VNĐ) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Tháng 01/2026** | 2,100 | 9,632 | 9,460 | 172 | **98.21%** | 3,597,361,416.70 |
| **Tháng 02/2026** | 1,621 | 7,482 | 7,125 | 357 | **95.23%** | 2,706,102,093.80 |
| **Tháng 03/2026** | 1,998 | 9,301 | 9,113 | 188 | **97.98%** | 2,830,436,797.50 |
| **Tháng 04/2026** | 1,979 | 9,395 | 9,116 | 279 | **97.03%** | 2,466,744,397.89 |
| **Tháng 05/2026** | 1,881 | 9,482 | 8,556 | 926 | **90.23%** | 4,165,752,237.19 |
| **Tháng 06/2026** | 1,794 | 9,469 | 8,573 | 896 | **90.54%** | 2,696,505,168.50 |
| **Tháng 07/2026** | 1,777 | 8,802 | 7,718 | 1,084 | **87.68%** | 2,358,528,575.27 |
| **TỔNG CỘNG** | **13,150** | **63,563** | **59,661** | **3,902** | **93.86%** | **20,821,430,686.85** |

---

## III. PHÂN TÍCH NGUYÊN NHÂN & VẤN ĐỀ XUNG ĐỘT (MẤT GIÁ Ở NHIỀU THÁNG)

Anh/Chị phản hồi: *"Đã nhận được phản hồi đã sửa giá nhưng nay lại mất ở rất nhiều tháng"*. Kết quả điều tra hệ thống cho thấy các **nguyên nhân kỹ thuật và nghiệp vụ cốt lõi** sau đây:

### 1. Thiếu cơ chế Tự động Đồng bộ Bảng giá Nhà Cung Cấp (System Architectural Gap)
* Đối với **Đơn bán hàng khách hàng (`Donhang`)**, hệ thống có dịch vụ `DongBoGia` (`enhanced-dongbogia.service.ts`) tự động lấy giá mới nhất từ Bảng giá Khách hàng (`Banggia`).
* Tuy nhiên, đối với **Đặt hàng Nhà cung cấp (`Dathang`)**, hệ thống **chưa có cơ chế tự động đồng bộ giá từ Bảng giá NCC**. Giá nhập (`gianhap`) được lưu trực tiếp vào từng dòng `Dathangsanpham` tại thời điểm tạo/nhập đơn. Khi Bảng giá NCC thay đổi, các đơn đặt hàng cũ không tự động được cập nhật.

### 2. Ghi đè giá về 0 khi Re-update hoặc Import lại đơn hàng
* Khi đơn Đặt hàng được tạo tự động hoặc import từ Excel (như các file `Import 20260729_172948`), nếu file import không chứa cột giá nhập, hệ thống mặc định gán `gianhap = 0`.
* Trong code backend ([`api/src/dathang/dathang.service.ts`](file:///home/kata/Coding/rausachfinal/api/src/dathang/dathang.service.ts#L884)), tại các hàm `update`, logic xử lý giá nhập đang là:
  ```typescript
  gianhap: parseFloat((sp.gianhap ?? 0).toFixed(3)) || 0
  ```
  Nếu người dùng hoặc script gửi request cập nhật đơn hàng mà không truyền giá nhập (`sp.gianhap` bị undefined hoặc null), giá trong cơ sở dữ liệu sẽ bị **ghi đè ngược về 0**, làm mất giá đã nhập trước đó.

### 3. Tập trung xung đột lớn ở một số Nhà Cung Cấp cố định
Thống kê 3,902 mặt hàng bị 0đ trải dài qua 7 tháng cho thấy **3 Nhà cung cấp chính chiếm gần 50% toàn bộ số lượng mất giá**:
1. **VŨ MUA**: **783 dòng 0đ** (rải rác qua 203 đơn hàng từ 03/01 đến 30/07/2026).
2. **QUẢNG VỰA ỚT**: **588 dòng 0đ** (rải rác qua 144 đơn hàng từ 05/01 đến 30/07/2026).
3. **A LÃNH - TRẦN GIA**: **565 dòng 0đ** (rải rác qua 59 đơn hàng từ 11/01 đến 30/06/2026).
4. **Hương ĐL**: **170 dòng 0đ** (từ 05/05 đến 30/07/2026).
5. **Phạm Ngọc An Thu mua (TG)**: **163 dòng 0đ** (từ 01/01 đến 30/07/2026).
6. **THU NGUYỆT TRÁI CÂY**: **135 dòng 0đ** (từ 02/01 đến 30/07/2026).
7. **Gái Hành Lá**: **122 dòng 0đ** (từ 01/01 đến 30/07/2026).

> **Giải thích hiện tượng "Đã sửa giá nhưng nay lại mất"**: Khi nhân viên chỉnh sửa giá trên màn hình, họ thường chỉ sửa thủ công trên 1-2 đơn hàng gần nhất. Nhưng do các đơn hàng cũ từ tháng 1 đến tháng 6 của các NCC này chưa từng được back-fill/đồng bộ hàng loạt, nên khi xem tổng hợp báo cáo công nợ nhiều tháng, dữ liệu vẫn thể hiện bị thiếu giá ở rất nhiều tháng.

### 4. Xu hướng dở dang tăng cao trong các tháng 5, 6, 7/2026
* Trong giai đoạn tháng 1 đến tháng 4/2026, tỷ lệ thiếu giá chỉ ở mức **1.8% - 4.8%**.
* Đến tháng 5, 6 và 7/2026, số mặt hàng thiếu giá tăng đột biến lên **896 - 1,084 mặt hàng/tháng** (~10% - 12.3%). Điều này phản ánh quy trình nhập giá nhập thực tế từ hóa đơn NCC đang bị đọng lại chưa kịp hoàn tất trước khi chốt kỳ.

---

## IV. KẾT QUẢ TRA SOÁT CHI TIẾT CÁC CASE ĐIỂM HÌNH (CASE STUDIES)

Để làm rõ phản hồi *"Đã nhận được phản hồi đã sửa giá nhưng nay lại mất ở rất nhiều tháng"*, dưới đây là các Case Study thực tế được trích xuất trực tiếp từ cơ sở dữ liệu (`AuditLog` và chi tiết các đơn hàng `Dathang`):

### 📌 CASE 1: Đơn hàng đã có giá bị ghi đè ngược về 0đ do thao tác lưu lại đơn (Bug Ghi Đè Backend)
* **Mã đơn hàng**: `TGNCC-ZZ39980` (ID: `793e2dd5-a299-4fd2-8d79-e12c1a35a6d3`)
* **Nhà cung cấp**: TRỨNG VĨNH THÀNH (`8ff9a534-8315-4130-924e-919044fad91e`)
* **Ngày nhận hàng**: 28/07/2026
* **Bằng chứng tra soát qua `AuditLog`**:
  * **Lúc 03:20:13.218 (Ngày 30/07/2026)**: Đơn hàng bị ghi đè thành **0đ** toàn bộ mặt hàng (`gianhap = 0`, `ttnhan = 0`) do thao tác gửi request update không kèm đơn giá nhập.
  * **Lúc 03:20:49.995 (Ngày 30/07/2026 - sau 36 giây)**: Nhân viên phải nhập thủ công lại giá nhập (11,000đ cho 14kg và 25,000đ cho 5.5kg) → Thành tiền cập nhật lại thành **291,500đ**.
* **Đánh giá Case 1**: Đây là **bằng chứng kỹ thuật trực tiếp** xác nhận hiện tượng: Người dùng đã sửa giá thành công, nhưng chỉ cần 1 thao tác bấm Lưu/Cập nhật đơn từ giao diện mà payload bị thiếu giá, hệ thống sẽ lập tức **xóa sạch giá nhập về 0đ**.

---

### 📌 CASE 2: Đơn khởi tạo tự động bị mặc định 0đ, người dùng nạp lại giá thành công nhưng chỉ áp dụng cho 1 đơn lẻ
* **Mã đơn hàng**: `TGNCC-ZZ40009` (ID: `619b9747-8ffb-4524-a530-83d8bd2a2eff`)
* **Nhà cung cấp**: PHƯỢNG RAU RỪNG (`aad25dae-ba81-45d2-8c36-1a101618e3d7`)
* **Ngày nhận hàng**: 29/07/2026
* **Bằng chứng tra soát qua `AuditLog`**:
  * **Lúc 03:30:38.955 (Ngày 30/07/2026)**: Đơn hàng được khởi tạo từ file `Import 20260729_103318`. Do file import không có thông tin đơn giá, tất cả 9 mặt hàng trong đơn đều mang `gianhap = 0đ` (`ttnhan = 0đ`).
  * **Lúc 03:38:47.366 (Ngày 30/07/2026 - sau 8 phút)**: Người dùng thực hiện cập nhật lại trên màn hình chi tiết đơn hàng, nhập lại đơn giá cho cả 9 mặt hàng (8,000đ, 7,000đ, 10,000đ, 14,000đ, 33,000đ...) → Tổng tiền đơn hàng được cập nhật lên **2,152,100đ**.
* **Đánh giá Case 2**: Thao tác cập nhật giá của người dùng chỉ cập nhật đơn giá cho đúng 1 đơn `TGNCC-ZZ40009` ngày 29/07/2026. Tất cả các đơn hàng cũ khác của cùng Nhà cung cấp Phượng Rau Rừng (hoặc các NCC khác) vẫn nguyên trạng 0đ nếu không được thao tác tương tự.

---

### 📌 CASE 3: Tồn đọng đơn bị mất giá kéo dài nhiều tháng của Nhà cung cấp VŨ MUA & QUẢNG VỰA ỚT
* **Nhà cung cấp**: **VŨ MUA** (783 dòng 0đ) & **QUẢNG VỰA ỚT** (588 dòng 0đ)
* **Các đơn hàng lịch sử tiêu biểu đang chứa `gianhap = 0đ` chưa từng được cập nhật**:
  * `TGNCC-LH00125` (NCC: VŨ MUA - Ngày **03/01/2026**): 1 mặt hàng - Giá nhập: **0đ** - Trạng thái: *Đã nhận*.
  * `TGNCC-LJ00075` (NCC: QUẢNG VỰA ỚT - Ngày **05/01/2026**): 1 mặt hàng - Giá nhập: **0đ** - Trạng thái: *Đã nhận*.
  * `TGNCC-LV00036` (NCC: VŨ MUA - Ngày **09/01/2026**): 2 mặt hàng - Giá nhập: **0đ** - Trạng thái: *Đã nhận*.
  * `TGNCC-MN00014` (NCC: A LÃNH - Ngày **17/01/2026**): 1 mặt hàng - Giá nhập: **0đ** - Trạng thái: *Đã nhận*.
  * `TGNCC-OA00005` (NCC: VŨ MUA - Ngày **02/02/2026**): 1 mặt hàng - Giá nhập: **0đ** - Trạng thái: *Đã nhận*.
  * `TGNCC-PA00059` (NCC: VŨ MUA - Ngày **13/02/2026**): 6 mặt hàng - Giá nhập: **0đ** - Trạng thái: *Đã nhận*.
* **Đánh giá Case 3**: Khi bộ phận Mua hàng/Kế toán báo "Đã sửa giá rồi", họ chỉ mới sửa các đơn phát sinh của tuần gần nhất. Khi chạy báo cáo Công nợ tổng hợp từ đầu năm 2026, các đơn hàng cũ từ tháng 1, 2, 3... như các đơn nêu trên vẫn hiển thị 0đ, gây cảm giác "giá sửa xong lại bị mất ở nhiều tháng".

---

## V. ĐỀ XUẤT GIẢI PHÁP VÀ KẾ HOẠCH XỬ LÝ

1. **Phát triển Tool / API Đồng bộ Giá NCC hàng loạt (`Backfill NCC Price`)**:
   * Xây dựng script/chức năng cho phép chọn Nhà cung cấp và khoảng thời gian (VD: từ 01/01/2026 đến nay), tự động lấy giá mới nhất của sản phẩm từ Bảng giá NCC (hoặc từ đơn hàng có giá gần nhất) để bù vào tất cả các đơn `gianhap = 0`.

2. **Cập nhật Backend để Chống Ghi đè Giá (`Protection against Zero Overwrite`)**:
   * Sửa hàm `update` trong [`api/src/dathang/dathang.service.ts`](file:///home/kata/Coding/rausachfinal/api/src/dathang/dathang.service.ts#L884) để giữ nguyên giá nhập cũ nếu payload mới không truyền giá (`undefined` / `null`) hoặc bằng 0 khi giá cũ đã `> 0`.

3. **Bổ sung Cảnh báo Giá 0đ trên Báo cáo Công nợ NCC**:
   * Khi xuất Excel hoặc xem màn hình Công nợ Nhà cung cấp (`/dathang/congnoncc`), thêm bộ lọc highlight các đơn hàng còn chứa dòng `gianhap = 0` để bộ phận Mua hàng / Kế toán phát hiện và bổ sung ngay.

4. **Ưu tiên xử lý dứt điểm 3 NCC lớn**:
   * Bộ phận Kế toán / Mua hàng cần chốt lại bảng giá với **VŨ MUA**, **QUẢNG VỰA ỚT**, **A LÃNH - TRẦN GIA** để chạy tool cập nhật lại toàn bộ 1,936 dòng bị thiếu giá trong các tháng qua.
